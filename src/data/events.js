import smartCity from '../assets/event-smart-city.jpg';
import robotics from '../assets/event-robotics.jpg';
import agriculture from '../assets/event-agri.jpg';
import health from '../assets/event-health.jpg';
import projectImage from '../assets/project-iot.jpg';

const members = [
  { name: 'Hnin', role: 'Team Lead' },
  { name: 'Moon', role: 'Hardware' },
  { name: 'Aung', role: 'Firmware' },
  { name: 'Zaw', role: 'Cloud' },
  { name: 'Shin', role: 'Design' },
];

const team = (id, name, about) => ({ id, name, about, image: projectImage, members });

export const events = [
  {
    id: 'smart-city-innovation', title: 'Smart City Innovation', tagline: 'Sensors, data and safer streets',
    date: 'May 20, 2026', time: '9:00 AM – 12:00 PM', location: 'Time City', status: 'active', image: smartCity,
    teams: [
      team('smart-city-team', 'Smart City Team', 'IoT sensors and real-time data improve traffic flow, energy usage, and public safety.'),
      team('urban-pulse', 'Urban Pulse', 'A low-power air-quality mesh that gives residents and planners a live view of their city.'),
      team('grid-guardians', 'Grid Guardians', 'Edge analytics predict power peaks and balance public lighting loads automatically.'),
    ],
  },
  {
    id: 'robotics-challenge', title: 'Autonomous Robotics Challenge', tagline: 'Line following, vision and speed',
    date: 'June 4, 2026', time: '10:00 AM – 3:00 PM', location: 'Time City', status: 'upcoming', image: robotics,
    teams: [
      team('path-finders', 'Path Finders', 'A vision-guided rover that maps unfamiliar indoor spaces and delivers supplies autonomously.'),
      team('servo-squad', 'Servo Squad', 'A high-torque differential-drive robot tuned for speed across a demanding obstacle course.'),
      team('mecha-minds', 'Mecha Minds', 'Cooperative swarm robots that sort and carry objects over an ESP-NOW mesh.'),
    ],
  },
  {
    id: 'smart-agriculture', title: 'Smart Agriculture Expo', tagline: 'Soil, water and yield intelligence',
    date: 'June 18, 2026', time: '8:30 AM – 1:00 PM', location: 'Time City', status: 'upcoming', image: agriculture,
    teams: [
      team('green-nodes', 'Green Nodes', 'Solar soil probes trigger drip irrigation only where the field needs water.'),
      team('harvest-ai', 'Harvest AI', 'Greenhouse cameras use on-device intelligence to flag plant disease early.'),
      team('aqua-sense', 'Aqua Sense', 'A floating sensor buoy monitors water quality for small-scale fish farms.'),
    ],
  },
  {
    id: 'health-wearables', title: 'Health Wearables Showcase', tagline: 'Care that travels with you',
    date: 'July 2, 2026', time: '9:00 AM – 12:00 PM', location: 'Time City', status: 'upcoming', image: health,
    teams: [
      team('pulse-lab', 'Pulse Lab', 'A wristband streams ECG and oxygen readings and raises arrhythmia alerts.'),
      team('care-link', 'Care Link', 'A fall-detection pendant provides offline alarms and family notifications.'),
      team('vital-mesh', 'Vital Mesh', 'A low-power BLE mesh brings continuous monitoring to every hospital ward.'),
    ],
  },
];

export const getEvent = (id) => events.find((event) => event.id === id);
