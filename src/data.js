const baseUrl = import.meta.env.BASE_URL;

export const company = {
  name: "Honest Estate Developers Ltd",
  shortName: "HED",
  brandPromise: "Honesty | Integrity | Excellence",
  tagline: "Honesty | Integrity | Excellence",
  founded: 2007,
  coreMarket: "Uganda real estate and property market",
  website: "www.hed.co.ug",
  websiteUrl: "https://www.hed.co.ug",
  facebook: "www.facebook.com/honestestates",
  facebookUrl: "https://www.facebook.com/honestestates",
  linkedinUrl: "https://www.linkedin.com/in/honest-estate-developers-746946273/",
  xUrl: "https://x.com/estate_honest",
  email: "hedevelopers20@gmail.com",
  phonePrimary: "+256 750 791591",
  phoneSecondary: "+256 772 572873",
  phoneTertiary: "+256 772 597401",
  additionalPhones: ["+256 701 572873", "0744463708"],
  phoneWhatsApp: "256701572873",
  hours: "Mon - Sat: 8:00am - 6:00pm",
  address:
    "Martin Road, Mankeshwar Building, near Aga Khan Roundabout, Kampala, Uganda",
  logo: `${baseUrl}HED%20OFFICIAL%20LOGO.png`,
};

export const services = [
  {
    id: "land-sales",
    title: "Land Sales & Marketing",
    short:
      "Well-located land opportunities for residential, commercial and investment purposes.",
    description:
      "Well-located land opportunities for residential, commercial and investment purposes, supported by customer engagement and site-inspection processes.",
  },
  {
    id: "consulting",
    title: "Real Estate Consulting",
    short:
      "Property guidance and advisory support for better-informed real estate decisions.",
    description:
      "Property guidance and advisory support to help customers evaluate land and real estate opportunities.",
  },
  {
    id: "construction",
    title: "Construction & Development",
    short:
      "Construction and development support from foundational works through finishing.",
    description:
      "Construction and development support, from foundational works through finishing, aligned to client and project requirements.",
  },
  {
    id: "surveying",
    title: "Surveying",
    short:
      "Land mapping, measurement and boundary-related surveying services.",
    description:
      "Land mapping, measurement and boundary-related surveying services.",
  },
  {
    id: "documentation",
    title: "Land Documentation & Title Processing",
    short:
      "Support with title verification, transfer and related documentation processes.",
    description:
      "Support through land documentation, title verification, transfer and related processes.",
  },
  {
    id: "property-management",
    title: "Property Management & Maintenance",
    short:
      "Property management and maintenance designed to support real estate performance.",
    description:
      "Property-related management and maintenance duties designed to support the upkeep and performance of real estate facilities.",
  },
];

const estate = (
  id,
  slug,
  title,
  corridor,
  location,
  district,
  price,
  displayPrice,
  description,
  image = null,
  featured = false
) => ({
  id,
  slug,
  title,
  corridor,
  location,
  district,
  price,
  displayPrice,
  type: "Land",
  category: "Residential / Investment",
  tenure: null,
  status: "Portfolio",
  plotSize: null,
  bedrooms: null,
  bathrooms: null,
  image,
  description,
  highlights: [corridor, "HED estate portfolio", "Pricing subject to confirmation"],
  featured,
});

