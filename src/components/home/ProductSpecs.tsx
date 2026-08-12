import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

type Product = {
  pitch: string;
  label: string;
  recommended: boolean;
  pixelPitch: string;
  pixelDensity: string;
  moduleThickness: string;
  led: string;
  cabinet: string;
  weight: string;
  transparency: string;
  bestView: string;
  maxPower: string;
  avePower: string;
  voltage: string;
  brightness: string;
  viewAngleH: string;
  viewAngleV: string;
  colorTemp: string;
  processing: string;
  refresh: string;
  contrastRatio: string;
  frameFreq: string;
  opTemp: string;
  storageTemp: string;
  opHumidity: string;
  storageHumidity: string;
  lifespan: string;
  ip: string;
  idealFor: string;
};

const products: Product[] = [
  {
    pitch: 'P3.91',
    label: 'Висока резолюция',
    recommended: false,
    pixelPitch: '3.91 mm',
    pixelDensity: '65 536 Px/м²',
    moduleThickness: '3 mm',
    led: 'SMD2121',
    cabinet: '1000×250 mm (по заявка)',
    weight: '5.5 кг/м²',
    transparency: '>85%',
    bestView: '3–250 м',
    maxPower: '600 W/м²',
    avePower: '240 W/м²',
    voltage: 'AC 110V/220V ±10%',
    brightness: '5000 nit',
    viewAngleH: '140°',
    viewAngleV: '140°',
    colorTemp: '5500–15000 K (регулируема)',
    processing: '16-bit',
    refresh: '≥3840 Hz',
    contrastRatio: '2000:1',
    frameFreq: '60 Hz',
    opTemp: '-10°C ~ 45°C',
    storageTemp: '-40°C ~ 65°C',
    opHumidity: '10%~90%',
    storageHumidity: '10%~90%',
    lifespan: '≥100 000 ч',
    ip: 'IP45',
    idealFor: 'Бижутерии, козметика, луксозни витрини — максимална детайлност при близко разстояние на гледане',
  },
  {
    pitch: 'P6.25',
    label: 'Препоръчително',
    recommended: true,
    pixelPitch: '6.25 mm',
    pixelDensity: '25 600 Px/м²',
    moduleThickness: '3 mm',
    led: 'SMD2121',
    cabinet: '1000×250 mm (по заявка)',
    weight: '5.5 кг/м²',
    transparency: '>90%',
    bestView: '5–250 м',
    maxPower: '600 W/м²',
    avePower: '240 W/м²',
    voltage: 'AC 110V/220V ±10%',
    brightness: '5000 nit',
    viewAngleH: '140°',
    viewAngleV: '140°',
    colorTemp: '5500–15000 K (регулируема)',
    processing: '16-bit',
    refresh: '≥3840 Hz',
    contrastRatio: '2000:1',
    frameFreq: '60 Hz',
    opTemp: '-10°C ~ 45°C',
    storageTemp: '-40°C ~ 65°C',
    opHumidity: '10%~90%',
    storageHumidity: '10%~90%',
    lifespan: '≥100 000 ч',
    ip: 'IP45',
    idealFor: 'Търговски центрове, фасади, корпоративни лобита — оптималният баланс между резолюция, прозрачност и цена',
  },
  {
    pitch: 'P10.4',
    label: 'Макс. прозрачност',
    recommended: false,
    pixelPitch: '10.4 mm',
    pixelDensity: '10 000 Px/м²',
    moduleThickness: '3 mm',
    led: 'SMD2121',
    cabinet: '1000×250 mm (по заявка)',
    weight: '5.5 кг/м²',
    transparency: '>95%',
    bestView: '8–250 м',
    maxPower: '600 W/м²',
    avePower: '240 W/м²',
    voltage: 'AC 110V/220V ±10%',
    brightness: '5000 nit',
    viewAngleH: '140°',
    viewAngleV: '140°',
    colorTemp: '5500–15000 K (регулируема)',
    processing: '16-bit',
    refresh: '≥3840 Hz',
    contrastRatio: '2000:1',
    frameFreq: '60 Hz',
    opTemp: '-10°C ~ 45°C',
    storageTemp: '-40°C ~ 65°C',
    opHumidity: '10%~90%',
    storageHumidity: '10%~90%',
    lifespan: '≥100 000 ч',
    ip: 'IP45',
    idealFor: 'Фасадна реклама, арена дисплеи, монументални инсталации — максимална светлопропускливост',
  },
];

