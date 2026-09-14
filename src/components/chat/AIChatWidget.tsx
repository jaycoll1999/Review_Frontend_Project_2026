'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Square,
  Radio
} from 'lucide-react';
import api from '@/lib/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

type MicLang = 'en-IN' | 'hi-IN' | 'mr-IN';

const DEFAULT_WELCOME = "Hello! I'm your ReviewFlow AI Assistant. You can speak or type in English, हिंदी, or मराठी. How can I help you today?";

const QUICK_PROMPTS = [
  "How does the QR review funnel work?",
  "What are the subscription plans & pricing?",
  "How to automate Google review replies?",
  "मराठीत माहिती हवी आहे?",
  "हिंदी में प्लान्स बताएं"
];

// Clean markdown characters before passing to SpeechSynthesis
function cleanTextForSpeech(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/[-*•]\s+/g, ', ')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/`{1,3}[\s\S]*?`{1,3}/g, '')
    .replace(/\n+/g, '. ')
    .trim();
}

// Detect language of text for TTS voice playback
function detectTextLanguage(text: string): 'mr-IN' | 'hi-IN' | 'en-IN' {
  const lower = text.toLowerCase();
  const marathiKeywords = ['नमस्कार', 'कसे', 'कसं', 'आहे', 'आहेत', 'सांगा', 'करायचे', 'माहिती', 'काय', 'होईल', 'द्यायचा', 'प्लॅन', 'रिव्ह्यू', 'ळ', 'नाही', 'दुकानाचे', 'व्यवसाय'];
  const hindiKeywords = ['नमस्ते', 'कैसे', 'क्या', 'बताओ', 'है', 'हैं', 'रोकें', 'बढ़ाएं', 'किए', 'सकते', 'रिव्यु'];

  if (marathiKeywords.some(w => text.includes(w) || lower.includes(w))) return 'mr-IN';
  if (hindiKeywords.some(w => text.includes(w) || lower.includes(w))) return 'hi-IN';
  if (/[\u0900-\u097F]/.test(text)) return 'hi-IN';
  return 'en-IN';
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Voice State
  const [isListening, setIsListening] = useState(false);
  const [micLang, setMicLang] = useState<MicLang>('en-IN');
  const [isVoiceAutoPlay, setIsVoiceAutoPlay] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState<number[]>([20, 45, 70, 35, 60, 25]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Audio Capture Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Welcome Message
  useEffect(() => {
    setMessages([
      {
        id: 'welcome-init',
        role: 'assistant',
        content: DEFAULT_WELCOME,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  // Cleanup audio & speech on unmount
  useEffect(() => {
    return () => {
      stopAudioCapture();
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Stop All Audio Recording & Visualizer
  const stopAudioCapture = () => {
    setIsListening(false);

    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {}
      audioContextRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {}
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
  };

  // Start Direct Microphone Capture with Real-Time Waveform
  const startAudioCapture = async () => {
    if (typeof window === 'undefined') return;

    // Stop ongoing TTS playback
    stopSpeaking();
    stopAudioCapture();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // 1. Setup Web Audio Analyser for Live Soundwave Dancing
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const audioCtx = new AudioCtx();
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 32;
        source.connect(analyser);

        audioContextRef.current = audioCtx;
        analyserRef.current = analyser;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const updateVisualizer = () => {
          analyser.getByteFrequencyData(dataArray);
          const sampledLevels = [
            Math.max(15, (dataArray[1] || 0) * 0.4),
            Math.max(20, (dataArray[3] || 0) * 0.5),
            Math.max(30, (dataArray[5] || 0) * 0.6),
            Math.max(25, (dataArray[7] || 0) * 0.55),
            Math.max(35, (dataArray[9] || 0) * 0.65),
            Math.max(15, (dataArray[11] || 0) * 0.4),
          ];
          setAudioLevel(sampledLevels);

          // Voice Activity Detection (VAD): Reset silence timer when user speaks
          const currentEnergy = dataArray.reduce((acc, val) => acc + val, 0);
          if (currentEnergy > 150) {
            if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = setTimeout(() => {
              // User has paused speaking for 1.8 seconds -> Auto send voice!
              finishAudioCaptureAndSend();
            }, 1800);
          }

          animationFrameRef.current = requestAnimationFrame(updateVisualizer);
        };
        updateVisualizer();
      }

      // 2. Setup MediaRecorder for Raw Audio Blob
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(250);
      setIsListening(true);

      // 3. Setup client-side recognition in parallel to stream text live
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = micLang;
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          let liveTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            liveTranscript += event.results[i][0].transcript;
          }
          if (liveTranscript.trim()) {
            setInput(liveTranscript);
            const detected = detectTextLanguage(liveTranscript);
            if (detected !== micLang) {
              setMicLang(detected);
            }
          }
        };

        recognitionRef.current = recognition;
        recognition.start();
      }

    } catch (err: any) {
      console.warn('Microphone permission or capture error:', err.message);
      setIsListening(false);
      alert('Microphone access is required for voice chat. Please enable microphone permissions in your browser.');
    }
  };

  // Finish Recording and Process via /api/chat/voice
  const finishAudioCaptureAndSend = async () => {
    if (!isListening) return;

    const currentInput = input.trim();
    stopAudioCapture();

    // Prepare recorded audio blob
    const audioBlob = audioChunksRef.current.length > 0 
      ? new Blob(audioChunksRef.current, { type: 'audio/webm' }) 
      : null;

    if (!currentInput && (!audioBlob || audioBlob.size === 0)) {
      return;
    }

    await handleSendVoiceMessage(currentInput, audioBlob);
  };

  // Send Voice Payload to Backend
  const handleSendVoiceMessage = async (transcriptText: string, audioBlob: Blob | null) => {
    const userQuery = transcriptText || "Voice Message";

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const historyPayload = messages.slice(-6).map(m => ({
        role: m.role,
        content: m.content
      }));

      let botReply = "";

      // Send to voice processing endpoint if audioBlob exists
      if (audioBlob && audioBlob.size > 0) {
        const formData = new FormData();
        formData.append('audio', audioBlob, 'voice.webm');
        formData.append('transcript', transcriptText);
        formData.append('history', JSON.stringify(historyPayload));

        const res: any = await api.post('/chat/voice', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        botReply = res?.reply || res?.data?.reply || DEFAULT_WELCOME;
      } else {
        // Fallback to text chat API
        const res: any = await api.post('/chat', {
          message: transcriptText,
          history: historyPayload
        });
        botReply = res?.reply || res?.data?.reply || DEFAULT_WELCOME;
      }

      const newBotId = `bot-${Date.now()}`;
      const assistantMessage: Message = {
        id: newBotId,
        role: 'assistant',
        content: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Automatically sync speech dialect to the bot's response language
      const detected = detectTextLanguage(botReply);
      setMicLang(detected);

      // Speak response if auto-play is enabled or user spoke with mic
      if (isVoiceAutoPlay || true) {
        setTimeout(() => speakMessage(newBotId, botReply), 300);
      }

      if (!isOpen) {
        setUnreadCount(c => c + 1);
      }

    } catch (err: any) {
      console.error('Voice chat error:', err);
      const fallbackMsg: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "Sorry, I could not process the voice audio. Please try again or type below.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Standard Text Message Send
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    stopAudioCapture();
    stopSpeaking();

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const historyPayload = messages.slice(-6).map(m => ({
        role: m.role,
        content: m.content
      }));

      const res: any = await api.post('/chat', {
        message: query,
        history: historyPayload
      });

      const botReply = res?.reply || res?.data?.reply || DEFAULT_WELCOME;
      const newBotId = `bot-${Date.now()}`;

      const assistantMessage: Message = {
        id: newBotId,
        role: 'assistant',
        content: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);

      const detected = detectTextLanguage(botReply);
      setMicLang(detected);

      if (isVoiceAutoPlay) {
        setTimeout(() => speakMessage(newBotId, botReply), 200);
      }

      if (!isOpen) {
        setUnreadCount(c => c + 1);
      }
    } catch (err: any) {
      console.error('AIChat error:', err);
      const fallbackMsg: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "Sorry, I had trouble reaching the AI server. Please try again in a moment.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Text-to-Speech Playback
  const speakMessage = (messageId: string, text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (speakingMessageId === messageId) {
      stopSpeaking();
      return;
    }

    stopSpeaking();

    const cleaned = cleanTextForSpeech(text);
    const targetLang = detectTextLanguage(text);

    const utterance = new SpeechSynthesisUtterance(cleaned);
    utterance.lang = targetLang;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(v => v.lang.startsWith(targetLang.slice(0, 2)));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => setSpeakingMessageId(messageId);
    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
    }
  };

  const handleClearChat = () => {
    stopAudioCapture();
    stopSpeaking();
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: DEFAULT_WELCOME,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const micLangLabel = micLang === 'mr-IN' ? 'मराठी' : micLang === 'hi-IN' ? 'हिंदी' : 'EN';

  const cycleMicLang = () => {
    if (micLang === 'en-IN') setMicLang('hi-IN');
    else if (micLang === 'hi-IN') setMicLang('mr-IN');
    else setMicLang('en-IN');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-[92vw] sm:w-[430px] h-[620px] max-h-[85vh] bg-white/95 backdrop-blur-2xl border border-slate-200/80 rounded-[2.2rem] shadow-[0_25px_70px_-15px_rgba(79,70,229,0.25)] flex flex-col overflow-hidden mb-4 relative"
          >
            {/* Top Accent Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

            {/* HEADER */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 border border-white/20">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-sm tracking-tight text-white">ReviewFlow Copilot</h3>
                    <span className="px-1.5 py-0.5 bg-indigo-500/20 text-indigo-300 text-[9px] font-black rounded uppercase tracking-wider border border-indigo-400/20 flex items-center gap-1">
                      <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" /> Voice AI
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">Multilingual Voice • English • हिंदी • मराठी</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Voice Auto-Play Toggle */}
                <button
                  onClick={() => {
                    if (isVoiceAutoPlay) stopSpeaking();
                    setIsVoiceAutoPlay(!isVoiceAutoPlay);
                  }}
                  title={isVoiceAutoPlay ? "Voice auto-speech: ON (click to mute)" : "Voice auto-speech: OFF (click to unmute)"}
                  className={`p-2 rounded-xl transition-all ${
                    isVoiceAutoPlay 
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {isVoiceAutoPlay ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <button
                  onClick={handleClearChat}
                  title="Clear conversation"
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    stopAudioCapture();
                    stopSpeaking();
                    setIsOpen(false);
                  }}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* CHAT MESSAGES BODY */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm bg-gradient-to-b from-slate-50/50 to-white/50">
              {messages.map((m) => {
                const isBot = m.role === 'assistant';
                const isThisPlaying = speakingMessageId === m.id;

                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    {isBot && (
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-sm mt-1">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div
                      className={`max-w-[84%] px-4 py-3 rounded-2xl leading-relaxed whitespace-pre-wrap relative group ${
                        isBot
                          ? 'bg-white text-slate-800 border border-slate-200/70 shadow-xs rounded-tl-sm'
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-md shadow-indigo-100 rounded-tr-sm'
                      }`}
                    >
                      {m.content}

                      {/* Footer: Timestamp & Audio Readout Button */}
                      <div className={`flex items-center justify-between gap-3 mt-2 pt-1 border-t ${
                        isBot ? 'border-slate-100' : 'border-white/10'
                      }`}>
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider ${
                            isBot ? 'text-slate-400' : 'text-indigo-200'
                          }`}
                        >
                          {m.timestamp}
                        </span>

                        {isBot && (
                          <button
                            onClick={() => speakMessage(m.id, m.content)}
                            title={isThisPlaying ? "Stop speaking" : "Listen to this response"}
                            className={`p-1 rounded-lg flex items-center gap-1 text-[10px] font-bold transition-all ${
                              isThisPlaying 
                                ? 'bg-rose-50 text-rose-600' 
                                : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'
                            }`}
                          >
                            {isThisPlaying ? (
                              <>
                                <Square className="w-3 h-3 fill-current animate-pulse" />
                                <span>Stop</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3 h-3" />
                                <span>Listen</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex items-start gap-2.5 animate-pulse">
                  <div className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-white border border-slate-200/80 px-4 py-3 rounded-2xl rounded-tl-sm shadow-xs flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-pink-600 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-xs font-semibold text-slate-500 ml-1">
                      Thinking...
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* QUICK PROMPTS CHIPS */}
            <div className="px-4 py-2 bg-slate-50/80 border-t border-slate-100 overflow-x-auto no-scrollbar flex items-center gap-2">
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={loading || isListening}
                  className="whitespace-nowrap px-3 py-1.5 bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200/80 hover:border-indigo-200 rounded-full text-[11px] font-bold shadow-xs transition-all shrink-0 active:scale-95 disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* LIVE AUDIO WAVEFORM BANNER (Displayed while Recording Voice) */}
            <AnimatePresence>
              {isListening && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 py-3 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between shadow-inner border-t border-indigo-500/20"
                >
                  <div className="flex items-center gap-3">
                    {/* Pulsing Animated Waveform Bars */}
                    <div className="flex items-center gap-1 h-6">
                      {audioLevel.map((level, i) => (
                        <div
                          key={i}
                          style={{ height: `${Math.max(6, Math.min(24, level * 0.35))}px` }}
                          className="w-1 bg-gradient-to-t from-indigo-400 to-rose-400 rounded-full transition-all duration-75"
                        />
                      ))}
                    </div>
                    <div>
                      <span className="text-xs font-black tracking-tight text-white block">
                        Listening in {micLangLabel}...
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Speak now (auto-sends on pause)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={finishAudioCaptureAndSend}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
                    >
                      <Send className="w-3 h-3" />
                      <span>Send</span>
                    </button>
                    <button
                      onClick={stopAudioCapture}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* INPUT & MICROPHONE FOOTER */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-slate-200/70 flex items-center gap-2"
            >
              {/* Mic Dialect Switcher Pill */}
              <button
                type="button"
                onClick={cycleMicLang}
                title={`Speech Language: ${micLangLabel}. Click to switch (EN -> हिंदी -> मराठी)`}
                className="px-2 py-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl text-[10px] font-black border border-slate-200 transition-all shrink-0"
              >
                {micLangLabel}
              </button>

              {/* Text Input */}
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? "Listening to your voice..." : "Speak or type in English, हिंदी, मराठी..."}
                disabled={loading}
                className={`flex-1 px-4 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                  isListening ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/20' : 'border-slate-200'
                }`}
              />

              {/* Microphone Button (Triggers Voice Capture) */}
              <button
                type="button"
                onClick={isListening ? finishAudioCaptureAndSend : startAudioCapture}
                title={isListening ? "Click to send voice query" : `Click to speak in ${micLangLabel}`}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all shrink-0 active:scale-95 ${
                  isListening
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-300 animate-pulse'
                    : 'bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-11 h-11 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:scale-95 text-white rounded-xl flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-indigo-200 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING LAUNCHER BUTTON */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative group flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white rounded-full shadow-[0_15px_35px_-5px_rgba(79,70,229,0.5)] border border-white/20 transition-all duration-300"
        >
          {/* Pulsing Aura */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-30 group-hover:opacity-60 blur-md transition-opacity -z-10 animate-pulse" />

          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5 text-white" />
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black tracking-tight leading-none">ReviewFlow AI</span>
              <Mic className="w-3 h-3 text-indigo-200" />
            </div>
            <span className="text-[9px] font-bold text-indigo-200 mt-0.5 leading-none">
              Voice • EN • हिंदी • मराठी
            </span>
          </div>

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white font-black text-[10px] rounded-full flex items-center justify-center shadow-md animate-bounce">
              {unreadCount}
            </span>
          )}
        </motion.button>
      )}
    </div>
  );
}
