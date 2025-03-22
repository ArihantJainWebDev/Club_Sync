import React from 'react'
import './Events.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Events = () => {

  const [events, setEvents] = useState([]);
  const [eventImage, setEventImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [eventData, setEventData] = useState({
    event_name: "",
    description: "",
    score_value: 0,
    event_img: "",
  });


  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/events");
      setEvents(response.data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const createEvent = async () => {
    try {
      await axios.post("http://localhost:8000/create-event", eventData);
      alert("Event created!");
      fetchEvents();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const joinEvent = async (eventName) => {
    const username = prompt("Enter your username to join:");
    if (!username) return;

    try {
      await axios.post("http://localhost:8000/join-event", { username, event_name: eventName });
      alert(`${username} joined the ${eventName} event successfully!`);
      fetchEvents();
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEventImage(file);

    // Generate a temporary URL for preview
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <Sidebar />
      <div className='page-events'>
        <h1>Events</h1>
        <div className='events-container'>
          <h2>Create Event</h2>
          <div className="create-event">
            <div className="create-event-input">
              <input type="text" placeholder="Event Name" onChange={(e) => setEventData({ ...eventData, event_name: e.target.value })} />
              <input type="text" placeholder="Description" onChange={(e) => setEventData({ ...eventData, description: e.target.value })} />
              <input type="number" placeholder="Score" onChange={(e) => setEventData({ ...eventData, score_value: e.target.value })} />
              <input
                type="file"
                accept="image/*"
                id="eventImage"
                onChange={handleImageChange}
              />
              <input type="text" placeholder="Location" onChange={(e) => setEventData({ ...eventData, location: e.target.value })} />
            </div>
            <button onClick={createEvent}>Create Event</button>
          </div>

          <h2>Available Events</h2>
          <div>
            <div className="live-events">
              {events.map(event => (
                <div className="event-card">
                  <div key={event.event_name}>
                    {previewImage && <img src={previewImage} alt="Preview" className='event-img' />}
                    <h3>{event.event_name}</h3>
                    <p className='event-des'>{event.description}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Score:</strong> {event.score_value}</p>
                    <button onClick={() => joinEvent(event.event_name)}>Join Event</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Events
