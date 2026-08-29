const GUIDE_PATH = "/blog/best-ai-tools-for-short-movie-making-2025";

function textResponse(request, body, contentType) {
  return new Response(request.method === "HEAD" ? null : body, {
    headers: {
      "content-type": contentType,
      "cache-control": "public, max-age=3600",
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isReadable = ["GET", "HEAD"].includes(request.method);

    if (isReadable && url.pathname === "/robots.txt") {
      return textResponse(request, `User-agent: *\nAllow: /\nSitemap: ${url.origin}/sitemap.xml\n`, "text/plain; charset=utf-8");
    }

    if (isReadable && url.pathname === "/sitemap.xml") {
      const routes = ["/", "/about", "/pricing", "/earn", GUIDE_PATH];
      const entries = routes.map((path) => `  <url><loc>${url.origin}${path}</loc>${path === GUIDE_PATH ? "<lastmod>2026-08-29</lastmod>" : ""}</url>`).join("\n");
      return textResponse(request, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`, "application/xml; charset=utf-8");
    }

    const response = await env.ASSETS.fetch(request);
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");

    if (response.status !== 404 || !acceptsHtml || !["GET", "HEAD"].includes(request.method)) {
      return response;
    }

    const indexUrl = new URL(request.url);
    indexUrl.pathname = url.pathname === GUIDE_PATH ? "/guide.html" : "/index.html";
    indexUrl.search = "";
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};
