import { motion } from 'framer-motion';
import { MessageSquare, Sliders, Truck, ShieldCheck, type LucideIcon } from 'lucide-react';

const steps: { id: number; icon: LucideIcon; title: string; description: string; color: string }[] = [
  {
    id: 1,
    icon: MessageSquare,
    title: 'Консултация',
    description:
      'Анализираме обекта, целите и бюджета. Безплатно посещение на място или онлайн среща.',
    color: 'bg-brand-cyan/10 text-brand-cyan-dark',
  },
  {
    id: 2,
    icon: Sliders,
    title: 'Проектиране и спецификация',
    description:
      'Избираме оптималния pixel pitch, размери и контролна система спрямо разстоянието до зрителя.',
    color: 'bg-brand-amber/10 text-brand-amber-dark',
  },
  {
    id: 3,
    icon: Truck,
    title: 'Доставка и монтаж',
    description:
      'Директен внос от производителя. Монтаж от сертифициран екип с минимален прекъснат работен ден.',
    color: 'bg-brand-emerald/10 text-brand-emerald-dark',
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: 'Поддръжка и гаранция',
    description:
      '3 години гаранция, отдалечено наблюдение и бърза техническа поддръжка. Системата работи над 100 000 часа.',
    color: 'bg-brand-violet/10 text-brand-violet',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section-padding py-16 lg:py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #F5FAFF 0%, #EEF7FF 35%, #E8F4FB 65%, #F0F8FF 100%)' }}
      aria-label="Как работи процесът"
    >
      <div className="container-wide relative z-10">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-3">
            <span className="cyan-dot" />
            <span className="eyebrow">Процесът</span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="section-heading text-balance"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            От идея до{' '}
            <span className="text-gradient-cyan">работещ проект</span>{' '}
            в 4 стъпки
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-ink-secondary text-base leading-relaxed mt-4 max-w-xl mx-auto"
          >
            Управляваме целия процес, от консултацията до монтажа и последващата поддръжка.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                variants={fadeUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl border border-surface-border p-6 flex flex-col items-start gap-4 relative overflow-hidden group"
              >
                {/* Step number watermark */}
                <span
                  className="absolute -bottom-4 -right-2 font-heading font-black text-7xl opacity-[0.04] select-none"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="flex items-center justify-between w-full relative z-10">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${step.color}`}>
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <span className="font-heading font-bold text-2xl text-ink-light">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-ink-primary text-base leading-snug relative z-10">
                  {step.title}
                </h3>
                <p className="text-sm text-ink-secondary leading-relaxed relative z-10">
                  {step.description}
                </p>

                {/* Colored bottom border on hover */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-cyan to-brand-emerald opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <a href="#contact" className="btn-primary whitespace-nowrap">
            Свържете се с нас
          </a>
        </motion.div>
      </div>
    </section>
  );
}
