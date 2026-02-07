import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import AdminContentManager from "./AdminContentManager";
import AdminUserManager from "./AdminUserManager";
import "./admin.css";
import { API_ADMIN } from "../../services/apiBase";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("dashboard");
  const [superBusy, setSuperBusy] = useState(false);

  const [isSuperAdmin, setIsSuperAdmin] = useState(
    localStorage.getItem("isSuperAdmin") === "true"
  );
  const [activityQuery, setActivityQuery] = useState("");
  const [chatQuery, setChatQuery] = useState("");
  const [userQuery, setUserQuery] = useState("");
  const [providerFilter, setProviderFilter] = useState("all");
  const [usageRange, setUsageRange] = useState(14);

  const authHeaders = useMemo(
    () => ({
      Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`
    }),
    []
  );

  /* ================= ADMIN PROTECT ================= */
  useEffect(() => {
    const raw = localStorage.getItem("isAdmin");
    let isAdmin = false;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        isAdmin = parsed === true || parsed?.role === "admin";
      } catch {
        isAdmin = raw === "true";
      }
    }
    if (!isAdmin) {
      window.location.href = "/";
    }
  }, []);

  /* ================= LOAD STATS ================= */
  const loadStats = useCallback(async () => {
    try {
      const res = await axios.get(
        `${API_ADMIN}/stats`,
        { headers: authHeaders }
      );
      setStats(res.data);
    } catch (err) {
      console.error("Admin stats error", err);
    } finally {
      setLoading(false);
    }
  }, [authHeaders]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  /* ================= EXIT ADMIN ================= */
  const exitAdmin = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("isSuperAdmin");
    window.location.href = "/";
  };

  const unlockSuperAdmin = async () => {
    const secret = window.prompt("Enter Super Admin Key");
    if (!secret) return;
    try {
      const res = await axios.post(
        `${API_ADMIN}/verify-super`,
        { secret },
        { headers: authHeaders }
      );
      if (res.data?.success) {
        localStorage.setItem("isSuperAdmin", "true");
        if (res.data.token) {
          localStorage.setItem("adminToken", res.data.token);
        }
        setIsSuperAdmin(true);
        alert("Super Admin unlocked");
      } else {
        alert("Invalid Super Admin key");
      }
    } catch (err) {
      console.error("Super admin verify error", err);
      alert("Super Admin verification failed");
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        🧘 Loading Admin Consciousness…
      </div>
    );
  }

  if (!stats) {
    return (
      <div style={styles.loading}>
        ❌ Failed to load admin data
      </div>
    );
  }

  if (view === "content") {
    return <AdminContentManager onBack={() => setView("dashboard")} />;
  }

  if (view === "users") {
    return <AdminUserManager onBack={() => setView("dashboard")} />;
  }

  const providerUsage = stats.providerUsage || [];
  const dailyUsage = stats.dailyUsage || [];
  const contentCounts = stats.contentCounts || [];
  const contentStatusCounts = stats.contentStatusCounts || [];
  const recentUsers = stats.recentUsers || [];
  const recentChats = stats.recentChats || [];
  const adminActions = stats.adminActions || [];

  const pendingCount =
    contentStatusCounts.find((s) => s._id === "pending")?.count || 0;

  const filteredProviderUsage = providerFilter === "all"
    ? providerUsage
    : providerUsage.filter((p) => p._id === providerFilter);

  const filteredDailyUsage = dailyUsage.slice(-usageRange);

  const filteredActivity = (stats.recentActivity || []).filter((c) => {
    const matchProvider =
      providerFilter === "all" || (c.provider || "unknown") === providerFilter;
    const matchQuery =
      !activityQuery ||
      String(c.question || "").toLowerCase().includes(activityQuery.toLowerCase());
    return matchProvider && matchQuery;
  });

  const filteredChats = (recentChats || []).filter((c) => {
    const matchProvider =
      providerFilter === "all" || (c.provider || "unknown") === providerFilter;
    const matchQuery =
      !chatQuery ||
      String(c.question || "").toLowerCase().includes(chatQuery.toLowerCase());
    return matchProvider && matchQuery;
  });

  const filteredUsers = (recentUsers || []).filter((u) => {
    if (!userQuery) return true;
    const hay = `${u.name || ""} ${u.email || ""} ${u.role || ""}`.toLowerCase();
    return hay.includes(userQuery.toLowerCase());
  });

  const downloadFile = (name, content, type) => {
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportStats = () => {
    downloadFile(
      `admin-stats-${new Date().toISOString().slice(0, 10)}.json`,
      JSON.stringify(stats, null, 2),
      "application/json"
    );
  };

  const exportContentCsv = async () => {
    setSuperBusy(true);
    try {
      const res = await axios.get(
        `${API_ADMIN}/content`,
        { headers: authHeaders }
      );
      const rows = res.data || [];
      const header = [
        "type",
        "title",
        "slug",
        "status",
        "order",
        "createdAt",
      ];
      const csv = [
        header.join(","),
        ...rows.map((r) =>
          [
            r.type,
            r.title,
            r.slug,
            r.status,
            r.order,
            r.createdAt,
          ]
            .map((v) => `"${String(v || "").replace(/"/g, '""')}"`)
            .join(",")
        ),
      ].join("\n");
      downloadFile(
        `content-export-${new Date().toISOString().slice(0, 10)}.csv`,
        csv,
        "text/csv"
      );
    } catch (err) {
      console.error("Export content error", err);
      alert("Export failed");
    } finally {
      setSuperBusy(false);
    }
  };

  const approveAllPending = async () => {
    if (!window.confirm("Approve all pending content?")) return;
    setSuperBusy(true);
    try {
      const res = await axios.get(
        `${API_ADMIN}/content`,
        { headers: authHeaders }
      );
      const rows = (res.data || []).filter((r) => r.status === "pending");
      await Promise.all(
        rows.map((r) =>
          axios.put(
            `${API_ADMIN}/content/${r._id}`,
            { status: "approved" },
            { headers: authHeaders }
          )
        )
      );
      await loadStats();
    } catch (err) {
      console.error("Bulk approve error", err);
      alert("Bulk approve failed");
    } finally {
      setSuperBusy(false);
    }
  };

  return (
    <div className="admin-root-super" style={styles.root}>
      <div style={styles.header}>
        <div>
          <div style={styles.kicker}>AdiYogi Control</div>
          <h1 style={styles.title}>🕉 Admin Dashboard</h1>
          <div style={styles.subtitle}>
            Super admin controls, content governance, and live system insight
          </div>
        </div>
        <div style={styles.headerActions}>
          <button style={styles.ghostBtn} onClick={loadStats}>
            Refresh
          </button>
          <button style={styles.manageBtn} onClick={() => setView("content")}>
            Manage Content
          </button>
          {isSuperAdmin ? (
            <button style={styles.superBtn} onClick={() => setView("users")}>
              User Management
            </button>
          ) : (
            <button style={styles.superBtn} onClick={unlockSuperAdmin}>
              Unlock Super Admin
            </button>
          )}
        </div>
      </div>

      {/* STATS */}
      <div style={styles.cards}>
        <StatCard label="Total Users" value={stats.totalUsers} />
        <StatCard label="AI Conversations" value={stats.totalChats} />
        <StatCard
          label="Content Items"
          value={contentCounts.reduce((s, c) => s + (c.count || 0), 0)}
        />
        <StatCard label="Pending Review" value={pendingCount} />
      </div>

      {/* SUPER TOOLS */}
      <div style={styles.panel}>
        <div style={styles.panelHead}>
          <h3 style={styles.panelTitle}>Super Admin Tools</h3>
          {superBusy && <span style={styles.badge}>Working...</span>}
        </div>
        <div style={styles.tools}>
          <button style={styles.toolBtn} onClick={exportStats}>
            Export Stats JSON
          </button>
          <button style={styles.toolBtn} onClick={exportContentCsv}>
            Export Content CSV
          </button>
          <button style={styles.toolBtn} onClick={approveAllPending}>
            Approve All Pending
          </button>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div style={styles.panel}>
        <div style={styles.panelHead}>
          <h3 style={styles.panelTitle}>Recent AI Questions</h3>
          <input
            value={activityQuery}
            onChange={(e) => setActivityQuery(e.target.value)}
            placeholder="Filter questions"
            style={styles.inputSmall}
          />
        </div>

        {filteredActivity.length === 0 && (
          <p style={styles.muted}>No activity yet</p>
        )}

        {filteredActivity.map((c, i) => (
          <div key={i} style={styles.log}>
            <div style={styles.question}>??? {c.question}</div>
            <div style={styles.meta}>
              {c.provider || "unknown"} ???{" "}
              {new Date(c.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* PROVIDER USAGE */}
      <div style={styles.panel}>
        <div style={styles.panelHead}>
          <h3 style={styles.panelTitle}>AI Provider Usage</h3>
          <select
            value={providerFilter}
            onChange={(e) => setProviderFilter(e.target.value)}
            style={styles.selectSmall}
          >
            <option value="all">All Providers</option>
            {providerUsage.map((p) => (
              <option key={p._id || "unknown"} value={p._id || "unknown"}>
                {p._id || "unknown"}
              </option>
            ))}
          </select>
        </div>
        {filteredProviderUsage.length === 0 && (
          <p style={styles.muted}>No provider data yet</p>
        )}
        {filteredProviderUsage.length > 0 && (
          <BarChart data={filteredProviderUsage} />
        )}
      </div>

      {/* DAILY USAGE */}
      <div style={styles.panel}>
        <div style={styles.panelHead}>
          <h3 style={styles.panelTitle}>Daily AI Usage</h3>
          <select
            value={usageRange}
            onChange={(e) => setUsageRange(Number(e.target.value))}
            style={styles.selectSmall}
          >
            <option value={7}>Last 7 days</option>
            <option value={14}>Last 14 days</option>
            <option value={30}>Last 30 days</option>
          </select>
        </div>
        {filteredDailyUsage.length === 0 && (
          <p style={styles.muted}>No daily usage yet</p>
        )}
        {filteredDailyUsage.length > 0 && (
          <LineChart data={filteredDailyUsage} />
        )}
      </div>

      {/* RECENT USERS */}
      <div style={styles.panel}>
        <div style={styles.panelHead}>
          <h3 style={styles.panelTitle}>Recent Users</h3>
          <input
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Filter users"
            style={styles.inputSmall}
          />
        </div>
        {filteredUsers.length === 0 && (
          <p style={styles.muted}>No new users yet</p>
        )}
        {filteredUsers.map((u, i) => (
          <div key={i} style={styles.log}>
            <div style={styles.question}>
              {u.name || "User"} ??? {u.email || "no-email"}
            </div>
            <div style={styles.meta}>
              {u.role || "user"} ??? {new Date(u.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* RECENT CHATS */}
      <div style={styles.panel}>
        <div style={styles.panelHead}>
          <h3 style={styles.panelTitle}>Recent Chats</h3>
          <input
            value={chatQuery}
            onChange={(e) => setChatQuery(e.target.value)}
            placeholder="Filter chats"
            style={styles.inputSmall}
          />
        </div>
        {filteredChats.length === 0 && (
          <p style={styles.muted}>No chat logs yet</p>
        )}
        {filteredChats.map((c, i) => (
          <div key={i} style={styles.log}>
            <div style={styles.question}>??? {c.question}</div>
            <div style={styles.meta}>
              {c.provider || "unknown"} ??? {c.userId || "guest"} ??? {new Date(c.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* CONTENT COUNTS */}
      <div style={styles.panel}>
        <h3>Content Counts</h3>
        {contentCounts.length === 0 && (
          <p style={styles.muted}>No content yet</p>
        )}
        <div style={styles.contentGrid}>
          {contentCounts.map((c) => (
            <div key={c._id} style={styles.contentCard}>
              <div style={styles.contentLabel}>{c._id}</div>
              <div style={styles.contentValue}>{c.count || 0}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ADMIN ACTIONS */}
      <div style={styles.panel}>
        <h3>Admin Actions</h3>
        {adminActions.length === 0 && (
          <p style={styles.muted}>No admin actions yet</p>
        )}
        {adminActions.map((a, i) => (
          <div key={i} style={styles.log}>
            <div style={styles.question}>{a.action}</div>
            <div style={styles.meta}>
              {new Date(a.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* EXIT */}
      <button style={styles.exitBtn} onClick={exitAdmin}>
        🚪 Exit Admin Mode
      </button>
    </div>
  );
}

/* ================= STAT CARD ================= */
function StatCard({ label, value }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardLabel}>{label}</div>
      <div style={styles.cardValue}>{value}</div>
    </div>
  );
}

function BarChart({ data }) {
  const max = Math.max(1, ...data.map((d) => d.count || 0));
  const height = 160;
  const width = 520;
  const barGap = 16;
  const barWidth = Math.max(24, Math.floor((width - barGap * 2) / data.length));
  return (
    <div style={styles.chartWrap}>
      <svg viewBox={`0 0 ${width} ${height}`} style={styles.chartSvg}>
        {data.map((d, i) => {
          const h = Math.max(4, Math.round((d.count / max) * (height - 30)));
          const x = i * (barWidth + barGap) + barGap;
          const y = height - h - 16;
          return (
            <g key={d._id || i}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={h}
                rx={6}
                fill="#38bdf8"
              />
              <text x={x} y={height - 2} fontSize="10" fill="#94a3b8">
                {d._id || "unknown"}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function LineChart({ data }) {
  const max = Math.max(1, ...data.map((d) => d.count || 0));
  const height = 160;
  const width = 520;
  const padX = 30;
  const padY = 20;
  const points = data.map((d, i) => {
    const x = padX + (i / Math.max(1, data.length - 1)) * (width - padX * 2);
    const y =
      height -
      padY -
      Math.round((d.count / max) * (height - padY * 2));
    return `${x},${y}`;
  });
  return (
    <div style={styles.chartWrap}>
      <svg viewBox={`0 0 ${width} ${height}`} style={styles.chartSvg}>
        <polyline
          fill="none"
          stroke="#a78bfa"
          strokeWidth="3"
          points={points.join(" ")}
        />
        {data.map((d, i) => {
          const x = padX + (i / Math.max(1, data.length - 1)) * (width - padX * 2);
          const y =
            height -
            padY -
            Math.round((d.count / max) * (height - padY * 2));
          return <circle key={d._id?.day || i} cx={x} cy={y} r={3} fill="#c4b5fd" />;
        })}
      </svg>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  root: {
    minHeight: "100vh",
    padding: 28,
    background:
      "radial-gradient(1200px 500px at 10% -10%, rgba(56,189,248,0.18), transparent), radial-gradient(900px 420px at 90% 0%, rgba(167,139,250,0.16), transparent), linear-gradient(180deg, #050712, #020617)",
    color: "#e5e7eb",
    fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 26,
    padding: "14px 18px",
    borderRadius: 16,
    border: "1px solid rgba(148,163,184,0.16)",
    background: "rgba(2,6,23,0.6)",
    boxShadow: "0 12px 24px rgba(2,6,23,0.35)",
  },

  title: {
    margin: 0,
    letterSpacing: 1,
    fontSize: 26,
  },

  kicker: {
    textTransform: "uppercase",
    fontSize: 11,
    letterSpacing: 2,
    color: "#94a3b8",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 12,
    color: "#94a3b8",
  },

  headerActions: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    flexWrap: "wrap",
  },

  ghostBtn: {
    border: "1px solid rgba(148,163,184,0.35)",
    background: "transparent",
    color: "#e5e7eb",
    padding: "8px 12px",
    borderRadius: 10,
    cursor: "pointer",
  },

  superBtn: {
    border: "1px solid rgba(56,189,248,0.4)",
    background: "rgba(2,6,23,0.6)",
    color: "#7dd3fc",
    padding: "8px 12px",
    borderRadius: 10,
    cursor: "pointer",
  },

  manageBtn: {
    border: "1px solid rgba(148,163,184,0.4)",
    background: "transparent",
    color: "#e5e7eb",
    padding: "8px 14px",
    borderRadius: 12,
    cursor: "pointer",
  },

  loading: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    background: "#020617",
    color: "#e5e7eb",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 18,
    marginBottom: 28,
  },

  card: {
    background: "linear-gradient(135deg, rgba(15,23,42,0.85), rgba(2,6,23,0.9))",
    border: "1px solid rgba(148,163,184,0.18)",
    borderRadius: 18,
    padding: 22,
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(2,6,23,0.35)",
    backdropFilter: "blur(14px)",
  },

  cardLabel: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 6,
  },

  cardValue: {
    fontSize: 30,
    fontWeight: 700,
    color: "#7dd3fc",
  },

  panel: {
    background: "rgba(10,18,32,0.82)",
    border: "1px solid rgba(148,163,184,0.18)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 26,
    boxShadow: "0 14px 30px rgba(2,6,23,0.35)",
  },

  log: {
    borderBottom: "1px solid rgba(148,163,184,0.1)",
    padding: "10px 0",
  },

  question: {
    fontSize: 14,
  },

  meta: {
    fontSize: 11,
    color: "#94a3b8",
  },

  muted: {
    color: "#94a3b8",
    fontSize: 13,
  },

  panelHead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12,
  },

  panelTitle: {
    margin: 0,
  },

  badge: {
    fontSize: 12,
    padding: "4px 10px",
    borderRadius: 999,
    background: "rgba(56,189,248,0.15)",
    color: "#7dd3fc",
    border: "1px solid rgba(56,189,248,0.3)",
  },

  tools: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },

  toolBtn: {
    border: "1px solid rgba(148,163,184,0.35)",
    background: "rgba(2,6,23,0.6)",
    color: "#e5e7eb",
    padding: "8px 12px",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 12,
  },

  inputSmall: {
    minWidth: 180,
    background: "rgba(2,6,23,0.8)",
    border: "1px solid rgba(148,163,184,0.2)",
    borderRadius: 10,
    color: "#e5e7eb",
    padding: "6px 10px",
    fontSize: 12,
  },

  selectSmall: {
    minWidth: 160,
    background: "rgba(2,6,23,0.8)",
    border: "1px solid rgba(148,163,184,0.2)",
    borderRadius: 10,
    color: "#e5e7eb",
    padding: "6px 10px",
    fontSize: 12,
  },

  chartWrap: {
    width: "100%",
    overflowX: "auto",
  },

  chartSvg: {
    width: "100%",
    height: 180,
  },

  row: {
    display: "grid",
    gridTemplateColumns: "140px 1fr 60px",
    alignItems: "center",
    gap: 12,
    padding: "6px 0",
  },

  rowLabel: {
    fontSize: 12,
    color: "#cbd5f5",
  },

  rowValue: {
    fontSize: 12,
    textAlign: "right",
    color: "#cbd5f5",
  },

  barWrap: {
    height: 8,
    background: "rgba(148,163,184,0.2)",
    borderRadius: 999,
    overflow: "hidden",
  },

  bar: {
    height: "100%",
    background: "linear-gradient(90deg, #38bdf8, #0ea5e9)",
  },

  barAlt: {
    height: "100%",
    background: "linear-gradient(90deg, #a78bfa, #6366f1)",
  },

  contentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: 12,
  },

  contentCard: {
    background: "rgba(15,23,42,0.7)",
    border: "1px solid rgba(148,163,184,0.2)",
    borderRadius: 14,
    padding: 14,
    textAlign: "center",
  },

  contentLabel: {
    fontSize: 12,
    color: "#94a3b8",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  contentValue: {
    fontSize: 20,
    fontWeight: 700,
    color: "#22d3ee",
  },

  exitBtn: {
    width: "100%",
    padding: "14px 20px",
    borderRadius: 30,
    border: "none",
    background: "linear-gradient(135deg, #f97316, #ef4444)",
    color: "#0f172a",
    fontWeight: 700,
    letterSpacing: 0.3,
    cursor: "pointer",
    boxShadow: "0 10px 24px rgba(239,68,68,0.35)",
  },
};
