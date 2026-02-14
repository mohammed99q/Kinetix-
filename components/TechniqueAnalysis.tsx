import React, { useState, useRef } from 'react';
import { Camera, Upload, AlertCircle, ScanLine, X, Sparkles, Loader2 } from 'lucide-react';
import { analyzeTechniqueImage } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

export const TechniqueAnalysis: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    try {
        const base64Data = image.split(',')[1];
        const result = await analyzeTechniqueImage(base64Data, query);
        setAnalysis(result);
    } catch (err) {
        setAnalysis("فشل التحليل. الرجاء المحاولة مرة أخرى.");
    } finally {
        setLoading(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setAnalysis(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6 animate-slide-up">
            <div className="bg-slate-900/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-900/40 border border-white/10">
                        <Upload className="text-white w-7 h-7" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-white tracking-tight italic">تحميل الأداء</h2>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Biomechanical Scan</p>
                    </div>
                </div>

                {!image ? (
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-white/10 rounded-3xl h-80 flex flex-col items-center justify-center cursor-pointer hover:border-teal-500/50 hover:bg-slate-950/50 transition-all group duration-500"
                    >
                        <div className="w-20 h-20 rounded-[2rem] bg-slate-950 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-inner">
                            <Upload className="w-10 h-10 text-slate-600 group-hover:text-teal-400 transition-colors" />
                        </div>
                        <p className="text-slate-400 group-hover:text-slate-200 font-bold">ارفع صورة التمرين للتحليل</p>
                        <p className="text-[10px] text-slate-600 mt-3 font-black uppercase tracking-widest bg-slate-950 px-4 py-1.5 rounded-full border border-white/5">JPG, PNG, WebP</p>
                        <input 
                            ref={fileInputRef}
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleImageUpload}
                        />
                    </div>
                ) : (
                    <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black animate-scale-in group shadow-2xl">
                        <img src={image} alt="Upload" className="w-full h-auto max-h-[450px] object-contain mx-auto" />
                        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                             <button 
                                onClick={clearImage}
                                className="p-4 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white rounded-2xl border border-red-500/20 transition-all hover:scale-110 shadow-2xl"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                )}

                <div className="mt-8 space-y-5">
                     <div className="group">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block group-focus-within:text-teal-400 transition-colors">ملاحظة إضافية للذكاء الاصطناعي</label>
                        <input
                            type="text"
                            placeholder="مثال: هل زاوية الظهر صحيحة أثناء الرفع؟"
                            className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 focus:outline-none transition-all placeholder-slate-700 text-sm"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                     </div>
                     <button
                        onClick={handleAnalyze}
                        disabled={!image || loading}
                        className="w-full bg-gradient-to-r from-teal-600 to-emerald-700 hover:from-teal-500 hover:to-emerald-600 text-white font-black py-4.5 rounded-2xl transition-all disabled:opacity-30 flex items-center justify-center gap-3 shadow-2xl shadow-teal-900/40 transform active:scale-95"
                     >
                        {loading ? (
                            <>
                                <Loader2 className="w-6 h-6 animate-spin" />
                                <span className="uppercase tracking-widest">Processing...</span>
                            </>
                        ) : (
                            <>
                                <ScanLine className="w-6 h-6" />
                                <span className="uppercase tracking-widest">Start Analysis</span>
                            </>
                        )}
                     </button>
                </div>
            </div>
             
             <div className="bg-slate-900/40 border border-white/5 p-5 rounded-3xl flex items-start gap-4 backdrop-blur-sm animate-fade-in delay-200">
                <AlertCircle className="w-6 h-6 text-teal-500 shrink-0" />
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    يستخدم Kinetix Pro خوارزميات رؤية حاسوبية متقدمة لتحليل الزوايا المفصلية. النتائج تهدف للتحسين الرياضي ولا تعتبر تشخيصاً طبياً.
                </p>
             </div>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5 shadow-2xl min-h-[500px] animate-slide-up delay-100 flex flex-col relative overflow-hidden">
            <h3 className="text-sm font-black text-white mb-8 border-r-4 border-teal-500 pr-4 flex items-center gap-2 uppercase tracking-tighter">
                <Sparkles className="w-4 h-4 text-teal-400" />
                تقرير التحليل الحركي
            </h3>
            {analysis ? (
                <div className="prose prose-invert prose-slate max-w-none text-slate-300 animate-fade-in leading-relaxed text-sm">
                    <ReactMarkdown>{analysis}</ReactMarkdown>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-700 space-y-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-teal-500/5 rounded-full blur-3xl animate-pulse"></div>
                        <ScanLine className="w-24 h-24 stroke-[0.5] relative z-10 opacity-20" />
                    </div>
                    <p className="text-lg font-bold opacity-30 italic">في انتظار البيانات لتحليل الأداء</p>
                </div>
            )}
        </div>
    </div>
  );
};