import React, { useState, useRef } from 'react';
import { Camera, Upload, AlertCircle, ScanLine, X, Sparkles } from 'lucide-react';
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
        // Remove data URL prefix for API
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
            <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-3xl border border-slate-700 shadow-xl">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-900/30">
                        <Camera className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">تحليل الأداء الحركي</h2>
                        <p className="text-sm text-slate-400">ارفع فيديو أو صورة لتحليل الميكانيكا الحيوية.</p>
                    </div>
                </div>

                {!image ? (
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-slate-600 rounded-3xl h-72 flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 hover:bg-slate-700/30 transition-all group duration-300"
                    >
                        <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="w-8 h-8 text-slate-500 group-hover:text-teal-500 transition-colors" />
                        </div>
                        <p className="text-slate-400 group-hover:text-slate-200 font-medium">اضغط لرفع صورة أو اسحبها هنا</p>
                        <p className="text-xs text-slate-600 mt-2 bg-slate-900 px-3 py-1 rounded-full">JPG, PNG up to 5MB</p>
                        <input 
                            ref={fileInputRef}
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleImageUpload}
                        />
                    </div>
                ) : (
                    <div className="relative rounded-3xl overflow-hidden border border-slate-600 bg-black animate-scale-in group">
                        <img src={image} alt="Upload" className="w-full h-auto max-h-[400px] object-contain mx-auto" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <button 
                                onClick={clearImage}
                                className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full backdrop-blur-sm transition-transform hover:scale-110 shadow-xl"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                )}

                <div className="mt-6 space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">هل لديك استفسار محدد؟ (اختياري)</label>
                        <input
                            type="text"
                            placeholder="مثال: هل زاوية الركبة صحيحة؟"
                            className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none transition-all"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                     </div>
                     <button
                        onClick={handleAnalyze}
                        disabled={!image || loading}
                        className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-teal-900/40 transform active:scale-95"
                     >
                        {loading ? (
                            <>
                                <ScanLine className="w-5 h-5 animate-spin" />
                                <span>جاري المعالجة...</span>
                            </>
                        ) : (
                            <>
                                <ScanLine className="w-5 h-5" />
                                <span>بدء التحليل</span>
                            </>
                        )}
                     </button>
                </div>
            </div>
             
             <div className="bg-yellow-900/10 border border-yellow-700/30 p-4 rounded-2xl flex items-start gap-3 backdrop-blur-sm animate-fade-in delay-200">
                <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" />
                <p className="text-sm text-yellow-200/70 leading-relaxed">
                    تنويه: التحليل يتم بواسطة خوارزميات متقدمة ولكنه لا يغني عن استشارة المدرب المختص لتصحيح الأداء بشكل مباشر لتجنب الإصابات.
                </p>
             </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md p-8 rounded-3xl border border-slate-700 shadow-xl min-h-[400px] animate-slide-up delay-100 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-400" />
                نتائج التحليل البيوميكانيكي
            </h3>
            {analysis ? (
                <div className="prose prose-invert prose-slate max-w-none text-slate-300 animate-fade-in leading-relaxed">
                    <ReactMarkdown>{analysis}</ReactMarkdown>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-500 opacity-50 space-y-4">
                    <ScanLine className="w-20 h-20 stroke-1" />
                    <p className="text-lg">النتائج ستظهر هنا بعد معالجة الصورة</p>
                </div>
            )}
        </div>
    </div>
  );
};
