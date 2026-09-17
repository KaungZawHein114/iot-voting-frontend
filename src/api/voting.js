import client from "./client";

// Claims a single-use QR token, establishing the voter's session cookie.
export const admit = (batch, token) =>
  client
    .post(`/voting/${encodeURIComponent(batch)}/admit`, { token })
    .then((res) => res.data.data);

// The current ballot for this browser's session: pageState + groups +
// categories + a CSRF token to echo back on submit.
export const getBallot = (batch) =>
  client.get(`/voting/${encodeURIComponent(batch)}/ballot`).then((res) => res.data.data);

// selections: [{ votingCategory, group }]
// voterInfo: { voterName, batchType, batchNumber } — collected after
// admission for manual post-event review, re-validated server-side.
export const submitVote = (batch, selections, csrfToken, voterInfo) =>
  client
    .post(
      `/voting/${encodeURIComponent(batch)}/votes`,
      { selections, ...voterInfo },
      { headers: { "x-vote-csrf": csrfToken } },
    )
    .then((res) => res.data.data);
