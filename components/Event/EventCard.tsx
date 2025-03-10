"use client";
import { FC } from "react";
import { format } from "date-fns";
import Image from "next/image";
export interface EventCardProps {
  _id: string;
  title: string;
  eventDate: string;
  location: string;
  description: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  allowedUsers: string[];
  image?: string;
}

const EventCard: FC<EventCardProps> = ({
  title,
  eventDate,
  location,
  description,
  type,
  createdAt,
  updatedAt,
  user,
  allowedUsers,
  image,
}) => {
  const formattedEventDate = format(new Date(eventDate), "MMMM dd, yyyy • hh:mm a");
  const formattedCreatedAt = format(new Date(createdAt), "MMMM dd, yyyy");
  const formattedUpdatedAt = format(new Date(updatedAt), "MMMM dd, yyyy");

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
      <Image
        src={image ? image : `https://placehold.co/600x400/edf2f7/4a5568?text=${encodeURIComponent(title)}`}
        alt={title}
        width={600}
        height={400}
        className="w-full h-48 object-cover"
      />


      <div className="p-5">
        <h3 className="text-xl font-bold text-indigo-700">{title}</h3>
        <p className="text-gray-600 text-sm flex items-center">
          📅 {formattedEventDate} &nbsp; | &nbsp; 📍 {location}
        </p>

        <p className="mt-2 text-gray-700">{description}</p>

        <div className="mt-4 text-sm text-gray-500">
          <p>🆔 Event ID: <span className="font-semibold">{user}</span></p>
          <p>📝 Type: <span className="font-semibold capitalize">{type}</span></p>
          <p>👤 Created At: {formattedCreatedAt} | 🔄 Updated At: {formattedUpdatedAt}</p>
          <p>👥 Allowed Users: {allowedUsers.length > 0 ? allowedUsers.join(", ") : "Public Event"}</p>
        </div>

        <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
