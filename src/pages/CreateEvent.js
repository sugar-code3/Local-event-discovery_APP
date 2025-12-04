import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    lat: '',
    lng: '',
    imageUrl: '',
    category: '',
    price: 'Free',
    externalLink: '',
    isFeatured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = {
      ...form,
      category: form.category.split(',').map((c) => c.trim()),
      location: {
        address: form.address,
        city: form.city,
        state: form.state,
        zip: form.zip,
        lat: parseFloat(form.lat),
        lng: parseFloat(form.lng),
      },
    };

    try {
      await axios.post('http://localhost:5000/api/events', eventData);
      navigate('/');
    } catch (err) {
      console.error('Event creation failed', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white mt-10 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="title" placeholder="Title" required onChange={handleChange} className="border p-2" />
        <textarea name="description" placeholder="Description" required onChange={handleChange} className="border p-2" />
        <input type="datetime-local" name="date" required onChange={handleChange} className="border p-2" />
        <input name="address" placeholder="Address" onChange={handleChange} className="border p-2" />
        <input name="city" placeholder="City" onChange={handleChange} className="border p-2" />
        <input name="state" placeholder="State" onChange={handleChange} className="border p-2" />
        <input name="zip" placeholder="ZIP Code" onChange={handleChange} className="border p-2" />
        <input name="lat" placeholder="Latitude" onChange={handleChange} className="border p-2" />
        <input name="lng" placeholder="Longitude" onChange={handleChange} className="border p-2" />
        <input name="imageUrl" placeholder="Image URL" onChange={handleChange} className="border p-2" />
        <input name="category" placeholder="Categories (comma separated)" onChange={handleChange} className="border p-2" />
        <select name="price" onChange={handleChange} className="border p-2">
          <option value="Free">Free</option>
          <option value="Paid">Paid</option>
        </select>
        <input name="externalLink" placeholder="RSVP/External Link" onChange={handleChange} className="border p-2" />
        <label className="flex items-center gap-2">
          <input type="checkbox" name="isFeatured" onChange={handleChange} />
          Featured Event
        </label>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create</button>
      </form>
    </div>
  );
};

export default CreateEvent;
