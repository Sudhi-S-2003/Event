"use client";
import { FC } from "react";

const events = [
  { id: 1, title: "Tech Conference", date: "2025-03-15", location: "NYC" },
  { id: 2, title: "Music Festival", date: "2025-06-20", location: "LA" }
];

const EventTable: FC = () => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full bg-white shadow-lg rounded-lg border border-gray-300">
        <thead className="bg-indigo-700 text-white">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Location</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr
              key={event.id}
              className={`border-b ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-200 transition-all`}
            >
              <td className="p-4 text-black">{event.title}</td>
              <td className="p-4 text-black">{event.date}</td>
              <td className="p-4 text-black">{event.location}</td>
              <td className="p-4 text-center">
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Edit
                </button>
                <span className="px-2 text-gray-500">|</span>
                <button className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
