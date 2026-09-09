import React from "react";

export function BrandSocialIcon({ network, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    focusable: "false",
  };

  if (network === "facebook") {
    return (
      <svg {...common}>
        <path
          fill="currentColor"
          d="M13.75 22v-8.2h2.76l.41-3.2h-3.17V8.56c0-.93.26-1.56 1.59-1.56H17V4.14c-.29-.04-1.27-.14-2.42-.14-2.4 0-4.04 1.46-4.04 4.15v2.45H7.83v3.2h2.71V22h3.21Z"
        />
      </svg>
    );
  }

  if (network === "linkedin") {
    return (
      <svg {...common}>
        <path
          fill="currentColor"
          d="M6.33 8.15H3.08V21h3.25V8.15ZM4.7 3A1.89 1.89 0 1 0 4.7 6.77 1.89 1.89 0 0 0 4.7 3ZM21 13.64c0-3.87-2.06-5.67-4.81-5.67-2.22 0-3.21 1.22-3.77 2.08v-1.9H9.17V21h3.25v-6.36c0-1.68.32-3.31 2.4-3.31 2.05 0 2.08 1.92 2.08 3.42V21H21v-7.36Z"
        />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path
        fill="currentColor"
        d="M18.9 3H22l-6.77 7.74L23.2 21h-6.24l-4.89-6.39L6.49 21H3.38l7.24-8.28L2.97 3h6.4l4.42 5.84L18.9 3Zm-1.09 16.2h1.72L8.43 4.7H6.58l11.23 14.5Z"
      />
    </svg>
  );
}

export function SocialLinks({ company, className = "", showLabels = false }) {
  const items = [
    ["facebook", company.facebookUrl, "Facebook"],
    ["linkedin", company.linkedinUrl, "LinkedIn"],
    ["x", company.xUrl, "X"],
  ];

  return (
    <div className={`brand-socials ${className}`.trim()}>
      {items.map(([network, href, label]) => (
        <a
          key={network}
          className={`brand-socials__link brand-socials__link--${network}`}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`HED on ${label}`}
          title={label}
        >
          <BrandSocialIcon network={network} size={17} />
          {showLabels && <span>{label}</span>}
        </a>
      ))}
    </div>
  );
}
