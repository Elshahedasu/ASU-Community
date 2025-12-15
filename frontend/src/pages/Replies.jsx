import { useEffect, useState } from "react";
import { getRepliesByQuestion } from "../services/replyService";
import API from "../services/api";
import "../styles/app.css";

const Replies = ({ questionId }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [replies, setReplies] = useState([]);
  const [content, setContent] = useState("");

  const load = async () => {
    const data = await getRepliesByQuestion(questionId);
    setReplies(data);
  };

  useEffect(() => {
    load();
  }, [questionId]);

  // INSTRUCTOR ONLY: post reply
  const post = async (e) => {
    e.preventDefault();

    if (!user || user.role !== "instructor") {
      return;
    }

    await API.post("/api/replies", {
      _id: `R-${Date.now()}`,
      questionId,
      authorId: user._id,
      content,
    });

    setContent("");
    load();
  };

  return (
    <div style={{ marginLeft: "20px", marginTop: "10px" }}>
      {/* ✅ INSTRUCTOR ONLY: REPLY BOX */}
      {user?.role === "instructor" && (
        <form className="form" onSubmit={post}>
          <textarea
            className="textarea"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write your answer..."
            required
          />
          <button className="btn btn-primary">Post Answer</button>
        </form>
      )}

      {/* ✅ EVERYONE: SEE REPLIES */}
      {replies.length === 0 ? (
        <p style={{ color: "gray" }}>No answers yet</p>
      ) : (
        replies.map(r => (
          <div key={r._id} className={`list-item ${r.isBest ? "best" : ""}`}>
            <p>{r.content}</p>
            <p className="meta">Answered by: {r.authorId}</p>

            {r.isBest && <span className="best-badge">Best Answer</span>}
          </div>
        ))
      )}
    </div>
  );
};

export default Replies;
