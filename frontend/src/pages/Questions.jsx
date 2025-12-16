import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestionsByThread } from "../services/questionService";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Replies from "../pages/Replies";

const Questions = () => {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [questions, setQuestions] = useState([]);
  const [content, setContent] = useState("");

  const loadQuestions = async () => {
    const data = await getQuestionsByThread(threadId);
    setQuestions(data);
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

  return (
    <>
      <Navbar />

      <div className="questions-page">
        <div className="questions-card">

          <div className="card-header page-nav-style">
            <button
              className="page-nav-back"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
            <h2 className="page-nav-title">Questions</h2>
          </div>

          {user?.role === "student" && (
            <form className="question-form-card" onSubmit={postQuestion}>
              <textarea
                className="form-textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Ask a question..."
                required
              />
              <div className="form-actions">
                <button className="btn primary">Post Question</button>
              </div>
            </form>
          )}

          <div className="question-card-list">
            {questions.map((q) => (
              <div key={q._id} className="question-card">
                <div className="question-header">
                  <p className="question-content">{q.content}</p>
                  <p className="question-meta">
                    Asked by: {q.authorId}
                  </p>
                </div>

                {/* Replies + notifications logic is inside Replies */}
                <Replies questionId={q._id} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default Questions;
