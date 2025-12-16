import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api"; // adjust path if needed

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await API.post("/api/auth/register", {
        _id: `U${Date.now()}`,
        name,
        email,
        password,
        role,
        institutionId: "I100",
      });

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-form-container">
          <h2 className="auth-title">Create Account</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="auth-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>

          <button className="auth-button" onClick={handleRegister}>
            Register
          </button>

          <p className="auth-footer">
            Already have an account?{" "}
            <span
              className="auth-link"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>

        <div className="auth-visual">
          <h3>Join the Community</h3>
          <p>
            Register to participate in course discussions, ask questions,
            and collaborate with instructors and peers.
          </p>
        </div>

      </div>
    </div>
  );
}
