import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";
const distPath = path.join(__dirname, "dist");
const indexPath = path.join(distPath, "index.html");

app.use(express.static(distPath));

app.use((req, res, next) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return next();
  }

  return res.sendFile(indexPath);
});

app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});
