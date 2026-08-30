import client from "./client";

// Every published project/show — Home and History bucket these by `state`.
export const listProjects = () =>
  client.get("/public/projects").then((res) => res.data.data.projects);

// One project/show plus its active groups.
export const getProject = (batch) =>
  client.get(`/public/projects/${encodeURIComponent(batch)}`).then((res) => res.data.data);

// Per-category vote tallies — only available once the show has closed.
export const getProjectResults = (batch) =>
  client
    .get(`/public/projects/${encodeURIComponent(batch)}/results`)
    .then((res) => res.data.data);
