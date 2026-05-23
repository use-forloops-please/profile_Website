import React, { useEffect, useState } from 'react';
import './App.css';

const skills = {
  Frontend: ['React', 'TypeScript', 'CSS / Sass', 'Tailwind', 'Vite', 'HTML5'],
  Tooling: ['Git', 'Cloudflare Workers', 'Figma', 'VS Code', 'Node.js'],
  'Currently Learning': ['Three.js', 'WebGL', 'Astro'],
};

const projects = [
  {
    name: 'Rooted Farmers Market API',
    status: 'Live',
    desc: 'REST API powering a farmers market platform — handles product listings, vendors, and orders.',
    tags: ['TypeScript', 'Node.js', 'REST API'],
    href: 'https://github.com/use-forloops-please/Rooted-farmers-market-api',
  },
  {
    name: 'Budget App',
    status: 'In Progress',
    desc: 'Personal finance tool for tracking expenses and planning ahead. Built to scratch my own itch.',
    tags: ['JavaScript', 'React'],
    href: 'https://github.com/use-forloops-please/Budgetapp',
  },
  {
    name: 'Soil Health ML Model',
    status: 'Concept',
    desc: 'Machine learning model that scans soil composition and returns a plain-language health summary.',
    tags: ['Python', 'Machine Learning'],
    href: 'https://github.com/use-forloops-please/Soil_Health',
  },
  {
    name: 'Customer Chat Bot',
    status: 'Live',
    desc: 'Automated chatbot built to handle common customer queries and reduce support load.',
    tags: ['Python', 'NLP'],
    href: 'https://github.com/use-forloops-please/Chat_bot',
  },
  {
    name: 'Redemption Food',
    status: 'Live',
    desc: 'Frontend website for Redemption Food — a food-focused brand with a custom HTML/CSS layout.',
    tags: ['HTML', 'CSS'],
    href: 'https://github.com/use-forloops-please/Redemtion-Food',
  },
  {
    name: 'Export to Excel',
    status: 'Live',
    desc: 'Utility that takes raw data inputs and generates formatted Excel files for reporting.',
    tags: ['Data', 'Automation'],
    href: 'https://github.com/use-forloops-please/Export-to-excel',
  },
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
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>

    {/* Hero */}
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-eyebrow">
          <img
            src="/WS-33.jpg"
            alt="Luke Janse van Rensburg"
            className="hero-avatar"
          />
          <span className="hero-role">Full Stack Developer · Cape Town</span>
        </div>
        <h1 className="hero-name">Luke Janse<br />van Rensburg</h1>
        <p className="hero-tagline">
          Lets build something! If you can think of it I can build it.
        </p>
        <div className="hero-cta">
          <a href="#work">→ View Work</a>
          <a
            href="https://linkedin.com/in/luke-janse-van-rensburg-b591911b6"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-secondary"
          >
            → LinkedIn
          </a>
        </div>
      </div>
    </section>

    <hr className="divider" />

    {/* About */}
    <section id="about">
      <div className="container">
        <span className="section-label">About</span>
        <div className="about-grid">
          <div className="about-bio">
            <p>
              I'm a full-stack developer with a pasion for creating intuitive and engaging user experiences.
            </p>
            <p>
              I'm drawn to projects that sit slightly outside the ordinary: things that
              have an unusual constraints and that challenge what we think of as possible. 
              I love learning new technologies and applying them in creative ways.
            </p>
            <p>
              I started my career as software developer in 2024, and since then I've had the opportunity to work on a wide range of projects, 
              spanning from small simple dashboards to larger enterprise software. Each project has taught me something new and has helped me grow as a developer. I'm always looking for the next challenge and the next opportunity to learn and create.
            </p>
          </div>
          <img
            src="/WS-33.jpg"
            alt="Luke Janse van Rensburg"
            className="about-image"
          />
        </div>
      </div>
    </section>

    <hr className="divider" />

    {/* Skills */}
    <section id="skills">
      <div className="container">
        <span className="section-label">Skills</span>
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

    {/* Work */}
    <section id="work">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Work</span>
          <a
            href="https://github.com/use-forloops-please?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="section-link"
          >
            View all on GitHub →
          </a>
        </div>
        <div className="work-grid">
          {projects.map(project => (
            <div key={project.name} className="project-card">
              <div className="project-header">
                <span className="project-name">{project.name}</span>
                <span className="project-status">{project.status}</span>
              </div>
              <p className="project-desc">{project.desc}</p>
              <div className="project-footer">
                <div className="project-tags">
                  {project.tags.map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  → View
                </a>
              </div>
            </div>
          ))}
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
            <a href="mailto:luke1time18@gmail.com">Email</a>
            <a
              href="https://linkedin.com/in/luke-janse-van-rensburg-b591911b6"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/use-forloops-please"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="footer-copy">© 2026 Luke Janse van Rensburg</span>
        <span className="footer-copy">Built with React · Deployed on Cloudflare</span>
      </div>
    </footer>
  </div>
  );
};

export default App;
