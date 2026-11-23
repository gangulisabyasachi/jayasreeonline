import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function getStaticRoutes(appDir: string, currentRoute = ""): string[] {
  const routes: string[] = [];
  if (!fs.existsSync(appDir)) return routes;

  try {
    const entries = fs.readdirSync(appDir, { withFileTypes: true });
    for (const entry of entries) {
      if (
        entry.name.startsWith("_") ||
        entry.name.startsWith(".") ||
        entry.name === "api" ||
        entry.name === "node_modules"
      ) {
        continue;
      }
      const fullPath = path.join(appDir, entry.name);
      if (entry.isDirectory()) {
        const routeSegment =
          entry.name.startsWith("(") && entry.name.endsWith(")")
            ? currentRoute
            : `${currentRoute}/${entry.name}`;
        routes.push(...getStaticRoutes(fullPath, routeSegment));
      } else if (
        entry.isFile() &&
        /^page\.(tsx|ts|jsx|js)$/.test(entry.name)
      ) {
        const finalRoute = currentRoute === "" ? "/" : currentRoute;
        if (!finalRoute.includes("[")) {
          routes.push(finalRoute);
        }
      }
    }
  } catch (err) {
    console.error("Error reading routes for dynamic sitemap:", err);
  }
  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://jayasreeonline.vercel.app"
  ).replace(/\/+$/, "");

  const appDir = path.join(process.cwd(), "src", "app");
  const discoveredRoutes = getStaticRoutes(appDir);
  const routeSet = Array.from(new Set(["/", ...discoveredRoutes]));

  return routeSet.map((route) => ({
    url: route === "/" ? `${baseUrl}/` : `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1.0 : 0.8,
  }));
}
