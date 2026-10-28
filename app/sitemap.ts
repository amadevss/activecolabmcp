import type { MetadataRoute } from "next";
import { publicUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${publicUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${publicUrl}/privacidad`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${publicUrl}/terminos`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
