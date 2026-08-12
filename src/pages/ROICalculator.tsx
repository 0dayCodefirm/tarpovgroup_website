import { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, Zap, Leaf, TrendingDown, Gauge } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DecorBackground from '../components/shared/DecorBackground';
import { usePageSeo, breadcrumbSchema, BREADCRUMB_HOME } from '../components/shared/Seo';

type PixelPitch = 'P3.9' | 'P6.25' | 'P10';

interface CalcInputs {
  area: number;
  pixelPitch: PixelPitch;
  activeHours: number;
  electricityPrice: number;
}

const PITCH_COST: Record<PixelPitch, { hardware: number; install: number }> = {
  'P3.9': { hardware: 950, install: 150 },
  'P6.25': { hardware: 680, install: 120 },
  'P10': { hardware: 480, install: 100 },
};

const TRADITIONAL_POWER_PER_SQM_W = 600;
const TRANSPARENT_POWER_PER_SQM_W = 240;

const PIXEL_PITCH_OPTIONS: { value: PixelPitch; label: string; note: string }[] = [
  { value: 'P3.9', label: 'P3.9', note: 'Висока резолюция' },
  { value: 'P6.25', label: 'P6.25', note: 'Оптимален баланс' },
  { value: 'P10', label: 'P10', note: 'Голяма площ / outdoor' },
];

function calculate(inp: CalcInputs) {
  const { area, pixelPitch, activeHours, electricityPrice } = inp;
  const costs = PITCH_COST[pixelPitch];
  const totalInvestment = (costs.hardware + costs.install) * area;

  const traditionalKWh = (TRADITIONAL_POWER_PER_SQM_W * area * activeHours * 365) / 1000;
  const transparentKWh = (TRANSPARENT_POWER_PER_SQM_W * area * activeHours * 365) / 1000;
  const annualEnergySavingsKWh = traditionalKWh - transparentKWh;

  const annualSavingsEuro = (traditionalKWh - transparentKWh) * electricityPrice;
  const paybackYears = annualSavingsEuro > 0 ? totalInvestment / annualSavingsEuro : 0;

  const CO2_PER_KWH = 0.4;
  const annualCO2SavedKg = annualEnergySavingsKWh * CO2_PER_KWH;

  return {
    totalInvestment,
    traditionalKWh,
    transparentKWh,
    annualEnergySavingsKWh,
    annualSavingsEuro,
    paybackYears,
    annualCO2SavedKg,
  };
}

const fmt = (v: number): string => Math.round(v).toLocaleString('bg-BG');

function RangeInput({
  label, value, min, max, step = 1, unit, onChange, decimals,
}: {
  label: string; value: number; min: number; max: number; step?: number;
  unit: string; onChange: (v: number) => void; decimals?: number;
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-ink-secondary">{label}</label>
        <span className="text-sm font-semibold text-brand-cyan-dark tabular-nums">
          {decimals != null ? value.toFixed(decimals) : value.toLocaleString('bg-BG')} {unit}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-cyan cursor-pointer"
      />
      <div className="flex justify-between text-xs text-ink-muted">
        <span>{decimals != null ? min.toFixed(decimals) : min.toLocaleString('bg-BG')}</span>
        <span>{decimals != null ? max.toFixed(decimals) : max.toLocaleString('bg-BG')}</span>
      </div>
    </div>
  );
}

function ResultRow({ label, value, suffix = '', highlight = false }: {
  label: string; value: number; suffix?: string; highlight?: boolean;
}) {
  return (
    <div className={`flex items-baseline justify-between py-4 border-b border-surface-border last:border-0 ${highlight ? 'bg-brand-emerald/5 -mx-4 px-4 rounded-lg' : ''}`}>
      <span className={`text-sm ${highlight ? 'font-semibold text-ink-primary' : 'text-ink-secondary'}`}>{label}</span>
      <span className={`font-heading font-bold tabular-nums ${highlight ? 'text-brand-emerald-dark text-xl' : 'text-ink-primary text-lg'}`}>
        {fmt(value)}{suffix}
      </span>
    </div>
  );
}

const DEFAULT_INPUTS: CalcInputs = { area: 20, pixelPitch: 'P6.25', activeHours: 10, electricityPrice: 0.22 };

/* ────────── Interactive Payback graph ────────── */

