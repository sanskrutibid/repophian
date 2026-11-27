// ---------------------------------------------------------------------------
// CLIENT LOGOS - black logo files in src/assets/images/clients/ (shown normally)
//                + original-colour versions in src/assets/images/clients/color/ (same file name, .webp) shown on MOUSE HOVER.
// Used on Home (Our clients) and on the Projects & Clients page.
//
// ORDER (chronology) = the order of the lines below, top to bottom, inside each group.
//   * Projects & Clients page: every group is shown under its heading, in this order.
//   * Home page: no headings. The FIRST 5 logos of each group are shown (HOME_TOP = 5), one group per row,
//     and a "Show more" button reveals the rest.  So to change what appears on Home, move a line into the top 5 of its group.
//   1 Healthcare and Wellness   2 Real Estate, Infrastructure and Design   3 Education
//   4 Consumer Brands, Food and Lifestyle   5 Corporate and Industry
//
// To add a client: copy its black PNG into src/assets/images/clients/, its colour version (.webp, same name) into
// src/assets/images/clients/color/, add the file name (without extension) to COLOR below, and add ONE line L("Name", "file.png").
// To remove a client: delete its line.   Logos that are white-on-transparent are listed in DARK_TILE (the card turns dark on hover).
// ---------------------------------------------------------------------------
export interface Client {
  name: string; img?: string; col?: string; dk?: boolean; l1: string; l2?: string; f: string; c: string; a?: string;
  icon?: string; layout?: 'row' | 'stack' | 'plain' | 'box' | 'pill' | 'chip';
  w?: number; ls?: number; s?: number; up?: boolean; it?: boolean;
}
export interface ClientGroup { id: string; title: string; clients: Client[]; }

/** how many logos per group are shown on the Home page before "Show more" */
export const HOME_TOP = 5;

/** logos that have an original-colour file in clients/color/ (file name without extension) */
const COLOR = new Set<string>([
  'ashper', 'bioallos', 'jm-monogram', 'nsh-critical-care-hospital', 'somalwar-academy-education-society',
  'abb', 'abhyudaya-piles-aesthetic-laser-hospital', 'abo-eye-institute', 'arihant-multispeciality-hospital',
  'arihant-netralaya', 'aspire-aesthetics', 'aspire-international-school', 'baidyanath',
  'blossom-school', 'capello-luxury-salon', 'central-india-public-school', 'central-provincial-school',
  'columbia-asia-hospitals', 'cruise-lens-academy', 'design-inside', 'dwarkadhish-infraventures',
  'edify-school-nagpur', 'fetal-medicine-and-cardiology-centre-of-excellence', 'gaikwad-patil-international-school', 'genius-academy',
  'growthtree', 'haldiram-s-prabhuji', 'ifda-international', 'iidesign',
  'iinsight', 'indus-suites', 'inficore', 'it-campus-guru',
  'ivify-drip-spa', 'jain-heritage', 'kalptaru-jee-neet-foundation', 'kalptaruu-polyclinic',
  'karmabhoomi-industrial-estate', 'keshavam-infra', 'kolkata-rice', 'krishna-construction-co',
  'little-millennium', 'lokmanya-tilak-international-school', 'mainline-academy', 'marico',
  'matchbox-design-studio', 'max-healthcare', 'mayur-exclusives', 'mediskin',
  'mount-litera-zee-school', 'mount-litera-zee-school-newyoor', 'mukunda', 'nature-s-sprout',
  'neev-institute-nagpur', 'oak-and-chisel', 'orthopaedics-dental-aesthetics', 'p-c-chandra-jewellers',
  'pradhan-madam-s-academy', 'preeti-poddar', 'prophecy-research', 'public-school-emblem',
  'ramdevbaba-solvent', 'ramsons-group', 'rhythm-heart-and-critical-care', 'royal-gondwana-public-school',
  'shpl-care-network', 'siddhayu-wellness-abode', 'small-wonders', 'sparkle-eye-clinic',
  'srivalli-designs', 'ss-buildcon', 'swetal-logistics', 'the-achievers-school',
  'the-city-dhhaba', 'the-fitness-hive', 'the-rankers-academy', 'the-swaminarayan-school',
  'traditional-brand', 'unique-realities', 'vaultstone', 'vision-developers',
]);
/** white-on-transparent colour logos: the card gets a dark background on hover so they stay visible */
const DARK_TILE = new Set<string>(['mukunda', 'keshavam-infra', 'siddhayu-wellness-abode', 'design-inside', 'it-campus-guru', 'kalptaru-jee-neet-foundation']);

const L = (name: string, img: string): Client => {
  const stem = img.replace(/\.png$/, '');
  return { name, img, col: COLOR.has(stem) ? stem + '.webp' : undefined, dk: DARK_TILE.has(stem), l1: name, f: 'montserrat', c: '#111111' };
};

