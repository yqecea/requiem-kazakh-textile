import React, { useEffect, useRef } from 'react';

interface YurtSVGProps {
    className?: string;
}

const YurtSVG: React.FC<YurtSVGProps> = ({ className = '' }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        // C1: Skip animations if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const loadGSAP = async () => {
            try {
                const gsapModule = await import('gsap');
                const gsap = gsapModule.default || gsapModule.gsap;
                const { ScrollTrigger } = await import('gsap/ScrollTrigger');
                gsap.registerPlugin(ScrollTrigger);

                if (!svgRef.current) return;

                const paths = svgRef.current.querySelectorAll('.draw-path');
                const labels = svgRef.current.querySelectorAll('.yurt-label');

                paths.forEach((path) => {
                    const el = path as SVGPathElement | SVGLineElement | SVGEllipseElement | SVGCircleElement;
                    if (el instanceof SVGPathElement || el instanceof SVGLineElement) {
                        const length = el instanceof SVGPathElement ? el.getTotalLength() : 200;
                        (el as SVGElement).style.strokeDasharray = `${length}`;
                        (el as SVGElement).style.strokeDashoffset = `${length}`;
                    }
                });

                gsap.to(paths, {
                    strokeDashoffset: 0,
                    duration: 2,
                    stagger: 0.15,
                    ease: 'power2.inOut',
                    scrollTrigger: {
                        trigger: svgRef.current,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse',
                    },
                });

                gsap.fromTo(labels,
                    { opacity: 0, y: 10 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        delay: 1.5,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: svgRef.current,
                            start: 'top 70%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            } catch {
                // P3: Silently fail — GSAP is non-critical for content
            }
        };
        loadGSAP();
    }, []);

    return (
        <div className={`relative ${className}`}>
            <svg
                ref={svgRef}
                viewBox="0 0 600 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                {/* Background grid lines */}
                {Array.from({ length: 13 }).map((_, i) => (
                    <line
                        key={`vgrid-${i}`}
                        x1={i * 50} y1={0} x2={i * 50} y2={500}
                        stroke="#2a7a9e" strokeWidth={0.3} opacity={0.1}
                    />
                ))}
                {Array.from({ length: 11 }).map((_, i) => (
                    <line
                        key={`hgrid-${i}`}
                        x1={0} y1={i * 50} x2={600} y2={i * 50}
                        stroke="#2a7a9e" strokeWidth={0.3} opacity={0.1}
                    />
                ))}

                {/* SHANYRAK (Crown Ring) */}
                <ellipse
                    className="draw-path"
                    cx={300} cy={130}
                    rx={45} ry={15}
                    stroke="#2a7a9e" strokeWidth={1.5}
                    fill="none"
                />
                <ellipse
                    className="draw-path"
                    cx={300} cy={130}
                    rx={35} ry={11}
                    stroke="#e8e0d0" strokeWidth={0.8}
                    fill="none"
                    opacity={0.5}
                />
                {/* Cross bars inside shanyrak */}
                <line className="draw-path" x1={265} y1={130} x2={335} y2={130} stroke="#e8e0d0" strokeWidth={0.6} opacity={0.4} />
                <line className="draw-path" x1={300} y1={119} x2={300} y2={141} stroke="#e8e0d0" strokeWidth={0.6} opacity={0.4} />

                {/* UYK (Dome Poles) - radiating from shanyrak */}
                {Array.from({ length: 11 }).map((_, i) => {
                    const angle = (Math.PI / 10) * i;
                    const startX = 300 + Math.cos(angle + Math.PI) * 45;
                    const startY = 130 + Math.sin(angle + Math.PI) * 8;
                    const endX = 300 + Math.cos(angle + Math.PI) * 230;
                    const endY = 310;
                    return (
                        <line
                            key={`uyk-${i}`}
                            className="draw-path"
                            x1={startX} y1={startY}
                            x2={endX} y2={endY}
                            stroke="#e8e0d0" strokeWidth={0.8}
                            opacity={0.3}
                        />
                    );
                })}

                {/* Dome curve */}
                <path
                    className="draw-path"
                    d="M 100 310 Q 150 180 300 140 Q 450 180 500 310"
                    stroke="#2a7a9e" strokeWidth={1.5}
                    fill="none"
                />

                {/* KEREGE (Lattice Walls) */}
                <rect
                    className="draw-path"
                    x={100} y={310}
                    width={400} height={130}
                    stroke="#e8e0d0" strokeWidth={1}
                    fill="none"
                    opacity={0.4}
                    strokeDasharray="8 4"
                />

                {/* Cross-hatch lattice pattern */}
                {Array.from({ length: 14 }).map((_, i) => (
                    <React.Fragment key={`lattice-${i}`}>
                        <line
                            className="draw-path"
                            x1={100 + i * 30} y1={310}
                            x2={100 + i * 30 + 40} y2={440}
                            stroke="#e8e0d0" strokeWidth={0.6}
                            opacity={0.25}
                        />
                        <line
                            className="draw-path"
                            x1={100 + i * 30 + 40} y1={310}
                            x2={100 + i * 30} y2={440}
                            stroke="#e8e0d0" strokeWidth={0.6}
                            opacity={0.25}
                        />
                    </React.Fragment>
                ))}

                {/* Ground line */}
                <line
                    className="draw-path"
                    x1={80} y1={440}
                    x2={520} y2={440}
                    stroke="#2a7a9e" strokeWidth={1}
                    strokeDasharray="6 6"
                />

                {/* Dimension lines */}
                <line className="draw-path" x1={80} y1={130} x2={80} y2={440} stroke="#d4a574" strokeWidth={0.5} opacity={0.4} />
                <line className="draw-path" x1={75} y1={130} x2={85} y2={130} stroke="#d4a574" strokeWidth={0.5} opacity={0.4} />
                <line className="draw-path" x1={75} y1={440} x2={85} y2={440} stroke="#d4a574" strokeWidth={0.5} opacity={0.4} />

                {/* LABELS */}
                <g className="yurt-label" opacity={0}>
                    <rect x={310} y={108} width={120} height={20} rx={2} fill="#0a0a0b" fillOpacity={0.8} />
                    <text x={316} y={122} fill="#2a7a9e" fontSize={10} fontFamily="JetBrains Mono">
                        ШАҢЫРАҚ (CROWN)
                    </text>
                </g>

                <g className="yurt-label" opacity={0}>
                    <rect x={440} y={220} width={140} height={20} rx={2} fill="#0a0a0b" fillOpacity={0.8} />
                    <text x={446} y={234} fill="#e8e0d0" fontSize={10} fontFamily="JetBrains Mono">
                        ҮЙҚ (DOME POLES)
                    </text>
                    <line x1={435} y1={230} x2={400} y2={220} stroke="#e8e0d0" strokeWidth={0.5} opacity={0.5} />
                </g>

                <g className="yurt-label" opacity={0}>
                    <rect x={440} y={360} width={140} height={20} rx={2} fill="#0a0a0b" fillOpacity={0.8} />
                    <text x={446} y={374} fill="#e8e0d0" fontSize={10} fontFamily="JetBrains Mono">
                        КЕРЕГЕ (LATTICE)
                    </text>
                    <line x1={435} y1={370} x2={500} y2={370} stroke="#e8e0d0" strokeWidth={0.5} opacity={0.5} />
                </g>

                <g className="yurt-label" opacity={0}>
                    <rect x={20} y={280} width={60} height={16} rx={2} fill="#0a0a0b" fillOpacity={0.8} />
                    <text x={26} y={292} fill="#d4a574" fontSize={8} fontFamily="JetBrains Mono">
                        H: 4.5m
                    </text>
                </g>
            </svg>

            {/* System Status Panel */}
            <div className="absolute top-4 left-4 font-mono text-[10px] space-y-2">
                <div className="text-teal">SYSTEM STATUS: <span className="text-green-400">ONLINE</span></div>
                <div className="text-mist/60">
                    <div>• ҰЙЫҚ [DOME]</div>
                    <div className="text-mist/40 pl-2">Structural Vault</div>
                </div>
                <div className="text-mist/60">
                    <div>• КЕРЕГЕ [WALL]</div>
                    <div className="text-mist/40 pl-2">Lattice Compression</div>
                </div>
                <div className="text-mist/60">
                    <div>• ШАҢЫРАҚ [CROWN]</div>
                    <div className="text-mist/40 pl-2">Tension Ring / Oculus</div>
                </div>
            </div>
        </div>
    );
};

export default YurtSVG;
