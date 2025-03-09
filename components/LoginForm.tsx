"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";

interface LoginData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      toast.error("All fields are required!");
      return;
    }

    if (!validateEmail(loginData.email)) {
      toast.error("Invalid email address!");
      return;
    }

    if (loginData.password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    setTimeout(() => {
      toast.success("Login successful!");
      setLoginData({ email: "", password: "" });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">Login</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Email</label>
          <input 
            type="email" 
            name="email" 
            value={loginData.email} 
            onChange={handleChange} 
            className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none text-black" 
            placeholder="Enter your email" 
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
              className="absolute right-2 top-2 text-gray-500 hover:text-indigo-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-indigo-500 text-white font-semibold py-2 rounded-lg hover:bg-indigo-600 transition">
          Login
        </button>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="text-indigo-500 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
