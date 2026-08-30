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
export const submitVote = (batch, selections, csrfToken) =>
  client
    .post(
      `/voting/${encodeURIComponent(batch)}/votes`,
      { selections },
      { headers: { "x-vote-csrf": csrfToken } },
    )
    .then((res) => res.data.data);
