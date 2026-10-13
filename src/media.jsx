import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Images, MapPin, Play, Video, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const baseUrl = import.meta.env.BASE_URL;

const safeStem = (filename) =>
  filename
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const photoUrl = (folder, filename, size = "main") =>
  `${baseUrl}media/${folder}/${safeStem(filename)}-${size}.webp`;

const videoUrl = (filename) =>
  import.meta.env.DEV
    ? `${baseUrl}videos/2026/mpambire/${filename}`
    : `${baseUrl}public/videos/2026/mpambire/${filename}`;

const posterUrl = (filename) =>
  `${baseUrl}media/video-posters/${safeStem(filename)}.webp`;

const ESTATES = {
  "kakiri-magogo": {
    name: "Kakiri-Magogo",
    folder: "magogo",
    location: "Hoima Road - Wakiso",
    files: [
      "DJI_0382.jpg",
      "DJI_0383.jpg",
      "DJI_0384.jpg",
      "DJI_0386.jpg",
      "DJI_0388.jpg",
      "DJI_0389.jpg",
      "DJI_0392.jpg",
    ],
  },
  "nampunge-estate": {
    name: "Nampunge Estate",
    folder: "nampunge",
    location: "Hoima Road - Wakiso",
    files: ["DJI_0396.jpg", "DJI_0399.jpg", "DJI_0400.jpg", "DJI_0403.jpg"],
  },
  "mabombwe-estate": {
    name: "Mabombwe Estate",
    folder: "mabombwe",
    location: "Hoima Road - Wakiso",
    files: [
      "DJI_0414.jpg",
      "DJI_0415.jpg",
      "DJI_0417.jpg",
      "DJI_0418.jpg",
      "DJI_0421.jpg",
      "DJI_0425.jpg",
      "DJI_0426.jpg",
      "DJI_0429.jpg",
      "DJI_0432.jpg",
    ],
  },
  "namugongo-sonde": {
    name: "Namugongo-Sonde",
    folder: "ssonde",
    location: "Namugongo Road - Wakiso",
    files: [
      "DJI_0516.jpg",
      "DJI_0517.jpg",
      "DJI_0519.jpg",
      "DJI_0520.jpg",
      "DJI_0525.jpg",
      "DJI_0526.jpg",
      "DJI_0528.jpg",
      "DJI_0530.jpg",
      "DJI_0531.jpg",
      "DJI_0533.jpg",
      "DJI_0534.jpg",
      "DJI_0535.jpg",
      "DJI_0537.jpg",
    ],
  },
  "mpigi-mpambire": {
    name: "Mpigi-Mpambire",
    folder: "mpambire-estate-2026",
    location: "Masaka Road - Mpigi",
    files: [
      "BYC 001.jpg",
      "BYC 002.jpg",
      "BYC 003.jpg",
      "BYC 004.jpg",
      "BYC 005.jpg",
      "BYC 006.jpg",
      "BYC 007.jpg",
      "BYC 008.jpg",
      "BYC 009.jpg",
    ],
    videos: true,
  },
  kiwenda: {
    name: "Kiwenda Estate",
    folder: "kiwenda",
    location: "HED estate media - 2026",
    files: ["DJI_0503.jpg", "DJI_0504.jpg", "DJI_0507.jpg", "DJI_0511.jpg", "DJI_0512.jpg"],
    contactOnly: true,
  },
};

const HOME_ORDER = [
  "mpigi-mpambire",
  "kakiri-magogo",
  "mabombwe-estate",
  "nampunge-estate",
  "namugongo-sonde",
  "kiwenda",
];

const VIDEO_ITEMS = [
  {
    title: "Mpambire drone overview",
    label: "Aerial tour",
    file: "mpambire-drone-overview.mp4",
    poster: "mpambire-drone-poster.jpg",
  },
  {
    title: "Mpambire site visit 1",
    label: "Ground view",
    file: "mpambire-site-visit-1.mp4",
    poster: "mpambire-site-visit-1-poster.jpg",
  },
  {
    title: "Mpambire site visit 3",
    label: "Extended site view",
    file: "mpambire-site-visit-3.mp4",
    poster: "mpambire-site-visit-3-poster.jpg",
  },
];

