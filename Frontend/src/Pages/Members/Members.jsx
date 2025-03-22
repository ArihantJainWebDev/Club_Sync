import React from 'react'
import './Members.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import Memberlist from '../../components/Member/Memberlist.jsx'

const Members = () => {
  return (
    <div>
      <Sidebar />
      <div className='page-members'>
        <h1>Members</h1>
        <div className='members-container'>
          <div className='member-cards'>
          <Memberlist />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Members
