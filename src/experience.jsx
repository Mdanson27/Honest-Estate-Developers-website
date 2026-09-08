import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Eye,
  EyeOff,
  Heart,
  Landmark,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  User,
  UserPlus,
  X,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  company,
  companyProfile,
  investmentPrograms,
  properties,
  services,
} from "./data";

const HERO_SLIDES = [
  {
    image:
      "https://www.honestestatedevelopers.com/images/property/21025318020260608084742pm.jpg",
    kicker: "Masaka Road • Mpigi–Mpambire",
    title: "Property decisions with",
    emphasis: "clarity.",
    text:
      "Explore land opportunities through a customer journey built around consultation, site inspection, documentation and transparent support.",
    primary: "/properties?q=Mpigi",
    primaryLabel: "Explore Mpigi opportunities",
  },
  {
    image:
      "https://www.honestestatedevelopers.com/images/property/119185025120230921022129pm.jpg",
    kicker: "Hoima Road • Growth corridor",
    title: "Own land with a",
    emphasis: "clear path.",
    text:
      "Browse HED's estate portfolio across selected growth corridors and compare opportunities by location and budget.",
    primary: "/properties?corridor=Hoima%20Road",
    primaryLabel: "Browse Hoima Road",
  },
  {
    image:
      "https://www.honestestatedevelopers.com/images/property/150364507020231024110434am.jpg",
    kicker: "Entebbe Road • Investment access",
    title: "Build toward your",
    emphasis: "next move.",
    text:
      "From property selection to documentation, construction and management, HED brings professional support into one relationship.",
    primary: "/services",
    primaryLabel: "Explore HED services",
  },
  {
    image:
      "https://www.honestestatedevelopers.com/images/property/166002707620230926041943pm.jpg",
    kicker: "Diaspora • Structured investment",
    title: "Stay connected to",
    emphasis: "home.",
    text:
      "Discover HED's diaspora engagement and structured investment concepts designed to make property ownership more accessible across borders.",
    primary: "/programmes",
    primaryLabel: "Explore programmes",
  },
];

const CORRIDORS = [
  {
    name: "Hoima Road",
    subtitle: "Affordable estate opportunities",
    query: "/properties?corridor=Hoima%20Road",
    image:
      "https://honestestatedevelopers.com/images/property/119185025120230921022129pm.jpg",
  },
  {
    name: "Entebbe Road",
    subtitle: "Residential & investment growth",
    query: "/properties?corridor=Entebbe%20Road",
    image:
      "https://www.honestestatedevelopers.com/images/property/150364507020231024110434am.jpg",
  },
  {
    name: "Namugongo Road",
    subtitle: "Urban-edge property access",
    query: "/properties?corridor=Namugongo%20Road",
    image:
      "https://www.honestestatedevelopers.com/images/property/166002707620230926041943pm.jpg",
  },
  {
    name: "Masaka Road",
    subtitle: "Mpigi–Mpambire corridor",
    query: "/properties?corridor=Masaka%20Road",
    image:
      "https://www.honestestatedevelopers.com/images/property/21025318020260608084742pm.jpg",
  },
];

const DEMO_STORIES = [
  {
    title: "Land buyer journey",
    persona: "Sample client story • Wakiso",
    quote:
      "A future verified client story can show how HED guided a buyer from location selection through site inspection and documentation.",
  },
  {
    title: "Diaspora investment",
    persona: "Sample client story • Diaspora",
    quote:
      "This space can feature a verified diaspora customer explaining how remote engagement, documentation guidance and local support made the process easier.",
  },
  {
    title: "SACCO ownership",
    persona: "Sample client story • SACCO member",
    quote:
      "A verified story can demonstrate how structured property education and investment planning helped a member move closer to ownership.",
  },
  {
    title: "Development support",
    persona: "Sample client story • Property owner",
    quote:
      "This card can later contain a real customer account of using HED's construction, surveying or property-management support.",
  },
];

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

