"use client";
import { useState, FC } from "react";
import { toast } from "react-hot-toast";

const EventForm: FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    eventDate: "",
    location: "",
    description: "",
    type: "public", // Default to "public"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.eventDate || !formData.location || !formData.description) {
      toast.error("All fields are required!");
      return;
    }

    const eventData = {
      title: formData.title,
      description: formData.description,
      eventDate: new Date(formData.eventDate).toISOString(),
      location: formData.location,
      type: formData.type,
    };

    try {
      // You can replace this with actual API request to the backend
      const response = await fetch("/api/protected/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        toast.success("Event added successfully!");
        setFormData({ title: "", eventDate: "", location: "", description: "", type: "public" });
      } else {
        toast.error("Failed to add event!");
      }
    } catch (error) {
      toast.error("An error occurred while saving the event.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full border border-gray-300"
      >
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Add New Event</h2>

        {/* Event Title */}
        <div className="mb-4">
          <label className="block text-black font-medium mb-1">Event Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter event title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
          />
        </div>

        {/* Event Date */}
        <div className="mb-4">
          <label className="block text-black font-medium mb-1">Event Date</label>
          <input
            type="datetime-local"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
          />
        </div>

        {/* Event Location */}
        <div className="mb-4">
          <label className="block text-black font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
          />
        </div>

        {/* Event Description */}
        <div className="mb-4">
          <label className="block text-black font-medium mb-1">Event Description</label>
          <textarea
            name="description"
            placeholder="Enter event description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
            rows={4}
          />
        </div>

        {/* Event Type Dropdown */}
        <div className="mb-4">
          <label className="block text-black font-medium mb-1">Event Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
          >
            <option value="public">Public</option>
            <option value="private" disabled>Private</option>
          </select>
        </div>

        {/* Submit Button */}
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
