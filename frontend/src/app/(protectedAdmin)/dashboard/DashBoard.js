"use client";
import { useState, useEffect, useMemo } from "react";
import { useAxios } from "@/app/Hook/useAxios";
import { handleAxiosError } from "@/app/utils/axiosError";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/* ═══════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════ */

const DOMAINS = ["Internet", "Voice", "PC_Hardware", "Cable_TV"];

const DEPARTMENTS = [
  "PWD",
  "Disaster Management",
  "DGP Cell",
  "Agriculture",
  "MA & ME",
  "HOME",
  "L & LR",
  "PAR",
  "I & CA",
  "Finance",
  "13th Floor VVIP",
  "13th Floor CMO",
  "14th Floor CMO",
  "1st Floor Service",
  "KP Police Control/SB",
];

const STATUSES = ["Pending", "In Progress", "Complete"];

const DOMAIN_COLORS = {
  Internet: "#3B82F6",
  Voice: "#10B981",
  PC_Hardware: "#F59E0B",
  "Cable_TV": "#EF4444",
};

const STATUS_COLORS = {
  Pending: "#F59E0B",
  "In Progress": "#6366F1",
  Complete: "#10B981",
};

const PALETTE = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
  "#F97316",
  "#6366F1",
  "#14B8A6",
  "#E11D48",
  "#A855F7",
  "#0EA5E9",
];

/* ── Incoming Material Constants ── */

const VENDOR_NAMES = [
  "Writers Building(IT)",
  "Pascal Computer",
  "Consulting Technologies",
  "Compunet System",
  "Prakash Electricals",
  "Aircon",
  "Iris System",
  "Embee",
];

const ITEM_NAMES = ["Desktop", "All-In-One", "Laptop", "Printer"];

const VENDOR_COLORS = {
  "Writers Building(IT)": "#2563EB",
  "Pascal Computer": "#059669",
  "Consulting Technologies": "#D97706",
  "Compunet System": "#DC2626",
  "Prakash Electricals": "#7C3AED",
  "Aircon": "#DB2777",
  "Iris System": "#0891B2",
  "Embee": "#65A30D",
  "Others": "#9CA3AF",
};

const ITEM_COLORS = {
  Desktop: "#3B82F6",
  "All-In-One": "#10B981",
  Laptop: "#F59E0B",
  Printer: "#EF4444",
};

/* ═══════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════ */

const safe = (v) => (Array.isArray(v) ? v : []);

const parseDate = (raw) => {
  if (!raw) return null;
  const s = String(raw);
  if (/^\d{1,2}\/\d{1,2}\/\d{4}/.test(s)) {
    const [d, m, y] = s.split("/");
    return new Date(+y, m - 1, +d);
  }
  const dt = new Date(s);
  return isNaN(dt.getTime()) ? null : dt;
};

const monthKey = (raw) => {
  const d = parseDate(raw);
  if (!d) return null;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

const lastNMonths = (n) => {
  const out = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    out.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleString("en-US", { month: "short", year: "2-digit" }),
    });
  }
  return out;
};

const withinMonths = (raw, n) => {
  const d = parseDate(raw);
  if (!d) return false;
  const now = new Date();
  const cutoff = new Date(now.getFullYear(), now.getMonth() - n, 1);
  return d >= cutoff;
};

const parseCost = (v) => {
  if (typeof v === "number") return v;
  if (!v) return 0;
  return parseFloat(String(v).replace(/[^\d.-]/g, "")) || 0;
};

const fmtINR = (n) => {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
};

/* ── Vendor / Item Mapping ── */

const mapVendor = (sender) => {
  if (!sender) return "Others";
  const s = String(sender).trim().toLowerCase();
  for (const v of VENDOR_NAMES) {
    const vLower = v.toLowerCase();
    const core = vLower.replace(/\(.*\)/, "").trim();
    if (s === vLower || s.includes(core) || core.includes(s)) return v;
  }
  return "Others";
};

