import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle state
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const res = login(email, password);
    if (res.success) {
      if (res.role === "user") navigate("/user-dashboard");
      else if (res.role === "delivery") navigate("/delivery-dashboard");
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-sky-100 to-white">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-center text-xl font-semibold text-sky-700">Login</h2>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"} // 👈 toggle type
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"} {/* Simple eye emoji */}
          </span>
        </div>

        <Button
          onClick={handleLogin}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white"
        >
          Login
        </Button>

        <p className="text-center text-sm text-gray-500 mt-2">
          Not registered yet?{" "}
          <span
            className="text-sky-500 hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
