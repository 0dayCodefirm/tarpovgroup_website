import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  Mail,
  Phone,
  Send,
  Shield,
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DecorBackground from '../components/shared/DecorBackground';
import { usePageSeo, breadcrumbSchema, BREADCRUMB_HOME } from '../components/shared/Seo';

const WEB3FORMS_ACCESS_KEY = '13cd8220-a4f3-46f9-8440-bd67021a589f';

interface FormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  projectType: string;
  area: string;
  message: string;
}

const initialForm: FormData = {
  name: '',
  company: '',
  phone: '',
  email: '',
  projectType: '',
  area: '',
  message: '',
};

const projectTypes = [
  'Търговска витрина',
  'Корпоративен лоби',
  'Изложбен щанд',
  'Архитектурна фасада',
  'Друго',
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

function InputField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-heading font-medium text-ink-secondary">
        {label}
        {required && <span className="text-brand-cyan-dark ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-surface-border bg-white text-ink-primary text-sm placeholder:text-ink-muted focus:outline-none focus:border-brand-cyan-dark focus:ring-2 focus:ring-brand-cyan/20 transition-all duration-200';

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' as const }}
      className="flex flex-col items-center justify-center py-14 px-8 text-center"
    >
      <motion.div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-5 bg-brand-emerald/10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
      >
        <CheckCircle2 size={32} className="text-brand-emerald-dark" strokeWidth={2} />
      </motion.div>
      <h3 className="font-heading font-bold text-ink-primary text-xl mb-2">
        Запитването е изпратено!
      </h3>
      <p className="text-ink-secondary leading-relaxed max-w-xs">
        Ще се свържем с Вас до{' '}
        <strong className="text-brand-cyan-dark">12 часа!</strong>
      </p>
    </motion.div>
  );
}

