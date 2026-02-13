import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { getAiCoachResponse } from '../services/geminiService';

export const AiCoach: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: 'مرحباً! أنا مستشارك الرياضي الشخصي. كيف يمكنني مساعدتك اليوم في التغذية، التدريب، أو الاستشفاء؟',
      timestamp: Date.now(),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
        const history = messages.map(m => ({
            role: m.role,
            parts: [{ text: m.content }]
        }));

        const responseText = await getAiCoachResponse(history, userMsg.content);

        const botMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            content: responseText,
            timestamp: Date.now(),
        };
        setMessages(prev => [...prev, botMsg]);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-slate-900/80 backdrop-blur-md rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl animate-scale-in">
        <header className="bg-slate-800/40 p-5 border-b border-white/5 flex items-center backdrop-blur-xl">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center ml-4 shadow-lg shadow-blue-900/40 border border-white/10">
                <Sparkles className="text-white w-6 h-6" />
            </div>
            <div>
                <h3 className="font-bold text-white text-lg tracking-tight">المستشار الرياضي الذكي</h3>
                <p className="text-[10px] text-blue-400 flex items-center gap-1.5 font-black uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span> متصل الآن
                </p>
            </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-950/20 custom-scrollbar">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'} animate-slide-up`}>
                     {msg.role === 'user' && (
                        <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-white/5 flex items-center justify-center ml-3 mt-1 shadow-md">
                            <User className="w-5 h-5 text-slate-400" />
                        </div>
                    )}
                    <div className={`max-w-[85%] p-5 rounded-3xl shadow-xl backdrop-blur-sm transition-all ${
                        msg.role === 'user' 
                            ? 'bg-slate-800/60 text-slate-100 rounded-tr-none border border-white/5' 
                            : 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-tl-none shadow-blue-900/30 border border-white/10'
                    }`}>
                        <div className="whitespace-pre-wrap leading-relaxed text-[15px]">
                            {msg.content}
                        </div>
                    </div>
                    {msg.role === 'model' && (
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3 mt-1 shadow-lg border border-white/10">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                    )}
                </div>
            ))}
            {loading && (
                 <div className="flex justify-end animate-fade-in">
                    <div className="bg-slate-800/40 border border-white/5 p-4 rounded-3xl rounded-tl-none flex items-center mr-14 shadow-sm backdrop-blur-sm">
                        <Loader2 className="w-4 h-4 text-blue-400 animate-spin ml-3" />
                        <span className="text-xs text-slate-400 font-bold">جاري تحليل البيانات...</span>
                    </div>
                 </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-slate-900/60 border-t border-white/5 backdrop-blur-2xl">
            <div className="relative flex items-center max-w-4xl mx-auto">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="اسأل عن التغذية، التمارين، أو الاستشفاء..."
                    className="w-full bg-slate-950/80 border border-white/5 text-white rounded-[1.5rem] py-5 px-6 pl-16 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder-slate-600 shadow-inner text-sm"
                />
                <button 
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className="absolute left-3 p-3 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 rounded-2xl text-white transition-all transform active:scale-95 disabled:opacity-30 shadow-lg shadow-blue-900/40"
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </div>
    </div>
  );
};