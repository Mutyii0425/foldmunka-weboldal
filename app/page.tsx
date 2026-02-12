"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Phone, Mail, MapPin, CheckCircle, Truck, Shovel, Hammer, ArrowRight, Menu, ShieldCheck, Layers, Axe, X, ChevronRight, Star, Filter } from 'lucide-react';

// --- ANIMÁCIÓS KOMPONENS ---
const RevealOnScroll = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
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
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [filter, setFilter] = useState('Mind'); // Galéria szűrő állapota

  // --- KÉPEK ---
  const images = {
    logo: "/images/logo.png",
    hero: "/images/gepek1.jpg", // A panoráma kép a legjobb kezdésnek
  };

  // --- A TELJES KÉP PORTFÓLIÓ KATEGORIZÁLVA ---
  const portfolioItems = [
    // FÖLDMUNKA & ALAPOZÁS
    { src: "/images/alapasas1.jpg", cat: "Földmunka", title: "Sávalap ásás" }, //
    { src: "/images/alapasas2.jpg", cat: "Földmunka", title: "Vasalt alap előkészítés" }, //
    { src: "/images/szepalap.jpg", cat: "Földmunka", title: "Zsaluköves alapozás" }, //
    { src: "/images/szebbalap.jpg", cat: "Földmunka", title: "Precíziós alapásás" }, //
    { src: "/images/keszalap.jpg", cat: "Földmunka", title: "Kész vasbeton alap" }, //
    { src: "/images/alapasas.jpg", cat: "Földmunka", title: "Gép és teherautó összhang" }, //
    { src: "/images/alapcsinalas.jpg", cat: "Földmunka", title: "Alap kitűzés és ásás" }, //
    { src: "/images/pincekiemeles.jpg", cat: "Földmunka", title: "Pince tömbkiemelés" }, //

    // FUVAROZÁS & GÉPPARK
    { src: "/images/kamion1.jpg", cat: "Fuvarozás", title: "Éjszakai gabona szállítás" }, //
    { src: "/images/kamion.jpg", cat: "Fuvarozás", title: "Répa szállítás naplementében" }, //
    { src: "/images/kamion2.jpg", cat: "Fuvarozás", title: "Mezőgazdasági fuvar" }, //
    { src: "/images/kamionrakas.jpg", cat: "Fuvarozás", title: "Kamion megrakása" }, //
    { src: "/images/gabonaaru.jpg", cat: "Fuvarozás", title: "Kombájn kiszolgálás" }, //
    { src: "/images/gabonaaru1.jpg", cat: "Fuvarozás", title: "Kukorica aratás" }, //
    { src: "/images/kombajn.jpg", cat: "Fuvarozás", title: "Aratás logisztika" }, //
    { src: "/images/banya.jpg", cat: "Fuvarozás", title: "Bányai rakodás" }, //
    { src: "/images/nagyteher.jpg", cat: "Fuvarozás", title: "Építőanyag szállítás" }, //
    { src: "/images/kettonagy.jpg", cat: "Fuvarozás", title: "Gabona tárolás" }, //
    { src: "/images/teherautok.jpg", cat: "Fuvarozás", title: "Gépparkunk" }, //
    { src: "/images/teherautorakas.jpg", cat: "Fuvarozás", title: "Teherautó töltése" }, //
    { src: "/images/holdjaro.jpg", cat: "Fuvarozás", title: "Bála rakodás" }, //

    // ÚTÉPÍTÉS & TEREPRENDEZÉS
    { src: "/images/hosszuut1.jpg", cat: "Útépítés", title: "Murvás út építés" }, //
    { src: "/images/hosszuut.jpg", cat: "Útépítés", title: "Hosszú bekötőút" }, //
    { src: "/images/ut.jpg", cat: "Útépítés", title: "Erdei út kialakítása" }, //
    { src: "/images/lejaro.jpg", cat: "Útépítés", title: "Meredek lejáró" }, //
    { src: "/images/terkoagy.jpg", cat: "Útépítés", title: "Térkő ágyazat" }, //
    { src: "/images/terulettisztitas.jpg", cat: "Tereprendezés", title: "Területtisztítás" }, //
    { src: "/images/terulettisztitas1.jpg", cat: "Tereprendezés", title: "Telekrendezés" }, //
    { src: "/images/nagyterulettisztitas.jpg", cat: "Tereprendezés", title: "Nagy terület rendezése" }, //
    { src: "/images/teruletrendezes.jpg", cat: "Tereprendezés", title: "Kőrakás és rendezés" }, //
    { src: "/images/partoldal.jpg", cat: "Tereprendezés", title: "Rézsű kialakítás" }, //
    { src: "/images/partoldal1.jpg", cat: "Tereprendezés", title: "Partoldal szedése" }, //
    { src: "/images/tuskozas.jpg", cat: "Tereprendezés", title: "Gépi tuskózás" }, //
    { src: "/images/epuletbontas.jpg", cat: "Tereprendezés", title: "Épületbontás" }, //
    { src: "/images/epuletutana.jpg", cat: "Tereprendezés", title: "Bontás utáni állapot" }, //

    // KÖZMŰ & SPECIÁLIS
    { src: "/images/arok1.jpg", cat: "Közmű", title: "Közműárok ásás" }, //
    { src: "/images/vizelvezeto.jpg", cat: "Közmű", title: "Vízelvezető árok" }, //
    { src: "/images/nemtudom.jpg", cat: "Közmű", title: "Gerincvezeték fektetés" }, //
    { src: "/images/tartaly.jpg", cat: "Közmű", title: "Tartály beemelés" }, //
    { src: "/images/tartalyok.jpg", cat: "Közmű", title: "Szennyvíztartály telepítés" }, //
    { src: "/images/szepgep.jpg", cat: "Közmű", title: "Munkavégzés vízparton" }, //
  ];

  const categories = ['Mind', 'Földmunka', 'Fuvarozás', 'Útépítés', 'Tereprendezés', 'Közmű'];
  
  const filteredItems = filter === 'Mind' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.cat === filter);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden selection:bg-yellow-500 selection:text-slate-900">
      
      {/* --- LIGHTBOX (KÉPNÉZEGETŐ) --- */}
      {activeImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-2 md:p-4 backdrop-blur-sm animate-fade-in" onClick={() => setActiveImage(null)}>
          <button className="absolute top-4 right-4 text-white/70 hover:text-yellow-500 transition p-2">
            <X size={32} />
          </button>
          <img src={activeImage} alt="Nagyított kép" className="max-w-full max-h-[90vh] rounded-sm shadow-2xl border border-slate-700" />
        </div>
      )}

      {/* --- NAVBAR --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isMenuOpen ? 'bg-slate-900' : 'bg-slate-900/95 lg:backdrop-blur-md'} border-b border-yellow-500/20 shadow-lg`}>
        <div className="container mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            {/* LOGÓ HELYE */}
            <div className="bg-white p-2 rounded-lg shadow-lg hover:bg-slate-50 transition-colors duration-300 border-2 border-yellow-500/50 flex items-center">
              <img 
                src={images.logo} 
                alt="Csali Tamás Földmunka Logo" 
                className="h-10 md:h-14 w-auto object-contain max-w-[280px]"
              />
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 font-bold text-slate-300 uppercase text-sm tracking-wide">
            {['Szolgáltatások', 'Fuvarozás', 'Galéria', 'Kapcsolat'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} className="hover:text-yellow-500 transition relative group py-2">
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+36306457041" className="relative overflow-hidden group flex items-center gap-2 px-5 py-2.5 bg-yellow-500 text-slate-900 font-black uppercase tracking-wide rounded transition shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.6)] hover:-translate-y-0.5">
              <span className="absolute inset-0 w-full h-full bg-white/30 transform -translate-x-full skew-x-12 group-hover:animate-shine"></span>
              <Phone size={18} className="fill-slate-900" />
              <span className="text-sm">+36 30 645 7041</span>
            </a>
          </div>
          
          <button className="lg:hidden p-2 text-yellow-500 hover:bg-slate-800 rounded transition active:scale-95" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div className={`lg:hidden bg-slate-900 border-t border-slate-800 overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 py-4 flex flex-col gap-2 text-white font-bold uppercase tracking-wide">
             {['Szolgáltatások', 'Fuvarozás', 'Galéria', 'Kapcsolat'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} className="py-3 px-2 border-b border-slate-800 hover:bg-slate-800 hover:text-yellow-500 flex justify-between items-center transition" onClick={() => setIsMenuOpen(false)}>
                {item} <ChevronRight size={16} className="text-yellow-500"/>
              </a>
            ))}
            <a href="tel:+36306457041" className="flex items-center justify-center gap-2 bg-yellow-500 text-slate-900 py-4 mt-4 font-black rounded active:bg-yellow-600 transition">
              <Phone size={20} /> Hívás most
            </a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative h-[90vh] min-h-[550px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src={images.hero} 
            alt="Csali Tamás Géppark Balaton" 
            className="w-full h-full object-cover opacity-60 animate-slow-zoom will-change-transform" 
            loading="eager" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent to-slate-950/80"></div>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white mt-10">
          <RevealOnScroll>
            <div className="max-w-5xl mx-auto text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-500/90 backdrop-blur-sm text-slate-900 font-bold uppercase tracking-wider text-[10px] md:text-xs mb-6 transform -skew-x-12 shadow-lg shadow-yellow-500/20 mx-auto lg:mx-0 border border-yellow-400">
                <ShieldCheck size={14} /> Balatonederics és vonzáskörzete
              </div>
              <h1 className="flex flex-col gap-2 text-4xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter">
                <span className="text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                  Gépi Földmunka
                </span>
                <span className="relative text-yellow-500 drop-shadow-xl">
                  <span className="absolute inset-0 text-slate-900 blur-sm transform translate-y-1 opacity-50 select-none" aria-hidden="true">
                    & Profi Fuvarozás
                  </span>
                  <span className="relative">
                    <span className="text-white mx-2">&</span> 
                    Profi Fuvarozás
                  </span>
                </span>
              </h1>
              <p className="text-base md:text-xl lg:text-2xl text-slate-200 mb-8 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed drop-shadow-md">
                A pincetömb kiemeléstől a 40 tonnás szállításig. <br className="hidden md:block"/>
                Megbízható szakértelem, profi <span className="text-yellow-500 font-bold">CAT</span> gépparkkal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#kapcsolat" className="group px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-black text-base md:text-lg uppercase tracking-wide rounded transition-all hover:scale-105 shadow-[0_0_20px_rgba(234,179,8,0.4)] flex items-center justify-center gap-2">
                  Ingyenes felmérés <ArrowRight className="group-hover:translate-x-1 transition" />
                </a>
                <a href="#galeria" className="px-8 py-4 bg-slate-900/50 backdrop-blur-sm border border-white/20 hover:border-yellow-500 hover:bg-slate-900/80 text-white hover:text-yellow-500 font-bold text-base md:text-lg uppercase tracking-wide rounded transition text-center">
                  Munkáink
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </div>
        
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50 hidden md:block">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-yellow-500 rounded-full animate-scroll-down"></div>
          </div>
        </div>
      </header>

      {/* --- SZOLGÁLTATÁSOK --- */}
      <section id="szolgaltatasok" className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <RevealOnScroll>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-yellow-600 font-black uppercase tracking-widest text-xs md:text-sm mb-3">Szolgáltatásaink</h2>
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 uppercase italic mb-6">Miben segíthetünk?</h3>
              <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full"></div>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <ServiceCard delay={0} icon={<Shovel />} title="Alap és Árokásás" desc="Sávalap, pontalap, közműárok ásása (víz, gáz, villany) pontos méretekkel. Sziklás talaj sem akadály." />
            <ServiceCard delay={100} icon={<Layers />} title="Pincetömb Kiemelés" desc="Nagy tömegű föld megmozgatása pincékhez, medencékhez, azonnali elszállítással." />
            <ServiceCard delay={200} icon={<Hammer />} title="Épületbontás" desc="Teljeskörű bontás, beton feltörése és a keletkezett sitt szakszerű elszállítása lerakóba." />
            <ServiceCard delay={300} icon={<Truck />} title="Tereprendezés" desc="Tükörszedés szintezéssel, tuskózás, bozótirtás és terület előkészítése építkezéshez." />
            <ServiceCard delay={400} icon={<ShieldCheck />} title="Térkőágyazat" desc="Térkő alatti rétegrend precíz kialakítása, tömörítése és előkészítése." />
            <ServiceCard delay={500} icon={<Axe />} title="Gépi Rönkhasítás" desc="Hatékony tűzifa feldolgozás és rönkhasítás nagy teljesítményű géppel." />
          </div>
        </div>
      </section>

      {/* --- ÚJ OKOS GALÉRIA --- */}
      <section id="galeria" className="py-20 bg-slate-900 text-white relative">
        <div className="absolute inset-0 bg-slate-900/95"></div>
        <div className="container mx-auto px-4 relative z-10">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-yellow-500 font-black uppercase tracking-widest text-xs md:text-sm mb-3">Referenciák</h2>
              <h3 className="text-3xl md:text-5xl font-black uppercase italic mb-8">Válasszon Kategóriát</h3>
              
              {/* Kategória gombok */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-6 py-2 rounded-full font-bold uppercase text-xs md:text-sm transition-all duration-300 transform hover:scale-105 ${
                      filter === cat 
                        ? 'bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/50' 
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Galéria Rács */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 min-h-[500px]">
            {filteredItems.map((item, idx) => (
              <RevealOnScroll key={item.src + idx} delay={idx * 50}>
                <div 
                  className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer bg-slate-800 border-2 border-slate-700 hover:border-yellow-500 transition-all duration-300"
                  onClick={() => setActiveImage(item.src)}
                >
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" 
                    loading="lazy" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
                    <span className="text-yellow-400 text-[10px] font-bold uppercase tracking-wider mb-1 px-2 py-0.5 bg-black/50 w-fit rounded">{item.cat}</span>
                    <span className="text-white font-bold leading-tight text-lg">{item.title}</span>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition duration-300">
                     <div className="bg-yellow-500 text-slate-900 p-2 rounded-full shadow-lg">
                       <PlusIcon />
                     </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          
          {filteredItems.length === 0 && (
             <p className="text-center text-slate-500 mt-10">Ebben a kategóriában jelenleg nincsenek képek.</p>
          )}
        </div>
      </section>

      {/* --- KAPCSOLAT --- */}
      <section id="kapcsolat" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute -left-20 top-20 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -right-20 bottom-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <RevealOnScroll>
            <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
              
              <div className="bg-slate-900 p-8 md:p-12 md:w-5/12 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-black uppercase italic mb-2">Kapcsolat</h3>
                  <p className="text-slate-400 mb-8 text-sm md:text-base">Kérdése van? Hívjon bizalommal hétvégén is!</p>
                  
                  <div className="space-y-6">
                    <ContactItem icon={<Phone />} title="Telefon" content="+36 30 645 7041" href="tel:+36306457041" main />
                    <ContactItem icon={<Mail />} title="Email" content="csalitamas462@gmail.com" href="mailto:csalitamas462@gmail.com" />
                    <ContactItem icon={<MapPin />} title="Helyszín" content="Balatonederics és környéke" />
                  </div>
                </div>

                <div className="relative z-10 mt-10 pt-10 border-t border-slate-800">
                   <p className="text-yellow-500 font-bold uppercase text-xs mb-2 tracking-widest">Nyitvatartás</p>
                   <p className="text-slate-300 font-medium">Hétfő - Péntek: 07:00 - 18:00</p>
                   <p className="text-slate-300 font-medium">Szombat: Előre egyeztetve</p>
                </div>
              </div>

              <div className="p-8 md:p-12 md:w-7/12 bg-slate-50 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic mb-6">Azonnali árajánlat</h2>
                <p className="text-slate-600 mb-8 leading-relaxed text-sm md:text-base">
                  A leggyorsabb ügyintézés érdekében kérjük telefonon keressen minket. Ha épp gépen dolgozunk és nem tudjuk felvenni, amint lehet, visszahívjuk!
                </p>
                
                <div className="bg-white p-6 rounded-xl border border-slate-200 mb-8 flex items-center gap-4 shadow-sm hover:shadow-md transition">
                   <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-black text-xl shrink-0 shadow-lg">
                     CS
                   </div>
                   <div>
                      <p className="font-black text-slate-900 text-lg">Csali Tamás</p>
                      <p className="text-slate-500 text-sm font-bold uppercase">Tulajdonos, Gépkezelő</p>
                   </div>
                </div>

                <a href="tel:+36306457041" className="w-full group bg-gradient-to-r from-yellow-500 to-yellow-400 hover:to-yellow-500 text-slate-900 font-black py-5 uppercase tracking-wide transition-all shadow-xl hover:shadow-yellow-500/40 text-center flex items-center justify-center gap-3 rounded-lg transform active:scale-98">
                  <Phone size={24} className="group-hover:animate-bounce" /> Hívás indítása
                </a>
              </div>

            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 py-10 text-slate-500 text-xs md:text-sm border-t border-slate-900">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
             <Star className="w-4 h-4 text-yellow-500 fill-yellow-500"/>
             <Star className="w-4 h-4 text-yellow-500 fill-yellow-500"/>
             <Star className="w-4 h-4 text-yellow-500 fill-yellow-500"/>
             <Star className="w-4 h-4 text-yellow-500 fill-yellow-500"/>
             <Star className="w-4 h-4 text-yellow-500 fill-yellow-500"/>
          </div>
          <h4 className="text-white font-black uppercase text-base mb-1 tracking-widest">Csali Tamás</h4>
          <p className="mb-6 font-medium text-slate-400">Gépi földmunka és ömlesztettáru-fuvarozás</p>
          <p className="opacity-40">&copy; {new Date().getFullYear()} Minden jog fenntartva.</p>
        </div>
      </footer>
      
      {/* Global CSS */}
      <style jsx global>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(12deg); }
          100% { transform: translateX(200%) skewX(12deg); }
        }
        .animate-shine {
          animation: shine 3s infinite linear;
        }
        @keyframes scroll-down {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }
        .animate-scroll-down {
          animation: scroll-down 1.5s infinite;
        }
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
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
      `}</style>
    </div>
  );
}

