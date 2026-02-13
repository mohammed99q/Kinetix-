import React, { useState } from 'react';
import { AppView } from '../types';
import { Activity, LayoutDashboard, MessageSquare, Calendar, Camera, Home, UserCircle, Linkedin, Github, Menu, X } from 'lucide-react';

interface LayoutProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentView, setView, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: AppView.DASHBOARD, label: 'لوحة القيادة', icon: LayoutDashboard },
    { id: AppView.PROFILE, label: 'الملف الشخصي', icon: UserCircle },
    { id: AppView.AI_COACH, label: 'المستشار الرياضي', icon: MessageSquare },
    { id: AppView.PLAN_GENERATOR, label: 'تخطيط التدريب', icon: Calendar },
    { id: AppView.TECHNIQUE_ANALYSIS, label: 'تحليل الحركة', icon: Camera },
    { id: AppView.HOME_WORKOUTS, label: 'التمارين المنزلية', icon: Home },
  ];

  const handleMobileNav = (view: AppView) => {
    setView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col md:flex-row text-right font-sans">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-950 border-l border-slate-800 z-20 shadow-2xl sticky top-0 h-screen">
        <div className="p-8 border-b border-slate-800 flex items-center gap-4 animate-fade-in">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/30 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
            <Activity className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight leading-none">Kinetix</h1>
            <h1 className="font-bold text-xs text-blue-500 tracking-[0.2em] mt-1">PERFORMANCE</h1>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
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
          
           <div className="text-center">
            <p className="text-[10px] text-slate-500 font-medium tracking-wider mb-2">DEVELOPED BY</p>
            <p className="text-xs font-bold text-blue-500 tracking-wide mb-3">MOHAMMED ALYASAR</p>
            
            <div className="flex justify-center gap-3">
              <a 
                href="https://www.linkedin.com/in/mohammed-alyasar99/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-slate-700 transition-all transform hover:scale-110"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://github.com/mohammed99q" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all transform hover:scale-110"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
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
        <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-sm md:hidden flex flex-col pt-20 px-6 pb-6 animate-fade-in">
            <nav className="flex-1 space-y-3">
                {navItems.map((item) => (
                    <button
                    key={item.id}
                    onClick={() => handleMobileNav(item.id)}
                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                        currentView === item.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                        : 'bg-slate-800/50 text-slate-300'
                    }`}
                    >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium text-lg">{item.label}</span>
                    </button>
                ))}
            </nav>

             <div className="mt-8 p-6 bg-slate-800/50 rounded-3xl border border-slate-700/50 text-center">
                <p className="text-[10px] text-slate-500 font-medium tracking-wider mb-2">DEVELOPED BY</p>
                <p className="text-sm font-bold text-blue-400 tracking-wide mb-4">MOHAMMED ALYASAR</p>
                
                <div className="flex justify-center gap-4">
                <a 
                    href="https://www.linkedin.com/in/mohammed-alyasar99/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-3 bg-slate-900 rounded-xl text-slate-400 hover:text-blue-500 border border-slate-700"
                >
                    <Linkedin className="w-5 h-5" />
                </a>
                <a 
                    href="https://github.com/mohammed99q" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-3 bg-slate-900 rounded-xl text-slate-400 hover:text-white border border-slate-700"
                >
                    <Github className="w-5 h-5" />
                </a>
                </div>
            </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-4rem)] md:h-screen bg-slate-900">
        <div className="max-w-7xl mx-auto h-full">
            {children}
        </div>
      </main>
    </div>
  );
};