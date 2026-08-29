import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Copy,
  Crown,
  Eye,
  EyeOff,
  Gift,
  Headphones,
  LockKeyhole,
  Mail,
  Menu,
  MessageCircle,
  Play,
  Send,
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react";
import { galleryItems } from "./data.js";

export function navigate(to) {
  if (!to || to.startsWith("http") || to.startsWith("mailto:")) return;
  window.history.pushState({}, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
  const [, hash] = to.split("#");
  window.setTimeout(() => {
    if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, 30);
}

export function SiteLink({ to, onClick, children, ...props }) {
  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented || !to || to.startsWith("http") || to.startsWith("mailto:")) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

export function Logo({ compact = false }) {
  return (
    <SiteLink to="/" className={`brand ${compact ? "brand--compact" : ""}`} aria-label="AVONFlow home">
      <span className="brand__mark" aria-hidden="true">
        <Sparkles size={20} strokeWidth={2.2} />
      </span>
      <span className="brand__name">
        Avon<span>Flow</span>
      </span>
    </SiteLink>
  );
}

const navItems = [
  ["Home", "/"],
  ["About", "/about"],
  ["Pricing", "/pricing"],
  ["AI Guide", "/blog/best-ai-tools-for-short-movie-making-2025"],
  ["Extension", "/#extension"],
  ["Earn Money", "/earn"],
];

export function Navbar({ path, openAuth }) {
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const activeFor = (href) => {
    if (href === "/") return path === "/";
    if (href === "/#extension") return false;
    if (href.startsWith("/blog/")) return path.startsWith("/blog/");
    return path === href;
  };

  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <SiteLink
              key={label}
              to={href}
              className={activeFor(href) ? "is-active" : label === "Earn Money" ? "is-earn" : ""}
            >
              {label === "Earn Money" && <Sparkles size={14} />}
              {label}
            </SiteLink>
          ))}
        </nav>
        <div className="header-actions">
          <button className="header-login" onClick={() => openAuth("login")}>Log In</button>
          <button className="button button--light header-start" onClick={() => openAuth("signup")}>
            Get Started
          </button>
          <button
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={25} /> : <Menu size={27} />}
          </button>
        </div>
      </div>
      <div className={`mobile-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          {navItems.map(([label, href], index) => (
            <SiteLink
              key={label}
              to={href}
              onClick={() => setOpen(false)}
              className={activeFor(href) ? "is-active" : ""}
            >
              <span>0{index + 1}</span>
              {label}
              <ArrowUpRight size={19} />
            </SiteLink>
          ))}
        </nav>
        <div className="mobile-drawer__actions">
          <button className="button button--outline" onClick={() => { setOpen(false); openAuth("login"); }}>Log In</button>
          <button className="button button--primary" onClick={() => { setOpen(false); openAuth("signup"); }}>Start Free</button>
        </div>
        <p>3-day free trial · No card required</p>
      </div>
    </header>
  );
}

export function Eyebrow({ children, icon = "spark" }) {
  return (
    <div className="eyebrow">
      {icon === "crown" ? <Crown size={15} /> : icon === "gift" ? <Gift size={15} /> : <Sparkles size={15} />}
      <span>{children}</span>
    </div>
  );
}

export function SectionHeading({ eyebrow, title, accent, description, align = "left", icon }) {
  return (
    <div className={`section-heading section-heading--${align}`} data-reveal>
      {eyebrow && <Eyebrow icon={icon}>{eyebrow}</Eyebrow>}
      <h2>
        {title} {accent && <span>{accent}</span>}
      </h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function ButtonLink({ to, children, variant = "primary", className = "", arrow = true, ...props }) {
  return (
    <SiteLink to={to} className={`button button--${variant} ${className}`} {...props}>
      {children}
      {arrow && <ArrowUpRight size={17} />}
    </SiteLink>
  );
}

export function GalleryRail({ compact = false }) {
  return (
    <div className={`gallery-rail ${compact ? "gallery-rail--compact" : ""}`} aria-label="AI creation examples">
      {galleryItems.map((item, index) => (
        <article className={`gallery-card gallery-card--${index + 1}`} key={item.title} data-reveal>
          <img src={item.src} alt={item.prompt} loading={index > 1 ? "lazy" : "eager"} />
          <div className="gallery-card__veil" />
          <button className="gallery-card__play" aria-label={`Preview ${item.title}`}>
            <Play size={18} fill="currentColor" />
          </button>
          <div className="gallery-card__copy">
            <span>{item.tag}</span>
            <strong>{item.title}</strong>
          </div>
        </article>
      ))}
    </div>
  );
}

export function Accordion({ items, defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  return (
    <div className="accordion">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div className={`accordion__item ${open ? "is-open" : ""}`} key={item.q} data-reveal>
            <button
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? -1 : index)}
            >
              <span>{item.q}</span>
              <ChevronDown size={20} />
            </button>
            <div className="accordion__answer" aria-hidden={!open}>
              <div><p>{item.a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Stars({ label = "600+ RATINGS" }) {
  return (
    <div className="rating" aria-label={`Five stars, ${label}`}>
      <div>{[0, 1, 2, 3, 4].map((star) => <Star key={star} size={14} fill="currentColor" />)}</div>
      <span>{label}</span>
    </div>
  );
}

export function AuthModal({ mode, plan, close }) {
  const [kind, setKind] = useState(mode || "signup");
  const [showPassword, setShowPassword] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setKind(mode || "signup");
    setComplete(false);
  }, [mode, plan]);

  useEffect(() => {
    document.body.classList.add("modal-open");
    const handler = (event) => event.key === "Escape" && close();
    window.addEventListener("keydown", handler);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handler);
    };
  }, [close]);

  const title = kind === "login" ? "Welcome back." : plan ? `Start with ${plan}.` : "Create without limits.";

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <section className="auth-modal" role="dialog" aria-modal="true" aria-label={title}>
        <button className="auth-modal__close" aria-label="Close" onClick={close}><X size={22} /></button>
        <div className="auth-modal__visual">
          <Logo compact />
          <div>
            <Eyebrow icon="crown">3 DAYS ON US</Eyebrow>
            <h3>Make the impossible <span>before lunch.</span></h3>
            <ul>
              <li><Check size={16} /> No credit card</li>
              <li><Check size={16} /> Premium model access</li>
              <li><Check size={16} /> Cancel whenever you want</li>
            </ul>
          </div>
        </div>
        <div className="auth-modal__form">
          {!complete ? (
            <>
              <div className="auth-tabs">
                <button className={kind === "signup" ? "is-active" : ""} onClick={() => setKind("signup")}>Start free</button>
                <button className={kind === "login" ? "is-active" : ""} onClick={() => setKind("login")}>Log in</button>
              </div>
              <div className="auth-modal__heading">
                <h2>{title}</h2>
                <p>{kind === "login" ? "Enter your details to open your creator workspace." : "Your first generation is closer than you think."}</p>
              </div>
              <form onSubmit={(event) => { event.preventDefault(); setComplete(true); }}>
                <div className="form-control">
                  <label htmlFor="avon-email">Email address</label>
                  <span className="field"><Mail size={17} /><input id="avon-email" type="email" required placeholder="you@studio.com" autoComplete="email" /></span>
                </div>
                <div className="form-control">
                  <label htmlFor="avon-password">Password</label>
                  <span className="field"><LockKeyhole size={17} /><input id="avon-password" type={showPassword ? "text" : "password"} required minLength={6} placeholder="At least 6 characters" autoComplete={kind === "login" ? "current-password" : "new-password"} />
                    <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
                  </span>
                </div>
                <button type="submit" className="button button--primary button--full">
                  {kind === "login" ? "Open AVONFlow" : "Start creating free"}<ArrowRight size={18} />
                </button>
              </form>
              <p className="auth-note">Prototype mode: form data stays in this browser.</p>
            </>
          ) : (
            <div className="auth-success">
              <span><Check size={28} /></span>
              <Eyebrow>ACCESS READY</Eyebrow>
              <h2>{kind === "login" ? "Workspace unlocked." : "You’re on the launch list."}</h2>
              <p>{kind === "login" ? "The production build can now connect this form to your authentication provider." : "We saved this prototype state locally. Connect your email provider before the public launch."}</p>
              <button className="button button--primary button--full" onClick={close}>Continue exploring</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  return (
    <div className={`chat-widget ${open ? "is-open" : ""}`}>
      <div className="chat-panel" aria-hidden={!open}>
        <div className="chat-panel__header">
          <span><Headphones size={19} /></span>
          <div><strong>AVONFlow Support</strong><small><i /> Typically replies in minutes</small></div>
          <button onClick={() => setOpen(false)} aria-label="Close chat"><X size={18} /></button>
        </div>
        <div className="chat-panel__body">
          <p className="chat-bubble">Hey — what can we help you create today?</p>
          {!sent ? (
            <div className="chat-options">
              {["Choose a plan", "Connect extension", "Ask about models"].map((item) => (
                <button key={item} onClick={() => setSent(true)}>{item}<ArrowRight size={14} /></button>
              ))}
            </div>
          ) : (
            <p className="chat-bubble chat-bubble--user">Thanks! This demo interaction is ready for your live support integration.</p>
          )}
        </div>
        <div className="chat-panel__footer"><Clock3 size={14} /> 10:00 AM–9:00 PM PKT · Mon–Fri</div>
      </div>
      <button className="chat-launcher" aria-label={open ? "Close support chat" : "Open support chat"} onClick={() => setOpen((value) => !value)}>
        {open ? <X size={24} /> : <MessageCircle size={24} fill="currentColor" />}
        {!open && <i />}
      </button>
    </div>
  );
}

export function Footer({ openAuth }) {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div className="footer-brand">
          <Logo compact />
          <p>One workspace for cinematic AI video, images, voice and ideas.</p>
        </div>
        <button className="footer-earn" onClick={() => navigate("/earn")}>
          <span><Gift size={20} /></span>
          <div><strong>Earn Money <b>NEW</b></strong><small>Refer creators · Earn $0.15–$0.21</small></div>
          <ArrowRight size={18} />
        </button>
      </div>
      <div className="container footer-links">
        <nav aria-label="Footer navigation">
          <SiteLink to="/about">About</SiteLink>
          <SiteLink to="/pricing">Pricing</SiteLink>
          <SiteLink to="/blog/best-ai-tools-for-short-movie-making-2025">AI Filmmaking Guide</SiteLink>
          <SiteLink to="/earn">Earn Money</SiteLink>
          <button onClick={() => document.querySelector(".chat-launcher")?.click()}>Support</button>
          <button onClick={() => openAuth("login")}>Login</button>
          <button onClick={() => openAuth("signup")}>Sign Up</button>
        </nav>
        <p>© {year} AVONFlow. All rights reserved.</p>
      </div>
      <div className="container footer-support"><Clock3 size={14} /> Support timings: 10:00 AM–9:00 PM PKT · Saturday & Sunday off</div>
      <div className="container footer-legal">
        <p>AVONFlow works with Google Flow (labs.google.com) to provide AI generation services. AVONFlow is not affiliated with, partnered with, or sponsored by Google in any way. Google trademarks belong to their respective owners.</p>
        <span>Built for creators worldwide <Sparkles size={13} /></span>
      </div>
    </footer>
  );
}

export function CheckList({ items }) {
  return (
    <ul className="check-list">
      {items.map((item) => <li key={item}><span><Check size={14} /></span>{item}</li>)}
    </ul>
  );
}

export function MicroBadge({ children, tone = "cyan" }) {
  return <span className={`micro-badge micro-badge--${tone}`}><Zap size={12} />{children}</span>;
}

export function CopyButton({ value }) {
  const [copyState, setCopyState] = useState("idle");
  return (
    <button
      className="copy-button"
      aria-live="polite"
      onClick={async () => {
        let success = false;
        try {
          await navigator.clipboard.writeText(value);
          success = true;
        } catch {
          const fallback = document.createElement("textarea");
          fallback.value = value;
          fallback.setAttribute("readonly", "");
          fallback.style.position = "fixed";
          fallback.style.opacity = "0";
          document.body.appendChild(fallback);
          fallback.select();
          success = document.execCommand("copy");
          fallback.remove();
        }
        setCopyState(success ? "copied" : "failed");
        window.setTimeout(() => setCopyState("idle"), 1600);
      }}
    >
      {copyState === "copied" ? <Check size={16} /> : <Copy size={16} />}
      {copyState === "copied" ? "Copied" : copyState === "failed" ? "Try again" : "Copy"}
    </button>
  );
}

export function NewsletterField({ label = "Get launch updates" }) {
  const [done, setDone] = useState(false);
  return done ? (
    <div className="newsletter-success"><Check size={17} /> You’re on the Avon list.</div>
  ) : (
    <form className="newsletter" onSubmit={(event) => { event.preventDefault(); setDone(true); }}>
      <Mail size={17} />
      <input type="email" aria-label="Email address" required placeholder="Email address" />
      <button type="submit">{label}<Send size={15} /></button>
    </form>
  );
}
