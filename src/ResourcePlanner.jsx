import { useState, useMemo } from "react";

// ═══════════════════════════════════════════════
// DATA MODEL
// ═══════════════════════════════════════════════

const MONTHS = [
  "Apr 26","May 26","Jun 26","Jul 26","Aug 26","Sep 26",
  "Oct 26","Nov 26","Dec 26","Jan 27","Feb 27","Mar 27",
];

const SKILL_THEMES = {
  MOM: { label: "Manufacturing Operations Management", color: "#3b82f6" },
  "MI&V": { label: "Manufacturing Intelligence & Visualisation", color: "#8b5cf6" },
};

const SKILL_DETAILS = {
  MOM: ["MES", "Edge Connections", "API Integrations", "Mendix App Development"],
  "MI&V": ["Cognos Analytics", "PowerBI Analytics", "Python for Data Analysis"],
};

const PROJECT_COLORS = [
  "#2563eb","#059669","#d97706","#dc2626","#7c3aed",
  "#0891b2","#be185d","#4f46e5","#0d9488","#e11d48","#ca8a04","#6d28d9",
];

const PROJECTS = Array.from({ length: 12 }, (_, i) => ({
  id: `pj${i + 1}`,
  name: `Project ${i + 1}`,
  color: PROJECT_COLORS[i],
}));

const EMPLOYEES = "ABCDEFGHIJKLMNOPQRST".split("").map((l) => ({
  id: `emp_${l}`,
  name: `Employee ${l}`,
}));

