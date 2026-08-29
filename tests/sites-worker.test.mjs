import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";
import worker from "../worker/index.js";

test("serves existing static assets without a fallback", async () => {
  const calls = [];
  const response = await worker.fetch(new Request("https://example.test/assets/app.js"), {
    ASSETS: {
      fetch: async (request) => {
        calls.push(new URL(request.url).pathname);
        return new Response("asset", { status: 200 });
      },
    },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/assets/app.js"]);
});

test("falls back to index.html for an unknown app route", async () => {
  const calls = [];
  const response = await worker.fetch(
    new Request("https://example.test/flow/step-two?source=share", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async (request) => {
          const url = new URL(request.url);
          calls.push(url.pathname + url.search);
          return new Response(url.pathname === "/index.html" ? "app" : "missing", {
            status: url.pathname === "/index.html" ? 200 : 404,
          });
        },
      },
    },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/flow/step-two?source=share", "/index.html"]);
});

test("serves crawlable metadata for the AI filmmaking guide", async () => {
  const source = `<!doctype html><html><head>
    <meta name="description" content="AI filmmaking comparison" />
    <meta property="og:title" content="Best AI Tools for Short Movie Making 2025–2026" />
    <meta property="og:description" content="AI filmmaking comparison" />
    <meta property="og:type" content="article" />
    <meta name="twitter:title" content="Best AI Tools for Short Movie Making 2025–2026" />
    <meta name="twitter:description" content="AI filmmaking comparison" />
    <link rel="canonical" href="https://avonflow.vercel.app/blog/best-ai-tools-for-short-movie-making-2025" />
    <title>Best AI Tools for Short Movie Making 2025–2026</title></head><body>app</body></html>`;
  const response = await worker.fetch(new Request("https://avonflow.test/blog/best-ai-tools-for-short-movie-making-2025", {
    headers: { accept: "text/html" },
  }), {
    ASSETS: {
      fetch: async (request) => new Response(new URL(request.url).pathname === "/guide.html" ? source : "missing", {
        status: new URL(request.url).pathname === "/guide.html" ? 200 : 404,
      }),
    },
  });

  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /Best AI Tools for Short Movie Making 2025–2026/);
  assert.match(html, /property="og:type" content="article"/);
  assert.match(html, /rel="canonical" href="https:\/\/avonflow\.vercel\.app\/blog\/best-ai-tools-for-short-movie-making-2025"/);
});

test("serves robots and sitemap discovery files", async () => {
  const env = { ASSETS: { fetch: async () => new Response("unused", { status: 404 }) } };
  const robots = await worker.fetch(new Request("https://avonflow.test/robots.txt"), env);
  const sitemap = await worker.fetch(new Request("https://avonflow.test/sitemap.xml"), env);

  assert.match(await robots.text(), /Sitemap: https:\/\/avonflow\.test\/sitemap\.xml/);
  assert.match(await sitemap.text(), /best-ai-tools-for-short-movie-making-2025/);
  assert.equal(sitemap.headers.get("content-type"), "application/xml; charset=utf-8");
});

test("does not turn missing API or write requests into the app shell", async () => {
  for (const request of [
    new Request("https://example.test/api/missing", { headers: { accept: "application/json" } }),
    new Request("https://example.test/flow", { method: "POST", headers: { accept: "text/html" } }),
  ]) {
    let calls = 0;
    const response = await worker.fetch(request, {
      ASSETS: {
        fetch: async () => {
          calls += 1;
          return new Response("missing", { status: 404 });
        },
      },
    });

    assert.equal(response.status, 404);
    assert.equal(calls, 1);
  }
});

test("emits the files required by Sites packaging", async () => {
  await access(new URL("../dist/client/index.html", import.meta.url));
  await access(new URL("../dist/server/index.js", import.meta.url));
  await access(new URL("../dist/.openai/hosting.json", import.meta.url));
});
