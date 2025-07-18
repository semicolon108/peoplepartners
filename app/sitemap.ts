// app/sitemap.ts
import { MetadataRoute } from "next";

// Base URL for the website
const URL = "https://www.peoplepartners.la";

// Sitemap generation function
export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes with priority and change frequency
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1.0, changefreq: "daily" }, // Homepage
    { path: "/about", priority: 0.8, changefreq: "weekly" },
    { path: "/contact", priority: 0.8, changefreq: "weekly" },
    { path: "/careers", priority: 0.7, changefreq: "weekly" },
    { path: "/services/payroll", priority: 0.9, changefreq: "weekly" },
    { path: "/services/peo", priority: 0.9, changefreq: "weekly" },
    { path: "/services/bpo", priority: 0.9, changefreq: "weekly" },
    { path: "/services/recruitment", priority: 0.9, changefreq: "weekly" },
    { path: "/services/career-transitioning", priority: 0.9, changefreq: "weekly" },
    { path: "/services/salary-survey", priority: 0.9, changefreq: "weekly" },
    { path: "/services/hr-consulting", priority: 0.9, changefreq: "weekly" },
    { path: "/services/visa", priority: 0.9, changefreq: "weekly" },
  ].map((route) => ({
    url: `${URL}${route.path}`,
    lastModified: new Date().toISOString(),
    priority: route.priority,
    changefreq: route.changefreq,
    // Add alternate language URLs for multilingual support (English and Lao)
    ...(route.path === "" || route.path.startsWith("/services")
      ? {
          alternate: [
            { href: `${URL}${route.path}`, hreflang: "x-default" }, // Default (English)
            { href: `${URL}/la${route.path}`, hreflang: "lo" }, // Lao version
          ],
        }
      : {}),
  }));

  return staticRoutes;
}
