import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE_EXPO = [0.76, 0, 0.24, 1] as [number, number, number, number];
const CURTAIN_TRANSITION = { duration: 0.72, ease: EASE_EXPO };

// 7×4 LED grid for the intro visual
const LED_ROWS = 4;
const LED_COLS = 7;
const LEDS = Array.from({ length: LED_ROWS * LED_COLS }, (_, i) => {
  const col = i % LED_COLS;
  const row = Math.floor(i / LED_COLS);
  const dx = col - Math.floor(LED_COLS / 2);
  const dy = row - Math.floor(LED_ROWS / 2);
  return { col, row, dist: Math.sqrt(dx * dx + dy * dy) };
});

function IntroLedGrid() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2.5 mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {Array.from({ length: LED_ROWS }, (_, row) => (
        <div key={row} className="flex gap-2.5">
          {Array.from({ length: LED_COLS }, (_, col) => {
            const led = LEDS[row * LED_COLS + col];
            const delay = led.dist * 0.08;
            return (
              <motion.div
                key={col}
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: '#00D4FF',
                  boxShadow: '0 0 8px rgba(0,212,255,0.8)',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1], scale: 1 }}
                transition={{
                  delay: 0.1 + delay,
                  duration: 0.4,
                  ease: 'easeOut',
                }}
              />
            );
          })}
        </div>
      ))}
    </motion.div>
  );
}

export default function PageIntro() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !sessionStorage.getItem('tarpov-intro-shown');
  });

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('tarpov-intro-shown', '1');
    }, 1900);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <>
      {/* Top curtain */}
      <AnimatePresence>
        {visible && (
          <motion.div
            key="curtain-top"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: '51vh',
              background: '#050A14',
              zIndex: 9998,
            }}
            exit={{ y: '-100%', transition: CURTAIN_TRANSITION }}
          />
        )}
      </AnimatePresence>

      {/* Bottom curtain */}
      <AnimatePresence>
        {visible && (
          <motion.div
            key="curtain-bottom"
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              height: '51vh',
              background: '#050A14',
              zIndex: 9998,
            }}
            exit={{ y: '100%', transition: CURTAIN_TRANSITION }}
          />
        )}
      </AnimatePresence>

      {/* Center line (the thin line at 50vh so no gap between curtains) */}
      <AnimatePresence>
        {visible && (
          <motion.div
            key="curtain-line"
            style={{
              position: 'fixed',
              top: '50%',
              left: 0,
              right: 0,
              height: 2,
              background: '#050A14',
              zIndex: 9998,
              transform: 'translateY(-50%)',
            }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          />
        )}
      </AnimatePresence>

      {/* Content overlay */}
      <AnimatePresence>
        {visible && (
          <motion.div
            key="intro-content"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
          >
            {/* LED dots grid */}
            <IntroLedGrid />

            {/* Logo mark */}
            <motion.div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: '#0099CC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
                boxShadow: '0 0 30px rgba(0,153,204,0.5)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.45, ease: 'backOut' }}
            >
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 4,
                  background: '#FFFFFF',
                  display: 'block',
                }}
              />
            </motion.div>

            {/* Brand name */}
            <motion.div
              style={{ textAlign: 'center' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <p
                style={{
                  fontSize: 'clamp(1.4rem, 4vw, 2rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.01em',
                  color: '#FFFFFF',
                  lineHeight: 1,
                  marginBottom: 8,
                  fontFamily: 'sans-serif',
                }}
              >
                ТЪРПОВ{' '}
                <span style={{ color: '#00D4FF' }}>ГРУП</span>
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.05, duration: 0.4 }}
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.28em',
                  color: 'rgba(255,255,255,0.35)',
                  textTransform: 'uppercase',
                  fontFamily: 'sans-serif',
                }}
              >
                Прозрачни LED Дисплеи
              </motion.p>
            </motion.div>

            {/* Progress line */}
            <div
              style={{
                marginTop: 40,
                width: 48,
                height: 1,
                background: 'rgba(255,255,255,0.12)',
                overflow: 'hidden',
                borderRadius: 1,
              }}
            >
              <motion.div
                style={{ height: '100%', background: '#00D4FF', borderRadius: 1 }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.9, duration: 0.9, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
