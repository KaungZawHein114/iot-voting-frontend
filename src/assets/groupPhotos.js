import group1 from "./groups/group-1.jpg";
import group2 from "./groups/group-2.jpg";
import group3 from "./groups/group-3.jpg";
import group4 from "./groups/group-4.jpg";
import group5 from "./groups/group-5.jpg";

// Uploaded group photos live on the backend's disk, which doesn't survive
// Render redeploys/cold starts, so they routinely go missing in production.
// Until that's fixed, every group show reuses these bundled photos instead
// (cycling through if there are more than 5 groups) — no network/API
// dependency, so a photo always renders.
const GROUP_PHOTOS = [group1, group2, group3, group4, group5];

export const getGroupPhoto = (groupNumber) => {
  const n = Number(groupNumber);
  if (!Number.isFinite(n)) return GROUP_PHOTOS[0];
  const index = ((n - 1) % GROUP_PHOTOS.length + GROUP_PHOTOS.length) % GROUP_PHOTOS.length;
  return GROUP_PHOTOS[index];
};
