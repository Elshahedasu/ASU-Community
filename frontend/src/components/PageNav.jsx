import { useNavigate } from "react-router-dom";

export default function PageNav({ title }) {
  const navigate = useNavigate();

  return (
    <div className="page-nav">
      <button className="page-nav-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {title && <h2 className="page-nav-title">{title}</h2>}
    </div>
  );
}
