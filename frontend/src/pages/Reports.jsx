import { useEffect, useState } from "react";
import API from "../services/api";

export default function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    API.get("/api/reports/replies")
      .then(res => setReports(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="page-container">
      <h2 className="section-title">Reported Replies</h2>

      {reports.length === 0 && <p>No reported replies</p>}

      <div className="list">
        {reports.map(r => (
          <div key={r._id} className="list-item">
            <p><strong>Reason:</strong> {r.reason}</p>
            <p><strong>Target Reply ID:</strong> {r.targetId}</p>
            <p><strong>Status:</strong> {r.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
