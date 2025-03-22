import React from "react";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"

const LogoutButton = () => {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(() => {
      navigate("/sign-in");
    });
  };

  return <button className="logout-btn" onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
