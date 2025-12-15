import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const register = async () => {
    if (!name || !email || !password) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5200/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: `U${Date.now()}`, // simple ID generation
          name,
          email,
          password,
          role,
          institutionId: "I100",
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Registration failed");
        return;
      }

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="instructor">Instructor</option>
      </select>

      <button onClick={register}>Register</button>

      <p>
        Already have an account?{" "}
        <span className="link" onClick={() => navigate("/login")}>
          Login
        </span>
      </p>
    </div>
  );
}
