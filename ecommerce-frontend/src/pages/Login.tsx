/**
 * @license MIT
 * @copyright 2025 Bukola David
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../lib/api";
import { useAuth } from "../context/AuthContext";



export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const { data } = await loginUser(email, password);

    // Use context to save both user and token
    login(data.user, data.token);

    toast.success(`Welcome ${data.user.username}!`);

    // Redirect based on role
    if (data.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/"); // or home/dashboard
    }
  } catch (err: any) {
    toast.error(err?.response?.data?.message || "Login failed!!");
  }
};


  return (
    <div className="login-container" style={{ maxWidth: 400, margin: "auto", padding: "2rem" }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