export const CLIENT_GROUPS: ClientGroup[] = [
  {
    id: 'healthcare', title: 'Healthcare and Wellness', clients: [
      L("Max Healthcare", "max-healthcare.png"),
      L("Columbia Asia Hospitals", "columbia-asia-hospitals.png"),
      L("NSH Critical Care Hospital", "nsh-critical-care-hospital.png"),
      L("Arihant Multispeciality Hospital", "arihant-multispeciality-hospital.png"),
      L("ABO Eye Institute", "abo-eye-institute.png"),
      L("Arihant Netralaya", "arihant-netralaya.png"),
      L("Rhythm Heart and Critical Care", "rhythm-heart-and-critical-care.png"),
      L("Abhyudaya Piles Aesthetic Laser Hospital", "abhyudaya-piles-aesthetic-laser-hospital.png"),
      L("Aspire Aesthetics", "aspire-aesthetics.png"),
      L("Fetal Medicine and Cardiology Centre of Excellence", "fetal-medicine-and-cardiology-centre-of-excellence.png"),
      L("Kalptaruu Polyclinic", "kalptaruu-polyclinic.png"),
      L("Orthopaedics Dental Aesthetics", "orthopaedics-dental-aesthetics.png"),
      L("Siddhayu Wellness Abode", "siddhayu-wellness-abode.png"),
      L("IVify Drip Spa", "ivify-drip-spa.png"),
      L("Mediskin", "mediskin.png"),
      L("Sparkle Eye Clinic", "sparkle-eye-clinic.png"),
      L("Small Wonders", "small-wonders.png"),
      L("SHPL Care Network", "shpl-care-network.png"),
      L("BioAllos", "bioallos.png"),
    ],
  },
  {
    id: 'real-estate', title: 'Real Estate, Infrastructure and Design', clients: [
      L("Mukunda", "mukunda.png"),
      L("Keshavam Infra", "keshavam-infra.png"),
      L("Ramsons Group", "ramsons-group.png"),
      L("SS Buildcon", "ss-buildcon.png"),
      L("Vaultstone", "vaultstone.png"),
      L("Dwarkadhish Infraventures", "dwarkadhish-infraventures.png"),
      L("Krishna Construction Co", "krishna-construction-co.png"),
      L("Unique Realities", "unique-realities.png"),
      L("Vision Developers", "vision-developers.png"),
      L("Karmabhoomi Industrial Estate", "karmabhoomi-industrial-estate.png"),
      L("IIDesign", "iidesign.png"),
      L("Matchbox Design Studio", "matchbox-design-studio.png"),
      L("Design Inside", "design-inside.png"),
    ],
  },
  {
    id: 'education', title: 'Education', clients: [
      { name: "IIT-Home", img: "iit-home.svg", col: "iit-home.svg", l1: "IIT-Home", f: 'montserrat', c: '#de3333' },
      L("Public School Emblem", "public-school-emblem.png"),
      L("Mount Litera Zee School, Besa Nagpur", "mount-litera-zee-school.png"),
      L("The Swaminarayan School", "the-swaminarayan-school.png"),
      L("Little Millennium", "little-millennium.png"),
      L("The Achievers School", "the-achievers-school.png"),
      L("Lokmanya Tilak International School", "lokmanya-tilak-international-school.png"),
      L("Royal Gondwana Public School", "royal-gondwana-public-school.png"),
      L("Edify School Nagpur", "edify-school-nagpur.png"),
      L("Central India Public School", "central-india-public-school.png"),
      L("Blossom School", "blossom-school.png"),
      L("NEEV Institute Nagpur", "neev-institute-nagpur.png"),
      L("Mainline Academy", "mainline-academy.png"),
      L("Pradhan Madam's Academy", "pradhan-madam-s-academy.png"),
      L("IInsight", "iinsight.png"),
      L("IT Campus Guru", "it-campus-guru.png"),
      L("The Rankers Academy", "the-rankers-academy.png"),
      L("Kalptaru JEE NEET Foundation", "kalptaru-jee-neet-foundation.png"),
      L("Somalwar Academy Education Society", "somalwar-academy-education-society.png"),
      L("Jain Heritage", "jain-heritage.png"),
      L("Genius Academy", "genius-academy.png"),
      L("IFDA International", "ifda-international.png"),
      L("Cruise Lens Academy", "cruise-lens-academy.png"),
      L("Aspire International School", "aspire-international-school.png"),
      L("Central Provincial School", "central-provincial-school.png"),
      L("Gaikwad-Patil International School", "gaikwad-patil-international-school.png"),
      L("Mount Litera Zee School, Newyoor", "mount-litera-zee-school-newyoor.png"),
    ],
  },
  {
    id: 'consumer', title: 'Consumer Brands, Food and Lifestyle', clients: [
      L("Baidyanath", "baidyanath.png"),
      L("P. C. Chandra Jewellers", "p-c-chandra-jewellers.png"),
      L("Haldiram's Prabhuji", "haldiram-s-prabhuji.png"),
      L("Mayur Exclusives", "mayur-exclusives.png"),
      L("Nature's Sprout", "nature-s-sprout.png"),
      L("Indus Suites", "indus-suites.png"),
      L("Oak and Chisel", "oak-and-chisel.png"),
      L("Capello Luxury Salon", "capello-luxury-salon.png"),
      L("Kolkata Rice", "kolkata-rice.png"),
      L("Preeti Poddar", "preeti-poddar.png"),
      L("Traditional Brand", "traditional-brand.png"),
      L("Srivalli Designs", "srivalli-designs.png"),
      L("The City Dhhaba", "the-city-dhhaba.png"),
      L("The Fitness Hive", "the-fitness-hive.png"),
      L("JM Monogram", "jm-monogram.png"),
      L("Ashper", "ashper.png"),
    ],
  },
  {
    id: 'corporate', title: 'Corporate and Industry', clients: [
      L("ABB", "abb.png"),
      L("Marico", "marico.png"),
      L("Ramdevbaba Solvent", "ramdevbaba-solvent.png"),
      L("Swetal Logistics", "swetal-logistics.png"),
      L("Inficore", "inficore.png"),
      L("Prophecy Research", "prophecy-research.png"),
      L("Growthtree", "growthtree.png"),
    ],
  },
];

/** flat list (all groups in order) - kept for any code that needs every client */
export const CLIENTS: Client[] = CLIENT_GROUPS.flatMap(g => g.clients);
