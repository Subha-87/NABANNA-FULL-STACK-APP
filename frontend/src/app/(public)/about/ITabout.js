"use client";
import { useState, useEffect, useRef } from "react";

/* ── Icon Components ── */
const Icons = {
  Network: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" /><path d="M12 12V8" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Camera: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" />
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Monitor: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  Speaker: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  ),
  Radio: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" /><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.4" />
      <circle cx="12" cy="12" r="2" /><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.4" /><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
    </svg>
  ),
  Lock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Building: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" />
    </svg>
  ),
  Cable: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M4 4h6v6H4z" /><path d="M14 4h6v6h-6z" /><path d="M4 14h6v6H4z" />
      <path d="M14 14h2v2h-2z" /><path d="M18 14h2v2h-2z" /><path d="M14 18h2v2h-2z" /><path d="M18 18h2v2h-2z" />
    </svg>
  ),
  Eye: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Display: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      <path d="M7 9h2" /><path d="M11 9h6" />
    </svg>
  ),
};

/* ── Animated Counter ── */
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    /* Use the scrollable parent for observation */
    const scrollParent = el.closest(".main") || window;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3, root: scrollParent !== window ? scrollParent : undefined }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return [count, ref];
}

/* ── Reveal on Scroll (root-aware for layout scroll container) ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const scrollParent = el.closest(".main") || window;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      {
        threshold: 0.1,
        root: scrollParent !== window ? scrollParent : undefined,
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Stat Item ── */
function StatItem({ value, suffix, label }) {
  const [count, ref] = useCounter(value);
  return (
    <div ref={ref} className="text-center px-4 py-4">
      <div className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-400 tracking-tight">
        {count}<span className="text-xl md:text-2xl">{suffix}</span>
      </div>
      <div className="text-xs sm:text-sm text-slate-400 mt-1.5 font-medium tracking-wide uppercase">{label}</div>
    </div>
  );
}

