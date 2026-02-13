import React from 'react';
import { AppView } from '../types';
import { LayoutDashboard, MessageSquare, Camera, Home, UserCircle } from 'lucide-react';

interface LayoutProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentView, setView, children }) => {
  const navItems = [
    { id: AppView.DASHBOARD, label: 'الرئيسية', icon: LayoutDashboard },
    { id: AppView.AI_COACH, label: 'المدرب', icon: MessageSquare },
    { id: AppView.TECHNIQUE_ANALYSIS, label: 'التحليل', icon: Camera },
    { id: AppView.HOME_WORKOUTS, label: 'التمارين', icon: Home },
    { id: AppView.PROFILE, label: 'حسابي', icon: UserCircle },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-950 text-right overflow-hidden relative">
      {/* Header */}
      <header className="safe-top bg-slate-950/80 backdrop-blur-2xl border-b border-white/[0.03] px-6 py-4 flex items-center justify-between z-40 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/20 border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 .44-2.2a2.3 2.3 0 0 0-2.24-2.8h-8.4a2.3 2.3 0 0 0-2.24 2.8L6 22"/><path d="m18 2-.44 2.2a2.3 2.3 0 0 1-2.24 2.8h-8.4a2.3 2.3 0 0 1-2.24-2.8L6 2"/></svg>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl text-white tracking-tight leading-none">Kinetix</span>
            <span className="text-[10px] text-blue-400 font-bold tracking-widest uppercase mt-0.5">Pro Science</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-white/5 overflow-hidden p-0.5 shadow-inner">
           <img src="https://placehold.co/100x100/3b82f6/white.png?text=U" alt="profile" className="w-full h-full rounded-[0.8rem] object-cover" />
        </div>
      </header>

      {/* منطقة المحتوى القابلة للتمرير */}
      <main className="flex-1 scroll-container custom-scrollbar pb-32">
        <div className="max-w-4xl mx-auto p-5">
          {children}
        </div>
      </main>

      {/* الشريط السفلي */}
      <nav className="safe-bottom fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-3xl border-t border-white/[0.03] px-4 pt-3 pb-6 flex justify-around items-center z-50 shadow-[0_-15px_40px_rgba(0,0,0,0.8)]">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className="flex flex-col items-center gap-1 min-w-[64px] transition-all relative outline-none"
            >
              <div className={`p-2.5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-blue-600 text-white scale-110 shadow-xl shadow-blue-900/60' : 'text-slate-600 hover:text-slate-400'}`}>
                <item.icon className={`w-6 h-6 ${isActive ? 'drop-shadow-sm' : ''}`} />
              </div>
              <span className={`text-[10px] font-bold transition-colors ${isActive ? 'text-blue-400' : 'text-slate-600'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};