import { motion, useReducedMotion } from 'framer-motion';
import { Check, X, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const transparentFeatures = [
  { label: 'Прозрачност', value: '80–95% - виждате свободно през дисплея' },
  { label: 'Тегло / м²', value: '6 кг · монтаж върху съществуваща витрина' },
  { label: 'Консумация', value: '≈ 240 W/м² - до 60% по-икономичен' },
  { label: 'Естетика', value: 'Изчезва зад стъклото, запазва визията'},
  { label: 'Транспорт', value: 'Изключително лесно, заема малко място' },
  { label: 'Приложения', value: 'Витрини, фасади, стъклени прегради, събития' },
];

const standardFeatures = [
  { label: 'Прозрачност', value: '0% - плътна повърхност, блокира гледка и светлина' },
  { label: 'Тегло / м²', value: '40–60 кг · нужна е укрепена конструкция' },
  { label: 'Консумация', value: '≈ 600 W/м² - висока сметка за ток' },
  { label: 'Естетика', value: 'Доминира визуално, изисква рамка' },
  { label: 'Транспорт', value: 'Скъпо и времеемко транспортиране, голям обем' },
  { label: 'Приложения', value: 'Тъмни зали, външни билбордове, сцени' },
];

export default function ComparisonSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="section-padding py-16 lg:py-20 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(160deg, #E8F5FB 0%, #EFF9FF 30%, #F4FAFC 65%, #EEF7FB 100%)',
      }}
      aria-label="Сравнение: прозрачен vs стандартен LED"
    >
      {/* Background accent blobs */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{
            position: 'absolute',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(0,153,204,0.1) 0%, transparent 70%)',
            top: '-20%',
            left: '-10%',
          }}
          animate={{ scale: [1, 1.08, 1], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(0,153,204,0.07) 0%, transparent 70%)',
            bottom: '-10%',
            right: '-5%',
          }}
          animate={{ scale: [1, 1.12, 1], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="container-wide relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="cyan-dot" />
            <span className="eyebrow">Сравнение</span>
          </div>
          <h2
            className="section-heading text-balance"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            Прозрачният LED срещу{' '}
            <span className="text-gradient-cyan">стандартния екран</span>
          </h2>
          <p className="text-ink-secondary text-base leading-relaxed mt-4">
            Вижте разликата и защо прозрачните панели печелят по толкова критерии.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">

          {/* === TRANSPARENT LED — Winner card === */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative rounded-2xl overflow-hidden"
            style={{ zIndex: 1 }}
          >
            {/* Animated outer glow ring */}
            <motion.div
              aria-hidden="true"
              className="absolute -inset-0.5 rounded-2xl"
              style={{
                background:
                  'linear-gradient(135deg, #0099CC 0%, #00D4FF 50%, #10B981 100%)',
                zIndex: -1,
              }}
              animate={reducedMotion ? {} : { opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Card */}
            <div
              style={{
                background:
                  'linear-gradient(145deg, #DDF3FC 0%, #CCF0FF 45%, #D8F4FF 100%)',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 14,
              }}
            >
              {/* Shimmer sweep on load */}
              <motion.div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
                  zIndex: 0,
                }}
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.8 }}
              />

              {/* Recommended badge */}
              <motion.div
                className="absolute top-5 right-5 z-10"
                initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              >
                <motion.span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-bold text-white"
                  style={{ background: '#0099CC', boxShadow: '0 4px 12px rgba(0,153,204,0.5)' }}
                  animate={reducedMotion ? {} : { boxShadow: ['0 4px 12px rgba(0,153,204,0.5)', '0 4px 22px rgba(0,153,204,0.75)', '0 4px 12px rgba(0,153,204,0.5)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles size={11} />
                  Препоръчвано
                </motion.span>
              </motion.div>

              {/* Header */}
              <div className="px-7 pt-8 pb-5 relative z-10">
                <p
                  className="text-xs font-heading font-bold uppercase tracking-widest mb-1.5"
                  style={{ color: '#0077AA' }}
                >
                  Прозрачен LED
                </p>
                <h3
                  className="font-heading font-bold leading-tight"
                  style={{ fontSize: 'clamp(1.35rem, 2.5vw, 1.7rem)', color: '#0D1B2A' }}
                >
                  Модерен · лек · екологичен
                </h3>
              </div>

              {/* Feature list */}
              <div
                className="px-7 pb-7 flex flex-col gap-2.5 relative z-10"
              >
                {transparentFeatures.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 rounded-xl px-4 py-3.5 transition-transform duration-150 hover:scale-[1.02]"
                    style={{
                      background: 'rgba(255,255,255,0.72)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(0,153,204,0.1)',
                    }}
                  >
                    <div
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: 'linear-gradient(135deg, #0099CC, #00D4FF)' }}
                    >
                      <Check size={13} strokeWidth={2.5} className="text-white" />
                    </div>
                    <div>
                      <p
                        className="text-[10px] font-heading font-bold uppercase tracking-widest mb-0.5"
                        style={{ color: '#0077AA' }}
                      >
                        {label}
                      </p>
                      <p className="text-sm font-body leading-snug" style={{ color: '#0D1B2A' }}>
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div
                className="px-7 py-5 flex items-center justify-between relative z-10"
                style={{ borderTop: '1px solid rgba(0,153,204,0.15)' }}
              >
                <div>
                  <p className="text-[10px] font-heading font-bold uppercase tracking-widest mb-0.5" style={{ color: '#0077AA' }}>
                    Резултат
                  </p>
                  <motion.p
                    className="font-heading font-bold text-2xl"
                    style={{ color: '#0099CC' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    6 / 6
                  </motion.p>
                </div>
                <Link
                  to="/contacts"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-heading font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.04]"
                  style={{
                    background: 'linear-gradient(135deg, #1A3D7A 0%, #1565C0 100%)',
                    boxShadow: '0 4px 18px rgba(21,101,192,0.4)',
                  }}
                >
                  Искам такъв
                  <ArrowRight size={15} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* === STANDARD LED — Loser card === */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E8ECF0',
              boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
            }}
          >
            {/* Header */}
            <div className="px-7 pt-8 pb-5">
              <p className="text-[10px] font-heading font-bold uppercase tracking-widest mb-1.5" style={{ color: '#9AA3AE' }}>
                Стандартен LED
              </p>
              <h3
                className="font-heading font-bold leading-tight"
                style={{ fontSize: 'clamp(1.35rem, 2.5vw, 1.7rem)', color: '#6B7684' }}
              >
                Старомоден · блокиращ · невпечеляващ
              </h3>
            </div>

            {/* Feature list */}
            <div
              className="px-7 pb-7 flex flex-col gap-2.5"
            >
              {standardFeatures.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 rounded-xl px-4 py-3.5"
                  style={{ background: '#F4F6F8' }}
                >
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: '#E8ECF0' }}
                  >
                    <X size={13} strokeWidth={2.5} style={{ color: '#9AA3AE' }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-heading font-bold uppercase tracking-widest mb-0.5" style={{ color: '#9AA3AE' }}>
                      {label}
                    </p>
                    <p className="text-sm font-body leading-snug" style={{ color: '#6B7684' }}>
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div
              className="px-7 py-5 flex items-center justify-between"
              style={{ borderTop: '1px solid #F4F6F8' }}
            >
              <div>
                <p className="text-[10px] font-heading font-bold uppercase tracking-widest mb-0.5" style={{ color: '#9AA3AE' }}>
                  Резултат
                </p>
                <p className="font-heading font-bold text-2xl" style={{ color: '#9AA3AE' }}>
                  0 / 6
                </p>
              </div>
              <p className="text-xs font-body" style={{ color: '#9AA3AE' }}>
                Стара технология
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
