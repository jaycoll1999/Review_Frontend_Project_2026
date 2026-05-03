'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { RatingStars } from '@/components/RatingStars';
import toast, { Toaster } from 'react-hot-toast';
import { Heart, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

export default function ReviewFunnelPage() {
  const { businessId } = useParams();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [step, setStep] = useState(1); // 1: Rating, 2: Negative Feedback, 3: Success
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

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

  const handleRate = (val: number) => {
    setRating(val);
    if (val >= 4) {
      toast.success('Redirecting to Google Reviews...');
      setTimeout(() => {
        const link = user?.googleReviewLink || 'https://google.com';
        window.location.href = link;
      }, 1000);
    } else {
      setStep(2);
    }
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/feedback', {
        userId: businessId,
        rating,
        message: feedback
      });
      setStep(3);
      toast.success('Thank you for your feedback!');
    } catch (err: any) {
      toast.error('Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 selection:bg-purple-100">
      <Toaster />
      
      <div className="max-w-md w-full animate-funnel-in">
        <Card className="text-center p-12">
          {step === 1 && (
            <>
              <div className="w-20 h-20 bg-purple-50 rounded-[2rem] flex items-center justify-center text-purple-600 mx-auto mb-8 shadow-lg shadow-purple-100">
                <Heart className="w-10 h-10 fill-purple-600" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 mb-2">How was your experience?</h1>
              <p className="text-slate-500 mb-10 leading-relaxed">
                Your feedback helps <span className="font-bold text-slate-900">{user?.businessName || 'us'}</span> improve our services.
              </p>
              <div className="flex justify-center">
                <RatingStars onRate={handleRate} />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">We'd love to improve</h2>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                Please let us know what went wrong so we can make it right.
              </p>
              <form onSubmit={handleSubmitFeedback} className="space-y-6">
                <textarea 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-900 placeholder:text-slate-400 text-sm leading-relaxed"
                  rows={5}
                  placeholder="Tell us about your experience..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full flex items-center gap-2" loading={loading}>
                  <Send className="w-4 h-4" />
                  Submit Feedback
                </Button>
              </form>
            </>
          )}

          {step === 3 && (
            <div className="py-10">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-8 animate-bounce-slow">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">Thank You!</h2>
              <p className="text-slate-500 mb-10 leading-relaxed">
                Your feedback has been received privately by our management. We appreciate your honesty.
              </p>
              <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
                Close
              </Button>
            </div>
          )}
        </Card>

        <p className="text-center mt-12 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
          Powered by <span className="text-slate-900 font-black">ReviewFlow AI</span>
        </p>
      </div>
    </div>
  );
}
