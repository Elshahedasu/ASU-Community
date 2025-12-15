import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionsByThread } from "../services/questionService";
import { getRepliesByQuestion } from "../services/replyService";
import API from "../services/api";
import "../styles/app.css";
import Reply from "../components/Reply";

const Questions = () => {
  const { threadId } = useParams();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [questions, setQuestions] = useState([]);
  const [content, setContent] = useState("");
  const [repliesMap, setRepliesMap] = useState({}); // questionId → replies[]

  /* ======================
     LOAD QUESTIONS
     ====================== */
  const loadQuestions = async () => {
    const data = await getQuestionsByThread(threadId);
    setQuestions(data);

    const repliesData = {};
    for (const q of data) {
      repliesData[q._id] = await getRepliesByQuestion(q._id);
    }
    setRepliesMap(repliesData);
  };

  useEffect(() => {
    loadQuestions();
  }, [threadId]);

  /* ======================
     STUDENT: ASK QUESTION
     ====================== */
  const postQuestion = async (e) => {
    e.preventDefault();

    if (!user || user.role !== "student") {
      alert("Only students can ask questions");
      return;
    }

    if (!content.trim()) return;

    const threadRes = await API.get(`/api/threads/${threadId}`);
    const courseId = threadRes.data.courseId;

    await API.post("/api/questions", {
      _id: `Q-${Date.now()}`,
      threadId,
      courseId,
      authorId: user._id,
      content,
    });

    setContent("");
    loadQuestions();
  };

  /* ======================
     REPORT REPLY
     ====================== */
  const reportReply = async (replyId) => {
    if (!user) {
      alert("You must be logged in");
      return;
    }

    try {
      await API.post("/api/reports", {
  reporterId: user._id,        // ✅ ADD THIS
  targetId: replyId,
  targetType: "reply",
  reason: "Inappropriate content",
});


      alert("Reply reported successfully");
    } catch (err) {
      alert("Failed to report reply");
      console.error(err);
    }
  };

  return (
    <div className="page-container">
      <h2 className="section-title">Questions</h2>

      {/* STUDENT: ASK QUESTION */}
      {user?.role === "student" && (
        <form className="form" onSubmit={postQuestion}>
          <textarea
            className="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Ask a question..."
            required
          />
          <button className="btn btn-primary">Post</button>
        </form>
      )}

      {/* QUESTIONS + REPLIES */}
      <div className="list">
        {questions.map((q) => (
          <div key={q._id} className="list-item">
            <strong>{q.content}</strong>
            <p className="meta">Author: {q.authorId}</p>

            {/* SHOW REPLIES */}
            {repliesMap[q._id]?.map((r) => (
              <div
                key={r._id}
                className={`reply ${r.isBest ? "best" : ""}`}
              >
                <p>{r.content}</p>
                <span className="meta">
                  Answered by: {r.authorId}
                </span>

                {/* ✅ REPORT BUTTON */}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => reportReply(r._id)}
                >
                  Report
                </button>
              </div>
            ))}

            {/* BOTH STUDENT & INSTRUCTOR CAN REPLY */}
            {user && (
              <Reply
                questionId={q._id}
                onSuccess={loadQuestions}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;
