import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Начало', href: '/', isHash: false },
  { label: 'Продукти', href: '/products', isHash: false },
  { label: 'Галерия', href: '/gallery', isHash: false },
  { label: 'ROI Калкулатор', href: '/roi-calculator', isHash: false },
  { label: 'За нас', href: '/about', isHash: false },
  { label: 'Контакти', href: '/contacts', isHash: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-surface-border transition-shadow duration-300 ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="container-wide section-padding">
          <nav className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center group"
              aria-label="Tarpov Group — начало"
            >
              <img
                src="/images/Tarpov_Group_transparent.png"
                alt="Tarpov Group"
                className="h-10 w-auto object-contain transition-opacity duration-200 group-hover:opacity-85"
              />
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-7">
              {navLinks.map(({ label, href, isHash }) => (
                <li key={href}>
                  {isHash ? (
                    <a href={href} className="nav-link pb-0.5">{label}</a>
                  ) : (
                    <Link to={href} className={`nav-link pb-0.5 ${isActive(href) ? 'nav-link-active' : ''}`}>{label}</Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Link to="/contacts" className="btn-primary">
                Заяви оферта
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Затвори меню' : 'Отвори меню'}
              aria-expanded={mobileOpen}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-ink-secondary hover:text-ink-primary hover:bg-surface-soft transition-colors duration-200"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-surface-border lg:hidden"
        >
          <div className="container-wide section-padding py-5">
            <ul className="flex flex-col gap-1 mb-5">
              {navLinks.map(({ label, href, isHash }) => (
                <li key={href}>
                  {isHash ? (
                    <a
                      href={href}
                      onClick={handleNavClick}
                      className="flex items-center gap-2 py-3 px-2 rounded-lg font-heading font-medium text-ink-secondary hover:text-ink-primary hover:bg-surface-soft transition-colors duration-200"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      to={href}
                      onClick={handleNavClick}
                      className={`flex items-center gap-2 py-3 px-2 rounded-lg font-heading font-medium transition-colors duration-200 ${isActive(href) ? 'text-brand-cyan-dark bg-brand-cyan/5' : 'text-ink-secondary hover:text-ink-primary hover:bg-surface-soft'}`}
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <Link
              to="/contacts"
              onClick={handleNavClick}
              className="btn-primary w-full"
            >
              Заяви оферта
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
