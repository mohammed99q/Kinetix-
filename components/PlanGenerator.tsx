import React, { useState } from 'react';
import { Dumbbell, Calendar, Target, ChevronDown, CheckCircle, Sparkles } from 'lucide-react';
import { generateTrainingPlan } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

export const PlanGenerator: React.FC = () => {
  const [profile, setProfile] = useState({
    sport: '',
    level: 'Intermediate',
    age: 25,
    expiryDate: '',
  });
  const [goals, setGoals] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
        const plan = await generateTrainingPlan(profile, goals);
        setResult(plan);
    } catch (err) {
        setResult('حدث خطأ. حاول مرة أخرى.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6 animate-slide-up">
            <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-3xl border border-slate-700 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-900/30">
                        <Calendar className="text-white w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-white">إعدادات الخطة</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="group">
                        <label className="block text-sm font-medium text-slate-400 mb-2 group-focus-within:text-purple-400 transition-colors">الرياضة</label>
                        <input 
                            type="text" 
                            required
                            placeholder="مثال: كرة القدم، كمال أجسام..." 
                            className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-all"
                            value={profile.sport}
                            onChange={e => setProfile({...profile, sport: e.target.value})}
                        />
                    </div>

                    <div className="group">
                        <label className="block text-sm font-medium text-slate-400 mb-2 group-focus-within:text-purple-400 transition-colors">المستوى</label>
                        <div className="relative">
                            <select 
                                className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-4 py-3 text-white appearance-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-all"
                                value={profile.level}
                                onChange={e => setProfile({...profile, level: e.target.value as any})}
                            >
                                <option value="Beginner">مبتدئ</option>
                                <option value="Intermediate">متوسط</option>
                                <option value="Advanced">متقدم</option>
                                <option value="Elite">نخبة</option>
                            </select>
                            <ChevronDown className="absolute left-3 top-4 w-4 h-4 text-slate-500 pointer-events-none" />
                        </div>
                    </div>

                    <div className="group">
                        <label className="block text-sm font-medium text-slate-400 mb-2 group-focus-within:text-purple-400 transition-colors">العمر</label>
                        <input 
                            type="number" 
                            className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-all"
                            value={profile.age}
                            onChange={e => setProfile({...profile, age: parseInt(e.target.value)})}
                        />
                    </div>

                    <div className="group">
                        <label className="block text-sm font-medium text-slate-400 mb-2 group-focus-within:text-purple-400 transition-colors">تاريخ انتهاء الخطة</label>
                        <input 
                            type="date" 
                            className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none [color-scheme:dark] transition-all"
                            value={profile.expiryDate}
                            onChange={e => setProfile({...profile, expiryDate: e.target.value})}
                        />
                    </div>

                    <div className="group">
                        <label className="block text-sm font-medium text-slate-400 mb-2 group-focus-within:text-purple-400 transition-colors">الهدف الرئيسي</label>
                        <textarea 
                            rows={3}
                            placeholder="مثال: زيادة السرعة الانفجارية وتحسين اللياقة الهوائية..." 
                            className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-all"
                            value={goals}
                            onChange={e => setGoals(e.target.value)}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-purple-900/40"
                    >
                        {loading ? (
                            <>
                                <Sparkles className="w-5 h-5 animate-spin" />
                                <span>جاري المعالجة...</span>
                            </>
                        ) : (
                            <>
                                <span>إنشاء الخطة</span>
                                <Target className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>
            </div>
            
            <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 backdrop-blur-sm animate-fade-in delay-200">
                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    نصائح للنتائج المثلى
                </h3>
                <ul className="text-sm text-slate-400 space-y-3 list-disc list-inside leading-relaxed">
                    <li>كلما كنت أكثر تحديداً في وصف أهدافك، كانت الخطة أكثر دقة وفعالية.</li>
                    <li>لا تنس ذكر أي إصابات سابقة لتجنب التمارين التي قد تضر بك.</li>
                    <li>يتم تصميم الخطط بناءً على مبادئ الحمل الزائد التدريجي.</li>
                </ul>
            </div>
        </div>

        <div className="lg:col-span-2 animate-slide-up delay-100">
            <div className="bg-slate-800/80 backdrop-blur-md p-8 rounded-3xl border border-slate-700 shadow-xl min-h-[600px] flex flex-col relative overflow-hidden">
                {result ? (
                    <div className="prose prose-invert prose-slate max-w-none animate-fade-in">
                        <div className="flex items-center justify-between mb-8 border-b border-slate-700 pb-6">
                            <h2 className="text-2xl font-bold text-white m-0">الخطة التدريبية المقترحة</h2>
                            <button 
                                onClick={() => setResult(null)} 
                                className="px-4 py-2 text-sm text-slate-300 hover:text-white bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors"
                            >
                                خطة جديدة
                            </button>
                        </div>
                         {/* Markdown rendering for the AI response */}
                         <div className="text-slate-300 whitespace-pre-line leading-relaxed">
                            <ReactMarkdown>{result}</ReactMarkdown>
                         </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-500 space-y-6">
                        <div className="w-24 h-24 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center mb-4">
                             <Dumbbell className="w-10 h-10 opacity-40" />
                        </div>
                        <p className="text-lg font-medium">قم بملء النموذج لإنشاء خطتك التدريبية الشخصية</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
