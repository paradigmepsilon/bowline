/**
 * Single source of truth for Bowline Federal Technologies, LLC.
 *
 * Nothing about the company should be hardcoded in markup - every page reads
 * from this file. Fields that are not yet assigned are `null`; the `display()`
 * helper renders them as "Available upon request" (or hides them) so a visitor
 * NEVER sees a raw placeholder. See README "Populating PENDING fields".
 */

export type CertStatus = "held" | "in-process" | "eligible";

export interface Certification {
  /** Short label, e.g. "SDVOSB". */
  name: string;
  /** Honest current status. Drives how it is presented. */
  status: CertStatus;
  /** Plain-language description of the exact standing. Shown to visitors. */
  statusLabel: string;
  /** One-line explanation of what the designation means / its basis. */
  detail: string;
}

export interface Credential {
  name: string;
  /** true when held; false when actively being pursued. */
  held: boolean;
}

export interface Competency {
  /** Stable slug for anchors. */
  id: string;
  title: string;
  /** One-sentence positioning. */
  summary: string;
  /** Concrete capability bullets - what the work actually is. */
  points: string[];
}

export interface Differentiator {
  title: string;
  body: string;
  /** Cinematic thumbnail paired with the row (replaces the monoline icon). */
  image: string;
  /** Alt text for the thumbnail. */
  imgAlt: string;
}

export interface FederalCustomer {
  name: string;
  locality: string;
}

export const company = {
  // --- Identity -----------------------------------------------------------
  legalName: "Bowline Federal Technologies, LLC",
  dba: "Bowline Federal Technologies",
  shortName: "Bowline Federal",
  tagline: "Mission-critical technology. Engineered with precision.",
  positioning:
    "A service-disabled veteran-owned federal IT services firm pursuing SDVOSB and 8(a) designations.",
  /** Compact positioning line used in the hero eyebrow / meta. */
  positioningShort: "SDVOSB · 8(a)-track federal IT services",

  // --- Registrations (PENDING until assigned) -----------------------------
  uei: null as string | null, // SAM.gov Unique Entity ID - PENDING
  cageCode: null as string | null, // CAGE / NCAGE - PENDING
  duns: null as string | null, // Retired by the federal government; intentionally null.
  naicsPrimary: "541512",
  naicsPrimaryLabel: "Computer Systems Design Services",
  naicsSecondary: [
    { code: "541511", label: "Custom Computer Programming Services" },
    { code: "541513", label: "Computer Facilities Management Services" },
    { code: "541519", label: "Other Computer Related Services" },
    { code: "541330", label: "Engineering Services" },
    { code: "518210", label: "Computing Infrastructure Providers, Data Processing" },
    { code: "541611", label: "Administrative & General Management Consulting" },
  ] as ReadonlyArray<{ code: string; label: string }>,

  // --- Contact (PENDING until provisioned) --------------------------------
  /** BFT-dedicated mailbox. Not shared with any other entity. PENDING. */
  email: null as string | null,
  /** BFT-dedicated line. PENDING. */
  phone: null as string | null,
  city: "Atlanta metropolitan area, Georgia",
  state: "Georgia",
  stateAbbr: "GA",
  /** Geographic markets the firm serves. */
  areaServed: ["Atlanta metropolitan area", "Southeast United States", "Nationwide (federal)"],

  // --- Business status ----------------------------------------------------
  entityType: "Limited Liability Company",
  smallBusiness: true,
  smallBusinessNote:
    "Small business under SBA size standards for NAICS 541512.",
  founded: "2025",
  newEntityStatement:
    "Bowline Federal Technologies is a newly formed entity. Its past performance is represented by the individual professional experience of its principal, detailed on the Principal page.",

  // --- Contact backend ----------------------------------------------------
  /**
   * Web3Forms access key - DEDICATED to Bowline Federal, independent of the
   * hosting account and of any other entity. Replace the placeholder with the
   * real key from web3forms.com (see README). The contact form will return a
   * 4xx until a valid key is in place - this is expected pre-launch.
   */
  web3formsKey: "REPLACE_WITH_BFT_WEB3FORMS_ACCESS_KEY",
} as const;

