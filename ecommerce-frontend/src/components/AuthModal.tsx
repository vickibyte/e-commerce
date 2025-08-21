import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { registerUser, loginUser, checkUsernameAvailability } from "../lib/api";


interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [loadingUsername, setLoadingUsername] = useState(false);
  const [error, setError] = useState("");

  const validatePassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  useEffect(() => {
    if (!isLogin && form.username.trim()) {
      const delayDebounce = setTimeout(async () => {
        setLoadingUsername(true);
        try {
          const exists = await checkUsernameAvailability(form.username.trim());
          setUsernameAvailable(!exists);
        } catch {
          setUsernameAvailable(null);
        }
        setLoadingUsername(false);
      }, 500);
      return () => clearTimeout(delayDebounce);
    }
  }, [form.username, isLogin]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        const res = await loginUser(form.email, form.password);
        localStorage.setItem("token", res.data.token);
        onClose();
      } else {
        if (!validatePassword(form.password)) {
          setError("Password must be at least 8 characters, include uppercase, lowercase, and a number.");
          return;
        }
        if (usernameAvailable === false) {
          setError("Username is already taken.");
          return;
        }
        const res = await registerUser(form);
        localStorage.setItem("token", res.data.token);
        onClose();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="auth-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="auth-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{type: "spring", stiffness: 300, damping: 25}}
          >
            <button
              onClick={onClose}
              className="auth-close"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-orange-500">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  />
                  <div>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={form.username}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                      required
                    />
                    {loadingUsername && (
                      <p className="text-sm text-gray-500">Checking...</p>
                    )}
                    {usernameAvailable === true && (
                      <p className="text-sm text-green-500">Username available</p>
                    )}
                    {usernameAvailable === false && (
                      <p className="text-sm text-red-500">Username taken</p>
                    )}
                  </div>
                </>
              )}

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-sm text-orange-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </form>

            <p className="auth-switch">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                className="text-orange-500 font-medium"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
