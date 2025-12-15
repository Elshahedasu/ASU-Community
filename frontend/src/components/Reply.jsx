import { useState } from "react";
import API from "../services/api";

export default function Reply({ questionId, onSuccess }) {
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;

  const [content, setContent] = useState("");

  const handleSendReply = async () => {
    if (!content.trim() || !user) return;

    try {
      await API.post("/api/replies", {
        _id: `R-${Date.now()}`,
        questionId,
        authorId: user._id,
        content,
      });

      setContent("");
      onSuccess();
    } catch {
      alert("Failed to send reply");
    }
  };

  return (
    <div className="reply-card">
      <textarea
        className="reply-input"
        placeholder="Write a reply..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="reply-actions">
        <button className="btn primary" onClick={handleSendReply}>
          Reply
        </button>
      </div>
    </div>
  );
}
