// src/pages/thankyouPage.jsx

import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import {
  HiOutlineArrowLeft,
  HiOutlineHome,
} from "react-icons/hi2";

import "./votingPages.css";
import logo from "../assets/gusto-logo.jpg";
import thankYouImage from "../assets/thankyouPeople.jpg";

function ThankYouPage() {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate("/");
  };

  const handleBackToEvent = () => {
    navigate(-1);
  };

  return (
    <main className="voting-screen">
      <section className="voting-card">
        <header className="thank-you-logo-area">
          <img
            src={logo}
            alt="GUSTO College logo"
            className="thank-you-logo"
          />
        </header>

        <div className="thank-you-content">
          <div
            className="success-icon"
            aria-label="Vote successfully recorded"
          >
            <FaCheck aria-hidden="true" />
          </div>

          <h1 className="thank-you-title">Thank You!</h1>

          <p className="thank-you-message">
            Your vote has been successfully recorded.
          </p>

          <p className="thank-you-description">
            Thank you for taking part in
            <br />
            the IoT Show 2026.
          </p>

          <div className="thank-you-image-section">
            <img
              src={thankYouImage}
              alt="People celebrating together"
              className="thank-you-main-image"
            />
          </div>
        </div>

        <div className="voting-buttons">
          <button
            type="button"
            className="primary-button"
            onClick={handleFinish}
          >
            <HiOutlineHome
              className="button-icon"
              aria-hidden="true"
            />

            <span>Finish</span>
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={handleBackToEvent}
          >
            <HiOutlineArrowLeft
              className="button-icon"
              aria-hidden="true"
            />

            <span>Back to Event Info</span>
          </button>
        </div>

        <footer className="voting-footer">
          © 2026 GUSTO IoT Voting System
        </footer>
      </section>
    </main>
  );
}

export default ThankYouPage;