export default function Contacts() {
  usePageSeo({
    title: 'Контакти — безплатна оферта за прозрачен LED дисплей | Търпов Груп',
    description: 'Свържете се с Търпов Груп за безплатна консултация и оферта за прозрачен LED дисплей. Телефон: +359 88 276 4660, имейл: info@tarpovgroup.com. Монтаж в цяла България и Европа.',
    path: '/contacts',
    keywords: 'прозрачен LED дисплей оферта, LED витрина цена, контакт LED монтаж България, безплатна консултация LED екран, Търпов Груп контакти',
    jsonLd: breadcrumbSchema([BREADCRUMB_HOME, { name: 'Контакти', path: '/contacts' }]),
  });

  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  function validate(): boolean {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = 'Полето е задължително';
    if (!form.phone.trim()) errs.phone = 'Полето е задължително';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      errs.email = 'Въведете валиден имейл';
    if (!form.projectType) errs.projectType = 'Изберете тип проект';
    if (!form.message.trim()) errs.message = 'Полето е задължително';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'Ново запитване от tarpovgroup.com',
          name: form.name,
          company: form.company,
          phone: form.phone,
          email: form.email,
          project_type: form.projectType,
          area: form.area,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setSubmitError('Възникна грешка при изпращането. Моля, опитайте отново или ни се обадете директно.');
      }
    } catch (err) {
      setSubmitError('Възникна грешка при връзката. Моля, опитайте отново или ни се обадете директно.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-surface-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-mesh">
        <DecorBackground variant="cyan" />
        <div className="container-wide section-padding text-center relative z-10">
          <motion.p
            className="eyebrow mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
          >
            Контакти
          </motion.p>
          <motion.h1
            className="section-heading text-4xl sm:text-5xl mb-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const, delay: 0.1 }}
          >
            Свържете се{' '}
            <span className="text-gradient-cyan">с нас</span>
          </motion.h1>
          <motion.p
            className="text-ink-secondary text-lg leading-relaxed max-w-xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const, delay: 0.2 }}
          >
            Отговаряме в рамките на{' '}
            <strong className="text-ink-primary"> 12часа</strong>. Безплатна консултация
            за всеки проект.
          </motion.p>
        </div>
      </section>

      {/* Main contact block */}
      <section className="py-12 section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Left: contact info */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <p className="eyebrow mb-2">Директен контакт</p>
                <h2 className="section-heading text-2xl sm:text-3xl">
                  Намерете{' '}
                  <span className="text-gradient-cyan">ни</span>
                </h2>
              </motion.div>

              {([
                {
                  icon: <Phone size={18} className="text-brand-cyan-dark" />,
                  label: 'Телефон',
                  bg: 'bg-brand-cyan/10',
                 content: (
  <a
    href="tel:+359882764660"
    className="font-heading font-semibold text-ink-primary hover:text-brand-cyan-dark transition-colors"
  >
    +359 88 276 4660
  </a>
),
                },
                {
                  icon: <Mail size={18} className="text-brand-emerald-dark" />,
                  label: 'Имейл',
                  bg: 'bg-brand-emerald/10',
                 content: (
  <a
    href="mailto:info@tarpovgroup.com"
    className="font-heading font-semibold text-ink-primary hover:text-brand-emerald-dark transition-colors break-all"
  >
    info@tarpovgroup.com
  </a>
),
                },
                
                {
                  icon: <Clock size={18} className="text-brand-violet" />,
                  label: 'Работно време',
                  bg: 'bg-brand-violet/10',
                  content: (
                    <span className="font-heading font-semibold text-ink-primary">
                      Пон–Пет: 09:00–18:00
                    </span>
                  ),
                },
              ] as const).map(({ icon, label, content, bg }, idx) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="bg-white rounded-xl border border-surface-border p-4 flex items-start gap-4 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-shadow duration-200"
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${bg}`}>
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs text-ink-muted uppercase tracking-wider mb-0.5">
                      {label}
                    </p>
                    {content}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' as const }}
                className="bg-white rounded-2xl border border-surface-border overflow-hidden"
              >
                {/* Trust strip */}
                <div className="border-b border-surface-border px-6 py-4 flex flex-wrap gap-4 bg-gradient-to-r from-brand-cyan/5 to-transparent">
                  {[
                    { icon: <Shield size={15} className="text-brand-cyan-dark" />, text: 'Вашите данни са защитени (GDPR)' },
                    { icon: <Clock size={15} className="text-brand-emerald-dark" />, text: 'Отговор до 12 часа' },
                    { icon: <CheckCircle2 size={15} className="text-brand-amber-dark" />, text: 'Безплатна консултация' },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-1.5 text-xs text-ink-secondary">
                      {icon}
                      <span>{text}</span>
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <SuccessState key="success" />
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 sm:p-8"
                    >
                      <h2 className="font-heading font-bold text-ink-primary text-xl mb-6">
                        Изпратете запитване
                      </h2>

                      <form onSubmit={handleSubmit} noValidate className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-5">
                          <InputField label="Вашето име" required>
                            <input
                              type="text"
                              name="name"
                              value={form.name}
                              onChange={handleChange}
                              placeholder="Иван Иванов"
                              className={`${inputCls} ${errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
                            />
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                          </InputField>

                          <InputField label="Компания">
                            <input
                              type="text"
                              name="company"
                              value={form.company}
                              onChange={handleChange}
                              placeholder="Примерна ЕООД"
                              className={inputCls}
                            />
                          </InputField>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                          <InputField label="Телефон" required>
                            <input
                              type="tel"
                              name="phone"
                              value={form.phone}
                              onChange={handleChange}
                              placeholder="+359 88 XXX XXXX"
                              className={`${inputCls} ${errors.phone ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
                            />
                            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                          </InputField>

                          <InputField label="Имейл" required>
                            <input
                              type="email"
                              name="email"
                              value={form.email}
                              onChange={handleChange}
                              placeholder="ivan@company.bg"
                              className={`${inputCls} ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
                            />
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                          </InputField>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                          <InputField label="Тип проект" required>
                            <div className="relative">
                              <select
                                name="projectType"
                                value={form.projectType}
                                onChange={handleChange}
                                className={`${inputCls} appearance-none pr-10 ${errors.projectType ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
                              >
                                <option value="">Изберете тип...</option>
                                {projectTypes.map((t) => (
                                  <option key={t} value={t}>{t}</option>
                                ))}
                              </select>
                              <ChevronDown
                                size={16}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
                              />
                            </div>
                            {errors.projectType && <p className="text-xs text-red-500 mt-1">{errors.projectType}</p>}
                          </InputField>

                          <InputField label="Приблизителна площ (м²)">
                            <input
                              type="number"
                              name="area"
                              value={form.area}
                              onChange={handleChange}
                              placeholder="напр. 12"
                              min="0"
                              step="0.5"
                              className={inputCls}
                            />
                          </InputField>
                        </div>

                        <InputField label="Съобщение" required>
                          <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Опишете накратко вашия проект, локация, изисквания..."
                            className={`${inputCls} resize-y min-h-[100px] ${errors.message ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
                          />
                          {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                        </InputField>

                        <p className="text-xs text-ink-muted leading-relaxed">
                          С изпращането на формуляра приемате{' '}
                          <a href="/privacy" className="text-brand-cyan-dark hover:underline" target="_blank" rel="noopener noreferrer">
                            Политиката ни за поверителност
                          </a>
                          . Не споделяме данните Ви с трети страни.
                        </p>

                        {submitError && (
                          <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                            {submitError}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={submitting}
                          className="btn-primary w-full py-3.5 text-base group disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          <Send size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
                          {submitting ? 'Изпраща се...' : 'Изпратете запитване'}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
