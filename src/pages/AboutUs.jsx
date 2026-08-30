import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TeamHierarchy from '../components/TeamHierarchy';
import './aboutUs.css';

export default function AboutUs() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'About Us — IoT Vote';
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <div className="about-page">
      <Navbar />
      <header className="about-hero container">
        <span className="about-hero__kicker"><i aria-hidden="true" /> About us</span>
        <h1>Technology feels better<br />when it feels <em>human.</em></h1>
        <p>We are a close-knit team building thoughtful tools that make collective decisions clearer, fairer, and easier to trust.</p>
      </header>
      <main className="container about-main">
        <TeamHierarchy />
      </main>
      <Footer />
    </div>
  );
}
