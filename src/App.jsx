import React from 'react'

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-50 text-slate-800">
      {/* Navbar */}
      <header className="sticky top-0 z-30 backdrop-blur bg-neutral-50/80 border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Main logo */}
            <RingLogo className="w-12 h-12" />
            <div className="font-semibold tracking-wide text-slate-900 text-lg">Berengard Technologies LLC</div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:text-slate-900">Services</a>
            <a href="#about" className="hover:text-slate-900">About</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
            <a href="#book" className="px-3 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800">Free consult</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-10 bg-gradient-to-br from-sky-900 via-sky-700 to-slate-800" />
        <div className="mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Making AI simple, practical, and people-friendly for small businesses
            </h1>
            <p className="mt-5 text-lg text-slate-700">
              We help you choose the right AI tools, implement them quickly, and train your team so you save time, cut costs, and grow.
            </p>
            <div className="mt-8 flex gap-3" id="book">
              <a href="#contact" className="px-5 py-3 rounded-2xl bg-sky-800 text-white hover:bg-sky-700 shadow-sm">Book a free 30-min consult</a>
              <a href="#services" className="px-5 py-3 rounded-2xl border border-slate-300 hover:bg-white">See services</a>
            </div>
            <p className="mt-5 text-xs text-slate-500">
              *AI evolves quickly. Recommendations may adapt as tools and best practices change. We’ll keep you current.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square w-full max-w-md mx-auto">
              <RingLogo className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Social proof / bullets */}
      <section className="mx-auto max-w-6xl px-4 py-10 grid sm:grid-cols-3 gap-6">
        {[
          {title: "Fast wins", desc: "Quick, measurable improvements in weeks—not months."},
          {title: "Tool-agnostic", desc: "We recommend what fits your business, not a vendor."},
          {title: "Train your team", desc: "Hands-on workshops and clear playbooks."},
        ].map((b, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900">{b.title}</h3>
            <p className="text-sm mt-1 text-slate-600">{b.desc}</p>
          </div>
        ))}
      </section>

      {/* Services */}
      <section id="services" className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-bold text-slate-900">Services</h2>
          <p className="mt-2 text-slate-600 max-w-2xl">Pick a starter package below. We’ll tailor each engagement to your workflows, tools, and goals.</p>

          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard title="AI Readiness Audit" price="From $950" points={["Process + tools assessment","Top 5 AI opportunities","90-day roadmap with ROI estimates"]} />
            <ServiceCard title="Customer Support Chatbot" price="From $1,800" points={["Website/CRM integration","FAQ + order-status flows","Brand tone + analytics"]} />
            <ServiceCard title="Productivity Automations" price="From $1,500" points={["Email → CRM logging","Quote → invoice workflows","Zapier/Make/Power Automate"]} />
            <ServiceCard title="Smart Marketing with AI" price="From $1,200" points={["Content + campaigns","Personalized emails","HubSpot/Canva/Copy tools"]} />
            <ServiceCard title="Forecasting & Analytics" price="From $2,400" points={["Dashboards (Power BI)","Sales/inventory staffing forecasts","Data hygiene + governance"]} />
            <ServiceCard title="Team Training & Policy" price="From $900" points={["AI 101 for staff","Prompting playbooks","Responsible use policy"]} />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-slate-900">About Berengard</h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              Founded by Steven Kania, Berengard Technologies helps small and mid-size businesses adopt AI the practical way—
              focusing on concrete outcomes like faster support, leaner operations, and better forecasting. With deep experience in retail supply chain,
              reporting, and machine learning, we translate AI into everyday wins your team can own.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900">Core Stack</h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-700 list-disc list-inside">
              <li>ChatGPT / Claude / Microsoft Copilot</li>
              <li>Zendesk / Intercom / Tidio</li>
              <li>Zapier / Make / Power Automate</li>
              <li>Power BI / BigQuery / Vertex AI</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold">Let’s talk</h2>
            <p className="mt-2 text-slate-200">Tell us your biggest bottleneck. We’ll propose practical AI wins you can deploy fast.</p>
            <div className="mt-6 text-sm text-slate-300">
              Or email: <a className="underline hover:text-white" href="mailto:hello@berengard.tech">hello@berengard.tech</a>
            </div>
          </div>
          <form onSubmit={(e)=>e.preventDefault()} className="rounded-2xl bg-white text-slate-800 p-6 shadow-xl">
            <div className="grid gap-4">
              <Input label="Name" type="text" placeholder="Your name" />
              <Input label="Email" type="email" placeholder="you@company.com" />
              <Input label="Company" type="text" placeholder="Business name" />
              <div>
                <label className="block text-sm font-medium text-slate-700">What’s your challenge?</label>
                <textarea className="mt-1 w-full rounded-xl border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[120px]" placeholder="Describe your needs…"/>
              </div>
              <button className="mt-2 rounded-xl bg-sky-800 px-4 py-3 text-white hover:bg-sky-700">Send (demo)</button>
              <p className="text-xs text-slate-500">This is a demo form. Hook it up to your email, Airtable, or Zapier when you go live.</p>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Berengard Technologies LLC · All rights reserved.
      </footer>
    </div>
  )
}

function ServiceCard({ title, price, points }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <div className="mt-1 text-sm text-slate-500">{price}</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-700 list-disc list-inside">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  )
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input {...props} className="mt-1 w-full rounded-xl border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-sky-500" />
    </div>
  )
}

/** Logo components **/
export function RingMark({ className = "" }) {
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Berengard ring logo">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#0c4a6e" />
        </linearGradient>
      </defs>
      <g transform="translate(200,200) skewX(-8)">
        <ellipse rx="150" ry="95" fill="url(#g)" />
        <ellipse rx="105" ry="65" fill="#F8FAFC" transform="translate(6,-10)" />
      </g>
    </svg>
  )
}

export function RingLogo({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Berengard compact ring icon">
      <g transform="translate(50,50) rotate(-18)">
        {/* Outer ring with varying stroke thickness */}
        <path d="M -40 0 a 40 26 0 1 1 80 0 a 40 26 0 1 1 -80 0" fill="none" stroke="#0c4a6e" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M -40 0 a 40 26 0 1 1 80 0 a 40 26 0 1 1 -80 0" fill="none" stroke="#0c4a6e" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="200 400" />
        {/* Inner ring thinner with visual variation */}
        <path d="M -28 0 a 28 18 0 1 1 56 0 a 28 18 0 1 1 -56 0" fill="none" stroke="#0c4a6e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}
