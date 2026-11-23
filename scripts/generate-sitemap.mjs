import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Load environment variables if available
const envPath = path.join(projectRoot, '.env.local');
const envDefaultPath = path.join(projectRoot, '.env');
const loadEnv = (filePath) => {
  if (fs.existsSync(filePath)) {
    const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const value = trimmed.slice(idx + 1).trim().replace(/^['"](.*)['"]$/, '$1');
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
};
loadEnv(envPath);
loadEnv(envDefaultPath);

const BASE_URL = (
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  'https://jayasreeonline.vercel.app'
).replace(/\/+$/, '');

// Scan app directory to find all static pages
function findAppPages(appDir, currentRoute = '') {
  const pages = [];
  if (!fs.existsSync(appDir)) return pages;

  const entries = fs.readdirSync(appDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(appDir, entry.name);
    if (entry.isDirectory()) {
      if (
        entry.name.startsWith('_') ||
        entry.name.startsWith('.') ||
        entry.name === 'api' ||
        entry.name === 'node_modules'
      ) {
        continue;
      }
      // Route groups like (auth) don't affect URL
      const routeSegment = entry.name.startsWith('(') && entry.name.endsWith(')')
        ? currentRoute
        : `${currentRoute}/${entry.name}`;
      pages.push(...findAppPages(fullPath, routeSegment));
    } else if (
      entry.isFile() &&
      /^page\.(tsx|ts|jsx|js)$/.test(entry.name)
    ) {
      const finalRoute = currentRoute === '' ? '/' : currentRoute;
      // Do not include dynamic bracket routes in static scan
      if (!finalRoute.includes('[')) {
        pages.push(finalRoute);
      }
    }
  }
  return pages;
}

export function generateSitemapXml() {
  const appDir = path.join(projectRoot, 'src', 'app');
  const staticRoutes = findAppPages(appDir);

  const routeSet = Array.from(new Set(['/', ...staticRoutes]));
  const now = new Date().toISOString();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const route of routeSet) {
    const priority = route === '/' ? '1.0' : '0.8';
    const changefreq = route === '/' ? 'daily' : 'weekly';
    const url = route === '/' ? `${BASE_URL}/` : `${BASE_URL}${route}`;

    xml += '  <url>\n';
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  // Write to repo root sitemap.xml
  fs.writeFileSync(path.join(projectRoot, 'sitemap.xml'), xml, 'utf-8');

  // Also ensure robots.txt exists in public directory
  const publicDir = path.join(projectRoot, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`;
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf-8');

  console.log(`✓ [Main Landing Page] Generated sitemap.xml with ${routeSet.length} routes at ${new Date().toLocaleTimeString()}`);
  return xml;
}

// If executed directly from CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateSitemapXml();
}