const ALLOCATIONS = [
  // Project 1
  { project:"pj1", person:"emp_A", theme:"MOM", detail:"Mendix App Development", months:[80,80,60,40,20,0,0,0,0,0,0,0] },
  { project:"pj1", person:"emp_B", theme:"MOM", detail:"Mendix App Development", months:[100,80,60,40,0,0,0,0,0,0,0,0] },
  { project:"pj1", person:"emp_C", theme:"MOM", detail:"MES", months:[60,60,40,40,20,0,0,0,0,0,0,0] },
  { project:"pj1", person:"emp_D", theme:"MI&V", detail:"PowerBI Analytics", months:[20,40,60,60,40,20,0,0,0,0,0,0] },
  { project:"pj1", person:"emp_E", theme:"MOM", detail:"API Integrations", months:[0,20,40,60,60,40,20,0,0,0,0,0] },
  { project:"pj1", person:"emp_F", theme:"MOM", detail:"Edge Connections", months:[40,40,20,0,0,0,0,0,0,0,0,0] },
  // Project 2
  { project:"pj2", person:"emp_G", theme:"MOM", detail:"Mendix App Development", months:[0,0,20,40,60,80,80,60,40,20,0,0] },
  { project:"pj2", person:"emp_H", theme:"MOM", detail:"Edge Connections", months:[0,0,40,40,60,60,40,20,0,0,0,0] },
  { project:"pj2", person:"emp_C", theme:"MOM", detail:"MES", months:[0,0,0,20,40,60,60,40,20,0,0,0] },
  { project:"pj2", person:"emp_I", theme:"MI&V", detail:"Cognos Analytics", months:[0,0,0,20,40,40,60,60,40,20,0,0] },
  { project:"pj2", person:"emp_J", theme:"MOM", detail:"API Integrations", months:[0,0,20,20,40,40,20,0,0,0,0,0] },
  // Project 3
  { project:"pj3", person:"emp_K", theme:"MI&V", detail:"PowerBI Analytics", months:[40,40,40,40,40,40,40,40,40,40,40,40] },
  { project:"pj3", person:"emp_L", theme:"MI&V", detail:"Python for Data Analysis", months:[60,60,60,40,40,40,20,20,0,0,0,0] },
  { project:"pj3", person:"emp_M", theme:"MOM", detail:"API Integrations", months:[20,20,40,40,60,60,40,20,0,0,0,0] },
  { project:"pj3", person:"emp_N", theme:"MI&V", detail:"Cognos Analytics", months:[40,40,40,20,20,0,0,0,0,0,0,0] },
  // Project 4
  { project:"pj4", person:"emp_A", theme:"MOM", detail:"Mendix App Development", months:[0,0,0,0,40,60,80,80,60,40,20,0] },
  { project:"pj4", person:"emp_O", theme:"MOM", detail:"Edge Connections", months:[0,0,0,20,40,60,60,80,60,40,20,0] },
  { project:"pj4", person:"emp_E", theme:"MOM", detail:"API Integrations", months:[0,0,0,0,0,20,40,60,60,40,20,0] },
  { project:"pj4", person:"emp_D", theme:"MI&V", detail:"PowerBI Analytics", months:[0,0,0,0,0,20,40,40,60,60,40,20] },
  { project:"pj4", person:"emp_P", theme:"MOM", detail:"MES", months:[0,0,0,0,20,40,60,60,40,20,0,0] },
  // Project 5
  { project:"pj5", person:"emp_B", theme:"MOM", detail:"Mendix App Development", months:[0,0,0,0,60,80,80,60,40,20,0,0] },
  { project:"pj5", person:"emp_H", theme:"MOM", detail:"Edge Connections", months:[0,0,0,0,0,20,40,60,60,40,20,0] },
  { project:"pj5", person:"emp_I", theme:"MI&V", detail:"Cognos Analytics", months:[0,0,0,0,0,0,0,20,40,60,60,40] },
  { project:"pj5", person:"emp_Q", theme:"MI&V", detail:"PowerBI Analytics", months:[0,0,0,0,20,40,40,60,60,40,20,0] },
  { project:"pj5", person:"emp_R", theme:"MOM", detail:"API Integrations", months:[0,0,0,0,0,20,40,40,20,0,0,0] },
  // Project 6
  { project:"pj6", person:"emp_G", theme:"MOM", detail:"Mendix App Development", months:[40,40,40,20,0,0,0,0,0,0,0,0] },
  { project:"pj6", person:"emp_K", theme:"MI&V", detail:"PowerBI Analytics", months:[40,40,40,20,0,0,0,0,0,0,0,0] },
  { project:"pj6", person:"emp_L", theme:"MI&V", detail:"Python for Data Analysis", months:[20,20,20,20,0,0,0,0,0,0,0,0] },
  { project:"pj6", person:"emp_S", theme:"MOM", detail:"MES", months:[60,60,40,20,0,0,0,0,0,0,0,0] },
  // Project 7
  { project:"pj7", person:"emp_M", theme:"MOM", detail:"API Integrations", months:[0,0,0,0,0,0,0,40,60,60,40,20] },
  { project:"pj7", person:"emp_O", theme:"MOM", detail:"Edge Connections", months:[0,0,0,0,0,0,0,0,0,40,60,60] },
  { project:"pj7", person:"emp_I", theme:"MI&V", detail:"Cognos Analytics", months:[40,40,40,40,20,20,0,0,0,0,0,0] },
  { project:"pj7", person:"emp_T", theme:"MI&V", detail:"Python for Data Analysis", months:[0,0,0,0,0,0,20,40,60,60,40,20] },
  { project:"pj7", person:"emp_N", theme:"MI&V", detail:"Cognos Analytics", months:[0,0,0,0,40,40,60,60,40,20,0,0] },
  // Project 8
  { project:"pj8", person:"emp_C", theme:"MOM", detail:"MES", months:[0,0,0,0,0,0,0,0,0,40,60,60] },
  { project:"pj8", person:"emp_L", theme:"MI&V", detail:"Python for Data Analysis", months:[0,0,0,0,0,0,0,40,60,60,40,20] },
  { project:"pj8", person:"emp_D", theme:"MI&V", detail:"PowerBI Analytics", months:[0,0,0,0,0,0,0,0,0,20,40,60] },
  { project:"pj8", person:"emp_R", theme:"MOM", detail:"API Integrations", months:[0,0,0,0,0,0,0,0,20,40,60,60] },
  // Project 9
  { project:"pj9", person:"emp_A", theme:"MOM", detail:"Mendix App Development", months:[0,0,0,0,0,0,0,0,40,60,80,80] },
  { project:"pj9", person:"emp_B", theme:"MOM", detail:"Mendix App Development", months:[0,0,0,0,0,0,0,0,0,40,60,80] },
  { project:"pj9", person:"emp_P", theme:"MOM", detail:"MES", months:[0,0,0,0,0,0,0,0,20,40,60,60] },
  { project:"pj9", person:"emp_Q", theme:"MI&V", detail:"PowerBI Analytics", months:[0,0,0,0,0,0,0,0,20,40,60,60] },
  { project:"pj9", person:"emp_T", theme:"MI&V", detail:"Python for Data Analysis", months:[40,40,20,0,0,0,0,0,0,0,0,0] },
  // Project 10
  { project:"pj10", person:"emp_F", theme:"MOM", detail:"Edge Connections", months:[0,0,0,40,40,60,60,40,20,0,0,0] },
  { project:"pj10", person:"emp_S", theme:"MOM", detail:"MES", months:[0,0,0,20,40,60,60,40,20,0,0,0] },
  { project:"pj10", person:"emp_J", theme:"MOM", detail:"API Integrations", months:[0,0,0,40,40,60,40,20,0,0,0,0] },
  { project:"pj10", person:"emp_N", theme:"MI&V", detail:"Cognos Analytics", months:[0,0,0,0,0,20,40,40,60,40,20,0] },
  { project:"pj10", person:"emp_K", theme:"MI&V", detail:"PowerBI Analytics", months:[0,0,0,0,0,20,20,40,40,40,20,0] },
  // Project 11
  { project:"pj11", person:"emp_G", theme:"MOM", detail:"Mendix App Development", months:[0,0,0,0,0,0,0,40,60,80,80,60] },
  { project:"pj11", person:"emp_H", theme:"MOM", detail:"Edge Connections", months:[0,0,0,0,0,0,0,0,20,40,60,60] },
  { project:"pj11", person:"emp_E", theme:"MOM", detail:"API Integrations", months:[0,0,0,0,0,0,0,0,20,40,60,60] },
  { project:"pj11", person:"emp_I", theme:"MI&V", detail:"Cognos Analytics", months:[0,0,0,0,0,0,0,0,0,0,20,40] },
  { project:"pj11", person:"emp_L", theme:"MI&V", detail:"Python for Data Analysis", months:[0,0,0,0,0,0,0,0,0,0,20,40] },
  // Project 12
  { project:"pj12", person:"emp_O", theme:"MOM", detail:"Edge Connections", months:[20,20,40,40,0,0,0,0,0,0,0,0] },
  { project:"pj12", person:"emp_M", theme:"MOM", detail:"API Integrations", months:[40,40,20,0,0,0,0,0,0,0,0,0] },
  { project:"pj12", person:"emp_T", theme:"MI&V", detail:"Python for Data Analysis", months:[0,0,0,20,40,40,40,20,0,0,0,0] },
  { project:"pj12", person:"emp_S", theme:"MOM", detail:"MES", months:[0,0,0,0,0,20,40,60,40,20,0,0] },
  { project:"pj12", person:"emp_Q", theme:"MI&V", detail:"PowerBI Analytics", months:[40,40,40,40,20,0,0,0,0,0,0,0] },
];

