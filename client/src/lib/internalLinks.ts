/**
 * 内部链接策略
 * 用于建立页面之间的相关链接，提升 SEO 权重
 */

export interface InternalLink {
  text: string;
  href: string;
  title: string;
  context: string; // 链接出现的上下文/页面
}

/**
 * 相关页面链接映射
 * 用于在各个页面中添加相关的内部链接
 */
export const relatedLinks: Record<string, InternalLink[]> = {
  home: [
    {
      text: "Explore Our Products",
      href: "/products",
      title: "Browse our complete product catalog",
      context: "home",
    },
    {
      text: "Learn About Us",
      href: "/about",
      title: "Discover House Plus Group's story and values",
      context: "home",
    },
    {
      text: "Visit Our Factory",
      href: "/factory",
      title: "See our manufacturing facilities",
      context: "home",
    },
  ],
  products: [
    {
      text: "Solar Energy Solutions",
      href: "/products?cat=solar",
      title: "View solar panels and energy systems",
      context: "products",
    },
    {
      text: "Home Appliances",
      href: "/products?cat=appliances",
      title: "Browse home appliances",
      context: "products",
    },
    {
      text: "3C Electronics",
      href: "/products?cat=3c",
      title: "Explore 3C electronics",
      context: "products",
    },
    {
      text: "Get a Quote",
      href: "/contact",
      title: "Request a quote for bulk orders",
      context: "products",
    },
  ],
  about: [
    {
      text: "Our Factory",
      href: "/factory",
      title: "Learn about our manufacturing capabilities",
      context: "about",
    },
    {
      text: "Meet Our Team",
      href: "/team",
      title: "Get to know our experienced team",
      context: "about",
    },
    {
      text: "Our Services",
      href: "/services",
      title: "Discover OEM/ODM and customization services",
      context: "about",
    },
  ],
  factory: [
    {
      text: "Our Services",
      href: "/services",
      title: "Learn about OEM/ODM manufacturing",
      context: "factory",
    },
    {
      text: "Product Quality",
      href: "/products",
      title: "See the quality products we produce",
      context: "factory",
    },
    {
      text: "About House Plus",
      href: "/about",
      title: "Learn more about our company",
      context: "factory",
    },
  ],
  services: [
    {
      text: "Our Products",
      href: "/products",
      title: "Browse products available for OEM/ODM",
      context: "services",
    },
    {
      text: "Factory Capabilities",
      href: "/factory",
      title: "Learn about our manufacturing capabilities",
      context: "services",
    },
    {
      text: "Contact Us",
      href: "/contact",
      title: "Discuss your customization needs",
      context: "services",
    },
  ],
  faq: [
    {
      text: "Contact Support",
      href: "/contact",
      title: "Get in touch with our support team",
      context: "faq",
    },
    {
      text: "Our Services",
      href: "/services",
      title: "Learn about OEM/ODM services",
      context: "faq",
    },
    {
      text: "Browse Products",
      href: "/products",
      title: "View our product catalog",
      context: "faq",
    },
  ],
  news: [
    {
      text: "About House Plus",
      href: "/about",
      title: "Learn more about our company",
      context: "news",
    },
    {
      text: "Our Products",
      href: "/products",
      title: "Browse our latest products",
      context: "news",
    },
    {
      text: "Company Blog",
      href: "/news",
      title: "Read more company news and updates",
      context: "news",
    },
  ],
  careers: [
    {
      text: "About House Plus",
      href: "/about",
      title: "Learn about our company culture",
      context: "careers",
    },
    {
      text: "Our Team",
      href: "/team",
      title: "Meet our current team members",
      context: "careers",
    },
    {
      text: "Contact Us",
      href: "/contact",
      title: "Get in touch with HR",
      context: "careers",
    },
  ],
  contact: [
    {
      text: "About Us",
      href: "/about",
      title: "Learn more about House Plus Group",
      context: "contact",
    },
    {
      text: "Our Services",
      href: "/services",
      title: "Explore our services and capabilities",
      context: "contact",
    },
    {
      text: "FAQ",
      href: "/faq",
      title: "Find answers to common questions",
      context: "contact",
    },
  ],
};

/**
 * 获取相关链接
 */
export function getRelatedLinks(page: string): InternalLink[] {
  return relatedLinks[page] || [];
}

/**
 * 内部链接最佳实践
 * 
 * 1. 锚文本优化
 *    - 使用描述性的锚文本，包含关键词
 *    - 避免使用"点击这里"或"更多"
 *    - 示例：✓ "Solar Panel Systems" vs ✗ "Click here"
 * 
 * 2. 链接位置
 *    - 在内容正文中添加相关链接
 *    - 在页面底部添加相关页面链接
 *    - 在导航菜单中添加主要页面链接
 * 
 * 3. 链接数量
 *    - 每个页面 3-5 个内部链接为最佳
 *    - 避免过多链接导致页面混乱
 * 
 * 4. 链接相关性
 *    - 只链接到真正相关的页面
 *    - 确保链接文本与目标页面内容相关
 * 
 * 5. 链接深度
 *    - 确保所有重要页面距离首页不超过 3 次点击
 *    - 使用面包屑导航帮助用户理解页面层级
 */

/**
 * 页面权重分配
 * 用于确定哪些页面应该获得更多的内部链接
 */
export const pageWeights: Record<string, number> = {
  home: 100, // 首页权重最高
  products: 90, // 产品页面权重高
  about: 70,
  services: 80,
  factory: 60,
  team: 50,
  faq: 60,
  news: 40,
  careers: 30,
  contact: 70,
  admin: 0, // 不参与 SEO
};

/**
 * 获取页面的内部链接建议
 */
export function getLinkingStrategy(page: string) {
  const weight = pageWeights[page] || 0;
  const links = relatedLinks[page] || [];

  return {
    page,
    weight,
    recommendedLinks: links,
    strategy: `
      页面 "${page}" 的内部链接策略：
      
      权重等级: ${weight > 80 ? "高" : weight > 50 ? "中" : "低"}
      推荐链接数: ${links.length}
      
      最佳实践：
      1. 在内容中自然地添加 ${Math.min(links.length, 3)} 个相关链接
      2. 使用描述性的锚文本
      3. 确保链接指向相关内容
      4. 定期检查链接是否有效
    `,
  };
}
