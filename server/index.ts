import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { getPageMetadata, generateMetaTags } from "./pages-metadata.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Read the base HTML template
  let htmlTemplate: string;
  try {
    const htmlPath = path.join(staticPath, "index.html");
    htmlTemplate = fs.readFileSync(htmlPath, "utf-8");
  } catch (error) {
    console.error("Failed to read index.html:", error);
    htmlTemplate = "<!DOCTYPE html><html><head></head><body><div id='root'></div></body></html>";
  }

  // SSR middleware - inject dynamic meta tags based on route
  app.get("*", (req, res) => {
    const pathname = req.path;
    const metadata = getPageMetadata(pathname);
    const metaTags = generateMetaTags(metadata, pathname);

    // Replace the meta tags in the HTML template
    let html = htmlTemplate;

    // Find the closing </head> tag and inject meta tags before it
    const headCloseIndex = html.indexOf("</head>");
    if (headCloseIndex !== -1) {
      // Remove old meta tags and inject new ones
      const headContent = html.substring(0, headCloseIndex);
      const afterHead = html.substring(headCloseIndex);

      // Remove old dynamic meta tags (keep only static ones like fonts, favicon)
      let cleanedHead = headContent;

      // Remove old title
      cleanedHead = cleanedHead.replace(/<title>.*?<\/title>/i, "");

      // Remove old og: and twitter: meta tags
      cleanedHead = cleanedHead.replace(/<meta\s+(?:property|name)="(?:og:|twitter:)[^"]*"[^>]*>/gi, "");

      // Remove old description, keywords, canonical
      cleanedHead = cleanedHead.replace(/<meta\s+name="(?:description|keywords)"[^>]*>/gi, "");
      cleanedHead = cleanedHead.replace(/<link\s+rel="canonical"[^>]*>/gi, "");

      html = cleanedHead + metaTags + "\n" + afterHead;
    }

    res.set("Content-Type", "text/html; charset=utf-8");
    res.send(html);
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