// ═══════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════

const allocHeat = (pct) => {
  if (pct === 0) return "transparent";
  if (pct <= 50) return "rgba(34,197,94,0.18)";
  if (pct <= 80) return "rgba(34,197,94,0.35)";
  if (pct <= 100) return "rgba(234,179,8,0.3)";
  if (pct <= 120) return "rgba(249,115,22,0.4)";
  return "rgba(239,68,68,0.5)";
};

const fmtPct = (v) => (v > 0 ? `${v}%` : "");
const fmtFte = (v) => (Math.abs(v) < 0.01 ? "" : v.toFixed(1));

const TABS = ["Demand vs Capacity", "Person View", "Project View", "Skill Heatmap"];

// ═══════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════

export default function ResourcePlanner() {
  const [tab, setTab] = useState(0);
  const [horizon, setHorizon] = useState(6);
  const [themeFilter, setThemeFilter] = useState("All");
  const [projectFilter, setProjectFilter] = useState("All");
  const [expandedThemes, setExpandedThemes] = useState({ MOM: true, "MI&V": true });

  const vis = MONTHS.slice(0, horizon);

  // ── Derived data ──

  const supply = useMemo(() => {
    const s = {};
    ALLOCATIONS.forEach(({ detail, months }) => {
      if (!s[detail]) s[detail] = new Array(12).fill(0);
      months.forEach((v, mi) => { s[detail][mi] += v / 100; });
    });
    return s;
  }, []);

  const supplyByTheme = useMemo(() => {
    const t = {};
    Object.entries(SKILL_DETAILS).forEach(([theme, details]) => {
      t[theme] = new Array(12).fill(0);
      details.forEach((d) => {
        if (supply[d]) supply[d].forEach((v, mi) => { t[theme][mi] += v; });
      });
    });
    return t;
  }, [supply]);

  const supplyTotal = useMemo(() => {
    const t = new Array(12).fill(0);
    Object.values(supply).forEach((arr) => arr.forEach((v, mi) => { t[mi] += v; }));
    return t;
  }, [supply]);

  const personMonthTotals = useMemo(() => {
    const m = {};
    EMPLOYEES.forEach(({ id }) => { m[id] = new Array(12).fill(0); });
    ALLOCATIONS.forEach(({ person, months }) => {
      months.forEach((v, mi) => { m[person][mi] += v; });
    });
    return m;
  }, []);

  const personProjectBreakdown = useMemo(() => {
    const m = {};
    ALLOCATIONS.forEach(({ project, person, months }) => {
      const key = `${person}|${project}`;
      if (!m[key]) m[key] = new Array(12).fill(0);
      months.forEach((v, mi) => { m[key][mi] += v; });
    });
    return m;
  }, []);

  const stats = useMemo(() => {
    let overAlloc = 0;
    let peakSkill = "";
    let peakVal = 0;
    EMPLOYEES.forEach(({ id }) => {
      for (let mi = 0; mi < horizon; mi++) {
        if (personMonthTotals[id][mi] > 100) { overAlloc++; break; }
      }
    });
    Object.entries(supply).forEach(([detail, arr]) => {
      for (let mi = 0; mi < horizon; mi++) {
        if (arr[mi] > peakVal) { peakVal = arr[mi]; peakSkill = detail; }
      }
    });
    return { overAlloc, peakSkill, peakVal: peakVal.toFixed(1) };
  }, [supply, personMonthTotals, horizon]);

  // ── Styles ──
  const S = {
    app: { fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "linear-gradient(160deg,#0f172a,#1e293b 50%,#0f172a)", minHeight: "100vh", color: "#e2e8f0" },
    hdr: { padding: "24px 28px 0" },
    h1: { fontSize: "24px", fontWeight: 700, letterSpacing: "-0.5px", margin: 0, color: "#f1f5f9" },
    sub: { fontSize: "12px", color: "#64748b", marginTop: "3px" },
    tabs: { display: "flex", gap: 0, marginTop: "18px", borderBottom: "1px solid rgba(148,163,184,0.1)" },
    tab: (a) => ({ padding: "9px 18px", fontSize: "12.5px", fontWeight: a ? 600 : 400, color: a ? "#f1f5f9" : "#64748b", background: a ? "rgba(148,163,184,0.08)" : "transparent", border: "none", borderBottom: a ? "2px solid #3b82f6" : "2px solid transparent", cursor: "pointer", borderRadius: "6px 6px 0 0", transition: "all 0.15s" }),
    body: { padding: "20px 28px 40px" },
    row: { display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap", marginBottom: "18px" },
    sel: { background: "rgba(30,41,59,0.8)", border: "1px solid rgba(148,163,184,0.2)", color: "#e2e8f0", padding: "6px 11px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" },
    lbl: { fontSize: "11px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 },
    scroll: { overflowX: "auto", borderRadius: "8px", border: "1px solid rgba(148,163,184,0.1)" },
    tbl: { width: "100%", borderCollapse: "separate", borderSpacing: 0, fontSize: "11.5px" },
    th: { padding: "9px 10px", textAlign: "center", fontWeight: 600, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.5px", color: "#94a3b8", borderBottom: "1px solid rgba(148,163,184,0.15)", background: "#1e293b", position: "sticky", top: 0, zIndex: 2 },
    thL: { textAlign: "left", minWidth: "130px" },
    td: { padding: "7px 10px", borderBottom: "1px solid rgba(148,163,184,0.06)", textAlign: "center" },
    tdL: { textAlign: "left" },
    card: { background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.1)", borderRadius: "10px", padding: "16px", marginBottom: "16px" },
    badge: (c) => ({ display: "inline-block", padding: "2px 7px", borderRadius: "4px", fontSize: "10px", fontWeight: 600, background: c + "20", color: c, marginRight: "4px" }),
    sGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px", marginBottom: "20px" },
    sCard: (c) => ({ background: `linear-gradient(135deg,${c}12,${c}06)`, border: `1px solid ${c}30`, borderRadius: "10px", padding: "14px", textAlign: "center" }),
    sNum: (c) => ({ fontSize: "26px", fontWeight: 700, color: c }),
    sLbl: { fontSize: "10px", color: "#94a3b8", marginTop: "3px" },
    chevron: (open) => ({ display: "inline-block", transition: "transform 0.2s", transform: open ? "rotate(90deg)" : "rotate(0)", marginRight: "6px", fontSize: "10px", color: "#64748b" }),
  };

  // ═══════════════════════════════════════════════
  // TAB 0: DEMAND VS CAPACITY
  // ═══════════════════════════════════════════════

  const renderDemandCapacity = () => {
    const themes = themeFilter === "All" ? Object.keys(SKILL_THEMES) : [themeFilter];

    return (
      <div>
        <div style={S.sGrid}>
          <div style={S.sCard("#3b82f6")}>
            <div style={S.sNum("#3b82f6")}>{EMPLOYEES.length}</div>
            <div style={S.sLbl}>Team Members</div>
          </div>
          <div style={S.sCard("#059669")}>
            <div style={S.sNum("#059669")}>{PROJECTS.length}</div>
            <div style={S.sLbl}>Active Projects</div>
          </div>
          <div style={S.sCard("#ef4444")}>
            <div style={S.sNum("#ef4444")}>{stats.overAlloc}</div>
            <div style={S.sLbl}>Over-allocated People</div>
          </div>
          <div style={S.sCard("#f59e0b")}>
            <div style={S.sNum("#f59e0b")}>{stats.peakVal}</div>
            <div style={S.sLbl}>Peak FTE: {stats.peakSkill}</div>
          </div>
        </div>

        <div style={S.scroll}>
          <table style={S.tbl}>
            <thead>
              <tr>
                <th style={{ ...S.th, ...S.thL }}>Skill Theme / Detail</th>
                {vis.map((m, i) => <th key={i} style={S.th}>{m}</th>)}
              </tr>
            </thead>
            <tbody>
              {themes.map((theme) => {
                const open = expandedThemes[theme];
                const tc = SKILL_THEMES[theme].color;
                return [
                  <tr
                    key={theme}
                    onClick={() => setExpandedThemes((p) => ({ ...p, [theme]: !p[theme] }))}
                    style={{ cursor: "pointer", background: `${tc}10` }}
                  >
                    <td style={{ ...S.td, ...S.tdL }}>
                      <span style={S.chevron(open)}>▶</span>
                      <strong>{theme}</strong>
                      <span style={{ marginLeft: "8px", color: "#64748b", fontSize: "10px" }}>{SKILL_THEMES[theme].label}</span>
                    </td>
                    {vis.map((_, mi) => {
                      const v = supplyByTheme[theme]?.[mi] || 0;
                      return (
                        <td key={mi} style={{ ...S.td, fontWeight: 700, color: v > 0 ? tc : "#334155" }}>
                          {fmtFte(v) || "–"}
                        </td>
                      );
                    })}
                  </tr>,
                  ...(open
                    ? SKILL_DETAILS[theme].map((detail) => {
                        const arr = supply[detail] || new Array(12).fill(0);
                        const hasData = arr.slice(0, horizon).some((v) => v > 0);
                        if (!hasData) return null;
                        return (
                          <tr key={detail}>
                            <td style={{ ...S.td, ...S.tdL, paddingLeft: "28px" }}>
                              {detail}
                            </td>
                            {vis.map((_, mi) => {
                              const v = arr[mi];
                              return (
                                <td key={mi} style={{ ...S.td, background: v > 1.5 ? `${tc}15` : v > 0 ? `${tc}08` : "transparent" }}>
                                  <span style={{ color: v > 0 ? "#e2e8f0" : "#334155", fontWeight: v > 1.5 ? 600 : 400 }}>
                                    {fmtFte(v) || "–"}
                                  </span>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })
                    : []),
                  open && (
                    <tr key={`${theme}-total`} style={{ background: `${tc}08`, fontWeight: 600 }}>
                      <td style={{ ...S.td, ...S.tdL, paddingLeft: "28px", color: tc, fontSize: "10px" }}>THEME TOTAL</td>
                      {vis.map((_, mi) => {
                        const v = supplyByTheme[theme]?.[mi] || 0;
                        return (
                          <td key={mi} style={{ ...S.td, color: tc, fontWeight: 700 }}>
                            {fmtFte(v) || "–"}
                          </td>
                        );
                      })}
                    </tr>
                  ),
                ];
              })}
              <tr style={{ background: "rgba(148,163,184,0.1)", fontWeight: 700 }}>
                <td style={{ ...S.td, ...S.tdL, color: "#f1f5f9" }}>PORTFOLIO TOTAL (FTE)</td>
                {vis.map((_, mi) => (
                  <td key={mi} style={{ ...S.td, color: "#f1f5f9", fontWeight: 700 }}>
                    {fmtFte(supplyTotal[mi]) || "–"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ fontSize: "10px", color: "#64748b", marginTop: "8px" }}>
          Values are FTE (allocation% / 100 summed across all people). Click a theme row to expand/collapse skill details.
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════
  // TAB 1: PERSON VIEW
  // ═══════════════════════════════════════════════

  const renderPersonView = () => {
    const filtered = projectFilter === "All"
      ? EMPLOYEES
      : EMPLOYEES.filter((e) => ALLOCATIONS.some((a) => a.person === e.id && a.project === projectFilter));

    return (
      <div>
        <div style={S.row}>
          <span style={S.lbl}>Filter by project:</span>
          <select style={S.sel} value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}>
            <option value="All">All Projects</option>
            {PROJECTS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div style={S.scroll}>
          <table style={S.tbl}>
            <thead>
              <tr>
                <th style={{ ...S.th, ...S.thL }}>Person</th>
                <th style={{ ...S.th, ...S.thL }}>Projects</th>
                {vis.map((m, i) => <th key={i} style={S.th}>{m}</th>)}
              </tr>
            </thead>
            <tbody>
              {filtered.map(({ id, name }) => {
                const totals = personMonthTotals[id];
                const projs = [...new Set(ALLOCATIONS.filter((a) => a.person === id).map((a) => a.project))];
                return (
                  <tr key={id}>
                    <td style={{ ...S.td, ...S.tdL }}>{name}</td>
                    <td style={{ ...S.td, ...S.tdL }}>
                      {projs.map((pid) => {
                        const p = PROJECTS.find((x) => x.id === pid);
                        return p ? <span key={pid} style={S.badge(p.color)}>{p.name.replace("Project ", "P")}</span> : null;
                      })}
                    </td>
                    {vis.map((_, mi) => {
                      const v = totals[mi];
                      return (
                        <td key={mi} style={{ ...S.td, background: allocHeat(v), padding: "4px 6px" }}>
                          <div style={{ fontWeight: 600, color: v > 100 ? "#ef4444" : v > 0 ? "#e2e8f0" : "#334155", fontSize: "12px" }}>
                            {v > 0 ? `${v}%` : ""}
                          </div>
                          {v > 0 && (
                            <div style={{ display: "flex", gap: "1px", marginTop: "2px", height: "4px" }}>
                              {projs.map((pid) => {
                                const key = `${id}|${pid}`;
                                const pv = personProjectBreakdown[key]?.[mi] || 0;
                                if (pv === 0) return null;
                                const p = PROJECTS.find((x) => x.id === pid);
                                return (
                                  <div
                                    key={pid}
                                    title={`${p?.name}: ${pv}%`}
                                    style={{ flex: pv, background: p?.color, borderRadius: "1px", minWidth: "2px" }}
                                  />
                                );
                              })}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "12px" }}>
          {PROJECTS.map((p) => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "#94a3b8" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: p.color }} />
              {p.name}
            </div>
          ))}
        </div>
        <div style={{ fontSize: "10px", color: "#64748b", marginTop: "8px" }}>
          Colour bars show project breakdown. Red text = over 100% allocated. Hover bars for detail.
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════
  // TAB 2: PROJECT VIEW
  // ═══════════════════════════════════════════════

  const renderProjectView = () => (
    <div>
      {PROJECTS.map((proj) => {
        const rows = ALLOCATIONS.filter((a) => a.project === proj.id);
        if (rows.length === 0) return null;
        const totalByMonth = new Array(12).fill(0);
        rows.forEach(({ months }) => months.forEach((v, mi) => { totalByMonth[mi] += v / 100; }));

        return (
          <div key={proj.id} style={S.card}>
            <div style={{ ...S.row, marginBottom: "10px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: proj.color }} />
              <strong style={{ color: proj.color }}>{proj.name}</strong>
              <span style={{ fontSize: "11px", color: "#64748b" }}>
                {rows.length} allocations · {[...new Set(rows.map((r) => r.person))].length} people
              </span>
            </div>
            <div style={S.scroll}>
              <table style={S.tbl}>
                <thead>
                  <tr>
                    <th style={{ ...S.th, ...S.thL }}>Person</th>
                    <th style={{ ...S.th, ...S.thL }}>Theme</th>
                    <th style={{ ...S.th, ...S.thL }}>Skill Detail</th>
                    {vis.map((m, i) => <th key={i} style={S.th}>{m}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, ri) => {
                    const emp = EMPLOYEES.find((e) => e.id === r.person);
                    const tc = SKILL_THEMES[r.theme]?.color || "#64748b";
                    return (
                      <tr key={ri}>
                        <td style={{ ...S.td, ...S.tdL }}>{emp?.name}</td>
                        <td style={S.td}><span style={S.badge(tc)}>{r.theme}</span></td>
                        <td style={{ ...S.td, ...S.tdL }}>{r.detail}</td>
                        {vis.map((_, mi) => {
                          const v = r.months[mi];
                          return (
                            <td key={mi} style={{ ...S.td, background: v > 0 ? `${proj.color}10` : "transparent" }}>
                              <span style={{ fontWeight: v >= 60 ? 600 : 400, color: v > 0 ? "#e2e8f0" : "#334155" }}>
                                {fmtPct(v)}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                  <tr style={{ background: "rgba(148,163,184,0.06)", fontWeight: 600 }}>
                    <td style={{ ...S.td, ...S.tdL, color: "#94a3b8", fontSize: "10px" }} colSpan={3}>PROJECT TOTAL (FTE)</td>
                    {vis.map((_, mi) => (
                      <td key={mi} style={{ ...S.td, color: proj.color, fontWeight: 700 }}>
                        {fmtFte(totalByMonth[mi]) || "–"}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );

  // ═══════════════════════════════════════════════
  // TAB 3: SKILL HEATMAP
  // ═══════════════════════════════════════════════

  const renderSkillHeatmap = () => {
    const allDetails = Object.entries(SKILL_DETAILS).flatMap(([theme, details]) =>
      details.map((d) => ({ theme, detail: d }))
    );

    return (
      <div>
        <div style={S.card}>
          <div style={{ fontSize: "11px", color: "#94a3b8" }}>
            This heatmap shows allocated FTE intensity per skill-detail per month. Darker = more resource concentrated in that skill.
          </div>
        </div>
        <div style={S.scroll}>
          <table style={S.tbl}>
            <thead>
              <tr>
                <th style={{ ...S.th, ...S.thL }}>Theme</th>
                <th style={{ ...S.th, ...S.thL }}>Skill Detail</th>
                {vis.map((m, i) => <th key={i} style={S.th}>{m}</th>)}
                <th style={S.th}>Avg</th>
                <th style={S.th}>Peak</th>
              </tr>
            </thead>
            <tbody>
              {allDetails.map(({ theme, detail }) => {
                const arr = supply[detail] || new Array(12).fill(0);
                const sliced = arr.slice(0, horizon);
                const avg = sliced.reduce((a, b) => a + b, 0) / horizon;
                const peak = Math.max(...sliced);
                const maxFte = 3;

                return (
                  <tr key={detail}>
                    <td style={{ ...S.td, ...S.tdL }}><span style={S.badge(SKILL_THEMES[theme]?.color || "#64748b")}>{theme}</span></td>
                    <td style={{ ...S.td, ...S.tdL }}>{detail}</td>
                    {sliced.map((v, mi) => {
                      const intensity = Math.min(v / maxFte, 1);
                      const bg = v === 0 ? "transparent" : `rgba(${theme === "MOM" ? "59,130,246" : "139,92,246"},${(0.1 + intensity * 0.5).toFixed(2)})`;
                      return (
                        <td key={mi} style={{ ...S.td, background: bg }}>
                          <span style={{ fontWeight: v >= 1.5 ? 700 : v > 0 ? 500 : 400, color: v > 0 ? "#f1f5f9" : "#334155", fontSize: v >= 2 ? "13px" : "11.5px" }}>
                            {fmtFte(v) || "–"}
                          </span>
                        </td>
                      );
                    })}
                    <td style={{ ...S.td, color: "#94a3b8" }}>{avg > 0.01 ? avg.toFixed(1) : "–"}</td>
                    <td style={{ ...S.td, color: peak >= 2 ? "#f59e0b" : peak > 0 ? "#e2e8f0" : "#334155" }}>{fmtFte(peak) || "–"}</td>
                  </tr>
                );
              })}
              {Object.entries(SKILL_DETAILS).map(([theme]) => {
                const tc = SKILL_THEMES[theme].color;
                const arr = supplyByTheme[theme] || new Array(12).fill(0);
                const sliced = arr.slice(0, horizon);
                const avg = sliced.reduce((a, b) => a + b, 0) / horizon;
                const peak = Math.max(...sliced);
                return (
                  <tr key={`${theme}-total`} style={{ background: `${tc}12`, fontWeight: 600 }}>
                    <td style={{ ...S.td, ...S.tdL, color: tc }} colSpan={2}>{theme} TOTAL</td>
                    {sliced.map((v, mi) => (
                      <td key={mi} style={{ ...S.td, color: tc, fontWeight: 700 }}>{fmtFte(v) || "–"}</td>
                    ))}
                    <td style={{ ...S.td, color: tc }}>{avg.toFixed(1)}</td>
                    <td style={{ ...S.td, color: tc }}>{peak.toFixed(1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════
  // MAIN RENDER
  // ═══════════════════════════════════════════════

  return (
    <div style={S.app}>
      <div style={S.hdr}>
        <h1 style={S.h1}>Resource Planner</h1>
        <div style={S.sub}>Portfolio resource planning — Skill Theme / Skill Detail hierarchy — 12 projects · 20 employees</div>
        <div style={S.tabs}>
          {TABS.map((t, i) => <button key={i} style={S.tab(tab === i)} onClick={() => setTab(i)}>{t}</button>)}
        </div>
      </div>
      <div style={S.body}>
        <div style={S.row}>
          <span style={S.lbl}>Horizon</span>
          <select style={S.sel} value={horizon} onChange={(e) => setHorizon(Number(e.target.value))}>
            {[3, 6, 9, 12].map((n) => <option key={n} value={n}>{n} months</option>)}
          </select>
          {tab === 0 && (
            <>
              <span style={S.lbl}>Theme</span>
              <select style={S.sel} value={themeFilter} onChange={(e) => setThemeFilter(e.target.value)}>
                <option value="All">All Themes</option>
                {Object.keys(SKILL_THEMES).map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </>
          )}
        </div>

        {tab === 0 && renderDemandCapacity()}
        {tab === 1 && renderPersonView()}
        {tab === 2 && renderProjectView()}
        {tab === 3 && renderSkillHeatmap()}
      </div>
    </div>
  );
}
