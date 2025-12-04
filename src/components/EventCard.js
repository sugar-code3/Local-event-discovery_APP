import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <Link to={`/events/${event._id}`} className="block">
      <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="rounded-md w-full h-48 object-cover mb-4"
        />
        <h3 className="text-lg font-semibold">{event.title}</h3>
        <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
        <p className="text-sm text-gray-500">{event.location.city}, {event.location.state}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {event.category.map((cat, idx) => (
            <span key={idx} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              {cat}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
