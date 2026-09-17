import { useState } from "react";

import { BATCH_TYPES, MAX_VOTER_NAME_LENGTH } from "../constants/voterBatch";

const fieldStyle = { display: "flex", flexDirection: "column", gap: 6, textAlign: "left" };
const inputStyle = {
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid var(--color-border, #ccc)",
  fontSize: 15,
};

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
      setError("Please enter your name.");
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
      <div className="vote-page__main" style={{ paddingTop: 64 }}>
        <h1 className="vote-page__title">Before you vote</h1>
        <p className="vote-page__subtitle">
          Enter your name and batch so event organizers can verify votes after the show.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 24, maxWidth: 420 }}
        >
          <label style={fieldStyle}>
            Name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={MAX_VOTER_NAME_LENGTH}
              placeholder="Your full name"
              style={inputStyle}
              autoComplete="off"
            />
          </label>

          <label style={fieldStyle}>
            Batch
            <select
              value={batchType}
              onChange={(event) => setBatchType(event.target.value)}
              style={inputStyle}
            >
              <option value="">Select your batch</option>
              {BATCH_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label style={fieldStyle}>
            Batch number
            <input
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              value={batchNumber}
              onChange={(event) => setBatchNumber(event.target.value)}
              placeholder="e.g. 55"
              style={inputStyle}
            />
          </label>

          {error && <p style={{ color: "var(--color-danger)", margin: 0 }}>{error}</p>}

          <button type="submit" className="vote-submit-btn">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
