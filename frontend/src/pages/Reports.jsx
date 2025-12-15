import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../services/api";
import PageNav from "../components/PageNav";

export default function Reports() {
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;

  /* ======================
     STATE
  ====================== */
  const [reports, setReports] = useState([]);

  /* ======================
     FETCH REPORTS
  ====================== */
  useEffect(() => {
    if (!user) return;

    API.get("/api/reports/replies")
      .then(res => setReports(res.data))
      .catch(err => console.error(err));
  }, [user]);

  /* ======================
     AUTH GUARD
  ====================== */
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="page-container">
      <PageNav title="Reported Replies" />

      {reports.length === 0 ? (
        <p className="empty-text">No reported replies.</p>
      ) : (
        <div className="report-card-grid">
          {reports.map(report => (
            <div key={report._id} className="report-card">
              <div className="report-info">
                <p>
                  <strong>Reason:</strong> {report.reason}
                </p>
                <p>
                  <strong>Target Reply ID:</strong> {report.targetId}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`report-status ${report.status}`}>
                    {report.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
