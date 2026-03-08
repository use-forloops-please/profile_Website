import React, { useState, useEffect } from 'react';
import './App.css';
import SnakeAnimation from './SnakeAnimation';

interface ClickLocation {
  location: string;
  time: string;
}

interface Analytics {
  totalClicks: number;
  pageViews: number;
  timeOnPage: number;
  lastVisit: string | null;
  clickLocations: ClickLocation[];
}

const App: React.FC = () => {
  const [analytics, setAnalytics] = useState<Analytics>({
    totalClicks: 0,
    pageViews: 0,
    timeOnPage: 0,
    lastVisit: null,
    clickLocations: []
  });

  const [currentSessionTime, setCurrentSessionTime] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  useEffect(() => {
    const savedAnalytics = localStorage.getItem('profileAnalytics');
    if (savedAnalytics) {
      setAnalytics(JSON.parse(savedAnalytics));
    }

    setAnalytics(prev => ({
      ...prev,
      pageViews: prev.pageViews + 1,
      lastVisit: new Date().toLocaleString()
    }));

    const startTime = Date.now();

    const updateStopwatch = () => {
      const currentTime = Math.floor((Date.now() - startTime) / 1000);
      setCurrentSessionTime(currentTime);
    };

    const updateTotalTime = () => {
      const sessionTime = Math.floor((Date.now() - startTime) / 1000);
      setAnalytics(prev => ({ ...prev, timeOnPage: prev.timeOnPage + sessionTime }));
    };

    const stopwatchInterval = setInterval(updateStopwatch, 1000);
    const saveInterval = setInterval(updateTotalTime, 10000);
    window.addEventListener('beforeunload', updateTotalTime);

    return () => {
      clearInterval(stopwatchInterval);
      clearInterval(saveInterval);
      window.removeEventListener('beforeunload', updateTotalTime);
      updateTotalTime();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('profileAnalytics', JSON.stringify(analytics));
  }, [analytics]);

  const handleClick = (event: React.MouseEvent, location: string) => {
    event.stopPropagation();
    setAnalytics(prev => ({
      ...prev,
      totalClicks: prev.totalClicks + 1,
      clickLocations: [...prev.clickLocations, { location, time: new Date().toLocaleString() }]
    }));
  };
// Will this work?
  return (
    <div className="dashboard">
      <SnakeAnimation />
      <header className="dashboard-header">
        <h1> Welcome</h1>
        <div className="stats-overview">
          <div className="stat-card">
            <h3>{analytics.pageViews}</h3>
            <p>Page Views</p>
          </div>
          <div className="stat-card">
            <h3>{analytics.totalClicks}</h3>
            <p>Total Clicks</p>
          </div>
          <div className="stat-card">
            <h3>{formatTime(currentSessionTime)}</h3>
            <p>Current Session</p>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="analytics-section">
          <h2>Live Analytics</h2>
          <div className="analytics-grid">
            <div className="analytics-card">
              <h4>Session Stopwatch</h4>
              <p>Current: {formatTime(currentSessionTime)}</p>
              <p>Total time: {formatTime(analytics.timeOnPage)}</p>
            </div>
            <div className="analytics-card">
              <h4>Activity Summary</h4>
              <p>Last visit: {analytics.lastVisit || 'First time!'}</p>
              <p>Session clicks: {analytics.totalClicks}</p>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <div className="profile-card" onClick={(e) => handleClick(e, 'profile')}>
            <div className="profile-header">
              <img
                src="/Neutral Pink Modern Circle Shape LinkedIn Profile Picture (5).png"
                alt="Luke Janse van Rensburg"
                className="profile-image"
                onClick={(e) => handleClick(e, 'profile-image')}
              />
              <h2>About Me</h2>
            </div>
            <p>Welcome glad you found your way here. I'm Luke, a full stack developer who has a passion for unique and some what obscure projects.</p>
            <p>I was thinking, what I could do diffrently to show my unique skill set well why not design an interactive dashboard that tracks all activty in real time? </p>
            <p>Have fun clicking and watching the colours shift and chnage. Also feel free to connect or pop me a message on my linkedin.</p>
            <button className="cta-button" onClick={(e) => { handleClick(e, 'read-more'); setShowModal(true); }}>
              Read More
            </button>
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>Hey, you clicked!</h3>
              <p>Now that I got your attention, please contact me on LinkedIn if you want to find out more...</p>
              <div className="modal-actions">
                <a
                  className="modal-linkedin-btn"
                  href="https://linkedin.com/in/luke-janse-van-rensburg-b591911b6"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleClick(e, 'modal-linkedin')}
                >
                  💼 Connect on LinkedIn
                </a>
                <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="activity-feed">
          <h3>Click Activity</h3>
          <div className="activity-list">
            {analytics.clickLocations.slice(-5).map((click, index) => (
              <div key={index} className="activity-item">
                <span className="activity-location">{click.location}</span>
                <span className="activity-time">{click.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="dashboard-footer" onClick={(e) => handleClick(e, 'footer')}>
        <div className="contact-section">
          <h3>Get In Touch</h3>
          <div className="contact-links">
            <a href="mailto:luke1time18@gmail.com" onClick={(e) => handleClick(e, 'email')}>
              📧 luke1time18@gmail.com
            </a>
            <a href="https://linkedin.com/in/luke-janse-van-rensburg-b591911b6" onClick={(e) => handleClick(e, 'linkedin')}>
              💼 LinkedIn
            </a>
            <a href="https://github.com/use-forloops-please" onClick={(e) => handleClick(e, 'github')}>
              🔗 GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
