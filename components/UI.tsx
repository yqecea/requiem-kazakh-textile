import React from 'react';
import { motion } from 'framer-motion';

/* ───────────── ICONS ───────────── */

export const StarIcon = ({ className = 'w-6 h-6', style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
  </svg>
);

export const GlobeIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1} className={className} aria-hidden="true">
    <ellipse cx={24} cy={24} rx={20} ry={20} />
    <ellipse cx={24} cy={24} rx={10} ry={20} />
    <line x1={4} y1={24} x2={44} y2={24} />
    <path d="M8 14 Q24 18 40 14" fill="none" />
    <path d="M8 34 Q24 30 40 34" fill="none" />
  </svg>
);

export const CrosshairIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className={className} aria-hidden="true">
    <circle cx={12} cy={12} r={8} />
    <circle cx={12} cy={12} r={3} />
    <line x1={12} y1={0} x2={12} y2={6} />
    <line x1={12} y1={18} x2={12} y2={24} />
    <line x1={0} y1={12} x2={6} y2={12} />
    <line x1={18} y1={12} x2={24} y2={12} />
  </svg>
);

/* ───────────── HUD / GEOMETRIC DECORATIONS ───────────── */

export const CornerBrackets = ({ className = '' }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none z-10 ${className}`} aria-hidden="true">
    {/* Top-left */}
    <div className="absolute top-0 left-0 w-8 h-8">
      <div className="absolute top-0 left-0 w-full h-px bg-teal/40" />
      <div className="absolute top-0 left-0 w-px h-full bg-teal/40" />
    </div>
    {/* Top-right */}
    <div className="absolute top-0 right-0 w-8 h-8">
      <div className="absolute top-0 right-0 w-full h-px bg-teal/40" />
      <div className="absolute top-0 right-0 w-px h-full bg-teal/40" />
    </div>
    {/* Bottom-left */}
    <div className="absolute bottom-0 left-0 w-8 h-8">
      <div className="absolute bottom-0 left-0 w-full h-px bg-teal/40" />
      <div className="absolute bottom-0 left-0 w-px h-full bg-teal/40" />
    </div>
    {/* Bottom-right */}
    <div className="absolute bottom-0 right-0 w-8 h-8">
      <div className="absolute bottom-0 right-0 w-full h-px bg-teal/40" />
      <div className="absolute bottom-0 right-0 w-px h-full bg-teal/40" />
    </div>
  </div>
);

export const ScanLine = () => (
  <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden" aria-hidden="true">
    <div className="scan-line absolute w-full h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />
  </div>
);

export const CoordinateMarker = ({ x, y, label }: { x: string; y: string; label: string }) => (
  <div className={`absolute ${y} ${x} font-mono text-[8px] text-teal/30 tracking-[0.3em] pointer-events-none hidden md:block`} aria-hidden="true">
    <div className="flex items-center gap-1">
      <div className="w-2 h-px bg-teal/30" />
      <span>{label}</span>
    </div>
  </div>
);

export const HexGrid = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 200 200" fill="none" className={`${className} opacity-[0.04]`} aria-hidden="true">
    {[0, 1, 2, 3, 4].map(row =>
      [0, 1, 2, 3].map(col => {
        const cx = col * 50 + (row % 2 ? 25 : 0);
        const cy = row * 43;
        return (
          <polygon
            key={`${row}-${col}`}
            points={`${cx},${cy - 20} ${cx + 17},${cy - 10} ${cx + 17},${cy + 10} ${cx},${cy + 20} ${cx - 17},${cy + 10} ${cx - 17},${cy - 10}`}
            stroke="currentColor"
            strokeWidth={0.5}
          />
        );
      })
    )}
  </svg>
);

export const GeometricAbstraction = ({ variant = 'circles', className = '' }: { variant?: 'circles' | 'diamond' | 'grid' | 'angles'; className?: string }) => {
  if (variant === 'circles') return (
    <svg viewBox="0 0 300 300" fill="none" stroke="currentColor" strokeWidth={0.5} className={`${className} text-teal/10`} aria-hidden="true">
      <circle cx={150} cy={150} r={140} />
      <circle cx={150} cy={150} r={100} />
      <circle cx={150} cy={150} r={60} />
      <circle cx={150} cy={150} r={20} />
      <line x1={0} y1={150} x2={300} y2={150} />
      <line x1={150} y1={0} x2={150} y2={300} />
      <line x1={44} y1={44} x2={256} y2={256} strokeDasharray="4 8" />
      <line x1={256} y1={44} x2={44} y2={256} strokeDasharray="4 8" />
    </svg>
  );
  if (variant === 'diamond') return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth={0.5} className={`${className} text-teal/10`} aria-hidden="true">
      <rect x={30} y={30} width={140} height={140} transform="rotate(45 100 100)" />
      <rect x={50} y={50} width={100} height={100} transform="rotate(45 100 100)" />
      <rect x={70} y={70} width={60} height={60} transform="rotate(45 100 100)" />
      <circle cx={100} cy={100} r={5} fill="currentColor" opacity={0.4} />
      <line x1={100} y1={0} x2={100} y2={200} strokeDasharray="2 6" />
      <line x1={0} y1={100} x2={200} y2={100} strokeDasharray="2 6" />
    </svg>
  );
  if (variant === 'grid') return (
    <svg viewBox="0 0 240 240" fill="none" stroke="currentColor" strokeWidth={0.3} className={`${className} text-cream/5`} aria-hidden="true">
      {Array.from({ length: 7 }).map((_, i) => (
        <React.Fragment key={i}>
          <line x1={i * 40} y1={0} x2={i * 40} y2={240} />
          <line x1={0} y1={i * 40} x2={240} y2={i * 40} />
        </React.Fragment>
      ))}
      <circle cx={120} cy={120} r={80} strokeWidth={0.5} />
      <circle cx={120} cy={120} r={40} strokeWidth={0.5} strokeDasharray="3 5" />
    </svg>
  );
  // angles
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth={0.5} className={`${className} text-teal/8`} aria-hidden="true">
      <path d="M0 100 L50 20 L100 100 L50 180 Z" />
      <path d="M100 100 L150 20 L200 100 L150 180 Z" />
      <line x1={0} y1={100} x2={200} y2={100} strokeDasharray="2 4" />
      <circle cx={100} cy={100} r={3} fill="currentColor" />
    </svg>
  );
};

export const DiamondIcon = ({ className = 'w-3 h-3' }: { className?: string }) => (
  <svg viewBox="0 0 12 12" fill="currentColor" className={className} aria-hidden="true">
    <path d="M6 0L12 6L6 12L0 6Z" />
  </svg>
);

export const DataReadout = ({ lines }: { lines: string[] }) => (
  <div className="font-mono text-[8px] text-teal/25 tracking-[0.2em] space-y-0.5 pointer-events-none hidden md:block" aria-hidden="true">
    {lines.map((line, i) => (
      <div key={i} className="flex items-center gap-1">
        <div className="w-1 h-1 bg-teal/30" />
        <span>{line}</span>
      </div>
    ))}
  </div>
);

/* ───────────── OVERLAYS ───────────── */

export const GridOverlay = () => (
  <div className="grid-overlay" />
);

export const GrainOverlay = () => (
  <div className="grain-overlay" />
);

/* ───────────── TYPOGRAPHY ───────────── */

export const SectionTitle = ({
  children,
  subtitle,
  align = 'left',
}: {
  children?: React.ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
}) => (
  <div className={`mb-12 md:mb-20 ${align === 'center' ? 'text-center' : 'border-l border-teal/30 pl-6 relative'}`}>
    {align === 'left' && (
      <div className="absolute top-0 left-[-3px] w-[5px] h-[30px] bg-teal" />
    )}
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, x: align === 'center' ? 0 : -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-teal font-mono text-xs uppercase tracking-[0.2em] mb-3"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`font-pixel text-3xl md:text-5xl lg:text-6xl leading-[0.95] text-cream tracking-wide`}
    >
      {children}
    </motion.h2>
  </div>
);

/* ───────────── LAYOUT ELEMENTS ───────────── */

export const Separator = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent my-16 md:my-24" />
);

export const ArchFrame = ({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-0 border border-teal/20 rounded-t-[100px] z-10 translate-x-2 translate-y-2" />
    <div className="relative z-20 w-full h-full arch-mask overflow-hidden bg-void-light">
      <img
        src={src}
        alt={alt}
        width={600}
        height={800}
        className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700 ease-out grayscale hover:grayscale-0"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
    </div>
  </div>
);

/* ───────────── METADATA UI ───────────── */

export const MetaBadge = ({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) => (
  <div className="font-mono text-[10px] tracking-widest">
    <span className={accent ? 'text-teal' : 'text-mist/40'}>{label}: </span>
    <span className="text-cream/70">{value}</span>
  </div>
);

export const TechCard = ({
  kazName,
  engName,
  description,
  subItems,
  img,
  accentColor = 'teal',
}: {
  id: string;
  kazName: string;
  engName: string;
  description: string;
  subItems?: { name: string; desc: string; img?: string }[];
  img?: string;
  accentColor?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group relative bg-void border border-cream/5 hover:border-teal/30 transition-all duration-500 overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-full h-[2px] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700" style={{ backgroundColor: accentColor === 'teal' ? '#2a7a9e' : accentColor }} />
    {img && (
      <div className="relative h-36 overflow-hidden">
        <img src={img} alt={kazName} className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void" />
      </div>
    )}
    <div className="p-8 md:p-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-2 h-2 rounded-full bg-teal/60" />
        <span className="font-mono text-[11px] tracking-[0.25em] text-teal uppercase">{kazName}</span>
      </div>
      <h3 className="font-display text-2xl md:text-3xl italic mb-4 text-cream group-hover:text-teal transition-colors duration-300">
        {engName}
      </h3>
      <p className="font-body text-sm text-mist leading-relaxed mb-6">{description}</p>

      {subItems && subItems.length > 0 && (
        <div className="space-y-3">
          {subItems.map((item, i) => (
            <div key={i} className="border border-cream/5 bg-void-light/50 overflow-hidden">
              {item.img && (
                <div className="relative h-24 overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover opacity-40" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-void-light/90" />
                </div>
              )}
              <div className="p-4">
                <h4 className="font-mono text-xs tracking-wider text-cream mb-1 uppercase">{item.name}</h4>
                <p className="font-body text-xs text-mist/70">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </motion.div>
);