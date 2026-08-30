import { useEffect, useMemo, useRef, useState } from 'react';

const portrait = (id) => `https://i.pravatar.cc/320?img=${id}`;

const team = {
  id: 'maya',
  name: 'Maya Chen',
  role: 'Founder & Director',
  description: 'Sets the vision and brings our people, product, and purpose together.',
  image: portrait(47),
  positions: { desktop: [50, 48], tablet: [50, 48], mobile: [50, 45] },
  children: [
    {
      id: 'elena', name: 'Elena Ortiz', role: 'Head of Product', image: portrait(44),
      description: 'Turns complex ideas into useful, human-centered products.',
      positions: { desktop: [21, 24], tablet: [22, 23], mobile: [23, 18] },
      staff: [
        { id: 'noah', name: 'Noah Kim', role: 'Product Designer', image: portrait(12), description: 'Designs calm, intuitive product experiences.', offset: { desktop: [-11, -12], tablet: [-10, -12], mobile: [-12, -9] } },
        { id: 'amina', name: 'Amina Yusuf', role: 'Product Strategist', image: portrait(32), description: 'Connects customer insight to product direction.', offset: { desktop: [-15, 9], tablet: [-13, 10], mobile: [-12, 10] } },
        { id: 'leo', name: 'Leo Martin', role: 'UX Researcher', image: portrait(5), description: 'Keeps real people at the center of every decision.', offset: { desktop: [7, -14], tablet: [9, -13], mobile: [13, -7] } },
      ],
    },
    {
      id: 'samuel', name: 'Samuel Reed', role: 'Technology Lead', image: portrait(11),
      description: 'Builds resilient systems and an engineering culture that lasts.',
      positions: { desktop: [79, 28], tablet: [78, 25], mobile: [77, 20] },
      staff: [
        { id: 'priya', name: 'Priya Shah', role: 'Frontend Engineer', image: portrait(49), description: 'Crafts fast, inclusive interfaces with polish.', offset: { desktop: [-2, -15], tablet: [-4, -13], mobile: [-14, -8] } },
        { id: 'marcus', name: 'Marcus Cole', role: 'Platform Engineer', image: portrait(15), description: 'Makes infrastructure secure, stable, and simple.', offset: { desktop: [13, -7], tablet: [13, -7], mobile: [13, -7] } },
        { id: 'sofia', name: 'Sofia Rossi', role: 'QA Engineer', image: portrait(25), description: 'Protects quality through thoughtful automation.', offset: { desktop: [14, 10], tablet: [12, 11], mobile: [11, 9] } },
      ],
    },
    {
      id: 'imani', name: 'Imani Brooks', role: 'Community Lead', image: portrait(45),
      description: 'Creates programs that turn participation into belonging.',
      positions: { desktop: [24, 74], tablet: [23, 75], mobile: [24, 73] },
      staff: [
        { id: 'hana', name: 'Hana Lee', role: 'Community Manager', image: portrait(10), description: 'Brings energy and care to every community moment.', offset: { desktop: [-14, -7], tablet: [-12, -8], mobile: [-12, -10] } },
        { id: 'jonah', name: 'Jonah Price', role: 'Events Producer', image: portrait(13), description: 'Turns gatherings into memorable shared experiences.', offset: { desktop: [-8, 14], tablet: [-6, 13], mobile: [12, 8] } },
      ],
    },
    {
      id: 'theo', name: 'Theo Laurent', role: 'Operations Lead', image: portrait(52),
      description: 'Creates the clarity and rhythm that help the team do its best work.',
      positions: { desktop: [72, 77], tablet: [75, 75], mobile: [76, 75] },
      staff: [
        { id: 'lucia', name: 'Lucia Vega', role: 'People Partner', image: portrait(23), description: 'Shapes a generous and high-performing team culture.', offset: { desktop: [13, -4], tablet: [12, -5], mobile: [12, -9] } },
        { id: 'elliot', name: 'Elliot Stone', role: 'Operations Manager', image: portrait(8), description: 'Keeps programs, partners, and details moving together.', offset: { desktop: [4, 15], tablet: [2, 14], mobile: [-12, 10] } },
      ],
    },
  ],
};

