// Must match iot-voting-backend's utils/batchTypes.js exactly — the backend
// re-validates this list independently and rejects anything else, so this
// is only for building the dropdown, not a source of truth on its own.
export const BATCH_TYPES = [
  "HND-COMPUTING",
  "HND-BUSINESS",
  "GED",
  "IGCSE",
  "UoS-Cohort",
  "GUF",
  "Level-3",
];

export const MAX_VOTER_NAME_LENGTH = 100;
