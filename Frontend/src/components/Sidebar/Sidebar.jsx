import React from 'react'
import './Sidebar.css'
import { FaCoins } from "react-icons/fa";
import { LayoutDashboard, Users, Trophy, Users2, ClipboardList } from "lucide-react";
import LogoutButton from '../../Pages/Auth/LogoutButton';
import ProfilePage from '../../Pages/Auth/ProfilePage';

const Sidebar = () => {
  return (
    <div>
      <div className='sidebar'>
        <div className='part-1'>

        </div>
        <div className='part-2'>
          <div className='logo'>
            <img src="./public/images/logo.png" alt="logo" />
          </div>
        </div>
        <div className='part-3 sidebar-content'>
          <div>
            <div className='sidebar-pages'>
              <ul>
                <li><LayoutDashboard color='Cyan' /><a href="/dashboard">Dashboard</a></li>
                <li><ClipboardList color='cyan' /><a href="events">Events</a></li>
                <li><Trophy color='cyan' /><a href="/leaderboard">Leaderboard</a></li>
                <li><Users color='cyan' /><a href="/members">Members</a></li>
                <li><Users2 color='cyan' /><a href="/clubs">Clubs</a></li>
              </ul>
            </div>
            <div>
              <div className='score'>
                <h2>Score:{" "}</h2>
                <span>200</span>
                <FaCoins size={30} color="gold" />
              </div>
            </div>
          </div>
          <div className='sidebar-footer'>
            <hr />
            <ProfilePage />
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
