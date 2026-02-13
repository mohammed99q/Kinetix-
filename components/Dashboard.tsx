import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, Zap, Battery, TrendingUp, CalendarDays, User } from 'lucide-react';
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
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/60 pb-6 animate-slide-up">
        <div>
            <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">
                مرحباً، <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{userName}</span>
            </h2>
            <p className="text-slate-400 text-lg font-medium">تحليلات الأداء العلمي ليومك التدريبي.</p>
        </div>
        <div className="bg-slate-800/50 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2 text-slate-300 backdrop-blur-sm shadow-sm">
            <CalendarDays className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-bold tracking-tight">{new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="group bg-slate-800/30 p-5 rounded-3xl border border-white/5 hover:border-blue-500/30 hover:bg-slate-800/60 transition-all duration-300 backdrop-blur-sm relative overflow-hidden animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 font-bold text-xs uppercase tracking-widest">الحمل</h3>
            <Activity className="text-blue-500 w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-white mb-1">850</p>
          <div className="text-[10px] text-green-400 font-bold flex items-center">
            <TrendingUp className="w-3 h-3 ml-1" /> +12% تحسن
          </div>
        </div>

        <div className="group bg-slate-800/30 p-5 rounded-3xl border border-white/5 hover:border-yellow-500/30 hover:bg-slate-800/60 transition-all duration-300 backdrop-blur-sm relative overflow-hidden animate-slide-up delay-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 font-bold text-xs uppercase tracking-widest">الجاهزية</h3>
            <Zap className="text-yellow-500 w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-white mb-1">92%</p>
          <div className="text-[10px] text-slate-500 font-bold">حالة بدنية مثالية</div>
        </div>

        <div className="group bg-slate-800/30 p-5 rounded-3xl border border-white/5 hover:border-green-500/30 hover:bg-slate-800/60 transition-all duration-300 backdrop-blur-sm relative overflow-hidden animate-slide-up delay-150">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 font-bold text-xs uppercase tracking-widest">الاستشفاء</h3>
            <Battery className="text-green-500 w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-white mb-1">8.5</p>
          <div className="text-[10px] text-slate-500 font-bold">جودة النوم: ممتازة</div>
        </div>

         <div className="group bg-slate-800/30 p-5 rounded-3xl border border-white/5 hover:border-indigo-500/30 hover:bg-slate-800/60 transition-all duration-300 backdrop-blur-sm relative overflow-hidden animate-slide-up delay-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 font-bold text-xs uppercase tracking-widest">المستوى</h3>
            <User className="text-indigo-500 w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-white mb-1">مُتقدم</p>
          <div className="text-[10px] text-slate-500 font-bold">تم التحديث اليوم</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 animate-slide-up">
        <div className="bg-slate-800/40 p-6 rounded-3xl border border-white/5 backdrop-blur-md shadow-xl h-[400px]">
          <h3 className="text-lg font-black text-white mb-8 border-r-4 border-blue-500 pr-3 uppercase tracking-tighter">الحمل vs الاستشفاء</h3>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" vertical={false} opacity={0.05} />
              <XAxis dataKey="day" stroke="#64748b" axisLine={false} tickLine={false} dy={10} tick={{fontSize: 10, fontWeight: 'bold'}} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
              />
              <Line type="monotone" dataKey="load" stroke="#3b82f6" strokeWidth={4} dot={false} animationDuration={1000} />
              <Line type="monotone" dataKey="recovery" stroke="#10b981" strokeWidth={4} dot={false} animationDuration={1000} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/40 p-6 rounded-3xl border border-white/5 backdrop-blur-md shadow-xl h-[400px]">
          <h3 className="text-lg font-black text-white mb-8 border-r-4 border-yellow-500 pr-3 uppercase tracking-tighter">مؤشر الجاهزية</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" vertical={false} opacity={0.05} />
              <XAxis dataKey="day" stroke="#64748b" axisLine={false} tickLine={false} dy={10} tick={{fontSize: 10, fontWeight: 'bold'}} />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.03)'}}
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
              />
              <Bar dataKey="readiness" fill="#6366f1" radius={[6, 6, 0, 0]} animationDuration={1000} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};