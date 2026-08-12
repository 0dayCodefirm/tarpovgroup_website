import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductSpecs from '../components/home/ProductSpecs';
import { usePageSeo, breadcrumbSchema, productSchema, BREADCRUMB_HOME } from '../components/shared/Seo';

interface Spec {
  label: string;
  value: string;
}

type MediaItem = { type: 'image'; src: string } | { type: 'video'; src: string };

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  specs: Spec[];
  highlights: string[];
  media: MediaItem[];
  accent: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'p39-showcase',
    name: 'Прозрачен LED панел',
    tagline: 'Препоръчван за 90% от проектите',
    description:
      'Максимална детайлност за магазини, шоуруми, търговски центрове, конферентни и концертни зали, офиси, хотели и други. Бърз и лесен монтаж върху стъклото.',
    specs: [
      { label: 'Прозрачност', value: '85-95%' },
      { label: 'Яркост', value: '5 000 nit' },
      { label: 'Обхват', value: '2–350 м' },
      { label: 'Тегло', value: '6 кг/м²' },
    ],
    highlights: ['Лесен за монтаж', '250 x 1000 mm на кабинет', 'SMD2121 LED'],
    media: [
      { type: 'video', src: '/gallery/factory_video copy copy.mp4' },
      { type: 'image', src: '/images/transparent1.jpg' },
      { type: 'image', src: '/images/panels_transparent copy.jpg' },
    ],
    accent: '#0099CC',
  },
  {
    id: 'p625-facade',
    name: 'Кабинетен прозрачен LED',
    tagline: 'По-обемен, но стабилен',
    description:
      'Изработен от алуминиева леярска конструкция с бързо съединяващи се касети за лесен и прецизен монтаж на голяма площ. Всяка каса включва вграден захранващ и приемен модул, което осигурява бърза диагностика и подмяна при сервизно обслужване, без прекъсване на цялата инсталация.',
    specs: [
      { label: 'Прозрачност', value: '80-90%' },
      { label: 'Яркост', value: '5 000 nit' },
      { label: 'Обхват', value: '3–350 м' },
      { label: 'Тегло', value: '6 кг/м²' },
    ],
    highlights: ['Устойчив и стабилен', 'Без нужда от упкрепване', 'Перфектен за големи пространства'],
    media: [
      { type: 'video', src: '/gallery/constructionPanel.mp4' },
      { type: 'image', src: '/images/constructionPanel1.jpg' },
      { type: 'image', src: '/images/constructionPanel2.jpg' },
      { type: 'video', src: '/gallery/constructionPanel0.mp4' },
    ],
    accent: '#0099CC',
  },
  {
    id: 'p10-facade',
    name: '"Кристален" LED панел',
    tagline: 'Максимална прозрачност',
    description:
      'Когато прозрачността е приоритет. За разлика от касетъчните системи, Crystal Film не изисква рамка, профили или монтажна конструкция, а се залепва директно върху повърхността на стъклото, запазвайки изцяло визуалната му чистота. Малко по-труден е за преместване от един проект към друг.',
    specs: [
      { label: 'Прозрачност', value: '90-95%' },
      { label: 'Яркост', value: '5 000 nit' },
      { label: 'Обхват', value: '2–500 м' },
      { label: 'Тегло', value: '5.5 кг/м²' },
    ],
    highlights: ['Лесен за монтаж', 'Почти невидим', 'Изключително гъвкав'],
    media: [
      { type: 'video', src: '/gallery/crystalFilm_video copy.mp4' },
      { type: 'image', src: '/images/crystalfilm copy.png' },
      { type: 'image', src: '/images/crystalfilm0 copy.jpg' },
    ],
    accent: '#0099CC',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

function Carousel({ media, alt, accent }: { media: MediaItem[]; alt: string; accent: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % media.length), [media.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + media.length) % media.length), [media.length]);

  const safeIndex = media.length > 0 ? index % media.length : 0;
  const current = media[safeIndex];
  if (!current) return null;
  const isVideo = current.type === 'video';

  useEffect(() => {
    if (paused || isVideo) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, isVideo, next]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ aspectRatio: '4 / 3', boxShadow: '0 24px 64px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync" initial={false}>
        {isVideo ? (
          <motion.video
            key={safeIndex}
            src={current.src}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' as const }}
          />
        ) : (
          <motion.img
            key={safeIndex}
            src={current.src}
            alt={`${alt} — снимка ${safeIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' as const }}
          />
        )}
      </AnimatePresence>

      {/* gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 40%)' }}
      />

      {/* arrows */}
      <button
        onClick={prev}
        aria-label="Предишна снимка"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', color: '#111418' }}
      >
        <ChevronLeft size={18} strokeWidth={2.5} />
      </button>
      <button
        onClick={next}
        aria-label="Следваща снимка"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', color: '#111418' }}
      >
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>

      {/* dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {media.map((item, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Медия ${i + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === safeIndex ? 24 : 8,
              height: 8,
              background: i === safeIndex ? accent : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ProductSection({ product, reverse }: { product: Product; reverse: boolean }) {
  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' as const }}
        className={reverse ? 'lg:order-2' : 'lg:order-1'}
      >
        <Carousel media={product.media} alt={product.name} accent={product.accent} />
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' as const, delay: 0.1 }}
        className={reverse ? 'lg:order-1' : 'lg:order-2'}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: product.accent }} />
          <span className="text-xs font-heading font-bold uppercase tracking-[0.18em]" style={{ color: product.accent }}>
            {product.tagline}
          </span>
        </div>

        <h3 className="font-heading font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#111418', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
          {product.name}
        </h3>

        <p className="text-base leading-relaxed mb-8 max-w-lg" style={{ color: '#6B7684' }}>
          {product.description}
        </p>

        {/* specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 pb-8" style={{ borderBottom: '1px solid #ECECEC' }}>
          {product.specs.map((spec) => (
            <div key={spec.label} className="flex flex-col">
              <span className="text-[10px] font-heading font-bold uppercase tracking-wider mb-1" style={{ color: '#9AA3AE' }}>
                {spec.label}
              </span>
              <span className="text-lg font-heading font-bold" style={{ color: '#111418' }}>
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* highlights */}
        <ul className="flex flex-col gap-2.5 mb-8">
          {product.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2.5">
              <span
                className="flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0"
                style={{ background: `${product.accent}15` }}
              >
                <Check size={12} strokeWidth={3} style={{ color: product.accent }} />
              </span>
              <span className="text-sm font-body" style={{ color: '#3B4252' }}>{h}</span>
            </li>
          ))}
        </ul>

        <Link
          to="/contacts"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-heading font-bold transition-all duration-300 hover:scale-[1.03]"
          style={{ background: '#111418', color: '#FFFFFF', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
        >
          Заяви оферта
          <ArrowUpRight size={16} strokeWidth={2.5} />
        </Link>
      </motion.div>
    </div>
  );
}

export default function Products() {
  usePageSeo({
    title: 'Прозрачни LED дисплеи — продукти и спецификации | Търпов Груп',
    description: 'Разгледайте нашето портфолио: P3.91 витринен дисплей, P6.25 фасаден панел, P10 монументален екран. Спецификации, прозрачност до 95%, монтаж в България.',
    path: '/products',
    keywords: 'прозрачен LED дисплей цена, P6.25, P3.91, P10, LED витрина, LED фасада, интериорен LED екран, outdoor LED пано, LED панели спецификации, transparent LED screen specs Bulgaria',
    jsonLd: [
      breadcrumbSchema([BREADCRUMB_HOME, { name: 'Продукти', path: '/products' }]),
    ],
  });

  return (
    <>
      <Navbar />
      <main style={{ background: '#FAFAFA', minHeight: '100vh' }}>
        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28"
          style={{ background: 'linear-gradient(170deg, #0A1628 0%, #0D1E35 55%, #0F2440 100%)' }}
        >
          <motion.div
            className="absolute rounded-full blur-3xl pointer-events-none"
            style={{ width: 600, height: 600, background: 'rgba(0,153,204,0.08)', top: '-20%', left: '-10%' }}
            animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute rounded-full blur-3xl pointer-events-none"
            style={{ width: 400, height: 400, background: 'rgba(0,153,204,0.06)', bottom: '-10%', right: '-5%' }}
            animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          <div className="container-wide section-padding relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <motion.div
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
              >
                <motion.div variants={fadeUp} className="flex items-center gap-2 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                  <span className="text-xs font-heading font-bold uppercase tracking-[0.2em]" style={{ color: '#0099CC' }}>
                    Продуктово портфолио
                  </span>
                </motion.div>
                <motion.h1
                  variants={fadeUp}
                  className="font-heading font-bold text-white text-balance"
                  style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.12, letterSpacing: '-0.02em' }}
                >
                  Технология, която{' '}
                  <span style={{ color: '#00D4FF' }}>преобразява пространства</span>
                </motion.h1>
                <motion.p
                  variants={fadeUp}
                  className="mt-5 text-base leading-relaxed max-w-xl"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  Решения за Вашия бизнес, от луксозна витрина до монументален фасаден екран.
                  Всеки продукт е изпробван, сертифициран и монтиран от нашият екип.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-8">
                  <Link
                    to="/contacts"
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-heading font-bold transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
                    style={{
                      background: '#FFFFFF',
                      boxShadow: '0 4px 24px rgba(0,153,204,0.25)',
                    }}
                  >
                    <span style={{ color: '#0099CC' }}>Заяви безплатна оферта</span>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={2.5}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ color: '#0099CC' }}
                    />
                  </Link>
                  <Link
                    to="/roi-calculator"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-heading font-bold transition-all duration-200 hover:scale-[1.02]"
                    style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    Изчисли ROI
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' as const, delay: 0.2 }}
                className="relative"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl blur-2xl"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(0,153,204,0.25) 0%, transparent 70%)' }}
                />
                <img
                  src="/images/led_transparent1.png"
                  alt="Прозрачен LED панел в интериор"
                  className="relative w-full rounded-2xl"
                  style={{ boxShadow: '0 0 0 1px rgba(0,153,204,0.2), 0 24px 64px rgba(0,0,0,0.5)' }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Product sections ── */}
        <section className="section-padding py-16 lg:py-24">
          <div className="container-wide">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-ink-primary mb-2">
                Нашите продукти:
              </h2>
            </motion.div>

            <div className="flex flex-col gap-20 lg:gap-28">
              {PRODUCTS.map((product, i) => (
                <ProductSection key={product.id} product={product} reverse={i % 2 === 1} />
              ))}
            </div>
          </div>
        </section>

        <ProductSpecs />

        {/* ── Bottom CTA ── */}
        <section className="section-padding py-16 lg:py-20" style={{ background: '#FFFFFF', borderTop: '1px solid #ECECEC' }}>
          <motion.div
            className="container-wide text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-heading font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#1565C0' }}>
              Не сте сигурни кой продукт е подходящ?
            </p>
            <h2 className="font-heading font-bold mb-4 text-balance" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#111418' }}>
              Нашият екип ще ви помогне да изберете
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contacts"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-heading font-bold transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
                style={{ background: '#FFFFFF', boxShadow: '0 4px 24px rgba(124,58,237,0.2)' }}
              >
                <span style={{ display: 'inline-block', background: 'linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Искам консултация
                </span>
                <ArrowUpRight size={16} strokeWidth={2.5} style={{ color: '#7C3AED' }} />
              </Link>
              <Link
                to="/roi-calculator"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-heading font-semibold transition-all duration-200 hover:scale-[1.02]"
                style={{ background: '#F4F6F8', color: '#111418' }}
              >
                ROI Калкулатор
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