export function ExclusiveLoader() {
  const [phase, setPhase] = useState("enter");

  useEffect(() => {
    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const leaveAt = reduced ? 500 : 1950;
    const doneAt = reduced ? 850 : 2600;
    const leave = window.setTimeout(() => setPhase("leave"), leaveAt);
    const done = window.setTimeout(() => setPhase("done"), doneAt);
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(done);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`exclusive-loader exclusive-loader--${phase}`} aria-label="Entering Honest Estate Developers">
      <div className="exclusive-loader__panel exclusive-loader__panel--left" />
      <div className="exclusive-loader__panel exclusive-loader__panel--right" />
      <div className="exclusive-loader__stage">
        <div className="hed-gate">
          <span className="hed-gate__roof" />
          <span className="hed-gate__pillar hed-gate__pillar--left" />
          <span className="hed-gate__pillar hed-gate__pillar--right" />
          <div className="hed-gate__letters" aria-hidden="true">
            <span>H</span>
            <span>E</span>
            <span>D</span>
          </div>
          <span className="hed-gate__base" />
        </div>
        <div className="exclusive-loader__name">Honest Estate Developers Ltd</div>
        <div className="exclusive-loader__promise">Honesty <i /> Integrity <i /> Excellence</div>
        <div className="exclusive-loader__line"><span /></div>
        <small>Opening a clearer path to property ownership</small>
      </div>
    </div>
  );
}

function MegaLink({ to, title, copy, onClick }) {
  return (
    <Link className="mega-link" to={to} onClick={onClick}>
      <span>
        <strong>{title}</strong>
        {copy && <small>{copy}</small>}
      </span>
      <ChevronRight size={17} />
    </Link>
  );
}

