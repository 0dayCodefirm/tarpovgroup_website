import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, ArrowRight, Expand } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { usePageSeo, breadcrumbSchema, BREADCRUMB_HOME } from '../components/shared/Seo';

const LOGO_SRC = '/images/Tarpov_Group_transparent.png';

interface MediaItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  span?: 'normal';
}

// Client photos + LED transparent photo + 3 videos
const MEDIA: MediaItem[] = [
  { id: 1, type: 'video', src: '/video_transparentLED.mp4' },
  { id: 17, type: 'video', src: '/video_transparent0 (1).mp4' },
  { id: 13, type: 'video', src: '/gallery/factory_video.mp4' },
  { id: 8, type: 'video', src: '/video_transparent2.mp4' },
  { id: 4, type: 'video', src: '/video_transparentLED1.mp4' },
  { id: 14, type: 'video', src: '/gallery/crystalFilm_video copy.mp4' },
  { id: 14, type: 'video', src: '/gallery/video_transparent3.mp4' },
  { id: 15, type: 'video', src: '/gallery/constructionPanel copy.mp4' },
  { id: 16, type: 'video', src: '/gallery/constructionPanel0 copy.mp4' },
  { id: 2, type: 'image', src: '/images/image1.jpeg' },
  { id: 3, type: 'image', src: '/images/image2.jpeg' },
  { id: 5, type: 'image', src: '/images/image3.jpeg' },
  { id: 6, type: 'image', src: '/images/led_transparent1.png' },
  { id: 7, type: 'image', src: '/images/image4.jpeg' },
  { id: 9, type: 'image', src: '/images/image5.jpeg' },
  { id: 10, type: 'image', src: '/images/factory.jpg' },
  { id: 11, type: 'image', src: '/images/factory0.jpg' },
  { id: 12, type: 'image', src: '/images/factory1.jpg' },
];

const STATS = [
  { value: '50+', label: 'Реализирани проекта' },
  { value: '24/7', label: 'На разположение' },
  { value: '3 г.', label: 'Гаранция' },
];

function Watermark({ showCornerLogo = false, large = false }: { showCornerLogo?: boolean; large?: boolean }) {
  return (
    <>
      {/* Centre watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <img
          src={LOGO_SRC}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="w-[55%] select-none"
          style={{
            filter: 'brightness(0) invert(1)',
            opacity: 0.2,
            maxWidth: large ? 520 : 340,
            minWidth: large ? 140 : 80,
          }}
        />
      </div>
      {/* Small normal logo — bottom right */}
      {showCornerLogo && (
        <div className="absolute bottom-2.5 right-3 pointer-events-none z-10">
          <img
            src={LOGO_SRC}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="select-none"
            style={{ height: large ? 44 : 28, width: 'auto', opacity: 0.7 }}
          />
        </div>
      )}
    </>
  );
}

