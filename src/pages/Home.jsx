import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiClock, FiMapPin, FiShield, FiUsers, FiZap } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import heroImage from '../assets/hero-vote.png';
import { events } from '../data/events';
import './eventShowcase.css';

function EventCard({ event }) {
  return (
    <Link to={`/events/${event.id}`} className="showcase-card">
      <div className="showcase-card__image">
        <img src={event.image} alt="" />
        <span className={`showcase-status showcase-status--${event.status}`}>
          <i aria-hidden="true" />{event.status === 'active' ? 'Voting open' : 'Upcoming'}
        </span>
      </div>
      <div className="showcase-card__body">
        <div><h3>{event.title}</h3><p>{event.tagline}</p></div>
        <dl className="showcase-meta">
          <div><FiCalendar aria-hidden="true" /><span>{event.date}</span></div>
          <div><FiClock aria-hidden="true" /><span>{event.time.split('–')[0].trim()}</span></div>
          <div><FiMapPin aria-hidden="true" /><span>{event.location}</span></div>
          <div><FiUsers aria-hidden="true" /><span>{event.teams.length} teams</span></div>
        </dl>
        <span className="showcase-card__link">Meet the teams <FiArrowRight aria-hidden="true" /></span>
      </div>
    </Link>
  );
}

export default function Home() {
  const active = events.filter((event) => event.status === 'active');
  const upcoming = events.filter((event) => event.status === 'upcoming');

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
              <Link className="btn btn--primary" to={`/events/${events[0].id}`}>Explore live event <FiArrowRight /></Link>
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

        {active.length > 0 && <section className="showcase-section container" aria-labelledby="active-events-title">
          <div className="showcase-section__heading">
            <div><span className="section-label">Happening now</span><h2 id="active-events-title">Active events</h2></div>
            <span className="showcase-live-count"><i /> {active.length} live</span>
          </div>
          <div className="showcase-grid">{active.map((event) => <EventCard key={event.id} event={event} />)}</div>
        </section>}

        <section className="showcase-section showcase-section--last container" aria-labelledby="upcoming-events-title">
          <div className="showcase-section__heading">
            <div><span className="section-label">On the horizon</span><h2 id="upcoming-events-title">Upcoming IoT shows</h2></div>
            <p>More bold projects, thoughtful teams, and ideas worth supporting.</p>
          </div>
          <div className="showcase-grid">{upcoming.map((event) => <EventCard key={event.id} event={event} />)}</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
