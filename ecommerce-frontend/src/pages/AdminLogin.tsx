/**
 * @license MIT
 * @copyright 2025 Bukola David
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../lib/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await
      loginUser(email, password);

      // ensure user is admin
      if (data?.user?.role !== "admin"){
        toast.error("Acess denied. Admin only!");
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      toast.success("Welcome, admin!");
      navigate("/admin");  
  } catch (err: any){

    toast.error(err?.response?.data?.message 
      || "Login failed!!");
  }
};

  return (
    <div className="login-page">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