// --- Certification stack (honest statuses) --------------------------------
// SDVOSB / 8(a) / MBE are eligibility / in-application - NOT awarded.
// These strings are the single place to update as standings change.
export const certifications: ReadonlyArray<Certification> = [
  {
    name: "SDVOSB",
    status: "in-process",
    statusLabel: "Application in process via SBA VetCert",
    detail:
      "Service-Disabled Veteran-Owned Small Business. Verification application in process through SBA VetCert.",
  },
  {
    name: "8(a) Business Development",
    status: "in-process",
    statusLabel: "On track; application planned",
    detail:
      "SBA 8(a) Business Development Program. Entity is on track toward eligibility; application planned.",
  },
  {
    name: "State MBE / SBE",
    status: "in-process",
    statusLabel: "Registration in process (Georgia)",
    detail:
      "State of Georgia small / minority business enterprise registration in process.",
  },
] as const;

// --- Credential portfolio (in-progress marked honestly) -------------------
export const credentials: ReadonlyArray<Credential> = [
  { name: "PMP", held: true },
  { name: "ITIL 4 Foundation", held: true },
  { name: "CompTIA Security+", held: true },
  { name: "AWS Certified Solutions Architect", held: false },
  { name: "Microsoft Azure (AZ-305)", held: false },
  { name: "CISSP", held: false },
  { name: "FedRAMP (NIST 800-53 / RMF)", held: false },
] as const;