function useLayoutMode() {
  const getMode = () => window.innerWidth <= 640 ? 'mobile' : window.innerWidth <= 900 ? 'tablet' : 'desktop';
  const [mode, setMode] = useState(getMode);
  useEffect(() => {
    const update = () => setMode(getMode());
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return mode;
}

function curvedPath([x1, y1], [x2, y2], bend = 1) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const mx = x1 + dx * .52;
  const my = y1 + dy * .52;
  const curve = Math.min(4.5, Math.hypot(dx, dy) * .11) * bend;
  const nx = -dy / (Math.hypot(dx, dy) || 1);
  const ny = dx / (Math.hypot(dx, dy) || 1);
  return `M ${x1} ${y1} Q ${mx + nx * curve} ${my + ny * curve} ${x2} ${y2}`;
}

function ProfileCard({ person }) {
  return (
    <span className="profile-card" role="tooltip">
      <span className="profile-card__eyebrow">{person.role}</span>
      <strong>{person.name}</strong>
      <span>{person.description}</span>
    </span>
  );
}

function ProfileNode({ person, kind, position, visible, active, muted, delay = 0, expanded, onClick, cardOpen }) {
  const initials = person.name.split(' ').map((word) => word[0]).join('');
  return (
    <div
      className={`profile-node-wrap profile-node-wrap--${kind}${visible ? ' is-visible' : ''}${active ? ' is-active' : ''}${muted ? ' is-muted' : ''}${cardOpen ? ' is-card-open' : ''}${position[0] > 60 ? ' card-opens-left' : ''}`}
      style={{ '--node-x': `${position[0]}%`, '--node-y': `${position[1]}%`, '--node-delay': `${delay}ms` }}
    >
      <button
        type="button"
        className="profile-node"
        onClick={onClick}
        aria-label={`${person.name}, ${person.role}${kind === 'subleader' ? '. Select team' : ''}`}
        aria-expanded={kind === 'leader' || kind === 'subleader' ? expanded : undefined}
      >
        <span className="profile-node__fallback" aria-hidden="true">{initials}</span>
        <img src={person.image} alt={`${person.name}, ${person.role}`} onError={(event) => { event.currentTarget.style.display = 'none'; }} />
        {kind === 'leader' && <span className="profile-node__orbit" aria-hidden="true" />}
      </button>
      <span className="profile-node__label"><strong>{person.name}</strong><small>{person.role}</small></span>
      <ProfileCard person={person} />
    </div>
  );
}

export default function TeamHierarchy() {
  const sectionRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [activeBranch, setActiveBranch] = useState(null);
  const [openCard, setOpenCard] = useState(null);
  const [closing, setClosing] = useState(false);
  const autoExpanded = useRef(false);
  const mode = useLayoutMode();
  const leaderPosition = team.positions[mode];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= .28 && !autoExpanded.current) {
        autoExpanded.current = true;
        setExpanded(true);
      }
    }, { threshold: [.28] });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const positions = useMemo(() => team.children.map((child) => ({ child, point: child.positions[mode] })), [mode]);
  const active = team.children.find((child) => child.id === activeBranch);

  const toggleLeader = () => {
    setOpenCard(team.id);
    if (!expanded) {
      setExpanded(true);
      return;
    }
    if (activeBranch) {
      setClosing(true);
      setActiveBranch(null);
      window.setTimeout(() => { setExpanded(false); setClosing(false); }, 360);
    } else {
      setExpanded(false);
    }
  };

  const selectBranch = (child) => {
    setOpenCard(child.id);
    setActiveBranch((current) => current === child.id ? null : child.id);
  };

  return (
    <section className="hierarchy" ref={sectionRef} aria-labelledby="team-title">
      <div className="hierarchy__topline">
        <div>
          <span className="section-label">Our people</span>
          <h2 id="team-title">One vision, many brilliant minds.</h2>
        </div>
        <p>Explore our team. Select a lead to meet the people behind their work.</p>
      </div>

      <div className={`hierarchy-stage${expanded ? ' is-expanded' : ''}${closing ? ' is-closing' : ''}`} onPointerDown={(event) => {
        if (event.target === event.currentTarget) setOpenCard(null);
      }}>
        <div className="hierarchy-stage__aura" aria-hidden="true" />
        <svg className="hierarchy-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {positions.map(({ child, point }, index) => (
            <path key={child.id} className={`hierarchy-line hierarchy-line--main${activeBranch && activeBranch !== child.id ? ' is-muted' : ''}`} pathLength="1" d={curvedPath(leaderPosition, point, index % 2 ? -1 : 1)} style={{ '--line-delay': `${80 + index * 85}ms` }} />
          ))}
          {active?.staff.map((staff, index) => {
            const start = active.positions[mode];
            const offset = staff.offset[mode];
            const end = [start[0] + offset[0], start[1] + offset[1]];
            return <path key={staff.id} className="hierarchy-line hierarchy-line--staff is-visible" pathLength="1" d={curvedPath(start, end, index % 2 ? 1 : -1)} style={{ '--line-delay': `${index * 70}ms` }} />;
          })}
        </svg>

        {positions.map(({ child, point }, index) => (
          <ProfileNode key={child.id} person={child} kind="subleader" position={expanded ? point : leaderPosition} visible={expanded} active={activeBranch === child.id} muted={Boolean(activeBranch && activeBranch !== child.id)} delay={index * 85} expanded={activeBranch === child.id} onClick={() => selectBranch(child)} cardOpen={openCard === child.id} />
        ))}

        {active?.staff.map((staff, index) => {
          const parent = active.positions[mode];
          const offset = staff.offset[mode];
          return <ProfileNode key={staff.id} person={staff} kind="staff" position={[parent[0] + offset[0], parent[1] + offset[1]]} visible active delay={index * 75} onClick={() => setOpenCard((value) => value === staff.id ? null : staff.id)} cardOpen={openCard === staff.id} />;
        })}

        <ProfileNode person={team} kind="leader" position={leaderPosition} visible active expanded={expanded} onClick={toggleLeader} cardOpen={openCard === team.id} />
        <div className="hierarchy-hint" aria-live="polite">
          <span aria-hidden="true">{expanded ? '↗' : '+'}</span>
          {expanded ? (active ? `Viewing ${active.name}’s team` : 'Select a team lead') : 'Open the team'}
        </div>
      </div>
    </section>
  );
}
