
import React, { useState, useEffect } from 'react';
import { User, Save, Target, Ruler, Weight, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';

export const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Mohammed Alyasar',
    sport: 'رياضي محترف',
    level: 'Advanced',
    age: 25,
    weight: 75,
    height: 175,
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('userProfile');
    if (savedData) {
      setProfile(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="mb-8 border-b border-slate-800 pb-6 animate-slide-up">
        <h2 className="text-3xl font-bold text-white mb-2">الملف الشخصي</h2>
        <p className="text-slate-400">قم بتحديث بياناتك للحصول على خطط وتحليلات أكثر دقة.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 animate-slide-up delay-100">
          <div className="bg-slate-800/80 p-8 rounded-3xl border border-slate-700 flex flex-col items-center text-center shadow-xl backdrop-blur-md h-full">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-6 shadow-2xl shadow-blue-900/40 transform hover:scale-105 transition-transform duration-500">
              <span className="text-5xl font-bold text-white">{profile.name.charAt(0).toUpperCase() || 'M'}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{profile.name || 'Mohammed Alyasar'}</h3>
            <p className="text-blue-400 font-medium mb-6 bg-blue-500/10 px-3 py-1 rounded-full text-sm">{profile.sport || 'رياضي شامل'}</p>
            
            <div className="w-full space-y-4 mt-auto">
               <div className="bg-slate-900/50 p-4 rounded-2xl flex justify-between items-center border border-slate-700/50">
                  <span className="text-slate-400 text-sm">مؤشر الكتلة (BMI)</span>
                  <span className="text-white font-bold text-lg">
                    {profile.weight && profile.height 
                        ? (profile.weight / ((profile.height/100) ** 2)).toFixed(1) 
                        : '--'}
                  </span>
               </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 animate-slide-up delay-200">
           <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 backdrop-blur-sm shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                  <label className="text-sm font-medium text-slate-400 flex items-center gap-2 group-focus-within:text-blue-400 transition-colors">
                    <User className="w-4 h-4" /> الاسم الكامل
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all"
                    placeholder="اسمك هنا"
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="text-sm font-medium text-slate-400 flex items-center gap-2 group-focus-within:text-blue-400 transition-colors">
                    <Target className="w-4 h-4" /> الرياضة الأساسية
                  </label>
                  <input
                    type="text"
                    name="sport"
                    value={profile.sport}
                    onChange={handleChange}
                    className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all"
                    placeholder="مثال: كرة القدم"
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="text-sm font-medium text-slate-400 group-focus-within:text-blue-400 transition-colors">المستوى</label>
                  <div className="relative">
                    <select
                        name="level"
                        value={profile.level}
                        onChange={handleChange}
                        className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all appearance-none"
                    >
                        <option value="Beginner">مبتدئ</option>
                        <option value="Intermediate">متوسط</option>
                        <option value="Advanced">متقدم</option>
                        <option value="Elite">نخبة</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label className="text-sm font-medium text-slate-400 group-focus-within:text-blue-400 transition-colors">العمر</label>
                  <input
                    type="number"
                    name="age"
                    value={profile.age}
                    onChange={handleChange}
                    className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="text-sm font-medium text-slate-400 flex items-center gap-2 group-focus-within:text-blue-400 transition-colors">
                    <Weight className="w-4 h-4" /> الوزن (كجم)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={profile.weight}
                    onChange={handleChange}
                    className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="text-sm font-medium text-slate-400 flex items-center gap-2 group-focus-within:text-blue-400 transition-colors">
                    <Ruler className="w-4 h-4" /> الطول (سم)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={profile.height}
                    onChange={handleChange}
                    className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="mt-10 flex items-center gap-6 border-t border-slate-700/50 pt-6">
                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-900/40 flex items-center gap-2 transform active:scale-95 hover:-translate-y-0.5"
                >
                  <Save className="w-5 h-5" />
                  حفظ التغييرات
                </button>
                
                {saved && (
                  <span className="text-green-400 font-medium animate-pulse flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20">
                    <CheckCircle2 className="w-4 h-4" /> تم الحفظ بنجاح!
                  </span>
                )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
