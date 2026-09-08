import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  FileCheck2,
  Hammer,
  Headphones,
  HomeIcon,
  Landmark,
  Mail,
  MapPin,
  Newspaper,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  SquareArrowOutUpRight,
  TreePine,
  X,
} from "lucide-react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  company,
  companyProfile,
  corporateStandards,
  customerJourney,
  insights,
  investmentPrograms,
  partnerships,
  portfolioDisclaimer,
  properties,
  services,
  vision2030,
} from "./data";
import {
  AccountDashboard,
  CorridorShowcase,
  ExclusiveLoader,
  HeroExperience,
  LoginDemo,
  PremiumHeader,
  PropertyWayStrip,
  ReviewsShowcase,
  SavePropertyButton,
  SignupDemo,
} from "./experience";

const money = new Intl.NumberFormat("en-UG", {
  style: "currency",
  currency: "UGX",
  maximumFractionDigits: 0,
});

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    // Route changes should always start at the beginning of the page.
    // Instant positioning avoids mobile browsers restoring a previous mid-page position.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.search]);
  return null;
}

function Brand({ footer = false }) {
  return (
    <Link to="/" className={`brand ${footer ? "brand--footer" : ""}`}>
      <span className="brand__logo-wrap">
        <img src={company.logo} alt="Honest Estate Developers Ltd" className="brand__logo" />
      </span>
      <span className="brand__text">
        <strong>Honest Estate</strong>
        <small>Developers Ltd</small>
      </span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const nav = [
    ["Properties", "/properties"],
    ["Services", "/services"],
    ["Programmes", "/programmes"],
    ["About", "/about"],
    ["Insights", "/insights"],
    ["Contact", "/contact"],
  ];

  return (
    <>
      <div className="utility-bar">
        <div className="shell utility-bar__inner">
          <div className="utility-bar__group">
            <a href={`tel:${company.phonePrimary.replace(/\s/g, "")}`}>
              <Phone size={14} />
              {company.phonePrimary}
            </a>
            <a href={`mailto:${company.email}`} className="desktop-only">
              <Mail size={14} />
              {company.email}
            </a>
          </div>
          <div className="utility-bar__group">
            <span className="desktop-only">
              <Clock3 size={14} />
              {company.hours}
            </span>
            <Link to="/contact">Book a site visit</Link>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="shell site-header__inner">
          <Brand />

          <nav className="desktop-nav" aria-label="Main navigation">
            {nav.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="site-header__actions">
            <a
              className="btn btn--ghost desktop-only"
              href={`https://wa.me/${company.phoneWhatsApp}?text=${encodeURIComponent(
                "Hello Honest Estate Developers, I would like to make a property inquiry."
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
            <Link className="btn btn--dark desktop-only" to="/properties">
              Find property
              <ArrowRight size={17} />
            </Link>
            <button
              className="menu-toggle"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mobile-nav">
            <div className="shell mobile-nav__inner">
              {nav.map(([label, path]) => (
                <NavLink key={path} to={path} onClick={() => setOpen(false)}>
                  {label}
                  <ChevronRight size={18} />
                </NavLink>
              ))}
              <a
                href={`https://wa.me/${company.phoneWhatsApp}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
                <SquareArrowOutUpRight size={17} />
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__accent" />
      <div className="shell footer__grid">
        <div>
          <Brand footer />
          <p className="footer__summary">
            A Ugandan real estate company established in 2007, combining property
            opportunities with professional support across the customer journey.
          </p>
          <div className="footer__tagline">{company.tagline}</div>
        </div>

        <div>
          <h4>Explore</h4>
          <Link to="/properties">Properties</Link>
          <Link to="/services">Services</Link>
          <Link to="/programmes">Investment programmes</Link>
          <Link to="/about">About HED</Link>
          <Link to="/insights">Insights</Link>
        </div>

        <div>
          <h4>Property services</h4>
          {services.map((service) => (
            <Link key={service.id} to="/services">
              {service.title}
            </Link>
          ))}
        </div>

        <div>
          <h4>Get in touch</h4>
          <a href={`tel:${company.phonePrimary.replace(/\s/g, "")}`}>
            {company.phonePrimary}
          </a>
          <a href={`tel:${company.phoneSecondary.replace(/\s/g, "")}`}>
            {company.phoneSecondary}
          </a>
          <a href={`tel:${company.phoneTertiary.replace(/\s/g, "")}`}>
            {company.phoneTertiary}
          </a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href={company.websiteUrl} target="_blank" rel="noreferrer">{company.website}</a>
          <span>{company.address}</span>
        </div>
      </div>
      <div className="shell footer__bottom">
        <span>© {new Date().getFullYear()} Honest Estate Developers Ltd.</span>
        <span>Uganda real estate • Established {company.founded}</span>
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${company.phoneWhatsApp}?text=${encodeURIComponent(
        "Hello HED, I would like help finding a property."
      )}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Honest Estate Developers on WhatsApp"
    >
      <MessageCircle size={22} />
      <span>WhatsApp</span>
    </a>
  );
}

function PageShell({ children }) {
  return (
    <>
      <PremiumHeader />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

function PropertySearch({ compact = false }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [corridor, setCorridor] = useState("All");
  const [district, setDistrict] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (corridor !== "All") params.set("corridor", corridor);
    if (district !== "All") params.set("district", district);
    if (maxPrice) params.set("max", maxPrice);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <form className={`property-search ${compact ? "property-search--compact" : ""}`} onSubmit={submit}>
      {!compact && (
        <div className="property-search__heading">
          <span>Property search</span>
          <small>Land, homes and investment opportunities</small>
        </div>
      )}
      <label>
        <span>Keyword</span>
        <div className="field-with-icon">
          <Search size={17} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Estate, corridor or location"
          />
        </div>
      </label>
      <label>
        <span>Growth corridor</span>
        <div className="select-wrap">
          <select value={corridor} onChange={(e) => setCorridor(e.target.value)}>
            <option>All</option>
            <option>Hoima Road</option>
            <option>Entebbe Road</option>
            <option>Namugongo Road</option>
            <option>Masaka Road</option>
          </select>
          <ChevronDown size={16} />
        </div>
      </label>
      <label>
        <span>District</span>
        <div className="select-wrap">
          <select value={district} onChange={(e) => setDistrict(e.target.value)}>
            <option>All</option>
            <option>Wakiso</option>
            <option>Mpigi</option>
            <option>Kampala</option>
          </select>
          <ChevronDown size={16} />
        </div>
      </label>
      <label>
        <span>Maximum price</span>
        <div className="select-wrap">
          <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
            <option value="">Any budget</option>
            <option value="20000000">Up to UGX 20M</option>
            <option value="50000000">Up to UGX 50M</option>
            <option value="100000000">Up to UGX 100M</option>
            <option value="400000000">Up to UGX 400M</option>
          </select>
          <ChevronDown size={16} />
        </div>
      </label>
      <button className="btn btn--brand property-search__button" type="submit">
        <Search size={18} />
        Search
      </button>
    </form>
  );
}

function SectionIntro({ eyebrow, title, copy, action, dark = false }) {
  return (
    <div className={`section-intro ${dark ? "section-intro--dark" : ""}`}>
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
      {action}
    </div>
  );
}

function PropertyCard({ property }) {
  return (
    <article className="property-card">
      <SavePropertyButton slug={property.slug} className="save-property--card" />
      <Link className="property-card__image" to={`/properties/${property.slug}`}>
        {property.image ? (
          <img src={property.image} alt={property.title} />
        ) : (
          <div className="property-card__placeholder">
            <span>{property.corridor}</span>
            <strong>{property.title}</strong>
          </div>
        )}
        <span className="property-card__status">Estate</span>
        <span className="property-card__type">{property.type}</span>
      </Link>
      <div className="property-card__body">
        <div className="property-card__location">
          <MapPin size={15} />
          {property.location}
        </div>
        <Link to={`/properties/${property.slug}`}>
          <h3>{property.title}</h3>
        </Link>
        <div className="property-card__price">{property.displayPrice}</div>
        <div className="property-card__meta">
          {property.plotSize && <span>{property.plotSize}</span>}
          {property.bedrooms && (
            <span>
              <BedDouble size={16} />
              {property.bedrooms} beds
            </span>
          )}
          {property.bathrooms && (
            <span>
              <Bath size={16} />
              {property.bathrooms} baths
            </span>
          )}
          {property.tenure && <span>{property.tenure}</span>}
          {property.corridor && <span>{property.corridor}</span>}
        </div>
      </div>
      <Link className="property-card__footer" to={`/properties/${property.slug}`}>
        View property
        <ArrowRight size={17} />
      </Link>
    </article>
  );
}

function LatestFromHed() {
  const latestInsight = insights[0];
  const recentWithImages = [...properties]
    .filter((property) => Boolean(property.image))
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  return (
    <section className="section latest-section">
      <div className="shell">
        <SectionIntro
          eyebrow="Newest & latest"
          title="The latest from Honest Estate Developers"
          copy="Recent property opportunities and the newest educational content currently available in the HED website portfolio."
          action={
            <Link className="text-link" to="/insights">
              View all insights <ArrowRight size={17} />
            </Link>
          }
        />

        <div className="latest-layout">
          <article className="latest-feature">
            <div className="latest-feature__label">
              <Newspaper size={16} />
              Latest insight
            </div>
            <span className="latest-feature__date">{latestInsight.date}</span>
            <h3>{latestInsight.title}</h3>
            <p>{latestInsight.excerpt}</p>
            <Link className="btn btn--dark" to="/insights">
              Read latest insight <ArrowRight size={16} />
            </Link>
          </article>

          <div className="latest-properties">
            <div className="latest-properties__heading">
              <span>Recently highlighted opportunities</span>
              <Link to="/properties">View portfolio <ArrowRight size={15} /></Link>
            </div>
            {recentWithImages.map((property, index) => (
              <Link
                key={property.slug}
                to={`/properties/${property.slug}`}
                className="latest-property-row"
              >
                <div className="latest-property-row__image">
                  <img src={property.image} alt={property.title} />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="latest-property-row__copy">
                  <small>{property.corridor}</small>
                  <h3>{property.title}</h3>
                  <p>{property.location}</p>
                </div>
                <strong>{property.displayPrice}</strong>
                <ArrowRight size={18} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsletterSignup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    interest: "Property opportunities",
  });
  const [status, setStatus] = useState("idle");

  const submit = (event) => {
    event.preventDefault();
    if (!form.email.includes("@")) {
      setStatus("error");
      return;
    }

    try {
      const existing = JSON.parse(localStorage.getItem("hed_newsletter_subscribers") || "[]");
      const normalizedEmail = form.email.trim().toLowerCase();
      const alreadySubscribed = existing.some(
        (subscriber) => subscriber.email === normalizedEmail
      );

      if (!alreadySubscribed) {
        existing.unshift({
          ...form,
          email: normalizedEmail,
          subscribedAt: new Date().toISOString(),
        });
        localStorage.setItem(
          "hed_newsletter_subscribers",
          JSON.stringify(existing.slice(0, 50))
        );
      }
      setStatus(alreadySubscribed ? "exists" : "success");
    } catch {
      setStatus("success");
    }
  };

  return (
    <section className="newsletter-section">
      <div className="shell newsletter-shell">
        <div className="newsletter-copy">
          <span className="eyebrow">HED Weekly</span>
          <h2>Property opportunities and useful updates, once a week.</h2>
          <p>
            Subscribe for selected estate opportunities, investment guidance,
            property education and important HED updates.
          </p>
          <div className="newsletter-benefits">
            <span><Check size={14} /> New property opportunities</span>
            <span><Check size={14} /> Investment & ownership guidance</span>
            <span><Check size={14} /> HED news and announcements</span>
          </div>
        </div>

        <form className="newsletter-form" onSubmit={submit}>
          <div className="newsletter-form__top">
            <Mail size={22} />
            <div>
              <small>Weekly newsletter</small>
              <strong>Stay connected to HED</strong>
            </div>
          </div>

          <label>
            Name
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
            />
          </label>

          <label>
            Email address
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => {
                setStatus("idle");
                setForm({ ...form, email: e.target.value });
              }}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Most interested in
            <select
              value={form.interest}
              onChange={(e) => setForm({ ...form, interest: e.target.value })}
            >
              <option>Property opportunities</option>
              <option>Investment programmes</option>
              <option>Diaspora property investment</option>
              <option>Property education & insights</option>
              <option>HED company updates</option>
            </select>
          </label>

          <button className="btn btn--brand btn--full" type="submit">
            Subscribe to HED Weekly <ArrowRight size={17} />
          </button>

          {status === "success" && (
            <div className="newsletter-status newsletter-status--success">
              <Check size={15} />
              You're subscribed to the HED Weekly demo list.
            </div>
          )}
          {status === "exists" && (
            <div className="newsletter-status">
              <Mail size={15} />
              This email is already on the HED Weekly demo list.
            </div>
          )}
          {status === "error" && (
            <div className="newsletter-status newsletter-status--error">
              Please enter a valid email address.
            </div>
          )}

          <small className="newsletter-form__note">
            Prototype subscription: the current demo stores subscriptions on this device.
            Production can connect this form to HED's email platform or CRM.
          </small>
        </form>
      </div>
    </section>
  );
}

function HomePage() {
  const featured = properties.filter((p) => p.featured).slice(0, 4);

  return (
    <PageShell>
      <HeroExperience />

      <div className="shell search-lift">
        <PropertySearch />
      </div>

      <section className="trust-strip">
        <div className="shell trust-strip__grid">
          <div>
            <strong>{company.founded}</strong>
            <span>Established in Uganda</span>
          </div>
          <div>
            <strong>{properties.length}</strong>
            <span>Estates in the current corporate portfolio</span>
          </div>
          <div>
            <strong>{services.length}</strong>
            <span>Integrated property service lines</span>
          </div>
          <div>
            <strong>{investmentPrograms.length}</strong>
            <span>Structured investment & engagement programmes</span>
          </div>
        </div>
      </section>

      <CorridorShowcase />

      <section className="section">
        <div className="shell">
          <SectionIntro
            eyebrow="Current estate portfolio"
            title="Selected HED opportunities"
            copy="A corporate-profile view of selected estates across HED's current growth corridors. Prices and availability should always be reconfirmed before commitment."
            action={
              <Link className="text-link" to="/properties">
                View all properties <ArrowRight size={17} />
              </Link>
            }
          />
          <div className="property-grid">
            {featured.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
          <div className="portfolio-note">
            <ShieldCheck size={17} />
            <span>{portfolioDisclaimer}</span>
          </div>
        </div>
      </section>

      <LatestFromHed />

      <section className="section section--soft">
        <div className="shell">
          <SectionIntro
            eyebrow="What HED does"
            title="End-to-end property support"
            copy="From finding land to verifying documentation and developing property, HED brings key services together in one relationship."
          />
          <div className="service-grid">
            {services.map((service, index) => {
              const icons = [TreePine, Headphones, Hammer, Landmark, FileCheck2, Building2];
              const Icon = icons[index];
              return (
                <article className="service-card" key={service.id}>
                  <div className="service-card__icon">
                    <Icon size={24} />
                  </div>
                  <span>0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <p>{service.short}</p>
                  <Link to="/services">
                    Learn more
                    <ArrowRight size={16} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <PropertyWayStrip />

      <section className="section">
        <div className="shell split-feature">
          <div className="split-feature__media">
            <img
              src="https://www.honestestatedevelopers.com/images/property/119185025120230921022129pm.jpg"
              alt="Land listed by Honest Estate Developers"
            />
            <div className="split-feature__badge">
              <ShieldCheck size={23} />
              <span>
                <strong>Transparency first</strong>
                Full disclosure for informed decisions
              </span>
            </div>
          </div>
          <div className="split-feature__copy">
            <span className="eyebrow">Why Honest Estate Developers</span>
            <h2>A name built around the way property should be done.</h2>
            <p>
              HED positions transparency, favourable payment terms, affordable
              opportunities and responsive customer support as central reasons to
              work with the company.
            </p>
            <div className="feature-list">
              {companyProfile.reasons.slice(0, 4).map((item) => (
                <div key={item.title}>
                  <span className="feature-list__check">
                    <Check size={16} />
                  </span>
                  <span>
                    <strong>{item.title}</strong>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
            <Link className="btn btn--dark" to="/about">
              Discover HED
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="location-band">
        <div className="shell">
          <SectionIntro
            eyebrow="Where we are active"
            title="A portfolio organised around Uganda's growth corridors"
            copy="HED's corporate profile currently groups its marketed estate portfolio across Hoima Road, Entebbe Road, Namugongo Road and Masaka Road."
            dark
          />
          <div className="location-chips">
            {["Hoima Road", "Entebbe Road", "Namugongo Road", "Masaka Road"].map(
              (location) => (
                <Link key={location} to={`/properties?q=${encodeURIComponent(location)}`}>
                  <MapPin size={16} />
                  {location}
                  <ArrowRight size={15} />
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="shell">
          <SectionIntro
            eyebrow="Structured ownership pathways"
            title="Investment programmes designed around real customer needs"
            copy="HED's corporate profile outlines programmes for individual buyers, SACCOs and Ugandans in the diaspora."
            action={
              <Link className="text-link" to="/programmes">
                Explore programmes <ArrowRight size={17} />
              </Link>
            }
          />
          <div className="programmes-preview">
            {investmentPrograms.map((program) => (
              <article key={program.id}>
                <span>{program.acronym}</span>
                <h3>{program.name}</h3>
                <small>{program.audience}</small>
                <p>{program.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionIntro
            eyebrow="Property intelligence"
            title="Useful insights for better decisions"
            copy="Straightforward educational content for buyers and investors."
            action={
              <Link className="text-link" to="/insights">
                View insights <ArrowRight size={17} />
              </Link>
            }
          />
          <div className="insight-grid">
            {insights.map((item) => (
              <article className="insight-card" key={item.id}>
                <div className="insight-card__top">
                  <span>Insight</span>
                  <time>{item.date}</time>
                </div>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <Link to="/insights">
                  Read insight
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSignup />

      <ReviewsShowcase />

      <LeadCta />
    </PageShell>
  );
}

function LeadCta() {
  return (
    <section className="lead-cta">
      <div className="shell lead-cta__inner">
        <div>
          <span className="eyebrow">Ready to explore?</span>
          <h2>Tell us what you are looking for.</h2>
          <p>
            Speak with HED about available land, homes, payment options or a site
            inspection.
          </p>
        </div>
        <div className="lead-cta__actions">
          <a
            className="btn btn--brand"
            href={`https://wa.me/${company.phoneWhatsApp}?text=${encodeURIComponent(
              "Hello HED, I would like to discuss available properties."
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} />
            Start on WhatsApp
          </a>
          <Link className="btn btn--outline-light" to="/contact">
            Contact HED
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function PageHero({ eyebrow, title, copy, children }) {
  return (
    <section className="page-hero">
      <div className="page-hero__stripe" />
      <div className="shell page-hero__inner">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          {copy && <p>{copy}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function PropertiesPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const type = params.get("type") || "All";
  const district = params.get("district") || "All";
  const corridor = params.get("corridor") || "All";
  const min = Number(params.get("min") || 0);
  const max = Number(params.get("max") || 0);
  const sort = params.get("sort") || "featured";

  const filtered = useMemo(() => {
    const results = properties.filter((property) => {
      const haystack = `${property.title} ${property.location} ${property.corridor || ""} ${property.description}`.toLowerCase();
      if (q && !haystack.includes(q.toLowerCase())) return false;
      if (type !== "All" && property.type !== type) return false;
      if (district !== "All" && property.district !== district) return false;
      if (corridor !== "All" && property.corridor !== corridor) return false;
      if (min && property.price < min) return false;
      if (max && property.price > max) return false;
      return true;
    });
    if (sort === "price-asc") return [...results].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...results].sort((a, b) => b.price - a.price);
    if (sort === "name") return [...results].sort((a, b) => a.title.localeCompare(b.title));
    return [...results].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [q, type, district, corridor, min, max, sort]);

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === "All") next.delete(key);
    else next.set(key, value);
    setParams(next);
  };

  const clear = () => setParams({});

  return (
    <PageShell>
      <PageHero
        eyebrow="Property catalogue"
        title="Search HED estate opportunities"
        copy="Filter the current corporate portfolio by location, corridor and budget, then sort the results to match your priorities."
      />

      <section className="section section--properties">
        <div className="shell">
          <div className="catalogue">
            <aside className="filter-panel">
              <div className="filter-panel__heading">
                <div>
                  <span>Filters</span>
                  <strong>Refine results</strong>
                </div>
                <button onClick={clear}>Clear</button>
              </div>

              <label>
                Keyword
                <div className="field-with-icon field-with-icon--light">
                  <Search size={16} />
                  <input
                    value={q}
                    onChange={(e) => update("q", e.target.value)}
                    placeholder="Search an area"
                  />
                </div>
              </label>

              <label>
                Type
                <div className="select-wrap select-wrap--light">
                  <select value={type} onChange={(e) => update("type", e.target.value)}>
                    <option>All</option>
                    <option>Land</option>
                  </select>
                  <ChevronDown size={16} />
                </div>
              </label>

              <label>
                District
                <div className="select-wrap select-wrap--light">
                  <select
                    value={district}
                    onChange={(e) => update("district", e.target.value)}
                  >
                    <option>All</option>
                    <option>Wakiso</option>
                    <option>Mpigi</option>
                    <option>Kampala</option>
                  </select>
                  <ChevronDown size={16} />
                </div>
              </label>

              <label>
                Growth corridor
                <div className="select-wrap select-wrap--light">
                  <select value={corridor} onChange={(e) => update("corridor", e.target.value)}>
                    <option>All</option>
                    <option>Hoima Road</option>
                    <option>Entebbe Road</option>
                    <option>Namugongo Road</option>
                    <option>Masaka Road</option>
                  </select>
                  <ChevronDown size={16} />
                </div>
              </label>

              <label>
                Minimum price
                <div className="select-wrap select-wrap--light">
                  <select value={min || ""} onChange={(e) => update("min", e.target.value)}>
                    <option value="">No minimum</option>
                    <option value="14000000">UGX 14M</option>
                    <option value="20000000">UGX 20M</option>
                    <option value="30000000">UGX 30M</option>
                    <option value="40000000">UGX 40M</option>
                  </select>
                  <ChevronDown size={16} />
                </div>
              </label>

              <label>
                Maximum price
                <div className="select-wrap select-wrap--light">
                  <select
                    value={max || ""}
                    onChange={(e) => update("max", e.target.value)}
                  >
                    <option value="">Any budget</option>
                    <option value="20000000">UGX 20M</option>
                    <option value="35000000">UGX 35M</option>
                    <option value="50000000">UGX 50M</option>
                    <option value="70000000">UGX 70M</option>
                  </select>
                  <ChevronDown size={16} />
                </div>
              </label>

              <label>
                Sort results
                <div className="select-wrap select-wrap--light">
                  <select value={sort} onChange={(e) => update("sort", e.target.value)}>
                    <option value="featured">Featured first</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                    <option value="name">Estate name</option>
                  </select>
                  <ChevronDown size={16} />
                </div>
              </label>

              <div className="filter-panel__help">
                <Headphones size={20} />
                <div>
                  <strong>Need help choosing?</strong>
                  <span>Speak with HED about the right location and budget.</span>
                </div>
              </div>
            </aside>

            <div className="catalogue__results">
              <div className="results-head">
                <div>
                  <strong>{filtered.length}</strong>
                  <span>{filtered.length === 1 ? "property" : "properties"} found</span>
                </div>
                <span>Corporate-profile pricing • reconfirm with HED</span>
              </div>
              {filtered.length ? (
                <div className="property-grid property-grid--catalogue">
                  {filtered.map((property) => (
                    <PropertyCard key={property.slug} property={property} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <Search size={28} />
                  <h3>No matching properties</h3>
                  <p>Try a broader location, type or budget.</p>
                  <button className="btn btn--dark" onClick={clear}>
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <LeadCta />
    </PageShell>
  );
}

function PropertyDetailsPage() {
  const { slug } = useParams();
  const property = properties.find((item) => item.slug === slug);

  if (!property) {
    return (
      <PageShell>
        <PageHero eyebrow="Property" title="Property not found" />
        <section className="section">
          <div className="shell">
            <Link className="btn btn--dark" to="/properties">
              Back to properties
            </Link>
          </div>
        </section>
      </PageShell>
    );
  }

  const message = encodeURIComponent(
    `Hello HED, I am interested in ${property.title} listed at ${property.displayPrice}. I would like more information / a site visit.`
  );

  return (
    <PageShell>
      <section className="property-detail-hero">
        <div className="shell property-detail-hero__crumbs">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/properties">Properties</Link>
          <ChevronRight size={14} />
          <span>{property.title}</span>
        </div>
        <div className="shell property-detail-hero__grid">
          <div className="property-detail-hero__image">
            {property.image ? (
              <img src={property.image} alt={property.title} />
            ) : (
              <div className="property-detail-hero__placeholder">
                <span>{property.corridor}</span>
                <strong>{property.title}</strong>
              </div>
            )}
            <span>Estate portfolio</span>
          </div>
          <div className="property-detail-hero__info">
            <div className="property-detail-actions-row">
              <span className="eyebrow">{property.type} • {property.category}</span>
              <SavePropertyButton slug={property.slug} className="save-property--detail" />
            </div>
            <h1>{property.title}</h1>
            <div className="property-detail-hero__location">
              <MapPin size={17} />
              {property.location}
            </div>
            <div className="property-detail-hero__price">{property.displayPrice}</div>
            <div className="detail-pills">
              {property.tenure && <span>{property.tenure}</span>}
              {property.corridor && <span>{property.corridor}</span>}
              {property.plotSize && <span>{property.plotSize}</span>}
              {property.bedrooms && <span>{property.bedrooms} bedrooms</span>}
              {property.bathrooms && <span>{property.bathrooms} bathrooms</span>}
            </div>
            <div className="property-detail-hero__actions">
              <a
                className="btn btn--brand"
                href={`https://wa.me/${company.phoneWhatsApp}?text=${message}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} />
                Make an inquiry
              </a>
              <a className="btn btn--dark" href={`tel:${company.phonePrimary.replace(/\s/g, "")}`}>
                <Phone size={18} />
                Call HED
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell property-detail-layout">
          <article className="property-copy">
            <span className="eyebrow">Property overview</span>
            <h2>About this opportunity</h2>
            <p>{property.description}</p>

            <h3>Key highlights</h3>
            <div className="highlight-grid">
              {property.highlights.map((highlight) => (
                <div key={highlight}>
                  <Check size={16} />
                  {highlight}
                </div>
              ))}
            </div>

            <div className="spec-table">
              <div><span>Property type</span><strong>{property.type}</strong></div>
              <div><span>Category</span><strong>{property.category}</strong></div>
              <div><span>Growth corridor</span><strong>{property.corridor}</strong></div>
              <div><span>Status</span><strong>Corporate portfolio</strong></div>
            </div>
          </article>

          <aside className="inquiry-card">
            <span className="eyebrow">Site inspection</span>
            <h3>See this property in person</h3>
            <p>
              Contact HED to confirm current availability, payment terms and a suitable
              inspection time.
            </p>
            <a
              className="btn btn--brand btn--full"
              href={`https://wa.me/${company.phoneWhatsApp}?text=${message}`}
              target="_blank"
              rel="noreferrer"
            >
              Request site visit
              <ArrowRight size={17} />
            </a>
            <div className="inquiry-card__contact">
              <a href={`tel:${company.phonePrimary.replace(/\s/g, "")}`}>
                <Phone size={16} />
                {company.phonePrimary}
              </a>
              <a href={`mailto:${company.email}`}>
                <Mail size={16} />
                {company.email}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

function ServicesPage() {
  const icons = [TreePine, Headphones, Hammer, Landmark, FileCheck2, Building2];

  return (
    <PageShell>
      <PageHero
        eyebrow="Our services"
        title="Property support from land to development"
        copy="Six connected service lines designed to support customers from property identification and advisory through documentation, development and ongoing property management."
      />

      <section className="section">
        <div className="shell service-detail-list">
          {services.map((service, index) => {
            const Icon = icons[index];
            return (
              <article key={service.id} className="service-detail">
                <div className="service-detail__index">0{index + 1}</div>
                <div className="service-detail__icon">
                  <Icon size={28} />
                </div>
                <div>
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                </div>
                <Link to="/contact">
                  Enquire
                  <ArrowRight size={17} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section section--soft">
        <div className="shell process">
          <SectionIntro
            eyebrow="A simpler property journey"
            title="From interest to informed ownership"
            copy="The redesigned site turns HED's current services into a clear customer journey."
          />
          <div className="process__grid process__grid--six">
            {customerJourney.map((item) => (
              <div key={item.step}>
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <LeadCta />
    </PageShell>
  );
}

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Honest Estate Developers"
        title="Real estate guided by trust, value and long-term relationships"
        copy={companyProfile.intro}
      >
        <div className="page-hero__stat">
          <span>Established</span>
          <strong>{company.founded}</strong>
        </div>
      </PageHero>

      <section className="section">
        <div className="shell about-story">
          <div>
            <span className="eyebrow">Who we are</span>
            <h2>Growing from a traditional real estate business into an integrated property company.</h2>
          </div>
          <div>
            <p>{companyProfile.story}</p>
            <p className="about-story__history">{companyProfile.officeHistory}</p>
            <blockquote>
              “{companyProfile.vision}”
              <span>HED Vision</span>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="shell">
          <SectionIntro
            eyebrow="What guides HED"
            title="Goals and values"
            copy="The company's current profile emphasizes service leadership, regional growth, reputation, innovation and ethical conduct."
            dark
          />
          <div className="values-grid">
            {companyProfile.values.map((value, index) => (
              <article key={value.title}>
                <span>0{index + 1}</span>
                <Sparkles size={21} />
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell corporate-direction">
          <SectionIntro
            eyebrow="Vision, mission & purpose"
            title="A clear corporate direction"
            copy={companyProfile.strategicDirection}
          />
          <div className="direction-grid">
            <article><span>Vision</span><p>{companyProfile.vision}</p></article>
            <article><span>Mission</span><p>{companyProfile.mission}</p></article>
            <article><span>Purpose</span><p>{companyProfile.purpose}</p></article>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="shell">
          <SectionIntro
            eyebrow="HED Vision 2030"
            title="Building a more professional and scalable real estate platform"
            copy={companyProfile.longTermAmbition}
          />
          <div className="vision-grid">
            {vision2030.map((pillar, index) => (
              <article key={pillar.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionIntro eyebrow="Primary goals" title="Where the company intends to go" />
          <div className="goal-list">
            {companyProfile.goals.map((goal, index) => (
              <div key={goal}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{goal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="shell">
          <SectionIntro eyebrow="Why work with HED" title="Practical reasons customers can understand" />
          <div className="reason-grid reason-grid--seven">
            {companyProfile.reasons.map((reason) => (
              <article key={reason.title}>
                <ShieldCheck size={21} />
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionIntro
            eyebrow="Institutional engagement"
            title="Partnerships that can expand access to property"
            copy="HED's growth strategy includes collaboration with institutions whose networks and capabilities can strengthen customer outcomes."
          />
          <div className="partnership-grid">
            {partnerships.map((item) => (
              <article key={item.title}>
                <HandshakeMark />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <p className="partnership-philosophy">
            HED seeks partnerships that create measurable value for customers, institutions and the wider property ecosystem while maintaining transparency, professional conduct and clear responsibilities.
          </p>
        </div>
      </section>

      <section className="section section--dark">
        <div className="shell">
          <SectionIntro
            eyebrow="Professional standards"
            title="How HED intends to communicate and serve"
            copy="The corporate profile sets a clear standard for information, documentation, branding, responsiveness and transparency."
            dark
          />
          <div className="standards-grid">
            {corporateStandards.map((standard, index) => (
              <div key={standard}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{standard}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <LeadCta />
    </PageShell>
  );
}

function HandshakeMark() {
  return (
    <div className="partnership-mark" aria-hidden="true">
      <ShieldCheck size={20} />
    </div>
  );
}

function ProgrammesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Investment & customer engagement"
        title="Structured pathways toward property ownership"
        copy="HED's corporate profile outlines programmes for individuals, SACCO members and Ugandans in the diaspora, supported by education, property opportunities and guided customer engagement."
      />

      <section className="section">
        <div className="shell programmes-page">
          {investmentPrograms.map((program, index) => (
            <article className="programme-feature" key={program.id}>
              <div className="programme-feature__label">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{program.acronym}</strong>
              </div>
              <div>
                <small>{program.audience}</small>
                <h2>{program.name}</h2>
                <p>{program.description}</p>
                <Link className="text-link" to="/contact">
                  Discuss this programme <ArrowRight size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--soft">
        <div className="shell">
          <SectionIntro
            eyebrow="Diaspora engagement"
            title="Property access that can work across borders"
            copy="HED's diaspora focus is intended to make investment more accessible through structured information, remote engagement, site-inspection support, documentation guidance and investment programmes."
          />
          <div className="diaspora-callout">
            <div>
              <span>HED engagement message</span>
              <h3>Visit Uganda. Experience Uganda. Invest in Uganda.</h3>
            </div>
            <Link className="btn btn--dark" to="/contact">
              Contact HED <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <LeadCta />
    </PageShell>
  );
}

function InsightsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Insights"
        title="Property knowledge for buyers and investors"
        copy="Educational content from HED's current website, presented in a cleaner format."
      />

      <section className="section">
        <div className="shell insights-page">
          {insights.map((item, index) => (
            <article className="insight-feature" key={item.id}>
              <div className="insight-feature__visual">
                <span>0{index + 1}</span>
                {index === 0 ? <HomeIcon size={42} /> : <Landmark size={42} />}
              </div>
              <div>
                <div className="insight-feature__meta">
                  <span>Property insight</span>
                  <time>{item.date}</time>
                </div>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
                <Link className="text-link" to="/contact">
                  Discuss your investment goals
                  <ArrowRight size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <LeadCta />
    </PageShell>
  );
}

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Property inquiry",
    message: "",
  });

  const submit = (e) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`
    );
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      form.subject
    )}&body=${body}`;
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Contact HED"
        title="Start a conversation about your next property move"
        copy="Ask about listings, payment terms, site inspections, documentation, surveying or construction."
      />

      <section className="section">
        <div className="shell contact-layout">
          <div className="contact-info">
            <span className="eyebrow">Get in touch</span>
            <h2>Speak directly with Honest Estate Developers</h2>
            <p>
              Use the corporate contact details below for property enquiries,
              partnership discussions, site inspections and professional services.
            </p>

            <div className="contact-info__cards">
              <a href={`tel:${company.phonePrimary.replace(/\s/g, "")}`}>
                <Phone size={20} />
                <span>
                  <small>Phone</small>
                  <strong>{company.phonePrimary}</strong>
                  <strong>{company.phoneSecondary}</strong>
                  <strong>{company.phoneTertiary}</strong>
                </span>
              </a>
              <a href={`mailto:${company.email}`}>
                <Mail size={20} />
                <span>
                  <small>Email</small>
                  <strong>{company.email}</strong>
                </span>
              </a>
              <a href={company.websiteUrl} target="_blank" rel="noreferrer">
                <SquareArrowOutUpRight size={20} />
                <span>
                  <small>Corporate website</small>
                  <strong>{company.website}</strong>
                </span>
              </a>
              <div>
                <MapPin size={20} />
                <span>
                  <small>Office</small>
                  <strong>{company.address}</strong>
                </span>
              </div>
              <div>
                <Clock3 size={20} />
                <span>
                  <small>Office hours</small>
                  <strong>{company.hours}</strong>
                </span>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={submit}>
            <div className="contact-form__head">
              <span>Send an inquiry</span>
              <strong>How can HED help?</strong>
            </div>
            <div className="form-grid">
              <label>
                Full name
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                />
              </label>
              <label>
                Phone number
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+256..."
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                />
              </label>
              <label>
                Subject
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                >
                  <option>Property inquiry</option>
                  <option>Site inspection</option>
                  <option>Investment programme</option>
                  <option>Real estate consulting</option>
                  <option>Land documentation</option>
                  <option>Surveying</option>
                  <option>Construction & development</option>
                  <option>Property management & maintenance</option>
                  <option>Institutional partnership</option>
                </select>
              </label>
            </div>
            <label>
              Message
              <textarea
                required
                rows="6"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell HED what you are looking for..."
              />
            </label>
            <button className="btn btn--brand" type="submit">
              Send inquiry
              <ArrowRight size={17} />
            </button>
            <small>
              Your enquiry is prepared for HED's corporate email address so the company can respond directly.
            </small>
          </form>
        </div>
      </section>

      <section className="contact-band">
        <div className="shell contact-band__inner">
          <div>
            <Building2 size={23} />
            <span>
              <small>Honest Estate Developers Ltd</small>
              <strong>Kampala, Uganda</strong>
            </span>
          </div>
          <a
            href={`https://wa.me/${company.phoneWhatsApp}`}
            target="_blank"
            rel="noreferrer"
          >
            Open WhatsApp
            <SquareArrowOutUpRight size={17} />
          </a>
        </div>
      </section>
    </PageShell>
  );
}

function LoginPage() {
  return <PageShell><LoginDemo /></PageShell>;
}

function SignupPage() {
  return <PageShell><SignupDemo /></PageShell>;
}

function AccountPage() {
  return <PageShell><AccountDashboard /></PageShell>;
}

export default function App() {
  return (
    <>
      <ExclusiveLoader />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/properties/:slug" element={<PropertyDetailsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/programmes" element={<ProgrammesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}
