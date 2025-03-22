import React from "react";
import { UserButton } from "@clerk/clerk-react";

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <div><UserButton /></div>
      <h3>My Profile</h3>
    </div>
  );
};

export default ProfilePage;
