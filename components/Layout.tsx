import React from 'react';
import { AppView } from '../types';
import { LayoutDashboard, MessageSquare, Calendar, Camera, Home, UserCircle } from 'lucide-react';

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
    <div className="flex flex-col h-full bg-slate-950 text-right overflow-hidden">
      {/* Header الثابت كأنه تطبيق أصلي */}
      <header className="safe-top bg-slate-950/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
          </div>
          <span className="font-black text-lg text-white tracking-tight">Kinetix</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 overflow-hidden">
           <img src="https://placehold.co/100x100/3b82f6/white.png?text=U" alt="profile" />
        </div>
      </header>

      {/* منطقة المحتوى - تمرير داخلي فقط */}
      <main className="flex-1 overflow-y-auto custom-scrollbar pb-32">
        <div className="max-w-4xl mx-auto p-5">
          {children}
        </div>
      </main>

      {/* الشريط السفلي - مظهر التطبيقات الأصلية */}
      <nav className="safe-bottom fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-2xl border-t border-white/5 px-4 pt-3 pb-6 flex justify-around items-center z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className="flex flex-col items-center gap-1 min-w-[64px] transition-all relative"
            >
              <div className={`p-2 rounded-2xl transition-all ${isActive ? 'bg-blue-600 text-white scale-110 shadow-lg shadow-blue-900/40' : 'text-slate-500 hover:text-slate-300'}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className={`text-[10px] font-bold ${isActive ? 'text-blue-400' : 'text-slate-500'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -top-3 w-1 h-1 bg-blue-500 rounded-full blur-[2px]"></div>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};