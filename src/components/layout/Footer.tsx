import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, ChevronRight, Instagram, Facebook, Linkedin } from 'lucide-react';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

function FooterLink({ href, children, external = false }: FooterLinkProps) {
  const isAnchor = href.startsWith('#') || href.startsWith('http') || external;
  const cls =
    'group flex items-center gap-1.5 text-sm text-ink-muted hover:text-brand-cyan transition-colors duration-200';

  if (isAnchor) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <ChevronRight
          size={13}
          className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 text-brand-cyan flex-shrink-0"
        />
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={cls}>
      <ChevronRight
        size={13}
        className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 text-brand-cyan flex-shrink-0"
      />
      {children}
    </Link>
  );
}

const navLinks = [
  { label: 'Начало', href: '/' },
  { label: 'Продукти', href: '/products' },
  { label: 'Галерия', href: '/gallery' },
  { label: 'ROI Калкулатор', href: '/roi-calculator' },
  { label: 'За нас', href: '/about' },
  { label: 'Контакти', href: '/contacts' },
];

const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://instagram.com/tarpovgroup', Icon: Instagram },
  { name: 'Facebook', href: 'https://facebook.com/tarpovgroup', Icon: Facebook },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/tarpovgroup', Icon: Linkedin },
  { name: 'TikTok', href: 'https://www.tiktok.com/@tarpovgroup', Icon: null },
];

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.58-1.35 3.72-2.02 5.76-1.63.05 1.49-.04 2.99-.04 4.49-.83-.27-1.81-.18-2.53.35-.53.36-.92.93-1.03 1.56-.08.46-.02.93.15 1.36.36.88 1.26 1.58 2.27 1.62.72.05 1.43-.2 1.95-.69.15-.13.25-.31.38-.46.04-.06.07-.13.07-.21.13-1.07.07-2.14.08-3.21.01-6.06 0-12.11 0-18.17z" />
    </svg>
  );
}

function SocialIcon({ name, href, Icon }: { name: string; href: string; Icon: typeof Instagram | null }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="group relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-out hover:-translate-y-1"
    >
      {/* Glow ring – fades & expands on hover */}
      <span
        className="absolute inset-0 rounded-full opacity-0 scale-90 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100"
        style={{
          background: 'radial-gradient(circle, rgba(126,238,255,0.18) 0%, rgba(126,238,255,0) 70%)',
        }}
      />
      {/* Background fill */}
      <span className="absolute inset-0 rounded-full bg-white/[0.03] border border-white/[0.06] transition-all duration-300 ease-out group-hover:bg-brand-cyan-light/10 group-hover:border-brand-cyan-light/30" />
      {/* Icon */}
      <span className="relative z-10 flex items-center justify-center text-white/50 transition-colors duration-300 ease-out group-hover:text-brand-cyan-light">
        {Icon ? <Icon size={17} strokeWidth={2} /> : <TikTokIcon size={16} />}
      </span>
    </a>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const location = useLocation();

  return (
    <footer className="bg-ink-primary text-surface-white">
      {/* ── Main content ── */}
      <div className="container-wide section-padding pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Brand column – spans 2 on large screens */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-2.5 mb-4 group"
              aria-label="Tarpov Group — начало"
            >
              <img
                src="/images/Tarpov_Group_transparent.png"
                alt="Tarpov Group"
                className="h-10 w-auto object-contain transition-opacity duration-200 group-hover:opacity-85"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </Link>

            {/* Company description */}
            <p className="text-sm text-ink-light leading-relaxed mb-6 max-w-xs">
              Вашият доверен партньор за доставка, проектиране и професионален монтаж на LED екрани и други решения за бизнеса.
            </p>

            {/* Contact details */}
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="tel:+359882764660"
                  className="flex items-center gap-2.5 text-sm text-ink-light hover:text-brand-cyan transition-colors duration-200 group"
                >
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/5 group-hover:bg-brand-cyan/10 transition-colors duration-200">
                    <Phone size={14} className="text-brand-cyan" />
                  </span>
                  +359 88 276 4660
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@tarpovgroup.com"
                  className="flex items-center gap-2.5 text-sm text-ink-light hover:text-brand-cyan transition-colors duration-200 group"
                >
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/5 group-hover:bg-brand-cyan/10 transition-colors duration-200">
                    <Mail size={14} className="text-brand-cyan" />
                  </span>
                  info@tarpovgroup.com
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation column */}
          <div>
            <h3 className="font-heading font-semibold text-sm text-white mb-4 tracking-wide">
              Навигация
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Social icons row (above separator, right-aligned) ── */}
      <div className="container-wide section-padding pb-5">
        <div className="flex items-center justify-end gap-1.5">
          {SOCIAL_LINKS.map(({ name, href, Icon }) => (
            <SocialIcon key={name} name={name} href={href} Icon={Icon} />
          ))}
        </div>
      </div>

      {/* ── Glow separator ── */}
      <div className="glow-line opacity-30" />

      {/* ── Bottom bar ── */}
      <div className="container-wide section-padding py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-light">
          {/* Left – copyright + EIC */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center sm:text-left">
            <span>
              © {currentYear} Търпов Груп ЕООД. Всички права запазени.
            </span>
            <span className="text-ink-muted/40 hidden sm:inline">·</span>
            <span className="text-ink-light">ЕИК: 208605715</span>
          </div>

          {/* Right – policy links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            <Link
              to="/privacy"
              className="hover:text-brand-cyan transition-colors duration-200"
            >
              Политика за поверителност
            </Link>
            <span className="text-ink-muted/40">•</span>
            <Link
              to="/cookies"
              className="hover:text-brand-cyan transition-colors duration-200"
            >
              Бисквитки
            </Link>
            <span className="text-ink-muted/40">•</span>
            <Link
              to="/terms"
              className="hover:text-brand-cyan transition-colors duration-200"
            >
              Общи условия
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
