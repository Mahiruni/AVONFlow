import { useEffect, useMemo } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Film,
  Sparkles,
} from "lucide-react";
import { ButtonLink, SiteLink } from "../components.jsx";
import guideMarkdown from "../content/best-ai-tools-short-movie-making-2025.md?raw";

const GUIDE_PATH = "/blog/best-ai-tools-for-short-movie-making-2025";
const SEO_APPENDIX = "\n## Recommended Meta Title";

const faqItems = [
  ["What are the best AI tools for short movie making 2025?", "The best current stack is ChatGPT or Gemini for scripts, Imagen or Whisk for reference art, Veo 3.1, Runway Gen-4.5, or Kling Video 3.0 for motion, and a conventional editor for finishing. AVONFlow is attractive when you want several of those stages in one budget-focused workspace."],
  ["Can AI make an entire short film?", "Yes, but the reliable method is to write, storyboard, generate, and edit shot by shot. Human direction remains essential for continuity, performance, pacing, sound, factual accuracy, and rights clearance."],
  ["What is the best AI short film generator for beginners?", "The best beginner tool combines clear prompting, reference images, affordable testing, and easy exports. AVONFlow offers a low-cost multi-model route, while Flow, Runway, and Kling each excel at different kinds of shots."],
  ["How much does it cost to make a short movie with AI?", "A disciplined 60–90 second experiment can begin below $30. A polished narrative short may cost $50–$300 after subscriptions, extra credits, audio, and rejected generations are included."],
  ["ChatGPT vs Gemini for screenwriting: which is better?", "ChatGPT is strong for fast scene variants and structured rewrites. Gemini is strong for long-context analysis, Google Docs workflows, and handoff into Flow. Test both with the same scene brief."],
  ["Is Runway better than Kling for AI video?", "Runway is often the stronger production hub, while Kling is highly competitive for reference-driven character motion, longer clips, action, native audio, and lip-sync. Neither wins every shot."],
  ["What are the best Sora alternatives in 2026?", "The leading Sora alternatives are Google Flow with Veo 3.1, Runway Gen-4.5, Kling Video 3.0, Adobe Firefly, and multi-model workspaces such as AVONFlow."],
  ["Can I use AI-generated video commercially?", "Often yes, but commercial use depends on the tool, plan, model, jurisdiction, and your inputs. Clear the rights for uploaded images, voices, music, logos, and likenesses before publishing."],
];

function cleanText(value) {
  return value
    .replace(/\*\*/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
}

function slugify(value) {
  return cleanText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function renderInline(value, keyRoot = "inline") {
  const tokenPattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = value.split(tokenPattern).filter(Boolean);

  return parts.map((part, index) => {
    const key = `${keyRoot}-${index}`;
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith("/")) return <SiteLink key={key} to={href}>{label}</SiteLink>;
      return <a key={key} href={href} target="_blank" rel="noreferrer">{label}</a>;
    }

    return part;
  });
}

function isSpecial(line, nextLine = "") {
  return /^#{1,3}\s/.test(line)
    || /^>\s?/.test(line)
    || /^-\s/.test(line)
    || /^\d+\.\s/.test(line)
    || (line.startsWith("|") && /^\|?\s*:?-+/.test(nextLine));
}

function renderMarkdown(markdown) {
  const lines = markdown.split("\n");
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const label = heading[2];
      const id = slugify(label);
      blocks.push(level === 2
        ? <h2 id={id} key={`h2-${index}`}>{renderInline(label, `h2-${index}`)}</h2>
        : <h3 id={id} key={`h3-${index}`}>{renderInline(label, `h3-${index}`)}</h3>);
      index += 1;
      continue;
    }

    if (line.startsWith(">")) {
      const quote = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quote.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push(
        <aside className="guide-answer" key={`quote-${index}`}>
          <CheckCircle2 size={22} />
          <p>{renderInline(quote.join(" "), `quote-${index}`)}</p>
        </aside>,
      );
      continue;
    }

    if (line.startsWith("|") && lines[index + 1]?.trim().match(/^\|?\s*:?-+/)) {
      const rows = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(lines[index].trim().slice(1, -1).split("|").map((cell) => cell.trim()));
        index += 1;
      }
      const [headers, , ...body] = rows;
      blocks.push(
        <div className="guide-table-wrap" key={`table-${index}`} tabIndex="0" aria-label="Scrollable comparison table">
          <table>
            <thead><tr>{headers.map((cell, cellIndex) => <th key={cellIndex}>{renderInline(cell, `th-${index}-${cellIndex}`)}</th>)}</tr></thead>
            <tbody>{body.map((row, rowIndex) => (
              <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{renderInline(cell, `td-${index}-${rowIndex}-${cellIndex}`)}</td>)}</tr>
            ))}</tbody>
          </table>
        </div>,
      );
      continue;
    }

    const unordered = line.startsWith("- ");
    const ordered = /^\d+\.\s/.test(line);
    if (unordered || ordered) {
      const items = [];
      const pattern = unordered ? /^-\s+(.+)$/ : /^\d+\.\s+(.+)$/;
      while (index < lines.length) {
        const match = lines[index].trim().match(pattern);
        if (!match) break;
        items.push(match[1]);
        index += 1;
        while (index < lines.length && lines[index].trim() === "") index += 1;
      }
      const ListTag = ordered ? "ol" : "ul";
      blocks.push(
        <ListTag key={`list-${index}`}>
          {items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item, `li-${index}-${itemIndex}`)}</li>)}
        </ListTag>,
      );
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (index < lines.length) {
      const next = lines[index].trim();
      if (!next || isSpecial(next, lines[index + 1]?.trim())) break;
      paragraph.push(next);
      index += 1;
    }
    blocks.push(<p key={`p-${index}`}>{renderInline(paragraph.join(" "), `p-${index}`)}</p>);
  }

  return blocks;
}

