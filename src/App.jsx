/* --- START OF FILE App.jsx --- */

import React from 'react'
import Logo from './assets/logo_transparent.png';
import ChatWidget from "./components/ChatWidget";

export default function App() {
  return (
    <div className="relative min-h-screen text-slate-200 overflow-x-hidden font-sans selection:bg-sky-500/30">
      
      {/* --- AMBIENT BACKGROUND LAYER --- */}
      {/* This creates the glowing "Apple" style mesh gradients behind the glass */}
      <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-600/20 rounded-full blur-3xl opacity-50 mix-blend-screen animate-blob filter" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl opacity-50 mix-blend-screen animate-blob animation-delay-2000 filter" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50 mix-blend-screen animate-blob animation-delay-4000 filter" />
        {/* Subtle noise texture overlay to give it that premium 'film' grain */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* --- NAVBAR --- */}
      <header className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-6xl px-4">
        <div className="glass-panel rounded-full px-6 py-3 flex items-center justify-between shadow-lg shadow-black/20">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Berengard Logo" className="w-10 h-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
            <div className="font-semibold tracking-wide text-white text-lg hidden sm:block">Berengard</div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <a href="#book" className="px-5 py-2 rounded-full bg-white text-slate-900 hover:bg-sky-50 font-semibold transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Consult
            </a>
          </nav>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-medium uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              Accepting new clients
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              AI made <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-200 to-indigo-300">simple</span> & practical.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed">
              We cut through the hype to help small businesses choose the right tools, implement them quickly, and train teams for real growth.
            </p>
            
            <div className="flex flex-wrap gap-4" id="book">
              <a href="#contact" className="px-8 py-4 rounded-2xl bg-gradient-to-b from-sky-500 to-sky-700 text-white hover:brightness-110 shadow-[0_0_30px_rgba(14,165,233,0.3)] transition-all font-medium">
                Book free consult
              </a>
              <a href="#services" className="px-8 py-4 rounded-2xl glass-panel hover:bg-white/10 transition-all font-medium text-white">
                Explore services
              </a>
            </div>
          </div>

          <div className="relative hidden md:block">
             {/* Abstract representation of Logo in Glass */}
             <div className="relative w-full aspect-square max-w-md mx-auto glass-panel rounded-3xl flex items-center justify-center p-12 hover:scale-[1.02] transition-transform duration-700">
                <img src={Logo} alt="Berengard Logo" className="w-full h-full object-contain drop-shadow-2xl opacity-90" />
                {/* Reflection glint */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
             </div>
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF --- */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {title: "Fast wins", desc: "Measurable improvements in weeks, not months."},
            {title: "Tool-agnostic", desc: "We recommend what fits you, not a specific vendor."},
            {title: "Human-centric", desc: "Hands-on workshops and playbooks for your team."},
          ].map((b, i) => (
            <div key={i} className="glass-panel rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-lg font-semibold text-white mb-2">{b.title}</h3>
              <p className="text-sm text-slate-400">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- SERVICES --- */}
      <section id="services" className="py-24 relative">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-16 md:text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Curated Services</h2>
            <p className="text-slate-400">Starter packages tailored to your workflows. Transparent pricing, clear outcomes.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard title="AI Readiness Audit" price="From $950" points={[
              "Process & tools assessment",
              "Top 5 AI opportunities",
              "90-day ROI roadmap"
            ]} />
            <ServiceCard title="Support Chatbot" price="Starter / Premium" points={[
              "Zendesk or Custom OpenAI",
              "Train on your documents",
              "24/7 automated triage"
            ]} />
            <ServiceCard title="Productivity Automations" price="From $1,500" points={[
              "Email → CRM logging",
              "Quote → Invoice workflows",
              "Zapier / Make / Power Automate"
            ]} />
            <ServiceCard title="Smart Marketing" price="From $1,200" points={[
              "Content & campaigns",
              "Personalized outreach",
              "HubSpot / Canva AI setup"
            ]} />
            <ServiceCard title="Data & Analytics" price="From $2,400" points={[
              "Power BI dashboards",
              "Staffing & inventory forecasting",
              "Data hygiene checks"
            ]} />
            <ServiceCard title="Web Starter" price="From $1,200" points={[
              "Modern React + Tailwind",
              "Contact form + email",
              "AI chat integration"
            ]} />
          </div>
        </div>
      </section>

      {/* --- ABOUT --- */}
      <section id="about" className="py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="glass-panel rounded-3xl p-8 md:p-12 grid md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold text-white mb-6">About Berengard</h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                Founded by Steven Kania and registered in Tennessee, Berengard Technologies helps small and mid-size businesses adopt AI the practical way—focusing on concrete outcomes like faster support, leaner operations, and better forecasting. 
              </p>
              <p className="text-slate-300 leading-relaxed text-lg mt-4">
                We strip away the jargon. We don't sell magic; we build systems that save you time.
              </p>
            </div>
            <div className="bg-slate-900/50 rounded-2xl border border-white/5 p-6">
              <h3 className="font-semibold text-sky-400 mb-4 uppercase tracking-widest text-xs">Core Stack</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">✦ ChatGPT / Claude / Copilot</li>
                <li className="flex items-center gap-2">✦ Zendesk / Intercom</li>
                <li className="flex items-center gap-2">✦ Zapier / Make</li>
                <li className="flex items-center gap-2">✦ Power BI / Vertex AI</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-5">
              
              {/* Info Side */}
              <div className="bg-gradient-to-br from-sky-900 to-slate-900 p-10 md:col-span-2 flex flex-col justify-between text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-2">Let's Talk</h2>
                  <p className="text-sky-200 text-sm mb-8">Tell us your bottleneck. We'll propose a fix.</p>
                  <div className="space-y-4 text-sm">
                    <div>
                      <div className="opacity-50 text-xs uppercase tracking-wide mb-1">Email</div>
                      <a href="mailto:hello@berengard.tech" className="hover:text-sky-300 transition-colors">hello@berengard.tech</a>
                    </div>
                    <div>
                      <div className="opacity-50 text-xs uppercase tracking-wide mb-1">Location</div>
                      <span>Tennessee, USA</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Side */}
              <div className="p-10 md:col-span-3 bg-slate-900/50">
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  action="/success.html"
                  className="space-y-5"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden"><label>Don’t fill this out if you’re human: <input name="bot-field" /></label></p>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">Name</label>
                      <input name="name" type="text" required className="glass-input w-full rounded-xl px-4 py-3 outline-none" placeholder="Jane Doe" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">Email</label>
                      <input name="email" type="email" required className="glass-input w-full rounded-xl px-4 py-3 outline-none" placeholder="jane@company.com" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">Company (Optional)</label>
                    <input name="company" type="text" className="glass-input w-full rounded-xl px-4 py-3 outline-none" placeholder="Acme Inc." />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">What’s the challenge?</label>
                    <textarea name="message" required rows="4" className="glass-input w-full rounded-xl px-4 py-3 outline-none resize-none" placeholder="We spend too much time on..."></textarea>
                  </div>

                  <button type="submit" className="w-full py-4 rounded-xl bg-white text-slate-900 font-bold hover:bg-sky-50 transition-colors shadow-lg shadow-sky-900/20">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-xs text-slate-600 border-t border-white/5">
        <p>© {new Date().getFullYear()} Berengard Technologies LLC · Built with React & AI</p>
      </footer>

      <ChatWidget />
    </div>
  )
}

function ServiceCard({ title, price, points }) {
  return (
    <div className="glass-panel rounded-2xl p-6 group hover:bg-white/10 transition-colors duration-300">
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-semibold text-white group-hover:text-sky-300 transition-colors">{title}</h3>
        <div className="mt-2 text-sm font-medium text-sky-400">{price}</div>
        <div className="my-4 border-t border-white/10"></div>
        <ul className="space-y-3 text-sm text-slate-300 flex-grow">
          {points.map((p, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-sky-500 mt-0.5">›</span> {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}