import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <p className="footer__copy">
            © {year} IoT Vote — GUSTO University
          </p>
          <ul className="footer__links">
            <li><Link to="/history" id="footer-link-history">History</Link></li>
            <li><Link to="/about-us" id="footer-link-about">About Us</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