export const properties = [
  estate(
    1,
    "gobero-estate",
    "Gobero Estate",
    "Hoima Road",
    "Gobero, Wakiso",
    "Wakiso",
    14000000,
    "UGX 14M",
    "Affordable land investment opportunity within HED's wider estate portfolio.",
    "https://www.honestestatedevelopers.com/images/property/199881115320230927122302pm.jpg",
    true
  ),
  estate(
    2,
    "kakiri-magogo",
    "Kakiri–Magogo",
    "Hoima Road",
    "Kakiri–Magogo, Wakiso",
    "Wakiso",
    14000000,
    "UGX 14M / 16M / 18M",
    "Affordable residential plots with access to infrastructure and nearby development.",
    "https://honestestatedevelopers.com/images/property/119185025120230921022129pm.jpg",
    true
  ),
  estate(
    3,
    "kakiri-mwera-estate",
    "Kakiri–Mwera Estate",
    "Hoima Road",
    "Kakiri–Mwera, Wakiso",
    "Wakiso",
    16000000,
    "UGX 16M",
    "Listed in HED's current corporate estate portfolio along the Hoima Road growth corridor."
  ),
  estate(
    4,
    "nampunge-estate",
    "Nampunge Estate",
    "Hoima Road",
    "Nampunge",
    "Wakiso",
    25000000,
    "UGX 25M",
    "Listed in HED's current corporate estate portfolio along the Hoima Road growth corridor."
  ),
  estate(
    5,
    "mabombwe-estate",
    "Mabombwe Estate",
    "Hoima Road",
    "Namusera–Mabombwe, Wakiso",
    "Wakiso",
    30000000,
    "UGX 30M",
    "Residential and investment land within a growing suburban corridor.",
    "https://www.honestestatedevelopers.com/images/property/145657377020230922023441pm.jpg",
    true
  ),
  estate(
    6,
    "kkona-namasanga",
    "Kkona–Namasanga",
    "Hoima Road",
    "Kkona–Namasanga",
    "Wakiso",
    40000000,
    "UGX 40M",
    "Listed in HED's current corporate estate portfolio along the Hoima Road growth corridor."
  ),
  estate(
    7,
    "wakiso-mubango",
    "Wakiso–Mubango",
    "Hoima Road",
    "Wakiso Town / Nkoowe corridor",
    "Wakiso",
    40000000,
    "UGX 40M & 45M",
    "Residential land opportunity close to tarmac and major services."
  ),
  estate(
    8,
    "kawuku-zziru",
    "Kawuku–Zziru",
    "Entebbe Road",
    "Kawuku–Zziru, Entebbe Road corridor",
    "Wakiso",
    60000000,
    "UGX 60M",
    "Land opportunity serving residential and investment demand."
  ),
  estate(
    9,
    "sisa-lutaba",
    "Sisa–Lutaba",
    "Entebbe Road",
    "Sisa–Lutaba, Entebbe Road corridor",
    "Wakiso",
    70000000,
    "UGX 70M",
    "Listed in HED's current corporate estate portfolio along the Entebbe Road growth corridor.",
    "https://www.honestestatedevelopers.com/images/property/150364507020231006041201pm.jpg",
    true
  ),
  estate(
    10,
    "nakawuka",
    "Nakawuka",
    "Entebbe Road",
    "Nakawuka, Entebbe Road corridor",
    "Wakiso",
    35000000,
    "UGX 35M",
    "Listed in HED's current corporate estate portfolio along the Entebbe Road growth corridor."
  ),
  estate(
    11,
    "nakawuka-jjungo",
    "Nakawuka–Jjungo",
    "Entebbe Road",
    "Nakawuka–Jjungo, Entebbe Road corridor",
    "Wakiso",
    35000000,
    "UGX 35M",
    "Listed in HED's current corporate estate portfolio along the Entebbe Road growth corridor."
  ),
  estate(
    12,
    "kasanje-lake-view",
    "Kasanje Lake View",
    "Entebbe Road",
    "Kasanje, Entebbe Road corridor",
    "Wakiso",
    50000000,
    "UGX 50M",
    "Listed in HED's current corporate estate portfolio as Kasanje Lake View."
  ),
  estate(
    13,
    "namugongo-sonde",
    "Namugongo–Sonde",
    "Namugongo Road",
    "Namugongo–Sonde, Wakiso",
    "Wakiso",
    70000000,
    "UGX 70M",
    "Listed in HED's current corporate estate portfolio along the Namugongo Road corridor.",
    "https://www.honestestatedevelopers.com/images/property/166002707620230926041943pm.jpg"
  ),
  estate(
    14,
    "mpigi-mpambire",
    "Mpigi–Mpambire",
    "Masaka Road",
    "Mpigi–Mpambire, Masaka Road corridor",
    "Mpigi",
    32000000,
    "UGX 32M / 35M",
    "Residential and investment plots positioned within the wider Masaka Road growth corridor.",
    "https://www.honestestatedevelopers.com/images/property/21025318020260608084742pm.jpg",
    true
  ),
];

