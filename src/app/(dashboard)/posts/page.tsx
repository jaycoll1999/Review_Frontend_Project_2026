'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { 
  Sparkles, 
  Calendar, 
  Image as ImageIcon, 
  Send, 
  Wand2, 
  Check, 
  Eye, 
  Layout, 
  Type,
  Clock,
  MoreHorizontal
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function PostsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Special Offers');
  const [prompt, setPrompt] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Posts Auth Error:", e);
      }
    }
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 3000)),
      {
        loading: 'AI is crafting your post...',
        success: 'New post suggestions ready!',
        error: 'Failed to generate post.',
      }
    ).then(() => setIsGenerating(false));
  };

  const categories = [
    { name: 'Special Offers', icon: Sparkles, color: 'text-orange-600', bg: 'bg-orange-50' },
    { name: 'New Arrivals', icon: Layout, color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Events', icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Updates', icon: Type, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  const suggestions = [
    {
      title: "Weekend Flash Sale! ⚡",
      content: `Don't miss out on our exclusive weekend offers at ${user?.businessName || 'our store'}! Visit us this Saturday for special discounts on all premium services. #LocalBusiness #SpecialOffer`,
      time: "Scheduled for Tomorrow, 10:00 AM",
      category: "Special Offers"
    },
    {
      title: "Limited Time Bundle 🎁",
      content: `Get more for less! Check out our new value bundles designed to give you the best experience at ${user?.businessName || 'our shop'}. Available only this week!`,
      time: "Suggested by AI",
      category: "Special Offers"
    },
    {
      title: "New Spring Collection is Here! 🌸",
      content: `The wait is over! Experience the finest selection of spring essentials now available at ${user?.businessName || 'our location'}. Come say hi and explore what's new.`,
      time: "Suggested by AI",
      category: "New Arrivals"
    },
    {
      title: "Fresh Inventory Alert 📦",
      content: `We just restocked your favorites! From premium tools to everyday essentials, find everything you need at ${user?.businessName || 'our store'} today.`,
      time: "Suggested by AI",
      category: "New Arrivals"
    },
    {
      title: "Community Appreciation Day 🤝",
      content: `Join us next Friday for a special community event at ${user?.businessName || 'our office'}. Refreshments, networking, and a special giveaway await!`,
      time: "Suggested by AI",
      category: "Events"
    },
    {
      title: "Workshop: Master Your Skills 🎓",
      content: `Sign up for our upcoming hands-on workshop! Learn from the experts at ${user?.businessName || 'our team'} and take your performance to the next level.`,
      time: "Suggested by AI",
      category: "Events"
    },
    {
      title: "We've Expanded Our Hours! ⏰",
      content: `Great news! To better serve you, ${user?.businessName || 'our business'} will now be open until 8:00 PM on weekdays. See you soon!`,
      time: "Suggested by AI",
      category: "Updates"
    },
    {
      title: "New Health & Safety Protocols ✅",
      content: `Your safety is our priority. We've updated our guidelines at ${user?.businessName || 'our location'} to ensure a clean and comfortable experience for everyone.`,
      time: "Suggested by AI",
      category: "Updates"
    }
  ];

  const filteredSuggestions = suggestions.filter(s => s.category === selectedCategory);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-10 py-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">AI Post Assistant</h1>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-600 text-white rounded-lg">
                <Sparkles className="w-3 h-3 fill-white" />
                <span className="text-[10px] font-black uppercase tracking-wider">Beta</span>
              </div>
            </div>
            <p className="text-lg font-medium text-slate-500">Auto-generate engaging Google Business updates in seconds.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="h-14 px-8 rounded-2xl flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Calendar
            </Button>
            <Button onClick={handleGenerate} disabled={isGenerating} className="h-14 px-8 rounded-2xl bg-black text-white shadow-xl flex items-center gap-3 active:scale-95 transition-all">
              <Wand2 className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span className="font-bold">{isGenerating ? 'AI is Writing...' : 'Generate New Suggestions'}</span>
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Categories & Prompt */}
          <div className="lg:col-span-4 space-y-8">
            <Card title="Write with AI" subtitle="Describe your post or topic">
              <div className="space-y-6">
                <div className="relative">
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. We are having a 20% discount on coffee this weekend..."
                    className="w-full h-32 p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none resize-none"
                  />
                  <div className="absolute bottom-4 right-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    AI Enhanced
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <button 
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 gap-2 ${
                        selectedCategory === cat.name 
                          ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-100' 
                          : 'bg-white border-slate-100 text-slate-600 hover:border-purple-200'
                      }`}
                    >
                      <cat.icon className={`w-5 h-5 ${selectedCategory === cat.name ? 'text-white' : cat.color}`} />
                      <span className="text-[10px] font-black uppercase tracking-tight">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            <Card title="Search Preview" className="p-0 overflow-hidden bg-slate-50/50">
              <div className="p-6 bg-white m-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-500">
                    {user?.businessName?.[0] || 'G'}
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-slate-900">{user?.businessName || 'Your Business'}</p>
                    <p className="text-[8px] text-slate-400 font-bold">Post • 2 mins ago</p>
                  </div>
                </div>
                <div className="aspect-video bg-slate-100 rounded-xl mb-3 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-slate-300" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">{prompt || 'Your post title here...'}</h4>
                <p className="text-[10px] text-slate-500 line-clamp-2">The full description of your AI generated post will appear here for review before publishing.</p>
                <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-[8px] font-black text-purple-600 uppercase tracking-widest">Learn More</span>
                  <Eye className="w-3 h-3 text-slate-300" />
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: AI Suggestions Feed */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">AI Suggested Feed</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Sort by:</span>
                <button className="flex items-center gap-1 text-xs font-black text-slate-900 uppercase tracking-widest">
                  Latest
                  <MoreHorizontal className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {filteredSuggestions.map((post, i) => (
                <Card key={i} className="p-0 overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-500 group">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 aspect-square md:aspect-auto bg-slate-100 relative overflow-hidden">
                       <div className="absolute inset-0 flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-slate-300" />
                       </div>
                       <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-slate-900 shadow-sm border border-slate-100">
                          {post.category}
                       </div>
                    </div>
                    <div className="flex-1 p-8 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="text-xl font-black text-slate-900 leading-tight">{post.title}</h4>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                            <Clock className="w-3 h-3" />
                            {post.time}
                          </div>
                        </div>
                        <Button variant="outline" className="w-10 h-10 p-0 rounded-xl shrink-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <p className="text-sm font-medium text-slate-500 leading-relaxed">
                        {post.content}
                      </p>

                      <div className="pt-4 flex flex-wrap gap-3">
                        <Button className="bg-purple-600 text-white font-bold px-6 h-12 rounded-xl flex items-center gap-2 shadow-lg shadow-purple-100 hover:scale-[1.02] transition-transform">
                          <Check className="w-4 h-4" />
                          Approve & Publish
                        </Button>
                        <Button variant="outline" className="font-bold px-6 h-12 rounded-xl flex items-center gap-2 border-slate-200 hover:bg-slate-50">
                          <Send className="w-4 h-4" />
                          Edit Suggestion
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Empty State / More */}
            <Card className="py-12 border-dashed border-2 border-slate-200 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-slate-200" />
              </div>
              <p className="text-sm font-bold text-slate-400">Want more tailored ideas?</p>
              <button onClick={handleGenerate} className="text-purple-600 font-black text-xs uppercase tracking-widest mt-2 hover:underline">Click to Refresh Feed</button>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
