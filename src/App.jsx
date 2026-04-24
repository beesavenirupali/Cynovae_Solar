import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, animate, AnimatePresence } from 'framer-motion';

const systemData = {
    "3.5kW": { kw: "3.5", trees: 220, water: 8000, co2: 4.0, coal: 2.2 },
    "5.0kW": { kw: "5.0", trees: 315, water: 11500, co2: 5.7, coal: 3.1 },
    "7.0kW": { kw: "7.0", trees: 440, water: 16000, co2: 8.0, coal: 4.4 },
    "10.0kW": { kw: "10.0", trees: 630, water: 23000, co2: 11.4, coal: 6.3 }
};

function Counter({ to, duration, decimals = 0 }) {
    const nodeRef = useRef(null);
    const inView = useInView(nodeRef, { once: true, margin: "-50px" });
    const prevValue = useRef(0);

    useEffect(() => {
        const node = nodeRef.current;
        if (inView && node) {
            const controls = animate(prevValue.current, to, {
                duration,
                ease: "easeOut",
                onUpdate(value) {
                    if (decimals > 0) {
                        node.textContent = value.toFixed(decimals);
                    } else {
                        node.textContent = Math.floor(value).toLocaleString();
                    }
                    prevValue.current = value;
                },
            });
            return () => controls.stop();
        }
    }, [to, duration, decimals, inView]);

    return <span ref={nodeRef}>{prevValue.current}</span>;
}

const Divider = () => (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent my-4"></div>
);

function Navbar() {
    const { scrollY } = useScroll();
    const navBackground = useTransform(scrollY, [0, 50], ["rgba(3, 3, 3, 0)", "rgba(3, 3, 3, 0.8)"]);
    const navBackdrop = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(20px)"]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <motion.header
            style={{ backgroundColor: navBackground, backdropFilter: navBackdrop, WebkitBackdropFilter: navBackdrop }}
            className="fixed top-0 left-0 right-0 z-[100] border-b border-gold-500/10 transition-all w-full"
        >
            <div className="container mx-auto px-8 py-6 flex items-center justify-between">
                <div className="text-3xl font-serif tracking-widest flex items-center gap-2 z-50 relative">
                    <span className="text-white">CYNOVA</span>
                    <span className="text-gold-500">SOLAR</span>
                </div>
                <nav className="hidden lg:flex gap-6 xl:gap-8 font-medium text-[10px] xl:text-xs tracking-[0.2em] uppercase items-center">
                    <a href="#hero" className="text-neutral-400 hover:text-gold-400 transition-colors py-4">Home</a>

                    <div className="relative group">
                        <span className="text-neutral-400 group-hover:text-gold-400 transition-colors cursor-pointer py-4 flex items-center gap-1">Services <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></span>
                        <div className="absolute left-0 top-full -mt-2 w-56 bg-[#0f0300]/95 backdrop-blur-md border border-gold-500/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col z-50 py-2 shadow-2xl">
                            <a href="#sectors-apartments" className="text-neutral-400 hover:text-gold-400 hover:bg-white/5 px-6 py-3 transition-colors">Residencial</a>
                            <a href="#sectors-commercial" className="text-neutral-400 hover:text-gold-400 hover:bg-white/5 px-6 py-3 transition-colors">Commercial</a>
                            <a href="#sectors-apartments" className="text-neutral-400 hover:text-gold-400 hover:bg-white/5 px-6 py-3 transition-colors">Housing Societies</a>
                            <a href="#solar-fencing" className="text-neutral-400 hover:text-gold-400 hover:bg-white/5 px-6 py-3 transition-colors">Land</a>
                            <a href="#solar-care" className="text-neutral-400 hover:text-gold-400 hover:bg-white/5 px-6 py-3 transition-colors">Maintenance Plan</a>
                        </div>
                    </div>

                    <a href="#solar-solutions" className="text-neutral-400 hover:text-gold-400 transition-colors py-4 whitespace-nowrap">Solar Solutions</a>

                    <a href="#impact" className="text-neutral-400 hover:text-gold-400 transition-colors py-4">Impact</a>
                    <a href="#testimonials" className="text-neutral-400 hover:text-gold-400 transition-colors py-4">Testimonials</a>

                    <a href="/career.html" className="text-neutral-400 hover:text-gold-400 transition-colors py-4">Career</a>
                </nav>
                <div className="flex items-center gap-4 sm:gap-6 z-50 relative">
                    <button onClick={() => window.location.href = '/signup.html'} className="hidden sm:block btn-luxury px-6 py-3 rounded-full font-bold text-[10px] tracking-widest uppercase transition-all whitespace-nowrap">
                        Sign up for free electricity
                    </button>
                    <button className="lg:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden absolute top-0 left-0 w-full h-screen bg-[#0f0300]/95 backdrop-blur-xl border-b border-gold-500/20 pt-24 px-8 pb-8 flex flex-col z-40 overflow-y-auto"
                    >
                        <nav className="flex flex-col gap-6 font-medium text-sm tracking-[0.2em] uppercase">
                            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="text-neutral-400 hover:text-gold-400 transition-colors">Home</a>

                            <div className="flex flex-col gap-4">
                                <span className="text-white">Services</span>
                                <div className="pl-4 border-l border-gold-500/20 flex flex-col gap-4">
                                    <a href="#sectors-apartments" onClick={() => setMobileMenuOpen(false)} className="text-neutral-400 hover:text-gold-400 transition-colors text-xs">Residencial</a>
                                    <a href="#sectors-commercial" onClick={() => setMobileMenuOpen(false)} className="text-neutral-400 hover:text-gold-400 transition-colors text-xs">Commercial</a>
                                    <a href="#sectors-apartments" onClick={() => setMobileMenuOpen(false)} className="text-neutral-400 hover:text-gold-400 transition-colors text-xs">Housing Societies</a>
                                    <a href="#solar-fencing" onClick={() => setMobileMenuOpen(false)} className="text-neutral-400 hover:text-gold-400 transition-colors text-xs">Land</a>
                                    <a href="#solar-care" onClick={() => setMobileMenuOpen(false)} className="text-neutral-400 hover:text-gold-400 transition-colors text-xs">Maintenance Plan</a>
                                </div>
                            </div>

                            <a href="#solar-solutions" onClick={() => setMobileMenuOpen(false)} className="text-neutral-400 hover:text-gold-400 transition-colors">Solar Solutions</a>
                            <a href="#impact" onClick={() => setMobileMenuOpen(false)} className="text-neutral-400 hover:text-gold-400 transition-colors">Impact</a>
                            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-neutral-400 hover:text-gold-400 transition-colors">Testimonials</a>
                            <a href="/career.html" onClick={() => setMobileMenuOpen(false)} className="text-neutral-400 hover:text-gold-400 transition-colors">Career</a>
                        </nav>

                        <div className="mt-8 pt-8 border-t border-white/10 sm:hidden">
                            <button onClick={() => window.location.href = '/signup.html'} className="w-full btn-luxury px-6 py-4 rounded-full font-bold text-[10px] tracking-widest uppercase transition-all whitespace-nowrap text-center">
                                Sign up for free electricity
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

function Hero() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 250]);
    const opacity = useTransform(scrollY, [0, 600], [1, 0]);

    const particles = Array.from({ length: 20 });

    return (
        <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
                {/* Centered Sun */}
                <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[60vw] lg:w-[50vw] h-[80vw] md:h-[60vw] lg:h-[50vw] rounded-full z-10 pointer-events-none mix-blend-screen"
                     style={{ 
                         background: 'radial-gradient(circle at center, #ffffff 0%, #ffcc00 25%, #ff5500 60%, transparent 80%)',
                         filter: 'blur(10px)',
                         opacity: 0.6,
                         boxShadow: '0 0 200px 80px rgba(255, 136, 0, 0.4)'
                     }}>
                </div>
                {/* Deep Orange Sun Halo */}
                <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] md:w-[80vw] lg:w-[70vw] h-[100vw] md:h-[80vw] lg:h-[70vw] rounded-full z-10 pointer-events-none"
                     style={{ 
                         background: 'radial-gradient(circle at center, rgba(204, 51, 0, 0.4) 0%, transparent 70%)',
                         filter: 'blur(40px)'
                     }}>
                </div>
                {/* Subtle ambient flare on left */}
                <div className="absolute bottom-1/4 left-[-10vw] w-[30vw] h-[30vw] bg-amber-600/10 rounded-full light-flare z-10" style={{ animationDelay: '2s' }}></div>

                <div className="absolute inset-0 bg-gradient-to-b from-[#0f0300]/80 via-transparent to-[#0f0300] z-20" />
                <div className="absolute inset-0 bg-[#0f0300]/40 z-10" />

                <img src="https://images.unsplash.com/photo-1588805988001-383e58988582?q=80&w=2672&auto=format&fit=crop" className="w-full h-full object-cover object-center mix-blend-luminosity opacity-60 grayscale" alt="Solar Architecture" />
            </motion.div>

            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                {particles.map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: "100vh", x: Math.random() * window.innerWidth, opacity: 0 }}
                        animate={{ y: "-10vh", opacity: [0, 1, 0] }}
                        transition={{ duration: 10 + Math.random() * 15, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
                        className="absolute w-1 h-1 bg-gold-400/50 rounded-full blur-[1px]"
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-30 flex flex-col items-center text-center mt-20">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }}>
                    <div className="inline-block tracking-[0.3em] text-gold-400 text-xs font-semibold uppercase mb-6 border border-gold-500/30 px-6 py-2 rounded-full backdrop-blur-md">
                        The Pinnacle of Power
                    </div>
                    <h1 className="text-6xl md:text-[7rem] font-serif font-medium leading-[1.05] mb-8 text-white max-w-5xl mx-auto drop-shadow-2xl">
                        India's Energy Revolution <br /><span className="gold-gradient-text italic opacity-90 shimmer-text">Starts Here.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-12 font-light">
                        Architecting a sustainable legacy with ultra-premium solar solutions engineered for the world's most demanding estates and enterprises.
                    </p>
                    {/* Button Removed */}
                </motion.div>
            </div>
        </section>
    );
}