export const portfolioDisclaimer =
  "Property availability, pricing, infrastructure status and title position can change by project and should be confirmed with HED before publication or customer commitment.";

export const insights = [
  {
    id: 2,
    slug: "land-vs-house",
    title: "Land vs House: Which Is the Better Investment for You?",
    date: "26 January 2026",
    excerpt:
      "A practical comparison of long-term land appreciation and flexibility versus the immediate utility and rental potential of a completed house.",
    body:
      "HED's current article compares the lower maintenance and long-term flexibility of land with the immediate use and potential rental income of a completed house. The core recommendation is to match the property choice to the buyer's goals, budget and timeline, while paying close attention to location and professional guidance.",
  },
  {
    id: 1,
    slug: "why-investing-in-land",
    title: "Why Investing in Land Is a Smart Long-Term Choice",
    date: "16 September 2025",
    excerpt:
      "Why land remains attractive for appreciation, flexibility, lower maintenance and generational wealth.",
    body:
      "HED highlights land appreciation, multiple development options, low maintenance requirements and the ability to build generational wealth.",
  },
];

export const investmentPrograms = [
  {
    id: "hip",
    name: "Honest Investor Plan",
    acronym: "HIP",
    audience: "Structured land savings & ownership",
    description:
      "A structured land savings and ownership programme designed to help customers make disciplined monthly contributions toward property ownership. The framework includes defined payment milestones, documentation and eventual title or transfer processing upon completion of the agreed payment plan.",
  },
  {
    id: "1ppy",
    name: "One Person. One Property. Yearly.",
    acronym: "1PPY",
    audience: "Diaspora-focused property investment",
    description:
      "A structured property investment concept focused particularly on disciplined property ownership among Ugandans in the diaspora, built around recurring contributions, investment milestones, member benefits and access to property opportunities.",
  },
  {
    id: "sacco",
    name: "SACCO Property Investment Programme",
    acronym: "SACCO",
    audience: "SACCOs & savings groups",
    description:
      "A structured pathway for SACCOs and their members to participate in property investment, supported by education, property opportunities and potential financial-sector partnerships.",
  },
  {
    id: "diaspora",
    name: "Diaspora Engagement",
    acronym: "Global",
    audience: "Ugandans living abroad",
    description:
      "A customer-engagement focus intended to make property investment more accessible to Ugandans living abroad through structured information, remote engagement, site-inspection support, documentation guidance and investment programmes.",
  },
];

export const customerJourney = [
  {
    step: "01",
    title: "Consultation",
    text: "Understand the customer's objectives, preferred location, budget and intended use.",
  },
  {
    step: "02",
    title: "Property Selection",
    text: "Present suitable property opportunities and explain location, plot details and applicable terms.",
  },
  {
    step: "03",
    title: "Site Inspection",
    text: "Facilitate physical inspection so customers can assess the location and surrounding environment.",
  },
  {
    step: "04",
    title: "Verification & Documentation",
    text: "Support the customer through relevant verification, documentation and title-related processes.",
  },
  {
    step: "05",
    title: "Purchase & Payment",
    text: "Implement the agreed transaction and payment structure with appropriate documentation.",
  },
  {
    step: "06",
    title: "After-Sale Support",
    text: "Maintain customer engagement and provide relevant support after the transaction.",
  },
];

export const partnerships = [
  {
    title: "SACCOs & Savings Groups",
    text: "Structured property investment programmes for members.",
  },
  {
    title: "Banks & Financial Institutions",
    text: "Potential mortgage, financing and property-investment partnerships.",
  },
  {
    title: "Corporate Organisations",
    text: "Employee property education, investment and ownership programmes.",
  },
  {
    title: "Government & Public Sector",
    text: "Engagement around land, planning, documentation and development ecosystems.",
  },
  {
    title: "Tourism & Aviation Ecosystem",
    text: "Diaspora and international visitor engagement around the message: Visit Uganda. Experience Uganda. Invest in Uganda.",
  },
];

