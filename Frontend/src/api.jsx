import axios from "axios";

const API_URL = "http://localhost:8000"; // Update with your backend URL when deployed

// ✅ User Authentication (Handled by Clerk, so not needed here)

// ✅ Create a Club
export const createClub = async (name, description, owner) => {
  try {
    const response = await axios.post(`${API_URL}/create-club/`, {
      name,
      description,
      owner
    });
    return response.data;
  } catch (error) {
    console.error("Error creating club:", error.response?.data || error);
  }
};

// ✅ Join a Club
export const joinClub = async (username, clubName) => {
  try {
    const response = await axios.post(`${API_URL}/join-club/`, {
      username,
      club_name: clubName
    });
    return response.data;
  } catch (error) {
    console.error("Error joining club:", error.response?.data || error);
  }
};

// ✅ Create an Event
export const createEvent = async (clubName, eventName, scoreValue) => {
  try {
    const response = await axios.post(`${API_URL}/create-event/`, {
      club_name: clubName,
      event_name: eventName,
      score_value: scoreValue
    });
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error.response?.data || error);
  }
};

// ✅ Join an Event (Gain Score)
export const joinEvent = async (username, eventName) => {
  try {
    const response = await axios.post(`${API_URL}/join-event/`, {
      username,
      event_name: eventName
    });
    return response.data;
  } catch (error) {
    console.error("Error joining event:", error.response?.data || error);
  }
};

// ✅ Fetch Leaderboard
export const getLeaderboard = async () => {
  try {
    const response = await axios.get(`${API_URL}/leaderboard/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching leaderboard:", error.response?.data || error);
  }
};

export const fetchMembers = async () => {
  const response = await fetch(`${API_URL}/members/`);
  const data = await response.json();
  return data.members || []; // Ensure it's always an array
};


export const addMember = async (member) => {
  const response = await fetch(`${API_URL}/members/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(member),
  });
  return response.json();
};

export const updateMember = async (id, member) => {
  const response = await fetch(`${API_URL}/members/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(member),
  });
  return response.json();
};

export const deleteMember = async (id) => {
  await fetch(`${API_URL}/members/${id}`, { method: "DELETE" });
};
