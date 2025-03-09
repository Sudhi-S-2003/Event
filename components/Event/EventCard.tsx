"use client";
import { FC } from "react";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

const EventCard: FC<EventCardProps> = ({ title, date, location, description, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-indigo-700">{title}</h3>
        <p className="text-sm text-gray-600">{date} • {location}</p>
        <p className="mt-2 text-gray-700 text-sm">{description}</p>
        <button className="mt-3 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
