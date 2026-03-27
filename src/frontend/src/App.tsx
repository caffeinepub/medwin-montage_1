import {
  Bot,
  Building2,
  Check,
  ChevronDown,
  Film,
  Instagram,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Share2,
  Star,
  TrendingUp,
  User,
  Video,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: User,
    title: "Personal Branding",
    desc: "Craft a magnetic personal brand that makes you unforgettable online.",
  },
  {
    icon: Video,
    title: "Business Reels",
    desc: "High-impact short-form videos that capture attention and convert viewers.",
  },
  {
    icon: Building2,
    title: "Real Estate Videos",
    desc: "Cinematic property showcases that sell spaces before a single visit.",
  },
  {
    icon: Bot,
    title: "AI Content Creation",
    desc: "Leverage AI-assisted tools to produce content faster and smarter.",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    desc: "Consistent, strategic posting that grows your audience every day.",
  },
  {
    icon: TrendingUp,
    title: "Growth Strategy",
    desc: "Data-driven plans that turn your content into real business results.",
  },
];

const VIMEO_VIDEOS = [
  { id: "1176462678", title: "Brand Story" },
  { id: "1176462651", title: "Business Reel" },
  { id: "1176462632", title: "Real Estate Showcase" },
  { id: "1176462602", title: "Social Campaign" },
  { id: "1176462586", title: "Product Launch" },
];

const PRICING = [
  {
    name: "Basic",
    price: "₹3,999",
    originalPrice: null,
    seasonOffer: false,
    delivery: "2-3 Days turnaround",
    popular: false,
    features: [
      "7 Video Edits (Reels/Shorts/Videos)",
      "Basic Cuts & Transitions",
      "Simple Color Correction",
      "Captions + Script Ideas",
      "Posting Guidance",
    ],
  },
  {
    name: "Pro",
    price: "₹6,999",
    originalPrice: "₹7,999",
    seasonOffer: true,
    delivery: "Delivery in 1–1½ days",
    popular: true,
    features: [
      "10 Video Edits (Reels/Shorts/Videos)",
      "Advanced Color Grading",
      "Sound Design",
      "Captions + Script Writing",
      "Hashtag Strategy",
      "Social Media Handling",
      "Growth Strategy",
    ],
  },
  {
    name: "Premium",
    price: "₹8,999",
    originalPrice: "₹9,999",
    seasonOffer: true,
    delivery: "⚡ Delivery in ½ day",
    popular: false,
    features: [
      "15 Video Edits (Reels/Shorts/Videos)",
      "Shoot Session Included",
      "Cinematic Editing + Effects",
      "Pro Sound Design",
      "Full Content Planning",
      "Social Media Management",
      "Branding + Optimization",
      "Performance Report",
      "Priority Delivery",
    ],
  },
];

const SEASON_OFFER_END = new Date("2026-04-15T23:59:59");
const POST_OFFER_MSG_END = new Date("2026-04-22T23:59:59");

const WA_LINK = "https://wa.me/919487897160";
const SMS_LINK = "sms:+919487897160";

function useOfferState() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const offerActive = now < SEASON_OFFER_END.getTime();
  const showPostOfferMsg = !offerActive && now < POST_OFFER_MSG_END.getTime();
  return { offerActive, showPostOfferMsg };
}

