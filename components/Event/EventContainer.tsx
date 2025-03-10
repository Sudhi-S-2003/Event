"use client";
import { FC, useState, useEffect } from "react";
import EventList from "./EventList";

// Define the Event type based on your event data structure
export interface Event {
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

interface EventContainerProps {
  type: string;
}

const EventContainer: FC<EventContainerProps> = ({ type }) => {
  const [loading, setLoading] = useState(false);
  const [eventsData, setEventYourData] = useState<{ [key: string]: Event[] }>({});
  const [error, setError] = useState("");

  const fetchEvents = async (type: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/events?type=${type}`);

      if (!res.ok) throw new Error(`Failed to fetch ${type} events`);

      const { events }: { events: Event[] } = await res.json();
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
  }, [type]);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <EventList EventData={eventsData[type] || []} />
    </div>
  );
};

export default EventContainer;
