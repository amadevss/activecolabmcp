import type { MetadataRoute } from "next";
import { publicUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/oauth/", "/estado"] },
    sitemap: `${publicUrl}/sitemap.xml`,
    host: publicUrl,
  };
}
