import React, { useState, useEffect } from 'react';
import { User, Save, Target, Ruler, Weight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { UserProfile } from '../types';

const SUPABASE_URL = 'https://dfiuyknywzwocovxqkez.supabase.co';
const SUPABASE_KEY = 'sb_publishable_B8_r-aOFn6vquQTPd-7Yng_S35sCPy7';

export const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    sport: '',
    level: 'Intermediate',
    age: 0,
    weight: 0,
    height: 0,
  });
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // الحصول على معرف فريد للمستخدم أو إنشاؤه
  const getUserId = () => {
    let id = localStorage.getItem('kinetix_user_id');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('kinetix_user_id', id);
    }
    return id;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setFetching(true);
      try {
        const userId = getUserId();
        const response = await fetch(`${SUPABASE_URL}/rest/v1/user_profiles?id=eq.${userId}`, {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        });
        const data = await response.json();
        if (data && data.length > 0) {
          setProfile(data[0]);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile({ 
      ...profile, 
      [name]: (name === 'age' || name === 'weight' || name === 'height') ? Number(value) : value 
    });
    setSaved(false);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const userId = getUserId();
      const payload = { ...profile, id: userId, updated_at: new Date().toISOString() };
      
      const response = await fetch(`${SUPABASE_URL}/rest/v1/user_profiles`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('فشل حفظ البيانات في السحابة');

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError('تعذر الاتصال بقاعدة البيانات. تأكد من إعدادات Supabase.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-slate-500">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-500" />
        <p>جاري تحميل بياناتك من السحابة...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="mb-8 border-b border-slate-800 pb-6 animate-slide-up">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">إعدادات الحساب</h2>
        <p className="text-slate-400">بياناتك محفوظة بشكل آمن ومزامنة مع قاعدة بيانات Kinetix Pro.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 animate-slide-up delay-100">
          <div className="bg-slate-900/80 p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center shadow-xl backdrop-blur-md h-full">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-6 shadow-2xl shadow-blue-900/40 transform hover:rotate-3 transition-transform duration-500">
              <User className="text-white w-16 h-16" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{profile.name || 'مستخدم جديد'}</h3>
            <p className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-6">{profile.sport || 'لم يتم تحديد الرياضة'}</p>
            
            <div className="w-full space-y-4 mt-auto">
               <div className="bg-slate-950/50 p-4 rounded-2xl flex justify-between items-center border border-white/5">
                  <span className="text-slate-500 text-xs font-bold uppercase">كتلة الجسم (BMI)</span>
                  <span className="text-white font-black text-lg">
                    {profile.weight && profile.height 
                        ? (profile.weight / ((profile.height/100) ** 2)).toFixed(1) 
                        : '--'}
                  </span>
               </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 animate-slide-up delay-200">
           <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 backdrop-blur-sm shadow-xl relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="space-y-2 group">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 group-focus-within:text-blue-400 transition-colors">
                    الاسم بالكامل
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 focus:outline-none transition-all"
                    placeholder="أدخل اسمك"
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 group-focus-within:text-blue-400 transition-colors">
                    الرياضة
                  </label>
                  <input
                    type="text"
                    name="sport"
                    value={profile.sport}
                    onChange={handleChange}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 focus:outline-none transition-all"
                    placeholder="مثال: كمال أجسام"
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] group-focus-within:text-blue-400 transition-colors">المستوى</label>
                  <select
                      name="level"
                      value={profile.level}
                      onChange={handleChange}
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 focus:outline-none transition-all appearance-none"
                  >
                      <option value="Beginner">مبتدئ</option>
                      <option value="Intermediate">متوسط</option>
                      <option value="Advanced">متقدم</option>
                      <option value="Elite">نخبة</option>
                  </select>
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] group-focus-within:text-blue-400 transition-colors">العمر</label>
                  <input
                    type="number"
                    name="age"
                    value={profile.age || ''}
                    onChange={handleChange}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 group-focus-within:text-blue-400 transition-colors">
                    الوزن (كجم)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={profile.weight || ''}
                    onChange={handleChange}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 group-focus-within:text-blue-400 transition-colors">
                    الطول (سم)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={profile.height || ''}
                    onChange={handleChange}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {error && (
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}

              <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/5 pt-6 relative z-10">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black py-3.5 px-10 rounded-2xl transition-all shadow-xl shadow-blue-900/40 flex items-center gap-3 transform active:scale-95"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  مزامنة وحفظ البيانات
                </button>
                
                {saved && (
                  <span className="text-emerald-400 font-bold flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4" /> تم التحديث في السحابة
                  </span>
                )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};