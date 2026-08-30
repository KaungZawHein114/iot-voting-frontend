// src/pages/welcomePage.jsx

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

import "./votingPages.css";
import logo from "../assets/gusto-logo.jpg";
import welcomeImage from "../assets/welcomeIOT.jpeg";
import { admit } from "../api/voting";
import { getErrorMessage } from "../api/client";

function WelcomePage() {
  const navigate = useNavigate();
  const { batch } = useParams();
  const [status, setStatus] = useState("checking"); // checking | ready | error
  const [error, setError] = useState("");
  // The QR token is single-use: reading + clearing the URL fragment must
  // happen exactly once, even under React 18 StrictMode's dev-only double
  // effect invocation (the second run would otherwise see an already-cleared
  // hash and wrongly report the pass as missing).
  const admissionStarted = useRef(false);

  useEffect(() => {
    if (admissionStarted.current) return;
    admissionStarted.current = true;

    // The QR code encodes the one-time token in the URL fragment (not the
    // query string) so it never appears in server logs or the Referer
    // header. Read it once, then strip it from the address bar.
    const rawToken = window.location.hash.replace(/^#/, "");
    if (rawToken) {
      window.history.replaceState(null, "", window.location.pathname);
    }

    if (!rawToken) {
      setStatus("error");
      setError("This link is missing its voting pass. Scan the QR code displayed at the show to vote.");
      return;
    }

    // No unmount-cancellation guard here: admissionStarted already
    // guarantees this call fires exactly once per mounted instance, and
    // StrictMode's synthetic dev-only cleanup would otherwise poison a
    // per-invocation "cancelled" flag before the real request resolves.
    admit(batch, rawToken)
      .then(() => setStatus("ready"))
      .catch((err) => {
        setStatus("error");
        setError(getErrorMessage(err, "This QR code has expired or was already used."));
      });
  }, [batch]);

  const handleStartVote = () => navigate(`/vote/${batch}`);
  const handleViewGroups = () => navigate(`/projects/${batch}`);

  return (
    <main className="voting-screen">
      <section className="voting-card">
        <header className="welcome-logo-area">
          <img src={logo} alt="GUSTO College logo" className="welcome-logo" />
        </header>

        <div className="welcome-heading">
          <p className="welcome-label">Welcome to</p>

          <h1 className="welcome-title">{batch} IoT Show</h1>

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

        {status === "error" && (
          <div
            style={{
              backgroundColor: "#fee",
              color: "#c00",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "14px",
              textAlign: "center",
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
            disabled={status === "checking"}
          >
            <span>{status === "checking" ? "Checking your pass…" : "Let's Vote"}</span>

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