/* ── Service Card ── */
function ServiceCard({ icon: Icon, title, description, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-2xl p-6 hover:border-amber-500/40 transition-all duration-500 backdrop-blur-sm"
      style={{
        transform: visible ? "translateY(0)" : "translateY(40px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${delay}ms`,
        transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease",
      }}
    >
      <div className="absolute inset-0 rounded-2xl bg-amber-500/0 group-hover:bg-amber-500/5 transition-colors duration-500 pointer-events-none" />
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-amber-500/0 group-hover:via-amber-500/60 to-transparent transition-all duration-500" />
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-5 group-hover:bg-amber-500/20 transition-colors duration-300">
          <Icon />
        </div>
        <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-amber-300 transition-colors duration-300">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ── Particle Canvas (container-relative) ── */
function ParticleField() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];

    function resize() {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    }

    function createParticles() {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 20000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.2 + 0.4,
          alpha: Math.random() * 0.35 + 0.08,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 191, 36, ${p.alpha})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(251, 191, 36, ${0.05 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    const ro = new ResizeObserver(() => { resize(); createParticles(); });
    ro.observe(container);

    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

/* ── Divider ── */
function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 my-6">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/30" />
      <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/40" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/30" />
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function ITabout() {
  const [heroRef, heroVisible] = useReveal();
  const [missionRef, missionVisible] = useReveal();

  const services = [
    {
      icon: Icons.Network,
      title: "Structured Networking",
      description:
        "End-to-end physical cabling — CAT6/FTP, fiber optic backbone, rack installation, patch panel, and cable management with industry-standard labeling and testing.",
    },
    {
      icon: Icons.Shield,
      title: "Router & Firewall Configuration",
      description:
        "Enterprise-grade routing, firewall policies, VPN tunneling, NAT, ACLs, IDS/IPS integration, and traffic management for secure government networks.",
    },
    {
      icon: Icons.Phone,
      title: "EPABX & Telephone Exchange",
      description:
        "Modern IP-PBX and legacy EPABX systems with analog & digital card integration, DID/DOD routing, IVR setup, and inter-department connectivity.",
    },
    {
      icon: Icons.Camera,
      title: "CCTV Surveillance System",
      description:
        "Comprehensive surveillance with dome, bullet, and PTZ cameras — NVR/DVR setup, remote monitoring, motion detection, and video analytics integration.",
    },
    {
      icon: Icons.Monitor,
      title: "Video Conferencing Solutions",
      description:
        "Immersive meeting setups with codec-based VC systems, cloud VC (Zoom/Teams/Webex), ceiling mics, speaker tracking cameras, and dual-screen configurations.",
    },
    {
      icon: Icons.Speaker,
      title: "Smart Auditorium Systems",
      description:
        "Professional audio design with line arrays, subwoofers, wireless mic systems, DSP processors, acoustic treatment, and digital mixing consoles.",
    },
    {
      icon: Icons.Lock,
      title: "Physical Security Systems",
      description:
        "Hydraulic bollards, Under Vehicle Scanning System (UVSS), boom barriers, flap barriers, and RFID-based access control for perimeter security.",
    },
    {
      icon: Icons.Radio,
      title: "RFID & Access Control",
      description:
        "RFID card-based attendance and access management, biometric integration, turnstile gates, visitor management systems, and real-time dashboards.",
    },
    {
      icon: Icons.Display,
      title: "Large Display & AV Setup",
      description:
        "LED video walls, LCD/LED panel displays in meeting rooms, digital signage, wireless presentation systems, and interactive flat panels.",
    },
    {
      icon: Icons.Cable,
      title: "Network Infrastructure",
      description:
        "Server room design, structured cabling, UPS for IT loads, raised flooring, precision AC, and environmental monitoring for data center readiness.",
    },
    {
      icon: Icons.Eye,
      title: "IT Security & Compliance",
      description:
        "Network auditing, vulnerability assessment, endpoint security, content filtering, email security, and compliance with government IT security policies.",
    },
    {
      icon: Icons.Building,
      title: "End-to-End IT Solutions",
      description:
        "Complete IT turnkey projects — from site survey and design to procurement, installation, testing, commissioning, and annual maintenance contracts (AMC).",
    },
  ];

  return (
    <div className="relative w-full bg-slate-950 text-slate-100 overflow-hidden">

      {/* Particle Background — absolute, not fixed */}
      <ParticleField />

      {/* Gradient orbs — absolute, not fixed */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-500/[0.03] rounded-full blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative" style={{ zIndex: 2 }}>

        {/* ── HERO ── */}
        <section ref={heroRef} className="relative pt-10 pb-12 md:pt-16 md:pb-20 px-4">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(251,191,36,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 mb-6"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-semibold text-amber-300 tracking-widest uppercase">Public Works Department</span>
            </div>

            {/* Title */}
            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-black leading-[1.08] tracking-tight mb-5"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s",
              }}
            >
              <span className="text-slate-100">IT Infrastructure</span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-teal-400 bg-clip-text text-transparent">
                & Networking Wing
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="max-w-2xl mx-auto text-sm md:text-base text-slate-400 leading-relaxed mb-7"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.25s",
              }}
            >
              The backbone of digital governance — designing, deploying, and maintaining the complete
              IT and communication infrastructure across government establishments.
            </p>

            {/* Tags */}
            <div
              className="flex flex-wrap justify-center gap-2 md:gap-3"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s",
              }}
            >
              {["Networking", "Surveillance", "Communication", "Security", "Audio-Visual"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-semibold tracking-wide rounded-full border border-slate-700/60 text-slate-300 bg-slate-800/50 hover:border-amber-500/40 hover:text-amber-300 transition-colors duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ── STATISTICS ── */}
        <section className="py-8 md:py-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-0 rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-sm overflow-hidden">
              <StatItem value={150} suffix="+" label="Projects Delivered" />
              <StatItem value={500} suffix="+" label="CCTV Cameras" />
              <StatItem value={50} suffix="+" label="VC Setup Rooms" />
              <StatItem value={100} suffix="%" label="Uptime SLA" />
            </div>
          </div>
        </section>

        <Divider />

        {/* ── ABOUT / OVERVIEW ── */}
        <section ref={missionRef} className="py-10 md:py-16 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-14 items-center">
            {/* Left text */}
            <div
              style={{
                opacity: missionVisible ? 1 : 0,
                transform: missionVisible ? "translateX(0)" : "translateX(-40px)",
                transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-amber-400 mb-3 block">Who We Are</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 leading-tight mb-5">
                The Nerve Center of
                <span className="text-amber-400"> Government IT</span>
              </h2>
              <div className="space-y-3 text-slate-400 leading-relaxed text-sm md:text-base">
                <p>
                  The IT & Networking Wing of PWD I Department serves as the single-point agency for
                  all technology infrastructure needs within government premises. From the physical layer
                  of structured cabling to the application layer of video conferencing and security
                  systems — we own the full stack.
                </p>
                <p>
                  Our mandate covers site surveys, system design, BOQ preparation, vendor coordination,
                  installation supervision, testing & commissioning, and post-deployment maintenance.
                  We ensure every government building is equipped with reliable, secure, and
                  future-ready IT infrastructure.
                </p>
                <p>
                  Working closely with NIC, CDAC, and other central agencies, we align our
                  deployments with national standards for e-governance connectivity and
                  cybersecurity frameworks.
                </p>
              </div>
            </div>

            {/* Right visual grid */}
            <div
              className="grid grid-cols-2 gap-3"
              style={{
                opacity: missionVisible ? 1 : 0,
                transform: missionVisible ? "translateX(0)" : "translateX(40px)",
                transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.15s",
              }}
            >
              {[
                { label: "Network Operations", color: "from-amber-600/20 to-amber-900/10", border: "border-amber-500/20" },
                { label: "Surveillance Command", color: "from-teal-600/20 to-teal-900/10", border: "border-teal-500/20" },
                { label: "Communication Hub", color: "from-sky-600/20 to-sky-900/10", border: "border-sky-500/20" },
                { label: "Security Operations", color: "from-rose-600/20 to-rose-900/10", border: "border-rose-500/20" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`rounded-xl bg-gradient-to-br ${item.color} border ${item.border} p-4 flex flex-col justify-end min-h-[120px] hover:scale-[1.03] transition-transform duration-300`}
                >
                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                    <span className="text-white/60 text-[10px] font-bold">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-200">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ── SERVICES GRID ── */}
        <section className="py-10 md:py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-amber-400 mb-3 block">Our Capabilities</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 mb-3">
                Complete IT Ecosystem
              </h2>
              <p className="max-w-xl mx-auto text-slate-400 text-sm">
                Twelve specialized verticals covering every aspect of modern government IT infrastructure.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, i) => (
                <ServiceCard
                  key={i}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  delay={i * 70}
                />
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ── WORKFLOW TIMELINE ── */}
        <section className="py-10 md:py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-amber-400 mb-3 block">Our Process</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 mb-3">
                Project Execution Lifecycle
              </h2>
            </div>

            <div className="relative">
              {/* Timeline center line (desktop) */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/30 via-amber-500/15 to-transparent" />

              {[
                { step: "01", title: "Site Survey & Requirement Analysis", desc: "Detailed assessment of existing infrastructure, space availability, electrical capacity, and client requirements." },
                { step: "02", title: "System Design & BOQ Preparation", desc: "Architecting the solution with network topology diagrams, floor plans, equipment lists, and cost estimates." },
                { step: "03", title: "Procurement & Vendor Management", desc: "Sourcing OEM-certified equipment through GeM/tender processes, ensuring quality standards and warranty compliance." },
                { step: "04", title: "Installation & Configuration", desc: "Professional deployment by trained engineers — cabling, mounting, programming, and integration of all subsystems." },
                { step: "05", title: "Testing, Training & Handover", desc: "End-to-end testing with documentation, operator training, as-built drawings, and formal handover to the department." },
                { step: "06", title: "Annual Maintenance & Support", desc: "Proactive AMC with scheduled health checks, breakdown support, firmware updates, and performance optimization." },
              ].map((item, i) => {
                const [ref, visible] = useReveal();
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={i}
                    ref={ref}
                    className={`relative flex items-center mb-8 last:mb-0 md:mb-10 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    } flex-row`}
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(25px)",
                      transition: `all 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${i * 100}ms`,
                    }}
                  >
                    <div className={`flex-1 ${isLeft ? "md:pr-14 md:text-right" : "md:pl-14 md:text-left"} pl-11 md:pl-0`}>
                      <div className="inline-block px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 text-[11px] font-bold mb-1.5">
                        STEP {item.step}
                      </div>
                      <h3 className="text-base font-bold text-slate-100 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>

                    {/* Desktop center dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-amber-500 border-[3px] border-slate-950 z-10" />

                    {/* Mobile left dot */}
                    <div className="absolute left-[15px] top-1 w-2.5 h-2.5 rounded-full bg-amber-500 border-2 border-slate-950 md:hidden" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Divider />

        {/* ── STANDARDS & COMPLIANCE ── */}
        <section className="py-10 md:py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-amber-400 mb-3 block">Standards We Follow</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 mb-3">
                Aligned with National Frameworks
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { name: "NIC Guidelines", desc: "National Informatics Centre standards for government network design and e-governance connectivity." },
                { name: "NISG / CERT-In", desc: "Cybersecurity frameworks and incident response protocols for government IT assets." },
                { name: "BIS / TEC Standards", desc: "Bureau of Indian Standards and Telecom Engineering Centre norms for cabling and telecom equipment." },
                { name: "PWD Specifications", desc: "Public Works Department electrical and IT-related work specifications." },
                { name: "GeM Procurement", desc: "Government e-Marketplace compliant procurement processes for transparency and efficiency." },
                { name: "ISO 27001", desc: "Information security management system standards for data protection and access control." },
              ].map((item, i) => {
                const [ref, visible] = useReveal();
                return (
                  <div
                    key={i}
                    ref={ref}
                    className="group p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 hover:border-amber-500/30 transition-all duration-400"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "scale(1)" : "scale(0.95)",
                      transition: `all 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 70}ms`,
                    }}
                  >
                    <div className="w-2.5 h-2.5 rounded-sm bg-amber-500/60 group-hover:bg-amber-400 transition-colors mb-2.5" />
                    <h4 className="text-sm font-bold text-slate-200 mb-1">{item.name}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Divider />

        {/* ── FOOTER TAGLINE ── */}
        <section className="py-14 md:py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-6">
              <Icons.Shield />
            </div>
            <h2 className="text-xl md:text-3xl font-black text-slate-100 mb-3 leading-tight">
              Building the Digital Backbone
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-teal-400 bg-clip-text text-transparent">
                of Governance
              </span>
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
              PWD I Department — IT & Networking Wing. Connecting every government building,
              securing every premises, enabling every digital service.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-[11px] text-slate-500 font-medium tracking-wide uppercase">
              <span>pwd department</span>
              <span className="text-amber-500/30">|</span>
              <span>it & networking wing</span>
              <span className="text-amber-500/30">|</span>
              <span>government of west bengal</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}