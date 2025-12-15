import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Announcements() {
  const navigate = useNavigate();
  const location = useLocation();

  const courseId = location.state?.courseId;

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const postAnnouncement = async () => {
    if (!courseId || !message) {
      alert("Missing data");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5200/api/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ courseId, message }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }

      alert("Announcement sent");
      navigate("/instructor/home");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Post Announcement</h2>

      <textarea
        placeholder="Write announcement..."
        value={message}
        onChange={e => setMessage(e.target.value)}
      />

      <button onClick={postAnnouncement} disabled={loading}>
        {loading ? "Posting..." : "Post Announcement"}
      </button>
    </div>
  );
}
