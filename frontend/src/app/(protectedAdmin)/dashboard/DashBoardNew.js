"use client";
import { useState, useEffect, useMemo } from "react";
import { useAxios } from "@/app/Hook/useAxios";
import { handleAxiosError } from "@/app/utils/axiosError";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

/* ═══════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════ */

const DOMAINS = ["Internet", "Voice", "PC_Hardware", "Cable_TV"];
const DEPARTMENTS = [
  "PWD","Disaster Management","DGP Cell","Agriculture","MA & ME",
  "HOME","L & LR","PAR","I & CA","Finance","13th Floor VVIP",
  "13th Floor CMO","14th Floor CMO","1st Floor Service","KP Police Control/SB",
];
const STATUSES = ["Pending", "In Progress", "Complete"];
const DOMAIN_COLORS = { Internet: "#60A5FA", Voice: "#34D399", PC_Hardware: "#FBBF24", "Cable_TV": "#F87171" };
const STATUS_COLORS = { Pending: "#FBBF24", "In Progress": "#A78BFA", Complete: "#34D399" };
const PALETTE = ["#60A5FA","#34D399","#FBBF24","#F87171","#A78BFA","#F472B6","#22D3EE","#A3E635","#FB923C","#818CF8","#2DD4BF","#FB7185","#C084FC","#38BDF8"];
const VENDOR_NAMES = ["Writers Building(IT)","Pascal Computer","Consulting Technologies","Compunet System","Prakash Electricals","Aircon","Iris System","Embee"];
const VENDOR_COLORS = { "Writers Building(IT)":"#60A5FA","Pascal Computer":"#34D399","Consulting Technologies":"#FBBF24","Compunet System":"#F87171","Prakash Electricals":"#A78BFA","Aircon":"#F472B6","Iris System":"#22D3EE","Embee":"#A3E635","Others":"#6B7280" };
const ITEM_COLORS = { Desktop:"#60A5FA", "All-In-One":"#34D399", Laptop:"#FBBF24", Printer:"#F87171" };

/* ═══════════════════════════════════════════════════════════
   NEON THEME CONFIG
   ═══════════════════════════════════════════════════════════ */

const NEON = {
  blue:   { glow:"0 0 20px rgba(96,165,250,0.4), 0 0 60px rgba(96,165,250,0.1)",  color:"#60A5FA", bg:"rgba(96,165,250,0.08)",  border:"rgba(96,165,250,0.25)",  text:"#BFDBFE" },
  purple: { glow:"0 0 20px rgba(167,139,250,0.4), 0 0 60px rgba(167,139,250,0.1)", color:"#A78BFA", bg:"rgba(167,139,250,0.08)", border:"rgba(167,139,250,0.25)", text:"#DDD6FE" },
  rose:   { glow:"0 0 20px rgba(251,113,133,0.4), 0 0 60px rgba(251,113,133,0.1)", color:"#FB7185", bg:"rgba(251,113,133,0.08)", border:"rgba(251,113,133,0.25)", text:"#FECDD3" },
  teal:   { glow:"0 0 20px rgba(34,211,238,0.4), 0 0 60px rgba(34,211,238,0.1)",  color:"#22D3EE", bg:"rgba(34,211,238,0.08)",  border:"rgba(34,211,238,0.25)",  text:"#A5F3FC" },
};

/* ═══════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════ */

const safe = (v) => (Array.isArray(v) ? v : []);
const parseDate = (raw) => {
  if (!raw) return null; const s = String(raw);
  if (/^\d{1,2}\/\d{1,2}\/\d{4}/.test(s)) { const [d, m, y] = s.split("/"); return new Date(+y, m - 1, +d); }
  const dt = new Date(s); return isNaN(dt.getTime()) ? null : dt;
};
const monthKey = (raw) => { const d = parseDate(raw); if (!d) return null; return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`; };
const lastNMonths = (n) => { const out = []; const now = new Date(); for (let i = n - 1; i >= 0; i--) { const d = new Date(now.getFullYear(), now.getMonth() - i, 1); out.push({ key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`, label: d.toLocaleString("en-US", { month: "short", year: "2-digit" }) }); } return out; };
const withinMonths = (raw, n) => { const d = parseDate(raw); if (!d) return false; const now = new Date(); return d >= new Date(now.getFullYear(), now.getMonth() - n, 1); };
const parseCost = (v) => { if (typeof v === "number") return v; if (!v) return 0; return parseFloat(String(v).replace(/[^\d.-]/g, "")) || 0; };
const fmtINR = (n) => { if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`; if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`; return `₹${Math.round(n).toLocaleString("en-IN")}`; };

