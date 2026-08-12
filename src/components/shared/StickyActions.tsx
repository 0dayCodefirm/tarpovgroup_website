import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StickyActions() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-2"
          role="complementary"
          aria-label="Бързи действия"
        >
          {/* Dismiss */}
          <button
            onClick={() => setDismissed(true)}
            className="w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200"
            style={{ background: 'rgba(0,0,0,0.08)' }}
            aria-label="Затвори"
          >
            <X size={12} strokeWidth={2.5} style={{ color: '#6B7684' }} />
          </button>

          {/* Action row */}
          <div className="flex items-center gap-2.5">
            {/* Phone number */}
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText('+359 88 276 4660');
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="flex items-center gap-2.5 px-4 py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E8ECF0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}
              aria-label="Копирай телефонния номер"
            >
              <Phone size={15} className="text-brand-cyan-dark flex-shrink-0" strokeWidth={2} />
              <span
                className="font-heading font-bold text-sm whitespace-nowrap"
                style={{ color: '#111418' }}
              >
                {copied ? 'Копирано!' : '+359 88 276 4660'}
              </span>
            </button>

            {/* Free offer CTA */}
            <Link
              to="/contacts"
              className="flex items-center gap-2 px-5 py-3 rounded-full font-heading font-bold text-sm text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] whitespace-nowrap"
              style={{
                background: 'linear-gradient(135deg, #1A3D7A 0%, #1565C0 100%)',
                boxShadow: '0 4px 20px rgba(21,101,192,0.35)',
              }}
            >
              <MessageSquare size={15} strokeWidth={2} />
              Безплатна оферта
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
