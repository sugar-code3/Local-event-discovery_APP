import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

// mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || 'YOUR_MAPBOX_TOKEN';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [rsvp, setRsvp] = useState({ name: '', email: '' });
  const [msg, setMsg] = useState('');
  const mapContainerRef = useRef(null);

  // Fetch event details
  useEffect(() => {
    axios.get(`http://localhost:5000/api/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // Initialize Map
  useEffect(() => {
    if (event && mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [event.location.lng, event.location.lat],
        zoom: 13,
      });

      new mapboxgl.Marker()
        .setLngLat([event.location.lng, event.location.lat])
        .addTo(map);

      return () => map.remove();
    }
  }, [event]);

  // RSVP form submission
  const handleRSVP = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/rsvp', {
        ...rsvp,
        eventId: id,
      });
      setMsg(res.data.message);
      setRsvp({ name: '', email: '' });
    } catch (err) {
      console.error(err);
      setMsg('Failed to RSVP. Try again.');
    }
  };

  if (!event) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link to="/" className="text-blue-600 hover:underline">&larr; Back to Events</Link>

      <img
        src={event.imageUrl}
        alt={event.title}
        className="rounded-xl w-full h-96 object-cover my-6"
      />

      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

      <p className="text-gray-600 mb-2">
        📍 {event.location.address}, {event.location.city}, {event.location.state}
      </p>
      <p className="text-gray-600 mb-4">
        🗓️ {new Date(event.date).toLocaleString()}
      </p>

      <p className="text-lg text-gray-800 mb-6">{event.description}</p>

      <div className="flex gap-2 flex-wrap mb-4">
        {event.category.map((cat, idx) => (
          <span key={idx} className="text-sm bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
            {cat}
          </span>
        ))}
      </div>

      {/* RSVP / External Link */}
      <a
        href={event.externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition mb-10"
      >
        View More / RSVP Site
      </a>

      {/* Map */}
      <div className="w-full h-80 rounded-md overflow-hidden my-6">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {/* RSVP Form */}
      <div className="bg-white p-6 mt-10 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-3">🎟️ RSVP Now</h3>
        <form onSubmit={handleRSVP} className="space-y-3">
          <input
            type="text"
            name="name"
            required
            value={rsvp.name}
            onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
            placeholder="Your Name"
            className="border p-2 rounded w-full"
          />
          <input
            type="email"
            name="email"
            required
            value={rsvp.email}
            onChange={(e) => setRsvp({ ...rsvp, email: e.target.value })}
            placeholder="Your Email"
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Confirm RSVP
          </button>
          {msg && <p className="text-sm text-gray-700 mt-2">{msg}</p>}
        </form>
      </div>
    </div>
  );
};

export default EventDetail;
