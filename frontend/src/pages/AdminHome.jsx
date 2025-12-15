import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../services/api";


const AdminHome = () => {
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;

  /* ======================
     STATE
  ====================== */
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);

  /* ======================
     LOAD ADMIN DATA
  ====================== */
  useEffect(() => {
    if (!user || user.role !== "admin") return;

    API.get("/api/reports")
      .then(res => setReports(res.data))
      .catch(console.error);

    API.get("/api/users")
      .then(res => setUsers(res.data))
      .catch(console.error);

    API.get("/api/activity-logs")
      .then(res => setLogs(res.data))
      .catch(console.error);
  }, [user]);

  /* ======================
     AUTH GUARD
  ====================== */
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  /* ======================
     TOGGLE USER STATUS
  ====================== */
  const toggleUserStatus = async (id, currentStatus) => {
    await API.patch(`/api/users/${id}/status`, {
      status: currentStatus === "active" ? "inactive" : "active",
    });

    setUsers(prev =>
      prev.map(u =>
        u._id === id
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u
      )
    );
  };

  /* ======================
     RESOLVE REPORT
  ====================== */
  const resolveReport = async (id) => {
    await API.patch(`/api/reports/${id}`, { status: "resolved" });

    setReports(prev =>
      prev.map(r =>
        r._id === id ? { ...r, status: "resolved" } : r
      )
    );
  };

  return (
    <>

      <div className="page-container">

        {/* ================= USERS ================= */}
        <section className="admin-section">
          <h3 className="section-title">User Management</h3>

          <div className="admin-card-grid">
            {users.map(u => (
              <div key={u._id} className="admin-card">
                <p><strong>{u.name}</strong></p>
                <p>{u.email}</p>
                <p>Role: {u.role}</p>
                <p>
                  Status:{" "}
                  <span className={`status ${u.status}`}>
                    {u.status}
                  </span>
                </p>

                <button
                  className="btn warning"
                  onClick={() => toggleUserStatus(u._id, u.status)}
                >
                  {u.status === "active" ? "Deactivate" : "Activate"}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ================= REPORTS ================= */}
        <section className="admin-section">
          <h3 className="section-title">Reported Content</h3>

          <div className="admin-card-grid">
            {reports.map(r => (
              <div key={r._id} className="admin-card">
                <p><strong>Target:</strong> {r.targetType}</p>
                <p><strong>Reason:</strong> {r.reason}</p>
                <p>
                  Status:{" "}
                  <span className={`status ${r.status}`}>
                    {r.status}
                  </span>
                </p>

                {r.status === "pending" && (
                  <button
                    className="btn success"
                    onClick={() => resolveReport(r._id)}
                  >
                    Mark Resolved
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ================= ACTIVITY LOGS ================= */}
        <section className="admin-section">
          <h3 className="section-title">Activity Logs</h3>

          <div className="admin-log-list">
            {logs.map(log => (
              <div key={log._id} className="admin-log">
                <p>
                  <strong>{log.actionType}</strong> by {log.userID}
                </p>
                <p className="log-detail">{log.detail}</p>
                <p className="log-time">{log.createdAt}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminHome;
