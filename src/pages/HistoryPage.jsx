import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { FaTrophy, FaArrowRight } from "react-icons/fa6";

export default function HistoryPage() {
  const navigate = useNavigate();

  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const previousShows = [
    {
      id: 1,
      title: "Smart City Innovation",
      date: "May 27, 2026",
      groups: 5,
      votes: "1,245",
      winner: "AI Robotics Group",
      winnerVotes: 430,
    },
    {
      id: 2,
      title: "Smart Home Technology",
      date: "April 18, 2026",
      groups: 6,
      votes: "1,087",
      winner: "Future Home Group",
      winnerVotes: 398,
    },
    {
      id: 3,
      title: "Green IoT Solutions",
      date: "March 12, 2026",
      groups: 5,
      votes: "982",
      winner: "Smart Energy Group",
      winnerVotes: 351,
    },
    {
      id: 4,
      title: "IoT Security Challenge",
      date: "February 20, 2026",
      groups: 4,
      votes: "875",
      winner: "IoT Security Group",
      winnerVotes: 320,
    },
    {
      id: 5,
      title: "Future Technology Expo",
      date: "January 15, 2026",
      groups: 6,
      votes: "1,156",
      winner: "AI Robotics Group",
      winnerVotes: 412,
    },
    {
      id: 6,
      title: "Connected World",
      date: "December 10, 2025",
      groups: 5,
      votes: "943",
      winner: "Smart City Team",
      winnerVotes: 344,
    },
  ];

  const handleViewResults = (show) => {
    if (isLeaving) return;

    setIsLeaving(true);

    setTimeout(() => {
      navigate(`/results/${show.id}`, {
        state: { show },
      });
    }, 300);
  };

  return (
    <>
      <style>{`
        /* =========================
           PAGE
        ========================= */

        .history-page {
          width: 100%;
          min-height: 100vh;
          margin: 0;

          padding:
            clamp(38px, 6vw, 80px)
            clamp(18px, 5vw, 72px)
            90px;

          box-sizing: border-box;

          font-family:
            Inter,
            Arial,
            sans-serif;

          background:
            linear-gradient(
              to bottom,
              #12343d 0%,
              #3f585d 48%,
              #f4f6f7 100%
            );

          overflow-x: hidden;
        }

        .history-container {
          width: 100%;
          max-width: 1500px;
          margin: 0 auto;
        }


        /* =========================
           PAGE TRANSITION
        ========================= */

        .history-page-content {
          animation:
            historyPageEnter
            0.45s ease
            forwards;

          transform-origin: center top;
        }

        .history-page-content.page-exit {
          animation:
            historyPageExit
            0.3s ease
            forwards;

          pointer-events: none;
        }

        @keyframes historyPageEnter {
          from {
            opacity: 0;

            transform:
              scale(0.975);

            filter:
              blur(3px);
          }

          to {
            opacity: 1;

            transform:
              scale(1);

            filter:
              blur(0);
          }
        }

        @keyframes historyPageExit {
          from {
            opacity: 1;

            transform:
              scale(1);

            filter:
              blur(0);
          }

          to {
            opacity: 0;

            transform:
              scale(0.97);

            filter:
              blur(3px);
          }
        }


        /* =========================
           HEADING
        ========================= */

        .history-heading-area {
          width: 100%;

          display: flex;
          flex-direction: column;
          align-items: center;

          text-align: center;
        }

        .history-main-title {
          margin: 0;

          color: #ffffff;

          font-size:
            clamp(30px, 4vw, 48px);

          font-weight: 800;

          line-height: 1.15;
        }

        .history-main-description {
          max-width: 680px;

          margin:
            14px auto 0;

          color:
            #f1f5f9;

          font-size:
            clamp(13px, 1.3vw, 17px);

          line-height: 1.65;

          text-align: center;
        }


        /* =========================
           PREVIOUS SHOWS
        ========================= */

        .previous-shows-section {
          margin-top:
            clamp(65px, 8vw, 110px);
        }

        .previous-shows-title {
          margin:
            0 0 45px;

          color:
            #ffffff;

          text-align:
            center;

          font-size:
            clamp(28px, 3.4vw, 42px);

          font-weight:
            800;
        }


        /* =========================
           GRID
        ========================= */

        .history-card-grid {
          display: grid;

          grid-template-columns:
            repeat(
              auto-fit,
              minmax(
                min(100%, 260px),
                1fr
              )
            );

          gap:
            clamp(22px, 3vw, 34px);
        }


        /* =========================
           CARD
        ========================= */

        .history-card {
          position: relative;

          width: 100%;
          min-height: 455px;

          display: flex;
          flex-direction: column;

          padding: 16px;

          box-sizing: border-box;

          border:
            1px solid
            rgba(255,255,255,0.48);

          border-radius: 22px;

          background:
            linear-gradient(
              145deg,
              rgba(63,88,94,0.94),
              rgba(44,68,74,0.91)
            );

          color:
            #ffffff;

          text-align:
            center;

          box-shadow:
            0 8px 22px
            rgba(0,0,0,0.10);

          cursor:
            pointer;

          opacity: 0;

          animation:
            historyCardEntrance
            0.45s ease
            forwards;

          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }


        /* Highlight top line */

        .history-card::before {
          content: "";

          position: absolute;

          top: -1px;
          left: 18px;
          right: 18px;

          height: 5px;

          background:
            #6dc7e8;

          border-radius:
            0 0 6px 6px;

          transform:
            scaleX(0);

          transform-origin:
            center;

          transition:
            transform 0.3s ease;
        }


        .history-card:hover {
          transform:
            translateY(-14px);

          border-color:
            rgba(255,255,255,0.82);

          box-shadow:
            0 22px 38px
            rgba(0,0,0,0.23);
        }

        .history-card:hover::before {
          transform:
            scaleX(1);
        }


        @keyframes historyCardEntrance {
          from {
            opacity: 0;

            transform:
              translateY(22px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0);
          }
        }


        /* =========================
           IMAGE
        ========================= */

        .history-card-image {
          width: 100%;
          height: 205px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border-radius: 14px;

          overflow: hidden;

          background:
            #dcecf6;

          color:
            #78909c;

          font-size:
            13px;

          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .history-card:hover
        .history-card-image {
          transform:
            scale(1.025);

          box-shadow:
            0 8px 18px
            rgba(0,0,0,0.12);
        }


        /* =========================
           CARD TEXT
        ========================= */

        .history-card-title {
          margin:
            18px 0 0;

          color:
            #ffffff;

          font-size:
            clamp(17px,1.6vw,21px);

          font-weight:
            800;

          line-height:
            1.35;
        }

        .history-card-date {
          display: flex;

          justify-content:
            center;

          align-items:
            center;

          gap:
            8px;

          margin-top:
            12px;

          color:
            #ffffff;

          font-size:
            13px;
        }

        .history-card-date-icon {
          width:
            17px;

          height:
            17px;
        }

        .history-card-stats {
          display: flex;

          justify-content:
            space-between;

          gap:
            16px;

          margin-top:
            25px;

          font-size:
            13px;
        }


        /* =========================
           WINNER
        ========================= */

        .history-card-winner {
          margin-top:
            24px;
        }

        .history-card-winner-title {
          display: flex;

          justify-content:
            center;

          align-items:
            center;

          gap:
            7px;
        }

        .history-card-trophy {
          color:
            #f6c945;

          transition:
            transform 0.25s ease;
        }

        .history-card:hover
        .history-card-trophy {
          transform:
            translateY(-3px)
            rotate(-7deg)
            scale(1.08);
        }

        .history-card-winner-name {
          margin:
            11px 0 0;

          font-size:
            13px;
        }

        .history-card-winner-votes {
          display:
            block;

          margin-top:
            6px;

          font-size:
            13px;
        }


        /* =========================
           BUTTON
        ========================= */

        .view-results-button {
          width:
            min(100%,175px);

          min-height:
            46px;

          margin:
            auto auto 0;

          padding:
            10px 16px;

          display:
            inline-flex;

          align-items:
            center;

          justify-content:
            center;

          gap:
            9px;

          border:
            none;

          border-radius:
            11px;

          background:
            #dceef9;

          color:
            #08649b;

          font-family:
            inherit;

          font-size:
            13px;

          font-weight:
            700;

          cursor:
            pointer;

          transition:
            background-color 0.2s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .view-results-button:hover {
          background:
            #c7e4f5;

          transform:
            translateY(-2px);

          box-shadow:
            0 5px 13px
            rgba(0,0,0,0.12);
        }

        .view-results-arrow {
          width:
            14px;

          height:
            14px;

          transition:
            transform 0.2s ease;
        }

        .view-results-button:hover
        .view-results-arrow {
          transform:
            translateX(4px);
        }


        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 900px) {

          .history-card-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

        }

        @media (max-width: 560px) {

          .history-page {
            padding:
              32px 16px 65px;
          }

          .history-card-grid {
            grid-template-columns:
              1fr;

            gap:
              26px;
          }

          .history-card {
            max-width:
              360px;

            margin:
              0 auto;
          }

        }

        @media (prefers-reduced-motion: reduce) {

          .history-page-content,
          .history-card {
            animation:
              none !important;

            opacity:
              1 !important;

            filter:
              none !important;
          }

        }
      `}</style>

      <main className="history-page">

        <div
          className={
            isLeaving
              ? "history-page-content page-exit"
              : "history-page-content"
          }
        >
          <div className="history-container">

            {/* HEADING */}

            <section className="history-heading-area">

              <h1 className="history-main-title">
                IoT Show History
              </h1>

              <p className="history-main-description">
                Explore previous competitions,
                participating groups, and winning
                innovations.
              </p>

            </section>


            {/* SHOWS */}

            <section className="previous-shows-section">

              <h2 className="previous-shows-title">
                Previous IoT Shows
              </h2>


              <div className="history-card-grid">

                {previousShows.map(
                  (show, index) => (

                    <article
                      key={show.id}

                      className="history-card"

                      style={{
                        animationDelay:
                          `${0.15 + index * 0.05}s`,
                      }}

                      onClick={() =>
                        handleViewResults(show)
                      }

                      onKeyDown={(event) => {

                        if (
                          event.key === "Enter" ||
                          event.key === " "
                        ) {

                          event.preventDefault();

                          handleViewResults(show);
                        }
                      }}

                      role="button"
                      tabIndex={0}
                    >

                      <div className="history-card-image">
                        Event Image
                      </div>


                      <h3 className="history-card-title">
                        {show.title}
                      </h3>


                      <div className="history-card-date">

                        <HiOutlineCalendarDays
                          className="history-card-date-icon"
                          aria-hidden="true"
                        />

                        <span>
                          {show.date}
                        </span>

                      </div>


                      <div className="history-card-stats">

                        <span>
                          {show.groups} Groups
                        </span>

                        <span>
                          {show.votes} Votes
                        </span>

                      </div>


                      <div className="history-card-winner">

                        <div className="history-card-winner-title">

                          <FaTrophy
                            className="history-card-trophy"
                            aria-hidden="true"
                          />

                          <strong>
                            Winner
                          </strong>

                        </div>


                        <p className="history-card-winner-name">
                          {show.winner}
                        </p>


                        <span className="history-card-winner-votes">
                          {show.winnerVotes} Votes
                        </span>

                      </div>


                      <button
                        type="button"

                        className="view-results-button"

                        onClick={(event) => {

                          event.stopPropagation();

                          handleViewResults(show);
                        }}
                      >

                        View Results

                        <FaArrowRight
                          className="view-results-arrow"
                          aria-hidden="true"
                        />

                      </button>

                    </article>

                  )
                )}

              </div>

            </section>

          </div>
        </div>

      </main>
    </>
  );
}