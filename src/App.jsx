import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import WelcomePage from './pages/welcomePage';
import ThankYouPage from './pages/thankyouPage';
import VotingPage from './pages/VotingPage';
import EventDetails from './pages/EventDetails';
import GroupDetails from './pages/GroupDetails';

import HistoryPage from "./pages/HistoryPage";
import HistoryResultsPage from "./pages/HistoryResultsPage";
import AboutUs from "./pages/AboutUs";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="page-wrapper">
        <main className="page-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/vote" element={<VotingPage />} />
            <Route path="/event" element={<EventDetails />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
            <Route path="/groups/:groupId" element={<GroupDetails />} />

            <Route path="/history" element={<HistoryPage />} />
            <Route path="/results/:showId" element={<HistoryResultsPage />} />
            <Route path="/about-us" element={<AboutUs />} />

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
