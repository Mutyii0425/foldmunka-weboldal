"use client";

import React, { useEffect, useState, useRef } from 'react';
import { 
  Phone, Mail, MapPin, CheckCircle, Truck, Shovel, Hammer, 
  ArrowRight, Menu, ShieldCheck, Layers, Axe, X, ChevronRight, 
  Star, Filter, ChevronUp 
} from 'lucide-react';

// --- TÍPUSOK ---
type PortfolioItem = {
  src: string;
  cat: string;
  title: string;
};

// --- ANIMÁCIÓS KOMPONENS ---
const RevealOnScroll = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 transform will-change-transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [filter, setFilter] = useState('Mind');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- ADATOK ---
  const images = {
    logo: "/images/logo3.png", 
    hero: "/images/gepek1.jpg",
    
    fleet1: "/images/gepek.jpg",      // A naplementés csoportkép
    fleet2: "/images/teherautok.jpg", // A sorban álló teherautók
    fleet3: "/images/kamion.jpg",     // A gabonaszállító a mezőn
    fleet4: "/images/szepgep.jpg",
  };

  const portfolioItems: PortfolioItem[] = [
    // FÖLDMUNKA
    { src: "/images/alapasas1.jpg", cat: "Földmunka", title: "Sávalap ásás" },
    { src: "/images/alapasas2.jpg", cat: "Földmunka", title: "Vasalt alap előkészítés" },
    { src: "/images/szepalap.jpg", cat: "Földmunka", title: "Zsaluköves alapozás" },
    { src: "/images/szebbalap.jpg", cat: "Földmunka", title: "Precíziós alapásás" },
    { src: "/images/keszalap.jpg", cat: "Földmunka", title: "Kész vasbeton alap" },
    { src: "/images/alapasas.jpg", cat: "Földmunka", title: "Gép és teherautó összhang" },
    { src: "/images/alapcsinalas.jpg", cat: "Földmunka", title: "Alap kitűzés és ásás" },
    { src: "/images/pincekiemeles.jpg", cat: "Földmunka", title: "Pince tömbkiemelés" },

    // FUVAROZÁS
    { src: "/images/kamion1.jpg", cat: "Fuvarozás", title: "Éjszakai gabona szállítás" },
    { src: "/images/kamion2.jpg", cat: "Fuvarozás", title: "Mezőgazdasági fuvar" },
    { src: "/images/kamionrakas.jpg", cat: "Fuvarozás", title: "Kamion megrakása" },
    { src: "/images/gabonaaru.jpg", cat: "Fuvarozás", title: "Kombájn kiszolgálás" },
    { src: "/images/gabonaaru1.jpg", cat: "Fuvarozás", title: "Kukorica aratás" },
    { src: "/images/kombajn.jpg", cat: "Fuvarozás", title: "Aratás logisztika" },
    { src: "/images/banya.jpg", cat: "Fuvarozás", title: "Bányai rakodás" },
    { src: "/images/nagyteher.jpg", cat: "Fuvarozás", title: "Építőanyag szállítás" },
    { src: "/images/kettonagy.jpg", cat: "Fuvarozás", title: "Gabona tárolás" },
    { src: "/images/teherautok.jpg", cat: "Fuvarozás", title: "Gépparkunk" },
    { src: "/images/teherautorakas.jpg", cat: "Fuvarozás", title: "Teherautó töltése" },
    { src: "/images/holdjaro.jpg", cat: "Fuvarozás", title: "Bála rakodás" },

    // ÚTÉPÍTÉS & TEREPRENDEZÉS
    { src: "/images/hosszuut1.jpg", cat: "Útépítés", title: "Murvás út építés" },
    { src: "/images/hosszuut.jpg", cat: "Útépítés", title: "Hosszú bekötőút" },
    { src: "/images/ut.jpg", cat: "Útépítés", title: "Erdei út kialakítása" },
    { src: "/images/lejaro.jpg", cat: "Útépítés", title: "Meredek lejáró" },
    { src: "/images/terkoagy.jpg", cat: "Útépítés", title: "Térkő ágyazat" },
    { src: "/images/terulettisztitas.jpg", cat: "Tereprendezés", title: "Területtisztítás" },
    { src: "/images/terulettisztitas1.jpg", cat: "Tereprendezés", title: "Telekrendezés" },
    { src: "/images/nagyterulettisztitas.jpg", cat: "Tereprendezés", title: "Nagy terület rendezése" },
    { src: "/images/teruletrendezes.jpg", cat: "Tereprendezés", title: "Kőrakás és rendezés" },
    { src: "/images/partoldal.jpg", cat: "Tereprendezés", title: "Rézsű kialakítás" },
    { src: "/images/partoldal1.jpg", cat: "Tereprendezés", title: "Partoldal szedése" },
    { src: "/images/tuskozas.jpg", cat: "Tereprendezés", title: "Gépi tuskózás" },
    { src: "/images/epuletbontas.jpg", cat: "Tereprendezés", title: "Épületbontás" },
    { src: "/images/epuletutana.jpg", cat: "Tereprendezés", title: "Bontás utáni állapot" },

    // KÖZMŰ
    { src: "/images/arok1.jpg", cat: "Közmű", title: "Közműárok ásás" },
    { src: "/images/vizelvezeto.jpg", cat: "Közmű", title: "Vízelvezető árok" },
    { src: "/images/nemtudom.jpg", cat: "Közmű", title: "Gerincvezeték fektetés" },
    { src: "/images/tartaly.jpg", cat: "Közmű", title: "Tartály beemelés" },
    { src: "/images/tartalyok.jpg", cat: "Közmű", title: "Szennyvíztartály telepítés" },
  ];

  const categories = ['Mind', 'Földmunka', 'Fuvarozás', 'Útépítés', 'Tereprendezés', 'Közmű'];
  
  const filteredItems = filter === 'Mind' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.cat === filter);

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden selection:bg-yellow-500 selection:text-slate-900">
      
      {/* --- LIGHTBOX --- */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-2 md:p-8 backdrop-blur-md animate-fade-in cursor-zoom-out" 
          onClick={() => setActiveImage(null)}
        >
          <button className="absolute top-6 right-6 text-white/70 hover:text-yellow-500 transition p-2 z-50">
            <X size={40} />
          </button>
          <img 
            src={activeImage} 
            alt="Nagyított kép" 
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl border border-slate-700 object-contain" 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

      {/* --- NAVBAR --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-slate-900 shadow-xl py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <a href="#" className="flex items-center gap-3 group z-50">
            {images.logo && images.logo !== "" ? (
               <div className="transform transition-transform group-hover:scale-105">
                  <img 
                    src={images.logo} 
                    alt="Logo" 
                    className="h-12 md:h-20 w-auto object-contain" 
                  />
               </div>
            ) : (
               <span className="text-2xl font-black text-white uppercase tracking-tighter italic">
                 Csali<span className="text-yellow-500">Tamás</span>
               </span>
            )}
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 font-bold text-slate-300 uppercase text-sm tracking-widest bg-slate-900/50 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
            {['Szolgáltatások', 'Referenciák', 'Kapcsolat'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} 
                className="hover:text-yellow-500 transition-colors relative group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Call Button (Desktop) */}
          <div className="hidden lg:flex items-center">
            <a href="tel:+36306457041" className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-black uppercase tracking-wide rounded transition-transform transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(234,179,8,0.5)]">
              <Phone size={18} fill="currentColor" />
              <span>+36 30 645 7041</span>
            </a>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-yellow-500 z-50 relative bg-slate-900/80 rounded" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menü megnyitása"
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col p-6 gap-4 shadow-2xl">
             {['Szolgáltatások', 'Referenciák', 'Kapcsolat'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} 
                className="text-white text-lg font-bold uppercase tracking-wide flex justify-between items-center py-3 border-b border-slate-800 hover:text-yellow-500 hover:pl-2 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                {item} <ChevronRight size={18} className="text-yellow-500"/>
              </a>
            ))}
            <a href="tel:+36306457041" className="mt-4 flex justify-center items-center gap-2 w-full py-4 bg-yellow-500 text-slate-900 font-black uppercase rounded shadow-lg active:scale-95 transition-transform">
              <Phone size={20} /> Hívás Indítása
            </a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src={images.hero} 
            alt="Csali Tamás Géppark Balaton" 
            className="w-full h-full object-cover animate-slow-zoom" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/40"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
        </div>

        {/* Tartalom lejjebb tolása pt-20 (mobil) */}
        <div className="container mx-auto px-4 relative z-10 text-white pt-20 md:pt-0">
          <RevealOnScroll>
            <div className="max-w-4xl mx-auto lg:mx-0 text-center lg:text-left">
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase italic tracking-tighter leading-tight mb-8 drop-shadow-2xl">
                <span className="block text-white mb-2">
                  Profi Gépi Földmunka
                </span>
                <span className="block text-yellow-500 relative inline-block">
                  & Fuvarozás
                  <svg className="absolute w-full h-3 -bottom-2 left-0 text-yellow-600 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                  </svg>
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed drop-shadow-md bg-slate-900/30 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                Legyen szó alapásásról, tereprendezésről vagy nehéz terepviszonyokról. 
                <span className="text-white font-bold text-yellow-400"> Megbízható CAT gépparkkal</span> és több éves szakmai tapasztalattal állunk rendelkezésére.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pb-12 md:pb-0">
                <a href="#kapcsolat" className="group px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-black text-lg uppercase tracking-wide rounded shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.6)] flex items-center justify-center gap-3 transition-all hover:-translate-y-1">
                  Ingyenes Felmérés <ArrowRight className="group-hover:translate-x-1 transition" size={20} />
                </a>
                <a href="#referenciak" className="px-8 py-4 border-2 border-slate-500 hover:border-yellow-500 text-white hover:text-yellow-500 font-bold text-lg uppercase tracking-wide rounded transition-all text-center bg-slate-900/60 backdrop-blur-sm hover:bg-slate-900/80">
                  Munkáink
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </div>
        
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce scroll-indicator-wrapper opacity-60 z-20">
           <div className="flex flex-col items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
             Görgessen le
             <ChevronUp className="rotate-180 text-yellow-500" />
           </div>
        </div>
      </header>

      {/* --- SZOLGÁLTATÁSOK --- */}
      <section id="szolgaltatasok" className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader title="Miben segíthetünk?" subtitle="Szolgáltatásaink" />

          {/* JAVÍTÁS: A sárga tábla alapján kiegészítve az összes szolgáltatással */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <ServiceCard delay={0} icon={<Layers />} title="Pincetömb Kiemelés" desc="Nagy tömegű föld megmozgatása pincékhez, medencékhez, azonnali elszállítással és elhelyezéssel." />
            <ServiceCard delay={100} icon={<Shovel />} title="Alapásás" desc="Sávalap és pontalap ásása precíz méretekkel, tervrajz alapján." />
            <ServiceCard delay={200} icon={<Hammer />} title="Épületbontás" desc="Teljeskörű bontás, beton feltörése és a keletkezett sitt szakszerű elszállítása hivatalos lerakóba." />
            <ServiceCard delay={300} icon={<Shovel />} title="Közműárok Ásás" desc="Víz, gáz, villany és csatorna árkok gépi kiásása a megfelelő mélységben." />
            <ServiceCard delay={400} icon={<Truck />} title="Tereprendezés" desc="Terület előkészítése, durva és finom tereprendezés, termőföld terítés." />
            <ServiceCard delay={500} icon={<Axe />} title="Tuskózás" desc="Kivágott fák tuskóinak gépi eltávolítása és a terület megtisztítása." />
            <ServiceCard delay={0} icon={<ShieldCheck />} title="Térkőágyazat Előkészítés" desc="Térkő alatti rétegrend (tükör) precíz kialakítása és tömörítése." />
            <ServiceCard delay={100} icon={<CheckCircle />} title="Tükörszedés Szintezéssel" desc="A talaj felső rétegének eltávolítása és lézeres szintezése." />
            <ServiceCard delay={200} icon={<Axe />} title="Gépi Rönkhasítás" desc="Nagy teljesítményű géppel történő hatékony tűzifa hasítás." />
          </div>
        </div>
      </section>

      <section id="geppark" className="py-24 bg-slate-950 relative overflow-hidden">
        {/* Háttér textúrák a prémium hatásért */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader title="Mivel dolgozunk?" subtitle="Gépparkunk" dark />

          <RevealOnScroll>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-slate-400 text-lg leading-relaxed">
                A hatékony munkavégzés alapja a megbízható technika. Folyamatosan karbantartott, modern 
                <span className="text-yellow-500 font-bold"> Caterpillar és Mercedes</span> gépparkunkkal vállaljuk a legnehezebb terepviszonyokat is.
              </p>
            </div>
          </RevealOnScroll>

          {/* BENTO GRID LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 min-h-[600px]">
            
            {/* 1. KÉP: FŐ CSOPORTKÉP (NAGY) - 8 egység széles */}
            <div className="lg:col-span-8 relative group rounded-3xl overflow-hidden shadow-2xl border border-slate-800 h-80 lg:h-auto">
               <RevealOnScroll className="h-full w-full">
                 <img src={images.fleet1} alt="Caterpillar Földmunkagépek" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90"></div>
                 <div className="absolute bottom-0 left-0 p-8">
                    <div className="inline-block px-3 py-1 mb-2 bg-yellow-500 text-slate-900 text-xs font-black uppercase rounded">Földmunka</div>
                    <h3 className="text-white text-2xl md:text-4xl font-black uppercase italic mb-2">Caterpillar Flotta</h3>
                    
                 </div>
               </RevealOnScroll>
            </div>

            {/* 2. KÉP: MINI KOTRÓ (KESKENY) - 4 egység széles */}
            <div className="lg:col-span-4 relative group rounded-3xl overflow-hidden shadow-2xl border border-slate-800 h-80 lg:h-auto">
               <RevealOnScroll delay={100} className="h-full w-full">
                 <img src={images.fleet4} alt="Mini kotrógép" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90"></div>
                 <div className="absolute bottom-0 left-0 p-6">
                    <div className="inline-block px-3 py-1 mb-2 bg-blue-500 text-white text-xs font-black uppercase rounded">Precizitás</div>
                    <h3 className="text-white text-xl font-bold uppercase">Mini Kotró</h3>
                    
                 </div>
               </RevealOnScroll>
            </div>

            {/* 3. KÉP: TEHERAUTÓK (FELE-FELE) - 6 egység széles */}
            <div className="lg:col-span-6 relative group rounded-3xl overflow-hidden shadow-2xl border border-slate-800 h-64 lg:h-80">
               <RevealOnScroll delay={200} className="h-full w-full">
                 <img src={images.fleet2} alt="Teherautó flotta" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90"></div>
                 <div className="absolute bottom-0 left-0 p-6">
                    <div className="inline-block px-3 py-1 mb-2 bg-slate-700 text-white text-xs font-black uppercase rounded">Szállítás</div>
                    <h3 className="text-white text-xl font-bold uppercase">Teherautó Park</h3>
                    
                 </div>
               </RevealOnScroll>
            </div>

            {/* 4. KÉP: NYERGES VONTATÓ (FELE-FELE) - 6 egység széles */}
            <div className="lg:col-span-6 relative group rounded-3xl overflow-hidden shadow-2xl border border-slate-800 h-64 lg:h-80">
               <RevealOnScroll delay={300} className="h-full w-full">
                 <img src={images.fleet3} alt="Gabonaszállítás" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90"></div>
                 <div className="absolute bottom-0 left-0 p-6">
                    <div className="inline-block px-3 py-1 mb-2 bg-orange-600 text-white text-xs font-black uppercase rounded">Mezőgazdaság</div>
                    <h3 className="text-white text-xl font-bold uppercase">Gabonaszállítás</h3>
                    
                 </div>
               </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* --- GALÉRIA --- */}
      <section id="referenciak" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader title="Eddigi munkáink" subtitle="Referenciák" dark />
          
          <RevealOnScroll>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2.5 rounded-full font-bold uppercase text-xs tracking-wider transition-all duration-300 border ${
                    filter === cat 
                      ? 'bg-yellow-500 border-yellow-500 text-slate-900 shadow-[0_0_15px_rgba(234,179,8,0.4)] transform scale-105' 
                      : 'bg-transparent border-slate-700 text-slate-400 hover:border-yellow-500 hover:text-yellow-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 min-h-[400px]">
            {filteredItems.map((item, idx) => (
              <RevealOnScroll key={`${item.src}-${idx}`} delay={(idx % 4) * 50}>
                <div 
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer bg-slate-800 border border-slate-700 shadow-xl"
                  onClick={() => setActiveImage(item.src)}
                >
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <span className="text-yellow-400 text-[10px] font-black uppercase tracking-widest mb-1">{item.cat}</span>
                    <h4 className="text-white font-bold text-base leading-tight">{item.title}</h4>
                  </div>
                  <div className="absolute top-3 right-3 bg-yellow-500 text-slate-900 p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                    <Star size={16} fill="currentColor" />
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          
          {filteredItems.length === 0 && (
             <div className="text-center py-20 text-slate-500">
               <p className="text-xl font-bold">Ebben a kategóriában jelenleg nincsenek feltöltve képek.</p>
             </div>
          )}
        </div>
      </section>

     {/* --- KAPCSOLAT --- */}
      <section id="kapcsolat" className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
        {/* HÁTTÉR EFFEKTEK */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-slate-200"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

        <div className="container mx-auto px-4 relative z-10">
          <RevealOnScroll>
            <div className="max-w-6xl mx-auto bg-white shadow-[0_15px_40px_rgba(0,0,0,0.1)] rounded-2xl md:rounded-3xl overflow-hidden flex flex-col md:flex-row border border-white">
              
              {/* BAL OLDAL (SÖTÉT) */}
              <div className="bg-slate-900 p-8 md:p-14 md:w-5/12 text-white relative overflow-hidden flex flex-col justify-between">
                {/* Dekoratív elemek */}
                <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-yellow-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 md:w-40 md:h-40 bg-blue-500/10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-black uppercase italic mb-3 text-white">Kapcsolat</h3>
                  <p className="text-slate-400 mb-8 md:mb-10 text-sm md:text-base leading-relaxed">
                    Kérdése van? Munkát rendelne? <br className="hidden md:block"/>Hívjon bizalommal hétvégén is!
                  </p>
                  
                  <div className="space-y-6 md:space-y-8">
                    <ContactItem icon={<Phone />} title="Telefon" content="+36 30 645 7041" href="tel:+36306457041" highlight />
                    <ContactItem icon={<Mail />} title="Email" content="csalitamas462@gmail.com" href="mailto:csalitamas462@gmail.com" />
                    <ContactItem icon={<MapPin />} title="Helyszín" content="Balatonederics és környéke" />
                  </div>
                </div>

                <div className="relative z-10 mt-10 md:mt-12 pt-8 border-t border-slate-800">
                   <div className="flex items-center gap-2 text-yellow-500 font-bold uppercase text-xs tracking-widest mb-2">
                     <CheckCircle size={14} /> Nyitvatartás
                   </div>
                   <p className="text-slate-300 text-xs md:text-sm font-medium">Hétfő - Péntek: 07:00 - 18:00</p>
                   <p className="text-slate-300 text-xs md:text-sm font-medium">Szombat: Előre egyeztetve</p>
                </div>
              </div>

              {/* JOBB OLDAL (VILÁGOS) */}
              <div className="p-8 md:p-14 md:w-7/12 bg-slate-50/50 flex flex-col justify-center relative">
                {/* Finom rács textúra csak a jobb oldalon */}
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-60 pointer-events-none"></div>
                
                <div className="relative z-10">
                  <h2 className="text-2xl md:text-4xl font-black text-slate-900 uppercase italic mb-4 md:mb-6">Azonnali árajánlat</h2>
                  <p className="text-slate-600 mb-8 leading-relaxed font-medium text-sm md:text-base">
                    A földmunka jellegéből adódóan a legpontosabb árajánlatot <strong>telefonon vagy helyszíni felmérés</strong> után tudjuk adni. Keressen minket bizalommal!
                  </p>
                  
                  {/* PROFIL KÁRTYA - Mobilon kompaktabb */}
                  <div className="flex items-center gap-4 mb-8 md:mb-10 p-4 md:p-5 bg-slate-900 rounded-xl md:rounded-2xl border border-slate-800 shadow-2xl transform hover:scale-[1.01] transition-transform duration-300">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0 border-2 border-yellow-500 flex items-center justify-center p-1 bg-slate-800">
                        <img 
                          src={images.logo} 
                          alt="Csali Tamás Logo" 
                          className="w-full h-full object-contain" 
                        />
                    </div>
                    <div>
                        <p className="text-white font-bold text-base md:text-lg leading-tight mb-0.5">Csali Tamás</p>
                        <p className="text-slate-400 text-xs md:text-sm font-medium uppercase tracking-wide">Tulajdonos, Gépkezelő</p>
                    </div>
                  </div>

                  <a href="tel:+36306457041" className="w-full group bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-slate-900 font-black py-4 md:py-5 text-base md:text-lg uppercase tracking-wide transition-all shadow-xl hover:shadow-yellow-500/40 text-center flex items-center justify-center gap-3 rounded-xl transform hover:-translate-y-1 active:translate-y-0 active:scale-98">
                    <Phone size={22} className="group-hover:animate-pulse" /> Hívás most
                  </a>
                </div>
              </div>

            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 py-12 text-slate-500 text-sm border-t border-slate-900">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <div className="flex gap-1 mb-4">
             {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />)}
          </div>
          <h4 className="text-white font-black uppercase text-lg mb-2 tracking-widest">Csali Tamás</h4>
          <p className="mb-6 font-medium text-slate-400 max-w-md">Professzionális gépi földmunka, tereprendezés és ömlesztettáru-fuvarozás a Balaton-felvidéken.</p>
          <div className="w-12 h-1 bg-slate-800 rounded-full mb-6"></div>
          <p className="opacity-40">&copy; {new Date().getFullYear()} Minden jog fenntartva.</p>
        </div>
      </footer>
      
      {/* --- GLOBAL CSS --- */}
      <style jsx global>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate linear;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .will-change-transform {
          will-change: transform, opacity;
        }
        html {
          scroll-behavior: smooth;
        }
        /* Itt oldjuk meg, hogy a görgetés jelző csak nagy képernyőn látszódjon */
        .scroll-indicator-wrapper {
            display: none;
        }
        @media (min-height: 800px) {
            .scroll-indicator-wrapper {
                display: block;
            }
        }
      `}</style>
    </div>
  );
}

// --- SEGÉDKOMPONENSEK ---

function SectionHeader({ title, subtitle, dark = false }: { title: string, subtitle: string, dark?: boolean }) {
  return (
    <RevealOnScroll>
      <div className="text-center mb-16">
        <h2 className="text-yellow-500 font-black uppercase tracking-[0.2em] text-xs md:text-sm mb-3 flex items-center justify-center gap-2">
          <span className="w-8 h-[2px] bg-yellow-500 inline-block"></span>
          {subtitle}
          <span className="w-8 h-[2px] bg-yellow-500 inline-block"></span>
        </h2>
        <h3 className={`text-3xl md:text-5xl lg:text-6xl font-black uppercase italic mb-6 ${dark ? 'text-white' : 'text-slate-900'}`}>
          {title}
        </h3>
      </div>
    </RevealOnScroll>
  )
}

function ServiceCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
  return (
    <RevealOnScroll delay={delay} className="h-full">
      <div className="group p-6 md:p-8 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-500 border border-slate-200/60 hover:border-yellow-500 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/10 rounded-2xl h-full flex flex-col relative overflow-hidden transform hover:-translate-y-2">
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-yellow-500/5 rounded-full transition-transform group-hover:scale-150 duration-500"></div>
        
        <div className="mb-4 md:mb-6 inline-flex p-3 md:p-4 bg-slate-50 text-yellow-600 rounded-2xl group-hover:bg-yellow-500 group-hover:text-slate-900 transition-colors duration-300 w-fit shadow-inner group-hover:shadow-lg">
          {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6 md:w-8 md:h-8" })}
        </div>
        <h3 className="text-lg md:text-xl font-black text-slate-900 group-hover:text-slate-900 mb-2 md:mb-3 uppercase italic transition-colors">{title}</h3>
        <p className="text-slate-600 group-hover:text-slate-600 leading-relaxed font-medium text-sm md:text-base transition-colors relative z-10">{desc}</p>
      </div>
    </RevealOnScroll>
  )
}

function ContactItem({ icon, title, content, href, highlight }: { icon: React.ReactNode, title: string, content: string, href?: string, highlight?: boolean }) {
  return (
    <div className="flex gap-4 md:gap-5 items-center group">
      <div className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl shrink-0 transition-all duration-300 shadow-lg ${highlight ? 'bg-yellow-500 text-slate-900 shadow-yellow-500/50 group-hover:scale-110' : 'bg-slate-800 text-yellow-500 group-hover:bg-yellow-500 group-hover:text-slate-900'}`}>
        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5 md:w-6 md:h-6" })}
      </div>
      <div>
        <div className="font-bold text-[10px] md:text-xs text-yellow-500/80 uppercase tracking-widest mb-0.5 md:mb-1">{title}</div>
        {href ? (
          <a href={href} className={`font-bold transition hover:text-yellow-500 block ${highlight ? 'text-lg md:text-2xl text-white' : 'text-base md:text-lg text-slate-300'}`}>
            {content}
          </a>
        ) : (
          <div className="font-medium text-slate-300 text-base md:text-lg">{content}</div>
        )}
      </div>
    </div>
  )
}