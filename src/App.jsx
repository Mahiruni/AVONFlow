import { useCallback, useEffect, useState } from "react";
import { AuthModal, ChatWidget, Footer, Navbar, navigate } from "./components.jsx";
import { Home } from "./pages/Home.jsx";
import { Pricing } from "./pages/Pricing.jsx";
import { About } from "./pages/About.jsx";
import { Earn } from "./pages/Earn.jsx";
import { SeoGuide } from "./pages/SeoGuide.jsx";

const GUIDE_PATH = "/blog/best-ai-tools-for-short-movie-making-2025";

const pageMeta = {
  "/": {
    title: "AVONFlow — AI Video & Image Creation",
    description: "Create cinematic AI video, images and voice with AVONFlow.",
    type: "website",
  },
  "/pricing": {
    title: "Pricing — AVONFlow",
    description: "Compare AVONFlow plans for AI video, image, voice and creator tools.",
    type: "website",
  },
  "/about": {
    title: "About — AVONFlow",
    description: "Learn how AVONFlow gives creators simpler access to cinematic AI video, image and voice tools.",
    type: "website",
  },
  "/earn": {
    title: "Refer & Earn — AVONFlow",
    description: "Refer AI creators to AVONFlow and earn withdrawable rewards.",
    type: "website",
  },
  [GUIDE_PATH]: {
    title: "Best AI Tools for Short Movie Making 2025–2026",
    description: "Compare AVONFlow, Veo, Runway, Kling, ChatGPT and Gemini pricing, quality and workflows to make cinematic AI short films on a budget.",
    type: "article",
  },
};

function setMeta(selector, attribute, value) {
  const element = document.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
}

function currentPath() {
  const value = window.location.pathname.replace(/\/+$/, "") || "/";
  return value === "/extension" ? "/" : value;
}

export function App() {
  const [path, setPath] = useState(currentPath);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const update = () => setPath(currentPath());
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  useEffect(() => {
    const metadata = pageMeta[path] || pageMeta["/"];
    document.title = metadata.title;
    document.documentElement.dataset.route = path.slice(1) || "home";
    setMeta('meta[name="description"]', "content", metadata.description);
    setMeta('meta[property="og:title"]', "content", metadata.title);
    setMeta('meta[property="og:description"]', "content", metadata.description);
    setMeta('meta[property="og:type"]', "content", metadata.type);
    setMeta('meta[name="twitter:title"]', "content", metadata.title);
    setMeta('meta[name="twitter:description"]', "content", metadata.description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}${path === "/" ? "" : path}`;

    const reveal = () => {
      const elements = document.querySelectorAll("[data-reveal]");
      if (!("IntersectionObserver" in window)) {
        elements.forEach((element) => element.classList.add("is-visible"));
        return undefined;
      }
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -32px" });
      elements.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        if (bounds.top < window.innerHeight * 0.96 && bounds.bottom > 0) {
          element.classList.add("is-visible");
        } else {
          observer.observe(element);
        }
      });
      return observer;
    };

    let observer;
    const frame = window.requestAnimationFrame(() => {
      observer = reveal();
      const hash = window.location.hash.slice(1);
      if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    });
    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [path]);

  useEffect(() => {
    if (window.location.pathname === "/extension") navigate("/#extension");
  }, []);

  const openAuth = useCallback((mode = "signup", plan = "") => setAuth({ mode, plan }), []);
  const closeAuth = useCallback(() => setAuth(null), []);

  let page;
  if (path === "/pricing") page = <Pricing openAuth={openAuth} />;
  else if (path === "/about") page = <About openAuth={openAuth} />;
  else if (path === "/earn") page = <Earn openAuth={openAuth} />;
  else if (path === GUIDE_PATH) page = <SeoGuide openAuth={openAuth} />;
  else page = <Home openAuth={openAuth} />;

  return (
    <div className="app-shell">
      <Navbar path={path} openAuth={openAuth} />
      {page}
      <Footer openAuth={openAuth} />
      <ChatWidget />
      {auth && <AuthModal mode={auth.mode} plan={auth.plan} close={closeAuth} />}
    </div>
  );
}
