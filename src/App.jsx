import { useCallback, useEffect, useState } from "react";
import { AuthModal, ChatWidget, Footer, Navbar, navigate } from "./components.jsx";
import { Home } from "./pages/Home.jsx";
import { Pricing } from "./pages/Pricing.jsx";
import { About } from "./pages/About.jsx";
import { Earn } from "./pages/Earn.jsx";

const pageTitles = {
  "/": "AVONFlow — AI Video & Image Creation",
  "/pricing": "Pricing — AVONFlow",
  "/about": "About — AVONFlow",
  "/earn": "Refer & Earn — AVONFlow",
};

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
    document.title = pageTitles[path] || pageTitles["/"];
    document.documentElement.dataset.route = path.slice(1) || "home";
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = path === "/pricing"
      ? "Compare AVONFlow plans for AI video, image, voice and creator tools."
      : "Create cinematic AI video, images and voice with AVONFlow.";

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
