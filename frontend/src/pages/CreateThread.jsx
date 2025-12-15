import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CreateThread() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ courseId passed from InstructorHome
  const courseID = location.state?.courseId;

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  const createThread = async () => {
    if (!courseID) {
      alert("Course context missing. Go back and select a course.");
      return;
    }

    if (!title) {
      alert("Thread title is required");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("You must be logged in");
      return;
    }

    setLoading(true);

    const body = {
      _id: `T-${Date.now()}`,
      courseId: courseID,
      title,
      creatorId: user._id,
      tags: tags ? tags.split(",").map(t => t.trim()) : [],
    };

    try {
      const res = await fetch("http://localhost:5200/api/threads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create thread");
      }

      const thread = await res.json();
      navigate(`/threads/${thread.courseId}`);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-thread-container">
      <h2>Create New Thread</h2>

      {/* ✅ Course context (read-only, optional but clear) */}
      <p><strong>Course ID:</strong> {courseID}</p>

      <input
        placeholder="Thread Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea placeholder="Short description (optional)" />

      <input
        placeholder="Tags (e.g. MongoDB, Database Design)"
        value={tags}
        onChange={e => setTags(e.target.value)}
      />

      <button onClick={createThread} disabled={loading}>
        {loading ? "Creating..." : "Create Thread"}
      </button>
    </div>
  );
}
