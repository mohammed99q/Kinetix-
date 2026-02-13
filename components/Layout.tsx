import React from 'react';
import { AppView } from '../types';
import { Activity, LayoutDashboard, MessageSquare, Calendar, Camera, Home, UserCircle } from 'lucide-react';

interface LayoutProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentView, setView, children }) => {
  const navItems = [
    { id: AppView.DASHBOARD, label: 'لوحة القيادة', icon: LayoutDashboard },
    { id: AppView.PROFILE, label: 'الملف الشخصي', icon: UserCircle },
    { id: AppView.AI_COACH, label: 'المستشار الرياضي', icon: MessageSquare },
    { id: AppView.PLAN_GENERATOR, label: 'تخطيط التدريب', icon: Calendar },
    { id: AppView.TECHNIQUE_ANALYSIS, label: 'تحليل الحركة', icon: Camera },
    { id: AppView.HOME_WORKOUTS, label: 'التمارين المنزلية', icon: Home },
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col md:flex-row text-right font-sans">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-950 border-l border-slate-800 z-20 shadow-2xl">
        <div className="p-8 border-b border-slate-800 flex items-center gap-4 animate-fade-in">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/30 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
            <Activity className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight leading-none">Kinetix</h1>
            <h1 className="font-bold text-xs text-blue-500 tracking-[0.2em] mt-1">PERFORMANCE</h1>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              style={{ animationDelay: `${index * 50}ms` }}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group animate-slide-up ${
                currentView === item.id
                  ? 'bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white shadow-lg shadow-blue-900/20 translate-x-2'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white hover:translate-x-1'
              }`}
            >
              <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-white' : 'text-slate-500 group-hover:text-blue-400 transition-colors'}`} />
              <span className="font-medium text-base tracking-wide">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800 animate-fade-in delay-300">
          <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800 flex items-center gap-3 backdrop-blur-sm mb-4">
             <div className="relative">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-ping absolute opacity-75"></div>
                <div className="w-2 h-2 rounded-full bg-green-500 relative"></div>
             </div>
             <p className="text-xs text-slate-400">النظام متصل</p>
          </div>
          
           <div className="text-center opacity-60 hover:opacity-100 transition-opacity">
            <p className="text-[10px] text-slate-500 font-medium tracking-wider">DEVELOPED BY</p>
            <p className="text-xs font-bold text-blue-500 mt-0.5 tracking-wide">MOHAMMED ALYASAR</p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-3">
           <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-blue-900/20 shadow-lg">
            <Activity className="text-white w-5 h-5" />
          </div>
          <span className="font-black text-lg text-white tracking-wide">Kinetix</span>
        </div>
      </div>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 w-full bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 flex justify-around p-2 z-50 safe-area-bottom pb-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)]">
         {navItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 ${
                currentView === item.id 
                ? 'text-blue-500 -translate-y-2 bg-slate-900 shadow-lg border border-slate-800' 
                : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <item.icon className={`w-6 h-6 mb-1 ${currentView === item.id ? 'stroke-[2.5px]' : ''}`} />
            </button>
          ))}
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-28 md:pb-8 relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
};