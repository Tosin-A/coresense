import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import "./App.css";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

// Icon Components
const Icons = {
  Apple: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  ),
  Zap: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  ),
  Brain: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.54"></path>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.54"></path>
    </svg>
  ),
  LineChart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"></path>
      <path d="m19 9-5 5-4-4-3 3"></path>
    </svg>
  ),
  Lock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  ),
  Sync: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
      <path d="M3 3v5h5"></path>
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
      <path d="M16 16h5v5"></path>
    </svg>
  ),
  Upload: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
  ),
  Cpu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
      <rect x="9" y="9" width="6" height="6"></rect>
      <line x1="9" y1="1" x2="9" y2="4"></line>
      <line x1="15" y1="1" x2="15" y2="4"></line>
      <line x1="9" y1="20" x2="9" y2="23"></line>
      <line x1="15" y1="20" x2="15" y2="23"></line>
      <line x1="20" y1="9" x2="23" y2="9"></line>
      <line x1="20" y1="14" x2="23" y2="14"></line>
      <line x1="1" y1="9" x2="4" y2="9"></line>
      <line x1="1" y1="14" x2="4" y2="14"></line>
    </svg>
  ),
  Send: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  ),
  Check: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  ),
};

// Rotating Text Component
function RotatingText({ words, interval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className={`rotating-text ${isAnimating ? 'animating' : ''}`}>
      {words[currentIndex]}
    </span>
  );
}

// Real Company Logos with actual brand colors
const TrustedLogos = () => {
  const companies = [
    {
      name: "Apple Health",
      logo: (
        <svg viewBox="0 0 24 24" fill="#FF2D55" width="32" height="32">
          <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
        </svg>
      )
    },
    {
      name: "Fitbit",
      logo: (
        <svg viewBox="0 0 100 30" width="80" height="24">
          <text x="0" y="22" fill="#00B0B9" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="24">fitbit</text>
        </svg>
      )
    },
    {
      name: "Garmin",
      logo: (
        <svg viewBox="0 0 100 30" width="90" height="27">
          <text x="0" y="22" fill="#ffffff" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="22">GARMIN</text>
        </svg>
      )
    },
    {
      name: "Oura",
      logo: (
        <svg viewBox="0 0 80 30" width="70" height="26">
          <text x="0" y="22" fill="#ffffff" fontFamily="Georgia, serif" fontWeight="400" fontSize="24" letterSpacing="2">OURA</text>
        </svg>
      )
    },
    {
      name: "Whoop",
      logo: (
        <svg viewBox="0 0 100 30" width="90" height="27">
          <text x="0" y="22" fill="#44D62C" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="22">WHOOP</text>
        </svg>
      )
    },
    {
      name: "Samsung Health",
      logo: (
        <svg viewBox="0 0 120 30" width="100" height="25">
          <text x="0" y="21" fill="#1428A0" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="18">SAMSUNG</text>
        </svg>
      )
    },
    {
      name: "Strava",
      logo: (
        <svg viewBox="0 0 80 30" width="70" height="26">
          <text x="0" y="22" fill="#FC4C02" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="22">STRAVA</text>
        </svg>
      )
    },
    {
      name: "MyFitnessPal",
      logo: (
        <svg viewBox="0 0 130 30" width="110" height="26">
          <text x="0" y="22" fill="#0066EE" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="18">MyFitnessPal</text>
        </svg>
      )
    },
  ];

  return (
    <>
      {companies.map((company, index) => (
        <div key={index} className="logo-item" title={company.name}>
          {company.logo}
        </div>
      ))}
    </>
  );
};

function Navbar() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          CoreSense
        </Link>
        <nav className="nav-links">
          <button onClick={() => scrollToSection('features')} className="nav-link">
            Features
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className="nav-link">
            How it Works
          </button>
          <button onClick={() => scrollToSection('about')} className="nav-link">
            About
          </button>
        </nav>
        <a href="#" className="download-btn">
          <Icons.Apple />
          <span>Download</span>
        </a>
      </div>
    </header>
  );
}

