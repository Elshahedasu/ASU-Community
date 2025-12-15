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

  /* ======================
     POST REPLY
     ====================== */
  const post = async (e) => {
    e.preventDefault();
    if (!user || !content.trim()) return;

    await API.post("/api/replies", {
      _id: `R-${Date.now()}`,
      questionId,
      authorId: user._id,
      content,
    });

    setContent("");
    load();
  };

  /* ======================
     VOTE (LIKE) REPLY
     ====================== */
  const vote = async (replyId) => {
    if (!user) return;

    try {
      await API.post("/api/votes/reply", {
        _id: `V-${Date.now()}`,
        userId: user._id,
        replyId,
        voteType: "upvote", // MUST MATCH ENUM
      });

      load();
    } catch (err) {
      alert("You already voted");
    }
  };

  return (
    <div style={{ marginLeft: "20px", marginTop: "10px" }}>
      {/* REPLY BOX */}
      {user && (
        <form onSubmit={post}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a reply..."
            required
          />
          <button type="submit">Reply</button>
        </form>
      )}

      {/* REPLIES */}
      {replies.map((r) => (
        <div
          key={r._id}
          style={{
            border: r.isBest ? "2px solid green" : "1px solid #ccc",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <p>{r.content}</p>
          <small>By: {r.authorId}</small>

          <div style={{ marginTop: "5px" }}>
            {/* 👍 LIKE / VOTE */}
            {user && (
              <button onClick={() => vote(r._id)}>
                👍 Like ({r.upvotes || 0})
              </button>
            )}

            {/* BEST ANSWER */}
            {r.isBest && (
              <span style={{ marginLeft: "10px", color: "green" }}>
                ✔ Best Answer
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Replies;
