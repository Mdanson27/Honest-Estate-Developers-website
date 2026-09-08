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
  insights,
  properties,
  services,
} from "./data";

const money = new Intl.NumberFormat("en-UG", {
  style: "currency",
  currency: "UGX",
  maximumFractionDigits: 0,
});

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            Genuine land, quality homes and trusted property services built around
            transparency, practical guidance and long-term value.
          </p>
          <div className="footer__tagline">{company.tagline}</div>
        </div>

        <div>
          <h4>Explore</h4>
          <Link to="/properties">Properties</Link>
          <Link to="/services">Services</Link>
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
          <a href={`mailto:${company.email}`}>{company.email}</a>
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
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

function PropertySearch({ compact = false }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [district, setDistrict] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (type !== "All") params.set("type", type);
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
            placeholder="Area, estate or property"
          />
        </div>
      </label>
      <label>
        <span>Property type</span>
        <div className="select-wrap">
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>All</option>
            <option>Land</option>
            <option>House</option>
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
      <Link className="property-card__image" to={`/properties/${property.slug}`}>
        <img src={property.image} alt={property.title} />
        <span className="property-card__status">{property.status}</span>
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
          <span>{property.tenure}</span>
        </div>
      </div>
      <Link className="property-card__footer" to={`/properties/${property.slug}`}>
        View property
        <ArrowRight size={17} />
      </Link>
    </article>
  );
}

function HomePage() {
  const featured = properties.filter((p) => p.featured).slice(0, 4);
  const [heroImage] = useState(
    "https://www.honestestatedevelopers.com/images/property/21025318020260608084742pm.jpg"
  );

  return (
    <PageShell>
      <section className="hero">
        <div className="hero__media">
          <img src={heroImage} alt="Honest Estate Developers property landscape" />
        </div>
        <div className="hero__overlay" />
        <div className="shell hero__content">
          <div className="hero__copy">
            <span className="hero__kicker">
              <span className="dot dot--red" />
              Established in Uganda since {company.founded}
            </span>
            <h1>
              Property decisions built on <em>honesty.</em>
            </h1>
            <p>
              Genuine land, quality homes and professional property services for
              buyers, families and investors across Uganda.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--brand" to="/properties">
                Explore properties
                <ArrowRight size={18} />
              </Link>
              <Link className="btn btn--light" to="/contact">
                Book a site visit
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="shell search-lift">
        <PropertySearch />
      </div>

      <section className="trust-strip">
        <div className="shell trust-strip__grid">
          <div>
            <strong>{company.founded}</strong>
            <span>Established</span>
          </div>
          <div>
            <strong>15+</strong>
            <span>Years of market experience</span>
          </div>
          <div>
            <strong>Free</strong>
            <span>Site inspections promoted by HED</span>
          </div>
          <div>
            <strong>Flexible</strong>
            <span>Payment planning</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionIntro
            eyebrow="Selected opportunities"
            title="Featured properties"
            copy="A focused selection of land and homes currently listed by Honest Estate Developers."
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
        </div>
      </section>

      <section className="section section--soft">
        <div className="shell">
          <SectionIntro
            eyebrow="What HED does"
            title="End-to-end property support"
            copy="From finding land to verifying documentation and developing property, HED brings key services together in one relationship."
          />
          <div className="service-grid">
            {services.map((service, index) => {
              const icons = [Hammer, Landmark, TreePine, FileCheck2];
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
            title="Property opportunities across key growth corridors"
            copy="Current listings span Mpigi, Wakiso, Namugongo, Kiwenda, Kasengejje, Gobero, Magogo and the Entebbe corridor."
            dark
          />
          <div className="location-chips">
            {["Mpigi", "Wakiso", "Namugongo", "Kiwenda", "Kasengejje", "Gobero", "Magogo", "Entebbe Sisa"].map(
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
  const max = Number(params.get("max") || 0);

  const filtered = useMemo(() => {
    return properties.filter((property) => {
      const haystack = `${property.title} ${property.location} ${property.description}`.toLowerCase();
      if (q && !haystack.includes(q.toLowerCase())) return false;
      if (type !== "All" && property.type !== type) return false;
      if (district !== "All" && property.district !== district) return false;
      if (max && property.price > max) return false;
      return true;
    });
  }, [q, type, district, max]);

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
        title="Find land and homes with HED"
        copy="Search current HED listings by keyword, type, district and budget."
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
                    <option>House</option>
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
                Maximum price
                <div className="select-wrap select-wrap--light">
                  <select
                    value={max || ""}
                    onChange={(e) => update("max", e.target.value)}
                  >
                    <option value="">Any budget</option>
                    <option value="20000000">UGX 20M</option>
                    <option value="50000000">UGX 50M</option>
                    <option value="100000000">UGX 100M</option>
                    <option value="400000000">UGX 400M</option>
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
                <span>Prices shown in UGX</span>
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
            <img src={property.image} alt={property.title} />
            <span>{property.status}</span>
          </div>
          <div className="property-detail-hero__info">
            <span className="eyebrow">{property.type} • {property.category}</span>
            <h1>{property.title}</h1>
            <div className="property-detail-hero__location">
              <MapPin size={17} />
              {property.location}
            </div>
            <div className="property-detail-hero__price">{property.displayPrice}</div>
            <div className="detail-pills">
              <span>{property.tenure}</span>
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
              <div><span>Tenure</span><strong>{property.tenure}</strong></div>
              <div><span>Status</span><strong>{property.status}</strong></div>
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
  const icons = [Hammer, Landmark, TreePine, FileCheck2];

  return (
    <PageShell>
      <PageHero
        eyebrow="Our services"
        title="Property support from land to development"
        copy="A focused real estate service offering built around acquisition, documentation, surveying and construction."
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
          <div className="process__grid">
            {[
              ["01", "Discover", "Browse current land and home opportunities by area, property type and budget."],
              ["02", "Inspect", "Request a site visit and speak directly with HED about the location and availability."],
              ["03", "Verify", "Confirm property details, documentation and title information before committing."],
              ["04", "Proceed", "Agree payment terms and complete the transaction with clear next steps."],
            ].map(([n, title, text]) => (
              <div key={n}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{text}</p>
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
            <h2>Built around a simple promise: be honest with the customer.</h2>
          </div>
          <div>
            <p>{companyProfile.intro}</p>
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
              <article key={value}>
                <span>0{index + 1}</span>
                <Sparkles size={21} />
                <p>{value}</p>
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
          <div className="reason-grid">
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
              HED's current public contact details are shown below. Confirm any
              meeting or site visit directly with the company.
            </p>

            <div className="contact-info__cards">
              <a href={`tel:${company.phonePrimary.replace(/\s/g, "")}`}>
                <Phone size={20} />
                <span>
                  <small>Phone</small>
                  <strong>{company.phonePrimary}</strong>
                  <strong>{company.phoneSecondary}</strong>
                </span>
              </a>
              <a href={`mailto:${company.email}`}>
                <Mail size={20} />
                <span>
                  <small>Email</small>
                  <strong>{company.email}</strong>
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
                  <option>Land documentation</option>
                  <option>Surveying</option>
                  <option>Construction & development</option>
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
              This prototype opens your default email application. A production
              backend/CRM connection can be added during system integration.
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

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/properties/:slug" element={<PropertyDetailsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}