function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// Newsletter Form Component
function NewsletterForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/manrpqwb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          source: 'newsletter_signup',
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="newsletter-success">
        <div className="success-icon-small">
          <Icons.Check />
        </div>
        <p>You're on the list! We'll keep you updated.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="newsletter-form">
      <div className="newsletter-inputs">
        <input
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="newsletter-input"
          required
        />
        <input
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="newsletter-input"
          required
        />
      </div>
      <button
        type="submit"
        className="newsletter-btn"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? (
          <span>Joining...</span>
        ) : (
          <>
            <Icons.Mail />
            <span>Join the List</span>
          </>
        )}
      </button>
      {status === 'error' && (
        <p className="newsletter-error">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}

function HomePage() {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    setTimeout(() => {
      const elements = document.querySelectorAll(".fade-in");
      elements.forEach((el) => {
        if (observerRef.current) {
          observerRef.current.observe(el);
        }
      });
    }, 100);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const rotatingWords = ['understood', 'simplified', 'actionable', 'clear'];
  const rotatingActions = ['sleep better', 'train smarter', 'recover faster', 'live healthier'];

  return (
    <div className="app">
      {/* Dynamic Background */}
      <div className="dynamic-bg">
        <div className="bg-gradient"></div>
        <div className="bg-noise"></div>
        <div className="bg-grid"></div>
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge fade-in">
                <span className="badge-pulse"></span>
                <span>50,000+ early adopters</span>
              </div>
              <h1 className="hero-title fade-in">
                Your health data,
                <br />
                <span className="gradient-text">finally <RotatingText words={rotatingWords} interval={2500} />.</span>
              </h1>
              <p className="hero-subtitle fade-in">
                CoreSense connects to your wearables and health apps to help you{' '}
                <RotatingText words={rotatingActions} interval={3000} />.
                No more guessing what the numbers mean.
              </p>
              <div className="hero-cta fade-in">
                <a href="#" className="btn-primary">
                  <Icons.Apple />
                  <span>Download for iOS</span>
                </a>
                <button onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })} className="btn-secondary">
                  <span>See how it works</span>
                  <Icons.ChevronDown />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <section className="integrations-section">
          <div className="container">
            <p className="integrations-label">Connects with your favorite health platforms</p>
          </div>
          <div className="logo-carousel">
            <div className="logo-track">
              <TrustedLogos />
              <TrustedLogos />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="section features-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Features</span>
              <h2 className="section-title">
                Everything you need to <RotatingText words={['understand', 'optimize', 'track', 'improve']} interval={2800} /> your body
              </h2>
              <p className="section-subtitle">
                We take the complexity out of health data so you can focus on what matters.
              </p>
            </div>
            <div className="features-grid">
              <div className="feature-card fade-in">
                <div className="feature-icon">
                  <Icons.LineChart />
                </div>
                <h3 className="feature-title">Smart Analytics</h3>
                <p className="feature-description">
                  Your sleep, activity, and vitals analyzed together to spot patterns you'd never notice on your own.
                </p>
              </div>
              <div className="feature-card fade-in">
                <div className="feature-icon">
                  <Icons.Brain />
                </div>
                <h3 className="feature-title">Personal AI Coach</h3>
                <p className="feature-description">
                  Get advice that's actually relevant to you, based on your real data and goals.
                </p>
              </div>
              <div className="feature-card fade-in">
                <div className="feature-icon">
                  <Icons.Shield />
                </div>
                <h3 className="feature-title">Privacy First</h3>
                <p className="feature-description">
                  Your health data stays on your device. We can't see it, sell it, or share it.
                </p>
              </div>
              <div className="feature-card fade-in">
                <div className="feature-icon">
                  <Icons.Zap />
                </div>
                <h3 className="feature-title">Instant Insights</h3>
                <p className="feature-description">
                  No waiting around. Get meaningful feedback within seconds of syncing your data.
                </p>
              </div>
              <div className="feature-card fade-in">
                <div className="feature-icon">
                  <Icons.Sync />
                </div>
                <h3 className="feature-title">Works Everywhere</h3>
                <p className="feature-description">
                  Apple Watch, Fitbit, Garmin, Oura, Whoop — if it tracks health, we probably support it.
                </p>
              </div>
              <div className="feature-card fade-in">
                <div className="feature-icon">
                  <Icons.Lock />
                </div>
                <h3 className="feature-title">No Account Needed</h3>
                <p className="feature-description">
                  Download, connect your devices, and start. No email, no password, no friction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="section how-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">How it Works</span>
              <h2 className="section-title">
                From raw data to real understanding
              </h2>
              <p className="section-subtitle">
                Three steps. That's all it takes.
              </p>
            </div>
            <div className="steps-grid">
              <div className="step-card fade-in">
                <div className="step-number">01</div>
                <div className="step-icon">
                  <Icons.Upload />
                </div>
                <h3 className="step-title">Connect</h3>
                <p className="step-description">
                  Link your Apple Health, wearable, or fitness app. Takes about 30 seconds.
                </p>
              </div>
              <div className="step-card fade-in">
                <div className="step-number">02</div>
                <div className="step-icon">
                  <Icons.Cpu />
                </div>
                <h3 className="step-title">Analyze</h3>
                <p className="step-description">
                  Our AI looks at your sleep, activity, heart rate, and more to find what's important.
                </p>
              </div>
              <div className="step-card fade-in">
                <div className="step-number">03</div>
                <div className="step-icon">
                  <Icons.Send />
                </div>
                <h3 className="step-title">Understand</h3>
                <p className="step-description">
                  Get clear recommendations and insights in plain English. No medical jargon.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section stats-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-card fade-in">
                <div className="stat-value">
                  <AnimatedCounter target={50000} suffix="+" />
                </div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="stat-card fade-in">
                <div className="stat-value">
                  <AnimatedCounter target={12} suffix="M+" />
                </div>
                <div className="stat-label">Health Data Points Analyzed</div>
              </div>
              <div className="stat-card fade-in">
                <div className="stat-value">
                  4.8<span className="stat-star">★</span>
                </div>
                <div className="stat-label">App Store Rating</div>
              </div>
              <div className="stat-card fade-in">
                <div className="stat-value">
                  <AnimatedCounter target={15} suffix="+" />
                </div>
                <div className="stat-label">Integrations</div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section about-section">
          <div className="container">
            <div className="about-content">
              <div className="about-text fade-in">
                <span className="section-tag">About</span>
                <h2 className="section-title">Built by people who got tired of spreadsheets</h2>
                <p>
                  We were the type of people who tracked everything — sleep scores, resting heart rate,
                  steps, calories. But when we looked at all those numbers, we had no idea what they
                  actually meant for our health.
                </p>
                <p>
                  So we built CoreSense. An app that takes all your health data and turns it into
                  insights you can actually use. No more googling "is 62 resting heart rate good?"
                  at 2am.
                </p>
                <p>
                  We're a small team, and we're obsessed with making health data
                  accessible to everyone — not just biohackers and athletes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="section newsletter-section">
          <div className="container">
            <div className="newsletter-card">
              <h2 className="newsletter-title">Stay in the loop</h2>
              <p className="newsletter-subtitle">
                Get updates on new features, health tips, and early access to what we're building next.
              </p>
              <NewsletterForm />
              <p className="newsletter-disclaimer">
                No spam, ever. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="footer-logo">CoreSense</span>
              <span className="footer-tagline">Health data, finally understood.</span>
            </div>
            <div className="footer-links">
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
              <Link to="/terms" className="footer-link">Terms of Service</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2025 CoreSense. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
    </Router>
  );
}
