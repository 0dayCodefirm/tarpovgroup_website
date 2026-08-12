import { motion } from 'framer-motion';
import { Leaf, TrendingDown, Zap } from 'lucide-react';
import DecorBackground from '../shared/DecorBackground';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stats = [
  { icon: TrendingDown, value: '65%', label: 'по-енергоефективни', sub: 'спрямо традиционни LED екрани', color: 'bg-brand-cyan/10 text-brand-cyan-dark' },
  { icon: Zap, value: '180 W', label: 'средна консумация', sub: 'при P10 панели', color: 'bg-brand-emerald/10 text-brand-emerald-dark' },
  { icon: Leaf, value: '40%', label: 'намаление при нощен режим', sub: 'автоматична яркостна регулация', color: 'bg-brand-emerald/10 text-brand-emerald-dark' },
];

export default function EnergyEfficiency() {
  return (
    <section
      className="section-padding py-20 lg:py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(150deg, #F0FDF8 0%, #ECFDF5 40%, #F0F9FF 100%)',
      }}
    >
      <DecorBackground variant="emerald" />

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: copy + stats */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
                <span className="cyan-dot" />
                <span className="eyebrow">Енергоефективност</span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="section-heading text-balance mb-5"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
              >
                До{' '}
                <span className="text-gradient-cyan">65% по-енергоефективни</span>{' '}
                от традиционните екрани
              </motion.h2>
              <motion.p variants={fadeUp} className="text-ink-secondary text-base leading-relaxed max-w-lg">
                Прозрачните LED дисплеи консумират значително по-малко енергия от
                традиционните LED екрани. Автоматичната яркостна регулация
                на NOVASTAR TB10plus допълнително намалява потреблението при нощен режим.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-3 gap-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            >
              {stats.map(({ icon: Icon, value, label, sub, color }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl border border-surface-border p-5 transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <p className="font-heading font-bold text-2xl text-ink-primary leading-none mb-1">{value}</p>
                  <p className="text-sm font-heading font-semibold text-ink-primary mb-0.5">{label}</p>
                  <p className="text-xs text-ink-muted leading-snug">{sub}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: visual comparison — two stacked horizontal bars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="bg-white rounded-2xl border border-surface-border p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <h3 className="font-heading font-bold text-ink-primary text-base mb-8">
                Сравнение на консумацията (W/м²)
              </h3>

              {/* Stacked bar chart — blue on top, grey ~3x wider below */}
              <div className="space-y-5">
                {/* Row 1: Transparent LED — 175 W/m² (blue) */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-heading font-semibold text-ink-secondary">
                      Прозрачен LED
                    </span>
                    <span className="text-sm font-heading font-bold" style={{ color: '#0099CC' }}>175 W/м²</span>
                  </div>
                  <motion.div
                    className="relative h-12 rounded-xl flex items-center overflow-hidden"
                    style={{
                      background: 'linear-gradient(90deg, #0099CC 0%, #00D4FF 100%)',
                      boxShadow: '0 4px 14px rgba(0,153,204,0.25)',
                    }}
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    <motion.span
                      className="text-white font-heading font-bold text-xs pl-4 whitespace-nowrap"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7, duration: 0.3 }}
                    >
                      175 W/м²
                    </motion.span>
                  </motion.div>
                </div>

                {/* Row 2: Traditional LED — 500 W/m² (grey, ~3x wider) */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-heading font-semibold text-ink-secondary">
                      Традиционен LED
                    </span>
                    <span className="text-sm font-heading font-bold text-ink-muted">500 W/м²</span>
                  </div>
                  <motion.div
                    className="relative h-12 rounded-xl flex items-center overflow-hidden"
                    style={{
                      background: 'linear-gradient(90deg, #CBD5E1 0%, #94A3B8 100%)',
                    }}
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
                  >
                    <motion.span
                      className="text-white font-heading font-bold text-xs pl-4 whitespace-nowrap"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.95, duration: 0.3 }}
                    >
                      500 W/м²
                    </motion.span>
                  </motion.div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ background: 'linear-gradient(90deg, #0099CC, #00D4FF)' }} />
                    <span className="text-xs font-heading font-semibold" style={{ color: '#0099CC' }}>Прозрачен LED — 175 W/м²</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ background: 'linear-gradient(90deg, #CBD5E1, #94A3B8)' }} />
                    <span className="text-xs text-ink-muted">Традиционен LED — 500 W/м²</span>
                  </div>
                </div>

                {/* Savings badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="flex items-center gap-4 rounded-xl p-5"
                  style={{
                    background: 'linear-gradient(135deg, rgba(16,185,129,0.07) 0%, rgba(0,153,204,0.05) 100%)',
                    border: '1px solid rgba(16,185,129,0.18)',
                  }}
                >
                  <div className="w-11 h-11 rounded-full bg-brand-emerald/10 flex items-center justify-center flex-shrink-0">
                    <Leaf size={20} className="text-brand-emerald-dark" />
                  </div>
                  <div>
                    <p className="text-sm font-heading font-bold text-ink-primary">
                      Икономия от 65% електроенергия
                    </p>
                    <p className="text-xs text-ink-muted mt-0.5">
                      При сравними площ, яркост и работно време
                    </p>
                  </div>
                  <motion.div
                    className="ml-auto font-heading font-black"
                    style={{ fontSize: '2rem', color: '#10B981', lineHeight: 1 }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.0, type: 'spring', stiffness: 200 }}
                  >
                    -65%
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
