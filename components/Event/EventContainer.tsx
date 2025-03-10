"use client";
import { FC, useState, useEffect } from "react";
import EventList from "./EventList";

interface EventContainerProps {
  type: string;
}

const EventContainer: FC<EventContainerProps> = ({ type }) => {
  const [loading, setLoading] = useState(false);
  const [eventsData, setEventYourData] = useState<any>({});
  const [error, setError] = useState("");

  // Fetch events based on the type passed in as a prop
  const fetchEvents = async (type: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/events?type=${type}`);

      if (!res.ok) throw new Error(`Failed to fetch ${type} events`);

      const { events } = await res.json();
      setEventYourData((prev) => ({ ...prev, [type]: events }));
      setError("");
    } catch (error) {
      console.error(`❌ Error fetching ${type} events:`, error);
      setError(`⚠️ Failed to load ${type} events. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (type) {
      fetchEvents(type);
    }
  }, [type]); // Fetch events when 'type' changes

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      {/* <h1 className="text-3xl font-bold text-indigo-700 text-center mb-8">
        {type.toUpperCase()} Events
      </h1> */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <EventList EventData={eventsData[type] || []} />
    </div>
  );
};

export default EventContainer;
