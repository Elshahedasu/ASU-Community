import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/app.css";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">DB Forum</h2>

      <div className="nav-links">
        {/* Home */}
        <Link to="/home" className="nav-link">
          Home
        </Link>

        {/* Disabled Threads (must select course first) */}
        <span
          className="nav-link disabled"
          onClick={() => navigate("/home")}
          title="Select a course first"
        >
          Threads
        </span>

        {/* Profile */}
        <Link to="/profile" className="nav-link">
          Profile
        </Link>

        {/* Logout */}
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