function CallbackModal({ onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", interest: "Property inquiry" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const entries = readJson("hed_demo_callback_requests", []);
    entries.unshift({ ...form, createdAt: new Date().toISOString() });
    localStorage.setItem("hed_demo_callback_requests", JSON.stringify(entries.slice(0, 20)));
    setSent(true);
  };

  return (
    <div className="callback-backdrop" role="dialog" aria-modal="true">
      <div className="callback-modal">
        <button className="callback-modal__close" onClick={onClose} aria-label="Close callback form">
          <X size={20} />
        </button>
        <div className="callback-modal__brand">
          <img src={company.logo} alt="" />
          <span>
            <small>Exclusive assistance</small>
            <strong>Speak with HED</strong>
          </span>
        </div>
        {sent ? (
          <div className="callback-success">
            <CheckCircle2 size={35} />
            <h3>Demo request captured</h3>
            <p>
              This prototype stores the request locally. In production it can be connected to HED's CRM, email or WhatsApp workflow.
            </p>
            <button className="btn btn--dark" onClick={onClose}>Continue browsing</button>
          </div>
        ) : (
          <>
            <h2>Request a call back</h2>
            <p>
              Leave your details and choose what you want to discuss. This is currently a functional front-end demo.
            </p>
            <form onSubmit={submit}>
              <label>
                Full name
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
              </label>
              <label>
                Phone number
                <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+256..." />
              </label>
              <label>
                Interest
                <select value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}>
                  <option>Property inquiry</option>
                  <option>Site inspection</option>
                  <option>Investment programme</option>
                  <option>Diaspora engagement</option>
                  <option>Construction & development</option>
                  <option>Institutional partnership</option>
                </select>
              </label>
              <button className="btn btn--brand btn--full" type="submit">Request callback <ArrowRight size={17} /></button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function PremiumHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mega, setMega] = useState(null);
  const [callback, setCallback] = useState(false);
  const session = Boolean(localStorage.getItem("hed_demo_session"));
  const closeMega = () => setMega(null);

  const megaContent = {
    properties: (
      <div className="mega-grid mega-grid--3">
        <div>
          <span className="mega-heading">Browse by corridor</span>
          {["Hoima Road", "Entebbe Road", "Namugongo Road", "Masaka Road"].map((item) => (
            <MegaLink key={item} to={`/properties?corridor=${encodeURIComponent(item)}`} title={item} onClick={closeMega} />
          ))}
        </div>
        <div>
          <span className="mega-heading">Browse by budget</span>
          <MegaLink to="/properties?max=20000000" title="Up to UGX 20M" copy="Entry opportunities" onClick={closeMega} />
          <MegaLink to="/properties?min=20000000&max=40000000" title="UGX 20M – 40M" copy="Mid-range portfolio" onClick={closeMega} />
          <MegaLink to="/properties?min=40000000" title="UGX 40M+" copy="Premium opportunities" onClick={closeMega} />
        </div>
        <div className="mega-feature">
          <span>HED portfolio</span>
          <strong>{properties.length} current estate entries</strong>
          <p>Compare location, corridor and corporate-profile pricing in one catalogue.</p>
          <Link className="btn btn--dark" to="/properties" onClick={closeMega}>View all estates</Link>
        </div>
      </div>
    ),
    services: (
      <div className="mega-grid mega-grid--3">
        <div>
          <span className="mega-heading">Property services</span>
          {services.slice(0, 3).map((item) => (
            <MegaLink key={item.id} to="/services" title={item.title} copy={item.short} onClick={closeMega} />
          ))}
        </div>
        <div>
          <span className="mega-heading">Professional support</span>
          {services.slice(3).map((item) => (
            <MegaLink key={item.id} to="/services" title={item.title} copy={item.short} onClick={closeMega} />
          ))}
        </div>
        <div className="mega-feature mega-feature--blue">
          <span>Integrated journey</span>
          <strong>From selection to after-sale support</strong>
          <p>HED's profile presents a six-stage customer experience designed around guidance and transparency.</p>
          <Link className="btn btn--dark" to="/services" onClick={closeMega}>See the process</Link>
        </div>
      </div>
    ),
    programmes: (
      <div className="mega-grid mega-grid--2">
        <div>
          <span className="mega-heading">Ownership programmes</span>
          {investmentPrograms.map((item) => (
            <MegaLink key={item.id} to="/programmes" title={item.name} copy={item.audience} onClick={closeMega} />
          ))}
        </div>
        <div className="mega-feature mega-feature--yellow">
          <span>Diaspora engagement</span>
          <strong>Visit Uganda. Experience Uganda. Invest in Uganda.</strong>
          <p>Structured information, remote engagement, inspection support and documentation guidance.</p>
          <Link className="btn btn--dark" to="/programmes" onClick={closeMega}>Explore programmes</Link>
        </div>
      </div>
    ),
  };

  return (
    <>
      <div className="utility-bar utility-bar--premium">
        <div className="shell utility-bar__inner">
          <div className="utility-bar__group">
            <a href={`tel:${company.phonePrimary.replace(/\s/g, "")}`}><Phone size={13} /> {company.phonePrimary}</a>
            <a className="desktop-only" href={`mailto:${company.email}`}><Mail size={13} /> {company.email}</a>
          </div>
          <div className="utility-actions">
            <button onClick={() => setCallback(true)}>Request a callback</button>
            <Link to="/contact" className="desktop-only">Book a site visit</Link>
            <Link to={session ? "/account" : "/login"}>{session ? "My HED" : "Login"}</Link>
          </div>
        </div>
      </div>

      <header className="site-header site-header--premium" onMouseLeave={closeMega}>
        <div className="shell site-header__inner">
          <Link to="/" className="premium-brand" onClick={closeMega}>
            <span className="premium-brand__logo"><img src={company.logo} alt="Honest Estate Developers Ltd" /></span>
            <span><strong>Honest Estate</strong><small>Developers Ltd</small></span>
          </Link>

          <nav className="premium-nav desktop-only" aria-label="Primary navigation">
            <button className={mega === "properties" ? "active" : ""} onMouseEnter={() => setMega("properties")} onFocus={() => setMega("properties")}>
              Properties <ChevronDown size={14} />
            </button>
            <button className={mega === "services" ? "active" : ""} onMouseEnter={() => setMega("services")} onFocus={() => setMega("services")}>
              Services <ChevronDown size={14} />
            </button>
            <button className={mega === "programmes" ? "active" : ""} onMouseEnter={() => setMega("programmes")} onFocus={() => setMega("programmes")}>
              Programmes <ChevronDown size={14} />
            </button>
            <NavLink to="/about" onMouseEnter={closeMega}>About</NavLink>
            <NavLink to="/insights" onMouseEnter={closeMega}>Insights</NavLink>
            <NavLink to="/contact" onMouseEnter={closeMega}>Contact</NavLink>
          </nav>

          <div className="site-header__actions">
            <Link className="icon-account desktop-only" to={session ? "/account" : "/login"} aria-label={session ? "My HED account" : "Login"}>
              <User size={18} />
            </Link>
            <Link className="btn btn--dark desktop-only" to="/properties">Find property <ArrowRight size={17} /></Link>
            <button className="menu-toggle" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mega && (
          <div className="mega-menu desktop-only">
            <div className="shell mega-menu__inner">{megaContent[mega]}</div>
          </div>
        )}

        {mobileOpen && (
          <div className="mobile-nav mobile-nav--premium">
            <div className="shell mobile-nav__inner">
              <Link to="/properties" onClick={() => setMobileOpen(false)}>Properties <ChevronRight size={17} /></Link>
              <Link to="/services" onClick={() => setMobileOpen(false)}>Services <ChevronRight size={17} /></Link>
              <Link to="/programmes" onClick={() => setMobileOpen(false)}>Programmes <ChevronRight size={17} /></Link>
              <Link to="/about" onClick={() => setMobileOpen(false)}>About <ChevronRight size={17} /></Link>
              <Link to="/insights" onClick={() => setMobileOpen(false)}>Insights <ChevronRight size={17} /></Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)}>Contact <ChevronRight size={17} /></Link>
              <Link to={session ? "/account" : "/login"} onClick={() => setMobileOpen(false)}>{session ? "My HED account" : "Login / Sign up"} <User size={17} /></Link>
              <button onClick={() => { setMobileOpen(false); setCallback(true); }}>Request a callback <Phone size={17} /></button>
            </div>
          </div>
        )}
      </header>
      {callback && <CallbackModal onClose={() => setCallback(false)} />}
    </>
  );
}

