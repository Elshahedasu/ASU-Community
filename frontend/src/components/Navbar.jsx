import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <h2 className="logo">DB ASU Community</h2>

        <div className="nav-links">
          <Link to="/home" className="nav-link">
            Home
          </Link>

          <span
            className="nav-link disabled"
            onClick={() => navigate("/home")}
            title="Select a course first"
          >

          </span>

          <Link to="/profile" className="nav-link">
            Profile
          </Link>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