export function SeoGuide({ openAuth }) {
  const publishableMarkdown = guideMarkdown.split(SEO_APPENDIX)[0];
  const lines = publishableMarkdown.split("\n");
  const title = cleanText(lines[0].replace(/^#\s+/, ""));
  const intro = lines.find((line, index) => index > 0 && line.trim() && !line.startsWith(">"));
  const introIndex = lines.indexOf(intro);
  const body = lines.slice(introIndex + 1).join("\n");

  const tableOfContents = useMemo(() => publishableMarkdown
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const label = cleanText(line.replace(/^##\s+/, ""));
      return { label, id: slugify(label) };
    }), [publishableMarkdown]);

  useEffect(() => {
    const schema = document.createElement("script");
    schema.id = "avonflow-guide-schema";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: "Compare AVONFlow, Veo, Runway, Kling, ChatGPT and Gemini pricing, quality and workflows to make cinematic AI short films on a budget.",
        datePublished: "2026-08-29",
        dateModified: "2026-08-29",
        mainEntityOfPage: `${window.location.origin}${GUIDE_PATH}`,
        author: { "@type": "Organization", name: "AVONFlow" },
        publisher: { "@type": "Organization", name: "AVONFlow" },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map(([name, text]) => ({
          "@type": "Question",
          name,
          acceptedAnswer: { "@type": "Answer", text },
        })),
      },
    ]);
    document.head.appendChild(schema);
    return () => schema.remove();
  }, [title]);

  return (
    <main className="seo-guide-page">
      <section className="guide-hero">
        <div className="guide-hero__glow" />
        <div className="container guide-hero__inner">
          <div className="guide-hero__copy" data-reveal>
            <nav className="guide-breadcrumb" aria-label="Breadcrumb">
              <SiteLink to="/">Home</SiteLink><span>/</span><span>AI Filmmaking Guide</span>
            </nav>
            <div className="guide-kicker"><Sparkles size={14} /> AVONFLOW CREATOR INTELLIGENCE</div>
            <h1>{title}</h1>
            <p>{renderInline(intro, "hero-intro")}</p>
            <div className="guide-meta">
              <span><CalendarDays size={15} /> Updated Aug 29, 2026</span>
              <span><Clock3 size={15} /> 22 min read</span>
              <span><BookOpen size={15} /> Expert guide</span>
            </div>
          </div>
          <aside className="guide-hero__visual" data-reveal aria-label="AI filmmaking production stack">
            <img src="/assets/avonflow-hero.webp" alt="Futuristic AI filmmaker holding a cinematic camera" />
            <div className="guide-visual__card">
              <span><Film size={17} /> 2026 STACK</span>
              <strong>Script → Frames → Motion → Edit</strong>
              <p>One practical workflow. Every serious model compared.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="guide-content-section">
        <div className="container guide-layout">
          <aside className="guide-toc" aria-label="Article contents">
            <span>IN THIS GUIDE</span>
            <nav>
              {tableOfContents.map((item, index) => (
                <a href={`#${item.id}`} key={item.id}><b>{String(index + 1).padStart(2, "0")}</b>{item.label}</a>
              ))}
            </nav>
            <button onClick={() => openAuth("signup")}>
              Start creating free <ArrowRight size={15} />
            </button>
          </aside>

          <article className="guide-article">
            {renderMarkdown(body)}
          </article>
        </div>
      </section>

      <section className="guide-cta">
        <div className="container guide-cta__inner">
          <div>
            <span><Sparkles size={15} /> FROM RESEARCH TO FIRST FRAME</span>
            <h2>Stop comparing.<br /><em>Start directing.</em></h2>
            <p>Test your script, visual bible and first three-shot sequence with AVONFlow before committing to a larger production budget.</p>
          </div>
          <div>
            <button className="button button--light" onClick={() => openAuth("signup")}>Start free trial <ArrowRight size={17} /></button>
            <ButtonLink to="/pricing" variant="outline">Compare plans</ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