export function HeroExperience() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState("buy");

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[index];
  const go = (next) => setIndex((next + HERO_SLIDES.length) % HERO_SLIDES.length);

  const modeActions = {
    buy: () => navigate("/properties"),
    invest: () => navigate("/programmes"),
    diaspora: () => navigate("/programmes"),
    services: () => navigate("/services"),
  };

  return (
    <section className="hero hero--experience">
      <div className="hero__media hero__media--slides">
        {HERO_SLIDES.map((item, i) => (
          <img key={item.image} className={i === index ? "active" : ""} src={item.image} alt="" aria-hidden={i !== index} />
        ))}
      </div>
      <div className="hero__overlay" />
      <div className="shell hero__content hero__content--experience">
        <div className="hero__copy">
          <span className="hero__kicker"><span className="dot dot--red" /> {slide.kicker}</span>
          <h1>{slide.title} <em>{slide.emphasis}</em></h1>
          <p>{slide.text}</p>
          <div className="hero__actions">
            <Link className="btn btn--brand" to={slide.primary}>{slide.primaryLabel} <ArrowRight size={18} /></Link>
            <Link className="btn btn--light" to="/contact">Book a site visit</Link>
          </div>
        </div>

        <div className="hero-experience-controls">
          <div className="hero-mode-tabs" role="tablist" aria-label="Explore HED">
            {[
              ["buy", "Buy land"],
              ["invest", "Invest"],
              ["diaspora", "Diaspora"],
              ["services", "Services"],
            ].map(([value, label]) => (
              <button key={value} className={mode === value ? "active" : ""} onClick={() => setMode(value)}>{label}</button>
            ))}
          </div>
          <button className="hero-mode-action" onClick={modeActions[mode]}>
            {mode === "buy" && "Browse the estate portfolio"}
            {mode === "invest" && "Explore investment programmes"}
            {mode === "diaspora" && "See diaspora pathways"}
            {mode === "services" && "View professional services"}
            <Search size={19} />
          </button>
        </div>

        <div className="hero-slider-nav">
          <button onClick={() => go(index - 1)} aria-label="Previous slide"><ArrowLeft size={18} /></button>
          <div>{HERO_SLIDES.map((_, i) => <button key={i} onClick={() => setIndex(i)} className={i === index ? "active" : ""} aria-label={`Go to slide ${i + 1}`} />)}</div>
          <button onClick={() => go(index + 1)} aria-label="Next slide"><ArrowRight size={18} /></button>
        </div>
      </div>
    </section>
  );
}

