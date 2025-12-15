import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

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
    <div className="page-container">
      <h2 className="section-title">Course Questions</h2>

      <div className="list">
        {questions.map(q => (
          <div key={q._id} className="list-item">
            <p><strong>{q.content}</strong></p>
            <p className="meta">Asked by: {q.authorId}</p>

            <button
              className="btn btn-primary"
              onClick={() =>
                navigate(`/questions/${q.threadId}`, {
                  state: { highlightQuestionId: q._id },
                })
              }
            >
              Answer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorQuestions;
