import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
   GridOverlay, GrainOverlay, StarIcon, GlobeIcon, CrosshairIcon,
   SectionTitle, Separator, ArchFrame, MetaBadge, TechCard,
   CornerBrackets, ScanLine, CoordinateMarker, HexGrid,
   GeometricAbstraction, DiamondIcon, DataReadout,
} from './components/UI';
import YurtSVG from './components/YurtSVG';

/* ═══════════════════════════════════════════════
   CONTENT DATA
   ═══════════════════════════════════════════════ */

const content = {
   hero: {
      title: 'REQUIEM',
      subtitle: 'ҚАЗАҚ СӘНДІК ӨНЕРІ МЕН ТОҚЫМА ИНЖЕНЕРИЯСЫ',
      meta: 'АҚПАН 2026 // ЖҮЙЕ: КӨШПЕЛІ // ТАЛДАУ: СЕМИОТИКА',
   },

   manifesto: {
      sectionId: '01',
      sectionLabel: 'КІРІСПЕ',
      title: 'EPISTEMOLOGICAL\nCONTEXT',
      content: 'Бұл трактат қазақ тоқыма өнерін қарапайым қолөнер ретінде емес, инженерия мен семиотиканың күрделі жүйесі ретінде қарастырады. Ғылыми стильге сәйкес, бұл есеп эволюцияны, технологиялық әдістемелерді және мәдені семиотиканы анықтау үшін объективті терминологияны қолданады.',
      pullQuote: '«Қарапайым қолөнер емес — инженерия мен семиотиканың күрделі жүйесі»',
      scope: 'СӘНДІК ӨНЕР & ТОҚЫМА ИНЖЕНЕРИЯСЫ',
   },

   yurt: {
      sectionId: '02',
      sectionLabel: 'ТАРИХИ НЕГІЗ',
      title: 'ENGINEERING\nAPEX',
      content: 'Киіз үй — көшпелі тоқыма инженериясының шыңы. Ол жай тұрғын үй ғана емес, мамандандырылған тоқыма компоненттерінің композиті.',
      components: [
         { id: '01', name: 'Тұрлық', nameEng: 'Tuyrlyk', desc: 'Кереге секцияларына қолданылатын киіз жабын.' },
         { id: '02', name: 'Үзүк', nameEng: 'Uzuk', desc: 'Күмбез құрылымына арналған киіз жабын.' },
         { id: '03', name: 'Баскүр', nameEng: 'Baskur', desc: 'Құрылымдық тұтастық пен ішкі сәндік үшін тоқылған таспалар.' },
      ],
      footer: [
         '> ТҰРЛЫҚ: ЖЫЛУ ҚАЛҚАНЫ',
         '> ҮЗҮК: ГИДРОФОБТЫ КҮМБЕЗ',
         '> БАСКҮР: СОЗЫЛУ АРМАТУРАСЫ',
      ],
   },

   taxonomy: {
      sectionId: '03',
      sectionLabel: 'ТАКСОНОМИЯЛЫҚ СЫНЫПТАУ',
      title: 'THREE TECHNOLOGICAL\nVECTORS',
      desc: 'Қатаң ғылыми зерттеу мақсатында өндіріс әдістемелерін жіктеу қажет.',
      types: [
         {
            kazName: 'КІГІЗ БАСУ',
            engName: 'Non-Woven Technologies',
            detail: 'Жіптерді айқастырмай, жылу энергиясы, ылғал және механикалық қысым арқылы жасалған примордиалды тоқымасыз мата.',
            img: '/images/felt-making-process.png',
            subItems: [
               { name: 'ТЕКЕМЕТ', desc: 'Боялған жүннің негізгі субстратқа қабаттасуы. Диффузды, жұмсартылған ауысулар.', img: '/images/tekemet-carpet.png' },
               { name: 'СЫРМАҚ', desc: 'Мозаикалық әдістеме. Оң/Теріс кесу. Жоғары контрасттылық.', img: '/images/syrmak-carpet.png' },
            ],
         },
         {
            kazName: 'ТОҚЫМА',
            engName: 'Loom-Based Fabrication',
            detail: 'Тегіс субстраттағы көтерілген, мақпал текстуралы ою генерациялау үшін күрделі «қосымша бүкіл» техникасы.',
            img: '/images/ormek-loom.png',
            subItems: [
               { name: 'АЛАША', desc: 'Жіңішке тоқылған кілем жолақтары, бойлық тігіспен.', img: '/images/alasha-strips.png' },
               { name: 'БАСКҮР', desc: 'Ормекте тоқылған құрылымдық таспалар.', img: '/images/baskur-band.png' },
            ],
         },
         {
            kazName: 'КЕСТЕ',
            engName: 'Embroidered Adornment',
            detail: 'Ілгекті аспаппен (біз) орындалатын тамбур кестесі. Тоқыманың ортогоналды шектеулерінен ерекше сұйық, қисық сызықты формалар.',
            img: '/images/embroidery-tools.png',
            subItems: [
               { name: 'БІЗ КЕСТЕ', desc: 'Үздіксіз тізбек тігісі. Сұйықтық.', img: '/images/biz-keste-detail.png' },
               { name: 'ТҮСКИІЗ', desc: 'Кеңжерлі кеспе қабырға жабынлары. Әдейі толықсыздық (апотропаикалық).', img: '/images/tuskiiz-hanging.png' },
            ],
         },
      ],
   },

   semiotics: {
      sectionId: '04',
      sectionLabel: 'СЕМИОТИКА',
      title: 'SECRET OF\nORNAMENT',
      content: '«Ғылыми стиль» талдауы оюларды (ою-өрнек) жай сәндік безендіру емес, семиотикалық шифр немесе иконографиялық лексикон ретінде түсіндіруді талап етеді.',
      geometric: [
         { name: 'Симметрия', desc: 'Бейнелеу симметриясы (билатералды сәйкестік) немесе айналу симметриясы (радиалды сәйкестік).' },
         { name: 'Фрактал', desc: 'Бір композиция ішінде негізгі геометриялық мотив әртүрлі масштабтарда қайталанады.' },
      ],
      symbols: [
         { name: 'Қошқар Мүйіз', trans: 'Ram\'s Horn', meaning: 'Байлық, билік және тіршілік күшін білдіреді.', color: '#c8a96e', img: '/images/ornament-koshkar-muiz.png' },
         { name: 'Құс Қанат', trans: 'Bird\'s Wing', meaning: 'Еркіндік пен ұмтылысты білдіреді.', color: '#2a7a9e', img: '/images/ornament-kus-kanat.png' },
         { name: 'Түйе Табан', trans: 'Camel Footprint', meaning: 'Ұзақ сапар мен сауда алмасуын білдіреді.', color: '#d4a574', img: '/images/ornament-tuye-taban.png' },
         { name: 'Жұлдыз', trans: 'Star', meaning: 'Аспан сферасы мен мәңгілікті білдіреді.', color: '#e8e0d0', img: '/images/ornament-juldyz.png' },
         { name: 'Төрт Құлақ', trans: 'Four Ears', meaning: 'Төрт бағыт, құрылымдық тұтастық пен қорғауды білдіреді.', color: '#c8a96e', img: '/images/ornament-tort-kulak.png' },
      ],
   },

   gallery: {
      sectionId: '05',
      sectionLabel: 'КӨРМЕ',
      title: 'ARTIFACT\nGALLERY',
      items: [
         { name: 'Текемет', desc: 'Диффузды ою', src: '/images/gallery-01-tekemet-large.png' },
         { name: 'Сырмақ', desc: 'Мозаикалық киіз', src: '/images/gallery-02-syrmak-large.png' },
         { name: 'Түскиіз', desc: 'Тамбур кестесі', src: '/images/gallery-03-tuskiiz-ornate.png' },
         { name: 'Алаша', desc: 'Тоқылған жолақтар', src: '/images/gallery-04-alasha-multicolor.png' },
         { name: 'Баскүр', desc: 'Құрылымдық таспа', src: '/images/gallery-05-baskur-detail.png' },
         { name: 'Біз Кесте', desc: 'Тізбек тігісі', src: '/images/gallery-06-composite.png' },
      ],
   },

   contemporary: {
      sectionId: '06',
      sectionLabel: 'ЗАМАНАУИ АҒЫМДАР',
      title: 'PARADIGM\nSHIFT',
      trends: [
         {
            id: '01',
            title: 'Нео-фольклорлық парадигма',
            titleEng: 'NEO-FOLKLORIC PARADIGM',
            desc: 'Жоғары сән мен сандық кестенің бірігуі. Функционалды тіршілік ету стратегиясынан жоғары сән сәйкестігіне ауысу.',
            large: true,
         },
         {
            id: '02',
            title: 'Экологиялық қайтарылу',
            titleEng: 'ECOLOGICAL RETURN',
            desc: 'Жүн vs. полиэстер. Биоыдырау талдауы дәстүрлі жүн киіздің микропластик ластануына ықпал етпейтінін растайды.',
            large: false,
         },
         {
            id: '03',
            title: 'Цифрлық синтез',
            titleEng: 'DIGITAL SYNTHESIS',
            desc: 'Алгоритмдік ою генерациясы',
            large: false,
         },
      ],
   },

   footer: {
      title: 'LEGACY',
      content: '«Сәндік өнер және тоқыма дизайнын» зерттеу — эстетикалық іздеу ғана емес, көпсалалы ғылыми жұмыс.',
      disciplines: [
         { name: 'Химия ғылымдары', desc: 'Табиғи пигменттер мен кератин ақуыз құрылымдарын талдау.' },
         { name: 'Математика ғылымдары', desc: 'Ою-өрнектегі күрделі геометриялық симметрияны есептеу.' },
         { name: 'Әлеуметтану ғылымдары', desc: 'Көшпелі талисмандардан ұлттық сәйкестіктің заманауи индикаторларына дейін.' },
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
   const { scrollYProgress } = useScroll();
   const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
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
                  const dpr = window.devicePixelRatio || 1;
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
            gsap.ticker.add((time: number) => lenis.raf(time * 1000));
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
                     const dpr = window.devicePixelRatio || 1;
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
                              start: 'top top',
                              end: '+=150%',
                              scrub: 1.5,
                           },
                        });
                     }
                  }
               }

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
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                     },
                  });
               });

               // Gallery horizontal scroll
               const gallery = galleryRef.current;
               if (gallery) {
                  const track = gallery.querySelector('.gallery-track') as HTMLElement;
                  if (track) {
                     const totalWidth = track.scrollWidth - gallery.clientWidth;
                     gsap.to(track, {
                        x: -totalWidth,
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
         if (lenis) lenis.destroy();
      };
   }, [isLoaded, isMobile]);

   return (
      <div ref={containerRef} className="relative bg-void min-h-screen text-cream font-body selection:bg-teal/30 selection:text-void">
         {/* Skip to content link (C4) */}
         <a href="#main-content" className="skip-link">
            Мазмұнға өту
         </a>

         <GridOverlay />
         <GrainOverlay />

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
                  aria-label="Жүктеу"
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
                        ЖҮКТЕУ... {loadingProgress}/{FRAME_COUNT}
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
               aria-label="Басты бет"
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
                     <motion.h1
                        initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                        animate={{ scale: isLoaded ? 1 : 0.9, opacity: isLoaded ? 1 : 0, filter: isLoaded ? 'blur(0px)' : 'blur(10px)' }}
                        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
                        className="font-pixel text-[18vw] md:text-[10vw] leading-[0.8] text-cream mix-blend-lighten z-20 relative glitch-text"
                        data-text={content.hero.title}
                     >
                        {content.hero.title}
                     </motion.h1>
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
                     <span className="font-mono text-[8px] tracking-[0.4em] text-mist/30 uppercase">Айналдыру</span>
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

            {/* ══════════ SECTION 2: КІРІСПЕ / MANIFESTO ══════════ */}
            <section aria-label="Кіріспе" className="py-24 px-4 md:px-6 relative z-10 bg-void">
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
                        <p>МАҚСАТ: ҚҰРЫЛЫМДЫҚ САЛЫСТЫРУ</p>
                        <p>МӘРТЕБЕ: ҒЫЛЫМИ СТИЛЬ ТАЛДАУЫ</p>
                        <p className="mt-6 text-mist/30">АУМАҚ: {content.manifesto.scope}</p>
                        <div className="mt-8 pt-4 border-t border-cream/5">
                           <MetaBadge label="ДЕРЕКТЕР КӨЗІ" value="ЭМПИРИКАЛЫҚ БАҚЫЛАУ 2024-2025" />
                           <MetaBadge label="ЖҮЙЕ" value="НОМАДИКАЛЫҚ АЛГОРИТМ V1" accent />
                        </div>
                     </div>
                  </div>
                  <DataReadout lines={['ДЕРЕКТЕР: 2024-2026', 'ЖҮЙЕ: НОМАДИКАЛЫҚ', 'ФОРМАТ: ҒЫЛЫМИ', 'НҰСҚА: V2.1']} />
               </div>
            </section>

            <Separator />

            {/* ══════════ SECTION 3: КӨШПЕНДІ ИНЖЕНЕРИЯ / YURT ══════════ */}
            <section aria-label="Көшпенді инженерия" className="py-24 px-4 md:px-6 relative z-10">
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
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                     {/* Left: Title + SVG */}
                     <div className="lg:col-span-5 lg:sticky lg:top-24 self-start">
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

                        {/* Spinning Cosmos (MVP vibe) */}
                        <div className="w-full aspect-square border border-teal/20 rounded-full flex items-center justify-center relative overflow-hidden mt-6">
                           <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/images/yurt-interior.png')" }} />
                           <div className="absolute w-[90%] h-[90%] border border-cream/10 rounded-full" style={{ animation: 'spin 20s linear infinite' }} />
                           <div className="absolute w-[70%] h-[70%] border border-teal/30 rounded-full" style={{ animation: 'spin 15s linear infinite reverse' }} />
                           <div className="absolute w-[50%] h-[50%] border border-cream/5 rounded-full" style={{ animation: 'spin 25s linear infinite' }} />
                           <span className="font-display italic text-xl md:text-2xl z-10 text-center px-4 text-cream/80">The Nomad&apos;s<br />Cosmos</span>
                        </div>
                     </div>

                     {/* Right: Components */}
                     <div className="lg:col-span-7 flex flex-col gap-4 md:gap-6 pt-0 lg:pt-12">
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
                              alt="Кереге тор құрылымы — киіз үйдің қабырға торы"
                              width={1200}
                              height={600}
                              className="absolute inset-0 w-full h-full object-cover opacity-30 hover:scale-105 transition-transform duration-[2s]"
                              loading="lazy"
                           />
                           <div className="absolute bottom-3 left-3 bg-void px-3 py-1 font-mono text-[10px] border border-cream/10 text-mist/60" aria-hidden="true">
                              FIG 2.1: КЕРЕГЕ ТОР ҚҰРЫЛЫМЫ
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

            {/* ══════════ SECTION 4: ҮШ БАҒЫТ / TAXONOMY ══════════ */}
            <section aria-label="Таксономиялық сыныптау" className="py-24 bg-void-light relative overflow-hidden">
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
                           Материалтану бақылауы
                        </span>
                     </div>
                     <p className="font-body text-sm text-mist leading-relaxed">
                        Киіз кератин талшықтарының бұралу және қабыршақты құрылымына байланысты жоғары жылу оқшаулау қасиеттеріне ие, бұл ауа қалталарын ұстауға мүмкіндік береді.
                     </p>
                  </div>
               </div>

               {/* EST notation */}
               <div className="absolute bottom-4 right-6 font-mono text-[9px] text-mist/20" aria-hidden="true">
                  EST. XIX ҒАСЫР
               </div>
            </section>

            {/* ══════════ SECTION 5: СЕМИОТИКА ══════════ */}
            <section aria-label="Семиотика" className="py-24 px-4 md:px-6 relative z-10">
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
                     <div role="listbox" aria-label="Семиотикалық символдар" className="space-y-1">
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
                                 initial={{ opacity: 0, scale: 0.9 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 exit={{ opacity: 0, scale: 1.1 }}
                                 transition={{ duration: 0.4 }}
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
                                          СЕМИОТИКАЛЫҚ ДЕРЕКТЕР АНЫҚТАЛДЫ
                                       </p>
                                    </>
                                 ) : (
                                    <>
                                       <div className="w-28 h-28 border border-cream/5 rounded-full flex items-center justify-center mb-6 opacity-20" aria-hidden="true">
                                          <div className="w-2 h-2 bg-cream rounded-full" />
                                       </div>
                                       <p className="font-mono text-[10px] text-mist/20 tracking-widest">
                                          ДЕКОДТАУ ҮШІН ДЕРЕКТЕРДІ ТАҢДАҢЫЗ
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

            {/* ══════════ SECTION 6: КӨРМЕ / GALLERY (C5 — Content now always visible on mobile) ══════════ */}
            <section ref={galleryRef} aria-label="Артефакт галереясы" className="relative h-screen overflow-hidden bg-void-light">
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

            {/* ══════════ SECTION 7: ЗАМАНАУИ АҒЫМДАР / CONTEMPORARY ══════════ */}
            <section aria-label="Заманауи ағымдар" className="py-24 relative">
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
                        Функционалды өндірістен эстетикалық өндіріске өлшенетін ауысу.
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
                           alt="Нео-фольклорлық парадигма — жоғары сән мен дәстүрлі тоқыма"
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
                              <img src="/images/ecological-wool.png" alt="Экологиялық жүн" className="w-full h-full object-cover opacity-30" loading="lazy" />
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
                              alt="Цифрлық синтез — алгоритмдік ою генерациясы"
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

         {/* ══════════ SECTION 8: FOOTER / МҰРА ══════════ */}
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
                     <h3 className="font-mono text-[10px] text-teal tracking-[0.3em] mb-4 uppercase">ПӘНДЕР</h3>
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
                        <h3 className="font-mono text-[10px] text-teal tracking-[0.3em] mb-4 uppercase">КООРДИНАТТАР</h3>
                        <div className="space-y-1 font-mono text-xs text-mist/50">
                           <p>Алматы, Қазақстан</p>
                           <p>43.2220° N, 76.8512° E</p>
                           <p lang="en">Жүйе: Earth-01</p>
                        </div>
                     </div>
                     <div className="mt-6">
                        <h3 className="font-mono text-[10px] text-teal tracking-[0.3em] mb-3 uppercase">СІЛТЕМЕЛЕР</h3>
                        <div className="space-y-1 font-mono text-xs text-mist/40">
                           <p>Тарих & Контекст</p>
                           <p>Технологиялық Стек</p>
                           <p>Семиотикалық Деректер</p>
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
                     <span className="font-mono">БАРЛЫҚ ҚҰҚЫҚТАР ҚОРҒАЛҒАН.</span>
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