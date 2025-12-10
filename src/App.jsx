import React, { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const [showSurvey, setShowSurvey] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [selectedFeature, setSelectedFeature] = useState("");
  const [feedback, setFeedback] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [visibleElements, setVisibleElements] = useState(new Set());
  
  const observerRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for scroll animations
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

    // Observe all elements with fade-in class after a short delay to ensure DOM is ready
    setTimeout(() => {
      const elements = document.querySelectorAll(".fade-in-up, .fade-in");
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

  const features = [
    {
      id: "real-data",
      title: "Insights Based on Your Real Data",
      description: "Stop guessing. See honest trends from your actual activity. Connect Apple Health, Android Health, and (optional) wearables to get personalised recommendations that work for you."
    },
    {
      id: "ai-coach",
      title: "Your Personal Accountability Partner",
      description: "Chat with your AI coach like its your bro. Get reminders, check-ins, and personalised coaching that helps you stick to your goals and build better habits."
    },
    {
      id: "journalling",
      title: "AI That Understands You Better",
      description: "Journal your thoughts and goals. The more you share, the more personalized your insights become — helping you make real progress on what matters to you."
    },
    {
      id: "weekly-summaries",
      title: "Weekly Insights That Matter",
      description: "Get clear, actionable summaries of your week — not overwhelming data dumps. See what's working and what needs attention."
    },
    {
      id: "trend-analysis",
      title: "Spot Patterns Before They Become Problems",
      description: "See how your sleep, activity, and habits connect. Catch negative trends early and get recommendations to course-correct."
    },
    {
      id: "customizable-ui",
      title: "An App That Fits Your Style",
      description: "Customize everything to match how you work. Make CoreSense feel like it was built just for you."
    },
    {
      id: "real-time-sync",
      title: "Your Data, Everywhere You Go",
      description: "Access your insights on any device. Your data syncs securely so you're always up to date, wherever you are."
    },
    {
      id: "proactive-nudges",
      title: "Gentle Reminders That Actually Help",
      description: "Get timely suggestions throughout your day — not annoying notifications. Smart nudges that support your goals without overwhelming you."
    }
  ];

  const handleEarlyAccessClick = (e) => {
    e.preventDefault();
    if (formData.email) {
      setShowSurvey(true);
    }
  };

  const handleSurveySubmit = (e) => {
    e.preventDefault();
    if (!selectedFeature) {
      alert("Please select a feature you're most interested in.");
      return;
    }

    // Submit to Formspree with all data
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://formspree.io/f/manrpqwb";
    
    const nameInput = document.createElement("input");
    nameInput.type = "hidden";
    nameInput.name = "name";
    nameInput.value = formData.name;
    
    const emailInput = document.createElement("input");
    emailInput.type = "hidden";
    emailInput.name = "email";
    emailInput.value = formData.email;
    
    const featureInput = document.createElement("input");
    featureInput.type = "hidden";
    featureInput.name = "selected_feature";
    featureInput.value = selectedFeature;
    
    const sourceInput = document.createElement("input");
    sourceInput.type = "hidden";
    sourceInput.name = "source";
    sourceInput.value = "landing_waitlist_survey";
    
    const feedbackInput = document.createElement("input");
    feedbackInput.type = "hidden";
    feedbackInput.name = "feedback";
    feedbackInput.value = feedback;
    
    form.appendChild(nameInput);
    form.appendChild(emailInput);
    form.appendChild(featureInput);
    form.appendChild(sourceInput);
    form.appendChild(feedbackInput);
    document.body.appendChild(form);
    form.submit();
    
    setFormSubmitted(true);
  };

  if (formSubmitted) {
  return (
      <div className="app">
        <div className="success-container">
          <div className="success-icon">✓</div>
          <h1>Thank You!</h1>
          <p className="success-message">
            We've received your information. Check your email for confirmation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {showSurvey ? (
        <div className="survey-overlay" onClick={() => setShowSurvey(false)}>
          <div className="survey-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowSurvey(false)}>×</button>
            <h2>Which feature interests you most?</h2>
            <p className="survey-subtitle">Select the feature you're most excited about</p>
            <form onSubmit={handleSurveySubmit} className="survey-form">
              <div className="feature-grid">
                {features.map((feature) => (
                  <label
                    key={feature.id}
                    className={`feature-card ${selectedFeature === feature.id ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="feature"
                      value={feature.id}
                      checked={selectedFeature === feature.id}
                      onChange={(e) => setSelectedFeature(e.target.value)}
                    />
                    <div className="feature-content">
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="survey-feedback">
                <label htmlFor="feedback" className="feedback-label">
                  Optional: Share feedback, feature requests, or how often you'd use the app
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  placeholder="E.g., I'd love to see [feature], or I'd use this daily/weekly..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="feedback-textarea"
                  rows="4"
                />
              </div>
              <button type="submit" className="submit-survey-button">
                Reserve My Spot
              </button>
            </form>
          </div>
        </div>
      ) : null}

      <header className="header">
        <div className="container">
          <div className="logo">CoreSense</div>
        </div>
      </header>

      <div className="animated-background"></div>
      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <div className="trust-badge fade-in" id="trust-badge">
                <span className="badge-text">Join 500+ early adopters</span>
              </div>
              <h1 className="hero-title fade-in" id="hero-title">
                Get Personalized Health Insights
                <span className="gradient-text"> That Actually Work</span>
              </h1>
              <p className="hero-subheadline fade-in" id="hero-subheadline">
                Your AI coach analyzes your real health data to deliver personalized recommendations that improve your wellbeing and performance. Not generic advice.
              </p>
              <div className="hero-benefits fade-in" id="hero-benefits">
                <div className="benefit-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Track sleep, screen time & habits automatically</span>
                </div>
                <div className="benefit-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Get AI-powered insights tailored to you</span>
                </div>
                <div className="benefit-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>AI texts you to keep you locked‑in.</span>
                </div>
              </div>
              <div className="hero-waitlist fade-in" id="hero-waitlist">
        <form
                  onSubmit={handleEarlyAccessClick}
                  className="waitlist-form-inline"
                >
                  <div className="form-group-inline">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name (optional)"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input-inline"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input-inline"
                    />
                    <button type="submit" className="cta-primary-inline">
                      Get Early Access
                    </button>
                  </div>
                  <p className="form-note-inline">
                    Free to join • No credit card required • Register Interest
                  </p>
        </form>
              </div>
            </div>
          </div>
      </section>

        <section id="features" className="features">
          <div className="container">
            <h2 className="section-title fade-in-up" id="features-title">How CoreSense Helps You</h2>
            <p className="section-subtitle fade-in-up">Real benefits, not just features</p>
            <div className="features-grid">
              <div className="feature-box fade-in-up" id="feature-0">
                <div className="feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"></path>
                    <path d="M18 7v10"></path>
                    <path d="M13 12v5"></path>
                    <path d="M8 10v7"></path>
                  </svg>
                </div>
                <h3>Real Data</h3>
                <p>Connect Apple Health, Android Health, and supported wearables to surface honest trends from your actual activity.</p>
              </div>
              <div className="feature-box fade-in-up" id="feature-1">
                <div className="feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <h3>AI Coach</h3>
                <p>Your AI coach lives as a saved contact — interact like a real person. Acts as an accountability partner, asking for proof when you commit to activities. Get proactive nudges and personalized coaching throughout your day.</p>
              </div>
              <div className="feature-box fade-in-up" id="feature-2">
                <div className="feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h3>Journalling</h3>
                <p>Built-in journalling section allows the AI to truly personalize the insights and recommendations it gives you based on your thoughts, goals, and daily reflections.</p>
              </div>
              <div className="feature-box fade-in-up" id="feature-3">
                <div className="feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </div>
                <h3>Weekly Summaries</h3>
                <p>Get personalized weekly insights and trend analysis based on your sleep, steps, and habits.</p>
              </div>
              <div className="feature-box fade-in-up" id="feature-4">
                <div className="feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </div>
                <h3>Trend Analysis</h3>
                <p>Track patterns and see how your health metrics change over time.</p>
              </div>
              <div className="feature-box fade-in-up" id="feature-5">
                <div className="feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"></path>
                  </svg>
                </div>
                <h3>Fully Customizable</h3>
                <p>Customize your UI settings to match your preferences and create the perfect experience for you.</p>
              </div>
              <div className="feature-box fade-in-up" id="feature-6">
                <div className="feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <h3>Real-time Sync</h3>
                <p>Seamless syncing across all your devices with secure cloud accounts.</p>
              </div>
              <div className="feature-box fade-in-up" id="feature-7">
                <div className="feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <h3>Privacy First</h3>
                <p>Your data stays private with secure cloud accounts and opt-in syncing. We respect your privacy.</p>
              </div>
            </div>
          </div>
      </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>Built by Tosin • Join the waitlist for early access</p>
        </div>
      </footer>
    </div>
  );
}
