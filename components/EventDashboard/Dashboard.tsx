"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import EventList from "../Event/EventList";
import EventForm from "./EventForm";
import EventTable from "./EventTable";

const EventDashboard = () => {
  const [view, setView] = useState("list");

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar setView={setView} />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">Event Management Dashboard</h1>
        
        {view === "list" && <EventList />}
        {view === "add" && <EventForm />}
        {view === "table" && <EventTable />}
      </div>
    </div>
  );
};

export default EventDashboard;
