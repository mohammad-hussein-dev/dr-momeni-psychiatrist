import React, { useState } from 'react';
import { 
  Server, 
  Code2, 
  Binary, 
  Bot, 
  Award, 
  Zap, 
  ShieldCheck, 
  CheckCircle2,
  FileCode,
  Flame,
  Gauge,
  Layers,
  Sparkles
} from 'lucide-react';
import { Reveal } from '../Reveal';
import { SectionHeading } from '../site/SectionHeading';

interface SeniorMetricsDeckProps {
  isFa: boolean;
}

export const SeniorMetricsDeck: React.FC<SeniorMetricsDeckProps> = ({ isFa }) => {
  const [activeStackTab, setActiveStackTab] = useState<'backend' | 'frontend' | 'algorithms' | 'ai'>('backend');

  const stackDetails = {
    backend: {
      title: isFa ? 'معماری مقیاس‌پذیر و سیستم‌های بک‌اند (.NET 8)' : 'Scalable Backend Architecture (.NET 8)',
      description: isFa
        ? 'طراحی میکروسرویس‌ها و وب‌سرویس‌های سازمانی با استاندارد Clean Architecture، تزریق وابستگی (DI)، الگوی CQRS با کتابخانه MediatR و مدیریت پایگاه داده با Entity Framework Core.'
        : 'Enterprise-grade backend systems built with Clean Architecture, Dependency Injection, CQRS pattern via MediatR, and high-performance ORM queries with EF Core.',
      highlights: [
        'ASP.NET Core Web API & MVC Architecture',
        'Repository Pattern & Unit of Work for transactional safety',
        'Clean Architecture with strict Domain/Application/Infrastructure layers',
        'SQL Server & PostgreSQL relational performance indexing'
      ],
      codeSnippet: `// MediatR Command Handler with Clean Architecture
public class BookAppointmentCommandHandler : IRequestHandler<BookAppointmentCommand, Result<Guid>>
{
    private readonly IAppointmentRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public async Task<Result<Guid>> Handle(BookAppointmentCommand request, CancellationToken ct)
    {
        var appointment = Appointment.Create(request.PatientId, request.DoctorId, request.Slot);
        await _repository.AddAsync(appointment, ct);
        await _unitOfWork.SaveChangesAsync(ct);
        return Result<Guid>.Success(appointment.Id);
    }
}`
    },
    frontend: {
      title: isFa ? 'فرانت‌اند مدرن، سریع و دوزبانه (React 19 & TypeScript)' : 'Modern Responsive Frontend (React 19 & TypeScript)',
      description: isFa
        ? 'توسعه رابط‌های کاربری بلادرنگ، هماهنگ با روان‌شناسی رنگ‌ها و بهینه‌سازی شده برای بیش از ۹۰ درصد مراجعین موبایلی با زمان پاسخ‌دهی زیر ثانیه.'
        : 'Modern responsive SPAs built for optimal psychological comfort, mobile-first touch ergonomics, and sub-second transitions.',
      highlights: [
        'React 19, TypeScript strict mode & Tailwind CSS v4',
        'Fluid bidirectional layout engine (Full RTL / LTR)',
        'Zero-CLS layout stability and 60FPS fluid motion',
        'Decoupled state management & offline-first caching'
      ],
      codeSnippet: `// Modern React 19 Custom Clinical Hook with Bi-directional Support
export function useClinicalSchedule(doctorId: string) {
  const { lang, isRTL } = useLanguage();
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  
  const reserveSlot = useCallback(async (slotId: string, patientData: PatientDTO) => {
    const res = await api.post('/appointments/reserve', { slotId, ...patientData });
    return res.data;
  }, []);

  return { slots, reserveSlot, isRTL };
}`
    },
    algorithms: {
      title: isFa ? 'الگوریتم‌ها، ساختار داده و حل مسئله (LeetCode 200+ Streak)' : 'Data Structures & Algorithms (LeetCode 200+ Streak)',
      description: isFa
        ? 'بیش از ۲۰۰ روز استمرار بی‌وقفه در حل مسائل الگوریتمی و بهینه‌سازی پیچیدگی زمانی و حافظه‌ای (Time & Space Complexity) در زبان‌های C++ و C#.'
        : 'Consistent 200+ day problem-solving streak with deep mastery of graph algorithms, dynamic programming, and memory optimization in C++ and C#.',
      highlights: [
        '200+ Consecutive Days LeetCode Problem Solving Streak',
        'Graph algorithms, BFS/DFS, Trees, and Dynamic Programming',
        'Hackathon Experience: SFML 2D Game Engine built in C++',
        'Optimal Big-O Time & Space Complexity design'
      ],
      codeSnippet: `// Efficient Algorithmic Problem Solving (C++)
class Solution {
public:
    int minTriageCost(vector<int>& costs, vector<vector<int>>& graph) {
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
        vector<int> dist(graph.size(), INT_MAX);
        pq.push({0, 0});
        dist[0] = 0;
        // Dijkstra's Shortest Path Optimization: O(E log V)
        while(!pq.empty()) {
            auto [d, u] = pq.top(); pq.pop();
            if (d > dist[u]) continue;
            for(int v : graph[u]) {
                if (dist[u] + costs[v] < dist[v]) {
                    dist[v] = dist[u] + costs[v];
                    pq.push({dist[v], v});
                }
            }
        }
        return dist.back();
    }
};`
    },
    ai: {
      title: isFa ? 'هوش مصنوعی سلامت و تریاژ روان‌پزشکی' : 'AI Healthcare & Psychiatric Triage Engine',
      description: isFa
        ? 'یکپارچه‌سازی مدل‌های پیشرفته زبانی و چندحالته با رعایت حریم خصوصی بالینی، فیلترهای تریاژ اورژانسی و اتصال به تقویم نوبت‌دهی آنلاین.'
        : 'Multimodal AI integration with clinical safety guardrails, emergency symptom escalation, and direct appointment routing.',
      highlights: [
        'Google Gemini 2.5 Multimodal SDK Integration',
        'Context-aware medical triage system prompts',
        'De-identified clinical session logs for user privacy',
        'Automated slot reservation recommendations'
      ],
      codeSnippet: `// Server-Side Google GenAI Clinical Triage Guardrail
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function evaluatePsychiatricSymptom(userQuery: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: userQuery,
    config: {
      systemInstruction: "You are a psychiatric triage assistant for Dr. Fatemeh Momeni's clinic..."
    }
  });
  return response.text;
}`
    }
  };

  const currentStack = stackDetails[activeStackTab];

  return (
    <div className="space-y-12">
      
      {/* 1. Senior Metric Banners */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-3xl bg-card border border-border/80 shadow-2xs space-y-1.5 text-center group hover:border-primary/50 transition-all">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
            <Flame className="w-5 h-5" />
          </div>
          <p className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground mt-2">200+</p>
          <p className="text-xs font-bold text-foreground">{isFa ? 'روز استمرار در LeetCode' : 'LeetCode Streak Days'}</p>
          <p className="text-[10px] text-muted-foreground">{isFa ? 'حل الگوریتم‌های پیشرفته' : 'Advanced Problem Solving'}</p>
        </div>

        <div className="p-5 rounded-3xl bg-card border border-border/80 shadow-2xs space-y-1.5 text-center group hover:border-primary/50 transition-all">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <Gauge className="w-5 h-5" />
          </div>
          <p className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground mt-2">&lt; 35ms</p>
          <p className="text-xs font-bold text-foreground">{isFa ? 'زمان تاخیر P99' : 'P99 Response Latency'}</p>
          <p className="text-[10px] text-muted-foreground">{isFa ? 'پاسخ سریع و بهینه' : 'High Throughput Web APIs'}</p>
        </div>

        <div className="p-5 rounded-3xl bg-card border border-border/80 shadow-2xs space-y-1.5 text-center group hover:border-primary/50 transition-all">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <Layers className="w-5 h-5" />
          </div>
          <p className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground mt-2">100%</p>
          <p className="text-xs font-bold text-foreground">{isFa ? 'معماری تمیز (Clean Arch)' : 'Clean Architecture'}</p>
          <p className="text-[10px] text-muted-foreground">{isFa ? 'کد ماژولار و تفکیک‌شده' : 'Strict Layer Decoupling'}</p>
        </div>

        <div className="p-5 rounded-3xl bg-card border border-border/80 shadow-2xs space-y-1.5 text-center group hover:border-primary/50 transition-all">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <p className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground mt-2">Grade A+</p>
          <p className="text-xs font-bold text-foreground">{isFa ? 'استاندارد امنیت و رازداری' : 'Security & Privacy'}</p>
          <p className="text-[10px] text-muted-foreground">{isFa ? 'عدم افشای داده‌های بالینی' : 'HIPAA Ready Compliance'}</p>
        </div>

      </div>

      {/* 2. Interactive Technical Stack Inspector */}
      <div className="rounded-3xl bg-card border border-border/80 p-6 sm:p-8 shadow-md">
        
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-5">
          <div>
            <span className="text-xs font-mono font-bold text-primary tracking-wider uppercase">
              {isFa ? 'بررسی عمیق کد و الگوهای مهندسی' : 'Code Inspection & Architectural Deep-Dive'}
            </span>
            <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground mt-1">
              {isFa ? 'استک و الگوهای پیاده‌سازی شده' : 'Architectural Pillars & Implementation'}
            </h3>
          </div>

          {/* Stack Tab Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-muted/60 border border-border/60">
            <button
              onClick={() => setActiveStackTab('backend')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeStackTab === 'backend'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Server className="w-3.5 h-3.5 inline mr-1" />
              <span>.NET 8 &amp; Backend</span>
            </button>

            <button
              onClick={() => setActiveStackTab('frontend')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeStackTab === 'frontend'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 inline mr-1" />
              <span>React 19 &amp; UX</span>
            </button>

            <button
              onClick={() => setActiveStackTab('algorithms')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeStackTab === 'algorithms'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Binary className="w-3.5 h-3.5 inline mr-1" />
              <span>LeetCode &amp; C++</span>
            </button>

            <button
              onClick={() => setActiveStackTab('ai')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeStackTab === 'ai'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Bot className="w-3.5 h-3.5 inline mr-1" />
              <span>AI Triage</span>
            </button>
          </div>
        </div>

        {/* Tab Detail Grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-5 space-y-4 text-start">
            <h4 className="font-heading font-bold text-foreground text-base">
              {currentStack.title}
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {currentStack.description}
            </p>

            <div className="space-y-2 pt-2">
              {currentStack.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-4 font-mono text-xs overflow-x-auto custom-scrollbar shadow-inner text-zinc-200" dir="ltr">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800 text-[11px] text-zinc-400">
                <span className="flex items-center gap-1.5 text-primary">
                  <FileCode className="w-3.5 h-3.5" />
                  <span>{activeStackTab.toUpperCase()}_PATTERN.cs</span>
                </span>
                <span>UTF-8 • Clean Code</span>
              </div>
              <pre className="text-zinc-300 leading-relaxed font-mono">
                <code>{currentStack.codeSnippet}</code>
              </pre>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
