export const siteConfig = {
  name: "Talal Majeed",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.talalmajeed.com",
  description:
    "Portfolio website of Talal Majeed, a Senior Software Engineer specializing in full-stack web development, React, and Node.js.",
};

export function getCanonicalUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

