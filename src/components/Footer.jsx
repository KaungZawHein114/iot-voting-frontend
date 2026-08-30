export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <p className="footer__copy">
            © {year} IoT Vote. Built with ⚡ Vite + React.
          </p>
          <ul className="footer__links">
            <li><a href="#features" id="footer-link-features">Features</a></li>
            <li><a href="#how-it-works" id="footer-link-how">How It Works</a></li>
            <li><a href="https://github.com" target="_blank" rel="noreferrer" id="footer-link-github">GitHub</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
