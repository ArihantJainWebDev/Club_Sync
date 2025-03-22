import React from 'react'
import './Clubs.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Clubs = () => {

  const [clubData, setClubData] = useState({
    club_name: "",
    description: ""
  });

  const [clubs, setClubs] = useState([]);

  const fetchClubs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/clubs");
      setClubs(response.data.clubs);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  // Create Club
  const createClub = async () => {
    try {
      await axios.post("http://localhost:8000/create-club", clubData);
      alert("Club created!");
      fetchClubs();
    } catch (error) {
      alert(error.response?.data?.detail || "Error creating club");
    }
  };

  // Join Club
  const joinClub = async (clubName) => {
    const username = prompt("Enter your username to join:");
    if (!username) return;

    try {
      const response = await axios.post("http://localhost:8000/join-club", {
        username,
        club_name: clubName  // Ensure this matches FastAPI's expected key
      });

      alert(response.data.message || "You have joined the club!");
      fetchClubs();
    } catch (error) {
      console.error("Error joining club:", error);

      if (error.response && error.response.data) {
        alert(JSON.stringify(error.response.data, null, 2)); // Fix [object Object] issue
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };


  return (
    <div>
      <Sidebar />
      <div className='page-clubs'>
        <h1>Clubs</h1>
        <div className='clubs-container'>
          <div className='create-club'>
            <h2>Create Club</h2>
            <input type="text" placeholder="Club Name" onChange={(e) => setClubData({ ...clubData, club_name: e.target.value })} />
            <input id='descrip' type="text" placeholder="Description" onChange={(e) => setClubData({ ...clubData, description: e.target.value })} />
            <button onClick={createClub}>Create Club</button>
          </div>
          {/* Available Clubs */}
          <h2>Available Clubs</h2>
          <div className="club-list">
            {Object.keys(clubs).map((clubName) => (
              <div key={clubName} className="club-card">
                <h3>{clubName}</h3>
                <p>{clubs[clubName].description}</p>
                <p><strong>Members:</strong> {clubs[clubName].members.length}</p>
                <button onClick={() => joinClub(clubName)}>Join Club</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Clubs
