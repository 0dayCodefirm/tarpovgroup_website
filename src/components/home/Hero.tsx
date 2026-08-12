import type { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

// ─── Floating badge ───────────────────────────────────────────────────────────
function FloatingBadge({
  children,
  delay = 0,
  yAmp = 8,
}: {
  children: ReactNode;
  delay?: number;
  yAmp?: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -yAmp, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: '#FFFFFF',
        border: '1px solid rgba(0,153,204,0.18)',
        borderRadius: 100,
        padding: '8px 16px',
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Particle (adapted for light bg) ─────────────────────────────────────────
function Particle({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: 4,
        height: 4,
        borderRadius: '50%',
        background: 'rgba(0, 153, 204, 0.35)',
        boxShadow: '0 0 8px rgba(0,153,204,0.4)',
        pointerEvents: 'none',
      }}
      animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.4, 0.5], y: [0, -50, -100] }}
      transition={{ duration: 7, repeat: Infinity, delay, ease: 'easeOut' }}
    />
  );
}

// ─── Video card ───────────────────────────────────────────────────────────────
function VideoCard({
  src,
  badge,
  badgeColor,
  badgePos,
  delay,
}: {
  src: string;
  badge: string;
  badgeColor: string;
  badgePos: 'tl' | 'br';
  delay: number;
}) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Ambient glow behind the video */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: -24,
          background: 'radial-gradient(ellipse, rgba(0,180,240,0.16) 0%, transparent 70%)',
          filter: 'blur(22px)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Badge */}
      <motion.div
        className={`absolute z-10 ${badgePos === 'tl' ? '-top-3 -left-2' : '-bottom-3 -right-2'}`}
        initial={{ opacity: 0, y: badgePos === 'tl' ? -10 : 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
      >
        <FloatingBadge delay={0.3} yAmp={6}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: badgeColor,
              boxShadow: `0 0 8px ${badgeColor}B3`,
              flexShrink: 0,
            }}
          />
          <span style={BADGE_TEXT}>{badge}</span>
        </FloatingBadge>
      </motion.div>

      {/* Video */}
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disableRemotePlayback
        className="relative w-full rounded-[1.5rem]"
        style={{
          border: '1px solid rgba(0,200,255,0.22)',
          boxShadow:
            '0 0 0 1px rgba(0,200,255,0.1), 0 0 45px rgba(0,212,255,0.13), 0 20px 50px rgba(0,100,200,0.18), 0 6px 16px rgba(0,0,0,0.1)',
        }}
      />
    </div>
  );
}

// ─── Headline data ────────────────────────────────────────────────────────────
const HEADLINE_WORDS = [
  { text: 'Не', highlight: false },
  { text: 'просто', highlight: false },
  { text: 'екран,', highlight: false },
  { text: 'а', highlight: false },
  { text: 'предимство', highlight: true, italic: true },
  { text: 'пред', highlight: false },
  { text: 'конкуренцията.', highlight: true },
];

const wordVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
      ease: [0.25, 0.4, 0.25, 1] as number[],
      delay: 0.4 + i * 0.14,
    },
  }),
};

const BADGE_TEXT: React.CSSProperties = {
  fontSize: '0.72rem',
  fontWeight: 700,
  color: '#111418',
  letterSpacing: '0.02em',
};

const PARTICLES = [
  { x: 7, y: 28, delay: 0 },
  { x: 12, y: 68, delay: 1.8 },
  { x: 87, y: 22, delay: 0.9 },
  { x: 92, y: 72, delay: 2.5 },
  { x: 52, y: 88, delay: 3.2 },
  { x: 74, y: 42, delay: 1.3 },
  { x: 35, y: 15, delay: 2.0 },
];

const SPECS = [
  { val: '95%', label: 'Прозрачност' },
  { val: '5 000', label: 'nit яркост' },
  { val: '3 год.', label: 'Гаранция' },
];