export default function Gallery() {
  usePageSeo({
    title: 'Галерия — реализирани проекти с прозрачни LED екрани | Търпов Груп',
    description: 'Вижте реализирани проекти с прозрачни LED дисплеи: витрини, фасади, шоуруми, изложбени щандове. Реални инсталации в България и по света.',
    path: '/gallery',
    keywords: 'прозрачен LED дисплей галерия, LED витрини проекти, LED фасади инсталации, transparent LED projects Bulgaria, LED screen installations',
    jsonLd: breadcrumbSchema([BREADCRUMB_HOME, { name: 'Галерия', path: '/gallery' }]),
  });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const prev = useCallback(() => {
    setSelectedIndex((i) => (i === null ? null : (i - 1 + MEDIA.length) % MEDIA.length));
  }, []);

  const next = useCallback(() => {
    setSelectedIndex((i) => (i === null ? null : (i + 1) % MEDIA.length));
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedIndex, prev, next]);

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedIndex]);

  const selectedItem = selectedIndex !== null ? MEDIA[selectedIndex] : null;

  return (
    <div className="min-h-screen" style={{ background: '#080F1C' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(0,153,204,0.07)' }}
          animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(0,212,255,0.05)' }}
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <div className="container-wide section-padding relative z-10 text-center">
          <motion.h1
            className="font-heading font-extrabold mb-5"
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
              color: '#FFFFFF',
              letterSpacing: '-0.018em',
              lineHeight: 1.08,
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Галерия на{' '}
            <span
              style={{
                background: 'linear-gradient(110deg, #0099CC 0%, #00D4FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Търпов Груп
            </span>
          </motion.h1>

          <motion.p
            className="text-base leading-relaxed max-w-xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.5)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Избрани инсталации на прозрачни LED дисплеи от търговски витрини
            до офиси и големи фасади.
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap justify-center gap-10 mt-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {STATS.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <p
                  className="font-heading font-extrabold text-2xl sm:text-3xl"
                  style={{ color: '#00D4FF' }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-xs mt-1 font-heading font-medium tracking-wider uppercase"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* thin separator line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.25), transparent)' }}
        />
      </section>

      {/* ── Gallery grid ── */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ background: '#080F1C' }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {MEDIA.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: (i % 3) * 0.07 }}
                onClick={() => setSelectedIndex(i)}
                className="group relative cursor-pointer overflow-hidden"
                style={{
                  borderRadius: 12,
                  background: '#111827',
                }}
              >
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: '3/2' }}
                >
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      muted
                      loop
                      autoPlay
                      playsInline
                      preload="metadata"
                      controlsList="nodownload"
                      disablePictureInPicture
                      className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-[1.04]"
                      style={{ pointerEvents: 'none' }}
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt=""
                      loading="lazy"
                      draggable={false}
                      className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-[1.04]"
                      style={{ pointerEvents: 'none' }}
                    />
                  )}

                  {/* Watermark */}
                  <Watermark showCornerLogo />

                  {/* Hover overlay — dark tint + expand icon only */}
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'rgba(5,10,20,0.45)',
                      pointerEvents: 'none',
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.25)',
                        backdropFilter: 'blur(6px)',
                      }}
                    >
                      <Expand size={17} className="text-white" />
                    </div>
                  </div>

                  {/* Subtle cyan border on hover */}
                  <div
                    className="absolute inset-0 rounded-[12px] transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{ boxShadow: 'inset 0 0 0 1px rgba(0,212,255,0.35)' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #0A1628 0%, #0D1F3C 50%, #0A2240 100%)' }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.25), transparent)' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(0,153,204,0.07)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="container-wide section-padding relative z-10 text-center">
          <motion.h2
            className="font-heading font-extrabold mb-4 mx-auto max-w-2xl"
            style={{
              fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)',
              color: '#FFFFFF',
              letterSpacing: '-0.015em',
              lineHeight: 1.15,
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            Готови ли сте да{' '}
            <span
              style={{
                background: 'linear-gradient(110deg, #0099CC 0%, #00D4FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              създадете
            </span>{' '}
            следващия проект?
          </motion.h2>
          <motion.p
            className="text-sm mb-8 max-w-md mx-auto"
            style={{ color: 'rgba(255,255,255,0.5)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Свържете се с нас за безплатна консултация и персонална оферта.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/contacts"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-heading font-bold transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
              style={{
                background: '#FFFFFF',
                boxShadow: '0 4px 24px rgba(124,58,237,0.25)',
              }}
            >
              <span
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Заяви безплатна оферта
              </span>
              <ArrowRight
                size={16}
                strokeWidth={2.5}
                className="transition-transform duration-200 group-hover:translate-x-1"
                style={{ color: '#7C3AED' }}
              />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: 'rgba(2,5,12,0.97)', backdropFilter: 'blur(10px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 hover:bg-white/10 z-20"
              aria-label="Затвори"
            >
              <X size={20} />
            </button>

            {/* Counter */}
            <div
              className="absolute top-5 left-1/2 -translate-x-1/2 font-heading font-semibold text-xs tracking-widest uppercase z-20"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {String((selectedIndex ?? 0) + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(MEDIA.length).padStart(2, '0')}
            </div>

            {/* Prev */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all duration-200 hover:bg-white/10 z-20"
              aria-label="Предишен"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all duration-200 hover:bg-white/10 z-20"
              aria-label="Следващ"
            >
              <ChevronRight size={24} />
            </button>

            {/* Media */}
            <motion.div
              key={selectedItem.id}
              className="relative px-4 sm:px-16 lg:px-20 w-full max-w-[95vw] sm:max-w-6xl"
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative overflow-hidden"
                style={{ borderRadius: 14 }}
              >
                {selectedItem.type === 'video' ? (
                  <video
                    src={selectedItem.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controlsList="nodownload nofullscreen"
                    disablePictureInPicture
                    className="w-full max-h-[70vh] sm:max-h-[82vh] object-contain bg-black"
                  />
                ) : (
                  <img
                    src={selectedItem.src}
                    alt=""
                    draggable={false}
                    className="w-full max-h-[70vh] sm:max-h-[82vh] object-contain bg-black"
                    style={{ display: 'block' }}
                  />
                )}
                <Watermark showCornerLogo large />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