function Services() {
    const services = [
        {
            title: "Estate Integration",
            desc: "Bespoke residencial arrays crafted to blend seamlessly into luxury architecture while delivering uncompromising efficiency.",
        },
        {
            title: "Corporate Campuses",
            desc: "Massive-scale commercial deployments designed to zero out operational massive energy burdens intelligently.",
        },
        {
            title: "White-Glove Care",
            desc: "24/7 dedicated concierge monitoring, ensuring your infrastructure performs at peak output perpetually.",
        }
    ];

    return (
        <section id="services" className="py-24 relative z-10 w-full overflow-hidden">
            <Divider />
            <div className="container mx-auto px-6 relative z-10 mt-12">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-24 text-center">
                    <span className="text-gold-500 font-sans tracking-[0.2em] text-xs uppercase mb-4 block">Our Offerings</span>
                    <h2 className="text-5xl md:text-7xl font-serif text-white">Elite Infrastructure</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {services.map((svc, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: i * 0.15 }}
                            className="glass-dark p-12 rounded-none relative group transition-all duration-700 hover:-translate-y-2 border-t border-transparent hover:border-gold-500"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                            <div className="w-12 h-12 mb-10 flex items-center text-gold-500 opacity-60 group-hover:opacity-100 transition-opacity">
                                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            </div>
                            <h3 className="text-3xl font-serif mb-6 text-white">{svc.title}</h3>
                            <p className="text-neutral-400 font-light leading-relaxed mb-10 group-hover:text-neutral-300 transition-colors">{svc.desc}</p>
                            {/* Link Removed */}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Banner() {
    return (
        <section className="relative py-40 overflow-hidden flex items-center justify-center border-y border-gold-500/10">
            <div className="absolute inset-0 bg-luxury-950/80 z-10 backdrop-blur-sm"></div>
            <img src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 mix-blend-luminosity grayscale" alt="India Rooftops" />

            <div className="relative z-20 container mx-auto px-6 text-center">
                <h2 className="font-serif text-5xl md:text-7xl text-white mb-28 drop-shadow-2xl">Why India Chooses <span className="italic text-gold-400 shimmer-text">Solar</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
                    <div className="flex flex-col items-center">
                        <div className="font-serif text-7xl md:text-[6rem] text-gold-500 mb-6 font-medium">300+</div>
                        <div className="w-12 h-px bg-gold-500/50 mb-6"></div>
                        <div className="text-sm text-neutral-300 tracking-[0.3em] uppercase">Sunny Days a Year</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="font-serif text-7xl md:text-[6rem] text-gold-500 mb-6 font-medium">₹0</div>
                        <div className="w-12 h-px bg-gold-500/50 mb-6"></div>
                        <div className="text-sm text-neutral-300 tracking-[0.3em] uppercase">Electricity Bills</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="font-serif text-7xl md:text-[6rem] text-gold-500 mb-6 font-medium">25<span className="text-4xl">Y</span></div>
                        <div className="w-12 h-px bg-gold-500/50 mb-6"></div>
                        <div className="text-sm text-neutral-300 tracking-[0.3em] uppercase">Performance Warranty</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Impact() {
    const [activeSystem, setActiveSystem] = useState("10.0kW");
    const data = systemData[activeSystem];

    return (
        <section id="impact" className="py-24 relative z-10 w-full flex justify-center">
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-5xl md:text-7xl text-white mb-6">Global Impact Calculator</h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto font-light">Witness the empirical footprint reduction generated by our precision-engineered installations.</p>
                </div>

                <div className="glass-dark p-16 md:p-24 rounded-none relative overflow-hidden backdrop-blur-3xl">
                    <div className="flex flex-wrap justify-center gap-4 mb-24 relative z-20">
                        {Object.keys(systemData).map(key => (
                            <button
                                key={key}
                                onClick={() => setActiveSystem(key)}
                                className={`px-8 py-3 font-sans tracking-[0.1em] text-sm uppercase transition-all duration-500 border ${activeSystem === key
                                    ? 'bg-gold-500 text-black border-gold-500 shadow-[0_0_30px_rgba(255,136,0,0.4)]'
                                    : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-gold-500/50 hover:text-white'
                                    }`}
                            >
                                {key}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-24 gap-x-8 relative">
                        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-gold-500/20 to-transparent" />
                        <div className="hidden md:block absolute top-[50%] left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

                        <div className="text-center group">
                            <div className="text-7xl md:text-8xl font-serif text-white mb-6 tracking-tight shimmer-text">
                                <Counter to={data.trees} duration={1.2} />
                            </div>
                            <p className="text-sm tracking-[0.2em] text-gold-500 uppercase">Trees to the Planet</p>
                        </div>

                        <div className="text-center group">
                            <div className="text-7xl md:text-8xl font-serif text-white mb-6 tracking-tight shimmer-text">
                                <Counter to={data.water} duration={1.5} />
                            </div>
                            <p className="text-sm tracking-[0.2em] text-gold-500 uppercase">Litres of Water Saved</p>
                        </div>

                        <div className="text-center group">
                            <div className="text-7xl md:text-8xl font-serif text-white mb-6 tracking-tight shimmer-text flex items-center justify-center gap-1">
                                <Counter to={data.co2} duration={1.2} decimals={1} />
                            </div>
                            <p className="text-sm tracking-[0.2em] text-gold-500 uppercase">Tons of CO<sub className="bottom-0">2</sub> Reduced</p>
                        </div>

                        <div className="text-center group">
                            <div className="text-7xl md:text-8xl font-serif text-white mb-6 tracking-tight shimmer-text flex items-center justify-center gap-1">
                                <Counter to={data.coal} duration={1.2} decimals={1} />
                            </div>
                            <p className="text-sm tracking-[0.2em] text-gold-500 uppercase">Tons of Coal Avoided</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Testimonials() {
    const [width, setWidth] = useState(0);
    const carouselRef = useRef(null);

    const testimonials = [
        { name: "S. L.", role: "ESTATE OWNER", text: "Cynova Energy transformed our architecture. The integration is completely invisible. Simply majestic." },
        { name: "D. M.", role: "CEO, APEX INC", text: "The commercial array decimated our operational costs. Their execution team is the absolute apex of professionalism." },
        { name: "E. R.", role: "PORTFOLIO MANAGER", text: "From the initial consultation to final commissioning, a truly white-glove experience. Highly recommended." },
        { name: "M. T.", role: "FACILITY DIRECTOR", text: "Their preventative maintenance plans ensure our sprawling infrastructure remains perpetually optimal." }
    ];

    useEffect(() => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, []);

    return (
        <section id="testimonials" className="py-24 overflow-hidden relative z-10 w-full">
            <Divider />
            <div className="container mx-auto px-6 mt-12">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
                    <span className="text-gold-500 font-sans tracking-[0.2em] text-xs uppercase mb-4 block">Reputation</span>
                    <h2 className="text-5xl md:text-7xl font-serif text-white">Voices of the Elite</h2>
                </motion.div>

                <motion.div ref={carouselRef} className="cursor-grab overflow-hidden cursor-grabbing hide-scrollbar pb-10">
                    <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="flex gap-10 px-4 w-max">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                className="w-[400px] md:w-[500px] glass-dark p-12 flex flex-col pointer-events-none"
                            >
                                <div className="font-serif text-[8rem] text-gold-500/20 leading-none h-20 mb-6">“</div>
                                <p className="text-neutral-200 text-xl font-serif italic leading-loose mb-12 flex-grow">"{t.text}"</p>
                                <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                                    <div>
                                        <div className="font-bold text-white tracking-widest">{t.name}</div>
                                        <div className="text-xs text-gold-500 uppercase tracking-[0.2em] mt-2">{t.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

const systemModes = {
    'On-Grid': {
        tagline: 'Zero CAPEX. Maximum ROI.',
        description: 'Export surplus energy to the grid and watch your meter run backward. On-Grid systems deliver the fastest payback period — typically 3–4 years — with zero battery cost, leveraging net metering to convert every excess unit into revenue.',
        stats: [{ label: 'Payback Period', value: '3–4 Yrs' }, { label: 'ROI', value: '28%' }, { label: 'Grid Export', value: '100%' }],
        color: '#ff8800',
    },
    'Off-Grid': {
        tagline: 'Total Energy Independence.',
        description: 'Cut every wire to the utility company. Off-Grid systems with lithium battery banks guarantee power through outages, grid failures, and remote operations — the ultimate statement of infrastructure sovereignty.',
        stats: [{ label: 'Uptime', value: '99.9%' }, { label: 'Independence', value: '100%' }, { label: 'Backup', value: '24 Hrs' }],
        color: '#ffb340',
    },
    'Hybrid': {
        tagline: 'Intelligent Power Management.',
        description: 'The apex architecture. AI-driven load balancing dynamically routes energy between battery storage, grid export, and direct consumption — maximizing every watt across all conditions, simultaneously.',
        stats: [{ label: 'Efficiency', value: '98.5%' }, { label: 'Savings', value: '₹0 Bills' }, { label: 'Resilience', value: 'Dual-Path' }],
        color: '#ff9500',
    }
};

function OnGridDiagram() {
    return (
        <svg viewBox="0 0 500 280" className="w-full h-full" style={{ maxHeight: '260px' }}>
            {/* Sun */}
            <circle cx="250" cy="30" r="22" fill="rgba(255,220,80,0.9)" className="node-glow" />
            <line x1="250" y1="8" x2="250" y2="0" stroke="#ffdc50" strokeWidth="2" />
            <line x1="250" y1="52" x2="250" y2="60" stroke="#ffdc50" strokeWidth="2" />
            <line x1="228" y1="8" x2="220" y2="2" stroke="#ffdc50" strokeWidth="2" />
            <line x1="272" y1="8" x2="280" y2="2" stroke="#ffdc50" strokeWidth="2" />
            <line x1="217" y1="22" x2="209" y2="18" stroke="#ffdc50" strokeWidth="2" />
            <line x1="283" y1="22" x2="291" y2="18" stroke="#ffdc50" strokeWidth="2" />
            <text x="250" y="35" textAnchor="middle" fill="#0f0300" fontSize="11" fontWeight="bold">☀</text>

            {/* Solar Panel */}
            <rect x="195" y="80" width="110" height="60" rx="3" fill="none" stroke="#ff8800" strokeWidth="1.5" />
            <line x1="231" y1="80" x2="231" y2="140" stroke="#ff8800" strokeWidth="0.7" opacity="0.5" />
            <line x1="268" y1="80" x2="268" y2="140" stroke="#ff8800" strokeWidth="0.7" opacity="0.5" />
            <line x1="195" y1="110" x2="305" y2="110" stroke="#ff8800" strokeWidth="0.7" opacity="0.5" />
            <text x="250" y="116" textAnchor="middle" fill="#ff8800" fontSize="9" letterSpacing="1">SOLAR ARRAY</text>
            <rect x="230" y="138" width="40" height="8" rx="1" fill="#ff8800" opacity="0.7" />

            {/* Flow: Sun → Panel */}
            <path d="M250 52 L250 80" stroke="#ffb340" strokeWidth="2" className="energy-bolt" fill="none" />

            {/* Inverter */}
            <rect x="210" y="170" width="80" height="36" rx="4" fill="rgba(255,136,0,0.12)" stroke="#ff8800" strokeWidth="1" />
            <text x="250" y="192" textAnchor="middle" fill="#ff8800" fontSize="9" letterSpacing="1">INVERTER</text>
            <path d="M250 146 L250 170" stroke="#ffb340" strokeWidth="2" className="energy-bolt flow-path-delay1" fill="none" />

            {/* House */}
            <polygon points="100,210 80,230 80,270 120,270 120,230" fill="rgba(255,136,0,0.08)" stroke="#ff8800" strokeWidth="1.5" />
            <polygon points="100,210 70,235 130,235" fill="rgba(255,136,0,0.12)" stroke="#ff8800" strokeWidth="1" />
            <rect x="94" y="248" width="12" height="22" fill="#ff8800" opacity="0.5" />
            <text x="100" y="285" textAnchor="middle" fill="#ff8800" fontSize="8" letterSpacing="1">HOME</text>

            {/* Grid pole */}
            <line x1="400" y1="205" x2="400" y2="270" stroke="#ff8800" strokeWidth="2.5" opacity="0.8" />
            <line x1="380" y1="215" x2="420" y2="215" stroke="#ff8800" strokeWidth="1.5" opacity="0.7" />
            <line x1="384" y1="225" x2="416" y2="225" stroke="#ff8800" strokeWidth="1" opacity="0.5" />
            <circle cx="380" cy="215" r="3" fill="#ff8800" />
            <circle cx="420" cy="215" r="3" fill="#ff8800" />
            <text x="400" y="285" textAnchor="middle" fill="#ff8800" fontSize="8" letterSpacing="1">GRID</text>

            {/* Flows: Inverter → Home, Inverter → Grid */}
            <path d="M210 188 Q160 188 120 245" stroke="#ffb340" strokeWidth="1.8" fill="none" className="flow-path" />
            <path d="M290 188 Q340 188 380 218" stroke="#ffb340" strokeWidth="1.8" fill="none" className="flow-path flow-path-delay2" />

            {/* Labels */}
            <text x="155" y="184" fill="#ff8800" fontSize="8" opacity="0.7">CONSUME</text>
            <text x="320" y="184" fill="#ff8800" fontSize="8" opacity="0.7">EXPORT ₹</text>
        </svg>
    );
}

function OffGridDiagram() {
    return (
        <svg viewBox="0 0 500 280" className="w-full h-full" style={{ maxHeight: '260px' }}>
            {/* Sun */}
            <circle cx="250" cy="30" r="22" fill="rgba(255,220,80,0.9)" className="node-glow" />
            <text x="250" y="35" textAnchor="middle" fill="#0f0300" fontSize="11" fontWeight="bold">☀</text>

            {/* Panel */}
            <rect x="195" y="80" width="110" height="60" rx="3" fill="none" stroke="#ffb340" strokeWidth="1.5" />
            <line x1="231" y1="80" x2="231" y2="140" stroke="#ffb340" strokeWidth="0.7" opacity="0.5" />
            <line x1="268" y1="80" x2="268" y2="140" stroke="#ffb340" strokeWidth="0.7" opacity="0.5" />
            <line x1="195" y1="110" x2="305" y2="110" stroke="#ffb340" strokeWidth="0.7" opacity="0.5" />
            <text x="250" y="116" textAnchor="middle" fill="#ffb340" fontSize="9" letterSpacing="1">SOLAR ARRAY</text>
            <rect x="230" y="138" width="40" height="8" rx="1" fill="#ffb340" opacity="0.7" />

            {/* Flow: Sun → Panel */}
            <path d="M250 52 L250 80" stroke="#ffb340" strokeWidth="2" className="energy-bolt" fill="none" />

            {/* Charge Controller */}
            <rect x="210" y="168" width="80" height="32" rx="4" fill="rgba(255,179,64,0.1)" stroke="#ffb340" strokeWidth="1" />
            <text x="250" y="188" textAnchor="middle" fill="#ffb340" fontSize="8" letterSpacing="1">CONTROLLER</text>
            <path d="M250 148 L250 168" stroke="#ffb340" strokeWidth="2" className="energy-bolt flow-path-delay1" fill="none" />

            {/* Battery Bank */}
            <rect x="170" y="220" width="160" height="50" rx="5" fill="rgba(255,179,64,0.08)" stroke="#ffb340" strokeWidth="1.5" />
            {[0, 1, 2, 3].map(i => (
                <rect key={i} x={185 + i * 35} y="232" width="22" height="26" rx="3" fill="rgba(255,179,64,0.15)" stroke="#ffb340" strokeWidth="1" />
            ))}
            {[0, 1, 2, 3].map(i => (
                <rect key={i} x={193 + i * 35} y="229" width="8" height="4" rx="1" fill="#ffb340" opacity="0.7" />
            ))}
            <path d="M250 200 L250 220" stroke="#ffb340" strokeWidth="2" className="energy-bolt flow-path-delay2" fill="none" />
            <text x="250" y="283" textAnchor="middle" fill="#ffb340" fontSize="9" letterSpacing="2">BATTERY BANK</text>
        </svg>
    );
}

function HybridDiagram() {
    return (
        <svg viewBox="0 0 500 280" className="w-full h-full" style={{ maxHeight: '260px' }}>
            {/* Sun */}
            <circle cx="250" cy="25" r="20" fill="rgba(255,220,80,0.9)" className="node-glow" />
            <text x="250" y="30" textAnchor="middle" fill="#0f0300" fontSize="10" fontWeight="bold">☀</text>

            {/* Panel */}
            <rect x="200" y="66" width="100" height="52" rx="2" fill="none" stroke="#ff9500" strokeWidth="1.5" />
            <line x1="233" y1="66" x2="233" y2="118" stroke="#ff9500" strokeWidth="0.6" opacity="0.5" />
            <line x1="267" y1="66" x2="267" y2="118" stroke="#ff9500" strokeWidth="0.6" opacity="0.5" />
            <line x1="200" y1="92" x2="300" y2="92" stroke="#ff9500" strokeWidth="0.6" opacity="0.5" />
            <text x="250" y="97" textAnchor="middle" fill="#ff9500" fontSize="8" letterSpacing="1">SOLAR</text>
            <path d="M250 45 L250 66" stroke="#ff9500" strokeWidth="1.8" className="energy-bolt" fill="none" />

            {/* AI Hub center */}
            <circle cx="250" cy="158" r="26" fill="rgba(255,149,0,0.1)" stroke="#ff9500" strokeWidth="1.5" className="node-glow" />
            <text x="250" y="154" textAnchor="middle" fill="#ff9500" fontSize="8" fontWeight="bold">AI</text>
            <text x="250" y="166" textAnchor="middle" fill="#ff9500" fontSize="7">HUB</text>
            <path d="M250 118 L250 132" stroke="#ff9500" strokeWidth="1.8" className="energy-bolt flow-path-delay1" fill="none" />

            {/* House */}
            <polygon points="85,205 65,222 65,258 105,258 105,222" fill="rgba(255,149,0,0.06)" stroke="#ff9500" strokeWidth="1.2" />
            <polygon points="85,205 58,228 112,228" fill="rgba(255,149,0,0.1)" stroke="#ff9500" strokeWidth="1" />
            <rect x="79" y="238" width="12" height="20" fill="#ff9500" opacity="0.4" />
            <text x="85" y="272" textAnchor="middle" fill="#ff9500" fontSize="7.5" letterSpacing="1">HOME</text>
            <path d="M224 158 Q160 158 105 235" stroke="#ff9500" strokeWidth="1.5" fill="none" className="flow-path" />

            {/* Battery */}
            <rect x="175" y="225" width="80" height="38" rx="4" fill="rgba(255,149,0,0.08)" stroke="#ff9500" strokeWidth="1.2" />
            {[0, 1].map(i => (
                <rect key={i} x={188 + i * 32} y="234" width="22" height="20" rx="2" fill="rgba(255,149,0,0.15)" stroke="#ff9500" strokeWidth="0.8" />
            ))}
            {[0, 1].map(i => (
                <rect key={i} x={195 + i * 32} y="232" width="8" height="3" rx="1" fill="#ff9500" opacity="0.6" />
            ))}
            <text x="215" y="275" textAnchor="middle" fill="#ff9500" fontSize="7.5" letterSpacing="1">BATTERY</text>
            <path d="M250 184 L215 225" stroke="#ff9500" strokeWidth="1.5" fill="none" className="flow-path flow-path-delay1" />

            {/* Grid */}
            <line x1="400" y1="198" x2="400" y2="258" stroke="#ff9500" strokeWidth="2" opacity="0.8" />
            <line x1="382" y1="208" x2="418" y2="208" stroke="#ff9500" strokeWidth="1.2" opacity="0.7" />
            <line x1="386" y1="218" x2="414" y2="218" stroke="#ff9500" strokeWidth="0.9" opacity="0.5" />
            <circle cx="382" cy="208" r="2.5" fill="#ff9500" />
            <circle cx="418" cy="208" r="2.5" fill="#ff9500" />
            <text x="400" y="272" textAnchor="middle" fill="#ff9500" fontSize="7.5" letterSpacing="1">GRID</text>
            <path d="M276 158 Q340 158 380 210" stroke="#ff9500" strokeWidth="1.5" fill="none" className="flow-path flow-path-delay2" />

            <text x="132" y="158" fill="#ff9500" fontSize="7" opacity="0.7">LOAD</text>
            <text x="155" y="215" fill="#ff9500" fontSize="7" opacity="0.7">STORE</text>
            <text x="318" y="158" fill="#ff9500" fontSize="7" opacity="0.7">EXPORT</text>
        </svg>
    );
}

function SystemLogic() {
    const [activeMode, setActiveMode] = useState('On-Grid');
    const mode = systemModes[activeMode];
    const diagrams = { 'On-Grid': <OnGridDiagram />, 'Off-Grid': <OffGridDiagram />, 'Hybrid': <HybridDiagram /> };

    return (
        <section id="solar-solutions" className="py-24 relative z-10 w-full overflow-hidden">
            <Divider />
            <div className="container mx-auto px-6 mt-12">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
                    <span className="text-gold-500 font-sans tracking-[0.2em] text-xs uppercase mb-4 block">System Architecture</span>
                    <h2 className="text-5xl md:text-7xl font-serif text-white">System Logic</h2>
                    <p className="text-neutral-500 mt-4 max-w-xl mx-auto font-light">Select your operating paradigm. Watch energy flow in real-time.</p>
                </motion.div>

                <div className="flex justify-center mb-12">
                    <div className="flex border border-gold-500/20" style={{ borderRadius: '2px' }}>
                        {Object.keys(systemModes).map(mode => (
                            <button
                                key={mode}
                                className={`mode-btn ${activeMode === mode ? 'active' : ''}`}
                                onClick={() => setActiveMode(mode)}
                            >
                                <span>{mode}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeMode}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-0 glass-dark overflow-hidden"
                    >
                        <div className="relative flex items-center justify-center p-8 md:p-12 min-h-[300px]"
                            style={{ background: `radial-gradient(ellipse at center, ${mode.color}08 0%, transparent 70%)`, borderRight: '1px solid rgba(255,255,255,0.04)' }}>
                            <div className="w-full h-full flex items-center justify-center" style={{ maxWidth: '440px' }}>
                                {diagrams[activeMode]}
                            </div>
                            <div className="absolute bottom-4 left-4 text-xs tracking-widest uppercase opacity-40" style={{ color: mode.color }}>Live Flow Diagram</div>
                        </div>

                        <div className="p-10 md:p-14 flex flex-col justify-center">
                            <div className="mb-3">
                                <span className="data-badge" style={{ color: mode.color, borderColor: `${mode.color}40`, background: `${mode.color}10` }}>
                                    {activeMode} System
                                </span>
                            </div>
                            <h3 className="font-serif text-4xl text-white mt-4 mb-2">{mode.tagline}</h3>
                            <p className="text-neutral-400 font-light leading-relaxed mb-10">{mode.description}</p>

                            <div className="grid grid-cols-3 gap-4 mb-10">
                                {mode.stats.map((s, i) => (
                                    <div key={i} className="text-center p-4" style={{ background: `${mode.color}08`, border: `1px solid ${mode.color}20` }}>
                                        <div className="font-serif text-2xl mb-1" style={{ color: mode.color }}>{s.value}</div>
                                        <div className="text-xs text-neutral-500 tracking-widest uppercase">{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Button Removed */}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}

function SectorSections() {
    const [activeTab, setActiveTab] = useState('apartments');

    useEffect(() => {
        const handleHash = () => {
            if (window.location.hash === '#sectors-commercial') setActiveTab('commercial');
            if (window.location.hash === '#sectors-apartments') setActiveTab('apartments');
        };
        window.addEventListener('hashchange', handleHash);
        handleHash();
        return () => window.removeEventListener('hashchange', handleHash);
    }, []);

    return (
        <section id="sectors" className="py-24 relative z-10 w-full overflow-hidden">
            <div id="sectors-apartments" className="absolute -top-32" />
            <div id="sectors-commercial" className="absolute -top-32" />
            <Divider />
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full"
                    style={{ background: 'radial-gradient(ellipse, rgba(255,136,0,0.03) 0%, transparent 70%)' }} />
            </div>
            <div className="container mx-auto px-6 mt-12">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
                    <span className="text-gold-500 font-sans tracking-[0.2em] text-xs uppercase mb-4 block">Sector Intelligence</span>
                    <h2 className="text-5xl md:text-7xl font-serif text-white leading-none">
                        Built For Your<br /><span className="gold-gradient-text italic">World</span>
                    </h2>
                </motion.div>
                {/* Tab Toggle */}
                <div className="flex gap-0 mb-12 border border-gold-500/20 w-fit">
                    {[['apartments', '🏢 Apartment Communities'], ['commercial', '📊 Commercial Projects']].map(([key, label]) => (
                        <button key={key} onClick={() => { setActiveTab(key); window.location.hash = `#sectors-${key}`; }}
                            className={`mode-btn ${activeTab === key ? 'active' : ''}`}
                            style={{ minWidth: 200 }}>
                            <span>{label}</span>
                        </button>
                    ))}
                </div>
                <AnimatePresence mode="wait">
                    {activeTab === 'apartments' && (
                        <motion.div key="apartments" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                {/* Lifestyle Hero Card */}
                                <div className="industrial-card p-10 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-40 h-40" style={{ background: 'radial-gradient(ellipse at top right, rgba(255,179,64,0.08) 0%, transparent 70%)' }} />
                                    <span className="data-badge mb-6 inline-block">Lifestyle Premium</span>
                                    <h3 className="font-serif text-4xl text-white mb-2 mt-4">Solar-Powered <span className="gold-gradient-text italic">Luxury Living</span></h3>
                                    <p className="text-neutral-400 font-light leading-relaxed mb-8">
                                        Transform your apartment community into a zero-bill utopia. Residents enjoy dramatically reduced or eliminated electricity costs, shared solar benefits, and premium amenities all powered by the sun — increasing your property's desirability and value permanently.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        {[['Zero Common Area Bills', '☀️'], ['EV Charging Bays', '⚡'], ['24/7 Solar CCTV', '🔒'], ['Rooftop Gardens', '🌿']].map(([f, icon], i) => (
                                            <div key={i} className="flex items-center gap-3 p-3 rounded-sm" style={{ background: 'rgba(255,136,0,0.05)', border: '1px solid rgba(255,136,0,0.15)' }}>
                                                <span className="text-xl">{icon}</span>
                                                <span className="text-xs text-neutral-300 tracking-wider">{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        <button className="btn-luxury px-8 py-3 rounded-full font-bold text-sm tracking-wider uppercase">Schedule 3D Tour</button>
                                        <a href="#" className="px-8 py-3 rounded-full font-bold text-sm tracking-wider uppercase border border-gold-500/30 text-gold-400 hover:bg-gold-500/10 transition-all">Resident Portal</a>
                                    </div>
                                </div>
                                {/* 3D Amenity Tours Card */}
                                <div className="industrial-card p-10 flex flex-col justify-between">
                                    <div>
                                        <span className="data-badge mb-6 inline-block" style={{ color: '#ffb340', borderColor: 'rgba(255,179,64,0.3)', background: 'rgba(255,179,64,0.08)' }}>Virtual Experience</span>
                                        <h3 className="font-serif text-3xl text-white mt-4 mb-4">3D Amenity Tours & Resident Portal</h3>
                                        <p className="text-neutral-400 font-light leading-relaxed mb-6">Walk through solar installations virtually before commitment. Residents access real-time energy dashboards, usage reports, and bill-split calculators through our exclusive portal.</p>
                                    </div>
                                    <div className="space-y-3">
                                        {[
                                            { icon: '🏊', title: 'Pool & Common Areas', sub: 'Solar-heated, zero-cost' },
                                            { icon: '🎮', title: 'Clubhouse & Gym', sub: 'Fully solar-powered amenities' },
                                            { icon: '📱', title: 'MyEnergy App', sub: 'Live savings dashboard per flat' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 rounded-sm" style={{ background: 'rgba(255,136,0,0.04)', border: '1px solid rgba(255,136,0,0.12)' }}>
                                                <span className="text-2xl">{item.icon}</span>
                                                <div>
                                                    <div className="text-sm text-white font-medium">{item.title}</div>
                                                    <div className="text-xs text-neutral-500">{item.sub}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Stats Strip */}
                            <div className="glass-dark p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                {[['₹0', 'Electricity Bills'], ['25Y', 'Performance Guarantee'], ['40%', 'Property Value Uplift'], ['100%', 'Common Area Coverage']].map(([v, l], i) => (
                                    <div key={i}>
                                        <div className="font-serif text-4xl gold-gradient-text mb-2">{v}</div>
                                        <div className="text-xs text-neutral-500 tracking-[0.2em] uppercase">{l}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    {activeTab === 'commercial' && (
                        <motion.div key="commercial" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                                {/* ROI Card */}
                                <div className="lg:col-span-2 industrial-card p-10">
                                    <span className="data-badge mb-6 inline-block" style={{ color: '#ff9500', borderColor: 'rgba(255,149,0,0.3)', background: 'rgba(255,149,0,0.08)' }}>ROI Intelligence</span>
                                    <h3 className="font-serif text-4xl text-white mt-4 mb-4">Commercial Solar <span className="italic" style={{ color: '#ff9500' }}>Engineering</span></h3>
                                    <p className="text-neutral-400 font-light leading-relaxed mb-8">
                                        Engineered for boardrooms, not brochures. We model your exact load profile, lease structures, DISCOM tariff slabs, and depreciation windows to deliver a certified ROI projection with IRR and payback precision.
                                    </p>
                                    <div className="grid grid-cols-3 gap-4 mb-8">
                                        {[['₹0 Opex', 'After Break-Even'], ['40% Dep.', 'Section 32 Year 1'], ['3–5 Yrs', 'Payback Window'], ['22–28%', 'Project IRR'], ['SGST', 'Full Waiver'], ['CAPEX', '100% Financing']].map(([v, l], i) => (
                                            <div key={i} className="p-4 text-center rounded-sm" style={{ background: 'rgba(255,149,0,0.06)', border: '1px solid rgba(255,149,0,0.2)' }}>
                                                <div className="font-serif text-lg mb-1" style={{ color: '#ff9500' }}>{v}</div>
                                                <div className="text-xs text-neutral-600 uppercase tracking-wider">{l}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="btn-luxury px-10 py-4 rounded-full font-bold text-sm tracking-wider uppercase">Download ROI Report</button>
                                </div>
                                {/* Lease & Management */}
                                <div className="industrial-card p-8 flex flex-col gap-6">
                                    <div>
                                        <span className="data-badge inline-block" style={{ color: '#ff8800', borderColor: 'rgba(255,136,0,0.3)', background: 'rgba(255,136,0,0.08)' }}>Lease Management</span>
                                        <h4 className="font-serif text-2xl text-white mt-4 mb-3">Zero-Hassle Lease Architecture</h4>
                                        <p className="text-neutral-400 font-light leading-relaxed">We manage the full lease lifecycle — from structural assessment and grid approval to DISCOM synchronisation and lease exit protocols.</p>
                                    </div>
                                    <div className="space-y-3 flex-grow">
                                        {['DISCOM Grid Approval', 'Structural Load Report', '25-Year O&M SLA', 'Insurance Coverage', 'Performance Guarantee', 'Exit & Transfer Protocol'].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 text-xs text-neutral-400 tracking-wider">
                                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#ff8800' }} />
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                    <button className="btn-luxury px-6 py-3 rounded-full font-bold text-xs tracking-wider uppercase w-full">Get Lease Package</button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

function SolarFencing() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    return (
        <section id="solar-fencing" className="py-24 relative z-10 w-full overflow-hidden">
            <Divider />
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(255,136,0,0.02) 50%, transparent 100%)' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px]" style={{ background: 'radial-gradient(ellipse, rgba(255,136,0,0.04) 0%, transparent 70%)' }} />
            </div>
            <div className="container mx-auto px-6" ref={ref}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <span className="text-gold-500 font-sans tracking-[0.2em] text-xs uppercase mb-4 block">Land Intelligence</span>
                            <h2 className="text-5xl md:text-7xl font-serif text-white leading-none">
                                Solar Boundary<br /><span className="gold-gradient-text italic">Guarding</span>
                            </h2>
                        </div>
                        <div className="max-w-sm">
                            <p className="text-neutral-500 font-light leading-relaxed md:text-right">The only perimeter that defends your land <em>and</em> pays for itself — converting every metre of fencing into a live energy asset.</p>
                        </div>
                    </div>
                </motion.div>
                {/* Dual Value Proposition */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
                        className="industrial-card p-10 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full" style={{ background: 'linear-gradient(180deg, #ffb340, transparent)' }} />
                        <div className="text-5xl mb-6">🛡️</div>
                        <span className="data-badge mb-4 inline-block">Zero Encroachment</span>
                        <h3 className="font-serif text-3xl text-white mt-4 mb-4">Physical Security. Legally Enforced.</h3>
                        <p className="text-neutral-400 font-light leading-relaxed mb-6">
                            Our system uses your land's GPS coordinates to establish a tamper-proof solar perimeter. Any breach triggers instant AI-powered alerts — making unauthorized encroachment immediately detectable and legally actionable.
                        </p>
                        <div className="space-y-3">
                            {['GPS-Coordinate Geo-fencing', 'Tamper-Detect Alarm System', 'Legal Evidence Logging', '24/7 Remote Monitoring'].map((f, i) => (
                                <div key={i} className="flex items-center gap-3 text-xs text-neutral-400 tracking-wider">
                                    <span className="text-gold-500">◆</span> {f}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}
                        className="industrial-card p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-1 h-full" style={{ background: 'linear-gradient(180deg, #ff8800, transparent)' }} />
                        <div className="text-5xl mb-6">⚡</div>
                        <span className="data-badge mb-4 inline-block" style={{ color: '#ffb340', borderColor: 'rgba(255,179,64,0.3)', background: 'rgba(255,179,64,0.08)' }}>Power Generation</span>
                        <h3 className="font-serif text-3xl text-white mt-4 mb-4">Your Fence Earns While It Guards.</h3>
                        <p className="text-neutral-400 font-light leading-relaxed mb-6">
                            Every panel embedded in the fencing structure generates live electricity — powering its own 24/7 AI security cameras, perimeter lights, and IoT sensors with zero grid dependency. Surplus power feeds your operations.
                        </p>
                        <div className="space-y-3">
                            {['AI Camera Network (Self-Powered)', 'Solar-Lit Perimeter Lighting', 'IoT Motion Sensors', 'Surplus Power to Grid/Store'].map((f, i) => (
                                <div key={i} className="flex items-center gap-3 text-xs text-neutral-400 tracking-wider">
                                    <span className="text-gold-500">◆</span> {f}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
                {/* Stats Bar */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.5 }}
                    className="glass-dark p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border border-gold-500/20">
                    {[['₹0', 'Security Opex After Install'], ['24/7', 'AI Surveillance Active'], ['100%', 'Self-Powered Cameras'], ['GPS', 'Legal Coordinate Lock']].map(([v, l], i) => (
                        <div key={i}>
                            <div className="font-serif text-4xl gold-gradient-text mb-2 shimmer-text">{v}</div>
                            <div className="text-xs text-neutral-500 tracking-[0.15em] uppercase">{l}</div>
                        </div>
                    ))}
                </motion.div>
                {/* Button Removed */}
            </div>
        </section>
    );
}

function SolarCare() {
    const [formVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', address: '', date: '' });
    const [submitted, setSubmitted] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    const handleSubmit = async () => {
        if (formData.name && formData.phone) {
            const scriptURL = 'https://script.google.com/macros/s/AKfycbxAShdXAj4uNdua7TSUaK6CByixPpqi0VNx5NeouA-EeDd0GGiOXBTFZT3j9WVVqDMk/exec'; 
            try {
                const data = new URLSearchParams();
                data.append('name', formData.name);
                data.append('phone', formData.phone);
                data.append('date', formData.date);
                data.append('message', formData.address); // We map address to message for the sheet
                data.append('type', 'Cleaning Booking');
                
                await fetch(scriptURL, {
                    method: 'POST',
                    body: data,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    mode: 'no-cors'
                });
            } catch (error) {
                console.error('Error!', error.message);
            }
            setSubmitted(true);
            setTimeout(() => { setFormVisible(false); setSubmitted(false); setFormData({ name: '', phone: '', address: '', date: '' }); }, 3000);
        }
    };

    return (
        <section id="solar-care" className="py-24 relative z-10 w-full overflow-hidden" ref={ref}>
            <Divider />
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px]" style={{ background: 'radial-gradient(ellipse, rgba(255,136,0,0.04) 0%, transparent 70%)' }} />
            </div>
            <div className="container mx-auto px-6 mt-12">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16">
                    <span className="text-gold-500 font-sans tracking-[0.2em] text-xs uppercase mb-4 block">Performance Recovery</span>
                    <h2 className="text-5xl md:text-7xl font-serif text-white leading-none">
                        Solar Plate<br /><span className="gold-gradient-text italic">Maintenance</span>
                    </h2>
                    <p className="text-neutral-500 mt-6 max-w-xl font-light leading-relaxed">
                        Dust, bird debris, and grime silently rob your system of up to 30% efficiency. Our certified technicians restore peak output with precision cleaning protocols — no guesswork, just measurable performance recovery.
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                    {[
                        { icon: '🧹', title: 'Dry Micro-Fiber Clean', desc: 'Premium lint-free fabric removes fine dust particles without moisture risk. Safe for all panel types.', badge: 'Basic Recovery', color: '#ff8800' },
                        { icon: '💧', title: 'Deionised Water Wash', desc: 'Industrial-grade deionised water eliminates mineral spotting and stubborn deposits, restoring optical clarity.', badge: 'Advanced Recovery', color: '#ffb340' },
                        { icon: '🤖', title: 'AI Efficiency Audit', desc: 'Post-clean thermal imaging and performance data analysis confirms restored output vs baseline — documented proof of recovery.', badge: 'Performance Certified', color: '#ff9500' },
                    ].map((s, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.15 }}
                            className="industrial-card p-8">
                            <div className="text-4xl mb-4">{s.icon}</div>
                            <span className="data-badge mb-4 inline-block" style={{ color: s.color, borderColor: `${s.color}35`, background: `${s.color}0d` }}>{s.badge}</span>
                            <h3 className="font-serif text-2xl text-white mt-4 mb-3">{s.title}</h3>
                            <p className="text-neutral-400 font-light leading-relaxed">{s.desc}</p>
                        </motion.div>
                    ))}
                </div>
                {/* Recovery Stat */}
                <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
                    className="glass-dark p-8 flex flex-col md:flex-row items-center justify-between gap-8 mb-10 border border-gold-500/20">
                    <div className="flex flex-wrap gap-12">
                        {[['Up to 30%', 'Efficiency Recovered'], ['₹0', 'Hidden Charges'], ['Same Day', 'Service Available']].map(([v, l], i) => (
                            <div key={i} className="text-center">
                                <div className="font-serif text-3xl gold-gradient-text mb-1 shimmer-text">{v}</div>
                                <div className="text-xs text-neutral-500 tracking-[0.2em] uppercase">{l}</div>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setFormVisible(true)} className="btn-luxury px-12 py-4 rounded-full font-bold text-sm tracking-[0.2em] uppercase flex-shrink-0">
                        📅 Book a Cleaning
                    </button>
                </motion.div>
                {/* Cleaning Enquiry Modal */}
                <AnimatePresence>
                    {formVisible && (
                        <motion.div key="cleaning-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[200] flex items-center justify-center px-4"
                            style={{ background: 'rgba(3,3,3,0.85)', backdropFilter: 'blur(20px)' }}
                            onClick={(e) => { if (e.target === e.currentTarget) setFormVisible(false); }}>
                            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
                                className="glass-dark w-full max-w-lg p-10 relative border border-gold-500/20">
                                <button onClick={() => setFormVisible(false)} className="absolute top-5 right-5 text-neutral-500 hover:text-gold-400 text-2xl transition-colors">×</button>
                                {submitted ? (
                                    <div className="text-center py-8">
                                        <div className="text-5xl mb-4">✅</div>
                                        <h3 className="font-serif text-3xl text-white mb-2">Booking Confirmed!</h3>
                                        <p className="text-neutral-400 text-sm">Our team will contact you shortly to schedule your cleaning visit.</p>
                                    </div>
                                ) : (
                                    <>
                                        <span className="data-badge mb-4 inline-block">Cleaning Enquiry</span>
                                        <h3 className="font-serif text-3xl text-white mt-4 mb-6">Book a Solar Cleaning</h3>
                                        <div className="space-y-4">
                                            {[['Your Full Name', 'name', 'text'], ['Phone Number', 'phone', 'tel'], ['Installation Address', 'address', 'text'], ['Preferred Date', 'date', 'date']].map(([label, field, type]) => (
                                                <div key={field}>
                                                    <label className="text-xs text-neutral-500 tracking-[0.2em] uppercase mb-2 block">{label}</label>
                                                    <input type={type} value={formData[field]} onChange={e => setFormData({ ...formData, [field]: e.target.value })}
                                                        style={type === 'date' ? { colorScheme: 'dark' } : {}}
                                                        className="w-full bg-transparent border border-gold-500/20 px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500/60 transition-colors placeholder:text-neutral-700 rounded-sm"
                                                        placeholder={`Enter ${label.toLowerCase()}`} />
                                                </div>
                                            ))}
                                            <button onClick={handleSubmit} className="btn-luxury w-full py-4 rounded-full font-bold text-sm tracking-[0.2em] uppercase mt-2">
                                                Confirm Booking Request
                                            </button>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

function WhyChooseUs() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    const features = [
        {
            icon: "🏦",
            title: "Get Instant EMI Approval",
            desc: "With Cynova Energy, you get easy EMI options for 3, 6, 12 & 60 months.",
            extra: [
                "Pro-Tip: Get Solar At Zero Investment.",
                "Government subsidy covers your down payment, and monthly solar savings cover your EMIs."
            ]
        },
        {
            icon: "🌪️",
            title: "Cyclone-proof, safe structures",
            desc: "Our structures are engineered to handle 170 kmph wind speeds. When it comes to safety, no one demands more of Cynova Energy than Cynova Energy.",
            extra: []
        },
        {
            icon: "🛠️",
            title: "5-year maintenance promise",
            desc: "This includes quarterly deep cleaning, health checks & repairs.",
            extra: []
        },
        {
            icon: "📄",
            title: "Up to ₹78,000 government subsidy",
            desc: "We take care of your subsidy paperwork. With us your subsidy disbursal is quick and assured.",
            extra: []
        }
    ];

    return (
        <section id="why-choose-us" className="py-24 relative z-10 w-full overflow-hidden" ref={ref}>
            <Divider />
            <div className="container mx-auto px-6 mt-12">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16">
                    <span className="text-gold-500 font-sans tracking-[0.2em] text-xs uppercase mb-4 block">The Cynova Advantage</span>
                    <h2 className="text-5xl md:text-6xl font-serif text-white leading-none max-w-3xl">
                        Why choose Cynova Energy for your <span className="gold-gradient-text italic">solar installation</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
                    {/* Left side: List */}
                    <div className="space-y-8">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -30 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 + (idx * 0.1) }}
                                className="flex gap-6 p-6 rounded-lg group hover:bg-white/[0.02] transition-colors border border-transparent hover:border-gold-500/20"
                            >
                                <div className="text-4xl text-gold-500 bg-gold-500/10 h-16 w-16 flex items-center justify-center rounded-sm shrink-0 border border-gold-500/20 group-hover:bg-gold-500/20 transition-colors">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-serif text-white mb-2">{feature.title}</h3>
                                    <p className="text-neutral-400 font-light leading-relaxed mb-1">{feature.desc}</p>
                                    {feature.extra.map((line, i) => (
                                        <p key={i} className="text-neutral-500 font-light leading-relaxed text-sm mt-2">
                                            {i === 0 ? <strong className="text-gold-400 font-medium">{line}</strong> : line}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right side: Image Collage */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative h-[600px] w-full hidden lg:block"
                    >
                        {/* Image 1: Top right */}
                        <div className="absolute top-0 right-0 w-2/3 h-[250px] z-10 industrial-card p-2 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <img src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=1000&auto=format&fit=crop" alt="Installation" className="w-full h-full object-cover grayscale mix-blend-luminosity hover:grayscale-0 transition-all duration-700" />
                        </div>
                        {/* Image 2: Middle left */}
                        <div className="absolute top-1/3 left-0 w-3/4 h-[250px] z-20 industrial-card p-2 transform -rotate-2 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?q=80&w=1000&auto=format&fit=crop" alt="Solar Arrays" className="w-full h-full object-cover grayscale mix-blend-luminosity hover:grayscale-0 transition-all duration-700" />
                        </div>
                        {/* Image 3: Bottom right */}
                        <div className="absolute bottom-0 right-10 w-2/3 h-[250px] z-30 industrial-card p-2 transform rotate-1 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1000&auto=format&fit=crop" alt="Solar Field" className="w-full h-full object-cover grayscale mix-blend-luminosity hover:grayscale-0 transition-all duration-700" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            q: "What is Cynova energy?",
            a: "Cynova Energy is a solar EPC (Engineering, Procurement & Construction) company specializing in the design, installation, and maintenance of high-efficiency solar power systems for residencial and commercial customers."
        },
        {
            q: "How to apply for a Solar rooftop subsidy?",
            a: "Applying for a solar rooftop subsidy under the PM Surya Ghar Yojana is simple and hassle-free. First, register on the official portal and submit your application with your electricity details. Then, choose a registered vendor who will handle site survey, design, and installation after DISCOM approval, including net meter setup. Once the system is installed and inspected, you can apply for the subsidy, which will be directly credited to your bank account. Cynova Energy will guide you at every step and ensure you successfully receive your subsidy without any hassle."
        },
        {
            q: "Why should I go solar?",
            a: (
                <div className="space-y-4">
                    <p>Switching to solar is one of the smartest decisions you can make for your home or business. Solar energy helps you reduce your electricity bills by up to 80–90%, giving you long-term savings and protection from rising power costs. It also provides energy independence, so you're less affected by power cuts and tariff hikes.</p>
                    <p>With government support like the PM Surya Ghar Yojana, you can significantly lower your installation cost through subsidies. Solar systems are low maintenance, long-lasting (25+ years), and environmentally friendly, helping you reduce your carbon footprint.</p>
                    <p>By going solar, you're not just saving money—you're investing in a cleaner, smarter, and more reliable future.</p>
                </div>
            )
        },
        {
            q: "Is solar power safe?",
            a: (
                <div className="space-y-4">
                    <p>Yes, solar power is completely safe when installed properly. Modern solar systems are designed with multiple safety features, including proper earthing, surge protection, and high-quality wiring to prevent any electrical risks. The panels themselves are tested to withstand extreme weather conditions like heat, rain, and wind.</p>
                    <p>A professionally installed system ensures there is no risk to your home, roof, or electrical appliances. In fact, solar is considered one of the safest and most reliable energy sources available today. With regular basic maintenance and expert installation, you can use solar power with complete peace of mind.</p>
                </div>
            )
        },
        {
            q: "Will solar really reduce my electricity bill?",
            a: (
                <div className="space-y-4">
                    <p>Yes, solar can significantly reduce your electricity bill. By generating your own power from sunlight, you depend much less on grid electricity, which means lower monthly charges. In most cases, homeowners see savings of up to 80–90%, depending on system size and usage.</p>
                    <p>With net metering, any extra power your system generates is sent back to the grid, further reducing your bill. Over time, as electricity prices keep rising, your savings only increase—making solar a smart long-term investment.</p>
                </div>
            )
        },
        {
            q: "Do I need a big roof for Solar Installation?",
            a: "No, you don't need a very big roof for solar installation. Solar systems are flexible and can be designed based on the space you have. Even small or medium-sized rooftops can generate enough power to significantly reduce your electricity bill."
        },
        {
            q: "Is solar installation complicated?",
            a: (
                <div className="space-y-4">
                    <p>No, solar installation is not complicated when handled by professionals. The entire process—from site survey and system design to approvals, installation, and testing—is managed by Cynova Energy.</p>
                    <p>For most homes, installation is completed within 1–3 days with minimal disruption to your routine. Cynova Energy ensures everything is done safely, neatly, and as per standards, making your transition to solar smooth and hassle-free.</p>
                </div>
            )
        },
        {
            q: "Post-Installation Support: What happens after installation?",
            a: "After your solar system is installed, Cynova Energy carries out complete testing to ensure everything is working perfectly. Our team provides a live demo and explains how the system functions, how to monitor your generation, and how to maximize your savings. We make sure you are fully comfortable and confident using your solar system before we hand it over."
        },
        {
            q: "What if your roof could pay your electricity bills for the next 25 years?",
            a: "With Cynova Energy, it can. By installing a smart solar system, you generate your own power, cut down up to 80–90% of your electricity costs, and enjoy reliable energy for decades—all from your rooftop."
        }
    ];

    const toggleFaq = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section id="faq" className="py-24 relative z-10 w-full overflow-hidden">
            <Divider />
            <div className="container mx-auto px-6 mt-12 max-w-4xl">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
                    <span className="text-gold-500 font-sans tracking-[0.2em] text-xs uppercase mb-4 block">Knowledge Base</span>
                    <h2 className="text-5xl md:text-6xl font-serif text-white leading-none">
                        Frequently Asked <span className="gold-gradient-text italic">Questions</span>
                    </h2>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, y: 20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true }} 
                            transition={{ delay: idx * 0.1 }}
                            className="industrial-card rounded-md overflow-hidden border border-white/5 hover:border-gold-500/30 transition-colors"
                        >
                            <button 
                                onClick={() => toggleFaq(idx)} 
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className="font-serif text-lg text-white md:text-xl pr-4">{faq.q}</span>
                                <span className="text-gold-500 text-2xl font-light transform transition-transform duration-300" style={{ transform: openIndex === idx ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                            </button>
                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        key={`faq-${idx}`}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 text-neutral-400 font-light leading-relaxed border-t border-white/5">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}



function App() {
    const [legalModal, setLegalModal] = useState(null);

    return (
        <main className="min-h-screen relative bg-luxury-950 overflow-hidden selection:bg-gold-500 selection:text-black">

            <div className="grain" />

            <Navbar />
            <Hero />
            <Services />
            <WhyChooseUs />
            <SystemLogic />
            <Banner />
            <Impact />
            <Testimonials />
            <SectorSections />
            <SolarFencing />
            <SolarCare />
            <FAQ />


            <footer className="relative pt-40 pb-12 overflow-hidden flex flex-col items-center border-t border-gold-500/20">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?q=80&w=2674&auto=format&fit=crop" className="w-full h-full object-cover object-bottom opacity-30 mix-blend-luminosity grayscale" alt="Solar Background" />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-950 via-luxury-950/80 to-luxury-950/20"></div>
                </div>

                <div className="relative z-10 container mx-auto px-6 mb-20 text-center md:text-left">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                                <img src="/favicon.png" alt="Cynova Solar Logo" className="w-12 h-12 object-contain" />
                                <div className="text-3xl font-serif tracking-widest text-white opacity-80">
                                    CYNOVA<span className="text-gold-500"> SOLAR</span>
                                </div>
                            </div>
                            <p className="text-neutral-400 font-light leading-relaxed max-w-sm">
                                Cynova Solar Energy is a premier Solar EPC company dedicated to delivering high-performance, turnkey renewable energy solutions. We bridge the gap between complex solar technology and seamless energy independence.
                            </p>
                            <div className="flex gap-4 mt-6">
                                {/* YouTube */}
                                <a href="https://www.youtube.com/@cynovaenergy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-500 hover:bg-gold-500/10 hover:border-gold-500 transition-all group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="group-hover:scale-110 transition-transform">
                                        <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.052-.072 1.964l-.008.102-.022.261-.01.104c-.048.519-.119 1.023-.22 1.402a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                                    </svg>
                                </a>
                                {/* Instagram */}
                                <a href="https://www.instagram.com/cynova.energy?igsh=MW1iZXlkZm1xeHE5OA==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-500 hover:bg-gold-500/10 hover:border-gold-500 transition-all group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="group-hover:scale-110 transition-transform">
                                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.036 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="text-gold-500 font-sans tracking-[0.2em] text-xs uppercase mb-6">Emails</h4>
                            <p className="text-neutral-400 font-light leading-relaxed text-sm space-y-2">
                                <a href="mailto:info@cynovaenergy.com" className="block hover:text-gold-400 transition-colors">info@cynovaenergy.com</a>
                                <a href="mailto:hr@cynovaenergy.com" className="block hover:text-gold-400 transition-colors">hr@cynovaenergy.com</a>
                                <a href="mailto:ramakrishna@cynovaenergy.com" className="block hover:text-gold-400 transition-colors">ramakrishna@cynovaenergy.com</a>
                            </p>
                        </div>

                        <div>
                            <h4 className="text-gold-500 font-sans tracking-[0.2em] text-xs uppercase mb-6">Phones</h4>
                            <p className="text-neutral-400 font-light leading-relaxed text-sm space-y-2">
                                <a href="tel:+918179855959" className="block hover:text-gold-400 transition-colors">+91 81798 55959</a>
                                <a href="tel:+917680953888" className="block hover:text-gold-400 transition-colors">+91 76809 53888</a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 container mx-auto px-6 flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-center md:text-left">
                    <p className="text-xs text-neutral-500 tracking-[0.2em] uppercase mb-4 md:mb-0">© {new Date().getFullYear()} Cynova Energy Corp. All Rights Reserved.</p>
                    <div className="flex gap-6 text-xs text-neutral-500 tracking-[0.1em] uppercase justify-center">
                        <button onClick={() => setLegalModal('privacy')} className="hover:text-gold-400 transition-colors uppercase tracking-[0.1em]">Privacy Policy</button>
                        <button onClick={() => setLegalModal('terms')} className="hover:text-gold-400 transition-colors uppercase tracking-[0.1em]">Terms of Service</button>
                    </div>
                </div>
            </footer>

            {/* Legal Modals */}
            <AnimatePresence>
                {legalModal && (
                    <motion.div key="legal-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[300] flex items-center justify-center px-4 py-10"
                        style={{ background: 'rgba(3,3,3,0.9)', backdropFilter: 'blur(20px)' }}
                        onClick={(e) => { if (e.target === e.currentTarget) setLegalModal(null); }}>
                        <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
                            className="glass-dark w-full max-w-4xl max-h-[85vh] overflow-y-auto p-10 relative border border-gold-500/20 text-neutral-300">
                            <button onClick={() => setLegalModal(null)} className="absolute top-6 right-6 text-neutral-500 hover:text-gold-400 text-3xl transition-colors leading-none">&times;</button>
                            
                            {legalModal === 'privacy' && (
                                <div className="space-y-6 text-sm font-light leading-relaxed pr-4">
                                    <h2 className="text-3xl font-serif text-white mb-8 border-b border-white/10 pb-4">Privacy & Whistleblower Policy</h2>
                                    <p>Whistleblowing is the confidential disclosure by an individual of any concern encountered in a workplace relating to a perceived wrongdoing. "Whistleblower" is defined by this policy as an Employee or contractor who reports, to one or more of the parties specified in this Policy, an activity that he/she considers to be illegal, dishonest, unethical, or otherwise improper.</p>
                                    <p>The Company considers such wrongdoing to include:</p>
                                    <ul className="list-none space-y-2">
                                        <li><span className="text-gold-500 mr-2">a)</span>Fraud (an act of willful misrepresentation which would affect the interests of the concerned) against investors, securities fraud, mail or wire fraud, bank fraud, or fraudulent statements to relevant authority;</li>
                                        <li><span className="text-gold-500 mr-2">b)</span>general malpractice - such as immoral, illegal or unethical conduct;</li>
                                        <li><span className="text-gold-500 mr-2">c)</span>gross misconduct;</li>
                                        <li><span className="text-gold-500 mr-2">d)</span>potential infractions of the Company's internal controls;</li>
                                        <li><span className="text-gold-500 mr-2">e)</span>potential infractions of the requirements in, or made under, the regulations of the relevant countries where the Company operates;</li>
                                        <li><span className="text-gold-500 mr-2">f)</span>potential infractions of the codes of conduct of all relevant professional institutions; and</li>
                                        <li><span className="text-gold-500 mr-2">g)</span>any other event which would affect the interests of the business.</li>
                                    </ul>
                                    
                                    <h3 className="text-xl text-white mt-8 mb-4 border-l-2 border-gold-500 pl-4">1. Specific objectives of the policy shall include:</h3>
                                    <ul className="list-none space-y-2">
                                        <li><span className="text-gold-500 mr-2">a)</span>to encourage timely reporting of alleged malpractices/misconduct;</li>
                                        <li><span className="text-gold-500 mr-2">b)</span>to provide a means of discreet and confidential channel for escalation of concerns without fear of reprisal;</li>
                                        <li><span className="text-gold-500 mr-2">c)</span>to ensure consistence and timely responses to reported impropriety and awareness by whistleblowers of their obligations/rights;</li>
                                        <li><span className="text-gold-500 mr-2">d)</span>to serve as a means of preventing and deterring misconduct that may be contemplated but has not yet taken place; and</li>
                                        <li><span className="text-gold-500 mr-2">e)</span>to protect the rights of the Authority and its stakeholders.</li>
                                    </ul>
                                    
                                    <h3 className="text-xl text-white mt-8 mb-4 border-l-2 border-gold-500 pl-4">2. Types of Whistleblowing</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <strong className="text-white block mb-1">2.1 Internal Whistleblowers:</strong>
                                            <p>Employees are expected to report incidents of misconduct involving peers, supervisors or senior management to relevant reporting authorities.</p>
                                        </div>
                                        <div>
                                            <strong className="text-white block mb-1">2.2 External Whistleblowers:</strong>
                                            <p>Clients, customers, service providers and other members of the public who report unethical conduct of Employees to the Managing Director on issues relating to Management and the Human Resource Head on matters relating to all staff.</p>
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-xl text-white mt-8 mb-4 border-l-2 border-gold-500 pl-4">3. Procedure:</h3>
                                    <ul className="space-y-4 list-none">
                                        <li className="flex"><span className="text-gold-500 mr-3 font-bold">a)</span><span>The Whistleblower should promptly report the suspected or actual event to his/her supervisor.</span></li>
                                        <li className="flex"><span className="text-gold-500 mr-3 font-bold">b)</span><span>If the Whistleblower would be uncomfortable or otherwise reluctant to report to his/her supervisor, then the Whistleblower could report the event to the next highest or another level of management, including to an appropriate Board committee or member.</span></li>
                                        <li className="flex"><span className="text-gold-500 mr-3 font-bold">c)</span><span>The Whistleblower can report the event with his/her identity or anonymously.</span></li>
                                        <li className="flex"><span className="text-gold-500 mr-3 font-bold">d)</span><span>The Whistle blower shall receive no retaliation or retribution for a report that was provided in good faith – that was not done primarily with malice to damage another or the organization.</span></li>
                                        <li className="flex"><span className="text-gold-500 mr-3 font-bold">e)</span><span>A Whistleblower who makes a report that is not done in good faith is subject to disciplinary action, including termination or other legal means to protect the reputation of the organization and members of its Board and staff.</span></li>
                                        <li className="flex"><span className="text-gold-500 mr-3 font-bold">f)</span><span>Anyone who retaliates against the Whistleblower (who reported an event in good faith) will be subject to discipline, including termination of Board or Employee status.</span></li>
                                        <li className="flex"><span className="text-gold-500 mr-3 font-bold">g)</span><span>Crimes against persons or property should immediately be reported to the local police department.</span></li>
                                        <li className="flex"><span className="text-gold-500 mr-3 font-bold">h)</span><span>Supervisors, managers and/or board members who receive the reports must promptly act to investigate and/or resolve the issue.</span></li>
                                        <li className="flex"><span className="text-gold-500 mr-3 font-bold">i)</span><span>The Whistleblower shall receive an acknowledgement and a plan of action within 7 working days of the initial report, regarding the investigation, disposition or resolution of the issue.</span></li>
                                    </ul>
                                    <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-sm">
                                        <p>The identity of the Whistleblower, if known, shall remain confidential to those persons directly involved in applying this policy, unless the issue requires investigation by law enforcement, in which case members of the organization are subject to subpoena.</p>
                                    </div>
                                </div>
                            )}

                            {legalModal === 'terms' && (
                                <div className="space-y-6 text-sm font-light leading-relaxed pr-4">
                                    <h2 className="text-3xl font-serif text-white mb-8 border-b border-white/10 pb-4">Terms of Service</h2>
                                    
                                    <h3 className="text-xl text-white mt-6 mb-3 border-l-2 border-gold-500 pl-4">Terms of Use</h3>
                                    <p className="mb-6">By registering yourself with us you authorize us to contact you via email/ phone call, WhatsApp or SMS and offer you our services, imparting product knowledge, offer promotional offers running on the website, irrespective of the fact if also you have registered yourself under DND or DNC or NCPR service, you still authorize us to give you a call from Cynova Energy for the above-mentioned purposes.</p>
                                    
                                    <h3 className="text-xl text-white mt-6 mb-3 border-l-2 border-gold-500 pl-4">Refund Policy</h3>
                                    <p className="mb-6">The advance payment is non-refundable under any circumstances.</p>
                                    
                                    <h3 className="text-xl text-white mt-6 mb-3 border-l-2 border-gold-500 pl-4">Shipping & Project Timeline</h3>
                                    <p>The project timeline ranges from 15 to 90 days, with no dependencies that could cause delays. However, in the event of unforeseen delays, the timeline may be extended. Customers will be promptly notified of any such extensions.</p>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}

export default App;