const mapVendor = (sender) => {
  if (!sender) return "Others"; const s = String(sender).trim().toLowerCase();
  for (const v of VENDOR_NAMES) { const vl = v.toLowerCase(); const core = vl.replace(/\(.*\)/, "").trim(); if (s === vl || s.includes(core) || core.includes(s)) return v; }
  return "Others";
};
const mapItem = (item) => {
  if (!item) return null; const s = String(item).trim().toLowerCase();
  if (s.includes("desktop")) return "Desktop"; if (s.includes("all-in-one") || s.includes("all in one") || s.includes("aio")) return "All-In-One";
  if (s.includes("laptop") || s.includes("notebook")) return "Laptop"; if (s.includes("printer")) return "Printer"; return null;
};

/* ═══════════════════════════════════════════════════════════
   DARK-THEMED COMPONENTS
   ═══════════════════════════════════════════════════════════ */

const Tip = ({ active, payload, label, formatter }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#31036c]/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 px-4 py-3 text-sm">
      <p className="font-semibold text-white mb-1.5">{label}</p>
      {payload.map((e, i) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: e.color }} />
          <span className="text-gray-400">{e.name}:</span>
          <span className="font-semibold text-white">{formatter ? formatter(e.value, e.name) : e.value}</span>
        </div>
      ))}
    </div>
  );
};

const Empty = ({ msg = "No data available for this period" }) => (
  <div className="flex items-center justify-center h-full min-h-[200px] text-gray-500 text-sm select-none">
    <div className="text-center">
      <svg className="w-10 h-10 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
      {msg}
    </div>
  </div>
);

const glassCardCls = "relative rounded-2xl p-5 md:p-6 transition-all duration-500 ease-out bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12]";

const GlassCard = ({ title, sub, children, className = "" }) => (
  <div className={`${glassCardCls} ${className}`} style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.05), 0 4px 30px rgba(0,0,0,0.3)" }}>
    {title && (
      <div className="mb-5">
        <h3 className="text-[15px] font-semibold text-white/90 leading-tight">{title}</h3>
        {sub && <p className="text-[11px] text-gray-500 mt-1 tracking-wide">{sub}</p>}
      </div>
    )}
    <div className="font-['Inter',sans-serif]">{children}</div>
  </div>
);

const NeonSectionHead = ({ neon, title, sub, icon }) => (
  <div className="flex items-center gap-4 mb-6 group">
    <div className="relative w-1.5 h-9 rounded-full transition-all duration-500 group-hover:h-11" style={{ backgroundColor: neon.color, boxShadow: neon.glow }} />
    <div className="flex items-center gap-3">
      {icon && (
        <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110" style={{ backgroundColor: neon.bg, border: `1px solid ${neon.border}`, boxShadow: neon.glow }}>
          {icon}
        </div>
      )}
      <div>
        <h2 className="text-lg font-bold text-white tracking-tight">{title}</h2>
        {sub && <p className="text-[11px] text-gray-500 mt-0.5 tracking-wide">{sub}</p>}
      </div>
    </div>
    <div className="flex-1 h-px ml-4" style={{ background: `linear-gradient(to right, ${neon.border}, transparent)` }} />
  </div>
);

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <div className={`${className}`} style={{ opacity: 0, transform: "translateY(24px)", animation: `fadeSlideUp 0.7s ease-out ${delay}ms forwards` }}>
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════
   MAIN DASHBOARD
   ═══════════════════════════════════════════════════════════ */

