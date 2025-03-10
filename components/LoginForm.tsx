"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";

interface LoginData {
  identifier: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const validateIdentifier = (identifier: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/; // Assumes 10-digit phone numbers
    return emailRegex.test(identifier) || phoneRegex.test(identifier);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginData.identifier || !loginData.password) {
      toast.error("All fields are required!");
      return;
    }

    if (!validateIdentifier(loginData.identifier)) {
      toast.error("Invalid email or phone number!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed!");
      }

      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">Login</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Identifier (Email or Phone) */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Email or Phone</label>
          <input
            type="text"
            name="identifier"
            value={loginData.identifier}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none text-black"
            placeholder="Enter your email or phone"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none text-black"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500 hover:text-indigo-500"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white font-semibold py-2 rounded-lg hover:bg-indigo-600 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-indigo-500 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
