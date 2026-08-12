import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, MessageCircle, Sparkles } from 'lucide-react';
import DecorBackground from '../shared/DecorBackground';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Колко струва прозрачен LED дисплей?',
    answer: (
      <>
        <p className="mb-3">
          Цената зависи от три основни фактора: площ (м²), пиксел питч (pixel pitch) и сложност
          на монтажа. По-малкият пиксел питч означава по-гъста честота на пикселите, по-висока
          резолюция и по-висока цена на м², затова всичко е строго конкретно. Свържете се с нас, за да Ви дадем точна оферта.
        </p>
        
      </>
    ),
  },
  {
    question: 'Колко време отнема монтажът?',
    answer: (
      <p>
        За стандартна витринна инсталация от 1-20 м² монтажът отнема{' '}
        <span className="font-heading font-semibold text-brand-cyan-dark">от 3 до 12 часа`</span>.
        По-големи фасадни проекти изискват 1–3 дни. Обектът не спира работа по време
        на инсталацията.
      </p>
    ),
  },
  {
    question: 'Може ли да се монтира на съществуваща стъклена витрина?',
    answer: (
      <p>
        Да. Прозрачните LED модули се{' '}
        <span className="font-heading font-semibold text-brand-cyan-dark">прикрепят директно</span>
        {' '}върху съществуващото стъкло чрез залеппяне или алуминиева конструктивна рамка,
        без смяна на стъклото. Необходима е свободна повърхност без нанесени фолия.
      </p>
    ),
  },
  
  {
    question: 'Каква е консумацията на ток?',
    answer: (
      <>
        <p className="mb-3">
          Средната консумация при нормална работа е около{' '}
          <span className="font-heading font-semibold text-brand-cyan-dark">240 W/м²</span>.
        </p>
        <p>
          Пример: витрина от <strong className="text-ink-primary">20 м²</strong> консумира
          средно 5 kW. Системата NOVASTAR TB10plus разполага с автоматична яркостна регулация,
          което намалява реалното потребление с до 40% при нощна работа.
        </p>
      </>
    ),
  },
  {
    question: 'Как се управлява съдържанието?',
    answer: (
      <>
        <p className="mb-3">
          Стандартната ни инсталация включва контролер{' '}
          <span className="font-heading font-semibold text-brand-cyan-dark">NOVASTAR TB10plus</span>.
          Свързваме го към Вашата Wi-Fi мрежа и от приложение, което ще свалим на Вашето устройство. Имате опции за:
        </p>
        <ul className="list-none space-y-1.5 text-ink-secondary">
          {[
            'Качване на видео, изображения и текст от смартфон, таблет или PC',
            'Планиране на кампании по дата и час',
            'Дистанционна регулация на яркостта',
            'Мониторинг на температура и статус на панелите',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="cyan-dot mt-1.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    question: 'Какво се случва при повреда?',
    answer: (
      <>
        <p className="mb-3">
          При повреда в рамките на{' '}
          <span className="font-heading font-semibold text-brand-cyan-dark">3-годишната гаранция</span>:
        </p>
        <ul className="list-none space-y-2 mb-3 text-ink-secondary">
          {[
            'Свързвате се с нас по телефон или имейл',
            'Нашият екип отговаря в рамките на 2 работни часа',
            'Организираме сервизно посещение на място',
            'Дефектният модул се ремонтира / сменя',
            'Според повредата, правим поръчка на резервни части',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="cyan-dot mt-1.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    question: 'Подходящи ли са за открито пространство?',
    answer: (
      <>
        <p className="mb-3">
          Стандартните ни панели с IP43 са предназначени за{' '}
          <span className="font-heading font-semibold text-brand-cyan-dark">
            вътрешни и частично защитени
          </span>{' '}
          пространства като витрини, покрити входове, атриуми, изложбени зали.
        </p>
        <p>
          За изцяло открити фасади предоставяме{' '}
          <span className="font-heading font-semibold text-brand-cyan-dark">IP65 версии</span> по
          запитване. Свържете се с нас, за да оценим различните фактори.
        </p>
      </>
    ),
  },
];

const answerVariants = {
  hidden: { opacity: 0, height: 0, marginTop: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    marginTop: 16,
    transition: { duration: 0.35, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: { duration: 0.25, ease: 'easeIn' as const },
  },
};

function AccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: 'easeOut' as const, delay: Math.min(index * 0.05, 0.3) }}
      className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${
        isOpen
          ? 'border-brand-cyan/30 shadow-[0_4px_24px_rgba(0,153,204,0.08)]'
          : 'border-surface-border hover:border-brand-cyan/20 hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)]'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left group"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span
          className={`font-heading font-semibold text-sm sm:text-base leading-snug transition-colors duration-200 ${
            isOpen ? 'text-brand-cyan-dark' : 'text-ink-primary group-hover:text-brand-cyan-dark'
          }`}
        >
          {item.question}
        </span>
        <motion.div
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200"
          style={{ background: isOpen ? 'rgba(0,153,204,0.12)' : '#F4F6F8' }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' as const }}
          aria-hidden="true"
        >
          {isOpen ? (
            <Minus size={14} strokeWidth={2.5} className="text-brand-cyan-dark" />
          ) : (
            <Plus size={14} strokeWidth={2.5} className="text-brand-cyan-dark" />
          )}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            variants={answerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            <div
              className="px-5 sm:px-6 pb-6 text-sm font-body text-ink-secondary leading-relaxed border-l-2 border-brand-cyan/20 ml-5 sm:ml-6"
              style={{ paddingLeft: 'calc(1.25rem + 0.5rem)' }}
            >
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
      id="faq"
      className="section-padding py-14 lg:py-16 relative overflow-hidden bg-mesh-soft"
    >
      <DecorBackground variant="mixed" />

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 lg:gap-16 items-start">

          {/* ── Left column: heading + subtext ── */}
          <motion.div
            className="flex flex-col items-start lg:sticky lg:top-28"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Eyebrow pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-surface-border mb-6">
              <HelpCircle size={14} className="text-brand-cyan-dark" />
              <span className="eyebrow">Чести въпроси</span>
            </div>

            <h2
              className="section-heading text-balance text-left mb-4"
              style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)' }}
            >
              Имате въпроси?
            </h2>

            <p className="text-ink-secondary text-base leading-relaxed text-left mb-10 lg:mb-12" style={{ maxWidth: 360 }}>
              Всичко, което трябва да знаете за прозрачните LED дисплеи —
              цени, монтаж, поддръжка и спецификации.
            </p>

            {/* "Не намерихте отговора" card — desktop only here, mobile shows it below accordion */}
            <motion.div
              className="hidden lg:block w-full"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="relative bg-gradient-to-br from-brand-cyan-dark to-brand-cyan-deep rounded-2xl p-7 overflow-hidden">
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3), transparent 50%)',
                  }}
                  animate={{ x: [0, 30, 0], opacity: [0.15, 0.25, 0.15] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="relative z-10">
                  <Sparkles size={22} className="text-white/90 mb-3" />
                  <p className="text-white font-heading font-semibold text-base mb-1 leading-snug">
                    Не намерихте отговора,<br />който търсите?
                  </p>
                  <p className="text-white/75 text-sm mb-5 leading-relaxed">
                    Нашият екип е насреща да отговори на всеки Ваш въпрос.
                  </p>
                  <Link
                    to="/contacts"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-cyan-dark font-heading font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:scale-105"
                  >
                    <MessageCircle size={16} />
                    Задайте въпрос директно
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right column: accordion ── */}
          <div className="flex flex-col gap-3" role="list" aria-label="Чести въпроси">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                index={i}
              />
            ))}

            {/* "Не намерихте отговора" card — mobile only, below the questions */}
            <motion.div
              className="lg:hidden w-full mt-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="relative bg-gradient-to-br from-brand-cyan-dark to-brand-cyan-deep rounded-2xl p-7 overflow-hidden">
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3), transparent 50%)',
                  }}
                  animate={{ x: [0, 30, 0], opacity: [0.15, 0.25, 0.15] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="relative z-10">
                  <Sparkles size={22} className="text-white/90 mb-3" />
                  <p className="text-white font-heading font-semibold text-base mb-1 leading-snug">
                    Не намерихте отговора,<br />който търсите?
                  </p>
                  <p className="text-white/75 text-sm mb-5 leading-relaxed">
                    Нашият екип е насреща да отговори на всеки Ваш въпрос.
                  </p>
                  <Link
                    to="/contacts"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-cyan-dark font-heading font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:scale-105"
                  >
                    <MessageCircle size={16} />
                    Задайте въпрос директно
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
