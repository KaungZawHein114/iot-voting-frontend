import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { HiOutlineArrowLeft } from "react-icons/hi2";

import "./votingPage.css";
import gustoLogo from "../assets/gusto-logo.png";
import { getBallot, submitVote } from "../api/voting";
import { getErrorMessage } from "../api/client";
import LoadingState from "../components/LoadingState";
import VoterInfoForm from "../components/VoterInfoForm";

const ACCESS_MESSAGES = {
  NO_ACCESS: {
    title: "Voting access required",
    body: "Scan the live QR code displayed at the show to enter voting.",
  },
  EXPIRED: {
    title: "Voting access expired",
    body: "This voting chance is no longer valid. Scan the current QR code if voting is still open.",
  },
  CLOSED: {
    title: "Voting is closed",
    body: "This voting session can no longer submit a vote.",
  },
  VOTED: {
    title: "Vote submitted",
    body: "Your selections have been recorded. This voting session cannot vote again.",
  },
};

function AccessScreen({ pageState, batch }) {
  const navigate = useNavigate();
  const message = ACCESS_MESSAGES[pageState] || ACCESS_MESSAGES.NO_ACCESS;
  return (
    <div className="vote-page">
      <div className="vote-page__main" style={{ paddingTop: 64, textAlign: "center" }}>
        <h1 className="vote-page__title">{message.title}</h1>
        <p className="vote-page__subtitle" style={{ marginTop: 12 }}>{message.body}</p>
        <button
          type="button"
          className="vote-submit-btn"
          style={{ marginTop: 32 }}
          onClick={() => navigate(`/projects/${batch}`)}
        >
          View groups instead
        </button>
      </div>
    </div>
  );
}

export default function VotingPage() {
  const { batch } = useParams();
  const navigate = useNavigate();

  const [ballot, setBallot] = useState(null); // raw API payload
  const [loadError, setLoadError] = useState(null);
  const [selections, setSelections] = useState({}); // categoryId -> groupId
  const [openCategory, setOpenCategory] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  // Collected once, after admission and before the ballot is shown — for
  // manual post-event review only (see components/VoterInfoForm.jsx).
  const [voterInfo, setVoterInfo] = useState(null);

  const loadBallot = () => {
    setBallot(null);
    setLoadError(null);
    getBallot(batch)
      .then((data) => {
        setBallot(data);
        if (data.categories.length > 0) setOpenCategory(data.categories[0].id);
      })
      .catch((err) => setLoadError(getErrorMessage(err, "Couldn't load the ballot.")));
  };

  useEffect(loadBallot, [batch]);

  const allAnswered = useMemo(() => {
    if (!ballot) return false;
    return ballot.categories.every((category) => Boolean(selections[category.id]));
  }, [ballot, selections]);

  const handleSelect = (categoryId, groupId) => {
    setSelections((prev) => ({ ...prev, [categoryId]: groupId }));
  };

  const handleSubmit = async () => {
    if (!allAnswered || submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const selectionPayload = ballot.categories.map((category) => ({
        votingCategory: category.id,
        group: selections[category.id],
      }));
      await submitVote(batch, selectionPayload, ballot.csrfToken, voterInfo);
      navigate("/thank-you", { state: { batch } });
    } catch (err) {
      setSubmitError(getErrorMessage(err, "Couldn't submit your vote. Please try again."));
      // The session may have expired or already voted between load and
      // submit — refresh the ballot so the UI reflects the real state.
      loadBallot();
    } finally {
      setSubmitting(false);
    }
  };

  if (loadError) {
    return (
      <div className="vote-page">
        <div className="vote-page__main" style={{ paddingTop: 64, textAlign: "center" }}>
          <h1 className="vote-page__title">Couldn't load this ballot</h1>
          <p className="vote-page__subtitle" style={{ marginTop: 12 }}>{loadError}</p>
          <button type="button" className="vote-submit-btn" style={{ marginTop: 32 }} onClick={loadBallot}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!ballot) {
    return (
      <div className="vote-page">
        <div className="vote-page__main"><LoadingState label="Loading ballot…" /></div>
      </div>
    );
  }

  if (ballot.pageState !== "OPEN") {
    return <AccessScreen pageState={ballot.pageState} batch={batch} />;
  }

  if (!voterInfo) {
    return <VoterInfoForm onSubmit={setVoterInfo} />;
  }

  return (
    <div className="vote-page">
      <div className="vote-page__header">
        <button type="button" className="vote-page__back-btn" onClick={() => navigate(`/welcome/${batch}`)} aria-label="Back">
          <HiOutlineArrowLeft aria-hidden="true" />
        </button>
        <img src={gustoLogo} alt="" className="vote-page__logo" />
      </div>

      <div className="vote-page__main">
        <h1 className="vote-page__title">{ballot.project.theme || ballot.project.batch}</h1>
        <p className="vote-page__subtitle">Pick one group per category, then submit your ballot.</p>

        <div className="vote-categories">
          {ballot.categories.map((category) => {
            const isOpen = openCategory === category.id;
            const selectedGroup = ballot.groups.find((g) => g.id === selections[category.id]);
            return (
              <div className="vote-category" key={category.id}>
                <button
                  type="button"
                  className="vote-category__trigger"
                  onClick={() => setOpenCategory(isOpen ? null : category.id)}
                  aria-expanded={isOpen}
                >
                  <div className="vote-category__info">
                    <div className="vote-category__name">{category.name}</div>
                    <div className="vote-category__question">{category.description}</div>
                    {selectedGroup && (
                      <div className="vote-category__selected-label">
                        Selected: Group {selectedGroup.groupNumber} · {selectedGroup.title}
                      </div>
                    )}
                  </div>
                  <FiChevronDown className={`vote-chevron${isOpen ? " vote-chevron--open" : ""}`} aria-hidden="true" />
                </button>
                <div className={`vote-category__body${isOpen ? " vote-category__body--open" : " vote-category__body--closed"}`}>
                  <div className="vote-category__body-inner">
                    <div className="vote-category__options">
                      {ballot.groups.map((group) => {
                        const active = selections[category.id] === group.id;
                        return (
                          <label
                            key={group.id}
                            className={`vote-option${active ? " vote-option--active" : ""}`}
                          >
                            <span>
                              <span className="vote-option__name">Group {group.groupNumber} · {group.title}</span>
                              <span className="vote-option__team">{group.members.join(", ")}</span>
                            </span>
                            <input
                              type="radio"
                              className="vote-option__radio"
                              name={`category-${category.id}`}
                              checked={active}
                              onChange={() => handleSelect(category.id, group.id)}
                            />
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {submitError && <p className="vote-success-msg" style={{ color: "var(--color-danger)" }}>{submitError}</p>}

        <button
          type="button"
          className="vote-submit-btn"
          disabled={!allAnswered || submitting}
          onClick={handleSubmit}
        >
          {submitting ? "Submitting…" : "Submit ballot"}
        </button>
      </div>
    </div>
  );
}