const mapItem = (item) => {
  if (!item) return null;
  const s = String(item).trim().toLowerCase();
  if (s.includes("desktop")) return "Desktop";
  if (s.includes("all-in-one") || s.includes("all in one") || s.includes("aio")) return "All-In-One";
  if (s.includes("laptop") || s.includes("notebook")) return "Laptop";
  if (s.includes("printer")) return "Printer";
  return null;
};

/* ═══════════════════════════════════════════════════════════
   REUSABLE CHART SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════ */

const Tip = ({ active, payload, label, formatter }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 px-4 py-3 text-sm">
      <p className="font-semibold text-gray-800 mb-1.5">{label}</p>
      {payload.map((e, i) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: e.color }}
          />
          <span className="text-gray-500">{e.name}:</span>
          <span className="font-semibold text-gray-900">
            {formatter ? formatter(e.value, e.name) : e.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const Empty = ({ msg = "No data available for this period" }) => (
  <div className="flex items-center justify-center h-full min-h-[200px] text-gray-400 text-sm select-none">
    <div className="text-center">
      <svg className="w-10 h-10 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
      {msg}
    </div>
  </div>
);

const Card = ({ title, sub, children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-gray-100/80 p-5 md:p-6 ${className}`}>
    {title && (
      <div className="mb-5">
        <h3 className="text-[15px] font-semibold text-gray-800 leading-tight">{title}</h3>
        {sub && <p className="text-[11px] text-gray-400 mt-1 tracking-wide">{sub}</p>}
      </div>
    )}
    <div className="font-['Inter',sans-serif]">{children}</div>
  </div>
);

const SectionHead = ({ color, title, sub }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className={`w-1.5 h-8 ${color} rounded-full`} />
    <div>
      <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      {sub && <p className="text-[11px] text-gray-400 mt-0.5 tracking-wide">{sub}</p>}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   MAIN DASHBOARD
   ═══════════════════════════════════════════════════════════ */

const DashBoard = () => {
  const axios = useAxios();

  const [complains, setComplains] = useState([]);
  const [requisitions, setRequisitions] = useState([]);
  const [estimates, setEstimates] = useState([]);
  const [incoming, setIncoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ── Fetch ── */
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const [c, r, e, inc] = await Promise.all([
          axios.get("/complain/getAll"),
          axios.get("/ItReq/allITData"),
          axios.get("/estimateReg"),
          axios.get("/itemNabanna/showincoming"),
        ]);
        setComplains(safe(c.data?.data));
        setRequisitions(safe(r.data?.data));
        setEstimates(safe(e.data?.data ?? e.data));
        setIncoming(safe(inc.data?.data ?? inc.data));
      } catch (err) {
        const { generalError } = handleAxiosError(err);
        setError(generalError || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [axios]);

  /* ── KPIs ── */
  const kpi = useMemo(() => {
    const total = complains.length;
    const resolved = complains.filter((d) => d.status === "Complete").length;
    const pending = complains.filter((d) => d.status === "Pending").length;
    const inProg = complains.filter((d) => d.status === "In Progress").length;
    const reqCount = requisitions.length;
    const totalCost = estimates.reduce((s, d) => s + parseCost(d.cost), 0);
    const totalItems = incoming.reduce((s, d) => s + safe(d.itItems).length, 0);
    return { total, resolved, pending, inProg, reqCount, totalCost, totalItems };
  }, [complains, requisitions, estimates, incoming]);

  /* ────────────────────────────────────────────
     SECTION 1  —  COMPLAIN ANALYSIS
     ──────────────────────────────────────────── */

  const trendData = useMemo(() => {
    const months = lastNMonths(6);
    return months.map((m) => {
      const rows = complains.filter((d) => monthKey(d.date) === m.key);
      const obj = { month: m.label };
      DOMAINS.forEach((dom) => (obj[dom] = rows.filter((r) => r.domain === dom).length));
      return obj;
    });
  }, [complains]);

  const deptDomain = useMemo(() => {
    const src = complains.filter((d) => withinMonths(d.date, 3));
    const arr = DEPARTMENTS.map((dept) => {
      const rows = src.filter((r) => r.department === dept.toLowerCase());
      const obj = { department: dept };
      DOMAINS.forEach((dom) => {
        obj[dom] = rows.filter((r) => r.domain === dom).length;
      });
      obj._t = DOMAINS.reduce((s, dom) => s + obj[dom], 0);
      return obj;
    });
    return arr.filter((r) => r._t > 0).sort((a, b) => b._t - a._t);
  }, [complains]);

  const domainStatus = useMemo(() => {
    return DOMAINS.map((dom) => {
      const rows = complains.filter((r) => r.domain === dom);
      const obj = { domain: dom };
      STATUSES.forEach((st) => (obj[st] = rows.filter((r) => r.status === st).length));
      return obj;
    });
  }, [complains]);

  /* ────────────────────────────────────────────
     SECTION 2  —  REQUISITION ANALYSIS
     ──────────────────────────────────────────── */

  const reqCats = useMemo(() => {
    const s = new Set();
    requisitions.filter((d) => withinMonths(d.date, 6)).forEach((d) => {
      if (Array.isArray(d.lcategory)) d.lcategory.forEach((c) => s.add(c));
    });
    return Array.from(s).sort();
  }, [requisitions]);

  const deptCat = useMemo(() => {
    const src = requisitions.filter((d) => withinMonths(d.date, 6));
    const arr = DEPARTMENTS.map((dept) => {
      const rows = src.filter((r) => r.department === dept.toLowerCase());
      const obj = { department: dept };
      reqCats.forEach((c) => (obj[c] = rows.filter((r) => Array.isArray(r.lcategory) && r.lcategory.includes(c)).length));
      obj._t = reqCats.reduce((s, c) => s + obj[c], 0);
      return obj;
    });
    return arr.filter((r) => r._t > 0).sort((a, b) => b._t - a._t);
  }, [requisitions, reqCats]);

  const catPie = useMemo(() => {
    const src = requisitions.filter((d) => withinMonths(d.date, 3));
    const map = {};
    src.forEach((d) => {
      if (Array.isArray(d.lcategory)) d.lcategory.forEach((c) => (map[c] = (map[c] || 0) + 1));
    });
    const sorted = Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
    if (sorted.length > 8) {
      const top = sorted.slice(0, 7);
      const rest = sorted.slice(7).reduce((s, i) => s + i.value, 0);
      if (rest > 0) top.push({ name: "Others", value: rest });
      return top;
    }
    return sorted;
  }, [requisitions]);

  const reqStatusPie = useMemo(() => {
    return STATUSES.map((s) => ({ name: s, value: requisitions.filter((d) => d.status === s).length })).filter(
      (d) => d.value > 0
    );
  }, [requisitions]);

  /* ────────────────────────────────────────────
     SECTION 3  —  ESTIMATE ANALYSIS  (REDESIGNED)
     ──────────────────────────────────────────── */

  // 3a  Monthly cost by department — vertical stacked bar (12th months)
  const estMonthly = useMemo(() => {
    const months = lastNMonths(12); // last 12 month

    // Compute total cost per department (across all time for ranking)
    const deptTotals = {};
    estimates.forEach((d) => {
      if (!d.department) return;
      deptTotals[d.department] = (deptTotals[d.department] || 0) + parseCost(d.cost);
    });

    const sorted = Object.entries(deptTotals).sort((a, b) => b[1] - a[1]);
    const topDepts = sorted.slice(0, 8).map(([d]) => d);
    const restDepts = sorted.slice(8).map(([d]) => d);
    const hasOthers = restDepts.length > 0;

    const departments = hasOthers ? [...topDepts, "Others"] : topDepts;

    const chartData = months.map((m) => {
      const rows = estimates.filter((d) => monthKey(d.date) === m.key);
      const obj = { month: m.label };

      topDepts.forEach((dept) => {
        const deptRows = rows.filter((r) => r.department === dept);
        obj[dept] = Math.round(deptRows.reduce((s, r) => s + parseCost(r.cost), 0));
      });

      if (hasOthers) {
        obj["Others"] = Math.round(
          rows.filter((r) => restDepts.includes(r.department)).reduce((s, r) => s + parseCost(r.cost), 0)
        );
      }
      return obj;
    });

    return { departments, chartData };
  }, [estimates]);

  // 3b  Estimate donut — department cost share
  const estDonut = useMemo(() => {
    const map = {};
    estimates.forEach((d) => {
      if (!d.department) return;
      map[d.department] = (map[d.department] || 0) + parseCost(d.cost);
    });
    const sorted = Object.entries(map)
      .map(([name, value]) => ({ name, value: Math.round(value) }))
      .sort((a, b) => b.value - a.value);
    if (sorted.length > 8) {
      const top = sorted.slice(0, 7);
      const rest = sorted.slice(7).reduce((s, i) => s + i.value, 0);
      if (rest > 0) top.push({ name: "Others", value: rest });
      return top;
    }
    return sorted;
  }, [estimates]);

  // 3c  Monthly total estimate cost trend line
  const estTrend = useMemo(() => {
    const months = lastNMonths(12); // last 12 month //
    return months.map((m) => {
      const rows = estimates.filter((d) => monthKey(d.date) === m.key);
      const totalCost = Math.round(rows.reduce((s, r) => s + parseCost(r.cost), 0));
      const totalAmount = Math.round(rows.reduce((s, r) => s + parseCost(r.amount), 0));
      const count = rows.length;
      return { month: m.label, cost: totalCost, amount: totalAmount, count };
    });
  }, [estimates]);

  /* ────────────────────────────────────────────
     SECTION 4  —  INCOMING MATERIAL ANALYSIS
     ──────────────────────────────────────────── */

  // 4a  Vendor × Month — which vendor sent most items each month
  const vendorMonthly = useMemo(() => {
    const months = lastNMonths(6);
    const src = incoming.filter((d) => withinMonths(d.date, 6));

    // Count total items per vendor to determine active ones
    const vendorTotals = {};
    src.forEach((d) => {
      const v = mapVendor(d.sender);
      const count = safe(d.itItems).length;
      vendorTotals[v] = (vendorTotals[v] || 0) + count;
    });

    // Sort vendors by total count, "Others" always last
    const sorted = Object.entries(vendorTotals)
      .filter(([, count]) => count > 0)
      .sort((a, b) => b[1] - a[1]);

    let activeVendors = sorted.map(([v]) => v);
    const othersIdx = activeVendors.indexOf("Others");
    if (othersIdx > -1) {
      activeVendors.splice(othersIdx, 1);
      activeVendors.push("Others");
    }

    const chartData = months.map((m) => {
      const rows = src.filter((d) => monthKey(d.date) === m.key);
      const obj = { month: m.label };
      activeVendors.forEach((v) => {
        obj[v] = rows
          .filter((r) => mapVendor(r.sender) === v)
          .reduce((s, r) => s + safe(r.itItems).length, 0);
      });
      return obj;
    });

    return { vendors: activeVendors, chartData };
  }, [incoming]);

  // 4b  Vendor item share — percentage donut
  const vendorPie = useMemo(() => {
    const src = incoming.filter((d) => withinMonths(d.date, 6));
    const map = {};
    src.forEach((d) => {
      const v = mapVendor(d.sender);
      map[v] = (map[v] || 0) + safe(d.itItems).length;
    });

    let sorted = Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Move "Others" to end
    const oIdx = sorted.findIndex((d) => d.name === "Others");
    if (oIdx > -1 && oIdx < sorted.length - 1) {
      const [others] = sorted.splice(oIdx, 1);
      sorted.push(others);
    }

    return sorted;
  }, [incoming]);

  // 4b-extra  IT Item type breakdown donut
  const itemPie = useMemo(() => {
    const src = incoming.filter((d) => withinMonths(d.date, 6));
    const map = {};
    src.forEach((d) => {
      safe(d.itItems).forEach((item) => {
        const mapped = mapItem(item?.item);
        if (mapped) map[mapped] = (map[mapped] || 0) + 1;
      });
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [incoming]);

  /* ═══════════════════════════════════════════════════════════
     LOADING / ERROR SCREENS
     ═══════════════════════════════════════════════════════════ */

  if (loading) {
    return (
      <div className="w-full bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-11 h-11 border-[3px] border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-gray-400 text-sm font-medium">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center">
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-base font-semibold text-gray-800 mb-1">Error Loading Data</h2>
          <p className="text-gray-400 text-sm mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════
     RENDER HELPERS
     ═══════════════════════════════════════════════════════════ */

  const hasTrend = trendData.some((d) => DOMAINS.some((dom) => d[dom] > 0));
  const hasDomSt = domainStatus.some((d) => STATUSES.some((s) => d[s] > 0));
  const hasEstMonthly = estMonthly.chartData.some((d) => estMonthly.departments.some((dep) => d[dep] > 0));
  const hasEstTrend = estTrend.some((d) => d.cost > 0);
  const hasVendorMonthly = vendorMonthly.chartData.some((d) => vendorMonthly.vendors.some((v) => d[v] > 0));

  /* ═══════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════ */

  return (
    <div className="w-full h-fit bg-[#f5f6fa]">
      {/* ── HEADER ── */}
      <header className="bg-gradient-to-br from-[#1e1b4b] via-indigo-800 to-purple-800 text-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full" />
        <div className="max-w-[1480px] mx-auto px-6 md:px-10 py-8 md:py-10 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
              <svg className="w-6 h-6 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">PWD IT Dashboard</h1>
              <p className="text-indigo-300 text-sm mt-0.5">Nabanna — Analytical Overview</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1480px] mx-auto px-6 md:px-10 py-8 space-y-10">
        {/* ── KPI CARDS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {[
            { label: "Total Complaints", val: kpi.total, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
            { label: "Resolved", val: kpi.resolved, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
            { label: "In Progress", val: kpi.inProg, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100" },
            { label: "Pending", val: kpi.pending, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
            { label: "Requisitions", val: kpi.reqCount, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
            { label: "Estimate Cost", val: fmtINR(kpi.totalCost), color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100" },
          ].map((c, i) => (
            <div key={i} className={`${c.bg} ${c.border} border rounded-2xl p-5 transition-shadow hover:shadow-md`}>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">{c.label}</p>
              <p className={`text-xl md:text-2xl font-bold ${c.color} leading-tight`}>{c.val}</p>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════
            SECTION 1 — COMPLAIN ANALYSIS
            ══════════════════════════════════════════ */}
        <section>
          <SectionHead color="bg-indigo-600" title="Nabanna User Complain Analysis" sub="Trends · Department breakdown · Resolution status" />

          <div className="grid lg:grid-cols-5 gap-6 mb-6">
            <Card title="Complain Trend — Last 6 Months" sub="Monthly volume by domain type" className="lg:col-span-3">
              <ResponsiveContainer width="100%" height={330}>
                {hasTrend ? (
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f3" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} allowDecimals={false} axisLine={false} tickLine={false} />
                    <Tooltip content={<Tip />} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                    {DOMAINS.map((dom) => (
                      <Line
                        key={dom}
                        type="monotone"
                        dataKey={dom}
                        stroke={DOMAIN_COLORS[dom]}
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: "#fff", stroke: DOMAIN_COLORS[dom], strokeWidth: 2 }}
                        activeDot={{ r: 6, fill: DOMAIN_COLORS[dom], stroke: "#fff", strokeWidth: 2 }}
                      />
                    ))}
                  </LineChart>
                ) : (
                  <Empty />
                )}
              </ResponsiveContainer>
            </Card>

            <Card title="Domain vs Resolution Status" sub="Pending · In-Progress · Complete" className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={330}>
                {hasDomSt ? (
                  <BarChart data={domainStatus} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f3" vertical={false} />
                    <XAxis dataKey="domain" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} allowDecimals={false} axisLine={false} tickLine={false} />
                    <Tooltip content={<Tip />} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                    {STATUSES.map((st, i) => (
                      <Bar
                        key={st}
                        dataKey={st}
                        stackId="s"
                        fill={STATUS_COLORS[st]}
                        radius={i === STATUSES.length - 1 ? [6, 6, 0, 0] : undefined}
                      />
                    ))}
                  </BarChart>
                ) : (
                  <Empty />
                )}
              </ResponsiveContainer>
            </Card>
          </div>

          <Card title="Department vs Complain Domain — Last 3 Months" sub="Which department raised which type of complain the most">
            <ResponsiveContainer width="100%" height={Math.max(280, deptDomain.length * 42 + 50)}>
              {deptDomain.length > 0 ? (
                <BarChart layout="vertical" data={deptDomain} margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f3" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 12, fill: "#9ca3af" }} allowDecimals={false} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="department" tick={{ fontSize: 11, fill: "#374151" }} width={135} axisLine={false} tickLine={false} />
                  <Tooltip content={<Tip />} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                  {DOMAINS.map((dom, i) => (
                    <Bar key={dom} dataKey={dom} stackId="d" fill={DOMAIN_COLORS[dom]} radius={i === DOMAINS.length - 1 ? [0, 6, 6, 0] : undefined} />
                  ))}
                </BarChart>
              ) : (
                <Empty />
              )}
            </ResponsiveContainer>
          </Card>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 2 — REQUISITION ANALYSIS
            ══════════════════════════════════════════ */}
        <section>
          <SectionHead color="bg-purple-600" title="Nabanna User Requisition Analysis" sub="IT letter trends by department & category" />

          <Card title="Department vs Requisition Category — Last 6 Months" sub="Letters generated per department per category" className="mb-6">
            <ResponsiveContainer width="100%" height={Math.max(280, deptCat.length * 42 + 50)}>
              {deptCat.length > 0 && reqCats.length > 0 ? (
                <BarChart layout="vertical" data={deptCat} margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f3" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 12, fill: "#9ca3af" }} allowDecimals={false} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="department" tick={{ fontSize: 11, fill: "#374151" }} width={135} axisLine={false} tickLine={false} />
                  <Tooltip content={<Tip />} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                  {reqCats.map((cat, i) => (
                    <Bar key={cat} dataKey={cat} stackId="c" fill={PALETTE[i % PALETTE.length]} radius={i === reqCats.length - 1 ? [0, 6, 6, 0] : undefined} />
                  ))}
                </BarChart>
              ) : (
                <Empty />
              )}
            </ResponsiveContainer>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card title="Top Requisition Categories — Last 3 Months" sub="Which category generated the most letters">
              <ResponsiveContainer width="100%" height={360}>
                {catPie.length > 0 ? (
                  <PieChart>
                    <Pie
                      data={catPie}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={125}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => percent > 0.04 ? `${name} ${(percent * 100).toFixed(0)}%` : ""}
                      labelLine={{ stroke: "#d1d5db", strokeWidth: 1 }}
                    >
                      {catPie.map((_, i) => (
                        <Cell key={i} fill={PALETTE[i % PALETTE.length]} strokeWidth={0} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v) => [`${v} letters`, "Count"]}
                      contentStyle={{ borderRadius: "12px", border: "1px solid #f3f4f6", fontSize: "13px", boxShadow: "0 10px 25px rgba(0,0,0,.08)" }}
                    />
                  </PieChart>
                ) : (
                  <Empty />
                )}
              </ResponsiveContainer>
            </Card>

            <Card title="Requisition Status Overview" sub="Current status distribution of all IT requisitions">
              <ResponsiveContainer width="100%" height={360}>
                {reqStatusPie.length > 0 ? (
                  <PieChart>
                    <Pie
                      data={reqStatusPie}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={125}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={{ stroke: "#d1d5db", strokeWidth: 1 }}
                    >
                      {reqStatusPie.map((e) => (
                        <Cell key={e.name} fill={STATUS_COLORS[e.name]} strokeWidth={0} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v) => [`${v} requisitions`, "Count"]}
                      contentStyle={{ borderRadius: "12px", border: "1px solid #f3f4f6", fontSize: "13px", boxShadow: "0 10px 25px rgba(0,0,0,.08)" }}
                    />
                  </PieChart>
                ) : (
                  <Empty />
                )}
              </ResponsiveContainer>
            </Card>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 3 — ESTIMATE ANALYSIS  (REDESIGNED)
            ══════════════════════════════════════════ */}
        <section>
          <SectionHead color="bg-rose-500" title="Nabanna Estimate Analysis" sub="Monthly cost & amount breakdown by department — Last 12 Months" />

          {/* 3a — Vertical Stacked Bar: Monthly cost by department */}
          <Card title="Monthly Estimate Cost sent to Department" sub="Stacked cost distribution across 12 months" className="mb-6">
            <ResponsiveContainer width="100%" height={370}>
              {hasEstMonthly ? (
                <BarChart data={estMonthly.chartData} barCategoryGap="18%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f3" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickFormatter={(v) => fmtINR(v)} axisLine={false} tickLine={false} width={75} />
                  <Tooltip content={<Tip formatter={(v) => fmtINR(v)} />} />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{ fontSize: 10, paddingTop: 10 }}
                    formatter={(value) => <span style={{ color: "#6b7280" }}>{value.length > 18 ? value.slice(0, 18) + "…" : value}</span>}
                  />
                  {estMonthly.departments.map((dep, i) => (
                    <Bar
                      key={dep}
                      dataKey={dep}
                      stackId="est"
                      fill={PALETTE[i % PALETTE.length]}
                      radius={i === estMonthly.departments.length - 1 ? [6, 6, 0, 0] : undefined}
                    />
                  ))}
                </BarChart>
              ) : (
                <Empty msg="No estimate data found for the last 12 months" />
              )}
            </ResponsiveContainer>
          </Card>

          {/* 3b Trend Line + 3c Donut */}
          <div className="grid lg:grid-cols-5 gap-6">
            {/* 3b — Cost & Amount Trend Line */}
            <Card title="Monthly Estimate Trend" sub="Cost & amount movement over 12 months" className="lg:col-span-3">
              <ResponsiveContainer width="100%" height={320}>
                {hasEstTrend ? (
                  <LineChart data={estTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f3" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickFormatter={(v) => fmtINR(v)} axisLine={false} tickLine={false} width={75} />
                    <Tooltip content={<Tip formatter={(v) => fmtINR(v)} />} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                    <Line
                      type="monotone"
                      dataKey="cost"
                      stroke="#E11D48"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: "#fff", stroke: "#E11D48", strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: "#E11D48", stroke: "#fff", strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#7C3AED"
                      strokeWidth={2.5}
                      strokeDasharray="6 3"
                      dot={{ r: 4, fill: "#fff", stroke: "#7C3AED", strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: "#7C3AED", stroke: "#fff", strokeWidth: 2 }}
                    />
                  </LineChart>
                ) : (
                  <Empty />
                )}
              </ResponsiveContainer>
            </Card>

            {/* 3c — Department Cost Share Donut */}
            <Card title="Departmental Estimate Cost Share" sub="Overall estimate cost distribution" className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={320}>
                {estDonut.length > 0 ? (
                  <PieChart>
                    <Pie
                      data={estDonut}
                      cx="50%"
                      cy="50%"
                      innerRadius={58}
                      outerRadius={110}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => percent > 0.05 ? `${name.slice(0, 15)} ${(percent * 100).toFixed(0)}%` : ""}
                      labelLine={{ stroke: "#d1d5db", strokeWidth: 1 }}
                    >
                      {estDonut.map((_, i) => (
                        <Cell key={i} fill={PALETTE[i % PALETTE.length]} strokeWidth={0} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v) => [fmtINR(v), "Cost"]}
                      contentStyle={{ borderRadius: "12px", border: "1px solid #f3f4f6", fontSize: "13px", boxShadow: "0 10px 25px rgba(0,0,0,.08)" }}
                    />
                  </PieChart>
                ) : (
                  <Empty />
                )}
              </ResponsiveContainer>
            </Card>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 4 — INCOMING MATERIAL ANALYSIS
            ══════════════════════════════════════════ */}
        <section className="pb-12">
          <SectionHead color="bg-teal-500" title="Nabanna Incoming Material Analysis" sub="agency-wise item inflow — Last 6 Months" />

          {/* 4a — Vendor × Month Stacked Bar */}
          <Card title="Which Agency Sent Most Items Each Month" sub="Item count per agency, monthly breakdown" className="mb-6">
            <ResponsiveContainer width="100%" height={370}>
              {hasVendorMonthly ? (
                <BarChart data={vendorMonthly.chartData} barCategoryGap="18%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f3" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} allowDecimals={false} axisLine={false} tickLine={false} />
                  <Tooltip
                    content={<Tip />}
                    contentStyle={{ borderRadius: "12px", border: "1px solid #f3f4f6", fontSize: "13px", boxShadow: "0 10px 25px rgba(0,0,0,.08)" }}
                    itemStyle={{ padding: "2px 0" }}
                  />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{ fontSize: 10, paddingTop: 10 }}
                    formatter={(value) => <span style={{ color: "#6b7280" }}>{value}</span>}
                  />
                  {vendorMonthly.vendors.map((v, i) => (
                    <Bar
                      key={v}
                      dataKey={v}
                      stackId="vm"
                      fill={VENDOR_COLORS[v] || PALETTE[i % PALETTE.length]}
                      radius={i === vendorMonthly.vendors.length - 1 ? [6, 6, 0, 0] : undefined}
                    />
                  ))}
                </BarChart>
              ) : (
                <Empty msg="No incoming material data found for the last 6 months" />
              )}
            </ResponsiveContainer>
          </Card>

          {/* 4b — Vendor % Donut + Item Type Donut */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* 4b — Vendor Item Share % */}
            <Card title="% of Agency Items Sent" sub="Overall agency share by item count — Last 6 Months">
              <ResponsiveContainer width="100%" height={370}>
                {vendorPie.length > 0 ? (
                  <PieChart>
                    <Pie
                      data={vendorPie}
                      cx="50%"
                      cy="50%"
                      innerRadius={62}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                      labelLine={{ stroke: "#d1d5db", strokeWidth: 1 }}
                    >
                      {vendorPie.map((e) => (
                        <Cell key={e.name} fill={VENDOR_COLORS[e.name] || "#9CA3AF"} strokeWidth={0} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v, name) => [`${v} items (${((v / vendorPie.reduce((s, d) => s + d.value, 0)) * 100).toFixed(1)}%)`, name]}
                      contentStyle={{ borderRadius: "12px", border: "1px solid #f3f4f6", fontSize: "13px", boxShadow: "0 10px 25px rgba(0,0,0,.08)" }}
                    />
                  </PieChart>
                ) : (
                  <Empty />
                )}
              </ResponsiveContainer>
            </Card>

            {/* 4b-extra — IT Item Type Breakdown */}
            <Card title="IT Item Type Breakdown" sub="Desktop · All-In-One · Laptop · Printer">
              <ResponsiveContainer width="100%" height={370}>
                {itemPie.length > 0 ? (
                  <PieChart>
                    <Pie
                      data={itemPie}
                      cx="50%"
                      cy="50%"
                      innerRadius={62}
                      outerRadius={120}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                      labelLine={{ stroke: "#d1d5db", strokeWidth: 1 }}
                    >
                      {itemPie.map((e) => (
                        <Cell key={e.name} fill={ITEM_COLORS[e.name] || "#9CA3AF"} strokeWidth={0} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v, name) => [`${v} items`, name]}
                      contentStyle={{ borderRadius: "12px", border: "1px solid #f3f4f6", fontSize: "13px", boxShadow: "0 10px 25px rgba(0,0,0,.08)" }}
                    />
                    <Legend
                      iconType="circle"
                      wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                    />
                  </PieChart>
                ) : (
                  <Empty msg="No mapped IT items found (Desktop, All-In-One, Laptop, Printer)" />
                )}
              </ResponsiveContainer>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashBoard;