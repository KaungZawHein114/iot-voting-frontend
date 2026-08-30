// src/pages/welcomePage.jsx

import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

import "./votingPages.css";
import logo from "../assets/gusto-logo.jpg";
import welcomeImage from "../assets/welcomeIOT.jpeg";

const API_URL = import.meta.env.VITE_API_URL;

function WelcomePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get the voting session token from URL params (passed after QR scan admission)
  const sessionToken = searchParams.get("token");

  const handleStartVote = () => {
    if (sessionToken) {
      navigate(`/vote?token=${encodeURIComponent(sessionToken)}`);
    } else {
      navigate("/vote");
    }
  };

  const handleViewGroups = () => {
    navigate("/groups");
  };

  return (
    <main className="voting-screen">
      <section className="voting-card">
        <header className="welcome-logo-area">
          <img src={logo} alt="GUSTO College logo" className="welcome-logo" />
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

        {error && (
          <div
            style={{
              backgroundColor: "#fee",
              color: "#c00",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <div className="voting-buttons">
          <button
            type="button"
            className="primary-button"
            onClick={handleStartVote}
            disabled={loading}
          >
            <span>{loading ? "Loading..." : "Let's Vote"}</span>

            <span className="arrow-circle" aria-hidden="true">
              <FaArrowRight />
            </span>
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={handleViewGroups}
            disabled={loading}
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
