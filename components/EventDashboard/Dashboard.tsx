"use client";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import EventList from "../Event/EventList";
import EventForm from "./EventForm";
import EventTable from "./EventTable";

const EventDashboard = () => {
  const [view, setView] = useState("upcoming"); // ✅ Updated default to 'upcoming'
  const [eventYourData, setEventYourData] = useState({
    upcoming: [],
    today: [],
    past: [],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Optimized fetch function
  const fetchEvents = async (type: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/protected/event?type=${type}`, {
        credentials: "include", // ✅ Ensures HttpOnly cookies are sent
      });
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

  // ✅ Fetch all event types on mount
  useEffect(() => {
    ["upcoming", "today", "past"].forEach(fetchEvents);
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar setView={setView} />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">
          Event Management Dashboard
        </h1>

        {error && <p className="text-red-500 font-semibold">{error}</p>}

        {loading ? (
          <p className="text-gray-600">Loading events...</p>
        ) : (
          <>
            {view === "upcoming" && <EventList EventData={eventYourData.upcoming} />}
            {view === "today" && <EventList EventData={eventYourData.today} />}
            {view === "past" && <EventList EventData={eventYourData.past} />}
            {view === "add" && <EventForm />}
            {view === "table" && <EventTable />}
          </>
        )}
      </div>
    </div>
  );
};

export default EventDashboard;
