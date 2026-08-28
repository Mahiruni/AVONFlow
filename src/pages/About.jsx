import {
  ArrowRight,
  Bot,
  Check,
  Chrome,
  Clock3,
  Cloud,
  CreditCard,
  Image as ImageIcon,
  Layers3,
  MonitorPlay,
  ShieldCheck,
  Sparkles,
  Video,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import { Accordion, ButtonLink, Eyebrow, SectionHeading } from "../components.jsx";

const aboutFaqs = [
  { q: "Is the AVONFlow extension safe?", a: "The production extension should request only the permissions needed to connect your authorized AVONFlow session. Its permissions and privacy policy should be visible before installation." },
  { q: "Do I need a Google Cloud billing account?", a: "No. AVONFlow is designed to remove the direct billing and setup complexity for creators. You still use the official supported interfaces and remain subject to their usage policies." },
  { q: "Do my credits disappear when a plan ends?", a: "Your project records remain available. Generation access pauses at expiry, and a renewed plan restores the tools attached to that tier." },
  { q: "Can I use AVONFlow on more than one device?", a: "Yes, within the device limits attached to your plan. Security checks help prevent account sharing and keep access stable." },
  { q: "Which models are included?", a: "Current plans can include Veo 3.1, Google Flow, Imagen and Whisk tooling, ChatGPT, Grok and AvonTTS. Availability can change as upstream providers update their products." },
];

const modelAccess = [
  [Video, "Google Flow", "All plans", "Official Flow workspace access"],
  [MonitorPlay, "Veo 3.1", "All plans", "Cinematic AI video generation"],
  [ImageIcon, "Whisk + Imagen", "Plus+", "Image creation and precise variation"],
  [Wand2, "Imagen Pro", "Plus+", "Premium image quality and formats"],
  [Bot, "ChatGPT + Grok", "Max+", "Shared ideation and reasoning access"],
];

export function About({ openAuth }) {
  return (
    <main className="about-page">
      <section className="page-hero about-hero">
        <div className="about-hero__grid" aria-hidden="true" />
        <div className="container about-hero__inner" data-reveal>
          <Eyebrow>ABOUT AVONFLOW</Eyebrow>
          <h1>What is <span>AVONFlow?</span></h1>
          <p>AVONFlow is a creator-first platform that gives direct access to Google Flow with Veo 3.1 and Google Whisk with Imagen — without complicated billing, expensive per-creation costs or a technical cloud setup.</p>
          <div><button className="button button--primary" onClick={() => openAuth("signup")}>Try for free <ArrowRight size={17} /></button><ButtonLink to="/pricing" variant="outline">View pricing</ButtonLink></div>
          <ul><li><Check size={15} /> Pakistan-ready payments</li><li><Check size={15} /> No cloud engineering</li><li><Check size={15} /> Original supported interfaces</li></ul>
        </div>
      </section>

      <section className="access-explainer section-pad">
        <div className="container">
          <SectionHeading align="center" eyebrow="THE CORE CONCEPT" title="What is" accent="extension-based access?" description="The short answer: AVONFlow handles the hard parts, while you keep the creative interface." />
          <div className="access-cards">
            <article className="access-card access-card--problem" data-reveal>
              <div className="access-card__tag">THE PROBLEM</div>
              <span><Cloud size={25} /></span>
              <h3>Going direct can be expensive and complicated.</h3>
              <ul>
                <li><i><X size={14} /></i>Cloud billing setup and account verification</li>
                <li><i><X size={14} /></i>Per-video costs that make iteration risky</li>
                <li><i><X size={14} /></i>International card and regional payment barriers</li>
                <li><i><X size={14} /></i>API configuration built for developers, not creators</li>
              </ul>
            </article>
            <article className="access-card access-card--solution" data-reveal>
              <div className="access-card__tag"><Sparkles size={13} /> THE AVONFLOW SOLUTION</div>
              <span><Chrome size={25} /></span>
              <h3>One extension bridges your creator workspace.</h3>
              <ul>
                <li><i><Check size={14} /></i>Install AvonBridge in around 30 seconds</li>
                <li><i><Check size={14} /></i>Sign in with your AVONFlow account once</li>
                <li><i><Check size={14} /></i>Work inside the original supported interface</li>
                <li><i><Check size={14} /></i>AVONFlow handles plan access and billing</li>
              </ul>
            </article>
          </div>
          <div className="access-flow" data-reveal>
            <article><span>01</span><div><strong>Install extension</strong><p>Add AvonBridge to your Chromium browser.</p></div></article>
            <i />
            <article><span>02</span><div><strong>Sign in once</strong><p>Connect your active AVONFlow plan securely.</p></div></article>
            <i />
            <article><span>03</span><div><strong>Create freely</strong><p>Open your tools and begin generating.</p></div></article>
          </div>
        </div>
      </section>

      <section className="why-avon section-pad section-deep">
        <div className="container">
          <SectionHeading eyebrow="DESIGNED AROUND THE CREATOR" title="Why choose" accent="AVONFlow?" description="Less administration. More versions, stronger ideas and a faster path to the final frame." />
          <div className="why-avon__grid">
            {[
              [CreditCard, "No direct cloud billing", "Skip the account configuration and regional card friction."],
              [MonitorPlay, "Original creator UI", "Work in familiar supported interfaces instead of a limited replica."],
              [Clock3, "Simple day-based plans", "Start with three days, then choose the rhythm that fits your output."],
              [Layers3, "Premium model stack", "Move across video, images, voice and reasoning without tool sprawl."],
              [ShieldCheck, "Creator-safe access", "Clear session controls and fraud protection keep the system stable."],
              [Zap, "No waiting room", "Activate your trial instantly and start shaping your first generation."],
            ].map(([Icon, title, copy], index) => (
              <article key={title} data-reveal><span><Icon size={22} /></span><b>0{index + 1}</b><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="model-access section-pad">
        <div className="container">
          <SectionHeading align="center" eyebrow="YOUR MODEL ROSTER" title="AI models you" accent="get access to." description="A focused set of premium tools, with clear access levels." />
          <div className="model-access__grid">
            {modelAccess.map(([Icon, title, plan, copy]) => (
              <article key={title} data-reveal><span><Icon size={22} /></span><div><h3>{title}</h3><p>{copy}</p></div><b>{plan}</b></article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-faq section-pad section-dark">
        <div className="container about-faq__inner">
          <SectionHeading align="center" eyebrow="CLEAR BY DESIGN" title="Everything before" accent="your first prompt." description="Practical answers about setup, plans and model access." />
          <Accordion items={aboutFaqs} />
        </div>
      </section>

      <section className="compact-cta compact-cta--about">
        <div className="container compact-cta__inner">
          <div data-reveal><Eyebrow icon="crown">READY WHEN YOU ARE</Eyebrow><h2>Start creating with <span>AVONFlow.</span></h2><p>Install once. Create across video, images, voice and ideas.</p></div>
          <div data-reveal><button className="button button--primary" onClick={() => openAuth("signup")}>Start free trial <ArrowRight size={17} /></button><ButtonLink to="/pricing" variant="outline">See plans</ButtonLink></div>
        </div>
      </section>
    </main>
  );
}

