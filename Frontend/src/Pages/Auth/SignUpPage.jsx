import React from "react";
import { SignUp } from "@clerk/clerk-react";
import "./Auth.css"; // Add your CSS file for styling

const SignUpPage = () => {
  return (
    <div className="auth-container">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
