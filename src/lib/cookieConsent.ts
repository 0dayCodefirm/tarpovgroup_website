export type ConsentStatus = 'accepted' | 'rejected';

const STORAGE_KEY = 'tarpov_cookie_consent';

export function getConsent(): ConsentStatus | null {
  if (typeof window === 'undefined') return null;
  const value = localStorage.getItem(STORAGE_KEY);
  return value === 'accepted' || value === 'rejected' ? value : null;
}

export function setConsent(status: ConsentStatus): void {
  localStorage.setItem(STORAGE_KEY, status);
  window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: status }));
}

export function hasConsent(): boolean {
  return getConsent() === 'accepted';
}

export function onConsentGranted(callback: () => void): () => void {
  if (hasConsent()) {
    callback();
  }
  const handler = (e: Event) => {
    const status = (e as CustomEvent<ConsentStatus>).detail;
    if (status === 'accepted') callback();
  };
  window.addEventListener('cookie-consent-changed', handler);
  return () => window.removeEventListener('cookie-consent-changed', handler);
}