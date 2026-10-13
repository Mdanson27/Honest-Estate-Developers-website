import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Film, Play } from "lucide-react";
import { useLocation } from "react-router-dom";

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
    title: "HED estate showcase",
    label: "Honest Estate Developers • Estate view",
    folder: "hed-highlights",
    file: "hed-estate-highlight-1.mp4",
    poster: "hed-estate-highlight-1-poster.jpg",
    optional: true,
  },
  {
    title: "HED on-site experience",
    label: "Honest Estate Developers • In the field",
    folder: "hed-highlights",
    file: "hed-estate-highlight-2.mp4",
    poster: "hed-estate-highlight-2-poster.jpg",
    optional: true,
  },
  {
    title: "HED property update",
    label: "Honest Estate Developers • Property update",
    folder: "hed-highlights",
    file: "hed-estate-highlight-3.mp4",
    poster: "hed-estate-highlight-3-poster.jpg",
    optional: true,
  },
  {
    title: "HED property conversation",
    label: "Honest Estate Developers • Property insight",
    folder: "hed-highlights",
    file: "hed-estate-highlight-4.mp4",
    poster: "hed-estate-highlight-4-poster.jpg",
    optional: true,
  },
  {
    title: "HED team on the ground",
    label: "Honest Estate Developers • Field team",
    folder: "hed-highlights",
    file: "hed-estate-highlight-5.mp4",
    poster: "hed-estate-highlight-5-poster.jpg",
    optional: true,
  },
];

function HedVideoCard({ item }) {
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(!item.optional);

  useEffect(() => {
    if (!item.optional) return undefined;
    let active = true;
    const image = new Image();
    image.onload = () => active && setAvailable(true);
    image.onerror = () => active && setAvailable(false);
    image.src = posterUrl(item.poster);
    return () => { active = false; };
  }, [item]);

  if (!available) return null;

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
              : "Explore Honest Estate Developers through estate tours, property visits, field updates and on-ground experiences from the HED team."}
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
  return createPortal(<HedVideoLibrary property={isMpambire} />, target);
}
