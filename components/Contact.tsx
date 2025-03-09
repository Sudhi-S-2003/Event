"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("All fields are required!");
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    setTimeout(() => {
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <div className="min-h-[90dvh] flex flex-col items-center justify-center bg-gray-50 px-6 py-10">
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">Contact Us</h2>

      {/* Contact Info */}
      <div className="text-center mb-6">
        <p className="text-lg text-gray-700">
          Email: <a href="mailto:sudhiselampa19@gmail.com" className="text-indigo-500 hover:underline">sudhiselampa19@gmail.com</a>
        </p>
        <p className="text-lg text-gray-700">
          Phone: <a href="tel:+91 9048197645" className="text-indigo-500 hover:underline">+91 9048197645</a>
        </p>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold">Your Name</label>
          <input 
            type="text" 
            id="name"
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none text-black" 
            placeholder="Enter your name"
            required 
            aria-label="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold">Your Email</label>
          <input 
            type="email" 
            id="email"
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none text-black" 
            placeholder="Enter your email"
            required 
            aria-label="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-semibold">Message</label>
          <textarea 
            id="message"
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none text-black resize-none" 
            rows={4} 
            placeholder="Enter your message"
            required 
            aria-label="Enter your message"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-indigo-500 text-white font-semibold py-2 rounded-lg hover:bg-indigo-600 transition cursor-pointer"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactSection;
