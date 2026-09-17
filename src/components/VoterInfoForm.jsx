import { useState } from "react";
import { FiAlertTriangle, FiChevronDown, FiHash, FiUser } from "react-icons/fi";

import { BATCH_TYPES, MAX_VOTER_NAME_LENGTH } from "../constants/voterBatch";
import "./voterInfoForm.css";

// Shown once, right after admission and before the ballot, so event
// organizers can manually verify votes after the show. This is not a
// technical duplicate-vote guard — the backend re-validates everything here
// independently and it's just carried along with the final vote submission.
export default function VoterInfoForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [batchType, setBatchType] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Please enter your full name.");
      return;
    }
    if (trimmedName.length > MAX_VOTER_NAME_LENGTH) {
      setError(`Name must be ${MAX_VOTER_NAME_LENGTH} characters or fewer.`);
      return;
    }
    if (!BATCH_TYPES.includes(batchType)) {
      setError("Please select your batch.");
      return;
    }
    if (!/^[1-9]\d*$/.test(batchNumber.trim())) {
      setError("Please enter a valid batch number (a positive whole number).");
      return;
    }

    setError("");
    onSubmit({
      voterName: trimmedName,
      batchType,
      batchNumber: Number(batchNumber),
    });
  };

  return (
    <div className="vote-page">
      <div className="vote-page__main voter-info">
        <h1 className="vote-page__title">Before you vote</h1>
        <p className="vote-page__subtitle">
          Enter your name and batch so event organizers can verify votes after the show.
        </p>

        <form onSubmit={handleSubmit} className="voter-info__form">
          <label className="voter-info__field">
            <span className="voter-info__label">
              <FiUser aria-hidden="true" /> Full name
            </span>
            <input
              type="text"
              className="voter-info__input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={MAX_VOTER_NAME_LENGTH}
              placeholder="e.g. Aye Aye Mon"
              autoComplete="off"
            />
          </label>

          <label className="voter-info__field">
            <span className="voter-info__label">Batch</span>
            <span className="voter-info__select-wrap">
              <select
                className="voter-info__input voter-info__select"
                value={batchType}
                onChange={(event) => setBatchType(event.target.value)}
              >
                <option value="">Select your batch</option>
                {BATCH_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <FiChevronDown className="voter-info__select-icon" aria-hidden="true" />
            </span>
          </label>

          <label className="voter-info__field">
            <span className="voter-info__label">
              <FiHash aria-hidden="true" /> Batch number
            </span>
            <input
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              className="voter-info__input"
              value={batchNumber}
              onChange={(event) => setBatchNumber(event.target.value)}
              placeholder="e.g. 55"
            />
          </label>

          {batchType && batchNumber && (
            <p className="voter-info__preview">
              You entered: <strong>{batchType}-{batchNumber}</strong>
            </p>
          )}

          {error && <p className="voter-info__error">{error}</p>}

          <div className="voter-info__warning">
            <FiAlertTriangle aria-hidden="true" />
            <span>
              Please enter your <strong>real full name</strong> and <strong>correct batch</strong>.
              Votes with fake or invalid names/batches will be found and deleted during the
              post-event review with the project manager.
            </span>
          </div>

          <button type="submit" className="vote-submit-btn">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
