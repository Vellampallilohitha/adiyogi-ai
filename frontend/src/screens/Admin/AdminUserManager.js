import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_ADMIN } from "../../services/apiBase";

const ROLE_OPTIONS = ["user", "admin", "superadmin"];

export default function AdminUserManager({ onBack }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState(null);

  const authHeaders = useMemo(
    () => ({
      Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`,
    }),
    []
  );

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_ADMIN}/users`, {
        headers: authHeaders,
      });
      setUsers(res.data || []);
    } catch (err) {
      console.error("User load error", err);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [authHeaders]);

  useEffect(() => {
    load();
  }, [load]);

  const setRole = async (userId, role) => {
    setBusyId(userId);
    try {
      await axios.put(
        `${API_ADMIN}/users/${userId}/role`,
        { role },
        { headers: authHeaders }
      );
      await load();
    } catch (err) {
      console.error("Role update error", err);
      alert("Role update failed");
    } finally {
      setBusyId(null);
    }
  };

  const filtered = users.filter((u) => {
    if (!query) return true;
    const hay = `${u.name || ""} ${u.email || ""} ${u.role || ""}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <div>
          <div style={styles.kicker}>Super Admin</div>
          <h2 style={styles.title}>User Management</h2>
        </div>
        <button style={styles.backBtn} onClick={onBack}>
          ← Back to Dashboard
        </button>
      </div>

      <div style={styles.tools}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users"
          style={styles.input}
        />
        <button style={styles.refreshBtn} onClick={load}>
          Refresh
        </button>
      </div>

      <div style={styles.panel}>
        {loading && <p style={styles.muted}>Loading users…</p>}
        {!loading && filtered.length === 0 && (
          <p style={styles.muted}>No users found</p>
        )}
        {!loading &&
          filtered.map((u) => (
            <div key={u._id} style={styles.row}>
              <div style={styles.rowInfo}>
                <div style={styles.rowTitle}>{u.name || "User"}</div>
                <div style={styles.rowMeta}>
                  {u.email || "no-email"} • {u.role || "user"} •{" "}
                  {new Date(u.createdAt).toLocaleString()}
                </div>
              </div>
              <div style={styles.rowActions}>
                {ROLE_OPTIONS.map((r) => (
                  <button
                    key={r}
                    style={{
                      ...styles.roleBtn,
                      opacity: u.role === r ? 1 : 0.6,
                    }}
                    onClick={() => setRole(u._id, r)}
                    disabled={busyId === u._id}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    padding: 24,
    color: "#e5e7eb",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  kicker: {
    textTransform: "uppercase",
    fontSize: 12,
    letterSpacing: 2,
    color: "#94a3b8",
  },
  title: {
    margin: 0,
  },
  backBtn: {
    border: "1px solid rgba(148,163,184,0.4)",
    background: "transparent",
    color: "#e5e7eb",
    padding: "8px 14px",
    borderRadius: 10,
    cursor: "pointer",
  },
  tools: {
    display: "flex",
    gap: 10,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    background: "rgba(2,6,23,0.8)",
    border: "1px solid rgba(148,163,184,0.2)",
    borderRadius: 10,
    color: "#e5e7eb",
    padding: "8px 10px",
  },
  refreshBtn: {
    background: "transparent",
    border: "1px solid rgba(148,163,184,0.4)",
    color: "#e5e7eb",
    padding: "8px 12px",
    borderRadius: 10,
    cursor: "pointer",
  },
  panel: {
    background: "rgba(10,18,32,0.82)",
    border: "1px solid rgba(148,163,184,0.18)",
    borderRadius: 16,
    padding: 16,
  },
  muted: {
    color: "#94a3b8",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    padding: "10px 0",
    borderBottom: "1px solid rgba(148,163,184,0.1)",
  },
  rowInfo: {
    flex: 1,
  },
  rowTitle: {
    fontWeight: 600,
  },
  rowMeta: {
    fontSize: 12,
    color: "#94a3b8",
  },
  rowActions: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
  },
  roleBtn: {
    border: "1px solid rgba(148,163,184,0.4)",
    background: "transparent",
    color: "#e5e7eb",
    padding: "6px 10px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 12,
  },
};
