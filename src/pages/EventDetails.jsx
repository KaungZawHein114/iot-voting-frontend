import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiClock, FiMapPin, FiUsers, FiX } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { events, getEvent } from '../data/events';
import './eventShowcase.css';

const tones = ['blue', 'green', 'violet', 'amber', 'rose'];

function MemberDialog({ member, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => { window.removeEventListener('keydown', onKeyDown); previous?.focus?.(); };
  }, [onClose]);

  return <div className="member-dialog" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="member-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="member-dialog-title">
      <button ref={closeRef} type="button" className="member-dialog__close" onClick={onClose} aria-label="Close profile"><FiX /></button>
      <span className="member-dialog__avatar">{member.name.slice(0, 2).toUpperCase()}</span>
      <span className="section-label">Team member</span><h2 id="member-dialog-title">{member.name}</h2><p>{member.role}</p>
      <button type="button" className="btn btn--outline" onClick={onClose}>Close profile</button>
    </div>
  </div>;
}

function TeamRow({ team, index, onMemberClick }) {
  return <article className="team-row">
    <div className="team-row__image"><img src={team.image} alt={`${team.name} prototype`} /><span>#{index + 1}</span></div>
    <div className="team-row__info">
      <h2>{team.name}</h2><span><FiUsers /> {team.members.length} members</span><h3>About project</h3><p>{team.about}</p>
    </div>
    <div className="team-row__members"><h3>Team members</h3><ul>{team.members.map((member, memberIndex) => <li key={member.name}>
      <button type="button" onClick={() => onMemberClick(member)}>
        <span className={`member-dot member-dot--${tones[memberIndex % tones.length]}`}>{member.name.slice(0, 2).toUpperCase()}</span>
        <span><strong>{member.name}</strong><small>{member.role}</small></span>
      </button>
    </li>)}</ul></div>
  </article>;
}

export default function EventDetails() {
  const { eventId } = useParams();
  const event = getEvent(eventId) || events[0];
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${event.title} — IoT Vote`;
    return () => { document.title = previousTitle; };
  }, [event.title]);

  return <div className="showcase-page">
    <Navbar />
    <main className="event-detail">
      <header className="event-detail__header"><div className="container">
        <Link to="/" className="event-back"><FiArrowLeft /> Back to events</Link>
        <span className={`showcase-status showcase-status--${event.status}`}><i />{event.status === 'active' ? 'Voting open' : 'Upcoming'}</span>
        <h1>{event.title}</h1><p>{event.tagline}</p>
        <dl className="event-detail__meta">
          <div><FiCalendar /><span>{event.date}</span></div><div><FiClock /><span>{event.time}</span></div>
          <div><FiMapPin /><span>{event.location}</span></div><div><FiUsers /><span>{event.teams.length} teams competing</span></div>
        </dl>
      </div></header>
      <section className="event-teams container" aria-labelledby="event-teams-title">
        <div className="event-teams__heading"><span className="section-label">The builders</span><h2 id="event-teams-title">Meet the competing teams</h2><p>Select a member to view their role.</p></div>
        <div className="event-teams__list">{event.teams.map((team, index) => <TeamRow key={team.id} team={team} index={index} onMemberClick={setSelectedMember} />)}</div>
      </section>
    </main>
    <Footer />
    {selectedMember && <MemberDialog member={selectedMember} onClose={() => setSelectedMember(null)} />}
  </div>;
}
