"use client"
import React from "react";
import {
  ShieldCheck,
  LogIn,
  Database,
  Key,
  Lock,
  Cookie,
  LayoutDashboard,
  RefreshCw,
  Route,
  Clock,
  ArrowRightToLine,
  PanelLeft,
  Search,
  UserCheck,
  Timer,
  GitBranch,
  CheckCircle,
  XCircle,
  Fingerprint,
  Plug,
  Share2,
  Send,
  ScanLine,
  ShieldX,
  AlertTriangle,
  Info,
  ArrowDown,
  ScanEye,
  Monitor,
  Server,
  TimerReset,
} from "lucide-react";
import "./Security.css"

const Security = () => {
  return (
    <div className="grid-bg bg-black w-full">
      {/* ═══════════════════ HEADER ═══════════════════ */}
      <div style={{ padding: "36px 60px 0", textAlign: "center", position: "relative" }}>
        <div className="gl" style={{ width: "500px", height: "300px", background: "rgba(16,185,129,0.03)", top: "-80px", left: "30%" }}></div>
        <div className="gl" style={{ width: "400px", height: "250px", background: "rgba(139,92,246,0.025)", top: "-60px", right: "20%" }}></div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg,#10b981,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ShieldCheck style={{ width: "17px", height: "17px", color: "#000" }} />
          </div>
          <span style={{ fontSize: "12px", fontWeight: "600", color: "rgba(255,255,255,0.4)", letterSpacing: ".08em", textTransform: "uppercase" }}>Next.js — Complete Auth Architecture</span>
        </div>

        <h1 style={{ fontSize: "34px", fontWeight: "700", lineHeight: "1.15", marginBottom: "6px" }}>
          Login → Session → Middleware → <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "#a78bfa" }}>Protected Resource</span>
        </h1>
        <p style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.28)", maxWidth: "680px", margin: "0 auto", lineHeight: "1.55" }}>
          End-to-end authentication flow: session creation, JWT token management, middleware interception, server-side validation, and protected API resource access via Axios.
        </p>
      </div>

      {/* ═══════════════════ PHASE 1: LOGIN & SESSION ═══════════════════ */}
      <div style={{ padding: "30px 32px 0", position: "relative" }}>
        <div className="gl" style={{ width: "300px", height: "250px", background: "rgba(16,185,129,0.025)", top: "0", left: "8%" }}></div>
        <div style={{ textAlign: "center", marginBottom: "18px" }}>
          <span className="pb" style={{ background: "rgba(16,185,129,0.08)", color: "#34d399", border: "1px solid rgba(16,185,129,0.15)" }}>
            <LogIn style={{ width: "10px", height: "10px" }} /> Phase 1 — Login &amp; Session Creation
          </span>
        </div>
        <div className="fr p1">
          <div className="sc"><div className="sn">1</div><div className="ic"><LogIn /></div><div className="st">Login</div><div className="sd">User submits email + password</div></div>
          <div className="ah"><div className="l"></div></div>
          <div className="sc"><div className="sn">2</div><div className="ic"><ShieldCheck /></div><div className="st">Verify Password</div><div className="sd">Bcrypt hash comparison</div></div>
          <div className="ah"><div className="l"></div></div>
          <div className="sc" style={{ marginBottom: "8px" }}><div className="sn">3</div><div className="ic"><Database /></div><div className="st">Create DB Session</div><div className="sd">Store session record</div><div className="ct">sid + userInfo + expiry</div></div>
          <div className="ah" style={{ marginTop: "8px" }}><div className="l"></div></div>
          <div className="sc"><div className="sn">4</div><div className="ic"><Key /></div><div className="st">Extract Session ID</div><div className="sd">Pull SID from new session</div></div>
          <div className="ah"><div className="l"></div></div>
          <div className="sc" style={{ marginBottom: "8px" }}><div className="sn">5</div><div className="ic"><Lock /></div><div className="st">Generate JWT</div><div className="sd">Encrypt SID into token</div><div className="ct">JWT( sid ) + expiry</div></div>
          <div className="ah" style={{ marginTop: "8px" }}><div className="l"></div></div>
          <div className="sc"><div className="sn">6</div><div className="ic"><Cookie /></div><div className="st">Set HttpOnly Cookie</div><div className="sd">Secure + same expiry</div></div>
          <div className="ah"><div className="l"></div></div>
          <div className="sc hl-green"><div className="sn" style={{ background: "#059669" }}>7</div><div className="ic" style={{ background: "rgba(16,185,129,0.18)" }}><LayoutDashboard /></div><div className="st">Access Dashboard</div><div className="sd">Protected route reached</div></div>
        </div>
      </div>

      <div className="sconn"><div className="vl" style={{ background: "rgba(255,255,255,0.08)" }}></div><div className="lbl">Every Request</div></div>

      {/* ═══════════════════ PHASE 2: MIDDLEWARE ═══════════════════ */}
      <div style={{ padding: "0 32px", position: "relative" }}>
        <div className="gl" style={{ width: "280px", height: "220px", background: "rgba(6,182,212,0.025)", top: "0", right: "12%" }}></div>
        <div style={{ textAlign: "center", marginBottom: "18px" }}>
          <span className="pb" style={{ background: "rgba(6,182,212,0.08)", color: "#22d3ee", border: "1px solid rgba(6,182,212,0.15)" }}>
            <Route style={{ width: "10px", height: "10px" }} /> Phase 2 — Middleware Pipeline
          </span>
        </div>
        <div className="fr p2">
          <div className="sc"><div className="sn">1</div><div className="ic"><RefreshCw /></div><div className="st">Incoming Request</div><div className="sd">HTTP request + cookies</div></div>
          <div className="ah"><div className="l"></div></div>
          <div className="sc hl-cyan"><div className="sn" style={{ background: "#0891b2" }}>2</div><div className="ic" style={{ background: "rgba(6,182,212,0.18)" }}><Route /></div><div className="st">Middleware</div><div className="sd">middleware.ts intercepts</div></div>
          <div className="ah"><div className="l"></div></div>
          <div className="sc"><div className="sn">3</div><div className="ic"><Cookie /></div><div className="st">Read Cookie</div><div className="sd">Extract HttpOnly cookie</div></div>
          <div className="ah"><div className="l"></div></div>
          <div className="sc" style={{ marginBottom: "8px" }}><div className="sn">4</div><div className="ic"><ShieldCheck /></div><div className="st">Verify JWT</div><div className="sd">Decode &amp; validate signature</div><div className="ct">extract: sid + expiry</div></div>
          <div className="ah" style={{ marginTop: "8px" }}><div className="l"></div></div>
          <div className="sc"><div className="sn">5</div><div className="ic"><Clock /></div><div className="st">Check SID + Expiry</div><div className="sd">Middleware validates</div></div>
          <div className="ah"><div className="l"></div></div>
          <div className="sc"><div className="sn">6</div><div className="ic"><ArrowRightToLine /></div><div className="st">Attach to Header</div><div className="sd">x-session-id injected</div></div>
          <div className="ah"><div className="l"></div></div>
          <div className="sc hl-cyan"><div className="sn" style={{ background: "#0891b2" }}>7</div><div className="ic" style={{ background: "rgba(6,182,212,0.18)" }}><PanelLeft /></div><div className="st">Admin Layout</div><div className="sd">Request forwarded</div></div>
        </div>
      </div>

      <div className="sconn"><div className="vl" style={{ background: "rgba(255,255,255,0.08)" }}></div><div className="lbl">Server-Side Validation</div></div>

      {/* ═══════════════════ PHASE 3: ADMIN LAYOUT CROSS CHECK ═══════════════════ */}
      <div style={{ padding: "0 32px", position: "relative" }}>
        <div className="gl" style={{ width: "260px", height: "200px", background: "rgba(245,158,11,0.02)", top: "0", left: "50%", transform: "translateX(-50%)" }}></div>
        <div style={{ textAlign: "center", marginBottom: "18px" }}>
          <span className="pb" style={{ background: "rgba(245,158,11,0.08)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.15)" }}>
            <ScanEye style={{ width: "10px", height: "10px" }} /> Phase 3 — Admin Layout Cross Check
          </span>
        </div>
        <div className="fr p3" style={{ alignItems: "flex-start" }}>
          <div className="sc"><div className="sn">1</div><div className="ic"><Search /></div><div className="st">getSession()</div><div className="sd">Read x-session-id from header</div></div>
          <div className="ah" style={{ marginTop: "22px" }}><div className="l"></div></div>
          <div className="sc" style={{ marginBottom: "8px" }}><div className="sn">2</div><div className="ic"><UserCheck /></div><div className="st">getAuthUser()</div><div className="sd">Query session DB</div><div className="ct">userInfo + expiryTime</div></div>
          <div className="ah" style={{ marginTop: "22px" }}><div className="l"></div></div>
          <div className="sc"><div className="sn">3</div><div className="ic"><Timer /></div><div className="st">Check DB Expiry</div><div className="sd">Auth Provider + Session Watcher</div></div>
          <div className="ah" style={{ marginTop: "22px" }}><div className="l"></div></div>

          {/* Decision diamond */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            <div style={{ width: "52px", height: "52px", transform: "rotate(45deg)", border: "2px solid rgba(245,158,11,0.3)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(245,158,11,0.05)", marginBottom: "18px" }}>
              <GitBranch style={{ width: "18px", height: "18px", color: "#fbbf24", transform: "rotate(-45deg)" }} />
            </div>
            <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)", fontWeight: "600", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "12px" }}>Valid?</span>
            <div style={{ display: "flex", gap: "24px" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: "2px", height: "12px", background: "rgba(16,185,129,0.35)" }}></div>
                <div style={{ display: "flex", alignItems: "center" }}><div style={{ width: "18px", height: "2px", background: "rgba(16,185,129,0.35)" }}></div><div style={{ width: "0", height: "0", borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: "5px solid rgba(16,185,129,0.45)" }}></div></div>
                <div style={{ height: "8px" }}></div>
                <div className="rs">
                  <CheckCircle style={{ width: "22px", height: "22px", margin: "0 auto 6px", color: "#34d399" }} />
                  <div style={{ fontSize: "10.5px", fontWeight: "600", color: "#34d399" }}>Dashboard</div>
                  <div style={{ fontSize: "8px", color: "rgba(52,211,153,0.45)", marginTop: "2px" }}>Authenticated</div>
                </div>
                <span style={{ fontSize: "8px", color: "rgba(52,211,153,0.4)", fontWeight: "600", marginTop: "5px" }}>✓ YES</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: "2px", height: "12px", background: "rgba(239,68,68,0.35)" }}></div>
                <div style={{ display: "flex", alignItems: "center" }}><div style={{ width: "18px", height: "2px", background: "rgba(239,68,68,0.35)" }}></div><div style={{ width: "0", height: "0", borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: "5px solid rgba(239,68,68,0.45)" }}></div></div>
                <div style={{ height: "8px" }}></div>
                <div className="rf">
                  <XCircle style={{ width: "22px", height: "22px", margin: "0 auto 6px", color: "#f87171" }} />
                  <div style={{ fontSize: "10.5px", fontWeight: "600", color: "#f87171" }}>Login</div>
                  <div style={{ fontSize: "8px", color: "rgba(248,113,113,0.45)", marginTop: "2px" }}>Expired/Invalid</div>
                </div>
                <span style={{ fontSize: "8px", color: "rgba(248,113,113,0.4)", fontWeight: "600", marginTop: "5px" }}>✗ NO</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════ BIG DIVIDER ═══════════════════ */}
      <div style={{ padding: "24px 60px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right,transparent,rgba(139,92,246,0.15),transparent)" }}></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <ArrowDown style={{ width: "12px", height: "12px", color: "rgba(255,255,255,0.2)" }} />
            <span style={{ fontSize: "9px", fontWeight: "700", color: "rgba(255,255,255,0.25)", letterSpacing: ".15em", textTransform: "uppercase" }}>Now User Fetches Protected API Resource</span>
            <ArrowDown style={{ width: "12px", height: "12px", color: "rgba(255,255,255,0.2)" }} />
          </div>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right,transparent,rgba(244,63,94,0.15),transparent)" }}></div>
        </div>
      </div>

      {/* ═══════════════════ PHASE 4: FRONTEND — PROTECTED RESOURCE ═══════════════════ */}
      <div style={{ padding: "22px 32px 0", position: "relative" }}>
        <div className="gl" style={{ width: "280px", height: "200px", background: "rgba(139,92,246,0.025)", top: "0", left: "10%" }}></div>
        <div style={{ textAlign: "center", marginBottom: "18px" }}>
          <span className="pb" style={{ background: "rgba(139,92,246,0.08)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.15)" }}>
            <Monitor style={{ width: "10px", height: "10px" }} /> Phase 4 — Frontend: Request Preparation
          </span>
        </div>
        <div className="fr p4">
          <div className="sc"><div className="sn">1</div><div className="ic"><Fingerprint /></div><div className="st">Access Session ID</div><div className="sd">Auth Provider exposes SID</div><div className="ct">authProvider.sessionId</div></div>
          <div className="ah"><div className="l"></div></div>
          <div className="sc" style={{ marginBottom: "6px" }}><div className="sn">2</div><div className="ic"><Plug /></div><div className="st">Axios Interceptor</div><div className="sd">Attach SID to headers</div><div className="ct">headers.Authorization: SID</div></div>
          <div className="ah" style={{ marginTop: "6px" }}><div className="l"></div></div>
          <div className="sc"><div className="sn">3</div><div className="ic"><Share2 /></div><div className="st">Axios Context</div><div className="sd">Provide to layout children</div><div className="ct">&lt;AxiosProvider&gt;</div></div>
          <div className="ah"><div className="l"></div></div>
          <div className="sc hl-violet"><div className="sn" style={{ background: "#7c3aed" }}>4</div><div className="ic" style={{ background: "rgba(139,92,246,0.18)" }}><Send /></div><div className="st">useAxios() Fetch</div><div className="sd">API call triggered</div><div className="ct">useAxios().get('/api/...')</div></div>
        </div>
      </div>

      {/* ═══════════════════ CROSSOVER ═══════════════════ */}
      <div style={{ padding: "10px 80px" }}>
        <div className="cross-zone">
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "24px", height: "1px", background: "rgba(139,92,246,0.25)" }}></div>
            <span style={{ fontSize: "8px", color: "rgba(139,92,246,0.45)", fontWeight: "600", letterSpacing: ".1em", textTransform: "uppercase" }}>Client</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="ca" style={{ background: "linear-gradient(to bottom,rgba(139,92,246,0.25),rgba(244,63,94,0.25))" }}></div>
            <span style={{ fontSize: "7.5px", color: "rgba(255,255,255,0.15)", marginTop: "4px", fontWeight: "600", letterSpacing: ".15em", textTransform: "uppercase" }}>HTTP Request</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "8px", color: "rgba(244,63,94,0.45)", fontWeight: "600", letterSpacing: ".1em", textTransform: "uppercase" }}>Server</span>
            <div style={{ width: "24px", height: "1px", background: "rgba(244,63,94,0.25)" }}></div>
          </div>
        </div>
      </div>

      {/* ═══════════════════ PHASE 5: BACKEND — PROTECTED RESOURCE ═══════════════════ */}
      {/*<div style={{ padding: "0 32px", position: "relative" }}>
        <div className="gl" style={{ width: "280px", height: "200px", background: "rgba(244,63,94,0.025)", top: "0", right: "8%" }}></div>
        <div style={{ textAlign: "center", marginBottom: "18px" }}>
          <span className="pb" style={{ background: "rgba(244,63,94,0.08)", color: "#fb7185", border: "1px solid rgba(244,63,94,0.15)" }}>
            <Server style={{ width: "10px", height: "10px" }} /> Phase 5 — Backend: Middleware Authentication
          </span>
        </div>
        <div className="fr p5">
          <div className="sc"><div className="sn">5</div><div className="ic"><ScanLine /></div><div className="st">Extract Session ID</div><div className="sd">From Authorization header</div><div className="ct">req.headers.authorization</div></div>
          <div className="ah"><div className="l"></div></div>
          <div className="sc hl-red"><div className="sn" style={{ background: "#dc2626" }}>6</div><div className="ic"><ShieldX /></div><div className="st">No Session?</div><div className="sd">Header missing/empty</div><div className="ct" style={{ borderColor: "rgba(239,68,68,0.12)", color: "rgba(248,113,113,0.45)" }}>401 — Rejected</div></div>
          <div className="ah"><div className="l"></div></div>
          <div className="sc"><div className="sn">7</div><div className="ic"><Database /></div><div className="st">Query Session DB</div><div className="sd">Look up by SID</div><div className="ct">sessions.find({ sid })</div></div>
          <div className="ah"><div className="l"></div></div>
          <div className="sc" style={{ marginBottom: "6px" }}><div className="sn">8</div><div className="ic"><TimerReset /></div><div className="st">Validate Expiry</div><div className="sd">Check expiry + valid user</div><div className="ct">session.expiry > now()</div></div>
          <div className="ah" style={{ marginTop: "6px" }}><div className="l"></div></div>
          <div className="sc hl-red"><div className="sn" style={{ background: "#dc2626" }}>9</div><div className="ic"><AlertTriangle /></div><div className="st">Validation Failed?</div><div className="sd">Expired / invalid session</div><div className="ct" style={{ borderColor: "rgba(239,68,68,0.12)", color: "rgba(248,113,113,0.45)" }}>401 — Unauthorized</div></div>
          <div className="ah"><div className="l"></div></div>
          <div className="sc" style={{ borderColor: "rgba(16,185,129,0.22)", background: "rgba(16,185,129,0.06)" }}>
            <div className="sn" style={{ background: "#059669" }}>10</div>
            <div className="ic" style={{ background: "rgba(16,185,129,0.15)", color: "#34d399" }}><CheckCircle /></div>
            <div className="st" style={{ color: "#6ee7b7" }}>Access Granted</div>
            <div className="sd">Return protected data</div>
            <div className="ct" style={{ borderColor: "rgba(16,185,129,0.12)", color: "rgba(52,211,153,0.5)" }}>200 — Protected Data</div>
          </div>
        </div>
      </div>*/}
            {/* ═══════════════════ PHASE 5: BACKEND — PROTECTED RESOURCE ═══════════════════ */}
      <div style={{ padding: "0 32px", position: "relative" }}>
        <div className="gl" style={{ width: "280px", height: "200px", background: "rgba(244,63,94,0.025)", top: "0", right: "8%" }}></div>
        <div style={{ textAlign: "center", marginBottom: "18px" }}>
          <span className="pb" style={{ background: "rgba(244,63,94,0.08)", color: "#fb7185", border: "1px solid rgba(244,63,94,0.15)" }}>
            <Server style={{ width: "10px", height: "10px" }} /> Phase 5 — Backend: Middleware Authentication
          </span>
        </div>
        <div className="fr p5">
          <div className="sc"><div className="sn">5</div><div className="ic"><ScanLine /></div><div className="st">Extract Session ID</div><div className="sd">From Authorization header</div><div className="ct">req.headers.authorization</div></div>
          <div className="ah"><div className="l"></div></div>
          <div className="sc hl-red"><div className="sn" style={{ background: "#dc2626" }}>6</div><div className="ic"><ShieldX /></div><div className="st">No Session?</div><div className="sd">Header missing/empty</div><div className="ct" style={{ borderColor: "rgba(239,68,68,0.12)", color: "rgba(248,113,113,0.45)" }}>401 — Rejected</div></div>
          <div className="ah"><div className="l"></div></div>
          <div className="sc"><div className="sn">7</div><div className="ic"><Database /></div><div className="st">Query Session DB</div><div className="sd">Look up by SID</div><div className="ct">session sid</div></div>
          <div className="ah"><div className="l"></div></div>
          {/* FIX IS HERE BELOW: Changed > to &gt; */}
          <div className="sc" style={{ marginBottom: "6px" }}><div className="sn">8</div><div className="ic"><TimerReset /></div><div className="st">Validate Expiry</div><div className="sd">Check expiry + valid user</div><div className="ct">session.expiry &gt; now()</div></div>
          <div className="ah" style={{ marginTop: "6px" }}><div className="l"></div></div>
          <div className="sc hl-red"><div className="sn" style={{ background: "#dc2626" }}>9</div><div className="ic"><AlertTriangle /></div><div className="st">Validation Failed?</div><div className="sd">Expired / invalid session</div><div className="ct" style={{ borderColor: "rgba(239,68,68,0.12)", color: "rgba(248,113,113,0.45)" }}>401 — Unauthorized</div></div>
          <div className="ah"><div className="l"></div></div>
          <div className="sc" style={{ borderColor: "rgba(16,185,129,0.22)", background: "rgba(16,185,129,0.06)" }}>
            <div className="sn" style={{ background: "#059669" }}>10</div>
            <div className="ic" style={{ background: "rgba(16,185,129,0.15)", color: "#34d399" }}><CheckCircle /></div>
            <div className="st" style={{ color: "#6ee7b7" }}>Access Granted</div>
            <div className="sd">Return protected data</div>
            <div className="ct" style={{ borderColor: "rgba(16,185,129,0.12)", color: "rgba(52,211,153,0.5)" }}>200 — Protected Data</div>
          </div>
        </div>
      </div>

      {/* ═══════════════════ OUTCOMES ═══════════════════ */}
      <div style={{ padding: "22px 32px 0", position: "relative" }}>
        <div className="gl" style={{ width: "240px", height: "180px", background: "rgba(16,185,129,0.02)", top: "0", left: "50%", transform: "translateX(-50%)" }}></div>
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <span className="pb" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <GitBranch style={{ width: "10px", height: "10px" }} /> All Decision Outcomes
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
          {/* Failures */}
          <div style={{ display: "flex", gap: "10px" }}>
            <div className="rf" style={{ width: "136px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <ShieldX style={{ width: "20px", height: "20px", margin: "0 auto 5px", color: "#f87171" }} />
              <div style={{ fontSize: "10px", fontWeight: "600", color: "#f87171" }}>No Session</div>
              <div style={{ fontSize: "8px", color: "rgba(248,113,113,0.4)", marginTop: "2px" }}>Phase 3 / Phase 5</div>
              <div style={{ marginTop: "6px", padding: "2px 6px", borderRadius: "3px", background: "rgba(239,68,68,0.08)", fontSize: "8px", fontWeight: "700", color: "#f87171" }}>401 REJECT</div>
            </div>
            <div className="rf" style={{ width: "136px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <AlertTriangle style={{ width: "20px", height: "20px", margin: "0 auto 5px", color: "#f87171" }} />
              <div style={{ fontSize: "10px", fontWeight: "600", color: "#f87171" }}>Expired / Invalid</div>
              <div style={{ fontSize: "8px", color: "rgba(248,113,113,0.4)", marginTop: "2px" }}>Phase 3 / Phase 5</div>
              <div style={{ marginTop: "6px", padding: "2px 6px", borderRadius: "3px", background: "rgba(239,68,68,0.08)", fontSize: "8px", fontWeight: "700", color: "#f87171" }}>401 UNAUTHORIZED</div>
            </div>
          </div>
          <div style={{ width: "1px", background: "rgba(255,255,255,0.05)", alignSelf: "stretch", margin: "0 4px" }}></div>
          {/* Successes */}
          <div style={{ display: "flex", gap: "10px" }}>
            <div className="rs" style={{ width: "136px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <CheckCircle style={{ width: "20px", height: "20px", margin: "0 auto 5px", color: "#34d399" }} />
              <div style={{ fontSize: "10px", fontWeight: "600", color: "#34d399" }}>Dashboard Rendered</div>
              <div style={{ fontSize: "8px", color: "rgba(52,211,153,0.4)", marginTop: "2px" }}>Phase 3 — Valid session</div>
              <div style={{ marginTop: "6px", padding: "2px 6px", borderRadius: "3px", background: "rgba(16,185,129,0.08)", fontSize: "8px", fontWeight: "700", color: "#34d399" }}>200 OK</div>
            </div>
            <div className="rs" style={{ width: "136px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Database style={{ width: "20px", height: "20px", margin: "0 auto 5px", color: "#34d399" }} />
              <div style={{ fontSize: "10px", fontWeight: "600", color: "#34d399" }}>Protected Data</div>
              <div style={{ fontSize: "8px", color: "rgba(52,211,153,0.4)", marginTop: "2px" }}>Phase 5 — Resource fetched</div>
              <div style={{ marginTop: "6px", padding: "2px 6px", borderRadius: "3px", background: "rgba(16,185,129,0.08)", fontSize: "8px", fontWeight: "700", color: "#34d399" }}>200 DATA</div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════ LEGEND ═══════════════════ */}
      <div style={{ padding: "22px 50px 40px" }}>
        <div style={{ maxWidth: "920px", margin: "0 auto", background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "14px", padding: "20px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
            <Info style={{ width: "12px", height: "12px", color: "rgba(255,255,255,0.25)" }} />
            <span style={{ fontSize: "9.5px", fontWeight: "700", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: ".12em" }}>Flow Legend</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 24px", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}><div style={{ width: "10px", height: "10px", borderRadius: "3px", background: "rgba(16,185,129,0.35)" }}></div><span style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.4)" }}>Login &amp; Session</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}><div style={{ width: "10px", height: "10px", borderRadius: "3px", background: "rgba(6,182,212,0.35)" }}></div><span style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.4)" }}>Middleware Pipeline</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}><div style={{ width: "10px", height: "10px", borderRadius: "3px", background: "rgba(245,158,11,0.35)" }}></div><span style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.4)" }}>Cross Validation</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}><div style={{ width: "10px", height: "10px", borderRadius: "3px", background: "rgba(139,92,246,0.35)" }}></div><span style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.4)" }}>Frontend Request</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}><div style={{ width: "10px", height: "10px", borderRadius: "3px", background: "rgba(244,63,94,0.35)" }}></div><span style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.4)" }}>Backend Auth</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}><div style={{ width: "10px", height: "10px", borderRadius: "3px", background: "rgba(239,68,68,0.25)", border: "1px solid rgba(239,68,68,0.35)" }}></div><span style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.4)" }}>Rejection</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}><div style={{ width: "10px", height: "10px", borderRadius: "3px", background: "rgba(16,185,129,0.25)", border: "1px solid rgba(16,185,129,0.35)" }}></div><span style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.4)" }}>Success</span></div>
          </div>
          <div style={{ marginTop: "12px", paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ fontSize: "9.5px", color: "rgba(255,255,255,0.25)" }}><span style={{ fontWeight: "600", color: "rgba(255,255,255,0.35)" }}>Stack:</span> Next.js 15 · App Router · middleware.ts · Server Components · Axios · Session DB</div>
            <div style={{ fontSize: "9.5px", color: "rgba(255,255,255,0.25)" }}><span style={{ fontWeight: "600", color: "rgba(255,255,255,0.35)" }}>Security:</span> HttpOnly · Secure · JWT Signed · Middleware Intercept · Server-Side Cross Validation · Expiry Sync</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;