function calcTimeLeft() {
  const diff = SEASON_OFFER_END.getTime() - Date.now();
  if (diff <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (timeLeft.expired) return null;
  const pad = (n: number) => String(n).padStart(2, "0");
  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hrs", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];
  return (
    <div className="flex items-center justify-center gap-2 mt-3">
      <span className="text-xs text-muted-foreground tracking-widest uppercase mr-1">
        Offer ends in
      </span>
      {units.map((u, i) => (
        <span key={u.label} className="flex items-center gap-1">
          <span
            className="inline-flex flex-col items-center justify-center rounded px-2 py-1 min-w-[44px]"
            style={{
              backgroundColor: "oklch(0.14 0 0)",
              border: "1px solid oklch(0.55 0.20 30 / 0.5)",
            }}
          >
            <span
              className="font-display text-xl font-bold leading-none"
              style={{ color: "oklch(0.75 0.20 30)" }}
            >
              {pad(u.value)}
            </span>
            <span className="text-[10px] tracking-widest uppercase text-muted-foreground mt-0.5">
              {u.label}
            </span>
          </span>
          {i < units.length - 1 && (
            <span
              className="text-lg font-bold"
              style={{ color: "oklch(0.55 0.20 30)" }}
            >
              :
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMsgPopup, setShowMsgPopup] = useState(false);
  const { offerActive, showPostOfferMsg } = useOfferState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[oklch(0.09_0_0/0.97)] backdrop-blur-md border-b border-[oklch(0.25_0_0)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 group"
            data-ocid="nav.link"
          >
            <div className="w-8 h-8 rounded-sm bg-gold flex items-center justify-center">
              <Film className="w-4 h-4 text-[oklch(0.09_0_0)]" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              Medwin <span className="text-gold">Montage</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors duration-200"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex gold-btn text-sm"
              data-ocid="nav.primary_button"
            >
              Let's Talk
            </a>
            <button
              type="button"
              className="md:hidden text-foreground p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[oklch(0.11_0_0)] border-t border-[oklch(0.20_0_0)]"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-btn text-sm text-center mt-2"
                  data-ocid="nav.primary_button"
                >
                  Let's Talk
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-medwin-montage.dim_1920x1080.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.09_0_0/0.7)] via-[oklch(0.09_0_0/0.75)] to-[oklch(0.09_0_0/0.95)]" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-label mb-6"
          >
            Video Editing & Content Creation
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight uppercase tracking-tight text-white mb-6"
          >
            Turning Raw Footage into{" "}
            <span className="text-gold">Real Business Growth.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            We turn raw footage into powerful content that helps businesses
            grow, build their brand, and stand out online.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              type="button"
              onClick={() => scrollTo("#portfolio")}
              className="gold-btn text-base"
              data-ocid="hero.primary_button"
            >
              View Our Work
            </button>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-outline-btn text-base"
              data-ocid="hero.secondary_button"
            >
              Get a Free Quote
            </a>
          </motion.div>
        </div>
        <button
          type="button"
          onClick={() => scrollTo("#about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 md:py-28 bg-[oklch(0.11_0_0)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="section-label mb-4">About</p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                I turn raw footage into powerful content that helps businesses
                grow, build their brand, and stand out online. Every frame is
                crafted with intention — storytelling that converts, visuals
                that captivate, and strategy that scales.
              </p>
              <p className="text-foreground text-base md:text-lg leading-relaxed border-l-2 border-gold pl-4">
                We don't just create content — we create content that{" "}
                <span className="text-gold font-semibold">
                  grows your business.
                </span>
              </p>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-right"
            >
              <p className="section-label mb-3 text-right">Founder</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
                Medwin Levay E
              </h2>
              <p className="text-gold text-sm tracking-widest uppercase mb-6">
                Founder, Medwin Montage
              </p>
              <p className="font-script text-4xl text-gold mb-8">
                Medwin Levay
              </p>
              <div className="flex justify-end">
                <div className="w-48 h-48 rounded-sm bg-[oklch(0.18_0_0)] border border-gold/30 flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <Film className="w-16 h-16 text-gold mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground tracking-widest uppercase">
                      Medwin Montage
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-[oklch(0.20_0_0)]"
          >
            {[
              { num: "100+", label: "Videos Delivered" },
              { num: "50+", label: "Happy Clients" },
              { num: "3+", label: "Years Experience" },
              { num: "6", label: "Services Offered" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-bold text-gold mb-1">
                  {stat.num}
                </p>
                <p className="text-xs text-muted-foreground tracking-widest uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 md:py-28 bg-[oklch(0.13_0_0)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p
              className="section-label mb-3"
              style={{ color: "oklch(0.60 0.12 75)" }}
            >
              What We Do
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase">
              Our <span style={{ color: "oklch(0.60 0.12 75)" }}>Services</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-[oklch(0.18_0_0)] border border-[oklch(0.72_0.13_78/0.35)] rounded-sm p-6 group hover:border-[oklch(0.72_0.13_78)] hover:shadow-gold transition-all duration-300"
                data-ocid={`services.item.${i + 1}`}
              >
                <div
                  className="w-12 h-12 rounded-sm mb-4 flex items-center justify-center"
                  style={{ backgroundColor: "oklch(0.72 0.13 78 / 0.1)" }}
                >
                  <service.icon
                    className="w-6 h-6"
                    style={{ color: "oklch(0.60 0.12 75)" }}
                  />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-muted-foreground text-sm mt-10 max-w-2xl mx-auto">
            We don't just create content —{" "}
            <span
              className="font-semibold"
              style={{ color: "oklch(0.60 0.12 75)" }}
            >
              we create content that grows your business.
            </span>
          </p>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-20 md:py-28 bg-[oklch(0.09_0_0)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Our Work</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase">
              Featured <span className="text-gold">Work</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIMEO_VIDEOS.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-sm overflow-hidden border border-[oklch(0.25_0_0)] hover:border-gold transition-colors duration-300 ${
                  i === 4
                    ? "sm:col-span-2 lg:col-span-1 lg:mx-auto lg:max-w-xs"
                    : ""
                }`}
                data-ocid={`portfolio.item.${i + 1}`}
              >
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "177.78%" }}
                >
                  <iframe
                    src={`https://player.vimeo.com/video/${video.id}?color=c9a24d&title=0&byline=0&portrait=0`}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                  />
                </div>
                <div className="bg-[oklch(0.13_0_0)] px-4 py-3">
                  <p className="text-xs tracking-widest uppercase text-muted-foreground">
                    {video.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 md:py-28 bg-[oklch(0.09_0_0)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p
              className="section-label mb-3"
              style={{ color: "oklch(0.60 0.12 75)" }}
            >
              Packages
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase">
              Choose Your{" "}
              <span style={{ color: "oklch(0.60 0.12 75)" }}>Plan</span>
            </h2>

            {/* Season Offer Banner — active countdown */}
            {offerActive && (
              <div
                className="mt-6 mx-auto max-w-lg rounded-sm px-5 py-4"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.14 0 0), oklch(0.12 0 0))",
                  border: "1px solid oklch(0.55 0.20 30 / 0.6)",
                  boxShadow: "0 0 20px oklch(0.55 0.20 30 / 0.15)",
                }}
              >
                <p
                  className="text-sm font-bold tracking-widest uppercase"
                  style={{ color: "oklch(0.75 0.20 30)" }}
                >
                  🎉 Season Offer — Save ₹1,000 on Pro &amp; Premium!
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Valid until April 15, 2026
                </p>
                <CountdownTimer />
              </div>
            )}

            {/* Post-offer message — early visitor eligibility */}
            {!offerActive && showPostOfferMsg && (
              <div
                className="mt-6 mx-auto max-w-2xl rounded-sm px-5 py-4 text-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.14 0 0), oklch(0.12 0 0))",
                  border: "1px solid oklch(0.55 0.20 30 / 0.6)",
                  boxShadow: "0 0 20px oklch(0.55 0.20 30 / 0.15)",
                }}
              >
                <p
                  className="text-sm font-bold tracking-widest uppercase mb-2"
                  style={{ color: "oklch(0.75 0.20 30)" }}
                >
                  🎬 Special Offer Still Available for Early Visitors
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  "If you visited before April 10th, you're still eligible for
                  the Season Offer — a deal no other editor or freelancer can
                  match. Contact us now!"
                </p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-btn text-sm inline-flex items-center gap-2"
                  data-ocid="pricing.primary_button.1"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contact Now
                </a>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {PRICING.map((plan, i) => {
              const displayPrice = offerActive
                ? plan.price
                : (plan.originalPrice ?? plan.price);
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative rounded-sm flex flex-col ${
                    plan.popular
                      ? "bg-[oklch(0.12_0_0)] border-2 border-[oklch(0.72_0.13_78)] shadow-gold scale-[1.03]"
                      : "bg-[oklch(0.15_0_0)] border border-[oklch(0.25_0_0)]"
                  }`}
                  data-ocid={`pricing.item.${i + 1}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span
                        className="px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full"
                        style={{
                          backgroundColor: "oklch(0.72 0.13 78)",
                          color: "oklch(0.09 0 0)",
                        }}
                      >
                        Most Popular
                      </span>
                    </div>
                  )}
                  {offerActive && plan.seasonOffer && (
                    <div className="absolute -top-3.5 right-4">
                      <span
                        className="px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full"
                        style={{
                          backgroundColor: "oklch(0.55 0.20 30)",
                          color: "oklch(1 0 0)",
                        }}
                      >
                        Season Offer
                      </span>
                    </div>
                  )}
                  <div className="p-7 flex flex-col flex-1">
                    <div className="mb-6">
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
                        {plan.name}
                      </p>
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <p className="font-display text-4xl font-bold text-foreground">
                          {displayPrice}
                        </p>
                        {offerActive && plan.originalPrice && (
                          <p className="font-display text-xl text-muted-foreground line-through">
                            {plan.originalPrice}
                          </p>
                        )}
                      </div>
                      {offerActive && plan.originalPrice && (
                        <p
                          className="text-xs font-semibold mt-1"
                          style={{ color: "oklch(0.65 0.18 145)" }}
                        >
                          You save ₹1,000!
                        </p>
                      )}
                      <p className="text-xs text-gold mt-1">{plan.delivery}</p>
                    </div>

                    <ul className="flex flex-col gap-3 flex-1 mb-8">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <Check
                            className="w-4 h-4 mt-0.5 flex-shrink-0"
                            style={{ color: "oklch(0.72 0.13 78)" }}
                          />
                          <span className="text-sm text-muted-foreground">
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gold-btn text-sm text-center block"
                      data-ocid={`pricing.primary_button.${i + 1}`}
                    >
                      Get Started
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 md:py-28 bg-[oklch(0.11_0_0)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="section-label mb-4">Get In Touch</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase mb-4">
            Let's <span className="text-gold">Connect</span>
          </h2>
          <p className="text-muted-foreground mb-12 max-w-xl mx-auto">
            Ready to transform your content? Reach out and let's discuss how we
            can grow your business together.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <motion.a
              href="tel:+919487897160"
              whileHover={{ scale: 1.03 }}
              className="flex flex-col items-center gap-3 p-6 border border-[oklch(0.25_0_0)] rounded-sm hover:border-gold transition-colors group"
              data-ocid="contact.link"
            >
              <Phone className="w-8 h-8 text-gold" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                +91 9487897160
              </span>
            </motion.a>
            <motion.a
              href="mailto:medwinmontage@gmail.com"
              whileHover={{ scale: 1.03 }}
              className="flex flex-col items-center gap-3 p-6 border border-[oklch(0.25_0_0)] rounded-sm hover:border-gold transition-colors group"
              data-ocid="contact.link"
            >
              <Mail className="w-8 h-8 text-gold" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                medwinmontage@gmail.com
              </span>
            </motion.a>
            <motion.a
              href="https://instagram.com/medwin.montage_"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              className="flex flex-col items-center gap-3 p-6 border border-[oklch(0.25_0_0)] rounded-sm hover:border-gold transition-colors group"
              data-ocid="contact.link"
            >
              <Instagram className="w-8 h-8 text-gold" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                @medwin.montage_
              </span>
            </motion.a>
          </div>

          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-btn text-base inline-flex items-center gap-2"
            data-ocid="contact.primary_button"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[oklch(0.07_0_0)] border-t border-[oklch(0.18_0_0)] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-sm bg-gold flex items-center justify-center">
                <Film className="w-3.5 h-3.5 text-[oklch(0.09_0_0)]" />
              </div>
              <span className="font-display font-bold text-base text-foreground">
                Medwin <span className="text-gold">Montage</span>
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/medwin.montage_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="mailto:medwinmontage@gmail.com"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[oklch(0.15_0_0)] text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Medwin Montage. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING BUTTONS */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Let's Talk pill */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="gold-btn text-xs flex items-center gap-2 rounded-full px-5 py-2.5 shadow-gold"
          data-ocid="float.primary_button"
        >
          <Star className="w-3.5 h-3.5" />
          Let's Talk
        </a>

        {/* WhatsApp/SMS toggle */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMsgPopup(!showMsgPopup)}
            className="w-14 h-14 rounded-full bg-whatsapp flex items-center justify-center shadow-lg hover:brightness-110 transition-all"
            aria-label="Message options"
            data-ocid="float.toggle"
          >
            <MessageCircle className="w-7 h-7 text-white" />
          </button>

          <AnimatePresence>
            {showMsgPopup && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 10 }}
                className="absolute bottom-16 right-0 bg-[oklch(0.14_0_0)] border border-[oklch(0.25_0_0)] rounded-sm overflow-hidden shadow-xl min-w-[180px]"
                data-ocid="float.popover"
              >
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[oklch(0.20_0_0)] transition-colors text-foreground"
                  data-ocid="float.primary_button"
                >
                  <MessageCircle className="w-4 h-4 text-[oklch(0.72_0.18_145)]" />
                  <span className="text-sm">Chat on WhatsApp</span>
                </a>
                <div className="h-px bg-[oklch(0.20_0_0)]" />
                <a
                  href={SMS_LINK}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[oklch(0.20_0_0)] transition-colors text-foreground"
                  data-ocid="float.secondary_button"
                >
                  <Phone className="w-4 h-4 text-gold" />
                  <span className="text-sm">Send SMS</span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
