import { FiAlertTriangle } from "react-icons/fi";
import "./states.css";

export default function ErrorState({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="state-block state-block--error" role="alert">
      <FiAlertTriangle aria-hidden="true" className="state-block__icon" />
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="btn btn--outline" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
