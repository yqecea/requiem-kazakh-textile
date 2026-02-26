import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   GridOverlay, GrainOverlay, StarIcon, GlobeIcon, CrosshairIcon,
   SectionTitle, Separator, ArchFrame, MetaBadge, TechCard,
   CornerBrackets, ScanLine, CoordinateMarker, HexGrid,
   GeometricAbstraction, DataReadout,
} from './components/UI';
import YurtSVG from './components/YurtSVG';
import { HUDOverlay } from './components/hud/HUDOverlay';

/* ═══════════════════════════════════════════════
   CONTENT DATA
   ═══════════════════════════════════════════════ */

const content = {
   hero: {
      title: 'REQUIEM',
      subtitle: 'KAZAKH DECORATIVE ARTS & TEXTILE ENGINEERING',
      meta: 'FEBRUARY 2026 // SYSTEM: NOMADIC // ANALYSIS: SEMIOTICS',
   },

   manifesto: {
      sectionId: '01',
      sectionLabel: 'INTRODUCTION',
      title: 'EPISTEMOLOGICAL\nCONTEXT',
      content: 'This treatise considers Kazakh textile art not as a simple craft, but as a complex system of engineering and semiotics. Consistent with the scientific style, this report employs objective terminology to delineate evolution, technological methodologies, and cultural semiotics.',
      pullQuote: '«Not a simple craft — a complex system of engineering and semiotics»',
      scope: 'DECORATIVE ARTS & TEXTILE ENGINEERING',
   },

   yurt: {
      sectionId: '02',
      sectionLabel: 'HISTORICAL FOUNDATION',
      title: 'ENGINEERING\nAPEX',
      content: 'The yurt is the apex of nomadic textile engineering. It is not merely a dwelling, but a composite of specialized textile components.',
      components: [
         { id: '01', name: 'Tuyrlyk', nameEng: 'Tuyrlyk', desc: 'Felt covering applied to kerege sections.' },
         { id: '02', name: 'Uzuk', nameEng: 'Uzuk', desc: 'Felt covering for the dome structure.' },
         { id: '03', name: 'Baskur', nameEng: 'Baskur', desc: 'Woven bands for structural integrity and interior decoration.' },
      ],
      footer: [
         '> TUYRLYK: THERMAL SHIELD',
         '> UZUK: HYDROPHOBIC DOME',
         '> BASKUR: TENSILE REINFORCEMENT',
      ],
   },

   taxonomy: {
      sectionId: '03',
      sectionLabel: 'TAXONOMIC CLASSIFICATION',
      title: 'THREE TECHNOLOGICAL\nVECTORS',
      desc: 'For the purpose of rigorous scientific inquiry, it is necessary to classify production methodologies.',
      types: [
         {
            kazName: 'FELTING',
            engName: 'Non-Woven Technologies',
            detail: 'Primordial non-woven fabric created without interlacing yarns, through thermal energy, moisture, and mechanical pressure.',
            img: '/images/felt-making-process.png',
            subItems: [
               { name: 'TEKEMET', desc: 'Layering of dyed wool on a primary substrate. Diffuse, softened transitions.', img: '/images/tekemet-carpet.png' },
               { name: 'SYRMAK', desc: 'Mosaic methodology. Positive/Negative cutting. High contrast.', img: '/images/syrmak-carpet.png' },
            ],
         },
         {
            kazName: 'WEAVING',
            engName: 'Loom-Based Fabrication',
            detail: 'Complex "supplementary weft" technique to generate raised, velvet-textured ornamentation on a flat substrate.',
            img: '/images/ormek-loom.png',
            subItems: [
               { name: 'ALASHA', desc: 'Narrow woven carpet strips, with longitudinal stitching.', img: '/images/alasha-strips.png' },
               { name: 'BASKUR', desc: 'Structural bands woven on an ormek (loom).', img: '/images/baskur-band.png' },
            ],
         },
         {
            kazName: 'EMBROIDERY',
            engName: 'Embroidered Adornment',
            detail: 'Tambour embroidery executed with a hooked instrument (biz). Fluid, curvilinear forms distinct from the orthogonal constraints of weaving.',
            img: '/images/embroidery-tools.png',
            subItems: [
               { name: 'BIZ KESTE', desc: 'Continuous chain stitch. Fluidity.', img: '/images/biz-keste-detail.png' },
               { name: 'TUSKIIZ', desc: 'Large-scale embroidered wall hangings. Intentional incompleteness (apotropaic).', img: '/images/tuskiiz-hanging.png' },
            ],
         },
      ],
   },

   semiotics: {
      sectionId: '04',
      sectionLabel: 'SEMIOTICS',
      title: 'SECRET OF\nORNAMENT',
      content: 'The "scientific style" analysis requires interpreting ornaments (oyu-ornek) not merely as decorative adornment, but as a semiotic cipher or iconographic lexicon.',
      geometric: [
         { name: 'Symmetry', desc: 'Reflectional symmetry (bilateral correspondence) or rotational symmetry (radial correspondence).' },
         { name: 'Fractal', desc: 'Within a single composition, the core geometric motif repeats across varying scales.' },
      ],
      symbols: [
         { name: 'Koshkar Muiz', trans: 'Ram\'s Horn', meaning: 'Signifies wealth, power, and vital force.', color: '#c8a96e', img: '/images/ornament-koshkar-muiz.png' },
         { name: 'Kus Kanat', trans: 'Bird\'s Wing', meaning: 'Signifies freedom and aspiration.', color: '#2a7a9e', img: '/images/ornament-kus-kanat.png' },
         { name: 'Tuye Taban', trans: 'Camel Footprint', meaning: 'Signifies long journeys and trade exchange.', color: '#d4a574', img: '/images/ornament-tuye-taban.png' },
         { name: 'Juldyz', trans: 'Star', meaning: 'Signifies the celestial sphere and eternity.', color: '#e8e0d0', img: '/images/ornament-juldyz.png' },
         { name: 'Tort Kulak', trans: 'Four Ears', meaning: 'Signifies the four directions, structural integrity, and protection.', color: '#c8a96e', img: '/images/ornament-tort-kulak.png' },
      ],
   },

   gallery: {
      sectionId: '05',
      sectionLabel: 'GALLERY',
      title: 'ARTIFACT\nGALLERY',
      items: [
         { name: 'Tekemet', desc: 'Diffuse ornament', src: '/images/gallery-01-tekemet-large.png' },
         { name: 'Syrmak', desc: 'Mosaic felt', src: '/images/gallery-02-syrmak-large.png' },
         { name: 'Tuskiiz', desc: 'Tambour embroidery', src: '/images/gallery-03-tuskiiz-ornate.png' },
         { name: 'Alasha', desc: 'Woven strips', src: '/images/gallery-04-alasha-multicolor.png' },
         { name: 'Baskur', desc: 'Structural band', src: '/images/gallery-05-baskur-detail.png' },
         { name: 'Biz Keste', desc: 'Chain stitch', src: '/images/gallery-06-composite.png' },
      ],
   },

   contemporary: {
      sectionId: '06',
      sectionLabel: 'CONTEMPORARY TRENDS',
      title: 'PARADIGM\nSHIFT',
      trends: [
         {
            id: '01',
            title: 'Neo-folkloric paradigm',
            titleEng: 'NEO-FOLKLORIC PARADIGM',
            desc: 'Integration of high fashion and digital embroidery. Transition from functional survival strategy to high fashion identity.',
            large: true,
         },
         {
            id: '02',
            title: 'Ecological return',
            titleEng: 'ECOLOGICAL RETURN',
            desc: 'Wool vs. polyester. Biodegradation analysis confirms that traditional wool felt does not contribute to microplastic pollution.',
            large: false,
         },
         {
            id: '03',
            title: 'Digital synthesis',
            titleEng: 'DIGITAL SYNTHESIS',
            desc: 'Algorithmic ornament generation',
            large: false,
         },
      ],
   },

   footer: {
      title: 'LEGACY',
      content: 'The study of "Decorative arts and textile design" is not merely an aesthetic pursuit, but a multidisciplinary scientific endeavor.',
      disciplines: [
         { name: 'Chemical Sciences', desc: 'Analysis of natural pigments and keratin protein structures.' },
         { name: 'Mathematical Sciences', desc: 'Computation of complex geometric symmetry in ornamentation.' },
         { name: 'Sociological Sciences', desc: 'From nomadic talismans to contemporary indicators of national identity.' },
      ],
   },
};

/* ═══════════════════════════════════════════════
   APP COMPONENT
   TODO: Consider splitting sections into separate
   components and consolidating GSAP+Framer Motion
   into one library (I8/I9)
   ═══════════════════════════════════════════════ */

/* ── Scrollytelling Constants ── */
const FRAME_COUNT = 192;
const FRAME_URLS = Array.from(
   { length: FRAME_COUNT },
   (_, i) => `/frames/frame_${String(i + 1).padStart(4, '0')}.webp`
);

