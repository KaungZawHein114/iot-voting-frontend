import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import WelcomePage from "./pages/welcomePage";
import ThankYouPage from "./pages/thankyouPage";
import VotingPage from "./pages/VotingPage";
import ProjectPage from "./pages/ProjectPage";
import HistoryPage from "./pages/HistoryPage";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="page-wrapper">
        <main className="page-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/projects/:batch" element={<ProjectPage />} />

            <Route path="/welcome/:batch" element={<WelcomePage />} />
            <Route path="/vote/:batch" element={<VotingPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
