import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5200/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        alert("Invalid email or password");
        return;
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "student") {
        navigate("/home");
      } else if (data.user.role === "instructor") {
        navigate("/instructor/home");
      } else if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-form-container">
          <h2 className="auth-title">Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-button" onClick={handleLogin}>
            Login
          </button>

          <p className="auth-footer">
            No account?{" "}
            <span className="auth-link" onClick={() => navigate("/register")}>
              Register
            </span>
          </p>
        </div>

        <div className="auth-visual">
          <h3>Education Community</h3>
          <p>
            A collaborative learning platform where students and instructors
            connect, discuss topics, and share knowledge by course.
          </p>
        </div>

      </div>
    </div>
  );
}
