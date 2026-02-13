import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
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
        // Convert internal message format to Gemini history format
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
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-slate-900/80 backdrop-blur-md rounded-3xl overflow-hidden border border-slate-700 shadow-2xl animate-scale-in">
        <header className="bg-slate-800/80 p-4 border-b border-slate-700 flex items-center backdrop-blur-md">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center ml-4 shadow-lg shadow-blue-900/40">
                <Sparkles className="text-white w-6 h-6" />
            </div>
            <div>
                <h3 className="font-bold text-white text-lg">المستشار الرياضي</h3>
                <p className="text-xs text-blue-400 flex items-center gap-1 font-medium">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> متاح الآن
                </p>
            </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-900/30">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'} animate-slide-up`}>
                     {msg.role === 'user' && (
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center ml-3 mt-1 shadow-md">
                            <User className="w-5 h-5 text-slate-400" />
                        </div>
                    )}
                    <div className={`max-w-[80%] p-5 rounded-2xl shadow-md backdrop-blur-sm transition-all ${
                        msg.role === 'user' 
                            ? 'bg-slate-800/80 text-slate-100 rounded-tr-none border border-slate-700' 
                            : 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-tl-none shadow-blue-900/20'
                    }`}>
                        <div className="whitespace-pre-wrap leading-relaxed">
                            {msg.content}
                        </div>
                    </div>
                    {msg.role === 'model' && (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mr-3 mt-1 shadow-lg shadow-blue-900/30">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                    )}
                </div>
            ))}
            {loading && (
                 <div className="flex justify-end animate-fade-in">
                    <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl rounded-tl-none flex items-center mr-14 shadow-sm backdrop-blur-sm">
                        <Loader2 className="w-5 h-5 text-blue-400 animate-spin ml-3" />
                        <span className="text-sm text-slate-300">جاري التحليل...</span>
                    </div>
                 </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-slate-800/50 border-t border-slate-700 backdrop-blur-md">
            <div className="relative flex items-center max-w-4xl mx-auto">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="اكتب استفسارك هنا..."
                    className="w-full bg-slate-900/80 border border-slate-600 text-white rounded-2xl py-4 px-6 pl-14 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-500 shadow-inner"
                />
                <button 
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className="absolute left-2 p-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-white transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/40"
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </div>
    </div>
  );
};
