import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiAward, FiCalendar, FiClock, FiMapPin, FiUsers } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StatusBadge from '../components/StatusBadge';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { getProject, getProjectResults } from '../api/projects';
import { assetUrl, getErrorMessage } from '../api/client';
import './eventShowcase.css';
import './projectPage.css';

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : 'Date to be announced';

const formatLocation = (location) => {
  const parts = [location?.room, location?.floor, location?.campus].filter(Boolean);
  return parts.length ? parts.join(', ') : 'Location to be announced';
};

function GroupImage({ images }) {
  const url = images?.length ? assetUrl(images[0]) : null;
  return (
    <div className="team-row__image">
      {url ? <img src={url} alt="" /> : <span className="team-row__image-placeholder" aria-hidden="true">📡</span>}
      <span>Group</span>
    </div>
  );
}

function GroupRow({ group }) {
  return (
    <article className="team-row">
      <GroupImage images={group.images} />
      <div className="team-row__info">
        <h2>Group {group.groupNumber} · {group.title}</h2>
        <p>{group.description}</p>
      </div>
      <div className="team-row__members">
        <h3>Members</h3>
        <ul>
          {group.members.map((name) => (
            <li key={name} className="team-row__member">{name}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ResultsSection({ batch }) {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getProjectResults(batch)
      .then((data) => { if (!cancelled) setResults(data); })
      .catch((err) => { if (!cancelled) setError(getErrorMessage(err, "Results aren't available yet.")); });
    return () => { cancelled = true; };
  }, [batch]);

  if (error) return null;
  if (!results) return <LoadingState label="Loading results…" />;

  return (
    <section className="event-teams container" aria-labelledby="results-title">
      <div className="event-teams__heading">
        <span className="section-label">Final results</span>
        <h2 id="results-title">Category winners</h2>
        <p>The group with the most votes wins each category.</p>
      </div>
      <div className="results-grid">
        {results.categories.map((category) => {
          const ranked = [...category.groups].sort((a, b) => b.voteCount - a.voteCount);
          const winner = ranked[0];
          return (
            <div className="results-card" key={category.id}>
              <h3>{category.name}</h3>
              <p className="results-card__desc">{category.description}</p>
              {winner && winner.voteCount > 0 ? (
                <div className="results-card__winner">
                  <FiAward aria-hidden="true" />
                  <span>Group {winner.groupNumber} · {winner.title}</span>
                </div>
              ) : (
                <p className="results-card__no-votes">No votes were cast in this category.</p>
              )}
              <ol className="results-card__list">
                {ranked.map((group) => (
                  <li key={group.id}>
                    <span>Group {group.groupNumber} · {group.title}</span>
                    <strong>{group.voteCount} {group.voteCount === 1 ? 'vote' : 'votes'}</strong>
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function ProjectPage() {
  const { batch } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setData(null);
    setError(null);
    getProject(batch)
      .then((res) => { if (!cancelled) setData(res); })
      .catch((err) => { if (!cancelled) setError(getErrorMessage(err, "Couldn't load this show.")); });
    return () => { cancelled = true; };
  }, [batch]);

  if (error) {
    return (
      <div className="showcase-page">
        <Navbar />
        <div className="container" style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}>
          <ErrorState message={error} />
          <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)' }}>
            <Link to="/" className="btn btn--outline"><FiArrowLeft /> Back to Home</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="showcase-page">
        <Navbar />
        <div className="container" style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}>
          <LoadingState label="Loading show…" />
        </div>
        <Footer />
      </div>
    );
  }

  const { project, groups } = data;
  const isCompleted = project.status === 'COMPLETED';

  return (
    <div className="showcase-page">
      <Navbar />
      <header className="event-detail__header">
        <div className="container">
          <Link to="/" className="event-back"><FiArrowLeft aria-hidden="true" /> Back to shows</Link>
          <StatusBadge state={project.state} />
          <h1>{project.theme || project.batch}</h1>
          <p>{project.batch} · IoT project show</p>
          <dl className="event-detail__meta">
            <div><FiCalendar aria-hidden="true" /><span>{formatDate(project.show.startDate)}</span></div>
            <div><FiClock aria-hidden="true" /><span>{project.show.startTime && project.show.endTime ? `${project.show.startTime}–${project.show.endTime}` : 'Time TBA'}</span></div>
            <div><FiMapPin aria-hidden="true" /><span>{formatLocation(project.show.location)}</span></div>
            <div><FiUsers aria-hidden="true" /><span>{groups.length} groups</span></div>
          </dl>
          {project.state === 'VOTING_OPEN' && (
            <p className="event-detail__hint">Voting is open now for attendees at the venue — scan the QR code on display to cast your vote.</p>
          )}
        </div>
      </header>

      <section className="event-teams container" aria-labelledby="groups-title">
        <div className="event-teams__heading">
          <span className="section-label">Groups</span>
          <h2 id="groups-title">Meet the groups</h2>
          <p>Every group participating in this show.</p>
        </div>
        {groups.length > 0 ? (
          <div className="event-teams__list">
            {groups.map((group) => <GroupRow key={group.id} group={group} />)}
          </div>
        ) : (
          <p className="results-card__no-votes">Groups for this show haven't been published yet.</p>
        )}
      </section>

      {isCompleted && <ResultsSection batch={project.batch} />}

      <Footer />
    </div>
  );
}