export function CorridorShowcase() {
  const [offset, setOffset] = useState(0);
  const ordered = useMemo(
    () => [...CORRIDORS.slice(offset), ...CORRIDORS.slice(0, offset)],
    [offset]
  );

  return (
    <section className="section corridor-section">
      <div className="shell">
        <div className="corridor-head">
          <div>
            <span className="eyebrow">Featured growth corridors</span>
            <h2>Explore HED by location</h2>
            <p>Use HED's current estate portfolio to move from broad interest to a focused corridor and budget.</p>
          </div>
          <div className="corridor-arrows">
            <button onClick={() => setOffset((offset - 1 + CORRIDORS.length) % CORRIDORS.length)}><ArrowLeft size={18} /></button>
            <button onClick={() => setOffset((offset + 1) % CORRIDORS.length)}><ArrowRight size={18} /></button>
          </div>
        </div>
        <div className="corridor-grid">
          {ordered.slice(0, 3).map((corridor) => (
            <Link className="corridor-card" key={corridor.name} to={corridor.query}>
              <img src={corridor.image} alt="" />
              <div className="corridor-card__shade" />
              <div className="corridor-card__copy">
                <small>{corridor.subtitle}</small>
                <h3>{corridor.name}</h3>
                <span><ArrowRight size={19} /></span>
              </div>
            </Link>
          ))}
        </div>
        <div className="corridor-footer"><Link className="btn btn--dark" to="/properties">View all estate opportunities</Link></div>
      </div>
    </section>
  );
}

