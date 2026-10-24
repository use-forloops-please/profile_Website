import React, { useEffect, useState } from 'react';
import './App.css';

const LINKEDIN = 'https://linkedin.com/in/luke-janse-van-rensburg-b591911b6';
const GITHUB = 'https://github.com/use-forloops-please';
const EMAIL = 'luke1time18@gmail.com';

const skills = {
  Frontend: ['React.js', 'TypeScript', 'HTML / CSS', 'Vite'],
  Backend: ['C# / .NET', 'REST APIs', 'Node.js', 'VB.NET'],
  Database: ['SQL Server', 'Stored Procedures', 'Dapper', 'Multi-database Design'],
  DevOps: ['Docker', 'Kubernetes', 'Git', 'Cloudflare Workers'],
  Data: ['Data Analysis', 'ExcelJS', 'Python', 'Web Crawlers'],
};

const experience = [
  {
    role: 'Software Developer',
    company: 'Newsclip Media Monitoring',
    dates: 'July 2024 – Present',
    desc: 'Working on a large-scale modernisation of a legacy platforms into a React/TypeScript + C#/.NET + SQL Server stack. Spans frontend component development, REST API design, clean database design, Kubernetes/Docker infrastructure, and system managment.',
  },
  {
    role: 'Software Developer',
    company: 'digital2DNA',
    dates: 'Jan 2024 – Jul 2024',
    desc: 'Contributed to web development projects in an agency environment, gaining commercial experience across frontend and backend technologies.',
  },
  {
    role: 'Sales & Marketing Associate',
    company: 'EUROOPTIC AFRICA',
    dates: 'Feb 2018 – Jul 2023',
    desc: 'Developed strong communication and business skills over five years, including digital marketing initiatives that complement a technical career path.',
  },
];

const education = [
  { title: 'BSc Computer Software Engineering', org: 'Eduvos', dates: '2021 – 2023' },
  { title: 'Google Data Analytics Professional Certificate', org: 'Coursera', dates: '2023' },
  { title: 'Web Design & Multimedia Management', org: 'CTU Training Solutions', dates: '2020' },
];

const certifications = [
  { issuer: 'Google', name: 'Data Analytics Professional Certificate (2023)' },
  { issuer: 'Coursera', name: 'Prepare, Process & Analyze Data' },
];

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const lineOpacity = scrollProgress > 0.85 ? 1 - (scrollProgress - 0.85) / 0.15 : 1;

  return (
  <div className="page">
    <div className="scroll-line-track">
      <div
        className="scroll-line-fill"
        style={{ height: `${scrollProgress * 100}%`, opacity: lineOpacity }}
      />
    </div>
    {/* Nav */}
    <nav className="nav">
      <div className="nav-inner">
        <span className="nav-name">Luke Janse van Rensburg</span>
        <div className="nav-links">
          <a href="#profile">Profile</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>

    {/* Hero */}
    <section className="hero">
      <div className="container hero-inner">
        <span className="hero-role">Software Engineer · Full-Stack Developer</span>
        <h1 className="hero-name">Luke Janse<br />van Rensburg</h1>
        <ul className="hero-meta">
          <li>Cape Town, South Africa</li>
          <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          <li><a href="https://lukejvr.com">lukejvr.com</a></li>
        </ul>
        <div className="hero-cta">
          <a href="#experience">→ Experience</a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="cta-secondary">
            → LinkedIn
          </a>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="cta-secondary">
            → GitHub
          </a>
        </div>
      </div>
    </section>

    <hr className="divider" />

    {/* Profile */}
    <section id="profile">
      <div className="container">
        <span className="section-label">Profile</span>
        <p className="profile-text">
          Motivated full-stack software engineer with hands-on experience building and
          modernising enterprise scale management platforms. Comfortable across the
          full stack React/TypeScript frontends, C#/.NET APIs, and SQL Server backends
          with a growing focus on clean architecture, legacy system migration, and reliable
          delivery of production features.
        </p>
      </div>
    </section>

    <hr className="divider" />

    {/* Experience */}
    <section id="experience">
      <div className="container">
        <span className="section-label">Experience</span>
        <div className="timeline">
          {experience.map(job => (
            <div key={job.company} className="timeline-item">
              <span className="timeline-dates">{job.dates}</span>
              <div>
                <h3 className="timeline-title">{job.role}</h3>
                <span className="timeline-org">{job.company}</span>
                <p className="timeline-desc">{job.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <hr className="divider" />

    {/* Skills */}
    <section id="skills">
      <div className="container">
        <span className="section-label">Technical Skills</span>
        <div className="skills-grid">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group}>
              <span className="skill-group-label">{group}</span>
              <div className="tags">
                {items.map(skill => (
                  <span key={skill} className="tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <hr className="divider" />

    {/* Education & Certifications */}
    <section id="education">
      <div className="container">
        <div className="edu-grid">
          <div>
            <span className="section-label">Education</span>
            <div className="timeline">
              {education.map(item => (
                <div key={item.title} className="timeline-item">
                  <span className="timeline-dates">{item.dates}</span>
                  <div>
                    <h3 className="timeline-title">{item.title}</h3>
                    <span className="timeline-org">{item.org}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="section-label">Certifications</span>
            <div className="cert-list">
              {certifications.map(cert => (
                <div key={cert.name}>
                  <span className="skill-group-label">{cert.issuer}</span>
                  <p className="cert-name">{cert.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <hr className="divider" />

    {/* Contact */}
    <section id="contact">
      <div className="container">
        <span className="section-label">Contact</span>
        <div className="contact-inner">
          <p className="contact-heading">
            Open to opportunities<br />and interesting conversations.
          </p>
          <div className="contact-links">
            <a href={`mailto:${EMAIL}`}>Email</a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="footer-copy">© 2026 Luke Janse van Rensburg</span>
        <span className="footer-copy">Build what you love</span>
      </div>
    </footer>
  </div>
  );
};

export default App;
