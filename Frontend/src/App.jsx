import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";
import Dashboard from './Pages/Dashboard/Dashboard';
import SignInPage from './Pages/Auth/SignInPage';
import SignUpPage from './Pages/Auth/SignUpPage';
import ProfilePage from './Pages/Auth/ProfilePage';
import Events from './pages/Events/Events';
import LeaderboardPage from './Pages/Leaderboard/LeaderboardPage';
import Members from './Pages/Members/Members';
import Clubs from './Pages/Clubs/Clubs';

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/sign-in");
    }
  }, [isSignedIn, navigate]);

  return isSignedIn ? children : null;
};

const AuthRedirect = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, navigate]);
  navigate("/sign-in");

  return null;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthRedirect />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/events" element={<Events />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/members" element={<Members />} />
      <Route path="/clubs" element={<Clubs />} />
    </Routes>
  );
};

export default App;
