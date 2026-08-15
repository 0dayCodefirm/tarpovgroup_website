import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import ProblemSolution from '../components/home/ProblemSolution';
import ComparisonSection from '../components/home/ComparisonSection';
import HowItWorks from '../components/home/HowItWorks';
import EnergyEfficiency from '../components/home/EnergyEfficiency';
import Showcase from '../components/home/Showcase';
import FAQ from '../components/home/FAQ';
import FinalCTA from '../components/home/FinalCTA';
import { usePageSeo, faqSchema } from '../components/shared/Seo';

const HOME_FAQ = [
  { question: 'Къде мога да закупя прозрачен LED дисплей в България?', answer: 'Търпов Груп внася и монтира прозрачни LED дисплеи в цяла България и Европа, директно от производителя с пълен монтаж и 3-годишна гаранция. Свържете се с нас на +359 88 276 4660 или info@tarpovgroup.com за безплатна оферта.' },
  { question: 'Колко струва прозрачен LED дисплей?', answer: 'Цената зависи от площ (м²), пиксел питч и сложност на монтажа. Най-популярният модел P6.25 е оптимален за витрини. Свържете се с нас за точна оферта по ваша конкретна площ и локация.' },
  { question: 'Може ли прозрачният LED да се монтира на съществуващо стъкло?', answer: 'Да. LED модулите се прикрепят директно върху съществуващото стъкло чрез залепване или алуминиева рамка, без смяна на стъклото.' },
  { question: 'Колко време отнема монтажът на прозрачен LED дисплей?', answer: 'За стандартна витринна инсталация от 1-20 м² монтажът отнема от 3 до 12 часа. По-големи фасадни проекти изискват 1-3 дни.' },
  { question: 'Каква е консумацията на ток на прозрачен LED дисплей?', answer: 'Средната консумация при нормална работа е около 240 W/м². Системата NOVASTAR TB10plus разполага с автоматична яркостна регулация, което намалява реалното потребление с до 40% при нощна работа.' },
  { question: 'Каква гаранция предлагате за прозрачните LED дисплеи?', answer: 'Предлагаме 3-годишна гаранция с сервизно обслужване на място. При повреда отговаряме в рамките на 2 работни часа.' },
  { question: 'Подходящи ли са прозрачните LED панели за открито пространство?', answer: 'Стандартните ни панели с IP43 са за вътрешни и частично защитени пространства. За изцяло открити фасади предоставяме IP65 версии по запитване.' },
];

export default function HomePage() {
  usePageSeo({
    title: 'Прозрачни LED екрани България | Търпов Груп - внос и монтаж',
    description: 'Превърнете стъклото в екран без да губите видимост. Внос и монтаж на прозрачни LED дисплеи в България и Европа. Директно от производителя, 3 год. гаранция, безплатна оферта.',
    path: '/',
    keywords: 'прозрачен LED дисплей, LED витрина, прозрачен екран, LED фасада, transparent LED display Bulgaria, buy transparent LED screen, LED панели България, витринен дисплей, P6.25, P3.9, P10, NOVASTAR, LED монтаж София',
    jsonLd: faqSchema(HOME_FAQ),
  });

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <ComparisonSection />
        <HowItWorks />
        <EnergyEfficiency />
        <Showcase />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
