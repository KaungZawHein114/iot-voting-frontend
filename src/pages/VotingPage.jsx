import { useState } from 'react';
import axios from 'axios';
import gustoLogo from '../assets/gusto-logo.png';
import heroImg from '../assets/hero.png';
import './votingPage.css';

const categories = [
  { id: 'innovation',   icon: '💡', title: 'Innovation',   question: 'Which group has the most innovative idea?' },
  { id: 'design',       icon: '🎨', title: 'Design',       question: 'Which Project has the best design?' },
  { id: 'functionality',icon: '⚙️', title: 'Functionality', question: 'Which project works most effectively?' },
  { id: 'impact',       icon: '🌍', title: 'Impact',       question: 'Which project could have the greatest impact?' },
];

const groupsByCategory = {
  innovation: [
    { id: 'inn-1', name: 'Group-1', team: 'AI Smart City Team' },
    { id: 'inn-2', name: 'Group-2', team: 'Autonomous Drone Team' },
    { id: 'inn-3', name: 'Group-3', team: 'Green Energy Grid' },
    { id: 'inn-4', name: 'Group-4', team: 'AR Medical Assistant' },
    { id: 'inn-5', name: 'Group-5', team: 'Eco Plastic Recycler' },
  ],
  design: [
    { id: 'des-1', name: 'Group-1', team: 'UI/UX Redesign Team' },
    { id: 'des-2', name: 'Group-2', team: '3D Product Modeling' },
    { id: 'des-3', name: 'Group-3', team: 'Minimalist Brand Kit' },
    { id: 'des-4', name: 'Group-4', team: 'Interactive Dashboard' },
    { id: 'des-5', name: 'Group-5', team: 'Creative Motion Design' },
  ],
  functionality: [
    { id: 'func-1', name: 'Group-1', team: 'Smart Home Automation' },
    { id: 'func-2', name: 'Group-2', team: 'High-Speed DBMS' },
    { id: 'func-3', name: 'Group-3', team: 'Real-time Chat Engine' },
    { id: 'func-4', name: 'Group-4', team: 'E-Commerce Gateway' },
    { id: 'func-5', name: 'Group-5', team: 'Automated Testing Bot' },
  ],
  impact: [
    { id: 'imp-1', name: 'Group-1', team: 'Clean Water Filter Tech' },
    { id: 'imp-2', name: 'Group-2', team: 'Disaster Alert System' },
    { id: 'imp-3', name: 'Group-3', team: 'Solar Grid Optimizer' },
    { id: 'imp-4', name: 'Group-4', team: 'EduTech for Rural Areas' },
    { id: 'imp-5', name: 'Group-5', team: 'Waste Management Network' },
  ],
};

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`vote-chevron${open ? ' vote-chevron--open' : ''}`}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function VotingPage() {
  const [openId, setOpenId]       = useState(null);
  const [selections, setSelections] = useState({});
  const [submitted, setSubmitted]   = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allAnswered = categories.every((c) => selections[c.id]);

  const handleVoteSubmit = async () => {
    if (!allAnswered || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/vote', {
        votes: selections,
      });
      if (response.status === 200 || response.status === 201) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Failed to submit vote:', error);
      alert('Failed to submit vote. Please make sure the backend server is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="vote-page">
      {/* Logo header */}
      <header className="vote-page__header">
        <img src={gustoLogo} alt="Gusto College" className="vote-page__logo" />
      </header>

      <main className="vote-page__main">
        {/* Back button */}
        <button
          type="button"
          id="vote-back-btn"
          onClick={() => window.history.back()}
          aria-label="Go back"
          className="vote-page__back-btn"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
        </button>

        <h1 className="vote-page__title">Let&apos;s Vote</h1>
        <p className="vote-page__subtitle">Choose one group for each category</p>

        <img
          src={heroImg}
          alt="Student IoT robot project on display"
          loading="lazy"
          className="vote-page__hero-img"
        />

        {/* Category dropdowns */}
        <div className="vote-categories">
          {categories.map((category) => {
            const open = openId === category.id;
            const chosen = selections[category.id];
            const categoryGroups = groupsByCategory[category.id] || [];
            const selectedGroup = categoryGroups.find((g) => g.id === chosen);

            return (
              <section className="vote-category" key={category.id}>
                <button
                  type="button"
                  id={`vote-category-${category.id}`}
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : category.id)}
                  className="vote-category__trigger"
                >
                  <div className="vote-category__info">
                    <h2 className="vote-category__name">
                      <span aria-hidden="true">{category.icon}</span>
                      {category.title}
                    </h2>
                    <p className="vote-category__question">{category.question}</p>
                    {chosen && !open && (
                      <p className="vote-category__selected-label">
                        Selected: {selectedGroup?.name} ({selectedGroup?.team})
                      </p>
                    )}
                  </div>
                  <ChevronIcon open={open} />
                </button>

                <div className={`vote-category__body ${open ? 'vote-category__body--open' : 'vote-category__body--closed'}`}>
                  <div className="vote-category__body-inner">
                    <div className="vote-category__options">
                      {categoryGroups.map((group) => {
                        const active = chosen === group.id;
                        return (
                          <label
                            key={group.id}
                            className={`vote-option${active ? ' vote-option--active' : ''}`}
                          >
                            <span>
                              <span className="vote-option__name">{group.name}</span>
                              <span className="vote-option__team">{group.team}</span>
                            </span>
                            <input
                              type="radio"
                              name={category.id}
                              value={group.id}
                              checked={active}
                              onChange={() =>
                                setSelections((prev) => ({ ...prev, [category.id]: group.id }))
                              }
                              className="vote-option__radio"
                            />
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Submit */}
        <button
          type="button"
          id="vote-submit-btn"
          disabled={!allAnswered || isSubmitting}
          onClick={handleVoteSubmit}
          className="vote-submit-btn"
        >
          {isSubmitting ? 'Submitting…' : 'Vote'}
        </button>

        {submitted && (
          <p className="vote-success-msg">✅ Thanks! Your vote has been recorded.</p>
        )}
      </main>
    </div>
  );
}
