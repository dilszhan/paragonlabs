"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import { Megaphone, Search, Target, BarChart3, Globe, Users, ArrowRight, Hexagon, Triangle, CircleDashed, Box, Activity, Sun } from 'lucide-react';

const demoLogos = [
  { icon: <Hexagon size={24} className="text-[var(--gold)]" />, name: 'VERTEX' },
  { icon: <Triangle size={24} className="text-[var(--gold)]" />, name: 'APEX' },
  { icon: <CircleDashed size={24} className="text-[var(--gold)]" />, name: 'HORIZON' },
  { icon: <Box size={24} className="text-[var(--gold)]" />, name: 'NOVA' },
  { icon: <Activity size={24} className="text-[var(--gold)]" />, name: 'PULSE' },
  { icon: <Sun size={24} className="text-[var(--gold)]" />, name: 'SOLIS' },
];

export default function Home() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero-bg min-h-screen flex items-center pt-24 pb-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label mb-5 anim-1">Premier Growth Agency · Melbourne</p>
              <h1 className="font-display text-5xl md:text-7xl font-semibold leading-tight mb-6 anim-2" style={{ color: '#EDF2F7' }}>
                Engineering<br/>
                <span className="gold-gradient">Exponential</span><br/>
                Growth.
              </h1>
              <p className="text-base leading-relaxed mb-8 anim-3 max-w-md" style={{ color: 'var(--text-muted)' }}>
                ParagonLabs is a full-service digital agency. We blend creative excellence with ruthless analytics to scale ambitious brands from zero to market leaders.
              </p>
              <div className="flex flex-wrap gap-3 anim-4">
                <Link href="#work" className="btn-gold px-6 py-3 rounded-sm text-sm inline-flex items-center justify-center gap-2 whitespace-nowrap">
                  Our Case Studies <ArrowRight size={16} />
                </Link>
                <Link href="#contact" className="btn-outline px-6 py-3 rounded-sm text-sm inline-flex items-center justify-center whitespace-nowrap">Partner With Us</Link>
              </div>
              <div className="flex flex-wrap gap-2 mt-8 anim-5">
                <span className="skill-tag">Performance Marketing</span>
                <span className="skill-tag">Brand Strategy</span>
                <span className="skill-tag">Web Applications</span>
                <span className="skill-tag">B2B & E-Commerce</span>
              </div>
            </div>

            {/* Hero Visual Panel */}
            <div className="flex flex-col gap-4 anim-3">
              <div className="relative rounded-sm overflow-hidden bg-[var(--navy-card)] flex flex-col shadow-2xl" style={{ height: '450px', border: '1px solid var(--navy-border)' }}>
                
                {/* Dashboard Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--navy-border)] bg-[rgba(0,0,0,0.85)]">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                  </div>
                  <div className="font-mono text-[10px] text-[var(--gold)] tracking-widest uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse"></span>
                    Live Performance
                  </div>
                </div>

                {/* Dashboard Body */}
                <div className="flex-1 p-6 flex flex-col gap-6 relative">
                  
                  {/* Top Metrics Row */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[var(--navy)] border border-[var(--navy-border)] p-4 rounded-sm shadow-inner">
                      <p className="text-[10px] text-[var(--text-muted)] font-mono mb-1 uppercase">Avg. ROAS</p>
                      <div className="flex items-end gap-2">
                        <p className="text-xl md:text-2xl font-display text-[var(--gold)] font-semibold">4.8x</p>
                        <span className="text-[10px] text-green-400 mb-1 font-mono">+12%</span>
                      </div>
                    </div>
                    <div className="bg-[var(--navy)] border border-[var(--navy-border)] p-4 rounded-sm shadow-inner">
                      <p className="text-[10px] text-[var(--text-muted)] font-mono mb-1 uppercase">CPA</p>
                      <div className="flex items-end gap-2">
                        <p className="text-xl md:text-2xl font-display text-white font-semibold">$12.40</p>
                        <span className="text-[10px] text-green-400 mb-1 font-mono">-8%</span>
                      </div>
                    </div>
                    <div className="bg-[var(--navy)] border border-[var(--navy-border)] p-4 rounded-sm shadow-inner">
                      <p className="text-[10px] text-[var(--text-muted)] font-mono mb-1 uppercase">Revenue</p>
                      <div className="flex items-end gap-2">
                        <p className="text-xl md:text-2xl font-display text-white font-semibold">$84k</p>
                        <span className="text-[10px] text-green-400 mb-1 font-mono">+24%</span>
                      </div>
                    </div>
                  </div>

                  {/* Main Chart Area */}
                  <div className="flex-1 bg-[var(--navy)] border border-[var(--navy-border)] rounded-sm p-5 relative overflow-hidden flex flex-col shadow-inner">
                    <div className="flex justify-between items-center mb-4 z-10">
                      <p className="text-xs text-[var(--text-body)] uppercase tracking-wider font-semibold">Traffic & Conversions</p>
                      <div className="flex gap-2">
                        <span className="text-[10px] bg-[var(--navy-border)] text-white px-2 py-1 rounded-sm font-mono">30 Days</span>
                      </div>
                    </div>
                    
                    {/* SVG Chart */}
                    <div className="flex-1 relative w-full mt-2">
                      <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="w-full h-full overflow-visible absolute inset-0">
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        {/* Grid lines */}
                        <path d="M0,30 L400,30 M0,60 L400,60 M0,90 L400,90" stroke="var(--navy-border)" strokeWidth="1" strokeDasharray="4,4" fill="none" />
                        
                        {/* Filled area under line */}
                        <path 
                          d="M0,100 C50,95 100,80 150,85 C200,90 250,50 300,40 C350,30 380,10 400,5 L400,120 L0,120 Z" 
                          fill="url(#chartGradient)" 
                        />
                        {/* The line itself */}
                        <path 
                          d="M0,100 C50,95 100,80 150,85 C200,90 250,50 300,40 C350,30 380,10 400,5" 
                          fill="none" 
                          stroke="var(--gold)" 
                          strokeWidth="2.5" 
                          className="drop-shadow-[0_0_8px_rgba(139,90,43,0.6)]"
                        />
                        
                        {/* Data points */}
                        <circle cx="150" cy="85" r="4" fill="var(--navy)" stroke="var(--gold)" strokeWidth="2" />
                        <circle cx="300" cy="40" r="4" fill="var(--navy)" stroke="var(--gold)" strokeWidth="2" />
                        <circle cx="400" cy="5" r="5" fill="var(--gold)" className="animate-pulse drop-shadow-[0_0_10px_rgba(139,90,43,1)]" />
                      </svg>
                    </div>
                  </div>

                </div>

                {/* Gold accent bar */}
                <div className="absolute bottom-0 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg,var(--gold),transparent)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT THE AGENCY */}
      <section id="about" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            <div className="reveal">
              <p className="section-label mb-4">Who We Are</p>
              <h2 className="font-display text-4xl font-semibold" style={{ color: '#EDF2F7' }}>Data-driven precision.</h2>
            </div>
            <div className="md:col-span-2 reveal" style={{ transitionDelay: '0.15s' }}>
              <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-body)' }}>
                We are an elite collective of growth strategists, developers, and creative directors based in Melbourne. 
                We don't believe in vanity metrics; we believe in revenue generation and market domination.
              </p>
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="font-semibold text-[var(--gold)] mb-2 font-mono text-sm tracking-wider">01. Our Approach</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    Every strategy is bespoke. We audit your entire digital footprint, identify the friction points, and deploy targeted campaigns that convert browsers into brand loyalists.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--gold)] mb-2 font-mono text-sm tracking-wider">02. Our Promise</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    Complete transparency. Real-time dashboards. Direct access to senior strategists. When you partner with ParagonLabs, our team becomes an extension of yours.
                  </p>
                </div>
              </div>
              <div className="gold-line mt-10 mb-6"></div>
              
              {/* Agency Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-display font-semibold gold-gradient mb-1">$20M+</div>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Client Revenue Generated</p>
                </div>
                <div>
                  <div className="text-3xl font-display font-semibold gold-gradient mb-1">98%</div>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Client Retention Rate</p>
                </div>
                <div>
                  <div className="text-3xl font-display font-semibold gold-gradient mb-1">230%</div>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Average 90-Day ROI</p>
                </div>
                <div>
                  <div className="text-3xl font-display font-semibold gold-gradient mb-1">24/7</div>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Performance Monitoring</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGO CAROUSEL */}
      <section className="py-16 px-6 relative z-10 overflow-hidden" style={{ background: 'var(--navy-mid)' }}>
        <div className="max-w-6xl mx-auto mb-14 reveal">
          <p className="section-label mb-3">Our Partners</p>
          <h2 className="font-display text-4xl font-semibold" style={{ color: '#EDF2F7' }}>Brands that trust our process</h2>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--navy-mid), transparent)' }}></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--navy-mid), transparent)' }}></div>

          <div className="carousel-outer" style={{ overflow: 'hidden' }}>
            <div className="carousel-track flex gap-8 items-center">
              {[...Array(4)].flatMap(() => demoLogos).map((logo, idx) => (
                <div key={idx} className="logo-item flex-shrink-0 flex items-center justify-center gap-3 px-6 py-4 rounded-sm text-white" style={{ background: 'var(--navy-card)', border: '1px solid var(--navy-border)', minWidth: '180px', height: '80px' }}>
                  {logo.icon}
                  <span className="font-display text-xl tracking-widest font-semibold">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 reveal">
            <p className="section-label mb-3">Our Services</p>
            <h2 className="font-display text-4xl font-semibold" style={{ color: '#EDF2F7' }}>Comprehensive Growth Engines</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-7 rounded-sm reveal">
              <div className="mb-5 gold"><Megaphone className="w-6 h-6" /></div>
              <h3 className="font-semibold text-base mb-3" style={{ color: '#EDF2F7' }}>Performance Marketing</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>High-converting, algorithm-beating ad campaigns across Meta, Google, and TikTok. We optimize for CPA and lifetime value.</p>
            </div>

            <div className="card p-7 rounded-sm reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="mb-5 gold"><Search className="w-6 h-6" /></div>
              <h3 className="font-semibold text-base mb-3" style={{ color: '#EDF2F7' }}>Technical SEO & Content</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>Deep-dive site architecture improvements, competitive keyword domination, and content that captures high-intent traffic.</p>
            </div>

            <div className="card p-7 rounded-sm reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="mb-5 gold"><Globe className="w-6 h-6" /></div>
              <h3 className="font-semibold text-base mb-3" style={{ color: '#EDF2F7' }}>Web & App Development</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>Lightning-fast Next.js and React applications built for scale. E-commerce platforms designed explicitly to maximize conversion rates.</p>
            </div>

            <div className="card p-7 rounded-sm reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="mb-5 gold"><Target className="w-6 h-6" /></div>
              <h3 className="font-semibold text-base mb-3" style={{ color: '#EDF2F7' }}>Brand Strategy</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>Positioning that cuts through the noise. We craft compelling visual identities and narratives that resonate with your exact target market.</p>
            </div>

            <div className="card p-7 rounded-sm reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="mb-5 gold"><BarChart3 className="w-6 h-6" /></div>
              <h3 className="font-semibold text-base mb-3" style={{ color: '#EDF2F7' }}>Advanced Analytics</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>Server-side tracking, custom attribution modeling, and automated BI dashboards so you always know your exact ROI.</p>
            </div>

            <div className="card p-7 rounded-sm reveal" style={{ transitionDelay: '0.3s' }}>
              <div className="mb-5 gold"><Users className="w-6 h-6" /></div>
              <h3 className="font-semibold text-base mb-3" style={{ color: '#EDF2F7' }}>CRO & Retention</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>A/B testing, user journey mapping, and lifecycle email/SMS marketing to turn one-time buyers into loyal brand advocates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WORK / CASE STUDIES */}
      <section id="work" className="py-24 px-6 relative z-10" style={{ background: 'var(--navy-mid)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 reveal flex justify-between items-end">
            <div>
              <p className="section-label mb-3">Case Studies</p>
              <h2 className="font-display text-4xl font-semibold" style={{ color: '#EDF2F7' }}>Results that speak</h2>
            </div>
            <Link href="#contact" className="hidden md:flex text-[var(--gold)] text-sm items-center gap-2 hover:underline">
              View full portfolio <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="card rounded-sm reveal overflow-hidden flex flex-col">
              <div className="relative" style={{ height: '240px', overflow: 'hidden' }}>
                <img
                  src="/images/ac-solution-website.png"
                  alt="Enterprise B2B Client"
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.8)' }}
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x400/0B1120/C9A84C?text=Enterprise+Client'; }}
                />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <span className="skill-tag">B2B SaaS</span>
                </div>
                <h3 className="font-display text-2xl font-semibold mb-3" style={{ color: '#EDF2F7' }}>Global Workflow Platform</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                  Completely overhauled their enterprise acquisition funnel. We deployed highly-targeted LinkedIn Ads paired with automated email nurturing sequences to drive demo bookings.
                </p>
                <div className="mt-auto">
                  <div className="gold-line mb-4"></div>
                  <div className="flex justify-between text-xs font-mono">
                    <div><span className="gold text-lg block mb-1">+215%</span> <span style={{ color: 'var(--text-muted)' }}>Demo Requests</span></div>
                    <div><span className="gold text-lg block mb-1">-42%</span> <span style={{ color: 'var(--text-muted)' }}>Cost Per Lead</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Case 2 */}
            <div className="card rounded-sm reveal overflow-hidden flex flex-col" style={{ transitionDelay: '0.15s' }}>
              <div className="relative" style={{ height: '240px', overflow: 'hidden' }}>
                <img
                  src="/images/clothing-brand-website.png"
                  alt="E-Commerce Fashion Brand"
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.8)' }}
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x400/161F30/E2C97E?text=E-Commerce+Brand'; }}
                />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <span className="skill-tag">Direct to Consumer</span>
                </div>
                <h3 className="font-display text-2xl font-semibold mb-3" style={{ color: '#EDF2F7' }}>Luxury Apparel Label</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                  Scaled their Meta Ads architecture and implemented a robust Klaviyo email retention strategy ahead of the BFCM holiday rush.
                </p>
                <div className="mt-auto">
                  <div className="gold-line mb-4"></div>
                  <div className="flex justify-between text-xs font-mono">
                    <div><span className="gold text-lg block mb-1">5.2x</span> <span style={{ color: 'var(--text-muted)' }}>Average ROAS</span></div>
                    <div><span className="gold text-lg block mb-1">$1.2M</span> <span style={{ color: 'var(--text-muted)' }}>Q4 Revenue</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AGENCY PROCESS TIMELINE */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 reveal">
            <p className="section-label mb-3">Our Methodology</p>
            <h2 className="font-display text-4xl font-semibold" style={{ color: '#EDF2F7' }}>How we scale brands</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[var(--navy-card)] border border-[var(--navy-border)] p-8 rounded-sm card reveal flex flex-col h-full">
              <p className="font-mono text-xs mb-2" style={{ color: 'var(--gold)' }}>Phase 01</p>
              <h3 className="font-semibold text-xl mb-4" style={{ color: '#EDF2F7' }}>Discovery & Audit</h3>
              <p className="text-sm flex-grow" style={{ color: 'var(--text-muted)' }}>We tear apart your current digital infrastructure. Analyzing historical ad account data, SEO health, technical stack performance, and competitive gaps to find immediate quick-wins and long-term leverage points.</p>
            </div>

            <div className="bg-[var(--navy-card)] border border-[var(--navy-border)] p-8 rounded-sm card reveal flex flex-col h-full" style={{ transitionDelay: '0.1s' }}>
              <p className="font-mono text-xs mb-2" style={{ color: 'var(--gold)' }}>Phase 02</p>
              <h3 className="font-semibold text-xl mb-4" style={{ color: '#EDF2F7' }}>Strategic Roadmap</h3>
              <p className="text-sm flex-grow" style={{ color: 'var(--text-muted)' }}>We formulate a multi-channel blueprint. Whether it requires building a new high-converting Next.js storefront, or restructuring a messy Google Ads account, we map the exact path to ROI.</p>
            </div>

            <div className="bg-[var(--navy-card)] border border-[var(--navy-border)] p-8 rounded-sm card reveal flex flex-col h-full" style={{ transitionDelay: '0.2s' }}>
              <p className="font-mono text-xs mb-2" style={{ color: 'var(--gold)' }}>Phase 03</p>
              <h3 className="font-semibold text-xl mb-4" style={{ color: '#EDF2F7' }}>Execution & Launch</h3>
              <p className="text-sm flex-grow" style={{ color: 'var(--text-muted)' }}>Our specialists deploy the strategy. From deploying pixel-perfect React code to launching dynamic product ads, execution is relentless and quality-assured.</p>
            </div>

            <div className="bg-[var(--navy-card)] border border-[var(--navy-border)] p-8 rounded-sm card reveal relative overflow-hidden flex flex-col h-full" style={{ transitionDelay: '0.3s' }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[rgba(139,90,43,0.05)] rounded-full blur-2xl"></div>
              <p className="font-mono text-xs mb-2" style={{ color: 'var(--gold)' }}>Phase 04</p>
              <h3 className="font-semibold text-xl mb-4" style={{ color: '#EDF2F7' }}>Optimize & Scale</h3>
              <p className="text-sm flex-grow" style={{ color: 'var(--text-muted)' }}>We don't set and forget. Through daily monitoring, A/B testing, and data analysis, we ruthlessly optimize CPA and scale budgets effectively once profitability is locked in.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 relative z-10" style={{ background: 'var(--navy-mid)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="bg-[var(--navy-card)] border border-[var(--navy-border)] rounded-sm p-12 md:p-20 text-center reveal relative overflow-hidden">
            <div className="absolute top-[-50%] left-[-10%] w-[120%] h-[200%] bg-[radial-gradient(ellipse_at_center,rgba(139,90,43,0.08)_0%,transparent_50%)] pointer-events-none"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <p className="section-label mb-4">Partner With ParagonLabs</p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6" style={{ color: '#EDF2F7' }}>
                Stop guessing.<br/>Start <span className="gold-gradient">scaling.</span>
              </h2>
              <p className="text-base text-[var(--text-muted)] mb-10 max-w-lg mx-auto">
                Ready to dominate your market? Request a comprehensive strategy audit from our senior team today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="#" className="btn-gold px-8 py-4 rounded-sm text-sm">Request Free Growth Audit</a>
                <Link href="/invoice-generator" className="btn-outline px-8 py-4 rounded-sm text-sm bg-[var(--navy)]">Try Our Free Agency Tools</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
