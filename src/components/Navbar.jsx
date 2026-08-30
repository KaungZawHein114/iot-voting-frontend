import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const links = [
  { to: '/', id: 'nav-home', label: 'Home', end: true },
  { to: '/history', id: 'nav-history', label: 'History' },
  { to: '/about-us', id: 'nav-about', label: 'About Us' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar__inner">
          {/* Brand */}
          <NavLink to="/" className="navbar__brand" id="navbar-brand" onClick={() => setOpen(false)}>
            <span className="navbar__brand-icon" aria-hidden="true">⚡</span>
            IoT Vote
          </NavLink>

          {/* Nav Links */}
          <nav aria-label="Main navigation">
            <ul className="navbar__nav">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    id={link.id}
                    end={link.end}
                    className={({ isActive }) =>
                      'navbar__link' + (isActive ? ' navbar__link--active' : '')
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="navbar__menu-btn"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>

        {open && (
          <nav aria-label="Mobile navigation" className="navbar__mobile-nav">
            <ul>
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      'navbar__link' + (isActive ? ' navbar__link--active' : '')
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
