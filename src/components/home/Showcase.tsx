import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

type MediaItem = {
  type: 'video' | 'image';
  src: string;
  label: string;
  tag: string;
};

const MEDIA: MediaItem[] = [
  { type: 'video', src: '/video_transparent2.mp4', label: 'Масивен монтаж' },
  { type: 'video', src: '/gallery/crystalFilm_video.mp4', label: 'Кристален филм' },
  { type: 'image', src: '/images/transparent1.jpg', label: 'Отблизо' },
  { type: 'video', src: '/gallery/video_transparent3.mp4', label: 'На офис' },
  { type: 'image', src: '/images/transparent_shop.png', label: 'На магазин' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

function useInViewPlay<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, videoRef };
}

function Tile({ item, className = '' }: { item: MediaItem; className?: string }) {
  const { ref, videoRef } = useInViewPlay<HTMLDivElement>();
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden group ${className}`}
      style={{
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(15, 42, 90, 0.06), 0 0 0 1px rgba(15, 42, 90, 0.04)',
        transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s cubic-bezier(0.22,1,0.36,1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.03)';
        e.currentTarget.style.boxShadow =
          '0 16px 40px rgba(15, 42, 90, 0.14), 0 0 0 1px rgba(0, 153, 204, 0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow =
          '0 4px 20px rgba(15, 42, 90, 0.06), 0 0 0 1px rgba(15, 42, 90, 0.04)';
      }}
    >
      {!loaded && (
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(110deg, #EEF4FA 25%, #E2EBF4 50%, #EEF4FA 75%)' }}
        />
      )}

      {item.type === 'video' ? (
        <video
          ref={videoRef}
          src={item.src}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          onLoadedData={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <img
          src={item.src}
          alt={item.label}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Unified dark gradient overlay — bottom 40% */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(8, 20, 45, 0.78) 0%, rgba(8, 20, 45, 0.4) 40%, transparent 60%)',
        }}
      />

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 pointer-events-none">
        <span
          className="block text-[10px] font-heading font-semibold uppercase tracking-[0.2em] text-white/65 mb-1"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {item.tag}
        </span>
        <p className="text-white text-sm sm:text-base font-heading font-semibold leading-tight">
          {item.label}
        </p>
      </div>
    </div>
  );
}

export default function Showcase() {
  const [hero, ...small] = MEDIA;

  return (
    <section
      id="showcase"
      className="section-padding py-14 lg:py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F9FBFD 0%, #EEF3F8 50%, #F9FBFD 100%)' }}
      aria-label="Вижте магията на прозрачните екрани"
    >
      {/* Subtle dot pattern + radial depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(15, 42, 90, 0.05) 1px, transparent 0)',
          backgroundSize: '28px 28px',
          opacity: 0.5,
        }}
      />
      <div
        className="absolute -top-24 left-1/3 w-[32rem] h-[32rem] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0, 153, 204, 0.06) 0%, transparent 65%)' }}
      />

      <div className="container-wide relative">
        {/* Header — refined, compact */}
        <motion.div
          className="text-center mb-10 max-w-2xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-heading font-semibold uppercase tracking-[0.22em] mb-3"
            style={{ color: '#0099CC' }}
          >
            Как ще изглежда
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-heading font-semibold text-ink-primary text-balance"
            style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)', lineHeight: 1.15 }}
          >
            Вижте екраните <span className="text-gradient-cyan">в действие</span>:
          </motion.h2>
        </motion.div>

        {/* Desktop / Tablet — bento: hero 2x2 + 4 equal */}
        <motion.div
          className="hidden sm:grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(2, 200px)',
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        >
          <motion.div variants={fadeUp} style={{ gridColumn: '1 / 3', gridRow: '1 / 3' }}>
            <Tile item={hero} className="w-full h-full" />
          </motion.div>
          {small.map((item, i) => (
            <motion.div key={i} variants={fadeUp}>
              <Tile item={item} className="w-full h-full" />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile — stacked */}
        <motion.div
          className="sm:hidden flex flex-col gap-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div variants={fadeUp}>
            <Tile item={hero} className="w-full aspect-[16/10]" />
          </motion.div>
          {small.map((item, i) => (
            <motion.div key={i} variants={fadeUp}>
              <Tile item={item} className="w-full aspect-[16/10]" />
            </motion.div>
          ))}
        </motion.div>

        {/* Buttons — pill, compact, no icons */}
        <motion.div
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.45 }}
        >
          <Link
            to="/gallery"
            className="inline-flex items-center justify-center px-7 h-12 rounded-full text-sm font-heading font-semibold text-white transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #1A3D7A 0%, #1565C0 100%)',
              boxShadow: '0 4px 18px rgba(21, 101, 192, 0.28)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 28px rgba(202, 138, 36, 0.45)';
              e.currentTarget.style.background = 'linear-gradient(135deg, #152E5E 0%, #1254A8 100%)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 18px rgba(21, 101, 192, 0.28)';
              e.currentTarget.style.background = 'linear-gradient(135deg, #1A3D7A 0%, #1565C0 100%)';
            }}
          >
            Към галерията
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-7 h-12 rounded-full text-sm font-heading font-semibold transition-all duration-300"
            style={{
              background: '#FFFFFF',
              color: '#1565C0',
              border: '1.5px solid rgba(21, 101, 192, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(202, 138, 36, 0.5)';
              e.currentTarget.style.color = '#B8860B';
              e.currentTarget.style.boxShadow = '0 4px 18px rgba(202, 138, 36, 0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(21, 101, 192, 0.2)';
              e.currentTarget.style.color = '#1565C0';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Вижте всички продукти
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
