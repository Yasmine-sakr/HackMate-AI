import "./LandingPage.css";
import {
  Rocket,
  BrainCircuit,
  Users,
  Wrench
} from "lucide-react";

const features = [
  {
    icon: <BrainCircuit size={24} />,
    title: "AI MVP Generator",
  },

  {
    icon: <Wrench size={24} />,
    title: "Tech Stack Suggestions",
  },

  {
    icon: <Users size={24} />,
    title: "Team Planning",
  },

  {
    icon: <Rocket size={24} />,
    title: "48-Hour Roadmap",
  },
];

export default function LandingPage({ onStart }) {
  return (
    <main className="landing-page">
      <div className="landing-orb landing-orb--violet" />
      <div className="landing-orb landing-orb--cyan" />

      <section className="landing-content">
        <div className="landing-logo">

  <div className="logo-icon">

    ⚡

  </div>

  <div className="logo-text">

    HM

  </div>

</div>

        <p className="landing-eyebrow">THE AI CO-FOUNDER FOR HACKATHONS</p>

        <h1>
          HackMate <span>AI</span>
        </h1>

        <h2>Your AI Hackathon Co-Founder</h2>

        <p className="landing-description">
          Turn any idea into a complete Hackathon Canvas in seconds.
        </p>

        <button className="landing-cta" type="button" onClick={onStart}>
          🚀 Start Building
        </button>

        <div className="landing-features">
          {features.map((feature) => (
            <article className="landing-feature" key={feature.title}>
              <span>{feature.icon}</span>
              <p>{feature.title}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}