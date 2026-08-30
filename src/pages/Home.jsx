import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiClock, FiMapPin, FiShield, FiUsers, FiZap } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StatusBadge from '../components/StatusBadge';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import heroImage from '../assets/hero-vote.png';
import { listProjects } from '../api/projects';
import { getErrorMessage } from '../api/client';
import './eventShowcase.css';

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
    : 'Date TBA';

const formatLocation = (location) => {
  const parts = [location?.room, location?.floor, location?.campus].filter(Boolean);
  return parts.length ? parts.join(', ') : 'Location TBA';
};

function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.batch}`} className="showcase-card">
      <div className="showcase-card__image showcase-card__image--placeholder">
        <span className="showcase-card__batch">{project.batch}</span>
        <StatusBadge state={project.state} />
      </div>
      <div className="showcase-card__body">
        <div>
          <h3>{project.theme || project.batch}</h3>
          <p>IoT project show</p>
        </div>
        <dl className="showcase-meta">
          <div><FiCalendar aria-hidden="true" /><span>{formatDate(project.show.startDate)}</span></div>
          <div><FiClock aria-hidden="true" /><span>{project.show.startTime || 'TBA'}</span></div>
          <div><FiMapPin aria-hidden="true" /><span>{formatLocation(project.show.location)}</span></div>
          <div><FiUsers aria-hidden="true" /><span>{project.groupCount} groups</span></div>
        </dl>
        <span className="showcase-card__link">View groups <FiArrowRight aria-hidden="true" /></span>
      </div>
    </Link>
  );
}

export default function Home() {
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    listProjects()
      .then((data) => { if (!cancelled) setProjects(data); })
      .catch((err) => { if (!cancelled) setError(getErrorMessage(err, "Couldn't load shows.")); });
    return () => { cancelled = true; };
  }, []);

  const active = (projects || []).filter((p) => p.state === 'VOTING_OPEN');
  const upcoming = (projects || []).filter((p) => p.state === 'UPCOMING');

  return (
    <div className="showcase-page">
      <Navbar />
      <main>
        <section className="showcase-hero container">
          <div className="showcase-hero__copy">
            <span className="showcase-pill"><FiShield aria-hidden="true" /> QR verified voting</span>
            <h1>The future of <em>voting</em> is here.</h1>
            <p>Discover student-built IoT projects and cast a secure, transparent vote for the ideas shaping a smarter future.</p>
            <div className="showcase-hero__actions">
              <Link className="btn btn--primary" to="/history">See past shows <FiArrowRight /></Link>
              <Link className="btn btn--outline" to="/about-us">Meet our team</Link>
            </div>
            <ul className="showcase-benefits" aria-label="Platform benefits">
              <li><FiShield /> One scan, one vote</li><li><FiZap /> Live result sync</li>
            </ul>
          </div>
          <div className="showcase-hero__visual">
            <span className="showcase-orbit showcase-orbit--one" aria-hidden="true" />
            <span className="showcase-orbit showcase-orbit--two" aria-hidden="true" />
            <img src={heroImage} alt="Secure digital voting represented by a connected ballot box" />
          </div>
        </section>

        {projects === null && !error && (
          <div className="container"><LoadingState label="Loading shows…" /></div>
        )}

        {error && (
          <div className="container">
            <ErrorState message={error} onRetry={() => window.location.reload()} />
          </div>
        )}

        {projects !== null && !error && (
          <>
            {active.length > 0 && (
              <section className="showcase-section container" aria-labelledby="active-events-title">
                <div className="showcase-section__heading">
                  <div><span className="section-label">Happening now</span><h2 id="active-events-title">Active shows</h2></div>
                  <span className="showcase-live-count"><i /> {active.length} live</span>
                </div>
                <div className="showcase-grid">{active.map((p) => <ProjectCard key={p.batch} project={p} />)}</div>
              </section>
            )}

            <section className="showcase-section showcase-section--last container" aria-labelledby="upcoming-events-title">
              <div className="showcase-section__heading">
                <div><span className="section-label">On the horizon</span><h2 id="upcoming-events-title">Upcoming IoT shows</h2></div>
                <p>More bold projects, thoughtful teams, and ideas worth supporting.</p>
              </div>
              {upcoming.length > 0 ? (
                <div className="showcase-grid">{upcoming.map((p) => <ProjectCard key={p.batch} project={p} />)}</div>
              ) : (
                <EmptyState
                  title="No upcoming shows yet"
                  message="Check back soon — new IoT project shows are announced here as they're scheduled."
                />
              )}
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
