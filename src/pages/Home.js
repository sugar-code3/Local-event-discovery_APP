import React, { useEffect, useState } from "react";
import { fetchAllEvents } from "../services/api";
import EventCard from "../components/EventCard";
import { fetchWeekendEvents } from "../services/api";
import FeaturedEvents from "../components/FeaturedEvents";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [price, setPrice] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [weekendEvents, setWeekendEvents] = useState([]);

  useEffect(() => {
    fetchWeekendEvents()
      .then((res) => setWeekendEvents(res.data))
      .catch((err) => console.error(err));
  }, []);

  const fetchEvents = () => {
    fetchAllEvents({ keyword, price, page })
      .then((res) => {
        setEvents(res.data.events);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchEvents();
  }, [page]);

  const handleFilter = (e) => {
    e.preventDefault();
    setPage(1); // reset to page 1 on filter
    fetchEvents();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Discover Local Events
      </h1>

      {/* Weekend Events Carousel */}
      {weekendEvents.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">
            🎉 Happening This Weekend
          </h2>
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {weekendEvents.map((event) => (
              <div key={event._id} className="min-w-[250px]">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Featured Events */}
      <FeaturedEvents />

      {/* Filters */}
      <form
        onSubmit={handleFilter}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Search..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-1/2"
        />
        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">All Prices</option>
          <option value="Free">Free</option>
          <option value="Paid">Paid</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Filter
        </button>
      </form>

      {/* Events */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-10">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-medium text-gray-700">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