// --- Core competencies ----------------------------------------------------
export const competencies: ReadonlyArray<Competency> = [
  {
    id: "cloud-architecture",
    title: "Cloud Architecture & Migration",
    summary:
      "Secure, compliant cloud design and lift-to-modernize migrations across AWS and Azure government environments.",
    points: [
      "Landing zone and account/subscription architecture",
      "Workload assessment, rationalization, and migration planning",
      "FedRAMP- and IL-aligned reference architectures",
      "Cost governance, tagging, and resource optimization",
    ],
  },
  {
    id: "program-management",
    title: "IT Program & Project Management",
    summary:
      "Disciplined delivery of federal IT programs against scope, schedule, and cost. PMP-led, audit-ready.",
    points: [
      "Earned value, risk, and schedule management",
      "Agile, hybrid, and stage-gated delivery",
      "Stakeholder governance and reporting cadence",
      "Acquisition and contract-deliverable support",
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Engineering",
    summary:
      "Defense-in-depth engineering aligned to NIST 800-53, RMF, and Zero Trust principles.",
    points: [
      "Security control implementation and ATO support",
      "Zero Trust architecture and segmentation",
      "Vulnerability management and continuous monitoring",
      "Incident response readiness and hardening",
    ],
  },
  {
    id: "systems-integration",
    title: "Systems Integration",
    summary:
      "Connecting legacy and modern systems into coherent, governed, observable platforms.",
    points: [
      "API and data integration across boundaries",
      "Identity and access federation",
      "Middleware, messaging, and event architecture",
      "Interface control and integration testing",
    ],
  },
  {
    id: "custom-software",
    title: "Custom Software Development",
    summary:
      "Purpose-built applications engineered to federal security and accessibility standards.",
    points: [
      "Full-stack web and service development",
      "Section 508 / WCAG-conformant interfaces",
      "Secure SDLC with code analysis gates",
      "Documentation and maintainability by design",
    ],
  },
  {
    id: "devsecops",
    title: "DevSecOps & Application Modernization",
    summary:
      "Automated, secure delivery pipelines and the modernization of aging applications.",
    points: [
      "CI/CD pipeline design with security gates",
      "Containerization and infrastructure as code",
      "Monolith decomposition and re-platforming",
      "Automated testing and compliance evidence",
    ],
  },
  {
    id: "itsm",
    title: "IT Service Management",
    summary:
      "ITIL 4-aligned operations that keep mission systems available, measured, and improving.",
    points: [
      "Incident, problem, and change management",
      "Service-level design and reporting",
      "Asset and configuration management",
      "Continual service improvement",
    ],
  },
  {
    id: "federal-consulting",
    title: "Federal IT Consulting",
    summary:
      "Advisory across strategy, compliance, and acquisition for federal technology programs.",
    points: [
      "IT strategy and modernization roadmaps",
      "Compliance and authorization advisory",
      "Capability and gap assessments",
      "Acquisition and technical evaluation support",
    ],
  },
] as const;

// --- Differentiators ------------------------------------------------------
export const differentiators: ReadonlyArray<Differentiator> = [
  {
    title: "Multi-category set-aside positioning",
    body: "Pursuing SDVOSB and 8(a) designations, positioning the firm to support agency small-business and socioeconomic goals across multiple set-aside channels.",
    image: "/diff-set-aside.jpg",
    imgAlt: "Veteran-owned federal small-business credentials over a dusk facility",
  },
  {
    title: "Two decades of enterprise IT depth",
    body: "Principal leadership with 20+ years architecting, securing, and delivering enterprise technology: the engineering maturity of an established team in a focused small business.",
    image: "/diff-it-depth.jpg",
    imgAlt: "Server hall and structured cabling representing enterprise IT depth",
  },
  {
    title: "MBA-credentialed technical leadership",
    body: "Engineering judgment paired with an MBA. Work is scoped against mission outcomes, cost, and risk, not just technical preference.",
    image: "/diff-leadership.jpg",
    imgAlt: "Strategy room at dusk representing MBA-credentialed technical leadership",
  },
  {
    title: "Southeast federal-customer proximity",
    body: "Based in the Atlanta metro, near a concentration of federal customers: responsive, on-site-capable support without national-firm overhead.",
    image: "/diff-proximity.jpg",
    imgAlt: "Atlanta-metro federal campus skyline at dusk representing customer proximity",
  },
  {
    title: "Credential-backed practitioners",
    body: "A practitioner credential portfolio spanning program management, security, service management, and cloud, with additional certifications actively in progress.",
    image: "/diff-credentials.jpg",
    imgAlt: "Layered certification seals over a steel structure representing credentialed practitioners",
  },
] as const;

// --- Nearby federal customers (proximity, not clients) --------------------
// These are geographically proximate federal installations/agencies - used to
// illustrate market proximity. They are NOT represented as customers or past
// performance.
export const federalCustomers: ReadonlyArray<FederalCustomer> = [
  { name: "Centers for Disease Control and Prevention (CDC)", locality: "Atlanta, GA" },
  { name: "Internal Revenue Service, Atlanta Campus", locality: "Atlanta, GA" },
  { name: "EPA Region 4", locality: "Atlanta, GA" },
  { name: "Atlanta VA Health Care System", locality: "Decatur, GA" },
  { name: "Robins Air Force Base", locality: "Warner Robins, GA" },
  { name: "Fort Moore", locality: "Columbus, GA" },
] as const;

// --- Principal (individual experience - no fabricated contract history) ----
// Employers are described by sector and scale rather than named, in keeping with
// the firm's "individual past performance, not corporate" framing.
export interface ResumeRole {
  /** Sector framing instead of named employer. */
  sector: string;
  /** Role held. */
  role: string;
  /** Span, e.g. "2017 - 2022". */
  period: string;
  /** Outcome-focused bullets, quantified where the work earned it. */
  points: string[];
}

export interface PortraitImage {
  src: string;
  alt: string;
}

export const principal = {
  /** Role/title shown publicly. */
  title: "Founder & Principal",
  /** Name now published. */
  name: "Alex R. Henry" as string | null,
  /** Headshot. null hides the portrait. */
  portrait: {
    src: "/principal-portrait.jpg",
    alt: "Alex R. Henry, Founder and Principal of Bowline Federal Technologies",
  } as PortraitImage | null,
  serviceDisabledVeteran: true,
  summary:
    "Bowline Federal Technologies is led by Alex R. Henry, a service-disabled U.S. military veteran with more than 20 years directing enterprise engineering, program delivery, and large-scale communication systems across defense, aviation, and technology. His career has centered on turning complex operational problems into production systems that hold up under real-world scale, while leading cross-functional teams, owning multimillion-dollar budgets, and managing vendor portfolios.",
  /** Short headline credentials shown in the summary card. */
  credentialLine: "MBV, University of Southern California · PMP · Lean Six Sigma Black Belt · AWS Certified",
  /** Career told as individual past performance, employers kept generic. */
  career: [
    {
      sector: "Enterprise technology & AI delivery",
      role: "Director, IT Operations & Technology Advisory",
      period: "2023 - Present",
      points: [
        "Leads technology strategy and end-to-end delivery for independent operators, owning every engagement from discovery and architecture through implementation and support.",
        "Designed and deployed AI-driven communication systems that unify messaging channels into a single workflow, cutting response times and recovering hours of staff time per week.",
        "Built a production communication and revenue platform from concept to launch, advising leaders on tech-stack and vendor decisions to consolidate spend on fit-for-purpose systems.",
      ],
    },
    {
      sector: "Major U.S. airline",
      role: "Principal Technical Program Manager",
      period: "2020 - 2022",
      points: [
        "Architected and delivered an enterprise outbound-communications platform that cut customer-service callbacks by more than 80 percent.",
        "Led the cloud transformation of six mission-critical applications, reducing legacy infrastructure dependency and improving resilience across the estate.",
        "Owned customer-notification infrastructure handling thousands of simultaneous interactions, delivering eight figures in measurable business impact.",
      ],
    },
    {
      sector: "Major U.S. airline",
      role: "Senior IT & Software Engineering Manager",
      period: "2017 - 2020",
      points: [
        "Led a 72-person engineering organization through the full development lifecycle, delivering 16 customer-notification systems into production.",
        "Managed hiring, coaching, and delivery for staff across three countries, supporting 14 complex business applications.",
        "Held cost and quality together across a large contract portfolio while sustaining a 92 percent on-time delivery rate.",
      ],
    },
    {
      sector: "United States Marine Corps",
      role: "Director, IT Strategy & Program Delivery",
      period: "2001 - 2017",
      points: [
        "Led enterprise IT strategy and infrastructure modernization, sustaining 99 percent system uptime through compliance, security, and data-management programs.",
        "Drove process re-engineering that saved tens of millions and cut service-delivery costs, improving process efficiency by 30 percent.",
        "Directed cross-functional initiatives and program budgets, keeping unit readiness in the top tier across multi-year periods.",
      ],
    },
  ] as ReadonlyArray<ResumeRole>,
  /** Education and recognition, public-safe. */
  education: [
    "Master of Business for Veterans (MBV), University of Southern California, Marshall School of Business",
    "M.S., Management Information Systems",
    "B.S., Computer Science",
  ],
  recognition: [
    "Project Management Professional (PMP)",
    "Lean Six Sigma Black Belt",
    "AWS Certified Cloud Practitioner",
    "Certified Project Director (CPD)",
    "Meritorious Service Medal (x2)",
    "Navy & Marine Corps Commendation Medal (x2)",
  ],
  /** Legacy field retained for any other consumers. */
  experience: [
    "20+ years architecting, securing, and delivering enterprise IT systems",
    "Program and project leadership across complex, multi-stakeholder environments",
    "Cloud architecture and modernization across AWS and Azure",
    "Cybersecurity engineering aligned to NIST and Zero Trust principles",
  ],
} as const;

// --- Operator bench (team assembled per engagement, not standing payroll) --
export interface BenchRole {
  title: string;
  body: string;
}

export const teamBench = {
  intro:
    "A focused small business backed by a vetted bench. For each engagement, the principal assembles a team of senior operators matched to the mission: practitioners with federal and enterprise track records, ready to clear and deploy.",
  roles: [
    {
      title: "Cloud & Platform Engineers",
      body: "AWS and Azure architects who stand up secure landing zones, modernize workloads, and keep cost and compliance in view.",
    },
    {
      title: "Cybersecurity & Compliance Leads",
      body: "Practitioners fluent in NIST 800-53, RMF, and Zero Trust who carry systems from control implementation through authorization.",
    },
    {
      title: "Program & Delivery Managers",
      body: "PMP-disciplined leads who run scope, schedule, and cost against audit-ready cadence on ambiguous programs.",
    },
    {
      title: "Software & Integration Engineers",
      body: "Full-stack and systems-integration engineers who build to federal security and accessibility standards and document for maintainability.",
    },
  ] as ReadonlyArray<BenchRole>,
} as const;

/**
 * Render a possibly-null company value for public display.
 * Returns the fallback when the value is null/empty so the literal placeholder
 * is never shown. Pass `fallback: null` to signal "hide this row entirely".
 */
export function display(
  value: string | null | undefined,
  fallback: string | null = "Available upon request",
): string | null {
  if (value === null || value === undefined || value.trim() === "") {
    return fallback;
  }
  return value;
}

/** True when a contact channel is actually populated (used to show/hide rows). */
export function hasValue(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim() !== "";
}

/** Site navigation - single source for header + footer. */
export const nav: ReadonlyArray<{ href: string; label: string }> = [
  { href: "/capabilities", label: "Capabilities" },
  { href: "/differentiators", label: "Differentiators" },
  { href: "/principal", label: "Principal" },
  { href: "/corporate-data", label: "Corporate Data" },
  { href: "/contact", label: "Contact" },
] as const;