export const vision2030 = [
  {
    title: "Property Growth",
    text: "Expand the estate and development portfolio in carefully selected growth corridors.",
  },
  {
    title: "Customer & Diaspora Growth",
    text: "Build stronger domestic and diaspora customer acquisition and engagement channels.",
  },
  {
    title: "Professional Services",
    text: "Strengthen consulting, documentation, surveying, construction and property management capabilities.",
  },
  {
    title: "Strategic Partnerships",
    text: "Develop institutional partnerships that improve access to property, finance, expertise and markets.",
  },
  {
    title: "Digital Transformation",
    text: "Use technology to improve customer communication, marketing, property information and operational efficiency.",
  },
  {
    title: "Brand & Trust",
    text: "Build HED as a trusted, recognisable and professionally managed Ugandan real estate brand.",
  },
];

export const corporateStandards = [
  "Clear and accurate property information.",
  "Professional documentation and customer correspondence.",
  "Consistent HED branding across print and digital materials.",
  "Prompt customer response and follow-up.",
  "Transparent communication of property terms and applicable processes.",
];

export const companyProfile = {
  intro:
    "Honest Estate Developers Ltd (HED) is a Ugandan real estate company established in 2007. The company operates across land sales and marketing, real estate consulting and property-related services, with additional capabilities in construction and development, surveying, and land documentation and title processing.",
  position:
    "HED is positioned as a customer-focused real estate business combining property opportunities with supporting professional services.",
  story:
    "HED was established in 2007 and has operated in Uganda's real estate market since then. The company has developed its presence around land and property opportunities while expanding the range of services offered to customers.",
  officeHistory:
    "HED's office history has included earlier locations such as Sarah Mall, Mukwano Mall and Rashid Khamis Road before establishing its current presence at Mankeshwar Building along Martin Road.",
  vision:
    "To provide quality services that exceed the expectations of our esteemed customers.",
  mission:
    "To build long-term relationships with our customers and clients and provide exceptional customer service by pursuing business through innovation and advanced technology.",
  purpose:
    "To be a leader in the real estate industry by providing enhanced services, relationships and profitability.",
  strategicDirection:
    "HED seeks to strengthen its position in Uganda's real estate industry by combining customer trust, service quality, innovation, property opportunities and professional support.",
  longTermAmbition:
    "To evolve from a traditional real estate business into an integrated property company known for trusted land opportunities, professional services, customer experience and sustainable community development.",
  goals: [
    "Regional expansion in the field of property management and development of a strong base of key customers.",
    "Increase company assets and investments to support the development of services.",
    "Build a strong reputation in real estate and property management and become a key player in the industry.",
    "Strengthen customer relationships through transparent, responsive and professional service.",
  ],
  values: [
    {
      title: "Honesty",
      text: "We are open and straightforward with customers and seek to provide relevant information that supports informed decisions.",
    },
    {
      title: "Integrity",
      text: "We integrate ethical business conduct into the way we serve customers and conduct our operations.",
    },
    {
      title: "Excellence",
      text: "We pursue quality service, professionalism and continuous improvement.",
    },
    {
      title: "Respect",
      text: "We treat customers with respect and faith, recognising the importance of every property decision.",
    },
    {
      title: "Innovation",
      text: "We grow through creativity, invention and innovation and seek to use technology to improve service delivery.",
    },
  ],
  reasons: [
    {
      title: "Established experience",
      text: "Experience built through years of operation in Uganda's real estate market.",
    },
    {
      title: "Accessible opportunities",
      text: "Affordable property opportunities across selected growth corridors.",
    },
    {
      title: "Flexible approaches",
      text: "Flexible payment approaches on selected property offerings.",
    },
    {
      title: "Transparency",
      text: "Customer-focused transparency and disclosure.",
    },
    {
      title: "Practical support",
      text: "Site inspections and practical customer support.",
    },
    {
      title: "Documentation support",
      text: "Support with property documentation and title-related processes.",
    },
    {
      title: "Integrated services",
      text: "Access to a broader range of real estate services beyond land sales.",
    },
  ],
};
