import "./states.css";

export default function LoadingState({ label = "Loading…" }) {
  return (
    <div className="state-block state-block--loading" role="status">
      <span className="state-spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}