function smoothPathFromPoints(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return '';
  const tension = 0.18;
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

function PaybackGraph({
  investment, annualSavings, annualCO2SavedKg, paybackYears,
}: {
  investment: number; annualSavings: number; annualCO2SavedKg: number; paybackYears: number;
}) {
  const YEARS = 10;
  const W = 760;
  const H = 340;
  const PAD = { top: 30, right: 28, bottom: 38, left: 64 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const [hoverXCoord, setHoverXCoord] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const months = useMemo(() => {
    return Array.from({ length: YEARS * 12 + 1 }, (_, m) => {
      const year = m / 12;
      const cumulative = annualSavings * year - investment;
      return { month: m, year, cumulative };
    });
  }, [investment, annualSavings]);

  const maxAbs = Math.max(investment, annualSavings * YEARS - investment, 1) * 1.1;
  const yMin = -maxAbs;
  const yMax = maxAbs;

  const xFor = (month: number) => PAD.left + (month / (YEARS * 12)) * plotW;
  const yFor = (val: number) => PAD.top + plotH - ((val - yMin) / (yMax - yMin)) * plotH;

  const pts = months.map((p) => ({ x: xFor(p.month), y: yFor(p.cumulative) }));
  const linePath = smoothPathFromPoints(pts);
  const curveCommands = linePath.replace(/^M [^ ]+ [^ ]+/, '');
  const areaPath =
    `M ${pts[0].x.toFixed(1)} ${yFor(0).toFixed(1)} ` +
    `L ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}` +
    curveCommands +
    ` L ${pts[pts.length - 1].x.toFixed(1)} ${yFor(0).toFixed(1)} Z`;

  const zeroY = yFor(0);
  const paybackX = xFor(paybackYears * 12);
  const yearTicks = Array.from({ length: YEARS + 1 }, (_, y) => y);
  const yTicks = [-maxAbs, -maxAbs / 2, 0, maxAbs / 2, maxAbs];

  const fmtShort = (v: number) => (Math.abs(v) >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${Math.round(v)}`);

  const handleMove = (e: React.MouseEvent<SVGRectElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    const clampedX = Math.max(PAD.left, Math.min(PAD.left + plotW, x));
    setHoverXCoord(clampedX);
  };

  const hoverRatio = hoverXCoord != null ? (hoverXCoord - PAD.left) / plotW : 0;
  const hoverYear = hoverRatio * YEARS;
  const hoverCumulative = annualSavings * hoverYear - investment;
  const hoverY = yFor(hoverCumulative);
  const isHovering = hoverXCoord != null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border border-surface-border p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h2 className="font-heading font-bold text-lg text-ink-primary mb-1 flex items-center gap-2">
            <TrendingDown size={18} className="text-brand-emerald-dark" />
            График на изплащане
          </h2>
          <p className="text-sm text-ink-muted">Натрупани енергийни спестявания спрямо инвестицията във времето</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-brand-emerald/70" />Спестявания</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-ink-muted" />Инвестиция</span>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full h-auto min-w-[560px]" role="img" aria-label="График на изплащане">
          <defs>
            <linearGradient id="savingsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.28" />
              <stop offset="50%" stopColor="#10B981" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="lossFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.18" />
            </linearGradient>
            <clipPath id="aboveZero"><rect x={PAD.left} y={0} width={plotW} height={zeroY} /></clipPath>
            <clipPath id="belowZero"><rect x={PAD.left} y={zeroY} width={plotW} height={H - zeroY} /></clipPath>
          </defs>

          {yearTicks.map((y) => (
            <line key={`gx-${y}`} x1={xFor(y * 12)} y1={PAD.top} x2={xFor(y * 12)} y2={PAD.top + plotH} stroke="#EEF2F7" strokeWidth={1} />
          ))}

          {yTicks.map((v) => {
            const y = yFor(v);
            return (
              <g key={`gy-${v}`}>
                <line x1={PAD.left} y1={y} x2={PAD.left + plotW} y2={y} stroke="#F1F5F9" strokeWidth={1} />
                <text x={PAD.left - 10} y={y + 3} textAnchor="end" className="fill-ink-muted" fontSize="11">
                  {v < 0 ? '-' : ''}{fmtShort(Math.abs(v))}
                </text>
              </g>
            );
          })}

          {yearTicks.map((y) => (
            <text key={`lx-${y}`} x={xFor(y * 12)} y={PAD.top + plotH + 22} textAnchor="middle" className="fill-ink-muted" fontSize="11">
              {y === 0 ? 'Старт' : `${y} г.`}
            </text>
          ))}

          <path d={areaPath} fill="url(#lossFill)" clipPath="url(#belowZero)" opacity={0.6} />
          <path d={areaPath} fill="url(#savingsFill)" clipPath="url(#aboveZero)" />

          <line x1={PAD.left} y1={zeroY} x2={PAD.left + plotW} y2={zeroY} stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="5 4" />
          <text x={PAD.left + plotW + 6} y={zeroY + 4} className="fill-ink-muted" fontSize="10">0</text>

          <motion.path
            d={linePath} fill="none" stroke="#10B981" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />

          {paybackYears > 0 && paybackYears <= YEARS && (
            <g>
              <motion.line
                x1={paybackX} y1={PAD.top} x2={paybackX} y2={PAD.top + plotH}
                stroke="#0EA5E9" strokeWidth={1.5} strokeDasharray="4 3"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.4 }}
              />
              <motion.circle
                cx={paybackX} cy={zeroY} r={5} fill="#0EA5E9" stroke="#fff" strokeWidth={2}
                initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                transition={{ delay: 1.3, type: 'spring', stiffness: 220 }}
              />
              <motion.g
                initial={{ opacity: 0, y: -6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 1.4, duration: 0.4 }}
              >
                <rect x={paybackX - 54} y={PAD.top - 2} width={108} height={22} rx={11} fill="#0EA5E9" />
                <text x={paybackX} y={PAD.top + 13} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
                  Изплаща се · {paybackYears.toFixed(1)} г.
                </text>
              </motion.g>
            </g>
          )}

          <motion.circle
            cx={xFor(YEARS * 12)} cy={yFor(annualSavings * YEARS - investment)} r={4.5} fill="#10B981" stroke="#fff" strokeWidth={2}
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
            transition={{ delay: 1.5, type: 'spring', stiffness: 220 }}
          />

          {/* Hover interaction — tracks cursor exactly via continuous x coordinate */}
          {isHovering && (
            <g pointerEvents="none">
              <line x1={hoverXCoord} y1={PAD.top} x2={hoverXCoord} y2={PAD.top + plotH} stroke="#0EA5E9" strokeWidth={1.5} opacity={0.7} />
              <circle cx={hoverXCoord} cy={hoverY} r={5} fill="#10B981" stroke="#fff" strokeWidth={2} />
            </g>
          )}

          {/* Invisible hover capture rect */}
          <rect
            x={PAD.left} y={PAD.top} width={plotW} height={plotH} fill="transparent"
            onMouseMove={handleMove}
            onMouseLeave={() => setHoverXCoord(null)}
            style={{ cursor: 'crosshair' }}
          />
        </svg>
      </div>

      {/* Hover tooltip */}
      <div className="mt-3 h-14 flex items-center">
        {isHovering ? (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm"
          >
            <span className="font-heading font-semibold text-ink-primary">
              {hoverYear === 0 ? 'Старт' : `${hoverYear.toFixed(1)} г.`}
            </span>
            <span className="text-ink-secondary">
              Натрупано:{' '}
              <span className={`font-heading font-bold tabular-nums ${hoverCumulative >= 0 ? 'text-brand-emerald-dark' : 'text-red-500'}`}>
                {hoverCumulative >= 0 ? '+' : ''}{fmt(hoverCumulative)} €
              </span>
            </span>
            <span className="text-ink-secondary">
              Спестявания:{' '}
              <span className="font-heading font-bold tabular-nums text-brand-cyan-dark">
                {fmt(annualSavings * hoverYear)} €
              </span>
            </span>
          </motion.div>
        ) : (
          <p className="text-xs text-ink-muted">Посочете с мишката върху графика за детайлни стойности.</p>
        )}
      </div>

      <div className="mt-2 grid grid-cols-3 gap-3 text-center">
        <div className="py-3 px-2 rounded-xl bg-surface-soft">
          <p className="text-xs text-ink-muted mb-1">10-та година</p>
          <p className="font-heading font-bold text-sm text-brand-emerald-dark tabular-nums">
            +{fmt(annualSavings * YEARS - investment)} €
          </p>
        </div>
        <div className="py-3 px-2 rounded-xl bg-surface-soft">
          <p className="text-xs text-ink-muted mb-1">Спестено CO₂ / год.</p>
          <p className="font-heading font-bold text-sm text-ink-primary tabular-nums">{fmt(annualCO2SavedKg)} кг</p>
        </div>
        <div className="py-3 px-2 rounded-xl bg-surface-soft">
          <p className="text-xs text-ink-muted mb-1">Точка на изплащане</p>
          <p className="font-heading font-bold text-sm text-brand-cyan-dark tabular-nums">
            {paybackYears > 0 ? `${paybackYears.toFixed(1)} г.` : '—'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ROICalculator() {
  usePageSeo({
    title: 'ROI Калкулатор — възвръщаемост на прозрачен LED дисплей | Търпов Груп',
    description: 'Разгледайте колко бързо ще се изплати прозрачният LED дисплей във вашия магазин или хотел. Калкулатор за възвръщаемост на инвестицията в LED витрина — безплатно и бързо.',
    path: '/roi-calculator',
    keywords: 'ROI калкулатор LED дисплей, възвръщаемост LED витрина, калкулатор прозрачен LED, LED investment calculator Bulgaria, LED screen ROI',
    jsonLd: breadcrumbSchema([BREADCRUMB_HOME, { name: 'ROI Калкулатор', path: '/roi-calculator' }]),
  });

  const [inputs, setInputs] = useState<CalcInputs>(DEFAULT_INPUTS);
  const setField = <K extends keyof CalcInputs>(key: K, value: CalcInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };
  const result = calculate(inputs);

  return (
    <div className="min-h-screen bg-surface-white">
      <Navbar />

      <section className="pt-28 pb-12 relative overflow-hidden bg-mesh">
        <DecorBackground variant="cyan" />
        <div className="container-wide section-padding relative z-10">
          <div className="max-w-2xl">
            <motion.p
              className="eyebrow mb-3 flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' as const }}
            >
              <Calculator size={14} className="text-brand-cyan" />
              КАЛКУЛАТОР ЕНЕРГИЙНА ЕФЕКТИВНОСТ
            </motion.p>
            <motion.h1
              className="section-heading text-3xl sm:text-4xl mb-3"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' as const, delay: 0.1 }}
            >
              Изчислете спестяванията от{' '}
              <span className="text-gradient-cyan">прозрачни LED панели</span>
            </motion.h1>
            <motion.p
              className="text-ink-secondary text-base leading-relaxed"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' as const, delay: 0.2 }}
            >
              Прозрачните LED панели консумират с 60% по-малко енергия от традиционните дисплеи.
              Въведете параметрите на вашия обект и вижте кога инвестицията ще се изплати от електрическите спестявания.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_auto] gap-8 lg:gap-12 items-start">

            {/* Left column: Inputs */}
            <div className="space-y-6 order-1 lg:col-start-1 lg:row-start-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, ease: 'easeOut' as const }}
                className="bg-white rounded-2xl border border-surface-border p-6 sm:p-8 space-y-7"
              >
                <div>
                  <h2 className="font-heading font-bold text-lg text-ink-primary mb-1">Параметри на инсталацията</h2>
                  <p className="text-sm text-ink-muted">Плъзнете слайдерите за да зададете стойностите.</p>
                </div>

                <RangeInput label="Площ на дисплея" value={inputs.area} min={2} max={100} step={1} unit="m²" onChange={(v) => setField('area', v)} />

                <div className="space-y-2">
                  <label className="text-sm font-medium text-ink-secondary">Pixel Pitch</label>
                  <div className="grid grid-cols-3 gap-2">
                    {PIXEL_PITCH_OPTIONS.map((opt) => (
                      <button
                        key={opt.value} type="button"
                        onClick={() => setField('pixelPitch', opt.value)}
                        className={`flex flex-col items-center gap-1 rounded-xl border px-3 py-3 transition-all duration-200 ${
                          inputs.pixelPitch === opt.value
                            ? 'border-brand-cyan bg-brand-cyan/5 glow-cyan'
                            : 'border-surface-border bg-white hover:border-brand-cyan/40'
                        }`}
                      >
                        <span className={`font-heading font-bold text-base ${inputs.pixelPitch === opt.value ? 'text-brand-cyan-dark' : 'text-ink-primary'}`}>
                          {opt.label}
                        </span>
                        <span className="text-xs text-ink-muted text-center leading-tight">{opt.note}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <RangeInput label="Часове работа на ден" value={inputs.activeHours} min={4} max={24} step={1} unit="ч/ден" onChange={(v) => setField('activeHours', v)} />
                <RangeInput label="Цена на електричеството" value={inputs.electricityPrice} min={0.10} max={0.40} step={0.01} unit="€/kWh" decimals={2} onChange={(v) => setField('electricityPrice', v)} />

                <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-emerald/5 border border-brand-emerald/20">
                  <Leaf size={20} className="text-brand-emerald-dark flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-brand-emerald-dark mb-0.5">60% по-ниска консумация</p>
                    <p className="text-xs text-ink-secondary leading-relaxed">
                      Прозрачните панели пускат естествена светлина и консумират значително по-малко енергия от традиционните LED стени.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right column: Results + graph */}
            <div className="space-y-6 order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, ease: 'easeOut' as const }}
                className="bg-white rounded-2xl border border-surface-border p-6 sm:p-8"
              >
                <h2 className="font-heading font-bold text-lg text-ink-primary mb-4 flex items-center gap-2">
                  <Zap size={18} className="text-brand-cyan" />
                  Консумация и спестявания
                </h2>
                <ResultRow label="Обща инвестиция" value={result.totalInvestment} suffix=" €" />
                <div className="flex items-baseline justify-between py-4 border-b border-surface-border">
                  <span className="text-sm text-ink-secondary">Традиционен LED (год.)</span>
                  <span className="font-heading font-bold tabular-nums text-ink-muted text-lg line-through">{fmt(result.traditionalKWh)} kWh</span>
                </div>
                <div className="flex items-baseline justify-between py-4 border-b border-surface-border">
                  <span className="text-sm text-ink-secondary">Прозрачен LED (год.)</span>
                  <span className="font-heading font-bold tabular-nums text-brand-emerald-dark text-lg">{fmt(result.transparentKWh)} kWh</span>
                </div>
                <ResultRow label="Годишни енергийни спестявания" value={result.annualEnergySavingsKWh} suffix=" kWh" />
                <ResultRow label="Годишни финансови спестявания" value={result.annualSavingsEuro} suffix=" €" highlight />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div className="bg-white rounded-2xl border border-surface-border p-6 hover:border-brand-cyan/20 transition-colors duration-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Gauge size={18} className="text-brand-cyan" />
                    <span className="text-sm text-ink-secondary">Период на изплащане</span>
                  </div>
                  <p className="font-heading font-bold text-3xl text-ink-primary tabular-nums">
                    {result.paybackYears > 0 ? result.paybackYears.toFixed(1) : '—'} <span className="text-base text-ink-muted">години</span>
                  </p>
                </div>
                <div className="bg-white rounded-2xl border border-surface-border p-6 hover:border-brand-emerald/20 transition-colors duration-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Leaf size={18} className="text-brand-emerald-dark" />
                    <span className="text-sm text-ink-secondary">CO₂ спестено / год.</span>
                  </div>
                  <p className="font-heading font-bold text-3xl text-brand-emerald-dark tabular-nums">
                    {fmt(result.annualCO2SavedKg)} <span className="text-base text-ink-muted">кг</span>
                  </p>
                </div>
              </motion.div>

              <PaybackGraph
                investment={result.totalInvestment}
                annualSavings={result.annualSavingsEuro}
                annualCO2SavedKg={result.annualCO2SavedKg}
                paybackYears={result.paybackYears}
              />

              <p className="text-xs text-ink-muted leading-relaxed px-1">
                Изчисленията са приближ­ителни и се основават на пазарни данни за консумация
                на традиционни LED дисплеи (~600 W/m²) и 60% по-ниска консумация при прозрачни панели.
                Реалните резултати зависят от конкретните условия на обекта.
              </p>

            </div>

            {/* CTA — order-3 on mobile (after graph), lg:col-start-1 lg:row-start-2 on desktop (below inputs) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }}
              className="order-3 lg:col-start-1 lg:row-start-2 rounded-2xl p-6 sm:p-8 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #E8F4FB 0%, #D6ECF7 100%)' }}
            >
              <div className="relative z-10">
                <h3 className="font-heading font-bold text-lg text-ink-primary mb-2">Получете точна оферта</h3>
                <p className="text-sm text-ink-secondary mb-5 leading-relaxed">
                  Нашите специалисти ще изготвят детайлна калкулация с вашите конкретни параметри — {inputs.area} m² · {inputs.pixelPitch}.
                </p>
                <Link to="/contacts" className="btn-primary hover:scale-105">
                  Заяви безплатна оферта
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
