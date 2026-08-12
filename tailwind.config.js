/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: '#00D4FF',
          'cyan-light': '#7EEEFF',
          'cyan-dark': '#0099CC',
          'cyan-deep': '#006B8F',
          violet: '#7C3AED',
          'violet-light': '#A78BFA',
          amber: '#F59E0B',
          'amber-light': '#FCD34D',
          'amber-dark': '#D97706',
          emerald: '#10B981',
          'emerald-light': '#6EE7B7',
          'emerald-dark': '#059669',
          rose: '#F43F5E',
          'rose-light': '#FDA4AF',
          'rose-dark': '#E11D48',
        },
        action: {
          DEFAULT: '#C2410C',
          hover: '#9A3412',
          light: '#EA580C',
        },
        surface: {
          white: '#FAFAFA',
          soft: '#F4F6F8',
          card: '#FFFFFF',
          border: '#E8ECF0',
          'warm': '#FEF9F0',
          'cool': '#F0F9FF',
        },
        ink: {
          primary: '#111418',
          secondary: '#3D4754',
          muted: '#6B7684',
          light: '#9AA3AE',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.2em',
      },
      boxShadow: {
        glass: '0 4px 24px rgba(0, 212, 255, 0.08), 0 1px 4px rgba(0,0,0,0.06)',
        'glass-lg': '0 8px 40px rgba(0, 212, 255, 0.12), 0 2px 8px rgba(0,0,0,0.08)',
        glow: '0 0 24px rgba(0, 212, 255, 0.35)',
        'glow-sm': '0 0 12px rgba(0, 212, 255, 0.25)',
      },
      backgroundImage: {
        'glow-radial': 'radial-gradient(ellipse at center, rgba(0,212,255,0.12) 0%, transparent 70%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(244,246,248,0.7) 100%)',
        'cyan-gradient': 'linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)',
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,212,255,0.07) 0%, transparent 70%)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'scan-line': 'scanLine 4s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'drift': 'drift 12s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -20px) rotate(120deg)' },
          '66%': { transform: 'translate(-20px, 20px) rotate(240deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