const DashBoardNew = () => {
  const axios = useAxios();
  const [complains, setComplains] = useState([]);
  const [requisitions, setRequisitions] = useState([]);
  const [estimates, setEstimates] = useState([]);
  const [incoming, setIncoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true); setError(null);
      try {
        const [c, r, e, inc] = await Promise.all([
          axios.get("/complain/getAll"), axios.get("/ItReq/allITData"),
          axios.get("/estimateReg"), axios.get("/itemNabanna/showincoming"),
        ]);
        setComplains(safe(c.data?.data)); setRequisitions(safe(r.data?.data));
        setEstimates(safe(e.data?.data ?? e.data)); setIncoming(safe(inc.data?.data ?? inc.data));
      } catch (err) { const { generalError } = handleAxiosError(err); setError(generalError || "Failed to load dashboard data"); }
      finally { setLoading(false); }
    };
    fetch();
  }, [axios]);

  const kpi = useMemo(() => {
    const total = complains.length, resolved = complains.filter(d => d.status === "Complete").length,
      pending = complains.filter(d => d.status === "Pending").length, inProg = complains.filter(d => d.status === "In Progress").length,
      reqCount = requisitions.length, totalCost = estimates.reduce((s, d) => s + parseCost(d.cost), 0),
      totalItems = incoming.reduce((s, d) => s + safe(d.itItems).length, 0);
    return { total, resolved, pending, inProg, reqCount, totalCost, totalItems };
  }, [complains, requisitions, estimates, incoming]);

  /* S1: Complain */
  const trendData = useMemo(() => { const months = lastNMonths(6); return months.map(m => { const rows = complains.filter(d => monthKey(d.date) === m.key); const obj = { month: m.label }; DOMAINS.forEach(dom => (obj[dom] = rows.filter(r => r.domain === dom).length)); return obj; }); }, [complains]);
  const deptDomain = useMemo(() => { const src = complains.filter(d => withinMonths(d.date, 3)); const arr = DEPARTMENTS.map(dept => { const rows = src.filter(r => r.department === dept.toLowerCase()); const obj = { department: dept }; DOMAINS.forEach(dom => (obj[dom] = rows.filter(r => r.domain === dom).length)); obj._t = DOMAINS.reduce((s, dom) => s + obj[dom], 0); return obj; }); return arr.filter(r => r._t > 0).sort((a, b) => b._t - a._t); }, [complains]);
  const domainStatus = useMemo(() => DOMAINS.map(dom => { const rows = complains.filter(r => r.domain === dom); const obj = { domain: dom }; STATUSES.forEach(st => (obj[st] = rows.filter(r => r.status === st).length)); return obj; }), [complains]);

  /* S2: Requisition */
  const reqCats = useMemo(() => { const s = new Set(); requisitions.filter(d => withinMonths(d.date, 6)).forEach(d => { if (Array.isArray(d.lcategory)) d.lcategory.forEach(c => s.add(c)); }); return Array.from(s).sort(); }, [requisitions]);
  const deptCat = useMemo(() => { const src = requisitions.filter(d => withinMonths(d.date, 6)); const arr = DEPARTMENTS.map(dept => { const rows = src.filter(r => r.department === dept.toLowerCase()); const obj = { department: dept }; reqCats.forEach(c => (obj[c] = rows.filter(r => Array.isArray(r.lcategory) && r.lcategory.includes(c)).length)); obj._t = reqCats.reduce((s, c) => s + obj[c], 0); return obj; }); return arr.filter(r => r._t > 0).sort((a, b) => b._t - a._t); }, [requisitions, reqCats]);
  const catPie = useMemo(() => { const src = requisitions.filter(d => withinMonths(d.date, 3)); const map = {}; src.forEach(d => { if (Array.isArray(d.lcategory)) d.lcategory.forEach(c => (map[c] = (map[c] || 0) + 1)); }); let sorted = Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value); if (sorted.length > 8) { const top = sorted.slice(0, 7); const rest = sorted.slice(7).reduce((s, i) => s + i.value, 0); if (rest > 0) top.push({ name: "Others", value: rest }); return top; } return sorted; }, [requisitions]);
  const reqStatusPie = useMemo(() => STATUSES.map(s => ({ name: s, value: requisitions.filter(d => d.status === s).length })).filter(d => d.value > 0), [requisitions]);

  /* S3: Estimate */
  const estMonthly = useMemo(() => {
    const months = lastNMonths(6); const deptTotals = {};
    estimates.forEach(d => { if (!d.department) return; deptTotals[d.department] = (deptTotals[d.department] || 0) + parseCost(d.cost); });
    const sorted = Object.entries(deptTotals).sort((a, b) => b[1] - a[1]);
    const topDepts = sorted.slice(0, 8).map(([d]) => d), restDepts = sorted.slice(8).map(([d]) => d), hasOthers = restDepts.length > 0;
    const departments = hasOthers ? [...topDepts, "Others"] : topDepts;
    const chartData = months.map(m => { const rows = estimates.filter(d => monthKey(d.date) === m.key); const obj = { month: m.label }; topDepts.forEach(dept => { obj[dept] = Math.round(rows.filter(r => r.department === dept).reduce((s, r) => s + parseCost(r.cost), 0)); }); if (hasOthers) obj["Others"] = Math.round(rows.filter(r => restDepts.includes(r.department)).reduce((s, r) => s + parseCost(r.cost), 0)); return obj; });
    return { departments, chartData };
  }, [estimates]);
  const estDonut = useMemo(() => { const map = {}; estimates.forEach(d => { if (!d.department) return; map[d.department] = (map[d.department] || 0) + parseCost(d.cost); }); let sorted = Object.entries(map).map(([name, value]) => ({ name, value: Math.round(value) })).sort((a, b) => b.value - a.value); if (sorted.length > 8) { const top = sorted.slice(0, 7); const rest = sorted.slice(7).reduce((s, i) => s + i.value, 0); if (rest > 0) top.push({ name: "Others", value: rest }); return top; } return sorted; }, [estimates]);
  const estTrend = useMemo(() => { const months = lastNMonths(6); return months.map(m => { const rows = estimates.filter(d => monthKey(d.date) === m.key); return { month: m.label, cost: Math.round(rows.reduce((s, r) => s + parseCost(r.cost), 0)), amount: Math.round(rows.reduce((s, r) => s + parseCost(r.amount), 0)), count: rows.length }; }); }, [estimates]);

  /* S4: Incoming */
  const vendorMonthly = useMemo(() => {
    const months = lastNMonths(6), src = incoming.filter(d => withinMonths(d.date, 6)), vendorTotals = {};
    src.forEach(d => { const v = mapVendor(d.sender); vendorTotals[v] = (vendorTotals[v] || 0) + safe(d.itItems).length; });
    let sorted = Object.entries(vendorTotals).filter(([, c]) => c > 0).sort((a, b) => b[1] - a[1]);
    let activeVendors = sorted.map(([v]) => v);
    const oIdx = activeVendors.indexOf("Others"); if (oIdx > -1) { activeVendors.splice(oIdx, 1); activeVendors.push("Others"); }
    const chartData = months.map(m => { const rows = src.filter(d => monthKey(d.date) === m.key); const obj = { month: m.label }; activeVendors.forEach(v => { obj[v] = rows.filter(r => mapVendor(r.sender) === v).reduce((s, r) => s + safe(r.itItems).length, 0); }); return obj; });
    return { vendors: activeVendors, chartData };
  }, [incoming]);
  const vendorPie = useMemo(() => {
    const src = incoming.filter(d => withinMonths(d.date, 6)), map = {};
    src.forEach(d => { const v = mapVendor(d.sender); map[v] = (map[v] || 0) + safe(d.itItems).length; });
    let sorted = Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
    const oIdx = sorted.findIndex(d => d.name === "Others"); if (oIdx > -1 && oIdx < sorted.length - 1) { const [o] = sorted.splice(oIdx, 1); sorted.push(o); }
    return sorted;
  }, [incoming]);
  const itemPie = useMemo(() => {
    const src = incoming.filter(d => withinMonths(d.date, 6)), map = {};
    src.forEach(d => { safe(d.itItems).forEach(item => { const mapped = mapItem(item?.item); if (mapped) map[mapped] = (map[mapped] || 0) + 1; }); });
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [incoming]);

  const hasTrend = trendData.some(d => DOMAINS.some(dom => d[dom] > 0));
  const hasDomSt = domainStatus.some(d => STATUSES.some(s => d[s] > 0));
  const hasEstMonthly = estMonthly.chartData.some(d => estMonthly.departments.some(dep => d[dep] > 0));
  const hasEstTrend = estTrend.some(d => d.cost > 0);
  const hasVendorMonthly = vendorMonthly.chartData.some(d => vendorMonthly.vendors.some(v => d[v] > 0));

  /* ═══════════════════════════════════════════════════════════
     LOADING / ERROR
     ═══════════════════════════════════════════════════════════ */

  if (loading) return (
    <div className="w-full min-h-screen bg-[#31036c] flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-[3px] border-white/5" />
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-blue-400 animate-spin" style={{ boxShadow: "0 0 20px rgba(96,165,250,0.5)" }} />
        </div>
        <div className="text-center">
          <p className="text-white/70 text-sm font-medium">Loading Dashboard</p>
          <p className="text-white/30 text-xs mt-1">Fetching analytics data…</p>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="w-full min-h-screen bg-[#0a0a1a] flex items-center justify-center p-4">
      <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/10 p-8 max-w-sm w-full text-center">
        <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
          <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
        </div>
        <h2 className="text-base font-semibold text-white mb-1">Error Loading Data</h2>
        <p className="text-gray-500 text-sm mb-6">{error}</p>
        <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-blue-500/20 text-blue-400 text-sm font-medium rounded-xl border border-blue-500/30 hover:bg-blue-500/30 transition-all duration-300 cursor-pointer" style={{ boxShadow: "0 0 15px rgba(96,165,250,0.15)" }}>Retry</button>
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════ */

  const darkAxis = { tick: { fontSize: 11, fill: "#6B7280" }, axisLine: false, tickLine: false };
  const darkGrid = { strokeDasharray: "3 3", stroke: "rgba(255,255,255,0.04)" };
  const pieTipStyle = { borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", fontSize: "13px", background: "rgba(15,15,30,0.95)", backdropFilter: "blur(20px)", boxShadow: "0 10px 40px rgba(0,0,0,0.5)" };

  const kpiData = [
    { label: "Total Complaints", val: kpi.total, neon: NEON.blue, icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    { label: "Resolved", val: kpi.resolved, neon: NEON.purple, icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "In Progress", val: kpi.inProg, neon: NEON.teal, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Pending", val: kpi.pending, neon: NEON.rose, icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Requisitions", val: kpi.reqCount, neon: NEON.purple, icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { label: "Estimate Cost", val: fmtINR(kpi.totalCost), neon: NEON.rose, icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  ];

  const kpiCardCls = "group relative rounded-2xl p-5 transition-all duration-500 ease-out cursor-default overflow-hidden bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] hover:-translate-y-0.5";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseNeon { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        .recharts-default-legend { margin-top: 8px !important; }
        .recharts-legend-item-text { color: #9CA3AF !important; font-size: 11px !important; }
      ` }} />

      <div className="w-full h-fit min-h-screen bg-[#0a0a1a] relative overflow-hidden">
        {/* Background ambient blobs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, #60A5FA, transparent 70%)" }} />
          <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, #A78BFA, transparent 70%)" }} />
          <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, #22D3EE, transparent 70%)" }} />
          <div className="absolute top-2/3 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.02]" style={{ background: "radial-gradient(circle, #FB7185, transparent 70%)" }} />
        </div>
        <div className="fixed inset-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10">
          {/* HEADER */}
          <header className="relative border-b border-white/[0.06]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.07] via-transparent to-purple-600/[0.07]" />
            <div className="max-w-[1480px] mx-auto px-6 md:px-10 py-8 md:py-10 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm" style={{ boxShadow: NEON.blue.glow }}>
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-400 rounded-full" style={{ boxShadow: "0 0 8px rgba(96,165,250,0.8)", animation: "pulseNeon 2s ease-in-out infinite" }} />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">PWD IT Dashboard</h1>
                    <p className="text-gray-500 text-sm mt-0.5">Nabanna — Analytical Overview</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-3">
                  {["Complaints", "Requisitions", "Estimates", "Incoming"].map((label, i) => {
                    const colors = [NEON.blue, NEON.purple, NEON.rose, NEON.teal];
                    return (
                      <div key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[i].color, boxShadow: colors[i].glow }} />
                        <span className="text-[11px] text-gray-400 font-medium">{label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </header>

          <main className="max-w-[1480px] mx-auto px-6 md:px-10 py-8 space-y-10">
            {/* KPI CARDS */}
            <FadeIn delay={100}>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {kpiData.map((c, i) => (
                  <div key={i} className={kpiCardCls} style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,0,0.2)" }}>
                    <div className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(to right, transparent, ${c.neon.color}, transparent)`, boxShadow: c.neon.glow }} />
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">{c.label}</p>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500 group-hover:scale-110" style={{ backgroundColor: c.neon.bg, border: `1px solid ${c.neon.border}` }}>
                        <svg className="w-4 h-4" style={{ color: c.neon.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={c.icon} /></svg>
                      </div>
                    </div>
                    <p className="text-xl md:text-2xl font-bold leading-tight transition-colors duration-300" style={{ color: c.neon.color }}>{c.val}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* ═══ SECTION 1 — COMPLAIN ANALYSIS ═══ */}
            <FadeIn delay={200}>
              <section>
                <NeonSectionHead neon={NEON.blue} title="Nabanna User Complain Analysis" sub="Trends · Department breakdown · Resolution status" icon={<svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>} />
                <div className="grid lg:grid-cols-5 gap-6 mb-6">
                  <GlassCard title="Complain Trend — Last 6 Months" sub="Monthly volume by domain type" className="lg:col-span-3">
                    <ResponsiveContainer width="100%" height={330}>
                      {hasTrend ? (
                        <LineChart data={trendData}>
                          <CartesianGrid {...darkGrid} /><XAxis dataKey="month" {...darkAxis} /><YAxis {...darkAxis} allowDecimals={false} />
                          <Tooltip content={<Tip />} /><Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                          {DOMAINS.map(dom => (<Line key={dom} type="monotone" dataKey={dom} stroke={DOMAIN_COLORS[dom]} strokeWidth={2.5} dot={{ r: 4, fill: "#0a0a1a", stroke: DOMAIN_COLORS[dom], strokeWidth: 2 }} activeDot={{ r: 6, fill: DOMAIN_COLORS[dom], stroke: "#0a0a1a", strokeWidth: 2 }} style={{ filter: `drop-shadow(0 0 4px ${DOMAIN_COLORS[dom]}40)` }} />))}
                        </LineChart>
                      ) : <Empty />}
                    </ResponsiveContainer>
                  </GlassCard>
                  <GlassCard title="Domain vs Resolution Status" sub="Pending · In-Progress · Complete" className="lg:col-span-2">
                    <ResponsiveContainer width="100%" height={330}>
                      {hasDomSt ? (
                        <BarChart data={domainStatus} barCategoryGap="20%">
                          <CartesianGrid {...darkGrid} vertical={false} /><XAxis dataKey="domain" {...darkAxis} /><YAxis {...darkAxis} allowDecimals={false} />
                          <Tooltip content={<Tip />} /><Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                          {STATUSES.map((st, i) => (<Bar key={st} dataKey={st} stackId="s" fill={STATUS_COLORS[st]} radius={i === STATUSES.length - 1 ? [6, 6, 0, 0] : undefined} style={{ filter: `drop-shadow(0 0 3px ${STATUS_COLORS[st]}30)` }} />))}
                        </BarChart>
                      ) : <Empty />}
                    </ResponsiveContainer>
                  </GlassCard>
                </div>
                <GlassCard title="Department vs Complain Domain — Last 3 Months" sub="Which department raised which type of complain the most">
                  <ResponsiveContainer width="100%" height={Math.max(280, deptDomain.length * 42 + 50)}>
                    {deptDomain.length > 0 ? (
                      <BarChart layout="vertical" data={deptDomain} margin={{ left: 10, right: 20 }}>
                        <CartesianGrid {...darkGrid} horizontal={false} /><XAxis type="number" {...darkAxis} allowDecimals={false} /><YAxis type="category" dataKey="department" {...darkAxis} width={135} />
                        <Tooltip content={<Tip />} /><Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                        {DOMAINS.map((dom, i) => (<Bar key={dom} dataKey={dom} stackId="d" fill={DOMAIN_COLORS[dom]} radius={i === DOMAINS.length - 1 ? [0, 6, 6, 0] : undefined} style={{ filter: `drop-shadow(0 0 3px ${DOMAIN_COLORS[dom]}30)` }} />))}
                      </BarChart>
                    ) : <Empty />}
                  </ResponsiveContainer>
                </GlassCard>
              </section>
            </FadeIn>

            {/* ═══ SECTION 2 — REQUISITION ANALYSIS ═══ */}
            <FadeIn delay={300}>
              <section>
                <NeonSectionHead neon={NEON.purple} title="Nabanna User Requisition Analysis" sub="IT letter trends by department & category" icon={<svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} />
                <GlassCard title="Department vs Requisition Category — Last 6 Months" sub="Letters generated per department per category" className="mb-6">
                  <ResponsiveContainer width="100%" height={Math.max(280, deptCat.length * 42 + 50)}>
                    {deptCat.length > 0 && reqCats.length > 0 ? (
                      <BarChart layout="vertical" data={deptCat} margin={{ left: 10, right: 20 }}>
                        <CartesianGrid {...darkGrid} horizontal={false} /><XAxis type="number" {...darkAxis} allowDecimals={false} /><YAxis type="category" dataKey="department" {...darkAxis} width={135} />
                        <Tooltip content={<Tip />} /><Legend iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                        {reqCats.map((cat, i) => (<Bar key={cat} dataKey={cat} stackId="c" fill={PALETTE[i % PALETTE.length]} radius={i === reqCats.length - 1 ? [0, 6, 6, 0] : undefined} style={{ filter: `drop-shadow(0 0 3px ${PALETTE[i % PALETTE.length]}30)` }} />))}
                      </BarChart>
                    ) : <Empty />}
                  </ResponsiveContainer>
                </GlassCard>
                <div className="grid lg:grid-cols-2 gap-6">
                  <GlassCard title="Top Requisition Categories — Last 3 Months" sub="Which category generated the most letters">
                    <ResponsiveContainer width="100%" height={360}>
                      {catPie.length > 0 ? (
                        <PieChart>
                          <Pie data={catPie} cx="50%" cy="50%" innerRadius={65} outerRadius={125} paddingAngle={2} dataKey="value" label={({ name, percent }) => percent > 0.04 ? `${name} ${(percent * 100).toFixed(0)}%` : ""} labelLine={{ stroke: "#374151", strokeWidth: 1 }}>
                            {catPie.map((_, i) => (<Cell key={i} fill={PALETTE[i % PALETTE.length]} strokeWidth={0} style={{ filter: `drop-shadow(0 0 4px ${PALETTE[i % PALETTE.length]}40)` }} />))}
                          </Pie>
                          <Tooltip formatter={(v) => [`${v} letters`, "Count"]} contentStyle={pieTipStyle} itemStyle={{ color: "#fff" }} labelStyle={{ color: "#fff" }} />
                        </PieChart>
                      ) : <Empty />}
                    </ResponsiveContainer>
                  </GlassCard>
                  <GlassCard title="Requisition Status Overview" sub="Current status distribution of all IT requisitions">
                    <ResponsiveContainer width="100%" height={360}>
                      {reqStatusPie.length > 0 ? (
                        <PieChart>
                          <Pie data={reqStatusPie} cx="50%" cy="50%" innerRadius={70} outerRadius={125} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={{ stroke: "#374151", strokeWidth: 1 }}>
                            {reqStatusPie.map(e => (<Cell key={e.name} fill={STATUS_COLORS[e.name]} strokeWidth={0} style={{ filter: `drop-shadow(0 0 4px ${STATUS_COLORS[e.name]}40)` }} />))}
                          </Pie>
                          <Tooltip formatter={(v) => [`${v} requisitions`, "Count"]} contentStyle={pieTipStyle} itemStyle={{ color: "#fff" }} labelStyle={{ color: "#fff" }} />
                        </PieChart>
                      ) : <Empty />}
                    </ResponsiveContainer>
                  </GlassCard>
                </div>
              </section>
            </FadeIn>

            {/* ═══ SECTION 3 — ESTIMATE ANALYSIS ═══ */}
            <FadeIn delay={400}>
              <section>
                <NeonSectionHead neon={NEON.rose} title="Nabanna Estimate Analysis" sub="Monthly cost & amount breakdown by department — Last 6 Months" icon={<svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
                <GlassCard title="Monthly Estimate Cost by Department" sub="Stacked cost distribution across 6 months" className="mb-6">
                  <ResponsiveContainer width="100%" height={370}>
                    {hasEstMonthly ? (
                      <BarChart data={estMonthly.chartData} barCategoryGap="18%">
                        <CartesianGrid {...darkGrid} vertical={false} /><XAxis dataKey="month" {...darkAxis} /><YAxis {...darkAxis} tickFormatter={(v) => fmtINR(v)} width={75} />
                        <Tooltip content={<Tip formatter={(v) => fmtINR(v)} />} />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: 10 }} formatter={(v) => <span className="text-gray-500">{v.length > 18 ? v.slice(0, 18) + "…" : v}</span>} />
                        {estMonthly.departments.map((dep, i) => (<Bar key={dep} dataKey={dep} stackId="est" fill={PALETTE[i % PALETTE.length]} radius={i === estMonthly.departments.length - 1 ? [6, 6, 0, 0] : undefined} style={{ filter: `drop-shadow(0 0 3px ${PALETTE[i % PALETTE.length]}30)` }} />))}
                      </BarChart>
                    ) : <Empty msg="No estimate data found for the last 6 months" />}
                  </ResponsiveContainer>
                </GlassCard>
                <div className="grid lg:grid-cols-5 gap-6">
                  <GlassCard title="Monthly Estimate Trend" sub="Cost & amount movement over 6 months" className="lg:col-span-3">
                    <ResponsiveContainer width="100%" height={320}>
                      {hasEstTrend ? (
                        <LineChart data={estTrend}>
                          <CartesianGrid {...darkGrid} /><XAxis dataKey="month" {...darkAxis} /><YAxis {...darkAxis} tickFormatter={(v) => fmtINR(v)} width={75} />
                          <Tooltip content={<Tip formatter={(v) => fmtINR(v)} />} /><Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                          <Line type="monotone" dataKey="cost" stroke="#FB7185" strokeWidth={2.5} dot={{ r: 4, fill: "#0a0a1a", stroke: "#FB7185", strokeWidth: 2 }} activeDot={{ r: 6, fill: "#FB7185", stroke: "#0a0a1a", strokeWidth: 2 }} style={{ filter: "drop-shadow(0 0 4px rgba(251,113,133,0.3))" }} />
                          <Line type="monotone" dataKey="amount" stroke="#A78BFA" strokeWidth={2.5} strokeDasharray="6 3" dot={{ r: 4, fill: "#0a0a1a", stroke: "#A78BFA", strokeWidth: 2 }} activeDot={{ r: 6, fill: "#A78BFA", stroke: "#0a0a1a", strokeWidth: 2 }} style={{ filter: "drop-shadow(0 0 4px rgba(167,139,250,0.3))" }} />
                        </LineChart>
                      ) : <Empty />}
                    </ResponsiveContainer>
                  </GlassCard>
                  <GlassCard title="Department Cost Share" sub="Overall estimate cost distribution" className="lg:col-span-2">
                    <ResponsiveContainer width="100%" height={320}>
                      {estDonut.length > 0 ? (
                        <PieChart>
                          <Pie data={estDonut} cx="50%" cy="50%" innerRadius={58} outerRadius={110} paddingAngle={2} dataKey="value" label={({ name, percent }) => percent > 0.05 ? `${name.slice(0, 15)} ${(percent * 100).toFixed(0)}%` : ""} labelLine={{ stroke: "#374151", strokeWidth: 1 }}>
                            {estDonut.map((_, i) => (<Cell key={i} fill={PALETTE[i % PALETTE.length]} strokeWidth={0} style={{ filter: `drop-shadow(0 0 4px ${PALETTE[i % PALETTE.length]}40)` }} />))}
                          </Pie>
                          <Tooltip formatter={(v) => [fmtINR(v), "Cost"]} contentStyle={pieTipStyle} itemStyle={{ color: "#fff" }} labelStyle={{ color: "#fff" }} />
                        </PieChart>
                      ) : <Empty />}
                    </ResponsiveContainer>
                  </GlassCard>
                </div>
              </section>
            </FadeIn>

            {/* ═══ SECTION 4 — INCOMING MATERIAL ANALYSIS ═══ */}
            <FadeIn delay={500}>
              <section className="pb-16">
                <NeonSectionHead neon={NEON.teal} title="Incoming Material Analysis" sub="Vendor-wise item inflow — Last 6 Months" icon={<svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>} />
                <GlassCard title="Which Vendor Sent Most Items Each Month" sub="Item count per vendor, monthly breakdown" className="mb-6">
                  <ResponsiveContainer width="100%" height={370}>
                    {hasVendorMonthly ? (
                      <BarChart data={vendorMonthly.chartData} barCategoryGap="18%">
                        <CartesianGrid {...darkGrid} vertical={false} /><XAxis dataKey="month" {...darkAxis} /><YAxis {...darkAxis} allowDecimals={false} />
                        <Tooltip content={<Tip />} contentStyle={pieTipStyle} itemStyle={{ color: "#fff" }} labelStyle={{ color: "#fff" }} />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: 10 }} formatter={(v) => <span className="text-gray-500">{v}</span>} />
                        {vendorMonthly.vendors.map((v, i) => (<Bar key={v} dataKey={v} stackId="vm" fill={VENDOR_COLORS[v] || PALETTE[i % PALETTE.length]} radius={i === vendorMonthly.vendors.length - 1 ? [6, 6, 0, 0] : undefined} style={{ filter: `drop-shadow(0 0 3px ${VENDOR_COLORS[v] || PALETTE[i % PALETTE.length]}30)` }} />))}
                      </BarChart>
                    ) : <Empty msg="No incoming material data found for the last 6 months" />}
                  </ResponsiveContainer>
                </GlassCard>
                <div className="grid lg:grid-cols-2 gap-6">
                  <GlassCard title="% of Vendor Items Sent" sub="Overall vendor share by item count — Last 6 Months">
                    <ResponsiveContainer width="100%" height={370}>
                      {vendorPie.length > 0 ? (
                        <PieChart>
                          <Pie data={vendorPie} cx="50%" cy="50%" innerRadius={62} outerRadius={120} paddingAngle={2} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`} labelLine={{ stroke: "#374151", strokeWidth: 1 }}>
                            {vendorPie.map(e => (<Cell key={e.name} fill={VENDOR_COLORS[e.name] || "#6B7280"} strokeWidth={0} style={{ filter: `drop-shadow(0 0 4px ${VENDOR_COLORS[e.name] || "#6B7280"}40)` }} />))}
                          </Pie>
                          <Tooltip formatter={(v, name) => [`${v} items (${((v / vendorPie.reduce((s, d) => s + d.value, 0)) * 100).toFixed(1)}%)`, name]} contentStyle={pieTipStyle} itemStyle={{ color: "#fff" }} labelStyle={{ color: "#fff" }} />
                        </PieChart>
                      ) : <Empty />}
                    </ResponsiveContainer>
                  </GlassCard>
                  <GlassCard title="IT Item Type Breakdown" sub="Desktop · All-In-One · Laptop · Printer">
                    <ResponsiveContainer width="100%" height={370}>
                      {itemPie.length > 0 ? (
                        <PieChart>
                          <Pie data={itemPie} cx="50%" cy="50%" innerRadius={62} outerRadius={120} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`} labelLine={{ stroke: "#374151", strokeWidth: 1 }}>
                            {itemPie.map(e => (<Cell key={e.name} fill={ITEM_COLORS[e.name] || "#6B7280"} strokeWidth={0} style={{ filter: `drop-shadow(0 0 4px ${ITEM_COLORS[e.name] || "#6B7280"}40)` }} />))}
                          </Pie>
                          <Tooltip formatter={(v, name) => [`${v} items`, name]} contentStyle={pieTipStyle} itemStyle={{ color: "#fff" }} labelStyle={{ color: "#fff" }} />
                          <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                        </PieChart>
                      ) : <Empty msg="No mapped IT items found (Desktop, All-In-One, Laptop, Printer)" />}
                    </ResponsiveContainer>
                  </GlassCard>
                </div>
              </section>
            </FadeIn>

            {/* FOOTER */}
            <FadeIn delay={600}>
              <footer className="border-t border-white/[0.04] pt-6 pb-10 flex items-center justify-between">
                <p className="text-[11px] text-gray-600">PWD IT Cell · Nabanna</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px rgba(52,211,153,0.6)", animation: "pulseNeon 2s ease-in-out infinite" }} />
                  <span className="text-[11px] text-gray-500">Live</span>
                </div>
              </footer>
            </FadeIn>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashBoardNew;