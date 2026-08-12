import { motion } from 'framer-motion';
import { Shield, Award, Zap, CheckCircle, Star, Clock, type LucideIcon } from 'lucide-react';

const badges: { icon: LucideIcon; label: string; sub: string; color: string }[] = [
  { icon: Award, label: 'CE сертификат', sub: 'EN 55032 / EN 61000', color: 'text-brand-cyan-dark bg-brand-cyan/10' },
  { icon: Shield, label: 'RoHS', sub: 'Без опасни вещества', color: 'text-brand-emerald-dark bg-brand-emerald/10' },
  { icon: Zap, label: 'IP43 защита', sub: 'Прах & влага', color: 'text-brand-amber-dark bg-brand-amber/10' },
  { icon: CheckCircle, label: 'NOVASTAR контролер', sub: 'Клас А система', color: 'text-brand-cyan-dark bg-brand-cyan/10' },
  { icon: Star, label: '3 год. гаранция', sub: 'Пълна поддръжка', color: 'text-brand-rose-dark bg-brand-rose/10' },
  { icon: Clock, label: '100 000 часа живот', sub: '11+ години работа', color: 'text-brand-violet bg-brand-violet/10' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

function Badge({ icon: Icon, label, sub, color }: typeof badges[number]) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="bg-white border border-surface-border rounded-xl flex items-center gap-3 px-4 py-3 transition-shadow duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
    >
      <div className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg ${color}`}>
        <Icon size={17} strokeWidth={1.75} />
      </div>
      <div className="flex flex-col leading-tight min-w-0">
        <span className="font-heading font-semibold text-sm text-ink-primary truncate" title={label}>
          {label}
        </span>
        <span className="text-[11px] text-ink-muted font-body truncate">{sub}</span>
      </div>
    </motion.div>
  );
}

export default function TrustBar() {
  return (
    <section
      className="bg-surface-white section-padding py-10"
      aria-label="Сертификати и стандарти"
    >
      <div className="container-wide">
        <motion.div
          className="flex items-center justify-center gap-2 mb-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="cyan-dot" />
          <span className="eyebrow">Сертификати и стандарти</span>
          <span className="cyan-dot" />
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {badges.map((badge) => (
            <Badge key={badge.label} {...badge} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
