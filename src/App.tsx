import React from 'react';
import './App.css';

const skills = {
  Frontend: ['React', 'TypeScript', 'CSS / Sass', 'Tailwind', 'Vite', 'HTML5'],
  Tooling: ['Git', 'Cloudflare Workers', 'Figma', 'VS Code', 'Node.js'],
  'Currently Learning': ['Three.js', 'WebGL', 'Astro'],
};

const projects = [
  {
    name: 'Profile Website',
    status: 'Live',
    desc: 'This site — a clean single-page portfolio built with React and TypeScript, deployed to Cloudflare Pages.',
    tags: ['React', 'TypeScript', 'Vite', 'Cloudflare'],
    href: 'https://github.com/use-forloops-please',
  },
  {
    name: 'Interactive Dashboard',
    status: 'Archive',
    desc: 'An earlier version of this portfolio that tracked real-time analytics, session time, and click locations using localStorage.',
    tags: ['React', 'Canvas API', 'CSS Animations'],
    href: 'https://github.com/use-forloops-please',
  },
  {
    name: 'Obscure Project #1',
    status: 'In Progress',
    desc: 'A personal side project in the early stages — details coming soon.',
    tags: ['TypeScript', 'Node.js'],
    href: 'https://github.com/use-forloops-please',
  },
  {
    name: 'Obscure Project #2',
    status: 'Concept',
    desc: 'An idea that uses WebGL for something probably unnecessary but very enjoyable to build.',
    tags: ['WebGL', 'Three.js'],
    href: 'https://github.com/use-forloops-please',
  },
];

const App: React.FC = () => (
  <div className="page">
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
            src="/Neutral Pink Modern Circle Shape LinkedIn Profile Picture (5).png"
            alt="Luke Janse van Rensburg"
            className="hero-avatar"
          />
          <span className="hero-role">Frontend Developer · Cape Town</span>
        </div>
        <h1 className="hero-name">Luke Janse<br />van Rensburg</h1>
        <p className="hero-tagline">
          I build clean interfaces and quietly strange projects. Interested in the
          overlap between design precision and frontend craft.
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
              I'm a full-stack developer with a focus on the frontend — the layer where
              design decisions become real and the details either hold or fall apart.
            </p>
            <p>
              I'm drawn to projects that sit slightly outside the ordinary: things that
              have an unusual constraint, a weird interaction model, or an ambition that's
              harder than it looks. I find those more interesting to build than safe ones.
            </p>
            <p>
              When I'm not writing code I'm thinking about why certain interfaces feel
              right and others don't — the invisible work that goes into making something
              simple look easy.
            </p>
          </div>
          <img
            src="/Neutral Pink Modern Circle Shape LinkedIn Profile Picture (5).png"
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
        <span className="section-label">Work</span>
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
        <span className="footer-copy">© 2025 Luke Janse van Rensburg</span>
        <span className="footer-copy">Built with React · Deployed on Cloudflare</span>
      </div>
    </footer>
  </div>
);

export default App;
