import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

const InstructorQuestions = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    API.get(`/api/questions/course/${courseId}`)
      .then(res => setQuestions(res.data))
      .catch(console.error);
  }, [courseId]);

  return (
    <>
      <Navbar />

      <div className="instructor-questions-page">
        <div className="instructor-questions-card">

          {/* 🔙 CARD HEADER – SAME STYLE EVERYWHERE */}
          <div className="card-header page-nav-style">
            <button
              className="page-nav-back"
              onClick={() => navigate("/instructor/home")}
            >
              ← Back
            </button>

            <h2 className="page-nav-title">Course Questions</h2>
          </div>

          {questions.length === 0 ? (
            <p className="empty-text">No questions for this course.</p>
          ) : (
            <div className="instructor-question-grid">
              {questions.map(q => (
                <div key={q._id} className="instructor-question-card">
                  <div className="question-info">
                    <p className="question-text">{q.content}</p>
                    <p className="question-meta">
                      Asked by: {q.authorId}
                    </p>
                  </div>

                  <div className="question-actions">
                    <button
                      className="btn primary"
                      onClick={() =>
                        navigate(`/questions/${q.threadId}`, {
                          state: { highlightQuestionId: q._id },
                        })
                      }
                    >
                      Answer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default InstructorQuestions;
