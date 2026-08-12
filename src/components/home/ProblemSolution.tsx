import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, Check } from 'lucide-react';

const problems = [
  'Статичните плакати не привличат вниманието на минувачите',
  'Нормалните дисплеи блокират видимостта и светлината',
  'Висока консумация на енергия',
  'Скучна и неупотребена витрина',
];

const solutions = [
  'Динамично съдържание, което се откроява денем и нощем',
  '80–95% прозрачност на витрината е запазена',
  'Привличащи визуални ефекти и технология',
  'Еднократна инвестиция с 3-годишна гаранция',
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function ProblemSolution() {
  return (
    <section
      className="section-padding py-14 lg:py-16 relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #FAFAFA 0%, #F4F8FF 50%, #FAFAFA 100%)',
      }}
      aria-label="Проблем и решение"
    >
      <div className="container-wide relative z-10">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2
            variants={fadeUp}
            className="section-heading text-balance"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            Защо{' '}
            <span className="text-gradient-cyan">прозрачен LED?</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="bg-white rounded-2xl border border-surface-border p-8 relative overflow-hidden group hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-shadow duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-rose/60 via-brand-rose/30 to-transparent" />
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-rose/10">
                <XCircle size={20} className="text-brand-rose-dark" strokeWidth={2} />
              </div>
              <span className="text-sm font-heading font-bold tracking-widest uppercase text-brand-rose-dark">
                Проблемът
              </span>
            </div>
            <ul className="flex flex-col gap-3.5">
              {problems.map((text, i) => (
                <motion.li
                  key={text}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.09, duration: 0.35 }}
                  className="flex items-start gap-3"
                >
                  <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-brand-rose/60" />
                  <span className="text-sm text-ink-secondary leading-relaxed">{text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Solution card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
            className="bg-white rounded-2xl border border-brand-emerald/20 p-8 relative overflow-hidden hover:shadow-[0_8px_32px_rgba(16,185,129,0.10)] transition-shadow duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-emerald via-brand-emerald/50 to-transparent" />
            {/* Subtle glow at top-right */}
            <div
              className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse, rgba(16,185,129,0.10) 0%, transparent 70%)',
                transform: 'translate(30%, -30%)',
              }}
            />
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-emerald/10">
                <CheckCircle2 size={20} className="text-brand-emerald-dark" strokeWidth={2} />
              </div>
              <span className="text-sm font-heading font-bold tracking-widest uppercase text-brand-emerald-dark">
                Решението
              </span>
            </div>
            <ul className="flex flex-col gap-3.5">
              {solutions.map((text, i) => (
                <motion.li
                  key={text}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.09, duration: 0.35 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-brand-emerald/15 flex items-center justify-center">
                    <Check size={12} className="text-brand-emerald-dark" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-ink-secondary leading-relaxed">{text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
