import React from 'react'
import './Dashboard.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  return (
    <div>
      <Sidebar />
      <div className='page-dashboard'>
        <div className='dashboard-content'>
          <h1>Announcements</h1>
          <div className='dashboard-announcements'>
            <div className='announcement-card'>
              <div className='announcement-title'>📢 Leadership Opportunity – Become a Club Moderator!</div>
              <div className="announcement-description">Are you interested in leading a club? We are looking for dedicated students to help manage and grow their favorite clubs. Apply now and take charge of your passion! 🏆</div>
              <div className='announcement-date'>Date: 12/03/2025</div>
            </div>
            <div className='announcement-card'>
              <div className='announcement-title'>🧠 Quiz Competition – Is your IQ High or Low? let's see!</div>
              <div className="announcement-description">Are you ready to challenge your brain? Participate in the Inter-College Quiz Competition and stand a chance to win ₹5000 cash prize! Date: March 25 | Venue: Seminar Hall. 🏆</div>
              <div className='announcement-date'>Date: 15/03/2025</div>
            </div>
            <div className='announcement-card'>
              <div className='announcement-title'>🌱 Sustainability Workshop – Learn & Act!</div>
              <div className="announcement-description">Want to make a difference? Join our Eco Warriors Club for a sustainability workshop on reducing waste and protecting our planet. Date: April 10 | Time: 2 PM | Venue: Green Hall 🌍💚</div>
              <div className='announcement-date'>Date: 21/03/2025</div>
            </div>
            <div className='announcement-card'>
              <div className='announcement-title'>📚 Book Club – Monthly Reading Challenge</div>
              <div className="announcement-description">📖 This month’s book of the month is "Atomic Habits" by James Clear. Join us for a discussion next Sunday at 6 PM in the library. Let’s grow together!</div>
              <div className='announcement-date'>Date: 14/03/2025</div>
            </div>
          </div>
          <h1>Events</h1>
          <div className='dashboard-events'>
            <div className='event-card'>
              <div className='event-jpg'>
                <img src="./public/images/events/event1.jpg" alt="Event1" />
              </div>
              <div className='event-details'>
                <div className='event-title'>Chakravyuh</div>
                <div className='event-description'>Can you escape the room with your friends? if you did you win a prize money of 5000Rs.</div>
                <button onClick={() => navigate("/events")}>Join Event</button>
              </div>
            </div>
            <div className='event-card'>
              <div className='event-jpg'>
                <img src="./public/images/events/event7.jpg" alt="Event1" />
              </div>
              <div className='event-details'>
                <div className='event-title'>Litopia 2.0</div>
                <div className='event-description'>Braking News: A baffeling mystery has struct the university! All investigators must report to theAmphitheatre</div>
                <button onClick={() => navigate("/events")}>Join Event</button>
              </div>
            </div>
            <div className='event-card'>
              <div className='event-jpg'>
                <img src="./public/images/events/event3.jpg" alt="Event1" />
              </div>
              <div className='event-details'>
                <div className='event-title'>Monnhack 2025</div>
                <div className='event-description'>Moonhack! a hackathon to showcase your coding skill and win a prize money of 1,00,000Rs.</div>
                <button onClick={() => navigate("/events")}>Join Event</button>
              </div>
            </div>
            <div className='event-card'>
              <div className='event-jpg'>
                <img src="./public/images/events/event4.jpg" alt="Event1" />
              </div>
              <div className='event-details'>
                <div className='event-title'>Mic drop</div>
                <div className='event-description'>Drop the mic, Raise the vibe. Showcase your speaking skills, either for comedy or Insperation.</div>
                <button onClick={() => navigate("/events")}>Join Event</button>
              </div>
            </div>
          </div>
          <div className='dash-clubs-container'>
            <h2>👥 Clubs</h2>
            <div className='all-clubs'>
              <div className='club-card'>
                <img src="./images/clubs/club1.png" alt="" />
                <div className='club-title'>PULSE - Night Club</div>
                <div className='club-description'>Pulse Club is a vibrant student organization that brings together creativity, music, arts, and social events. It fosters self-expression, community engagement, and unforgettable experiences through themed events and workshops.</div>
                <button onClick={() => navigate("/clubs")}>Join Club</button>
              </div>
              <div className='club-card'>
                <img src="./images/clubs/club2.png" alt="" />
                <div className='club-title'>KIETHST Football Club</div>
                <div className='club-description'>Kiethst Football Club is a passionate college football club that brings together students who love the game. It focuses on skill development, teamwork, and competitive play, organizing matches, tournaments, and training sessions to enhance players' abilities and sportsmanship.</div>
                <button onClick={() => navigate("/clubs")}>Join Club</button>
              </div>
              <div className='club-card'>
                <img src="./images/clubs/club4.png" alt="" />
                <div className='club-title'>Gordon - No pain No gain</div>
                <div className='club-description'>Gordon – No Pain No Gain is a dedicated college fitness and sports club that promotes strength, endurance, and resilience. Focused on pushing limits, it organizes workouts, training sessions, and challenges to inspire a no-excuses mindset among students.</div>
                <button onClick={() => navigate("/clubs")}>Join Club</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
