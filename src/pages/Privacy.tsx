import { motion } from 'framer-motion';
import { Shield, Mail, FileText, Lock, Eye, Trash2, Edit3, Download, AlertCircle, Phone } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DecorBackground from '../components/shared/DecorBackground';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const lastUpdated = '27 юли 2026 г.';

type Section = {
  id: string;
  title: string;
  body: React.ReactNode;
};

const sections: Section[] = [
  {
    id: 'controller',
    title: '1. Администратор на лични данни',
    body: (
      <p>
        Администратор на лични данни по смисъла на Регламент (ЕС) 2016/679 (GDPR) и
        Закона за защита на личните данните (ЗЗЛД) е <strong>Търпов Груп ЕООД</strong>,
        наричано по-долу „Ние" или „Администратор". Ние носим отговорност за обработката
        на Вашите лични данни и за спазването на законовите изисквания.
      </p>
    ),
  },
  {
    id: 'what-we-collect',
    title: '2. Какви лични данни събираме',
    body: (
      <>
        <p>Събираме следните категории лични данни, когато попълните формуляра за контакт на нашия уебсайт:</p>
        <ul className="space-y-2 mt-4">
          <li><strong>Име и фамилия</strong> — за лично обръщение към Вас;</li>
          <li><strong>Име на компания</strong> — за контекст на запитването;</li>
          <li><strong>Телефонен номер</strong> — за оперативна комуникация;</li>
          <li><strong>Имейл адрес</strong> — за изпращане на отговор и оферта;</li>
          <li><strong>Тип проект и приблизителна площ</strong> — за подготовка на адекватна оферта;</li>
          <li><strong>Текст на съобщението</strong> — допълнителна информация, която ни предоставяте.</li>
        </ul>
        <p className="mt-4">
          Не събираме специални категории лични данни (здравословно състояние,
          религиозни убеждения, биометрични данни и др.).
        </p>
      </>
    ),
  },
  {
    id: 'purposes',
    title: '3. Цели на обработката',
    body: (
      <>
        <p>Вашите лични данни се обработват единствено за следните цели:</p>
        <ul className="space-y-2 mt-4">
          <li>Отговаряне на Вашето запитване и предоставяне на информация за нашите продукти и услуги;</li>
          <li>Подготовка и изпращане на индивидуална оферта за проект;</li>
          <li>Оперативна комуникация във връзка с конкретно запитване;</li>
          <li>Поддържане на търговска кореспонденция при сключен договор.</li>
        </ul>
        <p className="mt-4">
          Не използваме Вашите данни за маркетингови цели без Вашето изрично съгласие.
        </p>
      </>
    ),
  },
  {
    id: 'legal-basis',
    title: '4. Правно основание за обработката',
    body: (
      <>
        <p>Обработката на личните данни се основава на следните правни основания съгласно чл. 6 от GDPR:</p>
        <ul className="space-y-2 mt-4">
          <li>
            <strong>Съгласие (чл. 6, ал. 1, буква „а")</strong> — предоставяте данните си доброволно чрез
            попълване и изпращане на формуляра за контакт;
          </li>
          <li>
            <strong>Преддоговорни мерки (чл. 6, ал. 1, буква „б")</strong> — обработката е необходима за
            предприемане на стъпки по Ваша молба преди сключване на договор (подготовка на оферта);
          </li>
          <li>
            <strong>Правно задължение (чл. 6, ал. 1, буква „в")</strong> — при необходимост от съхранение на
            данни съгласно Закона за счетоводството и Данъчно-осигурителния кодекс.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'recipients',
    title: '5. С кого споделяме Вашите данни',
    body: (
      <>
        <p>
          Ние не продаваме, не отдаваме под наем и не търгуваме с Вашите лични данни.
          Данните се споделят само в следните случаи:
        </p>
        <ul className="space-y-2 mt-4">
          <li>С <strong>обработващи</strong> — външни услуги, които ни помагат да оперираме (напр. имейл доставчик, IT хостинг), работещи по договор и обвързани с конфиденциалност;</li>
          <li>С <strong>държавни органи</strong> — когато това е предписано от закона (напр. НАП, компетентни разследващи органи);</li>
          <li>С <strong>партньори по монтаж</strong> — единствено при Ваше изрично съгласие и само данните, необходими за изпълнение на конкретен проект.</li>
        </ul>
        <p className="mt-4">
          Данните се обработват на територията на Европейската икономическа зона (ЕИЗ). При всяко
          предаване на данни към трети държави се прилагат подходящи гаранции съгласно чл. 44–49 от GDPR.
        </p>
      </>
    ),
  },
  {
    id: 'retention',
    title: '6. Срокове за съхранение',
    body: (
      <>
        <p>Съхраняваме Вашите лични данни само толкова дълго, колкото е необходимо за целите, за които са събрани:</p>
        <ul className="space-y-2 mt-4">
          <li><strong>Запитвания без сключен договор</strong> — до 24 месеца от последна кореспонденция;</li>
          <li><strong>При сключен договор</strong> — за срока на договора и след това съгласно законовите изисквания за счетоводни документи (обикновено 5 години);</li>
          <li><strong>Маркетингово съгласие</strong> — до оттегляне на съгласието.</li>
        </ul>
        <p className="mt-4">
          След изтичане на срока данните се изтриват или анонимизират.
        </p>
      </>
    ),
  },
  {
    id: 'rights',
    title: '7. Вашите права',
    body: (
      <>
        <p>Съгласно GDPR и ЗЗЛД разполагате със следните права:</p>
        <div className="grid sm:grid-cols-2 gap-4 mt-5">
          {[
            { icon: Eye, title: 'Право на достъп', desc: 'Да получите информация кои Ваши данни обработваме и за каква цел.' },
            { icon: Edit3, title: 'Право на корекция', desc: 'Да поискате поправяне на неточни или непълни данни.' },
            { icon: Trash2, title: 'Право на изтриване', desc: 'Да поискате изтриване на данните Ви („право да бъдете забравени").' },
            { icon: Download, title: 'Право на преносимост', desc: 'Да получите данните си в структуриран, четим формат.' },
            { icon: Lock, title: 'Право на ограничаване', desc: 'Да поискате временно ограничаване на обработката.' },
            { icon: AlertCircle, title: 'Право на възражение', desc: 'Да възразите срещу обработката при конкретни причини.' },
          ].map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.title} className="flex items-start gap-3 p-4 rounded-xl bg-surface-soft border border-surface-border">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-brand-cyan/10">
                  <Icon size={18} className="text-brand-cyan-dark" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm text-ink-primary mb-1">{r.title}</h3>
                  <p className="text-xs text-ink-secondary leading-relaxed">{r.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-5">
          Имате право да оттеглите съгласието си по всяко време, без това да засяга
          законосъобразността на обработката до момента на оттегляне.
        </p>
        <p className="mt-3">
          Имате право да подадете жалба до <strong>Комисията за защита на личните данни (КЗЛД)</strong> —
          гр. София 1592, бул. „Проф. Цветодимиров" № 2, е-mail: kzld@cpdp.bg, www.cpdp.bg.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: '8. Бисквитки (Cookies)',
    body: (
      <>
        <p>
          Нашият уебсайт използва само <strong>технически необходими бисквитки</strong>, които осигуряват
          нормалното функциониране на сайта и запаметяват Вашия избор относно бисквитките.
          Тези бисквитки не съдържат лични данни и са необходими за работата на сайта.
        </p>
        <p className="mt-4">
          Не използваме бисквитки за проследяване (tracking cookies), маркетинг или
          профилиране, нито инструменти за анализ на трети страни (напр. Google Analytics).
        </p>
      </>
    ),
  },
  {
    id: 'security',
    title: '9. Сигурност на данните',
    body: (
      <p>
        Прилагаме подходящи технически и организационни мерки за защита на Вашите лични данни
        срещу неупълномощен достъп, загуба или злоупотреба — включително ограничен достъп до данните,
        криптирани връзки (HTTPS) и вътрешни правила за работа с лична информация. Достъп до данните
        имат само упълномощени служители, които се нуждаят от тях за изпълнение на своите задължения.
      </p>
    ),
  },
  {
    id: 'changes',
    title: '10. Промени в политиката',
    body: (
      <p>
        Настоящата политика може да бъде актуализирана при промени в законодателството или в начина,
        по който обработваме данни. Актуалната версия винаги ще бъде публикувана на тази страница с
        посочена дата на последна актуализация.
      </p>
    ),
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-surface-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-mesh">
        <DecorBackground variant="cyan" />
        <div className="container-wide section-padding text-center relative z-10">
          <motion.div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-cyan/10 mb-5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' as const }}
          >
            <Shield size={28} className="text-brand-cyan-dark" />
          </motion.div>
          <motion.h1
            className="section-heading text-4xl sm:text-5xl mb-4"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.05 }}
          >
            Политика за{' '}
            <span className="text-gradient-cyan">поверителност</span>
          </motion.h1>
          <motion.p
            className="text-ink-secondary text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.15 }}
          >
            Търпов Груп ЕООД поема отговорност за защитата на Вашите лични данни в съответствие
            с Регламент (ЕС) 2016/679 (GDPR) и Закона за защита на личните данните.
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

      {/* Content */}
      <section className="py-16 section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-4 gap-10">

            {/* Sticky table of contents */}
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
                          className="block pl-4 py-1 text-sm text-ink-secondary hover:text-brand-cyan-dark hover:border-l-2 hover:border-brand-cyan-dark -ml-px transition-colors duration-200"
                        >
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Contact card */}
                <div className="mt-8 p-5 rounded-xl bg-surface-soft border border-surface-border">
                  <h3 className="font-heading font-semibold text-sm text-ink-primary mb-3">
                    Въпроси относно данните?
                  </h3>
                  <ul className="space-y-2.5">
                    <li>
                      <a href="mailto:info@tarpovgroup.com" className="flex items-center gap-2 text-sm text-ink-secondary hover:text-brand-cyan-dark transition-colors">
                        <Mail size={15} className="text-brand-cyan-dark flex-shrink-0" />
                        info@tarpovgroup.com
                      </a>
                    </li>
                    <li>
                      <a href="tel:+359882764660" className="flex items-center gap-2 text-sm text-ink-secondary hover:text-brand-cyan-dark transition-colors">
                        <Phone size={15} className="text-brand-cyan-dark flex-shrink-0" />
                        +359 88 276 4660
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.aside>

            {/* Article body */}
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

              {/* Bottom contact CTA */}
              <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-brand-cyan/5 to-transparent border border-surface-border text-center">
                <h2 className="font-heading font-bold text-lg text-ink-primary mb-2">
                  Свържете се с нас
                </h2>
                <p className="text-sm text-ink-secondary mb-4 max-w-md mx-auto">
                  Ако имате въпроси относно защитата на Вашите лични данни, не се колебайте да ни потърсите.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="mailto:info@tarpovgroup.com"
                    className="btn-primary"
                  >
                    <Mail size={16} />
                    Пишете ни
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
