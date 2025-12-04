// components/FeaturedEvents.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";

const FeaturedEvents = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axios.get("/api/events/featured")
      .then((res) => setFeatured(res.data))
      .catch(console.error);
  }, []);

  return featured.length > 0 ? (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-3">🌟 Featured Events</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {featured.map((event) => (
          <div key={event._id} className="min-w-[250px]">
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default FeaturedEvents;
