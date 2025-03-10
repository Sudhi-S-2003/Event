import EventContainer from '@/components/Event/EventContainer';

function Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">
        Event Categories
      </h1>

      <div className="space-y-12">
        {/* Today's Events */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Today&apos;s Events</h2>
          <EventContainer type="today" />
        </div>


        {/* Upcoming Events */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Events</h2>
          <EventContainer type="upcoming" />
        </div>

        {/* Past Events */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Past Events</h2>
          <EventContainer type="past" />
        </div>
      </div>
    </div>
  );
}

export default Page;
