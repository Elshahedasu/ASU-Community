import { useEffect, useState } from "react";
import API from "../services/api";

const Notifications = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [notifications, setNotifications] = useState([]);

  // ======================
  // LOAD NOTIFICATIONS
  // ======================
  const load = async () => {
    if (!user) return;

    const res = await API.get("/api/notifications", {
      params: { userId: user._id }   // ✅ REQUIRED
    });

    setNotifications(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  // ======================
  // MARK AS READ
  // ======================
const markRead = async (id) => {
  await API.patch(`/api/notifications/${id}/read`, {
    userId: user._id
  });
  load();
};


  // ======================
  // DELETE NOTIFICATION
  // ======================
  const remove = async (id) => {
  await API.delete(`/api/notifications/${id}`, {
    data: { userId: user._id }
  });
  load();
};

  return (
    <div className="page-container">
      <h2 className="section-title">Notifications</h2>

      {notifications.length === 0 && (
        <p style={{ color: "gray" }}>No notifications</p>
      )}

      {notifications.map(n => (
        <div
          key={n._id}
          style={{
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "6px",
            background: n.read ? "#f2f2f2" : "#dff0ff",
            border: "1px solid #ccc"
          }}
        >
          <p style={{ marginBottom: "8px" }}>{n.payload}</p>

          {!n.read && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => markRead(n._id)}
              style={{ marginRight: "10px" }}
            >
              Mark as read
            </button>
          )}

          <button
            className="btn btn-danger btn-sm"
            onClick={() => remove(n._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
