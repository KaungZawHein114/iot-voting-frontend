import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export default function GroupDetails() {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const location = useLocation();

  // Retrieve group details passed via router state or fallback defaults
  const group = location.state?.group || {
    name: "Smart City Team",
    membersCount: 5,
    about: "Our project uses IoT sensors and real-time data to improve traffic management, energy usage, and public safety in urban areas.",
    members: [
      { name: "Hnin", color: "#C08457" },
      { name: "Moon", color: "#F97316" },
      { name: "Aung", color: "#22C55E" },
      { name: "Zaw", color: "#06B6D4" },
      { name: "Shin", color: "#D946EF" }
    ]
  };

  const projectImage = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80";

  return (
    <div style={{
      maxWidth: '430px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      padding: '20px 20px 28px 20px',
      color: '#000000',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Gusto College Logo Header */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <img 
          src="/gusto-logo.png" 
          alt="Gusto College Logo" 
          style={{ height: '42px', width: 'auto', objectFit: 'contain' }} 
        />
      </div>

      {/* Main Banner Image */}
      <div style={{
        width: '100%',
        height: '210px',
        borderRadius: '24px',
        overflow: 'hidden',
        marginBottom: '20px'
      }}>
        <img 
          src={projectImage} 
          alt={group.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>

      {/* Group Title & Member Count */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 6px 0', color: '#000000' }}>
          {group.name}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1f2937', fontSize: '14px', fontWeight: '500' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <span>{group.membersCount} Members</span>
        </div>
      </div>

      {/* About Project Section */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 8px 0', color: '#000000' }}>
          About Project
        </h2>
        <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.5', margin: 0 }}>
          {group.about}
        </p>
      </div>

      {/* Project Images Gallery */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 12px 0', color: '#000000' }}>
          Project Images
        </h2>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden' }}>
            <img src={projectImage} alt="Project detail 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden' }}>
            <img src={projectImage} alt="Project detail 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>

      {/* Team Members List */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 12px 0', color: '#000000' }}>
          Team Members
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {group.members.map((member, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                border: '1.5px solid #94a3b8',
                borderRadius: '12px',
                padding: '10px 16px',
                backgroundColor: '#ffffff'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill={member.color}>
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <span style={{ fontSize: '15px', fontWeight: '700', color: '#000000' }}>
                {member.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Back to Groups Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
        <button 
          onClick={() => navigate(-1)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#0c5a8a',
            color: '#ffffff',
            border: 'none',
            borderRadius: '16px',
            padding: '12px 28px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(12, 90, 138, 0.25)'
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 8 8 12 12 16"></polyline>
            <line x1="16" y1="12" x2="8" y2="12"></line>
          </svg>
          Back to Groups
        </button>
      </div>
    </div>
  );
}