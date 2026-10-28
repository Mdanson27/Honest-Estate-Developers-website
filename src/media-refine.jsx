import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Film, MapPin, Play } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const baseUrl = import.meta.env.BASE_URL;

const safeStem = (filename) =>
  filename
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const videoUrl = (folder, filename) =>
  import.meta.env.DEV
    ? `${baseUrl}videos/2026/${folder}/${filename}`
    : `${baseUrl}public/videos/2026/${folder}/${filename}`;

const posterUrl = (filename) =>
  `${baseUrl}media/video-posters/${safeStem(filename)}.webp`;

const HED_VIDEOS = [
  {
    title: "Mpambire estate aerial tour",
    label: "Honest Estate Developers • Mpambire",
    folder: "mpambire",
    file: "mpambire-drone-overview.mp4",
    poster: "mpambire-drone-poster.jpg",
  },
  {
    title: "Mpambire on-site experience",
    label: "Honest Estate Developers • Site visit",
    folder: "mpambire",
    file: "mpambire-site-visit-1.mp4",
    poster: "mpambire-site-visit-1-poster.jpg",
  },
  {
    title: "Mpambire property walkthrough",
    label: "Honest Estate Developers • Site view",
    folder: "mpambire",
    file: "mpambire-site-visit-3.mp4",
    poster: "mpambire-site-visit-3-poster.jpg",
  },
  {
    title: "HED estate aerial overview",
    label: "Honest Estate Developers • Aerial view",
    folder: "hed-highlights",
    file: "hed-property-experience-01-aerial-view.mp4",
    poster: "hed-property-experience-01-aerial-view-poster.jpg",
  },
  {
    title: "HED estate site tour",
    label: "Honest Estate Developers • Property visit",
    folder: "hed-highlights",
    file: "hed-property-experience-02-site-tour.mp4",
    poster: "hed-property-experience-02-site-tour-poster.jpg",
  },
  {
    title: "HED property briefing",
    label: "Honest Estate Developers • Property briefing",
    folder: "hed-highlights",
    file: "hed-property-experience-03-property-briefing.mp4",
    poster: "hed-property-experience-03-property-briefing-poster.jpg",
  },
  {
    title: "HED estate presentation",
    label: "Honest Estate Developers • Estate presentation",
    folder: "hed-highlights",
    file: "hed-property-experience-04-estate-presentation.mp4",
    poster: "hed-property-experience-04-estate-presentation-poster.jpg",
  },
  {
    title: "HED team field visit",
    label: "Honest Estate Developers • On the ground",
    folder: "hed-highlights",
    file: "hed-property-experience-05-field-visit.mp4",
    poster: "hed-property-experience-05-field-visit-poster.jpg",
  },
];

const NEWEST_ESTATES = [
  {
    name: "Wakiso-Mubango",
    location: "Wakiso / Nkoowe corridor",
    price: "UGX 40M & 45M",
    image: null,
    to: "/properties/wakiso-mubango",
  },
  {
    name: "Nakawuka-Jjungo",
    location: "Entebbe Road • Wakiso",
    price: "UGX 35M",
    image: null,
    to: "/properties/nakawuka-jjungo",
  },
  {
    name: "Namayumba-Buwasa",
    location: "Namayumba • Buwasa",
    price: "Contact HED for current plot details",
    image: null,
    to: "/contact",
  },
  {
    name: "Kasanje-Buwaya",
    location: "Kasanje • Buwaya",
    price: "Contact HED for current plot details",
    image: null,
    to: "/contact",
  },
  {
    name: "Gayaza Kiwenda",
    location: "Gayaza • Kiwenda",
    price: "Contact HED for current plot details",
    image: `${baseUrl}media/kiwenda/dji-0503-thumb.webp`,
    to: "/contact",
  },
];

