import React from "react";
import { SignIn } from "@clerk/clerk-react";
import "./Auth.css"; // Add your CSS file for styling

const SignInPage = () => {
  return (
    <div className="auth-container">
      <SignIn />
    </div>
  );
};

export default SignInPage;
