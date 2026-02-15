import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = "https://wedlypro.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/contract-sign/", "/d/", "/enquiry/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
