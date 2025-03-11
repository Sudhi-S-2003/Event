"use client";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  number: string | undefined;
  password: string;
  phoneNumber?: {
    code: string;
    value: string;
  }
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", number: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateNumber = (number: string) => /^[0-9]{10}$/.test(number);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.number || !formData.password) {
      toast.error("All fields are required!");
      return;
    }
    if (formData.name.length < 3) {
      toast.error("name must be at least 3 characters!");
      return;
    }
    if (!validateEmail(formData.email)) {
      toast.error("Invalid email address!");
      return;
    }

    if (!validateNumber(formData.number)) {
      toast.error("Invalid phone number! Must be 10 digits.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }
    try {
      formData.phoneNumber = { value: formData.number, code: "+91" }
      formData.number = undefined;
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data)
    }
    catch (e) {
      const message = (typeof e === "object" && e !== null && "error" in e)
        ? (e as { error?: string }).error
        : "unable to create";
      toast.error(message || "unable to create");
    }

    // setTimeout(() => {
    //   toast.success("Registered successfully!");
    //   setFormData({ name: "", email: "", number: "", password: "" });
    // }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">Register</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none text-black"
            placeholder="Enter your name"
            autoComplete="name"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none text-black"
            placeholder="Enter your email"
            autoComplete="email"
            required
          />
        </div>

        {/* Number */}
        <div className="mb-4">
          <label htmlFor="number" className="block text-gray-700 font-semibold">Phone Number</label>
          <input
            type="tel"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none text-black"
            placeholder="Enter your phone number"
            autoComplete="tel"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none text-black"
              placeholder="Enter your password"
              autoComplete="new-password"
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

        <button type="submit" className="w-full bg-indigo-500 text-white font-semibold py-2 rounded-lg hover:bg-indigo-600 transition">
          Register
        </button>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-500 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
