import {
  ArrowRight,
  BookOpen,
  Bot,
  Camera,
  Check,
  Chrome,
  Clapperboard,
  Clock3,
  Gift,
  Image as ImageIcon,
  Layers3,
  LayoutDashboard,
  MessageCircle,
  Mic2,
  Play,
  Rocket,
  ShieldCheck,
  Sparkles,
  Video,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import {
  Accordion,
  ButtonLink,
  CheckList,
  Eyebrow,
  GalleryRail,
  SectionHeading,
  Stars,
} from "../components.jsx";
import { homeFaqs, testimonials } from "../data.js";

const toolCards = [
  { icon: Video, name: "Flow Video Studio", meta: "Veo 3.1 · Cinematic video", tone: "violet" },
  { icon: Bot, name: "ChatGPT", meta: "Ideas, scripts and prompts", tone: "emerald" },
  { icon: Wand2, name: "Grok", meta: "Fast creative reasoning", tone: "amber" },
  { icon: ImageIcon, name: "Avon Image", meta: "Imagen + Whisk precision", tone: "cyan" },
];

const features = [
  { icon: Video, title: "Veo 3.1 Video", copy: "Generate cinematic scenes with motion, sound and camera language in seconds." },
  { icon: ImageIcon, title: "Whisk + Imagen", copy: "Create precise images, variations and art directions across every standard format." },
  { icon: Chrome, title: "Chrome Extension", copy: "Connect your AVONFlow access to Google Flow with a guided, one-time setup." },
  { icon: Layers3, title: "All Premium Models", copy: "Move between video, image, voice and reasoning models from one calm workspace." },
];

const workflow = [
  ["01", "Create an account", "Start with email. Your three-day trial activates instantly, without a card."],
  ["02", "Connect the extension", "Install AvonBridge and securely link your authorized creator session."],
  ["03", "Choose your model", "Open Veo, Imagen, ChatGPT, Grok or AvonTTS from one dashboard."],
  ["04", "Generate and ship", "Type the idea, select a format and export your strongest version."],
];

export function Home({ openAuth }) {
  return (
    <main>
      <section className="hero-home">
        <img className="hero-home__art" src="/assets/avonflow-hero.webp" alt="Futuristic humanoid filmmaker holding a cinema camera and clapperboard" fetchPriority="high" />
        <div className="hero-home__atmosphere" aria-hidden="true" />
        <div className="container hero-home__inner">
          <div className="hero-home__copy" data-reveal>
            <Eyebrow icon="crown">WORLD-CLASS AI CREATION PLATFORM</Eyebrow>
            <h1><span>AI VIDEO.</span><span>UNLIMITED.</span><span>CREATION.</span></h1>
            <p>AVONFlow gives you direct access to Google Flow, Veo 3.1, ChatGPT, Grok &amp; more — unlimited creations that don’t just look good — <strong>they go viral.</strong></p>
            <div className="hero-home__actions">
              <button className="button button--primary button--hero" onClick={() => openAuth("signup")}>GET STARTED FREE <ArrowRight size={18} /></button>
              <ButtonLink to="/pricing" variant="glass">VIEW PRICING</ButtonLink>
              <Stars />
            </div>
          </div>
          <div className="hero-home__stats" data-reveal>
            <div><strong>145.9K+</strong><span>CREATORS JOINED</span></div>
            <div><strong>737.7K+</strong><span>AI VIDEOS GENERATED</span></div>
            <div><strong>3-DAY</strong><span>FREE TRIAL · NO CARD</span></div>
          </div>
        </div>
        <div className="hero-home__scroll"><span>SCROLL TO EXPLORE</span><i /></div>
      </section>

      <section className="dashboard-section section-pad">
        <div className="container">
          <div className="dashboard-section__label"><span /> LIVE PRODUCT PREVIEW — NO SIGNUP NEEDED</div>
          <div className="product-window" data-reveal>
            <div className="product-window__chrome">
              <div><i /><i /><i /></div>
              <span><ShieldCheck size={13} /> app.avonflow.ai/dashboard</span>
              <b>LIVE</b>
            </div>
            <div className="product-window__body">
              <aside className="product-sidebar">
                <div className="product-sidebar__logo"><Sparkles size={16} /> AVONFlow</div>
                <nav>
                  <span className="is-active"><LayoutDashboard size={16} /> Home</span>
                  <span><Video size={16} /> Google Flow</span>
                  <span><Bot size={16} /> ChatGPT</span>
                  <span><Wand2 size={16} /> Super Grok</span>
                  <span><ImageIcon size={16} /> Imagen</span>
                </nav>
                <small>PINNED TOOLS</small>
                <nav>
                  <span><Sparkles size={16} /> Prompt Lab</span>
                  <span><Mic2 size={16} /> AvonTTS</span>
                  <span><Chrome size={16} /> Extension</span>
                </nav>
                <div className="product-user"><b>M</b><span>Mahir<small>Max plan</small></span></div>
              </aside>
              <div className="product-main">
                <div className="product-topline"><p>Welcome back, creator.</p><div><span><i /> Extension connected</span><b>24,040 credits</b></div></div>
                <div className="product-heading">
                  <Eyebrow>CREATE WITH AVONFLOW</Eyebrow>
                  <h3>What would you like to <span>create today?</span></h3>
                  <p>Pick a tool and turn your next idea into something people remember.</p>
                </div>
                <div className="tool-tabs"><button className="is-active"><Video size={14} /> Video</button><button><Bot size={14} /> ChatGPT</button><button><Mic2 size={14} /> AvonTTS</button><button><Wand2 size={14} /> Grok</button></div>
                <div className="tool-grid">
                  {toolCards.map(({ icon: Icon, name, meta, tone }) => (
                    <article className={`tool-card tool-card--${tone}`} key={name}>
                      <span><Icon size={19} /></span><h4>{name}</h4><p>{meta}</p><button>Try now <ArrowRight size={14} /></button>
                    </article>
                  ))}
                </div>
                <div className="product-latest"><span>LATEST AI TOOLS <b>FRESH</b></span><button>View all <ArrowRight size={13} /></button></div>
                <div className="mini-tools"><i /><i /><i /><i /><i /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="showcase section-pad section-dark">
        <div className="container">
          <div className="showcase__heading">
            <SectionHeading eyebrow="MADE WITH AVONFLOW" title="One prompt." accent="Every universe." description="No camera. No crew. No weeks of post-production. These scenes were shaped with the same creation stack inside AVONFlow." />
            <p data-reveal>ONE IDEA<br />FOUR DIRECTIONS</p>
          </div>
          <GalleryRail />
          <div className="showcase__action" data-reveal><button className="button button--primary" onClick={() => openAuth("signup")}>Start creating free <ArrowRight size={17} /></button></div>
        </div>
      </section>

      <section className="proof section-pad">
        <div className="container">
          <SectionHeading align="center" eyebrow="CREATOR SIGNAL" title="Real people." accent="Real momentum." description="A creation community that keeps getting faster, sharper and more ambitious." />
          <div className="proof__stats" data-reveal>
            <div><strong>145.9K+</strong><span>Creators joined</span></div>
            <div><strong>737.7K+</strong><span>AI videos generated</span></div>
            <div><strong>76.4K+</strong><span>AI images created</span></div>
            <div><strong>814.1K+</strong><span>Total generations</span></div>
          </div>
          <div className="trust-strip" data-reveal>
            <span><ShieldCheck size={17} /> SSL secured</span>
            <span><Rocket size={17} /> Instant access</span>
            <span><Clock3 size={17} /> No card to start</span>
            <span><MessageCircle size={17} /> Human support</span>
          </div>
        </div>
      </section>

      <section className="earn-teaser section-pad section-dark">
        <div className="container">
          <div className="earn-teaser__top">
            <SectionHeading eyebrow="REFERRAL PROGRAM" icon="gift" title="Earn money" accent="by sharing." description="Refer friends to AVONFlow. When they choose a paid plan, real USD lands in your wallet as tokens." />
            <ButtonLink to="/earn" variant="outline">See how it works</ButtonLink>
          </div>
          <div className="earn-teaser__cards">
            <article data-reveal><span><Gift size={19} /></span><small>Basic plan referral</small><strong>$0.15 <b>USD</b></strong><p>5 tokens · credited on purchase</p></article>
            <article className="is-featured" data-reveal><b className="best">BEST</b><span><Zap size={19} /></span><small>Plus plan referral</small><strong>$0.21 <b>USD</b></strong><p>7 tokens · credited on purchase</p></article>
            <article data-reveal><span><ShieldCheck size={19} /></span><small>Withdraw anytime</small><strong>$1.02+ <b>USD</b></strong><p>34+ tokens · three payout methods</p></article>
          </div>
          <div className="token-bar" data-reveal><strong>1 token = $0.03 USD</strong><span>No referral limit · Instant eligible rewards</span><SiteLinkInline /></div>
        </div>
      </section>

      <section className="features section-pad" id="extension">
        <div className="container">
          <SectionHeading eyebrow="ONE CREATOR OS" title="Built for creators" accent="at every level." description="Everything you need to generate content at scale, without turning your workflow into a maze." />
          <div className="features__grid">
            {features.map(({ icon: Icon, title, copy }, index) => (
              <article key={title} data-reveal>
                <div className="feature-card__number">0{index + 1}</div>
                <span><Icon size={21} /></span>
                <h3>{title}</h3><p>{copy}</p>
                {title === "Chrome Extension" && <button onClick={() => openAuth("signup")}>Connect in 30 seconds <ArrowRight size={15} /></button>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="old-new section-pad section-deep">
        <div className="container">
          <SectionHeading align="center" eyebrow="A FASTER PRODUCTION MODEL" title="Skip the shoot." accent="Keep the quality." description="What used to take a crew and a week can now begin with a prompt and a minute." />
          <div className="old-new__grid">
            <article className="old-card" data-reveal>
              <span>THE OLD WAY</span>
              <ul>
                {["Hire a crew and rent equipment", "Book locations, actors and lighting", "Days of shooting and weeks of editing", "Budgets that begin in the thousands", "One language, one version, one shot"].map((item) => <li key={item}><i><X size={13} /></i>{item}</li>)}
              </ul>
            </article>
            <article className="new-card" data-reveal>
              <span><Sparkles size={14} /> THE AVONFLOW WAY</span>
              <ul>
                {["Type a prompt — that is the whole shoot", "Cinematic video with sound in seconds", "Unlimited takes and instant restyling", "One plan instead of per-video invoices", "Image, video and voice in one place"].map((item) => <li key={item}><i><Check size={13} /></i>{item}</li>)}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="workflow section-pad section-dark">
        <div className="container">
          <SectionHeading eyebrow="FROM ZERO TO FIRST FRAME" title="Ready in" accent="4 steps." description="No complicated setup. Connect once, choose a model and start generating." />
          <div className="workflow__grid">
            {workflow.map(([number, title, copy], index) => (
              <article key={number} data-reveal>
                <div className="workflow__line"><span>{number}</span>{index < 3 && <i />}</div>
                <h3>{title}</h3><p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="plans-teaser section-pad">
        <div className="container">
          <div className="plans-teaser__heading">
            <SectionHeading eyebrow="SIMPLE PRICING" title="3 plans." accent="Unlimited potential." description="Start free, then choose the capacity that matches your creative pace." />
            <ButtonLink to="/pricing" variant="outline">Compare all plans</ButtonLink>
          </div>
          <div className="plans-teaser__cards">
            <article data-reveal><small>STARTER</small><h3>Free</h3><strong>3 days</strong><p>No card. Full trial workspace.</p><button onClick={() => openAuth("signup")}>Start now <ArrowRight size={16} /></button></article>
            <article className="is-featured" data-reveal><small>BEST VALUE</small><h3>Max</h3><strong>Unlimited</strong><p>30 days. All premium models.</p><button onClick={() => openAuth("signup", "Max")}>Choose Max <ArrowRight size={16} /></button></article>
            <article data-reveal><small>STUDIO</small><h3>Heavy</h3><strong>Maximum</strong><p>Agent Mode + studio queue.</p><button onClick={() => openAuth("signup", "Heavy")}>Choose Heavy <ArrowRight size={16} /></button></article>
          </div>
        </div>
      </section>

      <section className="testimonials section-pad section-dark">
        <div className="container">
          <SectionHeading align="center" eyebrow="CREATOR FEEDBACK" title="Hear it from" accent="the makers." description="How creators use AVONFlow to make stronger work in less time." />
          <div className="testimonials__grid">
            {testimonials.map((item, index) => (
              <article key={item.name} data-reveal>
                <div className="testimonial-stars">★★★★★</div>
                <blockquote>“{item.quote}”</blockquote>
                <div className="testimonial-user"><span>{item.initials}</span><p><strong>{item.name}</strong><small>{item.role}</small></p><b>0{index + 1}</b></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="guide-promo">
        <div className="container guide-promo__inner" data-reveal>
          <span className="guide-promo__icon"><BookOpen size={25} /></span>
          <div>
            <small>AVONFLOW CREATOR INTELLIGENCE</small>
            <h2>Best AI tools for short movie making.</h2>
            <p>Compare Veo 3.1, Runway, Kling, ChatGPT and Gemini—then follow the complete script-to-screen workflow.</p>
          </div>
          <ButtonLink to="/blog/best-ai-tools-for-short-movie-making-2025" variant="outline">Read the 2026 guide</ButtonLink>
        </div>
      </section>

      <section className="faq-section section-pad">
        <div className="container faq-section__inner">
          <SectionHeading eyebrow="FAQ" title="Questions?" accent="Answered." description="The things creators usually want to know before their first generation." />
          <Accordion items={homeFaqs} />
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta__glow" />
        <div className="container final-cta__inner">
          <div data-reveal><Eyebrow icon="crown">YOUR NEXT FRAME STARTS HERE</Eyebrow><h2>Start generating<br /><span>AI videos today.</span></h2><p>Three free days. No card. Just install, connect and create.</p></div>
          <div className="final-cta__actions" data-reveal><span><Sparkles size={30} /></span><button className="button button--light" onClick={() => openAuth("signup")}>Get started free <ArrowRight size={17} /></button><a href="#extension" className="button button--outline">Explore extension</a></div>
        </div>
      </section>
    </main>
  );
}

function SiteLinkInline() {
  return <a href="/earn" onClick={(event) => { event.preventDefault(); window.history.pushState({}, "", "/earn"); window.dispatchEvent(new PopStateEvent("popstate")); window.scrollTo(0, 0); }}>Start earning <ArrowRight size={14} /></a>;
}
