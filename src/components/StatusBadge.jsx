// Maps a project's backend voting `state` to a public-friendly label.
const STATE_META = {
  VOTING_OPEN: { label: "Voting open", modifier: "active" },
  UPCOMING: { label: "Upcoming", modifier: "upcoming" },
  VOTING_CLOSED: { label: "Closed", modifier: "closed" },
  NOT_PUBLISHED: { label: "Not published", modifier: "closed" },
};

export default function StatusBadge({ state }) {
  const meta = STATE_META[state] || { label: state, modifier: "closed" };
  return (
    <span className={`showcase-status showcase-status--${meta.modifier}`}>
      <i aria-hidden="true" />
      {meta.label}
    </span>
  );
}