// --- ALKOMPONENSEK ---

function ServiceCard({ icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) {
  return (
    <RevealOnScroll delay={delay}>
      <div className="group p-6 md:p-8 bg-white hover:bg-slate-50 transition-all duration-300 border border-slate-200 hover:border-yellow-500 shadow-sm hover:shadow-xl rounded-xl h-full flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-yellow-500 transition-colors duration-300"></div>
        <div className="mb-6 inline-flex p-3 bg-slate-100 text-yellow-600 rounded-lg group-hover:bg-yellow-500 group-hover:text-slate-900 transition-colors duration-300 w-fit">
          {React.cloneElement(icon, { className: "w-8 h-8" })}
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-3 uppercase italic">{title}</h3>
        <p className="text-slate-600 leading-relaxed mb-4 font-medium text-sm md:text-base">{desc}</p>
      </div>
    </RevealOnScroll>
  )
}

function ContactItem({ icon, title, content, href, main }: any) {
  return (
    <div className="flex gap-4 items-start">
      <div className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg shrink-0 transition ${main ? 'bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/50' : 'bg-slate-800 text-yellow-500'}`}>
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <div>
        <div className="font-bold text-[10px] md:text-xs text-yellow-500 uppercase tracking-widest mb-1">{title}</div>
        {href ? (
          <a href={href} className={`font-bold transition hover:text-yellow-500 ${main ? 'text-xl md:text-2xl text-white' : 'text-slate-300'}`}>{content}</a>
        ) : (
          <div className="font-medium text-slate-300 text-sm md:text-base">{content}</div>
        )}
      </div>
    </div>
  )
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  )
}