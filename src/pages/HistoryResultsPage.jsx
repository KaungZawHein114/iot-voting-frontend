import React, { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  HiOutlineArrowLeft,
  HiOutlineCalendarDays,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { FaMedal } from "react-icons/fa6";

export default function HistoryResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showId } = useParams();

  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const show =
    location.state?.show || {
      id: showId || 1,
      title: "Smart City Innovation",
      date: "May 27, 2026",
    };

  const groups = [
    {
      id: 1,
      name: "Smart Traffic Group",
      members: 5,
      description:
        "Our project uses smart traffic sensors to reduce congestion and improve transportation efficiency in urban areas.",
      winner: false,
    },
    {
      id: 2,
      name: "Smart Energy Group",
      members: 5,
      description:
        "Our project uses smart technology to monitor energy usage and improve energy efficiency.",
      winner: false,
    },
    {
      id: 3,
      name: "AI Robotics Group",
      members: 5,
      description:
        "Our project uses IoT sensors and real-time data to improve traffic management, energy usage, and public safety in urban areas.",
      winner: true,
    },
    {
      id: 4,
      name: "IoT Security Group",
      members: 5,
      description:
        "Our project focuses on improving the security and protection of connected IoT devices and networks.",
      winner: false,
    },
    {
      id: 5,
      name: "Future Home Group",
      members: 5,
      description:
        "Our project creates smart home solutions using IoT devices for automation, safety, and convenience.",
      winner: false,
    },
  ];

  const handleBack = () => {
    if (isLeaving) return;

    setIsLeaving(true);

    setTimeout(() => {
      navigate("/history");
    }, 300);
  };

  return (
    <>
      <style>{`
        /* =========================
           PAGE
        ========================= */

        .history-results-page {
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

          color: #ffffff;

          overflow-x: hidden;
        }

        .history-results-container {
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
        }


        /* =========================
           PAGE TRANSITION
        ========================= */

        .history-results-content {
          transform-origin: center top;

          animation:
            resultsPageEnter
            0.45s ease
            forwards;
        }

        .history-results-content.page-exit {
          animation:
            resultsPageExit
            0.3s ease
            forwards;

          pointer-events: none;
        }

        @keyframes resultsPageEnter {
          from {
            opacity: 0;
            transform: scale(0.975);
            filter: blur(3px);
          }

          to {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }

        @keyframes resultsPageExit {
          from {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }

          to {
            opacity: 0;
            transform: scale(0.97);
            filter: blur(3px);
          }
        }


        /* =========================
           TOP AREA
        ========================= */

        .results-top-area {
          position: relative;
          width: 100%;
        }

        .results-back-button {
          position: absolute;

          top: 0;
          left: 0;

          width: 44px;
          height: 44px;

          display: flex;
          align-items: center;
          justify-content: center;

          border:
            1px solid
            rgba(255, 255, 255, 0.35);

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.10);

          color: #ffffff;

          font-size: 21px;

          cursor: pointer;

          backdrop-filter: blur(8px);

          transition:
            transform 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease;
        }

        .results-back-button:hover {
          transform: scale(1.08);

          background:
            rgba(255, 255, 255, 0.20);

          box-shadow:
            0 6px 18px
            rgba(0, 0, 0, 0.16);
        }

        .results-back-button:active {
          transform: scale(0.95);
        }

        .results-back-icon {
          width: 21px;
          height: 21px;
        }


        /* =========================
           TITLE
        ========================= */

        .history-results-title {
          margin: 0;

          padding:
            0 60px;

          color: #ffffff;

          text-align: center;

          font-size:
            clamp(28px, 4vw, 46px);

          font-weight: 800;

          line-height: 1.2;
        }


        /* =========================
           DATE
        ========================= */

        .history-results-date {
          display: flex;

          align-items: center;

          gap: 8px;

          margin-top: 34px;

          color: #ffffff;

          font-size:
            clamp(13px, 1.2vw, 16px);
        }

        .history-results-date-icon {
          width: 18px;
          height: 18px;
        }


        /* =========================
           GRID
        ========================= */

        .results-card-grid {
          display: grid;

          grid-template-columns:
            repeat(
              5,
              minmax(0, 1fr)
            );

          align-items: center;

          gap:
            clamp(18px, 2vw, 30px);

          margin-top:
            clamp(75px, 9vw, 115px);
        }


        /* =========================
           CARD
        ========================= */

        .result-card {
          position: relative;

          width: 100%;
          max-width: 290px;
          min-height: 440px;

          margin: 0 auto;

          padding: 16px;

          box-sizing: border-box;

          display: flex;
          flex-direction: column;

          border:
            1px solid
            rgba(255, 255, 255, 0.45);

          border-radius: 22px;

          background:
            linear-gradient(
              145deg,
              rgba(63, 88, 94, 0.92),
              rgba(48, 72, 78, 0.88)
            );

          box-shadow:
            0 8px 22px
            rgba(0, 0, 0, 0.10);

          opacity: 0;

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .result-card:hover {
          transform:
            translateY(-7px);

          box-shadow:
            0 15px 35px
            rgba(0, 0, 0, 0.20);
        }


        /* =========================
           WINNER
        ========================= */

        .result-card.winner {
          border:
            1px solid
            rgba(255, 216, 61, 0.60);

          background:
            linear-gradient(
              145deg,
              rgba(43, 70, 76, 0.98),
              rgba(35, 59, 65, 0.98)
            );

          box-shadow:
            0 0 10px
            rgba(255, 216, 61, 0.10),

            0 12px 30px
            rgba(0, 0, 0, 0.18);
        }

        .result-card.winner:hover {
          transform:
            translateY(-72px);

          box-shadow:
            0 0 16px
            rgba(255, 216, 61, 0.18),

            0 16px 35px
            rgba(0, 0, 0, 0.22);
        }


        /* =========================
           WINNER BADGE
        ========================= */

        .winner-badge {
          position: absolute;

          top: -17px;
          left: 50%;

          transform:
            translateX(-50%);

          display: inline-flex;

          align-items: center;
          justify-content: center;

          gap: 7px;

          padding:
            7px 15px;

          border-radius: 999px;

          background:
            #ffd83d;

          color:
            #17333c;

          font-size:
            11px;

          font-weight:
            800;

          white-space:
            nowrap;
        }

        .winner-badge-icon {
          width: 14px;
          height: 14px;
        }


        /* =========================
           IMAGE
        ========================= */

        .result-card-image {
          width: 100%;
          height: 185px;

          display: flex;

          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border-radius: 13px;

          background:
            #dcecf6;

          color:
            #78909c;

          font-size:
            13px;

          overflow: hidden;
        }


        /* =========================
           GROUP NAME
        ========================= */

        .result-card-name-row {
          display: flex;

          align-items: center;
          justify-content: center;

          gap: 8px;

          margin-top: 20px;
        }

        .result-card-medal {
          width: 24px;
          height: 24px;

          color:
            #ffd83d;

          flex-shrink: 0;
        }

        .result-card-name {
          margin: 0;

          color:
            #ffffff;

          font-size:
            18px;

          font-weight:
            800;

          line-height: 1.35;

          text-align: center;
        }


        /* =========================
           MEMBERS
        ========================= */

        .result-card-members {
          display: flex;

          align-items: center;

          gap: 7px;

          margin-top: 18px;

          color: #ffffff;

          font-size: 12px;
        }

        .result-card-members-icon {
          width: 16px;
          height: 16px;
        }


        /* =========================
           DESCRIPTION
        ========================= */

        .result-card-description {
          margin-top: 22px;

          color: #ffffff;
        }

        .result-card-description h3 {
          margin: 0;

          font-size: 14px;

          font-weight: 700;
        }

        .result-card-description p {
          margin:
            12px 0 0;

          color:
            #f4f7f8;

          font-size: 12px;

          line-height: 1.55;

          text-align: center;
        }


        /* =========================
           CARD ANIMATION
        ========================= */

        @keyframes winnerEntrance {
          from {
            opacity: 0;

            transform:
              translateY(10px)
              scale(0.97);
          }

          to {
            opacity: 1;

            transform:
              translateY(-65px)
              scale(1);
          }
        }

        @keyframes cardEntrance {
          from {
            opacity: 0;

            transform:
              translateY(18px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0);
          }
        }

        @keyframes winnerGlow {
          from {
            box-shadow:
              0 0 7px
              rgba(255, 216, 61, 0.06),

              0 10px 25px
              rgba(0, 0, 0, 0.15);
          }

          to {
            box-shadow:
              0 0 14px
              rgba(255, 216, 61, 0.14),

              0 12px 30px
              rgba(0, 0, 0, 0.18);
          }
        }


        /* ========================================
           SMALL DESKTOP / TABLET
           3 COLUMNS
        ======================================== */

        @media (max-width: 1250px) {

          .results-card-grid {
            grid-template-columns:
              repeat(
                3,
                minmax(220px, 1fr)
              );

            justify-content: center;

            row-gap: 80px;
          }

          .result-card.winner {
            grid-column: 2;
            grid-row: 1;

            justify-self: center;
          }

        }


        /* ========================================
           IPAD MINI / IPAD AIR
           2 COLUMNS
        ======================================== */

        @media (max-width: 900px) {

          .results-card-grid {
            grid-template-columns:
              repeat(
                2,
                minmax(220px, 280px)
              );

            justify-content: center;

            column-gap: 32px;

            row-gap: 55px;

            margin-top: 80px;
          }


          /* First row */

          .result-card:nth-child(1) {
            grid-column: 1;
            grid-row: 1;
          }

          .result-card:nth-child(2) {
            grid-column: 2;
            grid-row: 1;
          }


          /* Winner centered */

          .result-card.winner {
            grid-column: 1 / -1;
            grid-row: 2;

            justify-self: center;

            transform:
              translateY(0);
          }


          /* Last row */

          .result-card:nth-child(4) {
            grid-column: 1;
            grid-row: 3;
          }

          .result-card:nth-child(5) {
            grid-column: 2;
            grid-row: 3;
          }


          /* Winner is NOT raised on iPad */

          .result-card.winner:hover {
            transform:
              translateY(-5px);
          }


          /* Normal entrance on iPad */

          @keyframes winnerEntrance {
            from {
              opacity: 0;

              transform:
                translateY(18px)
                scale(0.97);
            }

            to {
              opacity: 1;

              transform:
                translateY(0)
                scale(1);
            }
          }

        }


        /* ========================================
           PHONE
        ======================================== */

        @media (max-width: 560px) {

          .history-results-page {
            padding:
              28px 16px 60px;
          }


          /* ---------- TOP ---------- */

          .results-back-button {
            position: relative;

            top: auto;
            left: auto;

            width: 40px;
            height: 40px;

            margin-bottom: 22px;
          }

          .history-results-title {
            padding: 0;

            font-size:
              clamp(27px, 8vw, 36px);
          }

          .history-results-date {
            margin-top: 24px;
          }


          /* ---------- GRID ---------- */

          .results-card-grid {
            grid-template-columns:
              1fr;

            gap: 35px;

            margin-top: 55px;
          }


          /* Reset iPad positions */

          .result-card:nth-child(1),
          .result-card:nth-child(2),
          .result-card:nth-child(4),
          .result-card:nth-child(5),
          .result-card.winner {
            grid-column: auto;
            grid-row: auto;
          }


          /* ---------- CARDS ---------- */

          .result-card {
            width: 100%;

            max-width: 340px;

            min-height: 430px;

            margin: 0 auto;

            justify-self: center;
          }


          /* ---------- WINNER ---------- */

          .result-card.winner {
            justify-self: center;

            transform:
              translateY(0);
          }

          .result-card.winner:hover {
            transform:
              translateY(-5px);
          }


          /* No raised winner on phone */

          @keyframes winnerEntrance {
            from {
              opacity: 0;

              transform:
                translateY(18px)
                scale(0.97);
            }

            to {
              opacity: 1;

              transform:
                translateY(0)
                scale(1);
            }
          }


          .result-card-image {
            height: 185px;
          }

          .result-card-name {
            font-size: 18px;
          }

          .result-card-description p {
            font-size: 12px;

            line-height: 1.6;
          }

        }


        /* =========================
           VERY SMALL PHONE
        ========================= */

        @media (max-width: 390px) {

          .history-results-page {
            padding:
              24px 14px 55px;
          }

          .results-card-grid {
            margin-top: 45px;

            gap: 30px;
          }

          .result-card {
            max-width: 100%;

            min-height: 420px;

            padding: 15px;
          }

          .result-card-image {
            height: 175px;
          }

          .result-card-name {
            font-size: 17px;
          }

          .winner-badge {
            padding:
              6px 13px;

            font-size: 10px;
          }

        }


        /* =========================
           REDUCED MOTION
        ========================= */

        @media (
          prefers-reduced-motion:
          reduce
        ) {

          .history-results-content,
          .result-card {
            animation:
              none !important;

            opacity:
              1 !important;

            filter:
              none !important;

            transform:
              none !important;
          }

        }

      `}</style>


      <main className="history-results-page">

        <div
          className={
            isLeaving
              ? "history-results-content page-exit"
              : "history-results-content"
          }
        >

          <div className="history-results-container">


            {/* TOP AREA */}

            <div className="results-top-area">

              <button
                type="button"
                className="results-back-button"
                onClick={handleBack}
                aria-label="Back to History"
              >

                <HiOutlineArrowLeft
                  className="results-back-icon"
                  aria-hidden="true"
                />

              </button>


              <h1 className="history-results-title">
                {show.title}
              </h1>

            </div>


            {/* DATE */}

            <div className="history-results-date">

              <HiOutlineCalendarDays
                className="history-results-date-icon"
                aria-hidden="true"
              />

              <span>
                {show.date}
              </span>

            </div>


            {/* RESULT CARDS */}

            <section className="results-card-grid">

              {groups.map((group, index) => {

                const animationStyle =
                  group.winner
                    ? {
                        animation:
                          "winnerEntrance 0.45s ease 0s forwards, winnerGlow 2.8s ease-in-out 0.8s infinite alternate",
                      }
                    : {
                        animation:
                          `cardEntrance 0.38s ease ${
                            0.16 + index * 0.035
                          }s forwards`,
                      };


                return (

                  <article
                    key={group.id}

                    className={
                      group.winner
                        ? "result-card winner"
                        : "result-card"
                    }

                    style={animationStyle}
                  >


                    {/* WINNER BADGE */}

                    {group.winner && (

                      <div className="winner-badge">

                        <FaMedal
                          className="winner-badge-icon"
                          aria-hidden="true"
                        />

                        WINNER

                      </div>

                    )}


                    {/* IMAGE */}

                    <div className="result-card-image">
                      Project Image
                    </div>


                    {/* GROUP NAME */}

                    <div className="result-card-name-row">

                      {group.winner && (

                        <FaMedal
                          className="result-card-medal"
                          aria-hidden="true"
                        />

                      )}

                      <h2 className="result-card-name">
                        {group.name}
                      </h2>

                    </div>


                    {/* MEMBERS */}

                    <div className="result-card-members">

                      <HiOutlineUserGroup
                        className="result-card-members-icon"
                        aria-hidden="true"
                      />

                      <span>
                        {group.members} Members
                      </span>

                    </div>


                    {/* DESCRIPTION */}

                    <div className="result-card-description">

                      <h3>
                        Description
                      </h3>

                      <p>
                        {group.description}
                      </p>

                    </div>

                  </article>
                );
              })}

            </section>

          </div>

        </div>

      </main>
    </>
  );
}