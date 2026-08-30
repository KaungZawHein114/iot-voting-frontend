import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar__inner">
          {/* Brand */}
          <NavLink to="/" className="navbar__brand" id="navbar-brand">
            <span className="navbar__brand-icon" aria-hidden="true">⚡</span>
            IoT Vote
          </NavLink>

          {/* Nav Links */}
          <nav aria-label="Main navigation">
            <ul className="navbar__nav">
              <li>
                <NavLink
                  to="/"
                  id="nav-home"
                  className={({ isActive }) =>
                    'navbar__link' + (isActive ? ' navbar__link--active' : '')
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about-us"
                  id="nav-about"
                  className={({ isActive }) =>
                    'navbar__link' + (isActive ? ' navbar__link--active' : '')
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <a href="#how-it-works" id="nav-how" className="navbar__link">
                  How It Works
                </a>
              </li>
            </ul>
          </nav>

          {/* CTA */}
          <a href="#get-started" id="navbar-cta" className="navbar__cta">
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