function HedVideoCard({ item }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="hed-video-refined__card">
      <div className="hed-video-refined__media">
        {playing ? (
          <video
            src={videoUrl(item.folder, item.file)}
            poster={posterUrl(item.poster)}
            controls
            autoPlay
            playsInline
            preload="none"
          />
        ) : (
          <button
            type="button"
            className="hed-video-refined__poster"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${item.title}`}
          >
            <img src={posterUrl(item.poster)} alt="" loading="lazy" decoding="async" />
            <span className="hed-video-refined__play"><Play size={22} fill="currentColor" /></span>
          </button>
        )}
      </div>
      <div className="hed-video-refined__copy">
        <span>{item.label}</span>
        <h3>{item.title}</h3>
      </div>
    </article>
  );
}

export function NewestEstates() {
  return (
    <section className="hed-newest-estates">
      <div className="shell">
        <div className="hed-newest-estates__head">
          <div>
            <span className="eyebrow">Newest HED estates</span>
            <h2>New opportunities now being highlighted by Honest Estate Developers</h2>
            <p>
              Explore HED's newest estate opportunities. Verified property photography is displayed where it is currently available, while the HED team can provide the latest plot, pricing and site-visit details for every location.
            </p>
          </div>
          <Link className="hed-newest-estates__all" to="/properties">
            View the full estate portfolio <ArrowRight size={17} />
          </Link>
        </div>
        <div className="hed-newest-estates__rail">
          {NEWEST_ESTATES.map((estate) => (
            <Link className="hed-newest-estate-card" to={estate.to} key={estate.name}>
              <div className="hed-newest-estate-card__media">
                {estate.image ? (
                  <img src={estate.image} alt={`${estate.name} by Honest Estate Developers`} loading="lazy" decoding="async" />
                ) : (
                  <div className="hed-newest-estate-card__placeholder">
                    <span>New HED estate</span>
                    <strong>{estate.name}</strong>
                    <small>Property photography coming soon</small>
                  </div>
                )}
                <span>Newest estate</span>
              </div>
              <div className="hed-newest-estate-card__copy">
                <small><MapPin size={13} /> {estate.location}</small>
                <h3>{estate.name}</h3>
                <strong>{estate.price}</strong>
                <span>{estate.to.startsWith("/properties/") ? "Explore estate" : "Enquire with HED"} <ArrowRight size={15} /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function HedVideoLibrary({ property = false }) {
  const items = property ? HED_VIDEOS.slice(0, 3) : HED_VIDEOS;

  return (
    <section className={`hed-video-refined ${property ? "hed-video-refined--property" : ""}`}>
      <div className="hed-video-refined__head">
        <div>
          <span className="eyebrow">Honest Estate Developers in motion</span>
          <h2>{property ? "Experience Mpambire with HED" : "See Honest Estate Developers on the ground"}</h2>
          <p>
            {property
              ? "Take a closer look at Mpambire through Honest Estate Developers' aerial views and on-site property footage."
              : "Explore HED estate tours, property visits, field briefings and on-ground experiences from the Honest Estate Developers team."}
          </p>
        </div>
        <div className="hed-video-refined__badge"><Film size={18} /> HED video library</div>
      </div>
      <div className="hed-video-refined__grid">
        {items.map((item) => <HedVideoCard key={item.file} item={item} />)}
      </div>
    </section>
  );
}

export default function MediaRefinement() {
  const location = useLocation();
  const [target, setTarget] = useState(null);
  const isHome = location.pathname === "/";
  const isMpambire = location.pathname === "/properties/mpigi-mpambire";

  useEffect(() => {
    let mount = null;
    let attempts = 0;
    let timer = null;

    const install = () => {
      document.getElementById("hed-video-refined-mount")?.remove();
      const host = isHome
        ? document.querySelector(".hed-estate-showcase")
        : isMpambire
          ? document.querySelector(".hed-property-gallery")
          : null;

      if (!host) {
        if (attempts++ < 24) timer = window.setTimeout(install, 80);
        else setTarget(null);
        return;
      }

      mount = document.createElement("div");
      mount.id = "hed-video-refined-mount";
      host.after(mount);
      setTarget(mount);
    };

    timer = window.setTimeout(install, 40);
    return () => {
      window.clearTimeout(timer);
      mount?.remove();
      setTarget(null);
    };
  }, [location.pathname, location.key, isHome, isMpambire]);

  if (!target) return null;
  return createPortal(
    <>
      <HedVideoLibrary property={isMpambire} />
    </>,
    target
  );
}
