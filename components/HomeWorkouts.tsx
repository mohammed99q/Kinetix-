import React, { useState, useEffect } from 'react';
import { Dumbbell, Clock, Flame, PlayCircle, BarChart, WifiOff, Target, X, Play, Pause, RotateCcw, Timer } from 'lucide-react';
import { WorkoutExercise } from '../types';

// Static Data - Works Offline
const WORKOUTS: WorkoutExercise[] = [
  {
    id: '1',
    name: 'تمرين الضغط (Push-ups)',
    target: 'الصدر، الكتفين، الترايسيبس',
    difficulty: 'متوسط',
    reps: '3 مجموعات × 12-15 تكرار',
    description: 'حافظ على استقامة جسمك من الرأس إلى الكعبين. اخفض جسمك حتى يلامس صدرك الأرض تقريباً، ثم ادفع للأعلى.'
  },
  {
    id: '2',
    name: 'القرفصاء (Squats)',
    target: 'القدمين، المؤخرة',
    difficulty: 'سهل',
    reps: '3 مجموعات × 20 تكرار',
    description: 'قف مع مباعدة القدمين بعرض الكتفين. انزل ببطء وكأنك تجلس على كرسي، وحافظ على استقامة ظهرك، ثم عد للوقوف.'
  },
  {
    id: '3',
    name: 'البلانك (Plank)',
    target: 'عضلات الجذع (Core)',
    difficulty: 'متوسط',
    reps: '3 مجموعات × 45-60 ثانية',
    description: 'استند على ساعديك وأطراف أصابع قدميك. حافظ على استقامة جسمك وشد عضلات البطن ولا تدع ظهرك ينحني.'
  },
  {
    id: '4',
    name: 'الطعن (Lunges)',
    target: 'الفخذين، التوازن',
    difficulty: 'متوسط',
    reps: '3 مجموعات × 12 تكرار لكل ساق',
    description: 'تقدم بساق واحدة للأمام واخفض وركيك حتى تنثني كلتا الركبتين بزاوية 90 درجة تقريباً.'
  },
  {
    id: '5',
    name: 'تمرين بيربي (Burpees)',
    target: 'كامل الجسم (كارديو وقوة)',
    difficulty: 'صعب',
    reps: '3 مجموعات × 10 تكرارات',
    description: 'ابدأ بالوقوف، انزل لوضع القرفصاء، ضع يديك على الأرض، اركل قدميك للخلف لوضع الضغط، قم بضغطة واحدة، اقفز للأمام ثم اقفز للأعلى.'
  },
  {
    id: '6',
    name: 'تمرين المعدة (Crunches)',
    target: 'عضلات البطن العلوية',
    difficulty: 'سهل',
    reps: '3 مجموعات × 20 تكرار',
    description: 'استلقِ على ظهرك مع ثني ركبتيك. ضع يديك خلف رأسك وارفع كتفيك عن الأرض باستخدام عضلات بطنك.'
  },
  {
    id: '7',
    name: 'تسلق الجبل (Mountain Climbers)',
    target: 'عضلات البطن، الكتفين، الكارديو',
    difficulty: 'متوسط',
    reps: '3 مجموعات × 45 ثانية',
    description: 'ابدأ بوضعية الضغط (بلانك عالي). اسحب ركبتك اليمنى نحو صدرك بسرعة، ثم بدلها باليسرى وكأنك تجري في مكانك مع الحفاظ على استقامة الظهر.'
  },
  {
    id: '8',
    name: 'القفز المفتوح (Jumping Jacks)',
    target: 'كامل الجسم، اللياقة القلبية',
    difficulty: 'سهل',
    reps: '3 مجموعات × 50 تكرار',
    description: 'قف مستقيماً. اقفز وباعد بين قدميك وارفع يديك فوق رأسك لتلتقيا، ثم عد لوضع البداية وكرر الحركة بإيقاع سريع لرفع معدل ضربات القلب.'
  },
  {
    id: '9',
    name: 'جسر المؤخرة (Glute Bridges)',
    target: 'المؤخرة، أوتار الركبة، أسفل الظهر',
    difficulty: 'سهل',
    reps: '3 مجموعات × 15-20 تكرار',
    description: 'استلقِ على ظهرك واثنِ ركبتيك مع تثبيت القدمين على الأرض. ارفع وركيك للأعلى واضغط على عضلات المؤخرة بقوة في القمة، ثم انزل ببطء دون لمس الأرض.'
  },
  {
    id: '10',
    name: 'المتوازي على الكرسي (Tricep Dips)',
    target: 'عضلة الترايسيبس (خلف الذراع)',
    difficulty: 'متوسط',
    reps: '3 مجموعات × 12 تكرار',
    description: 'اجلس على حافة كرسي ثابت. ضع يديك بجانب وركيك. أخرج جسمك عن الكرسي وانزل نحو الأرض بثني المرفقين حتى زاوية 90 درجة ثم ادفع للأعلى.'
  },
  {
    id: '11',
    name: 'اللف الروسي (Russian Twists)',
    target: 'عضلات البطن الجانبية (الخواصر)',
    difficulty: 'متوسط',
    reps: '3 مجموعات × 20 تكرار (مجموع الجانبين)',
    description: 'اجلس على الأرض واثنِ ركبتيك قليلاً. ارفع قدميك عن الأرض ومل بظهرك للخلف قليلاً مع الحفاظ على استقامته. لف جذعك يميناً ويساراً بلمس الأرض بيديك.'
  }
];

