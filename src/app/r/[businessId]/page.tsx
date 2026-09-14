'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { Button } from '@/components/Button';
import toast, { Toaster } from 'react-hot-toast';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Star, 
  ExternalLink, 
  ShieldCheck, 
  Building2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReviewFunnelPage() {
  const { businessId } = useParams();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [step, setStep] = useState(1); // 1: Rating, 2: Negative Feedback, 3: Success, 4: Google Redirecting
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [redirectCountdown, setRedirectCountdown] = useState(3);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res: any = await api.get(`/user/${businessId}`);
        setUser(res);
      } catch (err) {
        console.error('Failed to fetch business info', err);
      }
    };
    if (businessId) fetchUser();
  }, [businessId]);

  const ratingLabels: { [key: number]: string } = {
    1: "Needs Major Improvement 😞",
    2: "Below Expectations 🙁",
    3: "Average Experience 😐",
    4: "Great Experience! 😊",
    5: "Exceptional Service! 🌟"
  };

  const feedbackTags = [
    "Wait Time", 
    "Staff Courtesy", 
    "Service Quality", 
    "Pricing & Value", 
    "Cleanliness", 
    "Other"
  ];

  const handleRate = (val: number) => {
    setRating(val);
    if (val >= 4) {
      setStep(4);
      let count = 3;
      const interval = setInterval(() => {
        count -= 1;
        setRedirectCountdown(count);
        if (count <= 0) {
          clearInterval(interval);
          const link = user?.googleReviewLink || 'https://maps.google.com';
          window.location.href = link;
        }
      }, 1000);
    } else {
      setStep(2);
    }
  };

  const handleDirectGoogleClick = () => {
    const link = user?.googleReviewLink || 'https://maps.google.com';
    window.location.href = link;
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fullMessage = selectedTag 
        ? `[Category: ${selectedTag}] ${feedback}` 
        : feedback;

      await api.post('/feedback', {
        userId: businessId,
        rating,
        message: fullMessage
      });
      setStep(3);
      toast.success('Your private feedback was delivered.');
    } catch (err: any) {
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const activeDisplayRating = hoverRating || rating;
  const businessDisplayName = user?.businessName || 'Our Business';

  return (
    <div className="min-h-screen bg-[#090d16] flex items-center justify-center p-4 selection:bg-purple-500 selection:text-white relative overflow-hidden">
      <Toaster position="top-center" />

      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-purple-600/25 via-indigo-600/20 to-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-purple-500/15 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl text-center"
        >
          {/* STEP 1: RATING SELECTION */}
          {step === 1 && (
            <div className="space-y-8">
              {/* Business Avatar */}
              <div className="relative mx-auto w-20 h-20">
                <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-purple-500/25 border border-white/20">
                  {businessDisplayName[0]?.toUpperCase() || 'R'}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white border-2 border-slate-900 shadow-sm" title="Verified Business">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  Official Feedback Hub
                </span>
                <h1 className="text-2xl font-black text-white tracking-tight">
                  How was your experience?
                </h1>
                <p className="text-sm font-medium text-slate-400 mt-2 leading-relaxed">
                  Your review directly helps <span className="text-white font-bold">{businessDisplayName}</span> improve and serve you better.
                </p>
              </div>

              {/* Star Selector */}
              <div className="py-2 space-y-4">
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRate(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform duration-200 hover:scale-115 active:scale-95 focus:outline-none"
                      aria-label={`Rate ${star} star`}
                    >
                      <Star 
                        className={`w-10 h-10 transition-colors duration-200 ${
                          activeDisplayRating >= star 
                            ? 'text-amber-400 fill-amber-400 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' 
                            : 'text-slate-700 hover:text-slate-500'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                {activeDisplayRating > 0 && (
                  <motion.p 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-bold uppercase tracking-wider text-amber-300 h-5"
                  >
                    {ratingLabels[activeDisplayRating]}
                  </motion.p>
                )}
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Verified Client Feedback Protocol</span>
              </div>
            </div>
          )}

          {/* STEP 4: REDIRECTING TO GOOGLE */}
          {step === 4 && (
            <div className="py-6 space-y-6">
              <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-yellow-500 rounded-3xl flex items-center justify-center text-white mx-auto shadow-xl shadow-amber-500/25 border border-white/20">
                <Star className="w-10 h-10 fill-white" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white">We're Thrilled You Loved It!</h3>
                <p className="text-sm font-medium text-slate-400 leading-relaxed">
                  Taking you to our official Google Maps page to share your experience with the neighborhood...
                </p>
              </div>

              {/* Countdown circle / bar */}
              <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>Redirecting in</span>
                  <span className="text-amber-400 font-mono text-sm">{redirectCountdown}s</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-purple-500 to-amber-400"
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 3, ease: "linear" }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleDirectGoogleClick}
                className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition-all active:scale-95 text-sm"
              >
                <span>Open Google Reviews Now</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: PRIVATE FEEDBACK FORM */}
          {step === 2 && (
            <div className="space-y-6 text-left">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-indigo-500/15 border border-indigo-500/30 rounded-2xl flex items-center justify-center text-indigo-400 mx-auto">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-black text-white">We're listening carefully</h2>
                <p className="text-xs text-slate-400 font-medium">
                  We're truly sorry your experience wasn't 5-star. Tell us what went wrong so we can resolve it immediately.
                </p>
              </div>

              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                {/* Category Pills */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">What was affected?</label>
                  <div className="flex flex-wrap gap-1.5">
                    {feedbackTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          selectedTag === tag
                            ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Your Detailed Comments</label>
                  <textarea 
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder:text-slate-500 text-sm leading-relaxed"
                    rows={4}
                    placeholder="Tell us what happened so management can take corrective action..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                  />
                </div>

                <div className="p-3 bg-slate-800/40 border border-slate-800 rounded-xl flex items-center gap-2.5 text-[11px] text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Your feedback is sent directly to management and kept strictly confidential.</span>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl font-bold flex items-center justify-center gap-2"
                  loading={loading}
                >
                  <Send className="w-4 h-4" />
                  Submit Confidential Feedback
                </Button>
              </form>
            </div>
          )}

          {/* STEP 3: SUCCESS CONFIRMATION */}
          {step === 3 && (
            <div className="py-8 space-y-6">
              <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/30 rounded-3xl flex items-center justify-center text-emerald-400 mx-auto shadow-xl shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white">Thank You for Your Honesty!</h2>
                <p className="text-sm font-medium text-slate-400 leading-relaxed">
                  Your feedback has been delivered securely to management at <span className="text-white font-bold">{businessDisplayName}</span>. We will review it and make necessary improvements.
                </p>
              </div>

              <Button 
                onClick={() => setStep(1)} 
                variant="outline" 
                className="w-full h-12 rounded-xl text-slate-300 border-slate-700 hover:bg-slate-800"
              >
                Close Feedback Window
              </Button>
            </div>
          )}
        </motion.div>

        {/* Brand Footer */}
        <p className="text-center mt-6 text-slate-500 text-xs font-semibold">
          Powered by <span className="text-purple-400 font-bold">ReviewFlow AI</span> • Reputation Shield
        </p>
      </div>
    </div>
  );
}
