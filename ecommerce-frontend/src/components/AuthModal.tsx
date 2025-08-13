import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loginUser, registerUser, checkUsernameExists } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login } = useContext(AuthContext);

  const validatePassword = (value: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(value)) {
      setPasswordError(
        "Must have uppercase, lowercase, number, special char, min 8 chars"
      );
    } else {
      setPasswordError("");
    }
    setPassword(value);
  };

  const handleUsernameBlur = async () => {
    if (!username) return;
    try {
      const exists = await checkUsernameExists(username);
      setUsernameError(exists ? "Username already taken" : "");
    } catch {
      setUsernameError("Error checking username");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        const res = await loginUser(email, password);
        login(res.data.token);
      } else {
        if (usernameError || passwordError) return;
        await registerUser(firstName, lastName, username, email, password);
        const res = await loginUser(email, password);
        login(res.data.token);
      }
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
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
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <button
              className="auth-close"
              onClick={onClose}
            >
              ✖
            </button>

            <div className="h-full relative">
              <AnimatePresence mode="wait">
                {isLogin ? (
                  <motion.div
                    key="login"
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "-100%", opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2 className="text-2xl font-bold mb-4">Login</h2>
                    {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border p-2 rounded"
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border p-2 rounded"
                      />
                      <button
                        type="submit"
                        className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
                      >
                        Login
                      </button>
                    </form>

                    <p className="auth-switch">
                      New here?{" "}
                      <span
                        className="text-orange-500 cursor-pointer"
                        onClick={() => setIsLogin(false)}
                      >
                        Register
                      </span>
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="register"
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className=""
                  >
                    <h2 className="text-2xl font-bold mb-4">Register</h2>
                    {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                       
                      />
                      <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={handleUsernameBlur}
                        required
                        className={`w-full border p-2 rounded ${
                          usernameError ? "border-red-500" : ""
                        }`}
                      />
                      {usernameError && (
                        <p className="text-red-500 text-xs">{usernameError}</p>
                      )}

                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => validatePassword(e.target.value)}
                        required
                        className={`w-full border p-2 rounded ${
                          passwordError ? "border-red-500" : ""
                        }`}
                      />
                      {passwordError && (
                        <p className="text-red-500 text-xs">{passwordError}</p>
                      )}

                      <button
                        type="submit"
                        className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
                      >
                        Register
                      </button>
                    </form>

                    <p className="mt-4 text-sm text-center">
                      Already have an account?{" "}
                      <span
                        className="text-orange-500 cursor-pointer"
                        onClick={() => setIsLogin(true)}
                      >
                        Login
                      </span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
