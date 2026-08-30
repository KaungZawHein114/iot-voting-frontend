import { Link } from "react-router-dom";
import { FiCompass } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EmptyState from "../components/EmptyState";

export default function NotFound() {
  return (
    <div className="showcase-page">
      <Navbar />
      <div className="container" style={{ paddingTop: "var(--space-3xl)", paddingBottom: "var(--space-3xl)" }}>
        <EmptyState
          icon={FiCompass}
          title="Page not found"
          message="The page you're looking for doesn't exist or may have moved."
          action={
            <Link to="/" className="btn btn--primary">
              Back to Home
            </Link>
          }
        />
      </div>
      <Footer />
    </div>
  );
}