function VideoCard({ item, featured = false }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className={`hed-video-card ${featured ? "hed-video-card--featured" : ""}`}>
      <div className="hed-video-card__media">
        {playing ? (
          <video
            src={videoUrl(item.file)}
            poster={posterUrl(item.poster)}
            controls
            autoPlay
            playsInline
            preload="metadata"
          />
        ) : (
          <button
            className="hed-video-card__poster"
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${item.title}`}
          >
            <img src={posterUrl(item.poster)} alt="" loading="lazy" decoding="async" />
            <span className="hed-video-card__play"><Play size={22} fill="currentColor" /></span>
            <span className="hed-video-card__hint">HED video</span>
          </button>
        )}
      </div>
      <div className="hed-video-card__copy">
        <span>{item.label}</span>
        <h3>{item.title}</h3>
      </div>
    </article>
  );
}

function EstatePhotoStage({ estate, index, setIndex, compact = false }) {
  const file = estate.files[index];
  const previous = () => setIndex((index - 1 + estate.files.length) % estate.files.length);
  const next = () => setIndex((index + 1) % estate.files.length);

  return (
    <div className={`hed-photo-stage ${compact ? "hed-photo-stage--compact" : ""}`}>
      <img
        key={`${estate.folder}-${file}`}
        src={photoUrl(estate.folder, file, "main")}
        alt={`${estate.name} estate view ${index + 1}`}
        loading="lazy"
        decoding="async"
      />
      <div className="hed-photo-stage__shade" />
      <div className="hed-photo-stage__meta">
        <small>{estate.location}</small>
        <strong>{estate.name}</strong>
        <span>{String(index + 1).padStart(2, "0")} / {String(estate.files.length).padStart(2, "0")}</span>
      </div>
      {estate.files.length > 1 && (
        <div className="hed-photo-stage__nav">
          <button type="button" onClick={previous} aria-label="Previous estate photo"><ChevronLeft size={20} /></button>
          <button type="button" onClick={next} aria-label="Next estate photo"><ChevronRight size={20} /></button>
        </div>
      )}
    </div>
  );
}

function HomeEstateMedia() {
  const [estateKey, setEstateKey] = useState(HOME_ORDER[0]);
  const [index, setIndex] = useState(0);
  const estate = ESTATES[estateKey];

  const selectEstate = (key) => {
    setEstateKey(key);
    setIndex(0);
  };

  return (
    <section className="hed-media-section hed-media-section--home">
      <div className="shell">
        <div className="hed-media-heading">
          <div>
            <span className="eyebrow">Real HED estate media</span>
            <h2>Explore the estates through current photography and video.</h2>
            <p>Explore real Honest Estate Developers locations through current estate photography captured across HED's active property portfolio.</p>
          </div>
          <div className="hed-media-heading__badge"><Images size={18} /> 2026 estate photography</div>
        </div>

        <div className="hed-estate-tabs" role="tablist" aria-label="HED estate media">
          {HOME_ORDER.map((key) => (
            <button
              key={key}
              type="button"
              className={estateKey === key ? "active" : ""}
              onClick={() => selectEstate(key)}
            >
              {ESTATES[key].name}
            </button>
          ))}
        </div>

        <div className="hed-estate-showcase">
          <EstatePhotoStage estate={estate} index={index} setIndex={setIndex} />
          <aside className="hed-estate-showcase__info">
            <span className="eyebrow">Estate gallery</span>
            <h3>{estate.name}</h3>
            <p><MapPin size={16} /> {estate.location}</p>
            <strong>{estate.files.length} verified estate photographs</strong>
            <p className="hed-estate-showcase__note">Honest Estate Developers combines property information, site inspection support and professional guidance to help clients understand each estate before making a decision.</p>
            {estate.contactOnly ? (
              <Link className="btn btn--dark" to="/contact">Ask HED about this estate <ArrowRight size={17} /></Link>
            ) : (
              <Link className="btn btn--dark" to={`/properties/${estateKey}`}>View property gallery <ArrowRight size={17} /></Link>
            )}
          </aside>
        </div>

        <div className="hed-video-experience">
          <div className="hed-video-experience__head">
            <div>
              <span className="eyebrow">Watch the property</span>
              <h2>Mpambire estate video experience</h2>
              <p>See Honest Estate Developers on the ground through estate tours, property visits and current field footage from the HED team.</p>
            </div>
            <div className="hed-video-experience__zero"><Video size={18} /> HED video tours</div>
          </div>
          <div className="hed-video-grid">
            {VIDEO_ITEMS.map((item, itemIndex) => (
              <VideoCard key={item.file} item={item} featured={itemIndex === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PropertyGallery({ slug }) {
  const estate = ESTATES[slug];
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => setIndex(0), [slug]);

  useEffect(() => {
    if (!lightbox) return undefined;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [lightbox]);

  if (!estate) return null;

  return (
    <section className="hed-media-section hed-property-media">
      <div className="shell">
        <div className="hed-media-heading hed-media-heading--property">
          <div>
            <span className="eyebrow">Property media</span>
            <h2>See {estate.name} before your site visit.</h2>
            <p>Browse verified Honest Estate Developers estate photography and get a clearer view of the location before arranging your site inspection.</p>
          </div>
          <div className="hed-media-heading__badge"><Images size={18} /> {estate.files.length} photos</div>
        </div>

        <div className="hed-property-gallery">
          <button className="hed-property-gallery__main" type="button" onClick={() => setLightbox(true)} aria-label="Open large property image">
            <EstatePhotoStage estate={estate} index={index} setIndex={setIndex} compact />
            <span className="hed-property-gallery__expand">View larger</span>
          </button>
          <div className="hed-property-gallery__thumbs" aria-label={`${estate.name} photo thumbnails`}>
            {estate.files.map((file, fileIndex) => (
              <button
                type="button"
                className={fileIndex === index ? "active" : ""}
                key={file}
                onClick={() => setIndex(fileIndex)}
                aria-label={`Show photo ${fileIndex + 1}`}
              >
                <img
                  src={photoUrl(estate.folder, file, "thumb")}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        </div>

        {estate.videos && (
          <div className="hed-property-videos">
            <div className="hed-property-videos__head">
              <span className="eyebrow">Video tours</span>
              <h2>Drone and site footage from Mpambire</h2>
              <p>Watch Honest Estate Developers' Mpambire footage and experience the estate from aerial and on-site perspectives.</p>
            </div>
            <div className="hed-video-grid hed-video-grid--property">
              {VIDEO_ITEMS.map((item, itemIndex) => (
                <VideoCard key={item.file} item={item} featured={itemIndex === 0} />
              ))}
            </div>
          </div>
        )}
      </div>

      {lightbox && (
        <div className="hed-lightbox" role="dialog" aria-modal="true" aria-label={`${estate.name} photo viewer`}>
          <button className="hed-lightbox__close" type="button" onClick={() => setLightbox(false)} aria-label="Close photo viewer"><X size={23} /></button>
          <button className="hed-lightbox__nav hed-lightbox__nav--left" type="button" onClick={() => setIndex((index - 1 + estate.files.length) % estate.files.length)} aria-label="Previous photo"><ChevronLeft size={28} /></button>
          <img src={photoUrl(estate.folder, estate.files[index], "main")} alt={`${estate.name} estate view ${index + 1}`} />
          <button className="hed-lightbox__nav hed-lightbox__nav--right" type="button" onClick={() => setIndex((index + 1) % estate.files.length)} aria-label="Next photo"><ChevronRight size={28} /></button>
          <span className="hed-lightbox__count">{index + 1} / {estate.files.length}</span>
        </div>
      )}
    </section>
  );
}

function upgradeReactOwnedImages(pathname) {
  const assign = (img, slug, size = "thumb") => {
    const estate = ESTATES[slug];
    if (!img || !estate) return;
    const first = estate.files[0];
    img.src = photoUrl(estate.folder, first, size);
    img.srcset = `${photoUrl(estate.folder, first, "thumb")} 520w, ${photoUrl(estate.folder, first, "main")} 1440w`;
    img.sizes = size === "main" ? "100vw" : "(max-width: 700px) 92vw, 33vw";
    img.decoding = "async";
  };

  document.querySelectorAll("a.property-card__image").forEach((anchor) => {
    const href = anchor.getAttribute("href") || "";
    const match = href.match(/\/properties\/([^?#]+)/);
    const slug = match?.[1];
    if (!ESTATES[slug]) return;

    let img = anchor.querySelector("img");
    if (!img) {
      anchor.querySelector(".property-card__placeholder")?.remove();
      img = document.createElement("img");
      img.alt = ESTATES[slug].name;
      img.loading = "lazy";
      anchor.prepend(img);
    }
    assign(img, slug, "thumb");
  });

  const detailSlug = pathname.startsWith("/properties/") ? pathname.split("/").pop() : null;
  if (detailSlug && ESTATES[detailSlug]) {
    const media = document.querySelector(".property-detail-hero__image");
    if (media) {
      let img = media.querySelector("img");
      if (!img) {
        media.querySelector(".property-detail-hero__placeholder")?.remove();
        img = document.createElement("img");
        img.alt = ESTATES[detailSlug].name;
        img.loading = "eager";
        img.fetchPriority = "high";
        media.prepend(img);
      }
      assign(img, detailSlug, "main");
    }
  }

  const heroOrder = ["mpigi-mpambire", "kakiri-magogo", null, "mabombwe-estate", null, "namugongo-sonde"];
  document.querySelectorAll(".hero__media--slides img").forEach((img, index) => {
    const slug = heroOrder[index];
    if (slug) assign(img, slug, "main");
  });

  document.querySelectorAll(".corridor-card").forEach((card) => {
    const label = card.querySelector("h3")?.textContent?.trim();
    const slug = Object.keys(ESTATES).find((key) => ESTATES[key].name === label);
    if (slug) assign(card.querySelector("img"), slug, "main");
  });

  assign(document.querySelector(".split-feature__media img"), "kakiri-magogo", "main");
}

export default function MediaEnhancer() {
  const location = useLocation();
  const [target, setTarget] = useState(null);

  const propertySlug = useMemo(
    () => location.pathname.startsWith("/properties/") ? location.pathname.split("/").pop() : null,
    [location.pathname]
  );

  useEffect(() => {
    let mount = null;
    let timer = null;

    const install = () => {
      document.getElementById("hed-media-enhancer-mount")?.remove();
      upgradeReactOwnedImages(location.pathname);

      const host = location.pathname === "/"
        ? document.querySelector(".corridor-section")
        : propertySlug && ESTATES[propertySlug]
          ? document.querySelector(".property-detail-hero")
          : null;

      if (!host) {
        setTarget(null);
        return;
      }

      mount = document.createElement("div");
      mount.id = "hed-media-enhancer-mount";
      host.after(mount);
      setTarget(mount);
    };

    timer = window.setTimeout(install, 0);

    const root = document.getElementById("root");
    const observer = new MutationObserver(() => upgradeReactOwnedImages(location.pathname));
    if (root) observer.observe(root, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      mount?.remove();
      setTarget(null);
    };
  }, [location.pathname, location.key, propertySlug]);

  if (!target) return null;
  if (location.pathname === "/") return createPortal(<HomeEstateMedia />, target);
  if (propertySlug && ESTATES[propertySlug]) return createPortal(<PropertyGallery slug={propertySlug} />, target);
  return null;
}
