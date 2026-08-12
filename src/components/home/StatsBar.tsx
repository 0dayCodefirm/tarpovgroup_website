import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedCounter from '../shared/AnimatedCounter';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
  color: string;
}

const STATS: Stat[] = [
  { value: 47, suffix: '+', label: 'проекта завършени', color: 'text-brand-cyan-dark' },
  { value: 2800, suffix: '+', label: 'м² монтирани', color: 'text-brand-emerald-dark' },
  { value: 98, suffix: '%', label: 'безаварийна работа', color: 'text-brand-amber-dark' },
  { value: 100000, suffix: '+', label: 'часа живот на панелите', color: 'text-brand-violet' },
];

function StatItem({ stat }: { stat: Stat }) {
  return (
    <div className="flex flex-col items-center text-center gap-1 px-4 py-2">
      <div
        className="flex items-baseline gap-0.5 font-heading font-bold"
        style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1, color: '#111418' }}
      >
        <AnimatedCounter value={stat.value} decimals={stat.decimals ?? 0} />
        <span className={stat.color}>{stat.suffix}</span>
      </div>
      <p className="text-sm font-body text-ink-muted mt-1">{stat.label}</p>
    </div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="stats"
      className="section-padding py-14 lg:py-16 bg-white border-y border-surface-border relative overflow-hidden"
      aria-label="Ключови показатели"
    >
      {/* Animated gradient line at top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #0099CC, #10B981, #F59E0B, transparent)',
        }}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container-wide" ref={ref}>
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-y-8"
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
              }}
            >
              <StatItem stat={stat} />
            </motion.div>
          ))}
        </motion.div>

        <p className="text-center text-xs font-body text-ink-light mt-6">
          Всички показатели се отнасят за реализирани обекти в България от 2020 г. до момента.
        </p>
      </div>
    </section>
  );
}
