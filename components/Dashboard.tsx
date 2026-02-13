import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Zap, Battery, TrendingUp, CalendarDays, User, Microscope, Info } from 'lucide-react';
import { TrainingMetric } from '../types';

const data: TrainingMetric[] = [
  { day: 'السبت', load: 65, recovery: 80, readiness: 90 },
  { day: 'الأحد', load: 85, recovery: 60, readiness: 75 },
  { day: 'الاثنين', load: 45, recovery: 90, readiness: 95 },
  { day: 'الثلاثاء', load: 90, recovery: 40, readiness: 60 },
  { day: 'الأربعاء', load: 55, recovery: 70, readiness: 85 },
  { day: 'الخميس', load: 95, recovery: 30, readiness: 50 },
  { day: 'الجمعة', load: 20, recovery: 95, readiness: 100 },
];

export const Dashboard: React.FC = () => {
  const [userName, setUserName] = useState('أيها البطل');

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.name) setUserName(profile.name);
    }
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 animate-slide-up">
        <div>
            <div className="flex items-center gap-2 mb-1">
                <Microscope className="w-4 h-4 text-blue-500" />
                <span className="text-blue-500 font-black text-xs uppercase tracking-widest">Sport Science Lab</span>
            </div>
            <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">
                مرحباً، <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{userName}</span>
            </h2>
            <p className="text-slate-400 text-lg font-medium">تحليلات الأداء الحيوي والميكانيكا الحيوية.</p>
        </div>
        <div className="bg-slate-900/80 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2 text-slate-300 backdrop-blur-md shadow-lg">
            <CalendarDays className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-bold tracking-tight">{new Date().toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
        </div>
      </header>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'حمل التدريب', value: '850', sub: '+12% تحسن', icon: Activity, color: 'blue' },
          { label: 'مؤشر الجاهزية', value: '92%', sub: 'حالة مثالية', icon: Zap, color: 'yellow' },
          { label: 'نقاط الاستشفاء', value: '8.5', sub: 'نوم عميق', icon: Battery, color: 'green' },
          { label: 'تصنيف الأداء', value: 'PRO', sub: 'نخبة رياضية', icon: TrendingUp, color: 'indigo' }
        ].map((item, i) => (
          <div key={i} className="group bg-slate-900/50 p-5 rounded-[2rem] border border-white/5 hover:border-blue-500/30 transition-all duration-500 backdrop-blur-sm relative overflow-hidden animate-slide-up" style={{animationDelay: `${i * 100}ms`}}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em]">{item.label}</h3>
              <item.icon className={`text-${item.color}-500 w-4 h-4`} />
            </div>
            <p className="text-3xl font-black text-white mb-1 tracking-tighter">{item.value}</p>
            <div className={`text-[10px] text-${item.color}-400 font-bold`}>{item.sub}</div>
            <div className="absolute -bottom-2 -right-2 opacity-5">
                <item.icon className="w-16 h-16" />
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Scientific Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 animate-slide-up">
        <div className="bg-slate-900/60 p-6 rounded-[2.5rem] border border-white/5 backdrop-blur-xl shadow-2xl h-[400px] relative">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black text-white border-r-4 border-blue-500 pr-3 uppercase tracking-tighter">التوازن الحيوي (الحمل/الاستشفاء)</h3>
            <Info className="w-4 h-4 text-slate-600 cursor-help" />
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" vertical={false} opacity={0.03} />
              <XAxis dataKey="day" stroke="#475569" axisLine={false} tickLine={false} dy={10} tick={{fontSize: 10, fontWeight: 'bold'}} />
              <YAxis hide domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '16px', fontSize: '12px' }}
                itemStyle={{ padding: '2px 0' }}
              />
              <Area type="monotone" dataKey="load" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" />
              <Area type="monotone" dataKey="recovery" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRec)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900/60 p-6 rounded-[2.5rem] border border-white/5 backdrop-blur-xl shadow-2xl h-[400px]">
          <h3 className="text-sm font-black text-white mb-8 border-r-4 border-indigo-500 pr-3 uppercase tracking-tighter">مؤشر الجاهزية العضلية العصبية</h3>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" vertical={false} opacity={0.03} />
              <XAxis dataKey="day" stroke="#475569" axisLine={false} tickLine={false} dy={10} tick={{fontSize: 10, fontWeight: 'bold'}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '16px' }}
              />
              <Line type="stepAfter" dataKey="readiness" stroke="#6366f1" strokeWidth={4} dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Science Tips */}
      <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-3xl flex items-start gap-4 animate-slide-up">
          <div className="bg-blue-500 p-2 rounded-xl">
              <Microscope className="w-5 h-5 text-white" />
          </div>
          <div>
              <h4 className="text-blue-400 font-bold mb-1">توصية مختبر الأداء</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                  بناءً على حمل التدريب المرتفع في الـ 48 ساعة الماضية وانخفاض مؤشر الاستشفاء لـ 30%، نوصي بجلسة تدليك رياضي وتناول وجبة غنية بالكربوهيدرات المعقدة لتعويض مخازن الجليكوجين.
              </p>
          </div>
      </div>
    </div>
  );
};