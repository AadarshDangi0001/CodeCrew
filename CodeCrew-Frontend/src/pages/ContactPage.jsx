import React from 'react'
import Community from '../components/communitys/Community'
import TeamMembers from '../components/team/TeamMembers'

const ContactPage = () => {
  return (
    <div className="contact mt-20 bg-transparent">
      <div className="pt-16 pb-8" style={{ paddingLeft: "5vw", paddingRight: "5vw" }}>
        {/* Page Title */}
        <h1 className="maintext text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">CONTACT US</h1>
      </div>
      
      {/* Team Members Section */}
      <TeamMembers />

      <Community/>
    </div>
  )
}

export default ContactPage
