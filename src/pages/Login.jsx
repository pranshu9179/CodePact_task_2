import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const res = login(email, password);
    if (res.success) {
      if (res.role === "user") navigate("/user-dashboard");
      else navigate("/delivery-dashboard");
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-white px-4">
      <div className="bg-white p-6 rounded-3xl shadow-xl w-full max-w-sm space-y-4 animate-fadeIn">
        <h2 className="text-center text-2xl font-bold text-sky-700">Login</h2>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-sky-200 rounded-lg px-3 h-10 focus:ring-2 focus:ring-sky-300 transition"
        />

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-sky-200 rounded-lg px-3 h-10 focus:ring-2 focus:ring-sky-300 transition"
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <Button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-semibold py-2.5 rounded-xl transition-all duration-300"
        >
          Login
        </Button>

        <p className="text-center text-gray-500 text-sm">
          Not registered yet?{" "}
          <span
            className="text-sky-600 hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
