// app/sitemap.ts
import { MetadataRoute } from "next";

// Replace with your actual domain
const URL = "https://www.peoplepartnerslao.la";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/contact",
    "/careers",
    "/services/payroll",
    "/services/peo",
    "/services/bpo",
    "/services/recruitment",
    "/services/career-transitioning",
    "/services/hr-consulting",
    "/services/visa",
  ].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return routes;
}
