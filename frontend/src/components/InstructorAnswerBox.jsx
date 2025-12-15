import { useState } from "react";
import API from "../services/api";

export default function InstructorAnswerBox({ questionId }) {
  const [reply, setReply] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const submit = async () => {
    if (!reply.trim()) return;

    await API.post("/api/replies", {
      _id: `R-${Date.now()}`,
      questionId,
      authorId: user._id,
      content: reply,
    });

    setReply("");
    alert("Answer posted");
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <textarea
        placeholder="Write your answer..."
        value={reply}
        onChange={e => setReply(e.target.value)}
      />
      <button onClick={submit}>Post Answer</button>
    </div>
  );
}
