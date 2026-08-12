import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wrench, Factory, Hammer, Award, type LucideIcon } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DecorBackground from '../components/shared/DecorBackground';
import { usePageSeo, breadcrumbSchema, BREADCRUMB_HOME } from '../components/shared/Seo';
import factoryImg from './factory.jpg';
import factory0Img from './factory0.jpg';
import factory1Img from './factory1.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const pillars: { icon: LucideIcon; title: string; description: string; color: string }[] = [
  {
    icon: Wrench,
    title: 'Технически опит',
    description:
      'Разбираме технологията в дълбочина, затова Ви консултираме според Вашия конкретен случай.',
    color: 'bg-brand-cyan/10 text-brand-cyan-dark',
  },
  {
    icon: Factory,
    title: 'Директно партньорство',
    description:
      'Работим директно с фабрика, а не с дистрибутор или посредник. Това ни дава достъп до актуалните модели, заводски цени и директна комуникация за custom-поръчки.',
    color: 'bg-brand-emerald/10 text-brand-emerald-dark',
  },
  {
    icon: Hammer,
    title: 'Локален монтаж',
    description:
      'Нашият екип в България извършва монтажа, пуска системата и осигурява продължителна поддръжка. Локална реакция до 12 часа.',
    color: 'bg-brand-amber/10 text-brand-amber-dark',
  },
];

export default function About() {
  usePageSeo({
    title: 'За нас — Търпов Груп | LED експерти с 3 год. гаранция',
    description: 'Търпов Груп е българска компания за внос и монтаж на прозрачни LED дисплеи. Директно от производителя, квалифициран екип, 3-годишна гаранция и сервиз на място в цяла България.',
    path: '/about',
    keywords: 'Търпов Груп, Tarpov Group, за нас LED компания България, прозрачен LED доставчик, LED монтаж компания София',
    jsonLd: breadcrumbSchema([BREADCRUMB_HOME, { name: 'За нас', path: '/about' }]),
  });

  return (
    <div className="min-h-screen bg-surface-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-mesh">
        <DecorBackground variant="cyan" />
        <div className="container-wide section-padding text-center relative z-10">
          <motion.p
            className="eyebrow mb-4"
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            Запознайте се с нас
          </motion.p>
          <motion.h1
            className="section-heading text-4xl sm:text-5xl mb-5"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
          >
            За{' '}
            <span className="text-gradient-cyan">Търпов Груп</span>
          </motion.h1>
          <motion.p
            className="text-ink-secondary text-lg leading-relaxed max-w-2xl mx-auto"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
          >
            Свързваме българския пазар с водещите технологии в сферата на прозрачните LED дисплеи в световен мащаб.
          </motion.p>
        </div>
      </section>

      {/* Company story */}
      <section className="py-20 section-padding bg-surface-soft">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
            >
              <p className="eyebrow mb-3">Нашата история</p>
              <h2 className="section-heading text-3xl sm:text-4xl mb-6">
                От фабриката до{' '}
                <span className="text-gradient-cyan">Вашата витрина</span>
              </h2>
              <div className="space-y-4 text-ink-secondary leading-relaxed">
                <p>
                  Ние сме екип от ентусиазирани професионалисти в бизнеса и LED екраните и искаме технологията на бъдещето - прозрачните екрани да бъде все по-достъпна за стандартния потребител, както и да направим света около нас едно по-добро и технологично-напреднало място.
                </p>
                <p>
                  Целим се всеки наш клиент да получи{' '}
                  <strong className="text-ink-primary">лично отношение</strong>, бутикови решения за неговия бизнес и постоянно съдействие от първия разговор до монтираните екрани и употребата им. 

                </p>
                <p>
                  Как ще подобрим света ли?{' '}
                  <strong className="text-ink-primary">Опазваме околната среда </strong> чрез масовата употреба на нашите панели, които консумират до 60% по-малко енергия и електричество в сравнение със стандартните LED екрани. Също така, поради ниското им тегло и малкия им обем, в пъти по-малко гориво бива използвано за транспорт. 

                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: 'easeOut' as const }}
            >
              <div className="rounded-2xl overflow-hidden border border-surface-border glow-cyan">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=900"
                  alt="Екип на Търпов Груп по време на монтаж"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="py-20 section-padding relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <p className="eyebrow mb-3">Нашият подход</p>
            <h2 className="section-heading text-3xl sm:text-4xl mx-auto max-w-2xl">
              Три стълба, върху които{' '}
              <span className="text-gradient-cyan">градим доверие</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  variants={fadeUp}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl border border-surface-border p-8 group transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${pillar.color} transition-transform duration-200 group-hover:scale-110`}>
                    <Icon size={24} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-heading font-bold text-ink-primary text-lg mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-ink-secondary leading-relaxed text-sm">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Factory Gallery */}
      <section className="py-20 section-padding bg-surface-soft">
        <div className="container-wide">
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <h2 className="font-heading font-bold text-ink-primary text-2xl sm:text-3xl tracking-tight">
              Зад кадър
            </h2>
            <div className="mx-auto mt-3 h-px w-12 bg-brand-cyan-dark/40 rounded-full" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          >
            {[
              { src: factoryImg, alt: 'Производствена зала с прозрачни LED дисплеи' },
              { src: factory0Img, alt: 'Фабрика за LED дисплеи — монтажна площ' },
              { src: factory1Img, alt: 'Производствена линия за LED модули' },
            ].map((img) => (
              <motion.div
                key={img.src}
                variants={fadeUp}
                className="overflow-hidden rounded-2xl border border-surface-border bg-white shadow-sm hover:shadow-md transition-shadow duration-300 group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 section-padding bg-surface-soft relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(0, 153, 204, 0.06)' }}
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
            className="mx-auto max-w-3xl bg-white rounded-2xl border border-surface-border p-10 text-center"
          >
            <Award size={32} className="text-brand-cyan-dark mx-auto mb-4" />
            <h2 className="section-heading text-2xl sm:text-3xl mb-3">
              Готови ли сте да{' '}
              <span className="text-gradient-cyan">трансформирате</span>{' '}
              пространството си?
            </h2>
            <p className="text-ink-secondary mb-7 max-w-lg mx-auto">
              Свържете се с нас за безплатна консултация и оферта за Вашия проект.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contacts" className="btn-primary">
                Свържете се с нас
              </Link>
              <a href="/#specs" className="btn-secondary">
                Разгледайте продуктите
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
