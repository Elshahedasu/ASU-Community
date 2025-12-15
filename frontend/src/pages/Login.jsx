import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5200/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        alert("Invalid email or password");
        return;
      }

      const data = await res.json();

      // ✅ SAVE TOKEN & USER
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ ROLE-BASED REDIRECT
      if (data.user.role === "student") {
        navigate("/home");
      } else if (data.user.role === "instructor") {
        navigate("/instructor/home");
      } else if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/login");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>

      <p>
        No account?{" "}
        <span className="link" onClick={() => navigate("/register")}>
          Register
        </span>
      </p>
    </div>
  );
}
