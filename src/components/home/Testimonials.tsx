import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  position: string;
  company: string;
  photo: string;
  rating: number;
  industry: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      '„Изключително съм доволен от работата ми с Търпов Груп. Много професионално отношение, специално внимание към детайла и към изискванията на клиента. Препоръчвам!"',
    name: 'Виктор Георгиев',
    position: 'Собственик на магазин',
    company: '',
    photo: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=160',
    rating: 5,
    industry: 'Магазинерство',
  },
  {
    quote:
      '„Инвестицията се изплати по-бързо, отколкото очаквахме. Екипът на Търпов Груп беше изключително професионален от проектирането до финалния монтаж."',
    name: 'Илиян Стоилов',
    position: 'Директор проекти',
    company: '',
    photo: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=160',
    rating: 5,
    industry: 'Хотелиерство',
  },
  {
    quote:
      '„Със сигурност бихме Ви използвали отново за подобни проекти в бъдеще. Лед екраните са доста впечатляващи, особено на живо. Бърза, лесна и чиста работа"',
    name: 'Виктория Павлова',
    position: 'Търговски директор',
    company: '',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=160',
    rating: 5,
    industry: 'Корпоративни офиси',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} от 5 звезди`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          strokeWidth={0}
          fill={i < count ? '#F6AE04' : '#E8ECF0'}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl border border-surface-border p-7 flex flex-col gap-5 group transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
    >
      <div>
        <span className="spec-chip">{t.industry}</span>
      </div>

      <Stars count={t.rating} />

      <blockquote className="text-sm leading-relaxed text-ink-secondary font-body flex-1">
        {t.quote}
      </blockquote>

      <div className="flex items-center gap-3 pt-4 border-t border-surface-border">
        <img
          src={t.photo}
          alt={`Снимка на ${t.name}`}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          loading="lazy"
        />
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-heading font-semibold text-ink-primary">{t.name}</span>
          <span className="text-xs font-body text-ink-muted">
            {t.position} · <span className="text-brand-cyan-dark">{t.company}</span>
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding py-14 lg:py-16 bg-surface-white">
      <div className="container-wide">
        <motion.div
          className="text-center mb-12 max-w-2xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.p variants={fadeUp} className="eyebrow mb-3">
            Клиентски отзиви
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="section-heading text-balance"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            Какво казват нашите клиенти:
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} strokeWidth={0} fill="#F6AE04" />
            ))}
          </div>
          <p className="text-sm font-body text-ink-muted">
            <span className="font-heading font-semibold text-ink-primary">4.9</span>
            {' '}средна оценка от над 12 отзива
          </p>
        </motion.div>
      </div>
    </section>
  );
}
