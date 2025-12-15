import { useState } from "react";
import API from "../services/api";

export default function Reply({ questionId, onSuccess }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [content, setContent] = useState("");

  const sendReply = async () => {
    if (!content.trim()) return;

    await API.post("/api/replies", {
      _id: `R-${Date.now()}`,
      questionId,
      authorId: user._id,
      content,
    });

    setContent("");
    onSuccess(); // reload questions + replies
  };

  return (
    <div className="reply-box">
      <textarea
        placeholder="Write a reply..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={sendReply}>Reply</button>
    </div>
  );
}
