'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { 
  CheckCircle2, 
  Rocket, 
  RefreshCcw, 
  MessageSquare, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function AutomationPage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<any[]>([]);
  const [showSelector, setShowSelector] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isMockData, setIsMockData] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Automation Auth Error:", e);
      }
    }
  }, []);

  useEffect(() => {
    // Process URL Parameters from redirect
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const authorized = params.get('gmb_authorized');
      const error = params.get('gmb_error');

      if (authorized === 'true') {
        toast.success('Successfully authorized Google account!');
        loadLocations();
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (error) {
        if (error === 'missing_credentials') {
          toast.error('GMB OAuth keys not set in backend .env. Developer Mode simulation enabled.', { duration: 6000 });
          loadLocations();
        } else {
          toast.error(`Google connection failed: ${error}`);
        }
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  useEffect(() => {
    if (user?.gmbLocationId) {
      loadReviews();
    }
  }, [user]);

  const loadLocations = async () => {
    setIsLoading(true);
    const toastId = toast.loading('Retrieving available business location profiles...');
    try {
      const res = await api.get('/user/gmb-locations');
      setLocations(res.locations || []);
      setIsMockData(res.isMock);
      setShowSelector(true);
      toast.success('Fetched GMB profiles list!', { id: toastId });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to fetch business profiles.', { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const loadReviews = async () => {
    setIsLoadingReviews(true);
    try {
      const res = await api.get('/user/gmb-real-reviews');
      setReviews(res.reviews || []);
      setIsMockData(res.isMock);
    } catch (err: any) {
      console.error(err);
      toast.error('Failed to load real-time reviews.');
    } finally {
      setIsLoadingReviews(false);
    }
  };

  const handleSelectLocation = async (loc: any) => {
    setIsLoading(true);
    const toastId = toast.loading(`Connecting to profile: ${loc.locationName}...`);
    try {
      const res = await api.put('/user/gmb-select-location', {
        accountId: loc.accountId,
        locationId: loc.locationId,
        locationName: loc.locationName
      });
      const updatedUser = res.data || res;
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setShowSelector(false);
      
      toast.success(`Successfully connected to ${loc.locationName}!`, { id: toastId });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to link GMB location profile.', { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = () => {
    setIsLoading(true);
    toast.loading('Redirecting to Google Business authorization...');
    const token = localStorage.getItem('token');
    window.location.href = `http://localhost:5001/api/auth/google?token=${token}`;
  };

  const features = [
    "Higher Google Ranking with AI-Powered",
    "AI Powered Google Profile Optimization",
    "AI Insights for Building Online Reputation",
    "Auto-Reply to Google reviews using AI",
    "AI Automation For Stay Active & Rank Better",
    "Boost visibility on Google with AI"
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-12 py-8">
        <header className="space-y-3">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Google Profile Automation</h1>
          <p className="text-lg font-medium text-slate-500">Automate your Google Business Profile with following tools</p>
        </header>

        <Card className="p-0 overflow-hidden border-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem]">
          <div className="p-12 space-y-12 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              {/* Google Logo */}
              <div className="md:col-span-2 flex justify-center md:justify-start">
                <div className="w-24 h-24 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner">
                  <svg viewBox="0 0 24 24" className="w-12 h-12">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </div>
              </div>

              {/* Main Tools */}
              <div className="md:col-span-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <RefreshCcw className="w-4 h-4 text-purple-600" />
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Fetch All Reviews</h3>
                  </div>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed">Sync and manage all your Google reviews</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Automate Review Reply</h3>
                  </div>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed">Set up automatic response triggers</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-orange-600" />
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">AI Reply</h3>
                  </div>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed">Generate smart responses using AI</p>
                </div>
              </div>
            </div>

            {/* Checklist & Button */}
            <div className="pt-8 border-t border-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-12">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 transition-colors duration-300">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end items-center gap-6 flex-wrap">
                {user?.gmbConnected && (
                  <div className="flex items-center gap-3 px-6 py-3 bg-emerald-50 border border-emerald-100 rounded-2xl">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-bold text-emerald-700">
                      {user.gmbLocationName ? `Connected Location: ${user.gmbLocationName}` : `Authorized: ${user.gmbEmail}`}
                    </span>
                  </div>
                )}
                
                {user?.gmbConnected && (
                  <Button 
                    onClick={loadLocations}
                    disabled={isLoading}
                    className="h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg flex items-center gap-2 font-bold transition-all active:scale-95"
                  >
                    <RefreshCcw className="w-4 h-4" />
                    Switch GMB Location
                  </Button>
                )}

                <Button 
                  onClick={handleConnect}
                  disabled={isLoading || (user?.gmbConnected && user?.gmbLocationId)}
                  className={`h-14 px-10 rounded-2xl flex items-center gap-3 shadow-2xl transition-all duration-300 group ${
                    user?.gmbConnected && user?.gmbLocationId
                      ? 'bg-emerald-600 text-white cursor-default shadow-emerald-100' 
                      : 'bg-black hover:bg-slate-900 text-white shadow-slate-200'
                  }`}
                >
                  {user?.gmbConnected && user?.gmbLocationId ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-bold">Verified & Connected</span>
                    </>
                  ) : (
                    <>
                      <Rocket className={`w-5 h-5 ${isLoading ? 'animate-bounce' : 'group-hover:animate-bounce'}`} />
                      <span className="font-bold">{isLoading ? 'Connecting...' : 'Connect Google GMB'}</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Profile Selector Overlay */}
        {showSelector && (
          <Card className="p-8 border border-slate-100 shadow-xl rounded-[2.5rem] bg-white space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-indigo-500" />
                  Select Google Business Location
                </h3>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Choose the Google Business profile you want to automate and sync real-time reviews from.
                </p>
              </div>
              {isMockData && (
                <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Developer Mock Mode
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {locations.length === 0 ? (
                <div className="col-span-full py-8 text-center text-slate-400 font-semibold">
                  No active Google locations found for this account.
                </div>
              ) : (
                locations.map((loc, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleSelectLocation(loc)}
                    className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-indigo-50/20 hover:border-indigo-200 transition-all cursor-pointer group flex flex-col justify-between h-40"
                  >
                    <div className="space-y-2">
                      <h4 className="text-md font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {loc.locationName}
                      </h4>
                      <p className="text-xs font-semibold text-slate-400 leading-relaxed line-clamp-2">
                        {loc.address}
                      </p>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 group-hover:text-indigo-600 uppercase tracking-widest mt-4 inline-flex items-center gap-1 transition-colors">
                      Select Location Profile <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                ))
              )}
            </div>
            
            <div className="flex justify-end pt-4 border-t border-slate-50">
              <Button onClick={() => setShowSelector(false)} className="bg-slate-200 hover:bg-slate-300 text-slate-700 h-10 px-6 rounded-xl font-bold">
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Real Reviews Showcase */}
        {user?.gmbLocationId && (
          <Card className="p-8 border border-slate-100 shadow-xl rounded-[2.5rem] bg-white space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-6 flex-wrap gap-4">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-indigo-500" />
                  Synced Google Reviews ({reviews.length})
                </h3>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Active reviews synched directly from your connected business location: <span className="font-bold text-slate-800">{user.gmbLocationName}</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                {isMockData && (
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Developer Mock Mode
                  </span>
                )}
                <Button 
                  onClick={loadReviews}
                  disabled={isLoadingReviews}
                  className="bg-slate-50 border border-slate-100 hover:bg-slate-100 text-slate-700 h-10 px-4 rounded-xl flex items-center gap-2 font-bold shadow-sm"
                >
                  <RefreshCcw className={`w-4 h-4 text-slate-500 ${isLoadingReviews ? 'animate-spin' : ''}`} />
                  Sync Feed
                </Button>
              </div>
            </div>

            {isLoadingReviews ? (
              <div className="space-y-4 py-8">
                {[1, 2].map(i => (
                  <div key={i} className="h-28 bg-slate-50 animate-pulse rounded-2xl" />
                ))}
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-12 text-slate-400 font-semibold">
                No reviews found for this GMB location yet. Once Google clients post reviews, they will display here.
              </div>
            ) : (
              <div className="space-y-6 pt-2">
                {reviews.map((rev, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all bg-slate-50/30 relative flex flex-col md:flex-row gap-6">
                    {/* Rating stars & avatar */}
                    <div className="flex md:flex-col items-start gap-3 shrink-0">
                      <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-black text-indigo-600 shadow-sm">
                        {rev.reviewerName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Sparkles 
                            key={idx} 
                            className={`w-3.5 h-3.5 ${
                              idx < rev.starRating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between gap-4">
                        <h4 className="font-bold text-slate-800 text-md">{rev.reviewerName}</h4>
                        <span className="text-[10px] text-slate-400 font-bold">
                          {new Date(rev.createTime).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                        </span>
                      </div>

                      <p className="text-slate-600 text-sm font-medium leading-relaxed">
                        {rev.comment || <span className="italic text-slate-400 font-normal">Rating posted without comment text.</span>}
                      </p>

                      {/* Reply Box */}
                      {rev.reply ? (
                        <div className="p-4 rounded-xl bg-indigo-50/40 border border-indigo-50 text-indigo-900/90 space-y-1">
                          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Your Google Business Reply</p>
                          <p className="text-xs font-semibold leading-relaxed">{rev.reply}</p>
                        </div>
                      ) : (
                        <div className="flex gap-2 items-center text-xs font-semibold text-slate-400">
                          <span className="inline-flex w-1.5 h-1.5 rounded-full bg-amber-400" />
                          No reply submitted yet. AI replies can respond to this immediately.
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
