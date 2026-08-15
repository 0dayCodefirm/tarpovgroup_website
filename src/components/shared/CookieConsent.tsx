import { useEffect, useState } from 'react';
import { getConsent, setConsent } from '../../lib/cookieConsent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getConsent() === null) {
      setVisible(true);
    }
  }, []);

  const handleChoice = (status: 'accepted' | 'rejected') => {
    setConsent(status);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Съгласие за бисквитки"
      className="fixed bottom-3 left-3 right-3 z-[100] mx-auto max-w-sm rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg sm:left-auto sm:right-4 sm:bottom-4 sm:max-w-xs"
    >
      <p className="font-['Inter'] text-xs leading-relaxed text-slate-600">
        Използваме бисквитки за анализ на трафика.{' '}
        
          href="https://tarpovgroup.com/cookies"
          className="font-medium text-[#1565C0] underline underline-offset-2 hover:text-[#0f4c9a]"
        >
          Научете повече
        </a>
      </p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => handleChoice('rejected')}
          className="flex-1 rounded-lg border border-slate-300 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Отказвам
        </button>
        <button
          onClick={() => handleChoice('accepted')}
          className="flex-1 rounded-lg bg-[#1565C0] py-1.5 text-xs font-semibold text-white transition hover:bg-[#0f4c9a]"
        >
          Приемам
        </button>
      </div>
    </div>
  );
}