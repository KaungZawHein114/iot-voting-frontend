import "./states.css";

export default function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="state-block state-block--empty">
      {Icon && <Icon aria-hidden="true" className="state-block__icon" />}
      {title && <h3>{title}</h3>}
      {message && <p>{message}</p>}
      {action}
    </div>
  );
}
