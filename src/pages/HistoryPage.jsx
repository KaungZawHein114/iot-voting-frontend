import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArchive, FiArrowRight, FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { listProjects } from '../api/projects';
import { getErrorMessage } from '../api/client';
import '../pages/eventShowcase.css';

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
    : 'Date unknown';

const formatLocation = (location) => {
  const parts = [location?.room, location?.floor, location?.campus].filter(Boolean);
  return parts.length ? parts.join(', ') : null;
};

export default function HistoryPage() {
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    listProjects()
      .then((data) => { if (!cancelled) setProjects(data); })
      .catch((err) => { if (!cancelled) setError(getErrorMessage(err, "Couldn't load past shows.")); });
    return () => { cancelled = true; };
  }, []);

  const closed = (projects || []).filter((p) => p.state === 'VOTING_CLOSED');

  return (
    <div className="showcase-page">
      <Navbar />
      <header className="event-detail__header">
        <div className="container">
          <span className="showcase-status showcase-status--closed"><i aria-hidden="true" /> Archive</span>
          <h1>Past IoT shows</h1>
          <p>Every completed show, its groups, and its results.</p>
        </div>
      </header>

      <main className="container" style={{ paddingTop: 'var(--space-2xl)', paddingBottom: 'var(--space-3xl)' }}>
        {projects === null && !error && <LoadingState label="Loading past shows…" />}
        {error && <ErrorState message={error} onRetry={() => window.location.reload()} />}

        {projects !== null && !error && (
          closed.length > 0 ? (
            <div className="showcase-grid">
              {closed.map((project) => (
                <Link key={project.batch} to={`/projects/${project.batch}`} className="showcase-card">
                  <div className="showcase-card__image showcase-card__image--placeholder">
                    <span className="showcase-card__batch">{project.batch}</span>
                  </div>
                  <div className="showcase-card__body">
                    <div>
                      <h3>{project.theme || project.batch}</h3>
                      <p>Completed show</p>
                    </div>
                    <dl className="showcase-meta">
                      <div><FiCalendar aria-hidden="true" /><span>{formatDate(project.show.startDate)}</span></div>
                      <div><FiUsers aria-hidden="true" /><span>{project.groupCount} groups</span></div>
                      {formatLocation(project.show.location) && (
                        <div><FiMapPin aria-hidden="true" /><span>{formatLocation(project.show.location)}</span></div>
                      )}
                    </dl>
                    <span className="showcase-card__link">View results <FiArrowRight aria-hidden="true" /></span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={FiArchive}
              title="No past shows yet"
              message="Once a show's voting window closes, it will appear here with its groups and results."
            />
          )
        )}
      </main>
      <Footer />
    </div>
  );
}
