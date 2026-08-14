import { motion } from 'framer-motion';
import { Cookie, FileText } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DecorBackground from '../components/shared/DecorBackground';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const lastUpdated = '27 юли 2026 г.';

const sections = [
  {
    id: 'what-are-cookies',
    title: '1. Какво са бисквитките',
    body: (
      <p>
        Бисквитките (cookies) са малки текстови файлове, които уебсайтът запазва във Вашия браузър. Те позволяват на сайта да запаметява информация за Вашето посещение — например Вашия избор относно бисквитките — за да работи коректно при следващо посещение.
      </p>
    ),
  },
  {
    id: 'which-cookies',
    title: '2. Кои бисквитки използваме',
    body: (
      <>
        <p>Нашият уебсайт използва само <strong>строго необходими бисквитки</strong>:</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border border-surface-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-surface-soft text-left">
                <th className="px-4 py-2.5 font-heading font-semibold text-ink-primary">Бисквитка</th>
                <th className="px-4 py-2.5 font-heading font-semibold text-ink-primary">Цел</th>
                <th className="px-4 py-2.5 font-heading font-semibold text-ink-primary">Срок</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              <tr>
                <td className="px-4 py-2.5 font-medium text-ink-primary">cookie_consent</td>
                <td className="px-4 py-2.5 text-ink-secondary">Запаметява Вашия избор относно бисквитките</td>
                <td className="px-4 py-2.5 text-ink-secondary">12 месеца</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-medium text-ink-primary">session_token</td>
                <td className="px-4 py-2.5 text-ink-secondary">Поддържа сесията при зареждане на страниците</td>
                <td className="px-4 py-2.5 text-ink-secondary">До затваряне на браузъра</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          Не използваме бисквитки за проследяване (tracking), маркетинг или профилиране, нито инструменти за анализ на трети страни като Google Analytics, Facebook Pixel или подобни.
        </p>
      </>
    ),
  },
  {
    id: 'management',
    title: '3. Управление на бисквитките',
    body: (
      <>
        <p>
          Тъй като използваме само технически необходими бисквитки, те не могат да бъдат отказани, без това да наруши нормалната работа на сайта. Можете обаче да изтриете всички бисквитки по всяко време чрез настройките на Вашия браузър.
        </p>
        <ul className="space-y-2 mt-4">
          <li>Google Chrome — Настройки → Поверителност и сигурност → Бисквитки</li>
          <li>Mozilla Firefox — Настройки → Поверителност и сигурност → Бисквитки</li>
          <li>Safari — Настройки → Поверителност → Управление на данните</li>
          <li>Microsoft Edge — Настройки → Бисквитки и разрешения</li>
        </ul>
      </>
    ),
  },
  {
    id: 'rights',
    title: '4. Вашите права',
    body: (
      <p>
        Съгласно Регламент (ЕС) 2016/679 (GDPR) имате право на достъп, корекция и изтриване на данните, свързани с Вас. За всички въпроси относно бисквитките и личните данни можете да се свържете с нас на info@tarpovgroup.com.
      </p>
    ),
  },
];

export default function Cookies() {
  return (
    <div className="min-h-screen bg-surface-white">
      <Navbar />

      <section className="pt-32 pb-16 relative overflow-hidden bg-mesh">
        <DecorBackground variant="cyan" />
        <div className="container-wide section-padding text-center relative z-10">
          <motion.div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-cyan/10 mb-5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' as const }}
          >
            <Cookie size={28} className="text-brand-cyan-dark" />
          </motion.div>
          <motion.h1
            className="section-heading text-4xl sm:text-5xl mb-4"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.05 }}
          >
            Политика за{' '}
            <span className="text-gradient-cyan">бисквитки</span>
          </motion.h1>
          <motion.p
            className="text-ink-secondary text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.15 }}
          >
            Как нашият уебсайт използва бисквитки и как можете да ги управлявате.
          </motion.p>
          <motion.p
            className="text-xs text-ink-muted mt-5"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.25 }}
          >
            <FileText size={13} className="inline mr-1.5 -mt-0.5 text-brand-cyan-dark" />
            Последна актуализация: {lastUpdated}
          </motion.p>
        </div>
      </section>

      <section className="py-16 section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-4 gap-10">
            <motion.aside
              className="hidden lg:block"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="sticky top-28">
                <h2 className="font-heading font-semibold text-sm text-ink-muted uppercase tracking-wider mb-4">
                  Съдържание
                </h2>
                <nav>
                  <ul className="space-y-2 border-l border-surface-border">
                    {sections.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="block pl-4 py-1 text-sm text-ink-secondary hover:text-brand-cyan-dark -ml-px transition-colors duration-200"
                        >
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </motion.aside>

            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-10">
                {sections.map((s) => (
                  <article key={s.id} id={s.id} className="scroll-mt-28">
                    <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink-primary mb-4">
                      {s.title}
                    </h2>
                    <div className="text-ink-secondary leading-relaxed space-y-3 text-[15px]">
                      {s.body}
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