export const HomeWorkouts: React.FC = () => {
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutExercise | null>(null);
  
  // Timer State
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [timerMode, setTimerMode] = useState<'work' | 'rest'>('work');

  // Reset timer when workout changes
  useEffect(() => {
    if (selectedWorkout) {
        setTimerActive(false);
        setTimerMode('work');
        setTimeLeft(45);
    }
  }, [selectedWorkout]);

  // Timer Logic
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      // Auto-switch mode
      if (timerMode === 'work') {
          setTimerMode('rest');
          setTimeLeft(30); // 30s rest
      } else {
          setTimerMode('work');
          setTimeLeft(45); // 45s work
      }
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, timerMode]);

  const toggleTimer = () => setTimerActive(!timerActive);
  
  const resetTimer = () => {
    setTimerActive(false);
    setTimerMode('work');
    setTimeLeft(45);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const totalTime = timerMode === 'work' ? 45 : 30;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="space-y-8">
       <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 animate-slide-up">
        <div>
           <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
             التمارين المنزلية
             <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1.5 shadow-sm">
                <WifiOff className="w-3 h-3" /> بدون إنترنت
             </span>
           </h2>
           <p className="text-slate-400 text-lg">مكتبة تمارين شاملة مع مؤقت ذكي مدمج.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WORKOUTS.map((workout, index) => (
          <div 
            key={workout.id}
            onClick={() => setSelectedWorkout(workout)}
            style={{ animationDelay: `${index * 50}ms` }}
            className="bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 hover:border-blue-500/50 rounded-3xl p-6 transition-all duration-300 cursor-pointer group hover:-translate-y-2 hover:shadow-xl backdrop-blur-sm animate-slide-up"
          >
            <div className="flex justify-between items-start mb-6">
               <div className="w-14 h-14 rounded-2xl bg-slate-700/50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-900/40">
                  <Dumbbell className="w-7 h-7 text-slate-400 group-hover:text-white transition-colors" />
               </div>
               <span className={`text-xs px-3 py-1.5 rounded-full border font-medium ${
                 workout.difficulty === 'سهل' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                 workout.difficulty === 'متوسط' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                 'bg-red-500/10 text-red-400 border-red-500/20'
               }`}>
                 {workout.difficulty}
               </span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{workout.name}</h3>
            <p className="text-sm text-slate-400 mb-6 line-clamp-2 leading-relaxed">{workout.description}</p>
            
            <div className="flex items-center gap-4 text-xs text-slate-500 border-t border-slate-700/50 pt-4">
               <div className="flex items-center gap-1.5">
                 <Flame className="w-3.5 h-3.5 text-orange-500" />
                 <span>قوة عضلية</span>
               </div>
               <div className="flex items-center gap-1.5">
                 <Clock className="w-3.5 h-3.5 text-blue-500" />
                 <span>10-15 دقيقة</span>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedWorkout && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
           <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-8 shadow-2xl relative animate-scale-in my-8">
              <button 
                onClick={() => setSelectedWorkout(null)}
                className="absolute top-4 left-4 p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                 <h2 className="text-3xl font-bold text-white mb-3 pr-8">{selectedWorkout.name}</h2>
                 <span className={`text-xs px-3 py-1 rounded-full border inline-block ${
                    selectedWorkout.difficulty === 'سهل' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                    selectedWorkout.difficulty === 'متوسط' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                    'bg-red-500/10 text-red-400 border-red-500/20'
                 }`}>
                   {selectedWorkout.difficulty}
                 </span>
              </div>

              {/* Timer Section */}
              <div className="bg-slate-800/80 rounded-2xl p-6 mb-6 border border-slate-700 relative overflow-hidden">
                <div 
                    className={`absolute bottom-0 right-0 h-1 transition-all duration-1000 ease-linear ${timerMode === 'work' ? 'bg-blue-500' : 'bg-green-500'}`} 
                    style={{ width: `${100 - progress}%` }}
                ></div>
                
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Timer className={`w-5 h-5 ${timerMode === 'work' ? 'text-blue-400' : 'text-green-400'}`} />
                        <span className="text-slate-300 font-medium">{timerMode === 'work' ? 'وقت التمرين' : 'وقت الراحة'}</span>
                    </div>
                    <span className={`text-3xl font-mono font-bold ${timerMode === 'work' ? 'text-white' : 'text-green-400'}`}>
                        {formatTime(timeLeft)}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <button 
                        onClick={toggleTimer}
                        className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                            timerActive 
                            ? 'bg-yellow-600 hover:bg-yellow-500 text-white' 
                            : 'bg-blue-600 hover:bg-blue-500 text-white'
                        }`}
                    >
                        {timerActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        {timerActive ? 'إيقاف مؤقت' : 'ابدأ'}
                    </button>
                    <button 
                        onClick={resetTimer}
                        className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-slate-300 hover:text-white transition-all"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>
                </div>
              </div>

              <div className="space-y-4">
                 <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50">
                    <h4 className="text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
                        <BarChart className="w-4 h-4 text-blue-500" />
                        التكرارات المقترحة
                    </h4>
                    <p className="text-white text-lg font-medium tracking-wide">{selectedWorkout.reps}</p>
                 </div>

                 <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50">
                    <h4 className="text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
                        <PlayCircle className="w-4 h-4 text-purple-500" />
                        طريقة الأداء
                    </h4>
                    <p className="text-slate-300 leading-relaxed">
                        {selectedWorkout.description}
                    </p>
                 </div>

                 <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50">
                    <h4 className="text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4 text-red-500" />
                        العضلات المستهدفة
                    </h4>
                    <p className="text-slate-300">
                        {selectedWorkout.target}
                    </p>
                 </div>
              </div>

              <button 
                onClick={() => setSelectedWorkout(null)}
                className="w-full mt-8 bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 rounded-2xl transition-all"
              >
                إغلاق
              </button>
           </div>
        </div>
      )}
    </div>
  );
};