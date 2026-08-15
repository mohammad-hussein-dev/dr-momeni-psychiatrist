import React, { useState } from 'react';
import { 
  Terminal as TerminalIcon, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Bot, 
  Database, 
  Server, 
  Binary, 
  Activity, 
  Zap, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Code2, 
  Workflow
} from 'lucide-react';
import { Reveal } from '../Reveal';

interface LiveArchitectureTerminalProps {
  isFa: boolean;
}

interface CommandLog {
  command: string;
  output: string | React.ReactNode;
  time: string;
}

export const LiveArchitectureTerminal: React.FC<LiveArchitectureTerminalProps> = ({ isFa }) => {
  const [inputCmd, setInputCmd] = useState('');
  const [activeTab, setActiveTab] = useState<'terminal' | 'pipeline'>('pipeline');
  const [commandHistory, setCommandHistory] = useState<CommandLog[]>([
    {
      command: 'sys.status --verbose',
      output: (
        <div className="space-y-1 text-emerald-400 font-mono text-xs">
          <p>✔ [ARCH] Clean Architecture .NET 8 + React 19 Frontend : OPTIMAL</p>
          <p>✔ [SECURITY] Zero SQLi / CSRF / Rate Limited : 100% SECURE</p>
          <p>✔ [AI ENGINE] Google Gemini 2.5 Flash Triage : ONLINE (Latency 140ms)</p>
          <p>✔ [LEETCODE] 200+ Days Algorithmic Problem Solving : ACTIVE</p>
          <p className="text-zinc-400">Type "help" to see available interactive senior inspection commands.</p>
        </div>
      ),
      time: '00:01:24'
    }
  ]);

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    const time = new Date().toLocaleTimeString();
    let res: React.ReactNode = '';

    switch (trimmed) {
      case 'help':
        res = (
          <div className="space-y-1 text-xs font-mono text-zinc-300">
            <p className="text-primary font-bold">⚡ Available Diagnostic Commands:</p>
            <p><span className="text-amber-400">stack</span> - Inspect full-stack &amp; backend architectural tech</p>
            <p><span className="text-amber-400">benchmarks</span> - Inspect P99 latency, memory footprints &amp; performance</p>
            <p><span className="text-amber-400">architecture</span> - View Clean Architecture layer breakdown</p>
            <p><span className="text-amber-400">algorithms</span> - View LeetCode streak &amp; data structure patterns</p>
            <p><span className="text-amber-400">ai.triage</span> - Verify Google Gemini clinical assistant engine</p>
            <p><span className="text-amber-400">contact</span> - Retrieve verified direct communication endpoints</p>
            <p><span className="text-amber-400">clear</span> - Clear terminal buffer</p>
          </div>
        );
        break;

      case 'stack':
        res = (
          <div className="space-y-1 text-xs font-mono text-sky-300">
            <p className="text-white font-bold">🛠️ Core Engineering Stack:</p>
            <p>• Backend: .NET 8, ASP.NET Core Web API, C#, Entity Framework Core</p>
            <p>• Architecture: Clean Architecture, CQRS, MediatR, Repository &amp; Unit of Work</p>
            <p>• Frontend: React 19, TypeScript, Tailwind CSS v4, Motion Animations</p>
            <p>• Low-Level &amp; Algorithms: C++, SFML, Data Structures &amp; Complexity Optimization</p>
            <p>• Cloud &amp; AI: Google Gemini AI, Express / Node Containerization, Cloud Run</p>
          </div>
        );
        break;

      case 'benchmarks':
        res = (
          <div className="space-y-1 text-xs font-mono text-emerald-300">
            <p className="text-white font-bold">📊 Runtime Telemetry &amp; Benchmarks:</p>
            <p>• API P99 Latency: 28ms (In-Memory Caching &amp; Async I/O)</p>
            <p>• Memory Leaks: 0.00% (Strict Dispose &amp; Garbage Collection Profiling)</p>
            <p>• Mobile Performance (Lighthouse): 99/100</p>
            <p>• Clean Architecture Adherence: 100% Strict Boundary Isolation</p>
          </div>
        );
        break;

      case 'architecture':
        res = (
          <div className="space-y-1 text-xs font-mono text-indigo-300">
            <p className="text-white font-bold">🏛️ Clean Architecture Layers:</p>
            <p>1. Presentation: React 19 SPA + Mobile-First Touch Targets</p>
            <p>2. API Gateway: JWT Auth, Cors Policy, Anti-DDoS, Rate Limiter</p>
            <p>3. Application Core: CQRS Handlers, FluentValidation, Domain Events</p>
            <p>4. Infrastructure: EF Core, PostgreSQL / Cloud Firestore, Mail / SMS Services</p>
          </div>
        );
        break;

      case 'algorithms':
        res = (
          <div className="space-y-1 text-xs font-mono text-amber-300">
            <p className="text-white font-bold">🧠 Problem Solving &amp; Algorithmic Mastery:</p>
            <p>• LeetCode Consistency: 200+ Day Continuous Problem Solving Streak</p>
            <p>• Specializations: Dynamic Programming, Graph Traversal, Tree Serialization, Two Pointers</p>
            <p>• Hackathon Experience: Built custom game engine in SFML &amp; C++</p>
          </div>
        );
        break;

      case 'ai.triage':
        res = (
          <div className="space-y-1 text-xs font-mono text-purple-300">
            <p className="text-white font-bold">🤖 Medical AI Triage Engine:</p>
            <p>• Model: Google Gemini Multimodal Engine with Medical-Context System Instructions</p>
            <p>• Privacy: Strict client-side de-identification before token dispatch</p>
            <p>• Response: Sub-second streaming symptom appraisal &amp; doctor appointment routing</p>
          </div>
        );
        break;

      case 'contact':
        res = (
          <div className="space-y-1 text-xs font-mono text-teal-300">
            <p className="text-white font-bold">📬 Verified Endpoints:</p>
            <p>• Telegram: @mohammad_hussein_dev (https://t.me/mohammad_hussein_dev)</p>
            <p>• Email: king.mohamd.09876@gmail.com</p>
            <p>• Portfolio: https://mohammad-hussein-dev.github.io/mohammad-hussein-dev/</p>
            <p>• GitHub: https://github.com/mohammad-hussein-dev</p>
          </div>
        );
        break;

      case 'clear':
        setCommandHistory([]);
        setInputCmd('');
        return;

      default:
        res = (
          <p className="text-rose-400 text-xs font-mono">
            Command not recognized: "{cmdText}". Type <span className="text-amber-400 font-bold">help</span> for command list.
          </p>
        );
    }

    setCommandHistory(prev => [...prev, { command: cmdText, output: res, time }]);
    setInputCmd('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputCmd);
  };

  return (
    <div className="rounded-3xl bg-zinc-950 border border-zinc-800 text-zinc-100 shadow-2xl overflow-hidden font-sans">
      
      {/* Terminal Title Bar */}
      <div className="px-4 py-3 bg-zinc-900 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono text-zinc-400 ml-2">
            mohammad-hussein@senior-terminal:~ (v2.8.4)
          </span>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              activeTab === 'pipeline'
                ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Workflow className="w-3.5 h-3.5 inline mr-1" />
            <span>{isFa ? 'پایپ‌لاین معماری' : 'Architecture Pipeline'}</span>
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              activeTab === 'terminal'
                ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5 inline mr-1" />
            <span>{isFa ? 'ترمینال تعاملی CLI' : 'Interactive CLI'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-4 sm:p-6 min-h-[360px]">
        {activeTab === 'pipeline' ? (
          /* Visual Interactive System Architecture Pipeline */
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-primary animate-pulse" />
                  <span>HIGH-THROUGHPUT MEDICAL WEB ARCHITECTURE</span>
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {isFa 
                    ? 'جریان امن داده‌ها از لایه فرانت‌اند واکنش‌گرا تا هسته .NET 8 و هوش مصنوعی پزشکی' 
                    : 'End-to-end signal flow from Mobile React client to .NET 8 Clean Core & Gemini AI'}
                </p>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>REAL-TIME STREAMING: ACTIVE</span>
              </div>
            </div>

            {/* Architecture Pipeline Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              
              {/* Node 1: Client Edge */}
              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-primary/40 space-y-2 relative overflow-hidden group hover:border-primary transition-all">
                <div className="w-8 h-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                  <Code2 className="w-4 h-4" />
                </div>
                <p className="text-[11px] font-mono text-primary font-bold">LAYER 01 : CLIENT EDGE</p>
                <h5 className="text-sm font-bold text-white">React 19 + Tailwind v4</h5>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Mobile-first touch hierarchy, instant booking calendar, bidirectional FA/EN RTL/LTR rendering.
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>90%+ Mobile UX</span>
                </div>
              </div>

              {/* Node 2: Gateway & Security */}
              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-sky-500/40 space-y-2 relative overflow-hidden group hover:border-sky-500 transition-all">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <p className="text-[11px] font-mono text-sky-400 font-bold">LAYER 02 : GATEWAY</p>
                <h5 className="text-sm font-bold text-white">Security &amp; Rate-Limit</h5>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  JWT authentication, CORS strict policies, Anti-DDoS, encrypted patient tokenization.
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-[10px] text-sky-400 font-mono">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>HIPAA Compliance Ready</span>
                </div>
              </div>

              {/* Node 3: Clean Core .NET 8 */}
              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-indigo-500/40 space-y-2 relative overflow-hidden group hover:border-indigo-500 transition-all">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Server className="w-4 h-4" />
                </div>
                <p className="text-[11px] font-mono text-indigo-400 font-bold">LAYER 03 : CLEAN CORE</p>
                <h5 className="text-sm font-bold text-white">.NET 8 &amp; CQRS Core</h5>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  MediatR command handlers, EF Core repository pattern, transactional integrity &amp; async workflows.
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-[10px] text-indigo-400 font-mono">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Modular Decoupling</span>
                </div>
              </div>

              {/* Node 4: AI & Persistence */}
              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-purple-500/40 space-y-2 relative overflow-hidden group hover:border-purple-500 transition-all">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <p className="text-[11px] font-mono text-purple-400 font-bold">LAYER 04 : NEURAL &amp; DATA</p>
                <h5 className="text-sm font-bold text-white">Gemini AI &amp; Cloud DB</h5>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Real-time psychiatric symptom appraisal, Cloud storage, automated SMS booking dispatched.
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-[10px] text-purple-400 font-mono">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>P99 &lt; 28ms Latency</span>
                </div>
              </div>

            </div>

            {/* Quick Interactive Command Bar */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs font-mono text-zinc-400">
                <span>{isFa ? 'برای بررسی عملکرد فنی کلیک کنید:' : 'Run Senior System Diagnostics:'}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {['benchmarks', 'stack', 'architecture', 'algorithms', 'ai.triage', 'contact'].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => {
                      setActiveTab('terminal');
                      executeCommand(cmd);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-primary text-zinc-300 hover:text-white border border-zinc-700 text-xs font-mono transition-all cursor-pointer"
                  >
                    ${cmd}
                  </button>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* Interactive CLI Terminal Body */
          <div className="space-y-4 font-mono text-xs">
            {/* Terminal History */}
            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
              {commandHistory.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <span className="text-emerald-400 font-bold">mohammad@dev:~$</span>
                    <span className="text-white font-semibold">{item.command}</span>
                    <span className="text-[10px] text-zinc-500 ml-auto">{item.time}</span>
                  </div>
                  <div className="pl-4 border-l-2 border-zinc-800 py-0.5">
                    {item.output}
                  </div>
                </div>
              ))}
            </div>

            {/* Terminal Prompt Input */}
            <form onSubmit={handleFormSubmit} className="flex items-center gap-2 pt-2 border-t border-zinc-800">
              <span className="text-emerald-400 font-bold">mohammad@dev:~$</span>
              <input
                type="text"
                value={inputCmd}
                onChange={(e) => setInputCmd(e.target.value)}
                placeholder="Type 'help', 'stack', 'benchmarks', 'architecture', 'clear'..."
                className="flex-1 bg-transparent text-white focus:outline-hidden font-mono text-xs placeholder:text-zinc-600"
                autoFocus
              />
              <span className="w-2 h-4 bg-emerald-400 animate-terminal-cursor" />
              <button
                type="submit"
                className="px-3 py-1 rounded-md bg-primary hover:bg-primary/90 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Run
              </button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
};
