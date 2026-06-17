import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import DitherBG from "../../auth/components/DitherBG";
import "../../auth/style/DitherBG.scss";
import "../style/Landing.scss";

const Landing = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="landing-page">
      <div className="dither-bg-wrapper">
        <DitherBG
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </div>

      <nav className={`landing-nav ${visible ? "fade-in" : ""}`}>
        <div className="nav-brand">
          <span className="brand-icon">◈</span>
          <span className="brand-name">PixelFeed</span>
        </div>
        <div className="nav-links">
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/register" className="nav-btn">
            Get Started
          </Link>
        </div>
      </nav>

      <section className={`hero-section ${visible ? "fade-in" : ""}`}>
        <div className="hero-glass">
          <div className="hero-badge">✦ A new way to share</div>
          <h1 className="hero-title">
            Share your world,
            <br />
            <span className="hero-accent">one pixel at a time.</span>
          </h1>
          <p className="hero-subtitle">
            PixelFeed is a visual-first social platform built for creatives,
            photographers, and storytellers who want their work to speak louder
            than words.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="hero-btn-primary">
              Create Account
            </Link>
            <Link to="/login" className="hero-btn-secondary">
              Sign In →
            </Link>
          </div>
        </div>
      </section>

      <section className={`features-section ${visible ? "fade-in" : ""}`}>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📸</div>
            <h3>Visual Stories</h3>
            <p>
              Upload and curate your visual journey with high-fidelity image
              galleries and immersive photo feeds.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔗</div>
            <h3>Connect & Follow</h3>
            <p>
              Build your creative community. Follow artists, discover
              inspiration, and grow your audience organically.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>
              Optimized for speed and performance. Your content loads instantly,
              every single time.
            </p>
          </div>
        </div>
      </section>

      <footer className={`landing-footer ${visible ? "fade-in" : ""}`}>
        <div className="footer-content">
          <span className="footer-brand">◈ PixelFeed</span>
          <span className="footer-copy">
            © {new Date().getFullYear()} PixelFeed. All rights reserved.
          </span>
        </div>
      </footer>
    </main>
  );
};

export default Landing;
