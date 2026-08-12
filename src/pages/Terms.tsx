import { motion } from 'framer-motion';
import { FileText, Scale } from 'lucide-react';
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
    id: 'general',
    title: '1. Общи положения',
    body: (
      <p>
        Настоящите Общи условия уреждат отношенията между <strong>Търпов Груп ЕООД</strong> (наричано по-долу „Доставчик") и всяко физическо или юридическо лице (наричано по-долу „Клиент"), което използва услугите и/или закупува продуктите, предлагани чрез уебсайта на Доставчика. С използването на сайта или с подаване на запитване, Клиентът приема тези Общи условия в пълния им обем.
      </p>
    ),
  },
  {
    id: 'products',
    title: '2. Продукти и услуги',
    body: (
      <>
        <p>
          Доставчикът предлага прозрачни LED дисплеи, интериорни и екстериорни LED решения, както и свързани услуги по проектиране, доставка и монтаж. Всички технически характеристики, цени и наличности, посочени на сайта, са информативни и не представляват юридически обвързваща оферта.
        </p>
        <p className="mt-3">
          Окончателната оферта се изготвя индивидуално след консултация и анализ на конкретния обект.
        </p>
      </>
    ),
  },
  {
    id: 'orders',
    title: '3. Процес на поръчка',
    body: (
      <>
        <p>Поръчката се реализира в следните етапи:</p>
        <ul className="space-y-2 mt-4">
          <li>Клиентът подава запитване чрез формуляра за контакт, телефон или имейл;</li>
          <li>Доставчикът изготвя индивидуална оферта в срок до 12 работни часа;</li>
          <li>При съгласие се сключва писмен договор и се заплаща аванс;</li>
          <li>Доставка и монтаж на обекта в уговорен срок.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'prices',
    title: '4. Цени и плащане',
    body: (
      <>
        <p>
          Всички цени са в евро (€) и не включват ДДС. Плащанията се извършват по банков път на основание фактура. Стандартните условия за плащане включват аванс от 50% при сключване на договор и остатъкът преди монтажа, освен ако не е договорено друго.
        </p>
        <p className="mt-3">
          Запитванията и консултациите са напълно безплатни и не налагат задължение за покупка.
        </p>
      </>
    ),
  },
  {
    id: 'delivery',
    title: '5. Доставка и монтаж',
    body: (
      <>
        <p>
          Сроковете за доставка зависят от наличността и обема на поръчката. Стандартният срок е между 15 и 45 работни дни от потвърждение на поръчката и авансово плащане.
        </p>
        <p className="mt-3">
          Монтажът се извършва от квалифициран екип на Доставчика на територията на Република България. За обекти извън страната се договаря допълнително.
        </p>
      </>
    ),
  },
  {
    id: 'warranty',
    title: '6. Гаранция и сервиз',
    body: (
      <p>
        Всички продукти са с гаранционен срок от <strong>3 години</strong>, считано от датата на монтажа. Гаранцията покрива производствени дефекти и не се отнася за повреди, причинени от неправилна експлоатация, външни въздействия или неоторизирани намеси. Подробни условия са посочени в документа „Гарантни и сервизни условия", предоставян при сключване на договора.
      </p>
    ),
  },
  {
    id: 'returns',
    title: '7. Връщане и замяна',
    body: (
      <p>
        Продуктите се изготвят/внасят по поръчка на Клиента съгласно неговите конкретни изисквания и поради това не подлежат на връщане или замяна по чл. 55, т. 4 от Закона за защита на потребителите. В случай на констатирован производствен дефект в гаранционния срок, Доставчикът извършва ремонт или замяна без допълнително заплащане.
      </p>
    ),
  },
  {
    id: 'liability',
    title: '8. Отговорност',
    body: (
      <p>
        Доставчикът не носи отговорност за преки или косвени щети, включително загуба на печалба или данни, произтичащи от използване или невъзможност за използване на продуктите, освен в случай на умишълно причиняване на щета или тежка небрежност. Доставчикът не отговаря за съдържание на трети страни, към което евентуално водят линкове от сайта.
      </p>
    ),
  },
  {
    id: 'disputes',
    title: '9. Разрешаване на спорове',
    body: (
      <>
        <p>
          Всички спорове по тези Общи условия се решават чрез преговори между страните. При невъзможност за постигане на съгласие, споровете се разрешават от компетентните съдилища в Република България, освен ако не е договорено друго.
        </p>
        <p className="mt-3">
          Клиентите-потребители могат да използват платформата за онлайн разрешаване на спорове на Европейската комисия (ODR) на адрес ec.europa.eu/consumers/odr.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: '10. Промени в Общите условия',
    body: (
      <p>
        Доставчикът си запазва правото да променя настоящите Общи условия. Актуалната версия е винаги публикувана на тази страница с посочена дата на последна актуализация.
      </p>
    ),
  },
];

export default function Terms() {
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
            <Scale size={28} className="text-brand-cyan-dark" />
          </motion.div>
          <motion.h1
            className="section-heading text-4xl sm:text-5xl mb-4"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.05 }}
          >
            Общи{' '}
            <span className="text-gradient-cyan">условия</span>
          </motion.h1>
          <motion.p
            className="text-ink-secondary text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.15 }}
          >
            Условията за ползване на услугите и продуктите на Търпов Груп ЕООД.
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
