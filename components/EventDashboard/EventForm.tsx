"use client";
import { useState, FC } from "react";
import { toast } from "react-hot-toast";

const EventForm: FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.location || !formData.description) {
      toast.error("All fields are required!");
      return;
    }
    toast.success("Event added successfully!");
    setFormData({ title: "", date: "", location: "", description: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full border border-gray-300"
      >
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Add New Event</h2>

        <div className="mb-4">
          <label className="block text-black font-medium mb-1">Event Title</label>
          <input 
            type="text" name="title" placeholder="Enter event title" value={formData.title} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black font-medium mb-1">Event Date</label>
          <input 
            type="date" name="date" value={formData.date} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black font-medium mb-1">Location</label>
          <input 
            type="text" name="location" placeholder="Enter location" value={formData.location} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black font-medium mb-1">Event Description</label>
          <textarea 
            name="description" placeholder="Enter event description" value={formData.description} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
            rows={4}
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Save Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;
