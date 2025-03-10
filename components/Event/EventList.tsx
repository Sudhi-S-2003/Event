"use client";
import { FC } from "react";
import EventCard, { EventCardProps } from "./EventCard";

interface EventListProps {
  EventData: EventCardProps[]; 
}

const EventList: FC<EventListProps> = ({ EventData }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {EventData.map((event, index) => (
        <EventCard key={index} {...event} />
      ))}
    </div>
  );
};

export default EventList;