const highlightMap: Record<string, { bg: string; color: string }> = {
  '>85%':  { bg: '#E8F5FC', color: '#006994' },
  '>90%':  { bg: '#E8F5FC', color: '#006994' },
  '>95%':  { bg: '#E8F5FC', color: '#006994' },
  '≥3840 Hz': { bg: '#E7F5EE', color: '#15803D' },
  '≥100 000 ч': { bg: '#E0E7FF', color: '#3730A3' },
  '2000:1': { bg: '#FEF3C7', color: '#B45309' },
};

function HighlightBadge({ value }: { value: string }) {
  const style = highlightMap[value];
  if (!style) return <>{value}</>;
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-md font-bold text-xs"
      style={{ background: style.bg, color: style.color }}
    >
      {value}
    </span>
  );
}

const specGroups: { title: string; rows: { label: string; key: keyof Product }[] }[] = [
  {
    title: 'Оптика',
    rows: [
      { label: 'Pixel Pitch (mm)', key: 'pixelPitch' },
      { label: 'Пикселна плътност', key: 'pixelDensity' },
      { label: 'Прозрачност', key: 'transparency' },
      { label: 'Яркост (nit)', key: 'brightness' },
      { label: 'Хоризонтален ъгъл', key: 'viewAngleH' },
      { label: 'Вертикален ъгъл', key: 'viewAngleV' },
      { label: 'Цветна температура', key: 'colorTemp' },
      { label: 'Оптимален обхват', key: 'bestView' },
    ],
  },
  {
    title: 'Хардуер',
    rows: [
      { label: 'Тип LED', key: 'led' },
      { label: 'Размер кабинет', key: 'cabinet' },
      { label: 'Дебелина на модул', key: 'moduleThickness' },
      { label: 'Тегло', key: 'weight' },
      { label: 'Водоустойчивост (IP)', key: 'ip' },
    ],
  },
  {
    title: 'Електрически параметри',
    rows: [
      { label: 'Захранващо напрежение', key: 'voltage' },
      { label: 'Макс. консумация', key: 'maxPower' },
      { label: 'Средна консумация', key: 'avePower' },
    ],
  },
  {
    title: 'Дисплей и контрол',
    rows: [
      { label: 'Обработка на цвят', key: 'processing' },
      { label: 'Честота на опресняване', key: 'refresh' },
      { label: 'Контрастно съотношение', key: 'contrastRatio' },
      { label: 'Кадрова честота', key: 'frameFreq' },
    ],
  },
  {
    title: 'Работна среда и живот',
    rows: [
      { label: 'Работна температура', key: 'opTemp' },
      { label: 'Температура на съхранение', key: 'storageTemp' },
      { label: 'Работна влажност', key: 'opHumidity' },
      { label: 'Влажност при съхранение', key: 'storageHumidity' },
      { label: 'Живот на панелите', key: 'lifespan' },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function ProductSpecs() {
  const [selectedPitch, setSelectedPitch] = useState('P6.25');
  const selectedProduct = products.find((p) => p.pitch === selectedPitch) ?? products[1];

  return (
    <section
      id="specs"
      className="section-padding py-14 lg:py-16"
      style={{ background: '#FFFFFF' }}
      aria-label="Технически параметри"
    >
      <div className="container-wide">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-3">
            <span className="cyan-dot" />
            <span className="eyebrow">Технически параметри</span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="section-heading text-balance"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            Изберете правилния{' '}
            <span className="text-gradient-cyan">Pixel Pitch</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-ink-secondary text-base leading-relaxed mt-4 max-w-xl mx-auto"
          >
            По-малкото разстояние между пикселите означава по-висока резолюция и по-малко прозрачност.
            Изберете спрямо разстоянието до зрителя.
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Pitch selector */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-stretch gap-3 sm:gap-0 mb-12 sm:rounded-xl sm:overflow-hidden sm:border sm:border-[#ECECEC]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {products.map((product, idx) => {
              const isSelected = selectedPitch === product.pitch;
              return (
                <button
                  key={product.pitch}
                  onClick={() => setSelectedPitch(product.pitch)}
                  className={`relative flex-1 text-left px-5 sm:px-6 py-5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-dark group rounded-xl sm:rounded-none border border-[#ECECEC] sm:border-0 ${
                    idx < products.length - 1 ? 'sm:border-r sm:border-[#ECECEC]' : ''
                  }`}
                  style={{ background: isSelected ? '#0099CC' : '#FAFAFA' }}
                  aria-pressed={isSelected}
                >
                  {product.recommended && (
                    <span
                      className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-heading font-bold"
                      style={{
                        background: isSelected ? 'rgba(255,255,255,0.2)' : '#0099CC',
                        color: '#FFFFFF',
                      }}
                    >
                      <Sparkles size={9} />
                      Топ
                    </span>
                  )}
                  <span
                    className="font-heading font-bold block mb-0.5 transition-colors"
                    style={{ fontSize: '1.6rem', lineHeight: 1, color: isSelected ? '#FFFFFF' : '#111418' }}
                  >
                    {product.pitch}
                  </span>
                  <span
                    className="text-xs font-heading font-medium block mb-3 transition-colors"
                    style={{ color: isSelected ? 'rgba(255,255,255,0.75)' : '#9AA3AE' }}
                  >
                    {product.label}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { k: 'Прозрачност', v: product.transparency },
                      { k: 'Яркост', v: product.brightness },
                      { k: 'Обхват', v: product.bestView },
                    ].map(({ k, v }) => (
                      <div key={k} className="flex items-center justify-between gap-2">
                        <span
                          className="text-[10px] font-body"
                          style={{ color: isSelected ? 'rgba(255,255,255,0.6)' : '#9AA3AE' }}
                        >
                          {k}
                        </span>
                        <span
                          className="text-[11px] font-heading font-semibold"
                          style={{ color: isSelected ? '#FFFFFF' : '#111418' }}
                        >
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Spec sheet */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProduct.pitch}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              {specGroups.map((group, gi) => (
                <div key={group.title}>
                  <div
                    className="flex items-center gap-3 px-0 py-4"
                    style={{ borderTop: gi > 0 ? '1px solid #ECECEC' : undefined }}
                  >
                    <div
                      className="w-0.5 self-stretch rounded-full flex-shrink-0"
                      style={{ background: '#0099CC', minHeight: '1.25rem' }}
                    />
                    <h4
                      className="font-heading font-bold uppercase tracking-widest"
                      style={{ fontSize: '0.7rem', color: '#0099CC', letterSpacing: '0.15em' }}
                    >
                      {group.title}
                    </h4>
                  </div>
                  <div className="flex flex-col">
                    {group.rows.map(({ label, key }, ri) => {
                      const value = selectedProduct[key];
                      const highlighted = highlightMap[String(value)] !== undefined;
                      return (
                        <div
                          key={label}
                          className="flex items-center justify-between gap-6 py-4"
                          style={{
                            borderTop: ri > 0 ? '1px solid #ECECEC' : undefined,
                            paddingLeft: '1rem',
                          }}
                        >
                          <span className="text-sm font-body flex-shrink-0" style={{ color: '#9AA3AE' }}>
                            {label}
                          </span>
                          {highlighted ? (
                            <HighlightBadge value={String(value)} />
                          ) : (
                            <span className="text-right font-heading font-semibold text-sm" style={{ color: '#111418' }}>
                              {value}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Ideal for */}
              <div
                className="py-8 px-4 mt-4 rounded-xl"
                style={{ background: 'linear-gradient(135deg, #F0F9FF 0%, #E8F5FC 100%)' }}
              >
                <p
                  className="text-[11px] font-heading font-bold uppercase tracking-widest mb-2"
                  style={{ color: '#0099CC' }}
                >
                  Идеален за
                </p>
                <p className="text-base font-body leading-relaxed" style={{ color: '#111418' }}>
                  {selectedProduct.idealFor}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
