import { useEffect } from 'react';

export interface SeoPageData {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  ogImage?: string;
  jsonLd?: object | object[];
  noindex?: boolean;
}

const SITE_URL = 'https://tarpovgroup.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/led_transparent1.png`;

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id: string, data: object | object[]) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

function removeJsonLd(id: string) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function removeMeta(attr: 'name' | 'property', key: string) {
  const el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (el) el.remove();
}

export function setPageSeo(data: SeoPageData) {
  const {
    title,
    description,
    path,
    keywords,
    ogImage = DEFAULT_OG_IMAGE,
    jsonLd,
    noindex = false,
  } = data;

  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes('Търпов Груп') ? title : `${title} | Търпов Груп`;

  document.title = fullTitle;
  upsertMeta('name', 'description', description);
  if (keywords) upsertMeta('name', 'keywords', keywords);
  else removeMeta('name', 'keywords');

  // Robots
  upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

  // Canonical
  upsertLink('canonical', url);

  // Open Graph
  upsertMeta('property', 'og:title', fullTitle);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:url', url);
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:site_name', 'Търпов Груп');
  upsertMeta('property', 'og:locale', 'bg_BG');
  upsertMeta('property', 'og:image', ogImage);
  upsertMeta('property', 'og:image:alt', 'Прозрачни LED дисплеи от Търпов Груп');

  // Twitter
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', fullTitle);
  upsertMeta('name', 'twitter:description', description);
  upsertMeta('name', 'twitter:image', ogImage);

  // Structured data
  removeJsonLd('seo-page-jsonld');
  if (jsonLd) upsertJsonLd('seo-page-jsonld', jsonLd);
}

export function usePageSeo(data: SeoPageData) {
  useEffect(() => {
    setPageSeo(data);
  }, [data.title, data.description, data.path]);
}

// ─── Schema.org helpers ───────────────────────────────────────────────────

export const BREADCRUMB_HOME = { name: 'Начало', path: '/' };

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function productSchema(product: {
  name: string;
  description: string;
  image: string;
  brand?: string;
  category?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: { '@type': 'Brand', name: product.brand ?? 'Търпов Груп' },
    category: product.category ?? 'Прозрачни LED дисплеи',
  };
}

export const SITE_URL_EXPORT = SITE_URL;
