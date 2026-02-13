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
  const [userName, setUserName] = useState('الرياضي');

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
            <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
                مرحباً، <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{userName}</span> 👋
            </h2>
            <p className="text-slate-400 text-lg">نظرة شاملة على أدائك البدني.</p>
        </div>
        <div className="bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700/50 flex items-center gap-2 text-slate-300 backdrop-blur-sm shadow-sm">
            <CalendarDays className="w-4 h-4 text-blue-400" />
            <span>{new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50 hover:border-blue-500/30 hover:bg-slate-800/60 transition-all duration-300 backdrop-blur-sm relative overflow-hidden animate-slide-up delay-100">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">الحمل التدريبي</h3>
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <Activity className="text-blue-500 w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">850 <span className="text-sm font-normal text-slate-500">A.U.</span></p>
          <div className="text-sm text-green-400 flex items-center font-medium bg-green-500/10 w-fit px-2 py-1 rounded-lg border border-green-500/20">
            <TrendingUp className="w-3 h-3 ml-1" /> +12% تحسن
          </div>
        </div>

        <div className="group bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50 hover:border-yellow-500/30 hover:bg-slate-800/60 transition-all duration-300 backdrop-blur-sm relative overflow-hidden animate-slide-up delay-200">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">الجاهزية</h3>
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                <Zap className="text-yellow-500 w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">92%</p>
          <div className="text-sm text-slate-400">
            حالة بدنية ممتازة للأحمال العالية
          </div>
        </div>

        <div className="group bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50 hover:border-green-500/30 hover:bg-slate-800/60 transition-all duration-300 backdrop-blur-sm relative overflow-hidden animate-slide-up delay-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">الاستشفاء</h3>
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <Battery className="text-green-500 w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">8.5<span className="text-lg text-slate-500">/10</span></p>
          <div className="text-sm text-slate-400">
            جودة النوم: <span className="text-white">ممتازة</span>
          </div>
        </div>

         <div className="group bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50 hover:border-indigo-500/30 hover:bg-slate-800/60 transition-all duration-300 backdrop-blur-sm relative overflow-hidden animate-slide-up delay-400">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">البيانات الشخصية</h3>
             <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                <User className="text-indigo-500 w-5 h-5" />
            </div>
          </div>
          <p className="text-xl font-bold text-white mb-1">مُحدثة</p>
          <div className="text-sm text-slate-400">
             تم تحديث القياسات مؤخراً
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 animate-slide-up delay-300">
        <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50 backdrop-blur-md shadow-xl h-[450px] transition-transform hover:scale-[1.01] duration-500">
          <h3 className="text-xl font-bold text-white mb-8 border-r-4 border-blue-500 pr-3">الحمل التدريبي vs الاستشفاء</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
              <XAxis dataKey="day" stroke="#94a3b8" axisLine={false} tickLine={false} dy={10} tick={{fontSize: 12}} />
              <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} dx={-10} tick={{fontSize: 12}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#f8fafc', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                itemStyle={{ padding: '2px 0' }}
              />
              <Line type="monotone" dataKey="load" stroke="#3b82f6" strokeWidth={4} dot={{r: 4, strokeWidth: 2, fill:'#0f172a'}} activeDot={{r: 6, strokeWidth: 0}} name="الحمل" animationDuration={1500} />
              <Line type="monotone" dataKey="recovery" stroke="#10b981" strokeWidth={4} dot={{r: 4, strokeWidth: 2, fill:'#0f172a'}} activeDot={{r: 6, strokeWidth: 0}} name="الاستشفاء" animationDuration={1500} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50 backdrop-blur-md shadow-xl h-[450px] transition-transform hover:scale-[1.01] duration-500">
          <h3 className="text-xl font-bold text-white mb-8 border-r-4 border-purple-500 pr-3">مؤشر الجاهزية اليومي</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
              <XAxis dataKey="day" stroke="#94a3b8" axisLine={false} tickLine={false} dy={10} tick={{fontSize: 12}} />
              <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} dx={-10} tick={{fontSize: 12}} />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#f8fafc', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
              />
              <defs>
                <linearGradient id="colorReadiness" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Bar dataKey="readiness" fill="url(#colorReadiness)" radius={[8, 8, 0, 0]} name="الجاهزية" animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