/* ── Module-scoped frame storage (avoids `window as any`) ── */
let __heroFrames: HTMLImageElement[] | null = null;

export default function App() {
   const containerRef = useRef<HTMLDivElement>(null);
   const galleryRef = useRef<HTMLDivElement>(null);
   const heroSectionRef = useRef<HTMLElement>(null);
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const [activeSymbol, setActiveSymbol] = useState<number | null>(null);
   const [loadingProgress, setLoadingProgress] = useState(0);
   const [isLoaded, setIsLoaded] = useState(false);
   const [isMobile, setIsMobile] = useState(false);

   /* ── Symbol decoder keyboard handler (C6) ── */
   const handleSymbolKeyDown = useCallback((idx: number) => (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
         e.preventDefault();
         setActiveSymbol(prev => prev === idx ? null : idx);
      }
   }, []);

   /* ── Device Detection + Resize Handler ── */
   useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth <= 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
   }, []);

   /* ── Frame Preloader (Desktop only) ── */
   useEffect(() => {
      if (isMobile) {
         setIsLoaded(true);
         return;
      }

      let loaded = 0;
      const images: HTMLImageElement[] = [];

      const onFrameLoad = () => {
         loaded++;
         setLoadingProgress(loaded);
         if (loaded >= FRAME_COUNT) {
            setIsLoaded(true);
            // Draw first frame once all loaded
            const canvas = canvasRef.current;
            if (canvas && images[0]) {
               const ctx = canvas.getContext('2d');
               if (ctx) {
                  const dpr = Math.min(window.devicePixelRatio || 1, 2);
                  canvas.width = 1920 * dpr;
                  canvas.height = 1080 * dpr;
                  ctx.scale(dpr, dpr);
                  canvas.style.width = '100%';
                  canvas.style.height = '100%';
                  ctx.drawImage(images[0], 0, 0, 1920, 1080);
               }
            }
         }
      };

      FRAME_URLS.forEach((url) => {
         const img = new Image();
         img.src = url;
         img.onload = onFrameLoad;
         img.onerror = onFrameLoad; // count errors too to not block forever
         images.push(img);
      });

      // Store images in module scope for GSAP to access
      __heroFrames = images;

      return () => {
         __heroFrames = null;
      };
   }, [isMobile]);

   /* ── GSAP + Lenis Init (with gsap.context for proper cleanup) ── */
   useEffect(() => {
      if (!isLoaded) return;

      let lenis: any;
      let gsapCtx: any;
      let gsapInstance: any;
      let rafCallback: any;
      // Check reduced motion preference (C1)
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const init = async () => {
         try {
            const gsapModule = await import('gsap');
            const gsap = gsapModule.default || gsapModule.gsap;
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            const LenisModule = await import('lenis');
            const Lenis = LenisModule.default;

            gsap.registerPlugin(ScrollTrigger);

            // Lenis smooth scroll
            lenis = new Lenis({
               duration: 1.4,
               easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
               smoothWheel: true,
            });

            lenis.on('scroll', ScrollTrigger.update);
            rafCallback = (time: number) => lenis.raf(time * 1000);
            gsapInstance = gsap;
            gsap.ticker.add(rafCallback);
            gsap.ticker.lagSmoothing(0);

            // Wrap all GSAP animations in gsap.context() for automatic cleanup
            gsapCtx = gsap.context(() => {
               // ── Hero Frame Scrubbing (Desktop only) ──
               if (!isMobile) {
                  const canvas = canvasRef.current;
                  const heroSection = heroSectionRef.current;
                  const images = __heroFrames;

                  if (canvas && heroSection && images && images.length > 0) {
                     const ctx = canvas.getContext('2d')!;
                     const dpr = Math.min(window.devicePixelRatio || 1, 2);
                     canvas.width = 1920 * dpr;
                     canvas.height = 1080 * dpr;
                     ctx.scale(dpr, dpr);

                     const playhead = { frame: 0 };

                     const updateImage = () => {
                        const frameIndex = Math.round(playhead.frame);
                        const img = images[Math.min(frameIndex, images.length - 1)];
                        if (img && img.complete) {
                           ctx.clearRect(0, 0, 1920, 1080);
                           ctx.drawImage(img, 0, 0, 1920, 1080);
                        }
                     };

                     // Draw first frame
                     updateImage();

                     gsap.to(playhead, {
                        frame: images.length - 1,
                        ease: 'none',
                        onUpdate: updateImage,
                        scrollTrigger: {
                           trigger: heroSection,
                           start: 'top top',
                           end: '+=300%',
                           pin: true,
                           scrub: 1,
                           anticipatePin: 1,
                           snap: {
                              snapTo: [0, 0.35, 0.70, 1],
                              duration: { min: 0.4, max: 1.2 },
                              ease: 'power2.inOut',
                              inertia: false,
                              directional: false,
                           },
                        },
                     });

                     // Hero text parallax fade
                     const heroContent = heroSection.querySelector('.hero-content');
                     if (heroContent) {
                        gsap.to(heroContent, {
                           autoAlpha: 0,
                           y: -80,
                           ease: 'power1.out',
                           scrollTrigger: {
                              trigger: heroSection,
                              start: 'top -10%', // Delay fade slightly
                              end: '+=100%',     // Complete fade smoothly
                              scrub: 1.5,
                           },
                        });
                     }
                  }

                  // ── Hero Text Complex Animation ──
                  const heroTl = gsap.timeline({ delay: 0.5 });

                  // 2. Fade in all characters smoothly
                  heroTl.to('.requiem-text span', {
                     autoAlpha: 1,
                     duration: 1.5,
                     ease: "power2.out",
                     stagger: {
                        amount: 1.5,
                        from: "random"
                     }
                  });

                  // 3. Fill the text with solid color & shadow
                  heroTl.to('.requiem-text', {
                     color: 'var(--color-cream)',
                     textShadow: '0 0 30px rgba(232, 224, 208, 0.3)',
                     duration: 1.2,
                     onComplete: () => {
                        const textEl = document.querySelector('.requiem-text');
                        if (textEl) {
                           textEl.classList.add('glitch-text');
                           // @ts-ignore - WebkitTextStroke support
                           textEl.style.webkitTextStroke = '0';
                        }
                     }
                  }, "-=0.5");



                  // Section reveals (using autoAlpha for GPU-optimized visibility)
                  const revealEls = document.querySelectorAll('.reveal-up');
                  revealEls.forEach((el) => {
                     gsap.to(el, {
                        autoAlpha: 1,
                        y: 0,
                        duration: 1.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                           trigger: el,
                           start: 'top 95%',
                           toggleActions: 'play none none none',
                        },
                     });
                  });

                  // Gallery horizontal scroll
                  const gallery = galleryRef.current;
                  if (gallery) {
                     const track = gallery.querySelector('.gallery-track') as HTMLElement;
                     if (track) {
                        const totalWidth = track.scrollWidth - gallery.clientWidth;
                        gsap.fromTo(track, 
                           { x: -totalWidth },
                           {
                           x: 0,
                           ease: 'none',
                           scrollTrigger: {
                              trigger: gallery,
                              start: 'top top',
                              end: () => `+=${totalWidth}`,
                              pin: true,
                              scrub: 1,
                              anticipatePin: 1,
                           },
                        });
                     }
                  }
               }

               // ══════════ NEW SECTIONS GSAP ANIMATIONS ══════════

               // Text Splitting is now handled cleanly in React markup

               // Manifesto Text Animation
               gsap.fromTo('.gs-split-text .split-word',
                  { y: '50%', opacity: 0 },
                  {
                     y: '0%', opacity: 1,
                     duration: 1.2,
                     stagger: 0.05,
                     ease: 'power4.out',
                     scrollTrigger: {
                        trigger: '#manifesto-spatial-section',
                        start: 'top 90%',
                     }
                  }
               );

               // Manifesto fade-up paragraph
               gsap.fromTo('.gs-fade-up',
                  { y: 50, opacity: 0 },
                  {
                     y: 0, opacity: 1, duration: 1.5, ease: 'power3.out',
                     scrollTrigger: {
                        trigger: '.gs-fade-up',
                        start: 'top 95%',
                     }
                  }
               );

               // Bento Card Stagger Reveal
               gsap.fromTo('.bento-card',
                  { y: 100, opacity: 0, scale: 0.95 },
                  {
                     y: 0, opacity: 1, scale: 1,
                     duration: 1,
                     stagger: 0.1,
                     ease: 'power3.out',
                     scrollTrigger: {
                        trigger: '#features-section',
                        start: 'top 85%',
                     }
                  }
               );

               // Bar Chart Animation
               gsap.fromTo('.gs-bar',
                  { scaleY: 0, transformOrigin: 'bottom' },
                  {
                     scaleY: 1,
                     duration: 1.5,
                     stagger: 0.1,
                     ease: 'expo.out',
                     scrollTrigger: {
                        trigger: '.gs-bar',
                        start: 'top 95%',
                     }
                  }
               );

               // Telemetry Node Map Path Animation
               gsap.fromTo('.gs-node-path',
                  { strokeDasharray: 100, strokeDashoffset: 100 },
                  {
                     strokeDashoffset: 0,
                     duration: 2,
                     ease: 'power2.inOut',
                     scrollTrigger: {
                        trigger: '#telemetry-section',
                        start: 'top 85%',
                     }
                  }
               );

               // Telemetry Node Scale-in
               gsap.fromTo('.gs-node',
                  { scale: 0, transformOrigin: 'center' },
                  {
                     scale: 1,
                     duration: 0.5,
                     stagger: 0.1,
                     ease: 'back.out(2)',
                     scrollTrigger: {
                        trigger: '#telemetry-section',
                        start: 'top 85%',
                     }
                  }
               );

               // Terminal Logs typing effect
               const termLogs = document.querySelectorAll('#terminal-logs p:not(:last-child)');
               if (termLogs.length > 0) {
                  gsap.set(termLogs, { opacity: 0, x: -10 });
                  ScrollTrigger.create({
                     trigger: '#terminal-logs',
                     start: 'top 80%',
                     once: true,
                     onEnter: () => {
                        gsap.to(termLogs, {
                           opacity: 1,
                           x: 0,
                           duration: 0.1,
                           stagger: 0.2,
                           ease: 'none',
                        });
                     },
                  });
               }

            }, containerRef); // Scope GSAP context to app container
         } catch (e) {
            // P3: Log in development only
            if (import.meta.env.DEV) {
               // eslint-disable-next-line no-console
               console.warn('GSAP/Lenis init error:', e);
            }
         }
      };

      init();

      return () => {
         if (gsapCtx) gsapCtx.revert(); // kills all GSAP tweens + ScrollTriggers in context
         if (gsapInstance && rafCallback) gsapInstance.ticker.remove(rafCallback);
         if (lenis) lenis.destroy();
      };
   }, [isLoaded, isMobile]);

   return (
      <div ref={containerRef} className="relative bg-void min-h-screen text-cream font-body selection:bg-teal/30 selection:text-void">
         {/* Skip to content link (C4) */}
         <a href="#main-content" className="skip-link">
            Skip to content
         </a>

         <GridOverlay />
         <GrainOverlay />
         <HUDOverlay />

         {/* ══════════ FIXED HEADER UI ══════════ */}
         <header className="fixed top-0 left-0 right-0 z-40 p-4 md:p-6 flex justify-between items-start mix-blend-difference pointer-events-none" role="banner">
            <div className="font-mono text-[9px] md:text-[10px] tracking-widest opacity-50 space-y-0.5">
               <div>PLEASE, WOULD YOU ONE TIME</div>
               <div>JUST LET ME BE MYSELF</div>
            </div>
            <div className="font-mono text-[9px] md:text-[10px] tracking-widest opacity-50 text-right space-y-0.5">
               <div>I AM GROWING IN PLACES</div>
               <div>THAT NO ONE CAN SEE</div>
            </div>
         </header>

         {/* ══════════ PERSISTENT BOTTOM HUD ══════════ */}
         <div className="fixed bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 z-40 flex justify-between items-end mix-blend-difference pointer-events-none">
            <div className="flex gap-3 items-end">
               <div className="h-10 w-28 border border-cream/15 flex items-center justify-center bg-void/40 backdrop-blur-sm" aria-hidden="true">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-mist/50">||||||||||||||</span>
               </div>
               <span className="font-mono text-[9px] text-mist/30">11:11</span>
            </div>
            <div className="flex flex-col items-center">
               <StarIcon className="w-6 h-6 md:w-8 md:h-8 text-teal animate-pulse opacity-60" />
            </div>
            <div className="flex gap-2 font-mono text-[9px] border border-cream/15 p-2 bg-void/40 backdrop-blur-sm" aria-hidden="true">
               <div className="flex flex-col text-right text-mist/50">
                  <span>FFX</span>
                  <span>INFERNAL</span>
               </div>
               <div className="w-px bg-cream/10" />
               <div className="flex flex-col text-mist/50">
                  <span>PHU.CP</span>
                  <span>SYSTEM</span>
               </div>
            </div>
         </div>

         {/* ══════════ LOADING OVERLAY ══════════ */}
         <AnimatePresence>
            {!isLoaded && !isMobile && (
               <motion.div
                  key="loader"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="fixed inset-0 z-[200] bg-void flex flex-col items-center justify-center"
                  aria-label="Loading"
               >
                  <div className="flex flex-col items-center gap-6">
                     <div className="relative w-48 h-[2px] bg-cream/10 overflow-hidden">
                        <motion.div
                           className="absolute inset-y-0 left-0 bg-teal"
                           style={{ width: `${(loadingProgress / FRAME_COUNT) * 100}%` }}
                           transition={{ duration: 0.1 }}
                        />
                     </div>
                     <div className="font-mono text-[10px] tracking-[0.3em] text-mist/50">
                        LOADING... {loadingProgress}/{FRAME_COUNT}
                     </div>
                     <div className="font-pixel text-xs tracking-wider text-teal/40 mt-2">
                        REQUIEM
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         {/* ══════════ MAIN CONTENT (C4) ══════════ */}
         <main id="main-content">
            {/* ══════════ SECTION 1: HERO (SCROLLYTELLING) ══════════ */}
            <section
               ref={heroSectionRef}
               aria-label="Home page"
               className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
            >
               {/* Canvas Background (Desktop) */}
               {!isMobile && (
                  <canvas
                     ref={canvasRef}
                     className="absolute inset-0 w-full h-full object-cover z-0"
                     style={{ opacity: isLoaded ? 0.35 : 0 }}
                     aria-hidden="true"
                  />
               )}

               {/* Static Image (Mobile) */}
               {isMobile && (
                  <img
                     src="/assets/hero-mobile.jpg"
                     alt=""
                     className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
                  />
               )}

               {/* Geometric HUD Elements (Desktop) */}
               {!isMobile && (
                  <>
                     <div className="absolute top-[15%] left-8 w-[200px] h-[200px] z-[1] pointer-events-none hidden lg:block">
                        <GeometricAbstraction variant="circles" className="w-full h-full" />
                     </div>
                     <div className="absolute bottom-[20%] right-8 w-[180px] h-[180px] z-[1] pointer-events-none hidden lg:block">
                        <GeometricAbstraction variant="diamond" className="w-full h-full" />
                     </div>
                     <CoordinateMarker x="left-4" y="top-[40%]" label="X:00.421" />
                     <CoordinateMarker x="right-4" y="top-[60%]" label="Y:91.003" />
                     <CoordinateMarker x="left-[20%]" y="bottom-[15%]" label="Z:NOMADIC" />
                  </>
               )}
               <ScanLine />

               {/* Gradient overlay for text readability */}
               <div className="absolute inset-0 z-[2] bg-gradient-to-t from-void via-void/40 to-void/60" aria-hidden="true" />

               {/* Hero Content */}
               <div className="hero-content relative z-10 w-full max-w-4xl px-4 md:px-6 flex flex-col items-center justify-center text-center h-full">
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                     transition={{ delay: 0.3, duration: 1 }}
                     className="mb-6"
                  >
                     <GlobeIcon className="w-10 h-10 text-teal mx-auto mb-3 opacity-60" />
                     <span className="font-mono text-[9px] md:text-[10px] text-teal tracking-[0.4em] block">{content.hero.meta}</span>
                  </motion.div>

                  <div className="relative">
                     <h1 className="font-pixel text-[18vw] md:text-[10vw] leading-[0.8] text-cream mix-blend-lighten z-20 relative requiem-text" data-text="REQUIEM">
                        <span className="opacity-0">R</span>
                        <span className="opacity-0">E</span>
                        <span className="opacity-0">Q</span>
                        <span className="opacity-0">U</span>
                        <span className="opacity-0">I</span>
                        <span className="opacity-0">E</span>
                        <span className="opacity-0">M</span>
                     </h1>
                  </div>

                  <motion.p
                     initial={{ opacity: 0 }}
                     animate={{ opacity: isLoaded ? 1 : 0 }}
                     transition={{ delay: 0.8, duration: 1 }}
                     className="mt-6 text-[10px] md:text-xs font-mono font-light tracking-[0.15em] uppercase max-w-lg text-mist"
                  >
                     {content.hero.subtitle}
                  </motion.p>

                  {/* Scroll indicator */}
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: isLoaded ? 1 : 0 }}
                     transition={{ delay: 1.5, duration: 1 }}
                     className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                  >
                     <span className="font-mono text-[8px] tracking-[0.4em] text-mist/30 uppercase">Scroll</span>
                     <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-px h-8 bg-gradient-to-b from-teal/60 to-transparent"
                        aria-hidden="true"
                     />
                  </motion.div>
               </div>

               {/* Bottom Bar — now handled by persistent HUD above */}
            </section>

            {/* ══════════ NEW SECTION: MANIFESTO & SPATIAL ENGINE ══════════ */}
            <section className="relative w-full py-32 bg-void border-t border-cream/5 z-20" id="manifesto-spatial-section">
               <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col gap-16">

                  {/* Section Header */}
                  <div className="w-full flex justify-between items-end border-b border-cream/20 pb-4 mb-4">
                     <h2 className="font-mono text-[10px] md:text-xs text-teal tracking-[0.2em] uppercase flex items-center gap-3">
                        <span className="w-[4px] h-[4px] bg-teal animate-pulse" />
                        Module 01 // Cognitive Architecture
                     </h2>
                     <span className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-mist/50">SYS.UPTIME: 99.994%</span>
                  </div>

                  {/* Massive Text Block */}
                  <div className="w-full relative flex flex-col md:flex-row gap-12 justify-between items-start">
                     <p className="font-pixel fluid-heading-lg leading-[0.85] text-cream/90 max-w-4xl mix-blend-exclusion gs-split-text tracking-tighter uppercase">
                        {'WE TRAINED A NEURAL NETWORK ON EVERY STONE OF ANTIQUITY.'.split(' ').map((word, i) => (
                           <span key={`w1-${i}`} className="split-line"><span className="split-word">{word}&nbsp;</span></span>
                        ))}
                        <br />
                        {'NOW IT DREAMS IN VOLUMETRIC SPACE.'.split(' ').map((word, i) => (
                           <span key={`w2-${i}`} className="split-line"><span className="split-word">{word}&nbsp;</span></span>
                        ))}
                     </p>
                     <p className="font-mono text-[10px] md:text-xs text-mist/70 pt-4 md:w-1/3 leading-loose tracking-widest uppercase gs-fade-up border-l border-cream/10 pl-6">
                        Requiem is not a rendering engine. It is a spatial intelligence protocol.
                        Input raw geometric logic; output mathematically perfect, emotionally resonant
                        environments that possess atmospheric weight and architectural soul.
                     </p>
                  </div>

                  {/* Metric Ticker Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-cream/10 mt-12">
                     <div className="bg-void p-6 flex flex-col gap-2 bento-card">
                        <span className="font-mono text-[10px] text-mist/50">LATENCY / RT</span>
                        <span className="font-mono text-2xl text-cream">1.4ms</span>
                     </div>
                     <div className="bg-void p-6 flex flex-col gap-2 bento-card">
                        <span className="font-mono text-[10px] text-mist/50">POLYGON THROUGHPUT</span>
                        <span className="font-mono text-2xl text-cream">47.2B/s</span>
                     </div>
                     <div className="bg-void p-6 flex flex-col gap-2 bento-card">
                        <span className="font-mono text-[10px] text-mist/50">PHOTON BOUNCES</span>
                        <span className="font-mono text-2xl text-cream">Infinite</span>
                     </div>
                     <div className="bg-void p-6 flex flex-col gap-2 bento-card relative overflow-hidden">
                        <span className="font-mono text-[10px] text-mist/50">STATUS</span>
                        <span className="font-mono text-2xl text-teal">ACTIVE</span>
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-teal/50 shadow-[0_0_10px_rgba(42,122,158,0.8)] scan-line" />
                     </div>
                  </div>
               </div>
            </section>

            {/* ══════════ NEW SECTION: THE VAULT (CAPABILITIES) ══════════ */}
            <section className="relative w-full py-32 bg-void overflow-hidden border-t border-cream/5" id="features-section">

               {/* Large Background Typography */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03]">
                  <h2 className="font-pixel text-[20vw] leading-[0.8] whitespace-nowrap text-transparent" style={{ WebkitTextStroke: '1px rgba(232,224,208,0.5)' }}>
                     CAPABILITIES
                  </h2>
               </div>

               <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
                  <div className="grid grid-cols-12 gap-px bg-cream/5 border border-cream/5 p-px">

                     {/* Bento Block 1: The Tall Arch */}
                     <div className="col-span-12 md:col-span-5 row-span-2 bento-card p-0 flex flex-col group min-h-[500px] bg-void">
                        <div className="relative w-full h-[60%] overflow-hidden">
                           <img
                              src="/images/neural-radiance.png"
                              alt="Neural Radiance Fields"
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                              loading="lazy"
                           />
                           <div className="absolute top-0 right-4 w-px h-full bg-cream/10 z-10" />
                           <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
                           <div className="absolute top-4 right-4 bg-void/60 backdrop-blur-md px-3 py-1 border border-cream/20 font-mono text-[9px] flex gap-2 items-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
                              RECORDING
                           </div>
                        </div>
                        <div className="p-8 flex flex-col justify-end flex-grow border-t border-cream/10">
                           <h3 className="font-pixel text-xl text-cream mb-4 uppercase tracking-tighter">Neural Radiance Fields</h3>
                           <p className="font-mono text-[10px] leading-loose text-mist/70 uppercase tracking-widest">
                              Bypass traditional rasterization. Requiem interprets spatial data via a proprietary NeRF architecture,
                              calculating infinite light bounces in real-time.
                           </p>
                        </div>
                     </div>

                     {/* Bento Block 2: Data Panel */}
                     <div className="col-span-12 md:col-span-7 row-span-1 bento-card p-8 flex flex-col justify-between group bg-void">
                        <div className="flex justify-between items-start">
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-mist/30 group-hover:text-amber transition-colors">
                              <rect x="3" y="3" width="18" height="18" />
                              <line x1="3" y1="9" x2="21" y2="9" />
                              <line x1="9" y1="21" x2="9" y2="9" />
                           </svg>
                           <span className="font-mono text-[10px] tracking-[0.2em] border border-cream/10 px-3 py-1 text-mist/50">MODULE_02</span>
                        </div>
                        <div className="mt-12">
                           <h3 className="font-pixel text-xl text-cream mb-4 uppercase tracking-tighter">Atmospheric Scattering</h3>
                           <p className="font-mono text-[10px] text-mist/70 leading-loose max-w-md uppercase tracking-widest">
                              Simulate particulate matter, humidity, and microscopic dust density.
                              Light interacts with the void precisely as it does in physical reality.
                           </p>
                        </div>
                        <div className="w-full h-px bg-cream/10 mt-8 relative overflow-hidden">
                           <div className="absolute top-0 left-0 h-full w-1/4 bg-amber -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
                        </div>
                     </div>

                     {/* Bento Block 3: The Graph */}
                     <div className="col-span-12 md:col-span-3 row-span-1 bento-card p-6 flex flex-col items-center justify-center relative group bg-void">
                        <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity bg-radial-[circle_at_center] from-amber to-transparent" />
                        <div className="relative w-full h-32 flex items-end gap-[2px] px-4">
                           <div className="w-1/6 bg-cream/10 hover:bg-cream transition-colors h-[20%] gs-bar" />
                           <div className="w-1/6 bg-cream/10 hover:bg-cream transition-colors h-[40%] gs-bar" />
                           <div className="w-1/6 bg-cream/20 hover:bg-cream transition-colors h-[30%] gs-bar" />
                           <div className="w-1/6 bg-amber hover:bg-cream transition-colors h-[80%] gs-bar relative shadow-[0_0_15px_rgba(212,165,116,0.2)]">
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[8px] opacity-0 group-hover:opacity-100 transition-opacity text-cream">MAX</div>
                           </div>
                           <div className="w-1/6 bg-cream/10 hover:bg-cream transition-colors h-[50%] gs-bar" />
                           <div className="w-1/6 bg-cream/10 hover:bg-cream transition-colors h-[60%] gs-bar" />
                        </div>
                        <span className="font-mono text-[9px] tracking-widest text-mist/50 mt-6">TENSOR ALLOCATION</span>
                     </div>

                     {/* Bento Block 4: Typography Box — Inverted */}
                     <div className="col-span-12 md:col-span-4 row-span-1 bento-card p-8 bg-cream text-void flex flex-col justify-between group origin-bottom-right transition-all">
                        <p className="font-mono text-[10px] font-bold border-b border-void/20 pb-6 tracking-widest leading-loose uppercase">
                           &ldquo;ARCHITECTURE IS THE MASTERLY, CORRECT AND MAGNIFICENT PLAY OF MASSES BROUGHT TOGETHER IN LIGHT.&rdquo;
                        </p>
                        <div className="mt-8 flex justify-between items-end">
                           <span className="font-pixel text-lg tracking-tighter uppercase">— LE CORBUSIER</span>
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="group-hover:translate-x-2 transition-transform">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                           </svg>
                        </div>
                     </div>

                  </div>
               </div>
            </section>

            {/* ══════════ NEW SECTION: TELEMETRY TERMINAL ══════════ */}
            <section className="relative w-full py-32 bg-void border-t border-cream/5" id="telemetry-section">

               {/* CRT Scanline Base */}
               <div className="crt-overlay absolute inset-0 pointer-events-none opacity-20" />

               <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col gap-12">

                  <div className="flex flex-col md:flex-row justify-between items-end mb-4 gap-4 border-b border-cream/10 pb-4">
                     <h2 className="font-pixel text-4xl md:text-5xl lg:text-6xl text-cream tracking-tighter leading-none">SYSTEM <br /> TELEMETRY</h2>
                     <div className="font-mono text-[10px] text-right text-mist/50 tracking-widest leading-loose uppercase">
                        <p>LIVE READOUT // SECURE CONNECTION</p>
                        <p className="text-teal">ENCRYPTION: AES-256-GCM</p>
                     </div>
                  </div>

                  {/* Dashboard Terminal */}
                  <div className="w-full border border-cream/20 bg-void/80 backdrop-blur-xl p-1 md:p-2 shadow-2xl relative">

                     {/* Terminal Header */}
                     <div className="flex justify-between items-center px-4 py-2 border-b border-cream/20 bg-cream/5">
                        <div className="flex gap-1.5">
                           <div className="w-2 h-2 bg-mist/30" />
                           <div className="w-2 h-2 bg-mist/30" />
                           <div className="w-2 h-2 bg-teal/50" />
                        </div>
                        <span className="font-mono text-[10px] tracking-widest text-mist/50">RQM_TERMINAL_V2</span>
                        <div className="font-mono text-[10px] text-cream/50">192.168.1.1</div>
                     </div>

                     {/* Terminal Body Grid */}
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-cream/10 p-px h-[600px] overflow-hidden">

                        {/* Col 1: CLI Log */}
                        <div className="bg-void p-6 flex flex-col font-mono text-[11px] text-mist overflow-hidden relative" id="terminal-logs">
                           <div className="absolute top-0 right-0 p-2 text-cream/20">LOGS</div>
                           <div className="flex flex-col gap-1 mt-4">
                              <p><span className="text-green-400">user@rqm:~$</span> initialize_engine --gpu 4</p>
                              <p className="text-mist/50">[00:00:01] Bootstrapping VRAM nodes...</p>
                              <p className="text-mist/50">[00:00:02] Loading geometric primitives (482,910 objects)</p>
                              <p className="text-amber">[00:00:03] WARN: Memory limit nearing 80%</p>
                              <p className="text-mist/50">[00:00:04] Establishing ray-tracing kernel</p>
                              <p><span className="text-green-400">user@rqm:~$</span> run_simulation -env &quot;renaissance_ruin&quot;</p>
                              <p className="text-mist/50">[00:00:05] Applying material shaders...</p>
                              <p className="text-mist/50">[00:00:06] Calculating radiosity...</p>
                              <p className="text-teal">[00:00:07] RENDER COMPLETE. Latency: 1.2ms</p>
                              <p className="mt-2"><span className="text-green-400">user@rqm:~$</span> <span className="w-2 h-4 bg-cream inline-block animate-pulse align-middle" /></p>
                           </div>
                        </div>

                        {/* Col 2: Wireframe/Node Visualizer */}
                        <div className="bg-void p-6 flex flex-col items-center justify-center relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-2 text-cream/20 font-mono text-[10px]">NODE_MAP</div>
                           <svg viewBox="0 0 200 200" className="w-full h-full max-w-[300px] opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                              <g stroke="rgba(232,224,208,0.2)" strokeWidth="1" fill="none">
                                 {/* Perimeter of the regular hexagon */}
                                 <path className="gs-node-path" d="M100,20 L169.3,60" />
                                 <path className="gs-node-path" d="M169.3,60 L169.3,140" />
                                 <path className="gs-node-path" d="M169.3,140 L100,180" />
                                 <path className="gs-node-path" d="M100,180 L30.7,140" />
                                 <path className="gs-node-path" d="M30.7,140 L30.7,60" />
                                 <path className="gs-node-path" d="M30.7,60 L100,20" />
                                 {/* Radiating spokes from center */}
                                 <path className="gs-node-path" d="M100,100 L100,20" />
                                 <path className="gs-node-path" d="M100,100 L169.3,60" />
                                 <path className="gs-node-path" d="M100,100 L169.3,140" />
                                 <path className="gs-node-path" d="M100,100 L100,180" />
                                 <path className="gs-node-path" d="M100,100 L30.7,140" />
                                 <path className="gs-node-path" d="M100,100 L30.7,60" />
                              </g>
                              <g fill="var(--color-void)" stroke="var(--color-teal)" strokeWidth="2">
                                 <circle cx="100" cy="20" r="4" className="gs-node" />
                                 <circle cx="169.3" cy="60" r="4" className="gs-node" />
                                 <circle cx="169.3" cy="140" r="4" className="gs-node" />
                                 <circle cx="100" cy="180" r="4" className="gs-node" />
                                 <circle cx="30.7" cy="140" r="4" className="gs-node" />
                                 <circle cx="30.7" cy="60" r="4" className="gs-node" />
                                 <circle cx="100" cy="100" r="6" fill="var(--color-teal)" className="gs-node" />
                              </g>
                           </svg>
                           <div className="absolute bottom-4 left-4 font-mono text-[10px] text-cream/60 flex flex-col gap-1">
                              <span>V-SYNC: <span className="text-green-400">LOCKED</span></span>
                              <span>NODE_01: ONLINE</span>
                              <span>NODE_02: ONLINE</span>
                           </div>
                        </div>

                        {/* Col 3: Live Statistics */}
                        <div className="bg-void p-6 flex flex-col font-mono relative">
                           <div className="absolute top-0 right-0 p-2 text-cream/20 font-mono text-[10px]">SYS_STATS</div>
                           <div className="flex flex-col h-full justify-between mt-8">
                              <div className="border-l-2 border-teal pl-4">
                                 <div className="text-[10px] text-mist/50 mb-1 tracking-widest">CORE TEMPERATURE</div>
                                 <div className="font-pixel text-2xl lg:text-3xl text-cream tracking-tighter">42.4°C</div>
                              </div>
                              <div className="border-l-2 border-amber/50 pl-4">
                                 <div className="text-[10px] text-mist/50 mb-1 tracking-widest">COMPUTE LOAD</div>
                                 <div className="font-pixel text-2xl lg:text-3xl text-cream tracking-tighter">84.7%</div>
                                 <div className="w-full bg-cream/10 h-1 mt-2">
                                    <div className="bg-amber h-full w-[84.7%]" />
                                 </div>
                              </div>
                              <div className="border-l-2 border-cream/20 pl-4">
                                 <div className="text-[10px] text-mist/50 mb-1 tracking-widest">SPATIAL CACHE</div>
                                 <div className="font-pixel text-2xl lg:text-3xl text-cream tracking-tighter">1.2TB</div>
                                 <div className="text-[10px] text-mist/50 mt-1 tracking-widest">FLUSHING IN 04:12</div>
                              </div>
                              <div className="w-full h-12 mt-4 opacity-50 flex flex-wrap gap-1">
                                 <div className="w-2 h-2 bg-cream/20" /><div className="w-2 h-2 bg-cream/20" /><div className="w-2 h-2 bg-cream/80" /><div className="w-2 h-2 bg-cream/20" />
                                 <div className="w-2 h-2 bg-teal" /><div className="w-2 h-2 bg-cream/20" /><div className="w-2 h-2 bg-cream/20" /><div className="w-2 h-2 bg-cream/20" />
                                 <div className="w-2 h-2 bg-cream/20" /><div className="w-2 h-2 bg-cream/20" /><div className="w-2 h-2 bg-cream/20" /><div className="w-2 h-2 bg-cream/50" />
                              </div>
                           </div>
                        </div>

                     </div>
                  </div>
               </div>
            </section>

            {/* ══════════ SECTION 2: INTRODUCTION / MANIFESTO ══════════ */}
            <section aria-label="Introduction" className="py-24 px-4 md:px-6 relative z-10 bg-void">
               {/* Background geometric detail */}
               <div className="absolute top-12 right-12 w-[300px] h-[300px] pointer-events-none hidden xl:block">
                  <GeometricAbstraction variant="grid" className="w-full h-full" />
               </div>
               <CoordinateMarker x="right-6" y="top-6" label="SEC:01.INTRO" />
               <div className="max-w-5xl mx-auto relative">
                  <CornerBrackets />
                  <SectionTitle subtitle={`${content.manifesto.sectionId} // ${content.manifesto.sectionLabel}`}>
                     {content.manifesto.title.split('\n').map((line, i) => (
                        <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                     ))}
                  </SectionTitle>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                     <div>
                        <p className="font-body text-base md:text-lg text-mist leading-relaxed font-light">
                           {content.manifesto.content}
                        </p>
                        <blockquote className="mt-8 border-l-2 border-amber pl-6 py-2">
                           <p className="font-display italic text-xl md:text-2xl text-amber/90 leading-snug">
                              {content.manifesto.pullQuote}
                           </p>
                        </blockquote>
                     </div>
                     <div className="border-l border-teal/20 pl-6 font-mono text-xs space-y-3 text-teal/70">
                        <p>OBJECTIVE: STRUCTURAL COMPARISON</p>
                        <p>STATUS: SCIENTIFIC STYLE ANALYSIS</p>
                        <p className="mt-6 text-mist/30">AREA: {content.manifesto.scope}</p>
                        <div className="mt-8 pt-4 border-t border-cream/5">
                           <MetaBadge label="DATA SOURCE" value="EMPIRICAL OBSERVATION 2024-2025" />
                           <MetaBadge label="SYSTEM" value="NOMADIC ALGORITHM V1" accent />
                        </div>
                     </div>
                  </div>
                  <DataReadout lines={['DATA: 2024-2026', 'SYSTEM: NOMADIC', 'FORMAT: SCIENTIFIC', 'VERSION: V2.1']} />
               </div>
            </section>

            <Separator />

            {/* ══════════ SECTION 3: NOMADIC ENGINEERING / YURT ══════════ */}
            <section aria-label="Nomadic engineering" className="py-24 px-4 md:px-6 relative z-10">
               {/* Background hex grid */}
               <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none hidden xl:block">
                  <HexGrid className="w-full h-full text-teal" />
               </div>
               <div className="absolute top-20 right-0 w-[250px] h-[250px] pointer-events-none hidden xl:block">
                  <GeometricAbstraction variant="angles" className="w-full h-full" />
               </div>
               <CoordinateMarker x="left-6" y="top-6" label="SEC:02.YURT" />
               <CoordinateMarker x="right-6" y="bottom-6" label="DEPTH:ENGINEERING" />

               <div className="max-w-6xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative">
                     {/* Left: Title + SVG */}
                     <div className="lg:col-span-5 lg:sticky lg:top-24 self-start relative z-10">
                        <SectionTitle subtitle={`${content.yurt.sectionId} // ${content.yurt.sectionLabel}`}>
                           {content.yurt.title.split('\n').map((line, i) => (
                              <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                           ))}
                        </SectionTitle>
                        <p className="font-body text-mist mb-8 leading-relaxed">{content.yurt.content}</p>

                        {/* Advanced SVG Yurt */}
                        <div className="w-full aspect-[6/5] border border-cream/5 bg-void-light/30 relative overflow-hidden">
                           <YurtSVG className="w-full h-full" />
                        </div>
                     </div>

                     {/* Spinning Cosmos (Orbital Placement - Breaks the grid tension) */}
                     <div className="hidden lg:flex absolute left-[35%] top-[55%] -translate-y-1/2 w-[340px] aspect-square items-center justify-center overflow-visible z-20 pointer-events-none mix-blend-screen opacity-90 drop-shadow-[0_0_40px_rgba(42,122,158,0.2)]">
                        {/* Outer rotating text ring */}
                        <div className="absolute inset-0 z-20" style={{ animation: 'spin 40s linear infinite' }}>
                           <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                              <path id="cosmos-text-path" d="M 50, 50 m -46, 0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" fill="transparent" />
                              <text className="text-[7.5px] font-mono fill-cream/80 tracking-[0.2em] uppercase" aria-hidden="true">
                                 <textPath href="#cosmos-text-path" startOffset="0%">
                                    THE NOMAD'S COSMOS ❖ THE NOMAD'S COSMOS ❖ THE NOMAD'S COSMOS ❖ THE NOMAD'S COSMOS ❖
                                 </textPath>
                              </text>
                           </svg>
                        </div>

                        {/* Inner geometric rings */}
                        <div className="absolute w-[80%] h-[80%] rounded-full overflow-hidden border border-teal/20 backdrop-blur-[2px]">
                           <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay" style={{ backgroundImage: "url('/images/yurt-interior.png')" }} />
                           <div className="absolute inset-0 border border-cream/10 rounded-full" style={{ animation: 'spin 20s linear infinite' }} />
                           <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] border-t border-l border-teal/40 rounded-full" style={{ animation: 'spin 15s linear infinite reverse' }} />
                           <div className="absolute top-[25%] left-[25%] w-[50%] h-[50%] border-r border-b border-cream/20 rounded-full" style={{ animation: 'spin 25s linear infinite' }} />
                        </div>

                        {/* Center core */}
                        <div className="absolute flex flex-col items-center justify-center z-30">
                           <span className="font-mono text-[9px] text-teal/80 tracking-widest uppercase mb-1">Eng.Apex</span>
                           <div className="w-1.5 h-1.5 bg-cream/90 rounded-full shadow-[0_0_10px_rgba(238,235,221,0.8)]"></div>
                        </div>
                     </div>

                     {/* Mobile version of cosmos (inline, slightly smaller but same style) */}
                     <div className="lg:hidden w-72 aspect-square mx-auto flex items-center justify-center relative overflow-visible my-12 pointer-events-none mix-blend-screen">
                        {/* Outer rotating text ring */}
                        <div className="absolute inset-0 z-20" style={{ animation: 'spin 40s linear infinite' }}>
                           <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                              <path id="cosmos-text-path-mobile" d="M 50, 50 m -46, 0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" fill="transparent" />
                              <text className="text-[7.5px] font-mono fill-cream/80 tracking-[0.2em] uppercase" aria-hidden="true">
                                 <textPath href="#cosmos-text-path-mobile" startOffset="0%">
                                    THE NOMAD'S COSMOS ❖ THE NOMAD'S COSMOS ❖ THE NOMAD'S COSMOS ❖ THE NOMAD'S COSMOS ❖
                                 </textPath>
                              </text>
                           </svg>
                        </div>

                        {/* Inner geometric rings */}
                        <div className="absolute w-[80%] h-[80%] rounded-full border border-teal/20 overflow-hidden">
                           <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/images/yurt-interior.png')" }} />
                           <div className="absolute inset-0 border border-cream/10 rounded-full" style={{ animation: 'spin 20s linear infinite' }} />
                           <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] border-t border-l border-teal/30 rounded-full" style={{ animation: 'spin 15s linear infinite reverse' }} />
                           <div className="absolute top-[25%] left-[25%] w-[50%] h-[50%] border-r border-b border-cream/20 rounded-full" style={{ animation: 'spin 25s linear infinite' }} />
                        </div>

                        {/* Center core */}
                        <div className="absolute flex flex-col items-center justify-center z-30">
                           <span className="font-mono text-[8px] text-teal/80 tracking-widest uppercase mb-1">Eng.Apex</span>
                           <div className="w-1 h-1 bg-cream/90 rounded-full shadow-[0_0_8px_rgba(238,235,221,0.8)]"></div>
                        </div>
                     </div>

                     {/* Right: Components */}
                     <div className="lg:col-span-7 flex flex-col gap-4 md:gap-6 pt-0 lg:pt-12 relative z-10">
                        {content.yurt.components.map((comp, idx) => (
                           <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.1, duration: 0.8 }}
                              className="group relative border border-cream/5 p-6 md:p-8 hover:border-teal/40 transition-all duration-500 bg-void-light/30 backdrop-blur-sm"
                           >
                              <div className="absolute top-0 right-0 p-3 font-mono text-[10px] text-teal/40 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                                 <span lang="en">INDEX: {comp.id}</span>
                              </div>
                              <div className="flex items-baseline gap-3 mb-2">
                                 <h3 className="font-display text-2xl md:text-3xl text-cream italic">
                                    {comp.name}
                                 </h3>
                                 <span className="font-mono text-[10px] text-mist/40 tracking-wider" lang="en">[{comp.nameEng}]</span>
                              </div>
                              <p className="font-body font-light text-mist text-sm tracking-wide">{comp.desc}</p>
                           </motion.div>
                        ))}

                        {/* Yurt Image */}
                        <div className="mt-8 h-48 md:h-64 w-full relative overflow-hidden border border-cream/5">
                           <img
                              src="/images/kerege-lattice.png"
                              alt="Kerege lattice structure — the wall lattice of the yurt"
                              width={1200}
                              height={600}
                              className="absolute inset-0 w-full h-full object-cover opacity-30 hover:scale-105 transition-transform duration-[2s]"
                              loading="lazy"
                           />
                           <div className="absolute bottom-3 left-3 bg-void px-3 py-1 font-mono text-[10px] border border-cream/10 text-mist/60" aria-hidden="true">
                              FIG 2.1: KEREGE LATTICE STRUCTURE
                           </div>
                        </div>

                        {/* Footer labels */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 font-mono text-[10px] text-mist/40">
                           {content.yurt.footer.map((label, i) => (
                              <div key={i} className="text-center md:text-left">{label}</div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            <Separator />

            {/* ══════════ SECTION 4: THREE DIRECTIONS / TAXONOMY ══════════ */}
            <section aria-label="Taxonomic classification" className="py-24 bg-void-light relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" aria-hidden="true" />
               {/* Corner geometric details */}
               <div className="absolute top-8 left-8 w-[200px] h-[200px] pointer-events-none hidden xl:block">
                  <GeometricAbstraction variant="diamond" className="w-full h-full" />
               </div>
               <div className="absolute bottom-8 right-8 w-[200px] h-[200px] pointer-events-none hidden xl:block">
                  <GeometricAbstraction variant="circles" className="w-full h-full" />
               </div>
               <CoordinateMarker x="right-6" y="top-6" label="SEC:03.TAXONOMY" />
               <ScanLine />

               <div className="max-w-7xl mx-auto px-4 md:px-6">
                  <div className="mb-16">
                     <SectionTitle subtitle={`${content.taxonomy.sectionId} // ${content.taxonomy.sectionLabel}`}>
                        {content.taxonomy.title.split('\n').map((line, i) => (
                           <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                        ))}
                     </SectionTitle>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-cream/5 border border-cream/5">
                     {content.taxonomy.types.map((type, idx) => (
                        <TechCard
                           key={idx}
                           id={`0${idx + 1}`}
                           kazName={type.kazName}
                           engName={type.engName}
                           description={type.detail}
                           subItems={type.subItems}
                           img={type.img}
                        />
                     ))}
                  </div>

                  {/* Material Science Note */}
                  <div className="mt-12 max-w-3xl mx-auto border border-cream/5 bg-void p-6 md:p-8">
                     <div className="flex items-center gap-3 mb-4">
                        <CrosshairIcon className="w-4 h-4 text-amber" />
                        <span className="font-mono text-[10px] tracking-[0.2em] text-amber uppercase">
                           Material Science Observation
                        </span>
                     </div>
                     <p className="font-body text-sm text-mist leading-relaxed">
                        Felt possesses high thermal insulation properties due to the twisted and scaly structure of keratin fibers, which allows for the trapping of air pockets.
                     </p>
                  </div>
               </div>

               {/* EST notation */}
               <div className="absolute bottom-4 right-6 font-mono text-[9px] text-mist/20" aria-hidden="true">
                  EST. XIX CENTURY
               </div>
            </section>

            {/* ══════════ SECTION 5: SEMIOTICS ══════════ */}
            <section aria-label="Semiotics" className="py-24 px-4 md:px-6 relative z-10">
               {/* Background geometric details */}
               <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[350px] h-[350px] pointer-events-none hidden xl:block">
                  <GeometricAbstraction variant="grid" className="w-full h-full" />
               </div>
               <div className="absolute top-16 left-4 w-[150px] h-[150px] pointer-events-none hidden xl:block">
                  <GeometricAbstraction variant="angles" className="w-full h-full" />
               </div>
               <CoordinateMarker x="left-6" y="top-6" label="SEC:04.SEMIOTICS" />
               <CoordinateMarker x="right-6" y="bottom-6" label="CIPHER:ACTIVE" />
               <div className="max-w-6xl mx-auto relative">
                  <CornerBrackets />
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 border-b border-cream/10 pb-8 md:pb-12 gap-6">
                     <SectionTitle subtitle={`${content.semiotics.sectionId} // ${content.semiotics.sectionLabel}`}>
                        {content.semiotics.title.split('\n').map((line, i) => (
                           <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                        ))}
                     </SectionTitle>
                     <p className="md:w-1/3 text-sm text-mist font-light md:text-right font-body">
                        {content.semiotics.content}
                     </p>
                  </div>

                  {/* Geometric Principles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                     {content.semiotics.geometric.map((geo, i) => (
                        <div key={i} className="reveal-up border border-cream/5 p-6 bg-void-light/30">
                           <div className="flex items-center gap-2 mb-3">
                              <StarIcon className="w-4 h-4 text-amber" />
                              <h4 className="font-mono text-xs text-amber tracking-wider uppercase">{geo.name}</h4>
                           </div>
                           <p className="font-body text-sm text-mist">{geo.desc}</p>
                        </div>
                     ))}
                  </div>

                  {/* Symbol Decoder (C6 — Added keyboard support, ARIA roles) */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
                     <div role="listbox" aria-label="Semiotic symbols" className="space-y-1">
                        {content.semiotics.symbols.map((symbol, idx) => (
                           <div
                              key={idx}
                              role="option"
                              aria-selected={activeSymbol === idx}
                              tabIndex={0}
                              onMouseEnter={() => setActiveSymbol(idx)}
                              onMouseLeave={() => setActiveSymbol(null)}
                              onFocus={() => setActiveSymbol(idx)}
                              onBlur={() => setActiveSymbol(null)}
                              onKeyDown={handleSymbolKeyDown(idx)}
                              className={`cursor-pointer border-b border-cream/5 py-5 md:py-6 group transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-teal ${activeSymbol === idx
                                 ? 'opacity-100 pl-4 border-l-2'
                                 : 'opacity-50 hover:opacity-100 focus:opacity-100'
                                 }`}
                              style={activeSymbol === idx ? { borderLeftColor: symbol.color } : {}}
                           >
                              <div className="flex justify-between items-baseline">
                                 <h3 className="font-display text-2xl md:text-3xl italic transition-colors duration-300"
                                    style={activeSymbol === idx ? { color: symbol.color } : {}}>
                                    {symbol.name}
                                 </h3>
                                 <span className="font-mono text-[10px] tracking-widest text-mist/30" lang="en">[{symbol.trans}]</span>
                              </div>
                              <AnimatePresence>
                                 {activeSymbol === idx && (
                                    <motion.p
                                       initial={{ height: 0, opacity: 0 }}
                                       animate={{ height: 'auto', opacity: 1 }}
                                       exit={{ height: 0, opacity: 0 }}
                                       className="text-sm text-cream/80 mt-2 font-body font-light overflow-hidden"
                                    >
                                       {symbol.meaning}
                                    </motion.p>
                                 )}
                              </AnimatePresence>
                           </div>
                        ))}
                     </div>

                     {/* Decoder Panel */}
                     <div className="relative h-[400px] md:h-[500px] border border-cream/5 bg-void-light/20 backdrop-blur-sm p-8 flex items-center justify-center overflow-hidden" aria-live="polite">
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23ffffff' fill-opacity='0.08'/%3E%3C/svg%3E\")" }} aria-hidden="true" />
                        <div className="absolute inset-0 opacity-5"
                           style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #2a7a9e 0%, transparent 70%)' }}
                           aria-hidden="true"
                        />
                        <div className="absolute top-0 left-1/2 w-px h-full bg-cream/5 -translate-x-1/2" aria-hidden="true" />
                        <div className="absolute left-0 top-1/2 w-full h-px bg-cream/5 -translate-y-1/2" aria-hidden="true" />

                        <div className="relative z-10 text-center">
                           <AnimatePresence mode="wait">
                              <motion.div
                                 key={activeSymbol ?? 'default'}
                                 initial={{ opacity: 0, scale: 0.95 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 exit={{ opacity: 0, scale: 0.95 }}
                                 transition={{ duration: 0.15, ease: "easeInOut" }}
                                 className="flex flex-col items-center"
                              >
                                 {activeSymbol !== null ? (
                                    <>
                                       <div className="w-40 h-40 md:w-48 md:h-48 border rounded-full flex items-center justify-center mb-6 relative overflow-hidden"
                                          style={{ borderColor: content.semiotics.symbols[activeSymbol].color + '60' }}>
                                          <div className="absolute inset-0 border rounded-full animate-ping opacity-10"
                                             style={{ borderColor: content.semiotics.symbols[activeSymbol].color }} />
                                          <img
                                             src={content.semiotics.symbols[activeSymbol].img}
                                             alt={content.semiotics.symbols[activeSymbol].name}
                                             className="w-28 h-28 md:w-36 md:h-36 object-contain"
                                             loading="lazy"
                                          />
                                       </div>
                                       <h4 className="font-display text-3xl md:text-4xl italic text-cream">
                                          {content.semiotics.symbols[activeSymbol].name}
                                       </h4>
                                       <p className="font-mono text-[10px] mt-2 tracking-[0.25em]"
                                          style={{ color: content.semiotics.symbols[activeSymbol].color }}>
                                          SEMIOTIC DATA IDENTIFIED
                                       </p>
                                    </>
                                 ) : (
                                    <>
                                       <div className="w-28 h-28 border border-cream/5 rounded-full flex items-center justify-center mb-6 opacity-20" aria-hidden="true">
                                          <div className="w-2 h-2 bg-cream rounded-full" />
                                       </div>
                                       <p className="font-mono text-[10px] text-mist/20 tracking-widest">
                                          SELECT DATA FOR DECODING
                                       </p>
                                    </>
                                 )}
                              </motion.div>
                           </AnimatePresence>
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            <Separator />

            {/* ══════════ SECTION 6: GALLERY / GALLERY (C5 — Content now always visible on mobile) ══════════ */}
            <section ref={galleryRef} aria-label="Artifact gallery" className="relative h-screen overflow-hidden bg-void-light">
               <CoordinateMarker x="right-6" y="top-6" label="SEC:05.GALLERY" />
               <div className="absolute bottom-12 left-12 w-[200px] h-[200px] pointer-events-none hidden xl:block z-10">
                  <GeometricAbstraction variant="diamond" className="w-full h-full" />
               </div>
               <div className="absolute top-0 left-0 w-full z-20 p-8 md:p-12">
                  <SectionTitle subtitle={`${content.gallery.sectionId} // ${content.gallery.sectionLabel}`}>
                     {content.gallery.title.split('\n').map((line, i) => (
                        <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                     ))}
                  </SectionTitle>
               </div>

               <div className="gallery-track h-full items-end pt-40 pb-12 pl-8">
                  {content.gallery.items.map((item, idx) => (
                     <div key={idx} className="flex-shrink-0 w-[300px] md:w-[400px] h-[60vh] relative group">
                        <ArchFrame src={item.src} alt={`${item.name} — ${item.desc}`} className="w-full h-full" />
                        {/* C5: Always visible on mobile, hover-reveal on desktop */}
                        <div className="absolute bottom-8 left-4 right-4 z-30 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity duration-500">
                           <div className="bg-void/80 border border-cream/10 p-3 backdrop-blur-sm">
                              <h4 className="font-display text-xl italic text-cream">{item.name}</h4>
                              <p className="font-mono text-[10px] text-teal tracking-widest">{item.desc}</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </section>

            {/* ══════════ SECTION 7: CONTEMPORARY TRENDS / CONTEMPORARY ══════════ */}
            <section aria-label="Contemporary trends" className="py-24 relative">
               <CoordinateMarker x="left-6" y="top-6" label="SEC:06.CONTEMPORARY" />
               <div className="absolute top-12 right-12 w-[250px] h-[250px] pointer-events-none hidden xl:block z-[1]">
                  <HexGrid className="w-full h-full text-cream" />
               </div>
               <div className="absolute bottom-12 left-12 w-[300px] h-[300px] pointer-events-none hidden xl:block z-[1]">
                  <GeometricAbstraction variant="circles" className="w-full h-full" />
               </div>
               <div className="absolute inset-0 z-0">
                  <img
                     src="/images/section-bg-grain.png"
                     alt=""
                     width={1920}
                     height={1080}
                     className="w-full h-full object-cover opacity-[0.08]"
                     loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/90 to-void/70" />
               </div>

               <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 md:mb-16 gap-4">
                     <SectionTitle subtitle={`${content.contemporary.sectionId} // ${content.contemporary.sectionLabel}`}>
                        {content.contemporary.title.split('\n').map((line, i) => (
                           <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                        ))}
                     </SectionTitle>
                     <p className="font-body text-sm text-mist/70 max-w-xs text-right hidden md:block">
                        Measurable shift from functional production to aesthetic production.
                     </p>
                  </div>

                  {/* Bento Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                     {/* Large card */}
                     <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-7 relative h-[350px] md:h-[500px] overflow-hidden border border-cream/5 group"
                     >
                        <img
                           src="/images/contemporary-fashion.png"
                           alt="Neo-folkloric paradigm — high fashion and traditional textile"
                           width={800}
                           height={600}
                           className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                           loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 z-10">
                           <span className="font-mono text-[10px] bg-teal/20 text-teal px-2 py-1 tracking-wider" lang="en">
                              TREND 01
                           </span>
                           <h3 className="font-display text-3xl md:text-4xl italic text-cream mt-3">
                              {content.contemporary.trends[0].title}
                           </h3>
                           <p className="font-body text-sm text-mist mt-2 max-w-md">
                              {content.contemporary.trends[0].desc}
                           </p>
                        </div>
                     </motion.div>

                     {/* Right column — stacked */}
                     <div className="md:col-span-5 flex flex-col gap-4 md:gap-6">
                        <motion.div
                           initial={{ opacity: 0, y: 30 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: 0.1 }}
                           className="border border-cream/5 bg-void hover:border-teal/30 transition-colors duration-500 flex-1 overflow-hidden"
                        >
                           <div className="relative h-28 overflow-hidden">
                              <img src="/images/ecological-wool.png" alt="Ecological wool" className="w-full h-full object-cover opacity-30" loading="lazy" />
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-void" />
                           </div>
                           <div className="p-6 md:p-8">
                              <div className="flex items-center justify-between mb-4">
                                 <span className="font-mono text-[10px] bg-teal/20 text-teal px-2 py-1 tracking-wider" lang="en">
                                    TREND 02
                                 </span>
                                 <div className="w-3 h-3 rounded-full bg-teal" aria-hidden="true" />
                              </div>
                              <h3 className="font-display text-2xl md:text-3xl italic text-cream mb-3">
                                 {content.contemporary.trends[1].title}
                              </h3>
                              <p className="font-body text-sm text-mist">
                                 {content.contemporary.trends[1].desc}
                              </p>
                           </div>
                        </motion.div>

                        <motion.div
                           initial={{ opacity: 0, y: 30 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: 0.2 }}
                           className="relative h-[180px] md:h-[220px] border border-cream/5 overflow-hidden group"
                        >
                           <img
                              src="/images/digital-ornament.png"
                              alt="Digital synthesis — algorithmic ornament generation"
                              width={600}
                              height={400}
                              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                              loading="lazy"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-transparent" />
                           <div className="absolute bottom-4 left-4 right-4 z-10">
                              <h3 className="font-display text-xl md:text-2xl italic text-cream">
                                 {content.contemporary.trends[2].title}
                              </h3>
                              <p className="font-mono text-[10px] text-teal tracking-wider mt-1" lang="en">
                                 {content.contemporary.trends[2].titleEng}
                              </p>
                           </div>
                        </motion.div>
                     </div>
                  </div>
               </div>
            </section>
         </main>

         {/* ══════════ SECTION 8: FOOTER / HERITAGE ══════════ */}
         <footer className="py-24 px-4 md:px-6 border-t border-cream/5 bg-void relative overflow-hidden" role="contentinfo">
            <CoordinateMarker x="left-6" y="top-6" label="SEC:07.HERITAGE" />
            <div className="absolute top-8 right-8 w-[250px] h-[250px] pointer-events-none hidden xl:block">
               <GeometricAbstraction variant="grid" className="w-full h-full" />
            </div>
            <div className="max-w-7xl mx-auto relative">
               <CornerBrackets />
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-16">
                  {/* Left: Title + Description */}
                  <div className="col-span-1 lg:col-span-2">
                     <h2 className="font-display text-5xl md:text-7xl italic text-cream mb-6">End of Treatise</h2>
                     <p className="text-mist max-w-md font-body font-light leading-relaxed mb-6">
                        {content.footer.content}
                     </p>
                     <a href="mailto:analysis@requiem.kz" className="font-display text-xl md:text-2xl italic text-cream hover:text-teal transition-colors duration-500">
                        analysis@requiem.kz
                     </a>
                  </div>

                  {/* Disciplines */}
                  <div className="space-y-4">
                     <h3 className="font-mono text-[10px] text-teal tracking-[0.3em] mb-4 uppercase">DISCIPLINES</h3>
                     <ul className="space-y-3">
                        {content.footer.disciplines.map((d, i) => (
                           <li key={i} className="group">
                              <div className="flex items-center gap-2 mb-0.5">
                                 <div className="w-1.5 h-1.5 bg-teal/60 group-hover:bg-teal transition-colors" aria-hidden="true" />
                                 <span className="text-sm font-body text-cream">{d.name}</span>
                              </div>
                              <p className="font-body text-xs text-mist/50 pl-3.5">{d.desc}</p>
                           </li>
                        ))}
                     </ul>
                  </div>

                  {/* Contact */}
                  <div className="flex flex-col justify-between">
                     <div>
                        <h3 className="font-mono text-[10px] text-teal tracking-[0.3em] mb-4 uppercase">COORDINATES</h3>
                        <div className="space-y-1 font-mono text-xs text-mist/50">
                           <p>Almaty, Kazakhstan</p>
                           <p>43.2220° N, 76.8512° E</p>
                           <p lang="en">System: Earth-01</p>
                        </div>
                     </div>
                     <div className="mt-6">
                        <h3 className="font-mono text-[10px] text-teal tracking-[0.3em] mb-3 uppercase">LINKS</h3>
                        <div className="space-y-1 font-mono text-xs text-mist/40">
                           <p>History & Context</p>
                           <p>Technological Stack</p>
                           <p>Semiotic Data</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Bottom bar */}
               <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-cream/5">
                  <div className="font-pixel text-xl md:text-2xl text-cream mb-4 md:mb-0 tracking-wider">
                     KAZAKH TEXTILE ENGINEERING
                  </div>
                  <div className="text-[9px] text-mist/20 text-center md:text-right">
                     <span className="font-pixel-line">© 2026 REQUIEM ARCHIVE.</span><br />
                     <span className="font-mono">ALL RIGHTS RESERVED.</span>
                  </div>
               </div>
            </div>

            {/* Giant Background Text */}
            <div className="absolute bottom-[-5vw] left-0 w-full text-center pointer-events-none select-none opacity-[0.03]" aria-hidden="true">
               <span className="font-display italic text-[20vw]">ORNAMENT</span>
            </div>
         </footer>
      </div>
   );
}