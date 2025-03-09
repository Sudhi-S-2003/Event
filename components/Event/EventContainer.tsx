"use client";
import EventList from "./EventList";

const EventContainer: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <h1 className="text-3xl font-bold text-indigo-700 text-center mb-8">Upcoming Events</h1>
      <EventList />
    </div>
  );
};

export default EventContainer;
