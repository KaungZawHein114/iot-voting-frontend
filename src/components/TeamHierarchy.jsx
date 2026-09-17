import { FaCode, FaGears, FaPalette, FaServer } from 'react-icons/fa6';
import defaultPerson from '../assets/defaultperson.jpg';

// Real roster. `lead: true` marks the person(s) starred (*) in the original
// list — the main person(s) for that branch. Everyone renders at once; there
// is no click-to-expand state here on purpose.
const projectManager = { name: 'Kaung Zaw Hein', role: 'Project Manager' };

const branches = [
  {
    id: 'backend',
    label: 'Backend',
    icon: FaServer,
    members: [{ name: 'Thet Toe Aung', lead: true }],
  },
  {
    id: 'devops',
    label: 'DevOps',
    icon: FaGears,
    members: [{ name: 'Thant Sin Aung', lead: true }],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: FaCode,
    members: [
      { name: 'Aung Myint Myat', lead: true },
      { name: 'Hsu Yee Nwe' },
      { name: 'Pyae Phyo Oo' },
    ],
  },
  {
    id: 'design',
    label: 'Design',
    icon: FaPalette,
    members: [
      { name: 'Hnin Pa Pa Khaing', lead: true },
      { name: 'Pwint Phyu Soe', lead: true },
    ],
  },
];

const contributors = [
  'Ye Myat Aung',
  'No Ko',
  'Aung Min Khant',
  'Shun Lak Thaw Tar',
  'Zin Htut Naing',
];

function PersonCard({ person, size = 'member' }) {
  return (
    <div className={`team-card team-card--${size}`}>
      <img src={defaultPerson} alt="" className="team-card__photo" />
      <div className="team-card__text">
        <strong>{person.name}</strong>
        {person.role && <span>{person.role}</span>}
      </div>
    </div>
  );
}

export default function TeamHierarchy() {
  return (
    <section className="hierarchy" aria-labelledby="team-title">
      <div className="hierarchy__topline">
        <div>
          <span className="section-label">Our people</span>
          <h2 id="team-title">One vision, many brilliant minds.</h2>
        </div>
        <p>Everyone who built and runs this project, in one place.</p>
      </div>

      <div className="team-tree">
        <div className="team-tree__pm">
          <PersonCard person={projectManager} size="lead" />
        </div>

        <div className="team-tree__connector" aria-hidden="true" />

        <div className="team-tree__branches">
          {branches.map((branch) => {
            const Icon = branch.icon;
            return (
              <div className="team-branch" key={branch.id}>
                <div className="team-branch__header">
                  <Icon aria-hidden="true" />
                  <span>{branch.label}</span>
                </div>
                <div className="team-branch__leads">
                  {branch.members
                    .filter((member) => member.lead)
                    .map((member) => (
                      <PersonCard key={member.name} person={member} size="branch-lead" />
                    ))}
                </div>
                {branch.members.some((member) => !member.lead) && (
                  <div className="team-branch__sub">
                    {branch.members
                      .filter((member) => !member.lead)
                      .map((member) => (
                        <PersonCard key={member.name} person={member} size="member" />
                      ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="team-contributors">
        <h3>Contributors</h3>
        <p>Additional students who helped bring this project to life.</p>
        <ul className="team-contributors__list">
          {contributors.map((name) => (
            <li key={name}>
              <img src={defaultPerson} alt="" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
