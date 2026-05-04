const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// DEV → 4000 | PROD → 3000
const PORT = dev ? 4000 : 3000;

// DEV → localhost | PROD → all interfaces (needed for NGINX)
const HOST = dev ? "localhost" : "0.0.0.0"; //0.0.0.0 is a special IP that tells the server to listen on all network interfaces.

app.prepare().then(() => {
  const server = express();

  /* =========================
     ✅ DEV ONLY API PROXY
     http://localhost:4000/api → http://localhost:5000
  ========================= */
  if (dev) {
    server.use(
      "/api",
      createProxyMiddleware({
        target: "http://localhost:5000",
        changeOrigin: true,
        ws: true,
      }),
    );
  }

  // Health check (optional)
  server.get("/health", (req, res) => {
    res.json({ status: "ok", mode: dev ? "DEV" : "PROD" });
  });

  // Catch-all route works in Express 4: Next.js handles everything
  server.all("*", (req, res) => handle(req, res));

  server.listen(PORT, HOST, () => {
    console.log(
      `Nabanna-App Frontend is running in ${dev ? "DEV" : "PROD"} mode on http://${HOST}:${PORT}`,
    );
  });
});