export function PropertyWayStrip() {
  const cards = [
    ["Flexible approaches", "Selected property offerings can use flexible payment approaches.", "programmes"],
    ["Site inspections", "Move beyond a listing and assess the location and surrounding environment.", "contact"],
    ["Documentation support", "Get guidance through verification, documentation and title-related processes.", "services"],
    ["Diaspora engagement", "Structured remote engagement for Ugandans living abroad.", "programmes"],
    ["SACCO pathways", "Property investment concepts for SACCOs and their members.", "programmes"],
    ["Professional services", "Consulting, surveying, construction, management and maintenance.", "services"],
  ];
  return (
    <section className="property-way">
      <div className="shell">
        <span className="eyebrow">Property ownership, your way</span>
        <h2>Choose the kind of support you need</h2>
      </div>
      <div className="property-way__rail">
        {cards.map(([title, text, path], i) => (
          <Link to={`/${path}`} className="property-way__card" key={title}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
            <ArrowRight size={19} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ReviewsShowcase() {
  const [index, setIndex] = useState(0);
  const visible = [0, 1, 2, 3].map((i) => DEMO_STORIES[(index + i) % DEMO_STORIES.length]);

  return (
    <section className="section reviews-section">
      <div className="shell">
        <div className="reviews-head">
          <div>
            <span className="eyebrow">Client stories</span>
            <h2>Designed for verified HED experiences</h2>
            <p>
              The layout is ready for authentic HED testimonials. The copy below is clearly marked as demo placeholder content and should be replaced before final public launch.
            </p>
          </div>
          <div className="reviews-controls">
            <button onClick={() => setIndex((index - 1 + DEMO_STORIES.length) % DEMO_STORIES.length)}><ArrowLeft size={18} /></button>
            <button onClick={() => setIndex((index + 1) % DEMO_STORIES.length)}><ArrowRight size={18} /></button>
          </div>
        </div>
        <div className="reviews-grid">
          {visible.map((story) => (
            <article className="review-card" key={story.title}>
              <div className="review-card__label">Demo placeholder</div>
              <div className="review-card__stars">★★★★★</div>
              <p>“{story.quote}”</p>
              <div>
                <strong>{story.title}</strong>
                <small>{story.persona}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SavePropertyButton({ slug, className = "" }) {
  const [saved, setSaved] = useState(() => readJson("hed_saved_properties", []).includes(slug));

  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const current = readJson("hed_saved_properties", []);
    const next = current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug];
    localStorage.setItem("hed_saved_properties", JSON.stringify(next));
    setSaved(next.includes(slug));
    window.dispatchEvent(new Event("hed:saved"));
  };

  return (
    <button className={`save-property ${saved ? "saved" : ""} ${className}`} onClick={toggle} aria-label={saved ? "Remove saved property" : "Save property"}>
      <Heart size={17} fill={saved ? "currentColor" : "none"} />
    </button>
  );
}

function AuthCard({ mode }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const existing = readJson("hed_demo_account", null);
  const [form, setForm] = useState({
    name: existing?.name || "",
    email: existing?.email || "",
    phone: existing?.phone || "",
    password: "",
  });
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.email.includes("@") || form.password.length < 4) {
      setError("Enter a valid email and at least 4 characters for the demo password.");
      return;
    }

    if (mode === "signup") {
      localStorage.setItem("hed_demo_account", JSON.stringify({ name: form.name || "HED Client", email: form.email, phone: form.phone }));
    } else {
      const account = existing;
      if (account && account.email.toLowerCase() !== form.email.toLowerCase() && form.email.toLowerCase() !== "demo@hed.co.ug") {
        setError("For this demo, use the account you created or demo@hed.co.ug.");
        return;
      }
      if (!account && form.email.toLowerCase() !== "demo@hed.co.ug") {
        localStorage.setItem("hed_demo_account", JSON.stringify({ name: "HED Client", email: form.email, phone: "" }));
      }
    }
    localStorage.setItem("hed_demo_session", "true");
    navigate("/account");
  };

  return (
    <div className="auth-card">
      <div className="auth-card__brand"><img src={company.logo} alt="" /><span>HED Client Access</span></div>
      <span className="eyebrow">{mode === "login" ? "Welcome back" : "Create demo access"}</span>
      <h1>{mode === "login" ? "Login" : "Create your HED account"}</h1>
      <p>
        {mode === "login"
          ? "Access a front-end demonstration of saved properties and client preferences."
          : "Create a local demo profile to test the future HED customer-account experience."}
      </p>

      <form onSubmit={submit}>
        {mode === "signup" && (
          <div className="auth-grid">
            <label>Full name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" /></label>
            <label>Phone number<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+256..." /></label>
          </div>
        )}
        <label>Email address<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label>
        <label>
          Password
          <div className="auth-password">
            <input required type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="4+ characters for demo" />
            <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label="Toggle password visibility">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
          </div>
        </label>
        {error && <div className="auth-error">{error}</div>}
        <button className="btn btn--dark btn--full" type="submit">{mode === "login" ? "Sign in" : "Create account"} <ArrowRight size={17} /></button>
      </form>

      {mode === "login" && <div className="auth-demo-note"><LockKeyhole size={16} /><span>Demo shortcut: <strong>demo@hed.co.ug</strong> with any 4+ character password.</span></div>}
      <div className="auth-switch">
        {mode === "login" ? <>New to HED? <Link to="/signup">Create demo account</Link></> : <>Already have access? <Link to="/login">Login</Link></>}
      </div>
    </div>
  );
}

export function LoginDemo() {
  return <div className="auth-page"><div className="auth-page__visual"><div><span>Client experience prototype</span><h2>Save opportunities. Return to them. Continue your property journey.</h2><p>A future production account can connect enquiries, site visits, documentation status and customer communication.</p></div></div><AuthCard mode="login" /></div>;
}

export function SignupDemo() {
  return <div className="auth-page"><div className="auth-page__visual auth-page__visual--signup"><div><span>Future HED client portal</span><h2>One place for your property interests.</h2><p>This demonstration shows how HED can evolve from a marketing website into a customer relationship platform.</p></div></div><AuthCard mode="signup" /></div>;
}

export function AccountDashboard() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(() => readJson("hed_saved_properties", []));
  const account = readJson("hed_demo_account", { name: "HED Client", email: "demo@hed.co.ug", phone: "" });
  const session = Boolean(localStorage.getItem("hed_demo_session"));

  useEffect(() => {
    if (!session) navigate("/login");
    const refresh = () => setSaved(readJson("hed_saved_properties", []));
    window.addEventListener("hed:saved", refresh);
    return () => window.removeEventListener("hed:saved", refresh);
  }, [navigate, session]);

  const savedProperties = properties.filter((property) => saved.includes(property.slug));

  const signOut = () => {
    localStorage.removeItem("hed_demo_session");
    navigate("/login");
  };

  return (
    <div className="account-page">
      <div className="account-hero">
        <div>
          <span className="eyebrow">My HED • Demo</span>
          <h1>Welcome, {account.name || "HED Client"}</h1>
          <p>Prototype customer workspace for saved property opportunities, account details and future service tracking.</p>
        </div>
        <button className="btn btn--ghost" onClick={signOut}>Sign out</button>
      </div>

      <div className="account-stats">
        <div><Bookmark size={20} /><strong>{savedProperties.length}</strong><span>Saved opportunities</span></div>
        <div><MessageCircle size={20} /><strong>0</strong><span>Active enquiries</span></div>
        <div><Clock3 size={20} /><strong>0</strong><span>Scheduled inspections</span></div>
        <div><ShieldCheck size={20} /><strong>Demo</strong><span>Client portal stage</span></div>
      </div>

      <section className="account-section">
        <div className="account-section__head"><div><span className="eyebrow">Saved properties</span><h2>Your shortlist</h2></div><Link className="text-link" to="/properties">Browse more <ArrowRight size={16} /></Link></div>
        {savedProperties.length ? (
          <div className="account-saved-grid">
            {savedProperties.map((property) => (
              <Link key={property.slug} to={`/properties/${property.slug}`} className="account-property">
                <div>{property.image ? <img src={property.image} alt="" /> : <Landmark size={30} />}</div>
                <span><small>{property.corridor}</small><strong>{property.title}</strong><em>{property.displayPrice}</em></span>
                <ChevronRight size={18} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="account-empty"><Heart size={29} /><h3>No saved properties yet</h3><p>Use the heart icon on estate cards to build a shortlist.</p><Link className="btn btn--dark" to="/properties">Explore properties</Link></div>
        )}
      </section>

      <section className="account-section account-section--soft">
        <span className="eyebrow">Future production functionality</span>
        <h2>What the real portal can become</h2>
        <div className="account-roadmap">
          {[
            ["Enquiry timeline", "Track conversations, follow-ups and assigned HED consultants."],
            ["Site inspections", "Schedule, confirm and review property inspection appointments."],
            ["Document room", "Securely exchange verification and transaction documents."],
            ["Payment milestones", "Track agreed property-investment or payment milestones."],
          ].map(([title, text]) => <article key={title}><Sparkles size={18} /><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>
    </div>
  );
}
