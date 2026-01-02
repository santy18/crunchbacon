import React, { useState, useEffect } from 'react';
import { Turnstile } from '@marsidev/react-turnstile'
import { 
  Menu, 
  X, 
  MapPin, 
  Check, 
  Zap, 
  Lock, 
  Gauge, 
  TrendingUp, 
  Palmtree, 
  Image as ImageIcon, 
  ArrowRight, 
  PenTool, 
  Rocket, 
  Server, 
  ChevronDown, 
  Mail, 
  Phone, 
  Twitter, 
  Instagram, 
  Linkedin 
} from 'lucide-react';

const CRUNCHBACON_REDESIGN_HOOK = 'https://n8n.crunchbacon.com/webhook/502a046a-62a0-4c9a-8e62-87739302016a';
// const CRUNCHBACON_REDESIGN_HOOK = 'https://n8n.crunchbacon.com/webhook-test/502a046a-62a0-4c9a-8e62-87739302016a';

export default function App() {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [heroFormSubmitted, setHeroFormSubmitted] = useState(false);
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);

  // Constants for Styles
  const NAVBAR_HEIGHT = 147;
  
  // Custom Color Palette (Simulating the Tailwind config)
  const colors = {
    bgBase: '#0B0B0F',
    bgCard: '#11121A',
    bgElevated: '#151726',
    textPrimary: '#F5F5F7',
    textSecondary: 'rgba(245,245,247,0.72)',
    textMuted: 'rgba(245,245,247,0.55)',
    accentPrimary: '#E11D48',
    accentHover: '#F43F5E',
    accentSecondary: '#F59E0B',
    borderSubtle: 'rgba(255,255,255,0.10)',
  };

  // Scroll Listener for Navbar Shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth Scroll Handler with Offset
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 150; // 150px offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false); // Close mobile menu if open
    }
  };

  // FAQ Toggle
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleHeroFormSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting hero form...');
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch(CRUNCHBACON_REDESIGN_HOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          websiteurl: formData.get('websiteurl'),
          source: "redesign-score"
        })
      });

      if (response.ok) {
        setHeroFormSubmitted(true);
      } else {
        console.error('Failed to submit hero form', response.status);
      }
    } catch (error) {
      console.error('Failed to submit hero form', error);
    }
  };

  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch(CRUNCHBACON_REDESIGN_HOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          websiteurl: formData.get('websiteurl'),
          phone: formData.get('phone'),
          business_type: formData.get('business_type'),
          project_notes: formData.get('project_notes'),
    })
      });

      if (response.ok) {
        setContactFormSubmitted(true);
      } else {
        console.error('Failed to submit contact form', response.status);
      }
    } catch (error) {
      console.error('Failed to submit contact form', error);
    }
  };

  return (
    <div className="font-sans text-base leading-relaxed antialiased overflow-x-hidden min-h-screen" style={{ backgroundColor: colors.bgBase, color: colors.textPrimary }}>
      {/* Global Styles for Fonts & Gradients */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');
        
        .font-sans { font-family: 'Inter', system-ui, sans-serif; }
        .font-heading { font-family: 'Space Grotesk', system-ui, sans-serif; }
        
        .hero-glow {
          background-image: 
            radial-gradient(600px 300px at 15% 10%, rgba(225,29,72,0.35), transparent 60%),
            radial-gradient(700px 360px at 85% 15%, rgba(245,158,11,0.25), transparent 60%);
        }
        
        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
        }
        
        .hover-lift { transition: transform 180ms ease, box-shadow 180ms ease; }
        .hover-lift:hover { transform: translateY(-2px); box-shadow: 0 16px 45px rgba(0,0,0,0.45); }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0B0B0F; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #555; }
      `}</style>

      {/* NAVBAR */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 border-b transition-shadow duration-300 flex items-center`}
        style={{ 
          height: `${NAVBAR_HEIGHT}px`, 
          borderColor: colors.borderSubtle,
          backgroundColor: colors.bgBase,
          boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.5)' : 'none'
        }}
      >
        <div className="max-w-[1120px] w-full mx-auto px-4 lg:px-6 flex justify-between items-center h-full">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="font-heading font-bold text-2xl lg:text-3xl tracking-tight hover:text-[#E11D48] transition-colors" style={{ color: colors.textPrimary }}>
            CRUNCH BACON
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {['Work', 'Services', 'Process', 'Pricing', 'FAQ'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="font-medium transition-colors hover:text-white"
                style={{ color: colors.textSecondary }}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* CTA Group */}
          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={() => scrollToSection('work')}
              className="px-6 py-3 rounded-[14px] border font-medium hover:bg-white/5 transition-colors"
              style={{ borderColor: colors.borderSubtle, color: colors.textPrimary }}
            >
              See Our Work
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-6 py-3 rounded-[14px] font-bold transition-colors shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:bg-[#F43F5E]"
              style={{ backgroundColor: colors.accentPrimary, color: colors.bgBase }}
            >
              Get a Redesign Quote
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 focus:outline-none"
            aria-label="Toggle Menu"
            style={{ color: colors.textPrimary }}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {isMenuOpen && (
        <div 
          className="fixed left-0 w-full z-[49] backdrop-blur-xl overflow-y-auto flex flex-col"
          style={{ 
            top: `${NAVBAR_HEIGHT}px`, 
            height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
            backgroundColor: 'rgba(11, 11, 15, 0.95)'
          }}
        >
          <div className="flex flex-col items-center justify-start pt-12 space-y-8 p-6 pb-32">
            {['Work', 'Services', 'Process', 'Pricing', 'FAQ'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-3xl font-heading font-bold transition-colors hover:text-[#E11D48]"
                style={{ color: colors.textPrimary }}
              >
                {item}
              </button>
            ))}
            <hr className="w-20 opacity-50" style={{ borderColor: colors.borderSubtle }} />
            <button 
              onClick={() => scrollToSection('contact')}
              className="w-full max-w-xs text-center px-6 py-4 rounded-[14px] font-bold text-lg shadow-[0_0_20px_rgba(225,29,72,0.3)]"
              style={{ backgroundColor: colors.accentPrimary, color: colors.bgBase }}
            >
              Get a Quote
            </button>
            <button 
              onClick={() => scrollToSection('work')}
              className="transition-colors hover:text-white"
              style={{ color: colors.textSecondary }}
            >
              See Our Work
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main style={{ marginTop: `${NAVBAR_HEIGHT}px` }}>

        {/* HERO SECTION */}
        <section className="relative flex items-center justify-center hero-glow px-4 py-16 lg:py-0" style={{ minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}>
          <div className="max-w-[1120px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Content (Left) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center space-x-2 font-bold tracking-wider text-xs uppercase px-3 py-1 rounded-full border" 
                   style={{ color: colors.accentSecondary, backgroundColor: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.2)' }}>
                <MapPin size={12} />
                <span>Miami, FL, 33174 • Website Redesign</span>
              </div>
              
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]" style={{ color: colors.textPrimary }}>
                Modern website redesigns that turn visits into leads.
              </h1>
              
              <p className="text-lg lg:text-xl max-w-2xl leading-relaxed" style={{ color: colors.textSecondary }}>
                We rebuild your site with slick UI, fast load times, and conversion-first structure—so your business looks premium and sells better.
              </p>

              <ul className="space-y-3" style={{ color: colors.textMuted }}>
                <li className="flex items-center space-x-3">
                  <Check size={18} color={colors.accentPrimary} />
                  <span>Conversion-focused layout and structure</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check size={18} color={colors.accentPrimary} />
                  <span>Performance and SEO foundations baked in</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check size={18} color={colors.accentPrimary} />
                  <span>Built for speed, clarity, and growth</span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 rounded-[14px] font-bold text-lg hover:bg-[#F43F5E] transition-colors text-center shadow-[0_0_20px_rgba(225,29,72,0.3)]"
                  style={{ backgroundColor: colors.accentPrimary, color: colors.bgBase }}
                >
                  Get a Redesign Quote
                </button>
                <button 
                  onClick={() => scrollToSection('work')}
                  className="px-8 py-4 rounded-[14px] border font-medium hover:bg-white/5 transition-colors text-center"
                  style={{ borderColor: colors.borderSubtle, color: colors.textPrimary }}
                >
                  See Our Work
                </button>
              </div>

              <p className="text-sm pt-2 flex items-center gap-2" style={{ color: colors.textMuted }}>
                <Zap size={14} color={colors.accentSecondary} />
                Average turnaround 10–21 days • Mobile-first • Built for speed
              </p>
            </div>

            {/* Hero Card (Right) */}
            <div className="lg:col-span-5 w-full">
              <div className="border rounded-[18px] p-6 lg:p-8 shadow-2xl hover-lift" style={{ backgroundColor: colors.bgCard, borderColor: colors.borderSubtle }}>
                <div className="mb-6">
                  <h3 className="font-heading text-2xl font-bold mb-2" style={{ color: colors.textPrimary }}>Get your Redesign Score</h3>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>Free short form audit with quick action plan.</p>
                </div>
                
                {!heroFormSubmitted ? (
                  <form onSubmit={handleHeroFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>Name</label>
                      <input type="text" name="name" required className="w-full border rounded-[14px] px-4 py-3 focus:outline-none focus:ring-2 transition-all placeholder-white/20" 
                             style={{ backgroundColor: colors.bgElevated, borderColor: colors.borderSubtle, color: colors.textPrimary, '--tw-ring-color': 'rgba(225,29,72,0.5)' }} placeholder="Jane Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>Email</label>
                      <input type="email" name="email" required className="w-full border rounded-[14px] px-4 py-3 focus:outline-none focus:ring-2 transition-all placeholder-white/20" 
                             style={{ backgroundColor: colors.bgElevated, borderColor: colors.borderSubtle, color: colors.textPrimary, '--tw-ring-color': 'rgba(225,29,72,0.5)' }} placeholder="jane@company.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>Website URL</label>
                      <input type="url" name="websiteurl" required className="w-full border rounded-[14px] px-4 py-3 focus:outline-none focus:ring-2 transition-all placeholder-white/20" 
                             style={{ backgroundColor: colors.bgElevated, borderColor: colors.borderSubtle, color: colors.textPrimary, '--tw-ring-color': 'rgba(225,29,72,0.5)' }} placeholder="https://currentsite.com" />
                    </div>
                    <Turnstile siteKey='0x4AAAAAACKIOHbJNUtRwZAu' />
                    <button type="submit" className="w-full font-bold rounded-[14px] py-4 hover:bg-white transition-colors mt-2" style={{ backgroundColor: colors.textPrimary, color: colors.bgBase }}>
                      Send My Score
                    </button>
                    
                    <p className="text-xs text-center flex items-center justify-center gap-2" style={{ color: colors.textMuted }}>
                      <Lock size={10} className="opacity-50" /> No spam. One follow-up only.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-500">
                      <Check size={32} />
                    </div>
                    <h4 className="text-xl font-bold" style={{ color: colors.textPrimary }}>Audit Requested!</h4>
                    <p style={{ color: colors.textSecondary }}>We'll email your score within 24 hours.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF STRIP */}
        <div className="section-divider"></div>
        <section className="py-12" style={{ backgroundColor: colors.bgBase }}>
          <div className="max-w-[1120px] mx-auto px-4 lg:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Gauge, color: colors.accentSecondary, title: "Performance-First", subtitle: "90+ Google Speed Scores" },
                { icon: TrendingUp, color: colors.accentPrimary, title: "Conversion-Focused", subtitle: "Layouts built to sell" },
                { icon: Palmtree, color: colors.textPrimary, title: "Miami Based", subtitle: "Local collaboration" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-center md:justify-start space-x-4 opacity-80 hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center border" 
                       style={{ backgroundColor: colors.bgElevated, color: item.color, borderColor: colors.borderSubtle }}>
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="font-bold" style={{ color: colors.textPrimary }}>{item.title}</p>
                    <p className="text-sm" style={{ color: colors.textMuted }}>{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="section-divider"></div>

        {/* WORK SECTION */}
        <section id="work" className="py-16 lg:py-24">
          <div className="max-w-[1120px] mx-auto px-4 lg:px-6">
            <div className="mb-12 md:mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.textPrimary }}>Recent Redesigns</h2>
              <p className="text-lg max-w-2xl" style={{ color: colors.textSecondary }}>Clean UI, faster pages, and better conversion paths. Here is how we help businesses level up.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "FinTech Dashboard", tag1: "Redesign", tag2: "Tech", outcomes: ["40% increase in signups", "Mobile-first adaptation", "Dark mode implementation"] },
                { title: "Miami Apparel", tag1: "E-Commerce", tag2: "Fashion", outcomes: ["2x Faster load times", "Shopify integration", "Custom product galleries"] },
                { title: "Legal Consultancy", tag1: "Service", tag2: "Local", outcomes: ["Lead generation funnel", "SEO restructuring", "Authority building UI"] }
              ].map((project, idx) => (
                <article key={idx} className="border rounded-[18px] overflow-hidden hover-lift flex flex-col h-full shadow-xl" style={{ backgroundColor: colors.bgCard, borderColor: colors.borderSubtle }}>
                  <div className="aspect-[16/10] relative overflow-hidden group" style={{ backgroundColor: colors.bgElevated }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                      <ImageIcon size={48} className="opacity-20" color={colors.textMuted} />
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex space-x-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded" style={{ color: colors.accentPrimary, backgroundColor: 'rgba(225,29,72,0.1)' }}>{project.tag1}</span>
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded" style={{ color: colors.textSecondary, backgroundColor: 'rgba(255,255,255,0.05)' }}>{project.tag2}</span>
                    </div>
                    <h3 className="font-heading text-xl font-bold mb-4" style={{ color: colors.textPrimary }}>{project.title}</h3>
                    <ul className="space-y-2 text-sm mb-6 flex-1" style={{ color: colors.textSecondary }}>
                      {project.outcomes.map((outcome, oIdx) => (
                        <li key={oIdx} className="flex items-start gap-2">
                          <ArrowRight size={12} style={{ color: colors.accentSecondary, marginTop: '4px' }} /> {outcome}
                        </li>
                      ))}
                    </ul>
                    <button className="block w-full py-3 rounded-[14px] border font-medium hover:bg-white/5 transition-colors" style={{ borderColor: colors.borderSubtle, color: colors.textPrimary }}>View Case Study</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-16 lg:py-24 relative" style={{ backgroundColor: colors.bgBase }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to bottom, transparent, ${colors.bgElevated}33)` }}></div>
          <div className="max-w-[1120px] mx-auto px-4 lg:px-6 relative">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.textPrimary }}>What We Do</h2>
              <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: colors.accentPrimary }}></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: PenTool, 
                  iconColor: colors.accentPrimary,
                  iconBg: 'rgba(225,29,72,0.1)',
                  title: "Website Redesign", 
                  desc: "Complete overhaul of your current site with modern UI, responsive architecture, and conversion structure.",
                  items: ["Page hierarchy", "Visual redesign", "Mobile optimization", "CTA strategy"],
                  dotColor: colors.accentPrimary
                },
                { 
                  icon: Rocket, 
                  iconColor: colors.accentSecondary,
                  iconBg: 'rgba(245,158,11,0.1)',
                  title: "Performance + SEO", 
                  desc: "Technical setup to ensure Google loves your site as much as your customers do.",
                  items: ["Core Web Vitals", "Metadata & Schema", "Sitemap + Robots", "Analytics setup"],
                  dotColor: colors.accentSecondary
                },
                { 
                  icon: Server, 
                  iconColor: colors.textPrimary,
                  iconBg: 'rgba(255,255,255,0.05)',
                  title: "Hosting + Care", 
                  desc: "We keep the lights on so you can focus on your business. Fast, secure, and managed.",
                  items: ["Managed hosting", "Daily backups", "Uptime monitoring", "Monthly tweaks"],
                  dotColor: colors.textMuted
                }
              ].map((service, idx) => (
                <div key={idx} className="border rounded-[24px] p-8 transition-colors hover:border-opacity-100" 
                     style={{ backgroundColor: colors.bgElevated, borderColor: colors.borderSubtle, '--hover-border': service.iconColor }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: service.iconBg, color: service.iconColor }}>
                    <service.icon size={24} />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3" style={{ color: colors.textPrimary }}>{service.title}</h3>
                  <p className="text-sm mb-6 leading-relaxed" style={{ color: colors.textSecondary }}>{service.desc}</p>
                  <ul className="space-y-2 text-sm" style={{ color: colors.textMuted }}>
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.dotColor }}></div> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section id="process" className="py-16 lg:py-24">
          <div className="max-w-[1120px] mx-auto px-4 lg:px-6">
            <div className="mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.textPrimary }}>The Redesign Process</h2>
              <p style={{ color: colors.textSecondary }}>Streamlined for speed and quality.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              <div className="hidden md:block absolute top-6 left-0 w-full h-0.5 z-0" style={{ backgroundColor: colors.borderSubtle }}></div>

              {[
                { step: 1, title: "Audit + Goals", time: "Day 1-2", items: ["Current site analysis", "Competitor review", "Define conversion path"], active: true },
                { step: 2, title: "Structure + Wire", time: "Day 3-5", items: ["Page hierarchy map", "Content outline", "Low-fi layout approval"], active: false },
                { step: 3, title: "Design + Build", time: "Day 6-15", items: ["High-fidelity UI", "Responsive development", "CMS integration"], active: false },
                { step: 4, title: "Launch + Optimize", time: "Day 16+", items: ["Final testing & SEO", "DNS switch", "Post-launch check"], active: false },
              ].map((item, idx) => (
                <div key={idx} className="relative z-10 group">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-6 transition-transform group-hover:scale-110 border-2`}
                       style={{ 
                         backgroundColor: colors.bgBase, 
                         borderColor: item.active ? colors.accentPrimary : colors.borderSubtle,
                         color: item.active ? colors.accentPrimary : colors.textMuted
                       }}>
                    {item.step}
                  </div>
                  <h3 className="font-heading text-lg font-bold mb-2" style={{ color: colors.textPrimary }}>{item.title}</h3>
                  <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: colors.accentSecondary }}>{item.time}</p>
                  <ul className="text-sm space-y-1" style={{ color: colors.textSecondary }}>
                    {item.items.map((li, i) => <li key={i}>• {li}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="py-16 lg:py-24 border-y" style={{ backgroundColor: 'rgba(21, 23, 38, 0.3)', borderColor: colors.borderSubtle }}>
          <div className="max-w-[1120px] mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.textPrimary }}>Simple Pricing</h2>
              <p className="text-lg" style={{ color: colors.textSecondary }}>One-time redesign fees. No hidden costs. Optional monthly care.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {/* Starter */}
              <div className="border rounded-[18px] p-8" style={{ backgroundColor: colors.bgCard, borderColor: colors.borderSubtle }}>
                <h3 className="text-lg font-medium mb-2" style={{ color: colors.textSecondary }}>Starter</h3>
                <div className="text-3xl font-heading font-bold mb-6" style={{ color: colors.textPrimary }}>$1,500 <span className="text-sm font-normal" style={{ color: colors.textMuted }}>/ one-time</span></div>
                <div className="text-sm font-bold mb-6 pb-6 border-b" style={{ color: colors.textPrimary, borderColor: colors.borderSubtle }}>1-3 Pages</div>
                <ul className="space-y-3 text-sm mb-8" style={{ color: colors.textSecondary }}>
                  {["Custom Design", "Mobile Responsive", "Contact Form", "Basic SEO"].map((feature, i) => (
                    <li key={i} className="flex gap-2"><Check size={16} color={colors.textPrimary} /> {feature}</li>
                  ))}
                </ul>
                <button onClick={() => scrollToSection('contact')} className="block w-full py-3 rounded-[14px] border text-center hover:bg-white/5 transition-colors" style={{ borderColor: colors.borderSubtle, color: colors.textPrimary }}>Choose Starter</button>
              </div>

              {/* Growth */}
              <div className="border rounded-[18px] p-8 relative transform md:-translate-y-4 shadow-[0_0_20px_rgba(225,29,72,0.3)]" style={{ backgroundColor: colors.bgElevated, borderColor: 'rgba(225,29,72,0.5)' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md" style={{ backgroundColor: colors.accentPrimary, color: colors.bgBase }}>Most Popular</div>
                <h3 className="text-lg font-medium mb-2" style={{ color: colors.accentPrimary }}>Growth</h3>
                <div className="text-3xl font-heading font-bold mb-6" style={{ color: colors.textPrimary }}>$2,500 <span className="text-sm font-normal" style={{ color: colors.textMuted }}>/ one-time</span></div>
                <div className="text-sm font-bold mb-6 pb-6 border-b" style={{ color: colors.textPrimary, borderColor: colors.borderSubtle }}>1-5 Pages</div>
                <ul className="space-y-3 text-sm mb-8" style={{ color: colors.textSecondary }}>
                  {["Everything in Starter", "CMS Integration", "Advanced SEO Setup", "Google Analytics"].map((feature, i) => (
                    <li key={i} className="flex gap-2"><Check size={16} color={colors.accentPrimary} /> {feature}</li>
                  ))}
                </ul>
                <button onClick={() => scrollToSection('contact')} className="block w-full py-3 rounded-[14px] font-bold text-center hover:bg-[#F43F5E] transition-colors" style={{ backgroundColor: colors.accentPrimary, color: colors.bgBase }}>Choose Growth</button>
              </div>

              {/* Premium */}
              <div className="border rounded-[18px] p-8" style={{ backgroundColor: colors.bgCard, borderColor: colors.borderSubtle }}>
                <h3 className="text-lg font-medium mb-2" style={{ color: colors.textSecondary }}>Premium</h3>
                <div className="text-3xl font-heading font-bold mb-6" style={{ color: colors.textPrimary }}>$4,500 <span className="text-sm font-normal" style={{ color: colors.textMuted }}>/ one-time</span></div>
                <div className="text-sm font-bold mb-6 pb-6 border-b" style={{ color: colors.textPrimary, borderColor: colors.borderSubtle }}>1-10 Pages</div>
                <ul className="space-y-3 text-sm mb-8" style={{ color: colors.textSecondary }}>
                  {["Everything in Growth", "E-commerce Functionality", "Copywriting Assistance", "Priority Support"].map((feature, i) => (
                    <li key={i} className="flex gap-2"><Check size={16} color={colors.textPrimary} /> {feature}</li>
                  ))}
                </ul>
                <button onClick={() => scrollToSection('contact')} className="block w-full py-3 rounded-[14px] border text-center hover:bg-white/5 transition-colors" style={{ borderColor: colors.borderSubtle, color: colors.textPrimary }}>Choose Premium</button>
              </div>
            </div>

            {/* Monthly Plan */}
            <div className="mt-8 border rounded-[18px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6" style={{ backgroundColor: colors.bgCard, borderColor: colors.borderSubtle }}>
              <div>
                <h3 className="font-heading text-xl font-bold" style={{ color: colors.textPrimary }}>Managed Hosting + Updates</h3>
                <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>Hosting, monitoring, backups, and minor edits handled for you.</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-2xl font-bold" style={{ color: colors.textPrimary }}>$60<span className="text-sm font-normal" style={{ color: colors.textMuted }}> / mo</span></div>
                <div className="text-xs px-3 py-1 rounded" style={{ color: colors.textMuted, backgroundColor: 'rgba(255,255,255,0.05)' }}>Optional Add-on</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-16 lg:py-24">
          <div className="max-w-2xl mx-auto px-4 lg:px-6">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center" style={{ color: colors.textPrimary }}>FAQ</h2>
            
            <div className="space-y-4">
              {[
                { q: "What do you need to start?", a: "We need your current website URL (if you have one), your logo, any specific images you want to use, and a general idea of the text content. We can help guide the content structure if you're unsure." },
                { q: "How long does a redesign take?", a: "Our typical turnaround for the 'Growth' package is 10 to 21 days. Larger e-commerce projects may take 4 weeks depending on the complexity and how quickly we receive feedback." },
                { q: "Do you write the copy?", a: "We provide content structures and headlines. For full body copy writing, we can either use what you provide or bring in a copywriter for an additional fee." },
                { q: "Can you keep my domain?", a: "Absolutely. We don't need to transfer your domain. We just update the DNS records when the new site is ready to launch." }
              ].map((item, idx) => (
                <div key={idx} className="border rounded-[18px] overflow-hidden" style={{ borderColor: colors.borderSubtle, backgroundColor: colors.bgCard }}>
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-medium" style={{ color: colors.textPrimary }}>{item.q}</span>
                    <ChevronDown 
                      size={20} 
                      className={`transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} 
                      color={colors.textMuted}
                    />
                  </button>
                  <div 
                    className={`transition-all duration-300 ease-out overflow-hidden ${activeFaq === idx ? 'max-h-[500px]' : 'max-h-0'}`}
                    style={{ backgroundColor: 'rgba(21, 23, 38, 0.5)' }}
                  >
                    <p className="px-6 py-4 text-sm" style={{ color: colors.textSecondary }}>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-16 lg:py-24 border-t" style={{ background: `linear-gradient(to top, ${colors.bgElevated}, ${colors.bgBase})`, borderColor: colors.borderSubtle }}>
          <div className="max-w-[1120px] mx-auto px-4 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              
              {/* Contact Form */}
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2" style={{ color: colors.textPrimary }}>Get a Redesign Quote</h2>
                <p className="mb-8" style={{ color: colors.textSecondary }}>Tell us about your site and goals.</p>

                {!contactFormSubmitted ? (
                  <form onSubmit={handleContactFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>Full Name</label>
                        <input type="text" name="name" required className="w-full border rounded-[14px] px-4 py-3 focus:outline-none focus:ring-2 transition-all" 
                               style={{ backgroundColor: colors.bgCard, borderColor: colors.borderSubtle, color: colors.textPrimary, '--tw-ring-color': 'rgba(225,29,72,0.5)' }} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>Email</label>
                        <input type="email" name="email" required className="w-full border rounded-[14px] px-4 py-3 focus:outline-none focus:ring-2 transition-all" 
                               style={{ backgroundColor: colors.bgCard, borderColor: colors.borderSubtle, color: colors.textPrimary, '--tw-ring-color': 'rgba(225,29,72,0.5)' }} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>Phone (Optional)</label>
                        <input type="tel" name="phone" className="w-full border rounded-[14px] px-4 py-3 focus:outline-none focus:ring-2 transition-all" 
                               style={{ backgroundColor: colors.bgCard, borderColor: colors.borderSubtle, color: colors.textPrimary, '--tw-ring-color': 'rgba(225,29,72,0.5)' }} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>Website URL</label>
                        <input type="url" name="websiteurl" className="w-full border rounded-[14px] px-4 py-3 focus:outline-none focus:ring-2 transition-all" 
                               style={{ backgroundColor: colors.bgCard, borderColor: colors.borderSubtle, color: colors.textPrimary, '--tw-ring-color': 'rgba(225,29,72,0.5)' }} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>Business Type</label>
                      <select name="business_type" className="w-full border rounded-[14px] px-4 py-3 focus:outline-none focus:ring-2 transition-all" 
                              style={{ backgroundColor: colors.bgCard, borderColor: colors.borderSubtle, color: colors.textPrimary, '--tw-ring-color': 'rgba(225,29,72,0.5)' }}>
                        <option>Service Business</option>
                        <option>E-Commerce</option>
                        <option>Startup / SaaS</option>
                        <option>Local Business</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>Project Notes</label>
                      <textarea rows="4" name="project_notes" className="w-full border rounded-[14px] px-4 py-3 focus:outline-none focus:ring-2 transition-all" 
                                style={{ backgroundColor: colors.bgCard, borderColor: colors.borderSubtle, color: colors.textPrimary, '--tw-ring-color': 'rgba(225,29,72,0.5)' }} placeholder="What don't you like about your current site?"></textarea>
                    </div>

                    <Turnstile siteKey='0x4AAAAAACKIOHbJNUtRwZAu' />

                    <button type="submit" className="w-full px-8 py-4 rounded-[14px] font-bold text-lg hover:bg-[#F43F5E] transition-colors shadow-[0_0_20px_rgba(225,29,72,0.3)]"
                            style={{ backgroundColor: colors.accentPrimary, color: colors.bgBase }}>
                      Request Quote
                    </button>
                  </form>
                ) : (
                  <div className="border rounded-[18px] p-8 text-center" style={{ backgroundColor: colors.bgCard, borderColor: colors.borderSubtle }}>
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-500 mb-4">
                      <Check size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: colors.textPrimary }}>Request Received!</h3>
                    <p style={{ color: colors.textSecondary }}>Thanks for reaching out. We'll review your site and be in touch shortly.</p>
                  </div>
                )}
              </div>

              {/* Side Card */}
              <div className="flex flex-col justify-center">
                <div className="border rounded-[24px] p-8 shadow-xl" style={{ backgroundColor: colors.bgCard, borderColor: colors.borderSubtle }}>
                  <h3 className="font-heading text-xl font-bold mb-6" style={{ color: colors.textPrimary }}>What happens next?</h3>
                  <ul className="space-y-4 mb-8">
                    {[
                      { step: 1, title: "Quick Site Review", desc: "We look for quick wins and major blockers." },
                      { step: 2, title: "Clear Recommendations", desc: "No jargon. Just what needs to change." },
                      { step: 3, title: "Timeline + Quote", desc: "A fixed price and delivery date." }
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center border shrink-0" 
                             style={{ backgroundColor: colors.bgElevated, color: colors.accentSecondary, borderColor: colors.borderSubtle }}>{item.step}</div>
                        <div>
                          <p className="font-bold text-sm" style={{ color: colors.textPrimary }}>{item.title}</p>
                          <p className="text-sm" style={{ color: colors.textMuted }}>{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t pt-6 space-y-3" style={{ borderColor: colors.borderSubtle }}>
                    <div className="flex items-center gap-3 text-sm" style={{ color: colors.textSecondary }}>
                      <MapPin size={16} color={colors.accentPrimary} /> Miami, FL, 33174
                    </div>
                    <div className="flex items-center gap-3 text-sm" style={{ color: colors.textSecondary }}>
                      <Mail size={16} color={colors.accentPrimary} /> hello@crunchbacon.com
                    </div>
                    <div className="flex items-center gap-3 text-sm" style={{ color: colors.textSecondary }}>
                      <Phone size={16} color={colors.accentPrimary} /> (786) 474-4913
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t py-12" style={{ backgroundColor: '#0B0B0F', borderColor: colors.borderSubtle }}>
        <div className="max-w-[1120px] mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            
            {/* Brand */}
            <div>
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="font-heading font-bold text-2xl tracking-tight hover:text-[#E11D48] transition-colors block mb-4" style={{ color: colors.textPrimary }}>
                CRUNCH BACON
              </a>
              <p className="text-sm max-w-xs" style={{ color: colors.textMuted }}>
                Miami-based web design agency specializing in modern, high-conversion website redesigns.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold mb-4" style={{ color: colors.textPrimary }}>Explore</h4>
              <ul className="space-y-2 text-sm" style={{ color: colors.textMuted }}>
                {['Work', 'Services', 'Process', 'Pricing'].map((item) => (
                  <li key={item}><button onClick={() => scrollToSection(item.toLowerCase())} className="hover:text-[#E11D48] transition-colors">{item}</button></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-4" style={{ color: colors.textPrimary }}>Contact</h4>
              <ul className="space-y-2 text-sm" style={{ color: colors.textMuted }}>
                <li>hello@crunchbacon.com</li>
                <li>Miami, FL, 33174</li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: colors.borderSubtle }}>
            <p className="text-xs" style={{ color: colors.textMuted }}>© 2024 Crunch Bacon. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="transition-colors hover:text-white" style={{ color: colors.textMuted }}><Twitter size={20} /></a>
              <a href="#" className="transition-colors hover:text-white" style={{ color: colors.textMuted }}><Instagram size={20} /></a>
              <a href="#" className="transition-colors hover:text-white" style={{ color: colors.textMuted }}><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
