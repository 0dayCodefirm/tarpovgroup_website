import { motion } from 'framer-motion';

type Variant = 'cyan' | 'warm' | 'emerald' | 'violet' | 'mixed';

const colorMap: Record<Variant, { bg: string; glow: string }> = {
  cyan: { bg: 'rgba(0, 153, 204, 0.07)', glow: 'rgba(0, 153, 204, 0.12)' },
  warm: { bg: 'rgba(245, 158, 11, 0.06)', glow: 'rgba(245, 158, 11, 0.10)' },
  emerald: { bg: 'rgba(16, 185, 129, 0.05)', glow: 'rgba(16, 185, 129, 0.10)' },
  violet: { bg: 'rgba(124, 58, 237, 0.05)', glow: 'rgba(124, 58, 237, 0.10)' },
  mixed: { bg: 'rgba(0, 153, 204, 0.06)', glow: 'rgba(245, 158, 11, 0.08)' },
};

export default function DecorBackground({ variant = 'cyan' }: { variant?: Variant }) {
  const c = colorMap[variant];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 400,
          height: 400,
          background: c.bg,
          top: '-10%',
          left: '-5%',
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 350,
          height: 350,
          background: c.glow,
          bottom: '-10%',
          right: '-5%',
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, -20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute rounded-full blur-2xl"
        style={{
          width: 200,
          height: 200,
          background: c.bg,
          top: '40%',
          right: '20%',
        }}
        animate={{
          x: [0, 20, -20, 0],
          y: [0, -15, 10, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  );
}