// ─── Main Hero ────────────────────────────────────────────────────────────────
export default function Hero() {
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 600], [0, -70]);
  const panelY = useTransform(scrollY, [0, 600], [0, -35]);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        background:
          'linear-gradient(150deg, #FFFFFF 0%, #F0F8FF 25%, #E6F4FB 55%, #F4FAFF 80%, #FAFCFF 100%)',
      }}
      aria-label="Главна секция"
    >
      {/* Background: subtle dot grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(0,153,204,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Background: ambient colour blobs */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <motion.div
          style={{
            position: 'absolute',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse, rgba(0,153,204,0.1) 0%, transparent 70%)',
            top: '-20%',
            right: '-5%',
          }}
          animate={{ scale: [1, 1.06, 1], x: [0, 20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, transparent 70%)',
            bottom: '-10%',
            left: '10%',
          }}
          animate={{ scale: [1, 1.1, 1], y: [0, -20, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          style={{
            position: 'absolute',
            width: 350,
            height: 350,
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse, rgba(0,153,204,0.07) 0%, transparent 70%)',
            top: '40%',
            left: '-5%',
          }}
          animate={{ scale: [1, 1.12, 1], y: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* Content */}
      <div className="container-wide section-padding relative z-10 pt-28 pb-10 lg:pt-36 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left: Text */}
          <motion.div style={{ y: textY }} className="flex flex-col gap-6 order-1 items-center lg:items-start text-center lg:text-left">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
              className="flex items-center gap-3"
            >
              <div
                style={{
                  width: 32,
                  height: 2,
                  borderRadius: 2,
                  background: 'linear-gradient(90deg, #0099CC, #00D4FF)',
                }}
              />
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#0099CC',
                }}
              >
                технологията на бъдещето
              </span>
            </motion.div>

            {/* Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
                lineHeight: 1.25,
                fontWeight: 800,
                letterSpacing: '-0.015em',
                color: '#0D1B2A',
              }}
            >
              {HEADLINE_WORDS.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="show"
                  variants={wordVariants}
                  style={{
                    display: 'inline-block',
                    marginRight: '0.28em',
                    ...(word.italic
                      ? { fontStyle: 'italic', fontWeight: 400 }
                      : {}),
                    ...(word.highlight
                      ? {
                          background:
                            'linear-gradient(110deg, #0099CC 0%, #00D4FF 60%, #00B8E6 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }
                      : {}),
                  }}
                >
                  {word.text}
                </motion.span>
              ))}
            </h1>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 1.0 }}
              style={{
                color: '#6B7684',
                fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                lineHeight: 1.75,
                maxWidth: 600,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Доставяме и монтираме прозрачни LED екрани, които карат всеки да се загледа. Бързо и професионално.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 1.2 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <Link
                to="/contacts"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-heading font-bold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #1A3D7A 0%, #1565C0 100%)',
                  boxShadow: '0 4px 24px rgba(21,101,192,0.38)',
                }}
              >
                Безплатна оферта
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-heading font-bold transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: 'rgba(0,153,204,0.06)',
                  border: '1.5px solid rgba(0,153,204,0.22)',
                  color: '#0099CC',
                }}
              >
                Разгледай продуктите
              </Link>
            </motion.div>

            {/* Spec strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex flex-wrap gap-8 pt-5 justify-center lg:justify-start"
              style={{ borderTop: '1px solid rgba(0,153,204,0.12)' }}
            >
              {SPECS.map(({ val, label }) => (
                <div key={label} className="flex flex-col items-center gap-0.5">
                  <span
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, #0099CC, #00D4FF)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      lineHeight: 1,
                    }}
                  >
                    {val}
                  </span>
                  <span
                    style={{ fontSize: '0.7rem', color: '#9AA3AE', letterSpacing: '0.06em', textAlign: 'center' }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Videos */}
          <motion.div
            style={{ y: panelY }}
            className="order-2 flex flex-col items-center lg:items-end gap-6 sm:gap-8"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] as number[], delay: 0.5 }}
          >
            <div className="w-full" style={{ maxWidth: 560 }}>
              <VideoCard
                src="/video_transparentLED.mp4"
                badge="90% Прозрачност"
                badgeColor="#10B981"
                badgePos="tl"
                delay={1.3}
              />
            </div>
            <div className="w-full" style={{ maxWidth: 560 }}>
              <VideoCard
                src="/video_transparentLED1.mp4"
                badge="5 000 nit · IP43"
                badgeColor="#0099CC"
                badgePos="br"
                delay={1.6}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10 cursor-pointer bg-transparent border-0 p-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        aria-label="Превъртете надолу"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} style={{ color: 'rgba(0,0,0,0.25)' }} />
        </motion.div>
      </motion.button>

      {/* Bottom gradient into next section */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          background: 'linear-gradient(to bottom, transparent, #FFFFFF)',
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}
