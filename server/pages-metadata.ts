/**
 * Page metadata for SEO optimization
 * Each page has its own title, description, and og:image
 */

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
}

export const pagesMetadata: Record<string, PageMetadata> = {
  "/": {
    title: "House Plus Group — Solar Energy, Home Appliances & 3C Electronics Manufacturer",
    description: "House Plus Group is a China-based manufacturer and supplier of solar panels, inverters, lithium batteries, home appliances, and 3C electronics. Factory direct pricing, OEM/ODM available. Serving Africa and global markets.",
    keywords: "House Plus Group, solar panels, inverters, lithium batteries, home appliances, 3C electronics, China manufacturer, Nigeria, Africa, OEM ODM, solar energy",
    ogImage: "https://www.houseplus.com.ng/og-image.jpg",
    ogType: "website",
  },
  "/about": {
    title: "About House Plus Group — China Manufacturer of Solar & Home Appliances",
    description: "Learn about House Plus Group's 10+ years of manufacturing experience in solar energy, home appliances, and 3C electronics. We bridge Chinese manufacturing excellence with Africa's growing consumer demand.",
    keywords: "House Plus Group, about us, manufacturer, solar energy, home appliances, 3C electronics, China factory, Nigeria",
    ogImage: "https://www.houseplus.com.ng/og-about.jpg",
    ogType: "website",
  },
  "/products": {
    title: "Products — Solar Panels, Inverters, Batteries & Home Appliances | House Plus Group",
    description: "Browse our wide range of products: solar panels, inverters, LiFePO4 batteries, home appliances (air fryers, etc.), and 3C electronics (smart watches, power banks). Factory direct pricing available.",
    keywords: "solar panels, inverters, lithium batteries, home appliances, air fryer, smart watch, power bank, 3C electronics, factory direct",
    ogImage: "https://www.houseplus.com.ng/og-products.jpg",
    ogType: "website",
  },
  "/factory": {
    title: "Factory — House Plus Group Manufacturing Facility",
    description: "Tour our state-of-the-art manufacturing facility in China. We produce solar energy products, home appliances, and 3C electronics with strict quality control standards.",
    keywords: "factory, manufacturing, production, quality control, House Plus Group",
    ogImage: "https://www.houseplus.com.ng/og-factory.jpg",
    ogType: "website",
  },
  "/team": {
    title: "Team — House Plus Group Leadership & Experts",
    description: "Meet our experienced team of professionals dedicated to delivering quality products and excellent customer service. With 10+ years of industry experience.",
    keywords: "team, leadership, experts, House Plus Group",
    ogImage: "https://www.houseplus.com.ng/og-team.jpg",
    ogType: "website",
  },
  "/services": {
    title: "Services — OEM/ODM, Wholesale & Custom Solutions | House Plus Group",
    description: "We offer comprehensive services including OEM/ODM manufacturing, wholesale distribution, custom solutions, and after-sales support for businesses worldwide.",
    keywords: "OEM, ODM, wholesale, custom manufacturing, services, House Plus Group",
    ogImage: "https://www.houseplus.com.ng/og-services.jpg",
    ogType: "website",
  },
  "/faq": {
    title: "FAQ — Frequently Asked Questions | House Plus Group",
    description: "Find answers to common questions about our products, services, shipping, payment methods, and more.",
    keywords: "FAQ, frequently asked questions, help, support, House Plus Group",
    ogImage: "https://www.houseplus.com.ng/og-faq.jpg",
    ogType: "website",
  },
  "/news": {
    title: "News & Updates — House Plus Group Blog",
    description: "Stay updated with the latest news, industry insights, and product updates from House Plus Group.",
    keywords: "news, blog, updates, industry insights, House Plus Group",
    ogImage: "https://www.houseplus.com.ng/og-news.jpg",
    ogType: "website",
  },
  "/careers": {
    title: "Careers — Join House Plus Group Team",
    description: "Explore career opportunities at House Plus Group. We're looking for talented professionals to join our growing team.",
    keywords: "careers, jobs, employment, House Plus Group",
    ogImage: "https://www.houseplus.com.ng/og-careers.jpg",
    ogType: "website",
  },
  "/contact": {
    title: "Contact Us — House Plus Group",
    description: "Get in touch with House Plus Group. We're here to help with your inquiries about products, services, and business partnerships.",
    keywords: "contact, contact us, support, House Plus Group",
    ogImage: "https://www.houseplus.com.ng/og-contact.jpg",
    ogType: "website",
  },
};

export function getPageMetadata(pathname: string): PageMetadata {
  // Try exact match first
  if (pagesMetadata[pathname]) {
    return pagesMetadata[pathname];
  }

  // Try to match product detail pages (/products/:id)
  if (pathname.startsWith("/products/")) {
    return {
      title: "Product Details — House Plus Group",
      description: "View detailed information about this product from House Plus Group. Factory direct pricing available.",
      keywords: "product, details, House Plus Group",
      ogImage: "https://www.houseplus.com.ng/og-product.jpg",
      ogType: "product",
    };
  }

  // Default fallback
  return pagesMetadata["/"];
}

export function generateMetaTags(metadata: PageMetadata, url: string): string {
  return `
    <title>${escapeHtml(metadata.title)}</title>
    <meta name="title" content="${escapeHtml(metadata.title)}" />
    <meta name="description" content="${escapeHtml(metadata.description)}" />
    ${metadata.keywords ? `<meta name="keywords" content="${escapeHtml(metadata.keywords)}" />` : ""}
    <link rel="canonical" href="https://www.houseplus.com.ng${url}" />
    <meta property="og:type" content="${metadata.ogType || "website"}" />
    <meta property="og:url" content="https://www.houseplus.com.ng${url}" />
    <meta property="og:title" content="${escapeHtml(metadata.title)}" />
    <meta property="og:description" content="${escapeHtml(metadata.description)}" />
    ${metadata.ogImage ? `<meta property="og:image" content="${metadata.ogImage}" />` : ""}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://www.houseplus.com.ng${url}" />
    <meta name="twitter:title" content="${escapeHtml(metadata.title)}" />
    <meta name="twitter:description" content="${escapeHtml(metadata.description)}" />
    ${metadata.ogImage ? `<meta name="twitter:image" content="${metadata.ogImage}" />` : ""}
  `.trim();
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
