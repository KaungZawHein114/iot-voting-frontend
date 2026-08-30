// src/pages/welcomePage.jsx

import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

import "./votingPages.css";
import logo from "../assets/gusto-logo.jpg";
import welcomeImage from "../assets/welcomeIOT.jpeg";

function WelcomePage() {
  const navigate = useNavigate();

  const handleStartVote = () => {
    navigate("/vote");
  };

  const handleViewGroups = () => {
    navigate("/groups");
  };

  return (
    <main className="voting-screen">
      <section className="voting-card">
        <header className="welcome-logo-area">
          <img
            src={logo}
            alt="GUSTO College logo"
            className="welcome-logo"
          />
        </header>

        <div className="welcome-heading">
          <p className="welcome-label">Welcome to</p>

          <h1 className="welcome-title">IoT Show 2026</h1>

          <p className="welcome-description">
            Discover innovative IoT projects created by GUSTO students and
            support the best ideas.
          </p>
        </div>

        <div className="welcome-image-section">
          <img
            src={welcomeImage}
            alt="IoT technology illustration"
            className="welcome-main-image"
          />
        </div>

        <div className="voting-buttons">
          <button
            type="button"
            className="primary-button"
            onClick={handleStartVote}
          >
            <span>Let&apos;s Vote</span>

            <span className="arrow-circle" aria-hidden="true">
              <FaArrowRight />
            </span>
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={handleViewGroups}
          >
            View Groups
          </button>
        </div>

        <footer className="voting-footer">
          © 2026 GUSTO IoT Voting System
        </footer>
      </section>
    </main>
  );
}

export default WelcomePage;