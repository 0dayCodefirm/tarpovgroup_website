import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Images, BadgeCheck, Clock, PhoneCall, ShieldCheck } from 'lucide-react';

const TRUST_BADGES = [
  { icon: BadgeCheck, label: 'CE & RoHS сертифициран' },
  { icon: ShieldCheck, label: '3 години гаранция' },
  { icon: Clock, label: 'Отговор до 12 ч.' },
  { icon: PhoneCall, label: 'Безплатна консултация' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

function TrustBadges({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-5 gap-y-2.5 pt-8 ${className}`}
      style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
    >
      {TRUST_BADGES.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-1.5 text-xs font-heading font-medium"
          style={{ color: 'rgba(255,255,255,0.65)' }}
        >
          <Icon size={13} strokeWidth={2} style={{ color: '#00D4FF', flexShrink: 0 }} />
          {label}
        </div>
      ))}
    </div>
  );
}

export default function FinalCTA() {
  return (
    <section
      id="contact"
      className="section-padding py-14 lg:py-16 relative overflow-hidden"
      aria-label="Заяви оферта"
      style={{
        background: 'linear-gradient(150deg, #0A1628 0%, #0D1F3C 45%, #0A2240 100%)',
      }}
    >
      {/* Ambient blobs */}
      <motion.div
        className="absolute top-0 left-1/4 w-[480px] h-[480px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(0,153,204,0.09)' }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(139,92,246,0.08)' }}
        animate={{ x: [0, -30, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      <div className="container-wide relative z-10">
        <motion.div
          className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >

          {/* ── Text content (heading + paragraph + buttons) ── */}
          <div className="flex flex-col items-start order-1 lg:order-1">
            <motion.h2
              variants={fadeUp}
              className="text-balance font-heading font-extrabold leading-tight mb-5"
              style={{
                fontSize: 'clamp(2rem, 4vw, 2.9rem)',
                color: '#FFFFFF',
                letterSpacing: '-0.015em',
              }}
            >
              Превърнете минувачите в{' '}
              <span
                style={{
                  background: 'linear-gradient(110deg, #0099CC 0%, #00D4FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                клиенти
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed mb-9"
              style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 420 }}
            >
              Заявете безплатна консултация. Отговаряме в рамките на{' '}
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>12 часа</span>.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-0 lg:mb-10">
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
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-heading font-bold transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1.5px solid rgba(255,255,255,0.2)',
                  color: 'rgba(255,255,255,0.9)',
                }}
              >
                <Images size={16} />
                Виж галерията
              </Link>
            </motion.div>

            {/* Trust badges — desktop only (inline in text column) */}
            <motion.div variants={fadeUp} className="hidden lg:block w-full">
              <TrustBadges />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="hidden lg:block text-xs font-body mt-5"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Без задължение за покупка. Запитването е напълно безплатно.
            </motion.p>
          </div>

          {/* ── Image ── */}
          <motion.div
            variants={fadeUp}
            className="relative flex items-center justify-center order-2 lg:order-2 w-full"
          >
            {/* Purple glow halo */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: -48,
                borderRadius: '2.5rem',
                background:
                  'radial-gradient(ellipse at center, rgba(139,92,246,0.52) 0%, rgba(109,40,217,0.28) 40%, transparent 70%)',
                filter: 'blur(48px)',
                pointerEvents: 'none',
              }}
            />
            {/* Cyan accent glow */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: -20,
                borderRadius: '2.5rem',
                background:
                  'radial-gradient(ellipse at 65% 85%, rgba(0,180,240,0.22) 0%, transparent 60%)',
                filter: 'blur(28px)',
                pointerEvents: 'none',
              }}
            />
            <video
              src="/gallery/factory_video.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              disableRemotePlayback
              className="relative w-full"
              style={{
                borderRadius: '1.5rem',
                boxShadow:
                  '0 0 0 1px rgba(139,92,246,0.28), 0 0 56px rgba(139,92,246,0.32), 0 24px 64px rgba(0,0,0,0.65)',
                display: 'block',
                maxWidth: 600,
                margin: '0 auto',
              }}
            />
          </motion.div>

          {/* Trust badges — mobile only (after image) */}
          <motion.div variants={fadeUp} className="lg:hidden w-full order-3">
            <TrustBadges />
            <p
              className="text-xs font-body mt-5"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Без задължение за покупка. Запитването е напълно безплатно.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
