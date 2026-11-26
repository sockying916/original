export interface HeroSlide {
  id: string;
  eyebrow: string;
  headline: string;
  summary: string;
  ctaLabel: string;
  ctaTarget: string;
  image: string;
  imageAlt: string;
  accentLabel: string;
}

export interface ProductItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  highlights: string[];
  eligibility: string;
  whereToGet: string;
  cardFee: string;
}

export interface StationStop {
  id: string;
  name: string;
  line: string;
  code: string;
  kmFromOrigin: number;
}

export interface CardPreset {
  can: string;
  label: string;
  cardType: string;
  holderName: string;
  balance: number;
  autoTopUp: boolean;
  autoTopUpAmount: number;
  status: 'Active' | 'Blocked';
  expiry: string;
  transactions: {
    id: string;
    date: string;
    time: string;
    description: string;
    mode: 'MRT' | 'Bus' | 'Top-Up' | 'Retail';
    amount: number;
  }[];
}

export interface ConcessionProfile {
  id: string;
  group: string;
  cardName: string;
  monthlyPassPrice: string;
  perRideDiscount: string;
  eligibility: string;
  applySteps: string[];
}

export interface NewsArticle {
  id: string;
  category: 'Campaigns' | 'Cards & Charms' | 'Service Advisories';
  date: string;
  readTime: string;
  title: string;
  summary: string;
  body: string[];
  image: string;
  imageAlt: string;
}

export interface TicketOffice {
  id: string;
  station: string;
  region: 'Central' | 'North' | 'East' | 'West' | 'North-East';
  locationDetail: string;
  hours: string;
  services: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'unified-app',
    eyebrow: 'Enhanced SimplyGo App',
    headline: 'One unified platform for every public transport journey.',
    summary:
      'Manage SimplyGo EZ-Link cards, Concession cards, contactless bank cards, and EZ-Link Motoring in one place—check balances, top up remotely, and track fares instantly.',
    ctaLabel: 'Explore Travel Tools',
    ctaTarget: '#travel-tools',
    image: '/src/assets/images/hero_mrt_commuter_1795678195800.jpg',
    imageAlt: 'Commuters tapping transit cards at a bright Singapore MRT station platform',
    accentLabel: 'EZ-Link & TransitLink services now integrated',
  },
  {
    id: 'tap-contactless',
    eyebrow: 'Account-Based Ticketing',
    headline: 'Tap directly with your contactless bank card or mobile wallet.',
    summary:
      'Skip card top-ups altogether. Board any MRT, LRT, or public bus with Mastercard, Visa, NETS Contactless, Apple Pay, or Google Pay and view trip charges in the app.',
    ctaLabel: 'View Supported Cards',
    ctaTarget: '#products',
    image: '/src/assets/images/card_bank_tap_1795678195256.jpg',
    imageAlt: 'Commuter tapping smartphone over a contactless bus fare reader',
    accentLabel: 'Zero top-ups required for bank card commuters',
  },
  {
    id: 'ride-rewards',
    eyebrow: 'SimplyGo Rewards & Charms',
    headline: 'Earn points on daily rides and collect limited-edition charms.',
    summary:
      'Link your SimplyGo EZ-Link card or wallet to unlock Ride to Rewards perks, offset fares with e-vouchers, and discover compact tap-and-go transit charms.',
    ctaLabel: 'Browse Latest Campaigns',
    ctaTarget: '#newsroom',
    image: '/src/assets/images/campaign_rewards_city_1795678195454.jpg',
    imageAlt: 'Singapore Marina Bay waterfront illuminated at twilight',
    accentLabel: 'Available islandwide across MRT stations and buses',
  },
];

export const COMMUTER_HIGHLIGHTS = [
  {
    label: 'Daily Coverage',
    value: '140+ MRT & LRT Stations',
    detail: 'Islandwide rail and public bus network',
  },
  {
    label: 'Payment Modes',
    value: 'SimplyGo EZ-Link & Bank Cards',
    detail: 'Visa, Mastercard, NETS, Apple & Google Pay',
  },
  {
    label: 'Card Protection',
    value: 'Instant Remote Card Block',
    detail: 'Protect remaining stored value anytime',
  },
  {
    label: 'Commuter Support',
    value: '40+ Ticket Offices & Kiosks',
    detail: 'Concession applications and instant top-ups',
  },
];

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'simplygo-ezlink',
    title: 'SimplyGo EZ-Link Cards & Charms',
    category: 'Stored-Value Transit',
    shortDesc:
      'Tap and pay seamlessly across buses, trains, and retail merchants with remote top-ups and real-time trip notifications via the SimplyGo app.',
    fullDesc:
      'SimplyGo EZ-Link cards and wearables upgrade classic stored-value convenience with account-based digital management. Pair your 16-digit CAN ID in the SimplyGo app to top up from anywhere, activate Auto Top-Up, view detailed fare breakdowns, and block lost cards remotely.',
    image: '/src/assets/images/card_ezlink_charms_1795678194764.jpg',
    imageAlt: 'SimplyGo EZ-Link smart cards and compact geometric transit charms',
    featured: true,
    highlights: [
      'Remote top-up via PayNow, credit/debit cards, or Auto Top-Up',
      'Instant card blocking in the SimplyGo app if misplaced',
      'Accepted on all MRT/LRT lines, public buses, and 30,000+ retail points',
      'Available in standard cards and compact keychain charms',
    ],
    eligibility: 'Open to all commuters, residents, and visitors',
    whereToGet: 'SimplyGo Ticket Offices, TransitLink Kiosks, 7-Eleven, Cheers, and official online stores',
    cardFee: 'S$10 (includes S$5 card cost and S$5 stored value)',
  },
  {
    id: 'contactless-bank',
    title: 'Contactless Bank Cards & Mobile Wallets',
    category: 'Pay-As-You-Ride',
    shortDesc:
      'Use your Mastercard, Visa, NETS Contactless card, or mobile wallet directly at fare gates without carrying a separate transit card.',
    fullDesc:
      'Ride straight onto buses and trains with your existing contactless credit or debit card, Apple Pay, Google Pay, or Samsung Pay. Fares are aggregated and posted cleanly to your bank statement, while detailed per-trip history appears in your SimplyGo app.',
    image: '/src/assets/images/card_bank_tap_1795678195256.jpg',
    imageAlt: 'Smartphone contactless tap at a public bus fare reader',
    highlights: [
      'No upfront card purchase or top-ups required',
      'Adult public transport fares identical to stored-value cards',
      'Supports physical contactless cards, phones, and smartwatches',
      'Submit fare claims and inspect consolidated trip statements in-app',
    ],
    eligibility: 'Holders of Singapore-issued or overseas contactless Mastercard, Visa, and NETS cards',
    whereToGet: 'Add your eligible bank card directly inside the SimplyGo app',
    cardFee: 'No card fee (standard adult distance fares apply; S$0.60/day admin fee applies only to foreign-issued bank cards)',
  },
  {
    id: 'concession-cards',
    title: 'Concession & Monthly Travel Cards',
    category: 'Subsidised Fares',
    shortDesc:
      'Subsidised transit cards and Monthly Concession Passes for students, seniors, NSFs, Workfare recipients, persons with disabilities, and adult commuters.',
    fullDesc:
      'SimplyGo administers Singapore public transport concession schemes so eligible residents enjoy capped or discounted fares across rail and bus journeys. Apply, replace lost cards, or purchase Monthly Concession Passes directly through the SimplyGo app.',
    image: '/src/assets/images/hero_mrt_commuter_1795678195800.jpg',
    imageAlt: 'Singapore commuters boarding MRT train at concourse',
    highlights: [
      'Covers School Smart Cards, Poly/Uni, Senior Citizen, PAssion Silver, NSF, and PWD cards',
      'Purchase or renew Monthly Concession Passes digitally',
      'Upgrade existing Concession cards to SimplyGo at kiosks or in-app',
      'Up to 50% off standard adult fares plus capped journey rates',
    ],
    eligibility: 'Singapore Citizens and Permanent Residents meeting scheme criteria',
    whereToGet: 'Apply via the SimplyGo App or SimplyGo Ticket Offices at major MRT interchanges',
    cardFee: 'Free first issuance for eligible students; S$8.10 card cost + S$5 personalisation for adult/concession replacements',
  },
  {
    id: 'ezlink-motoring',
    title: 'EZ-Link Motoring & Wallet',
    category: 'Drivers & Lifestyle',
    shortDesc:
      'Automated ERP and carpark payments paired with EZ-Link Wallet rewards and QR merchant acceptance.',
    fullDesc:
      'Manage both your daily commute and driving expenses under one roof. Link your CEPAS-compliant EZ-Link Motoring card for Electronic Road Pricing (ERP) and Electronic Parking System (EPS) gantry deductions, and earn reward points across transit and retail.',
    image: '/src/assets/images/campaign_rewards_city_1795678195454.jpg',
    imageAlt: 'Singapore city skyline and urban mobility corridor at dusk',
    highlights: [
      'Automatic top-ups for EZ-Link Motoring cards used in OBU/IU units',
      'Track ERP and carpark expenditure alongside transit trips',
      'Redeem Ride to Rewards points for transit credits and partner vouchers',
      'Scan & pay at participating hawker centres and retail outlets',
    ],
    eligibility: 'Motorists and EZ-Link Wallet users in Singapore',
    whereToGet: 'SimplyGo App, petrol stations, and authorised automotive retailers',
    cardFee: 'S$10 (includes S$5 stored value)',
  },
];

export const MRT_STATIONS: StationStop[] = [
  { id: 'jurong-east', name: 'Jurong East', line: 'NSL / EWL', code: 'NS1 / EW24', kmFromOrigin: 0 },
  { id: 'clementi', name: 'Clementi', line: 'EWL', code: 'EW23', kmFromOrigin: 4.1 },
  { id: 'buona-vista', name: 'Buona Vista', line: 'EWL / CCL', code: 'EW21 / CC22', kmFromOrigin: 7.4 },
  { id: 'botanic-gardens', name: 'Botanic Gardens', line: 'DTL / CCL', code: 'DT9 / CC19', kmFromOrigin: 10.6 },
  { id: 'orchard', name: 'Orchard', line: 'NSL / TEL', code: 'NS22 / TE14', kmFromOrigin: 13.8 },
  { id: 'dhoby-ghaut', name: 'Dhoby Ghaut', line: 'NSL / NEL / CCL', code: 'NS24 / NE6', kmFromOrigin: 15.9 },
  { id: 'city-hall', name: 'City Hall', line: 'NSL / EWL', code: 'NS25 / EW13', kmFromOrigin: 17.1 },
  { id: 'raffles-place', name: 'Raffles Place', line: 'NSL / EWL', code: 'NS26 / EW14', kmFromOrigin: 18.2 },
  { id: 'bugis', name: 'Bugis', line: 'EWL / DTL', code: 'EW12 / DT14', kmFromOrigin: 19.6 },
  { id: 'paya-lebar', name: 'Paya Lebar', line: 'EWL / CCL', code: 'EW8 / CC9', kmFromOrigin: 23.9 },
  { id: 'tampines', name: 'Tampines', line: 'EWL / DTL', code: 'EW2 / DT32', kmFromOrigin: 30.8 },
  { id: 'changi-airport', name: 'Changi Airport', line: 'EWL', code: 'CG2', kmFromOrigin: 36.4 },
];

export const INITIAL_CARD_PRESETS: CardPreset[] = [
  {
    can: '1004 8821 0943 5512',
    label: 'Daily Commute EZ-Link',
    cardType: 'SimplyGo EZ-Link Card',
    holderName: 'Tan Wei Ming',
    balance: 28.45,
    autoTopUp: true,
    autoTopUpAmount: 30,
    status: 'Active',
    expiry: '08/2030',
    transactions: [
      { id: 'tx1', date: 'Today', time: '08:42', description: 'Clementi MRT → Raffles Place MRT', mode: 'MRT', amount: -1.79 },
      { id: 'tx2', date: 'Yesterday', time: '18:25', description: 'Raffles Place MRT → Clementi MRT', mode: 'MRT', amount: -1.79 },
      { id: 'tx3', date: 'Yesterday', time: '12:14', description: 'FairPrice Finest Tanjong Pagar', mode: 'Retail', amount: -12.6 },
      { id: 'tx4', date: '22 Nov', time: '09:05', description: 'Bus 96 · Clementi Ave 3 → NUS', mode: 'Bus', amount: -1.09 },
      { id: 'tx5', date: '20 Nov', time: '17:50', description: 'Auto Top-Up via PayNow', mode: 'Top-Up', amount: 30.0 },
    ],
  },
  {
    can: '1110 3490 7721 1088',
    label: 'PAssion Silver Card',
    cardType: 'SimplyGo Senior Citizen Concession',
    holderName: 'Lim Ah Huat',
    balance: 16.9,
    autoTopUp: false,
    autoTopUpAmount: 20,
    status: 'Active',
    expiry: '12/2029',
    transactions: [
      { id: 'stx1', date: 'Today', time: '07:55', description: 'Tampines MRT → Bugis MRT', mode: 'MRT', amount: -0.96 },
      { id: 'stx2', date: '23 Nov', time: '14:10', description: 'Bus 23 · Tampines Int → Bedok', mode: 'Bus', amount: -0.69 },
      { id: 'stx3', date: '19 Nov', time: '10:30', description: 'SimplyGo App Top-Up', mode: 'Top-Up', amount: 20.0 },
    ],
  },
  {
    can: '1009 5512 6304 9920',
    label: 'Monthly Travel Pass',
    cardType: 'Adult Monthly Travel Card',
    holderName: 'Nurul Aisyah',
    balance: 14.2,
    autoTopUp: true,
    autoTopUpAmount: 20,
    status: 'Active',
    expiry: '04/2031',
    transactions: [
      { id: 'mtx1', date: 'Today', time: '09:12', description: 'Paya Lebar MRT → Orchard MRT (Pass Covered)', mode: 'MRT', amount: 0.0 },
      { id: 'mtx2', date: 'Yesterday', time: '19:03', description: 'Bus 14 · Orchard → Paya Lebar (Pass Covered)', mode: 'Bus', amount: 0.0 },
      { id: 'mtx3', date: '01 Nov', time: '00:05', description: 'Monthly Travel Pass Renewal (30 Days)', mode: 'Retail', amount: -128.0 },
    ],
  },
];

export const CONCESSION_PROFILES: ConcessionProfile[] = [
  {
    id: 'student',
    group: 'Primary, Secondary & JC Students',
    cardName: 'School Smart Card (SimplyGo)',
    monthlyPassPrice: 'S$24.00 (Primary) – S$54.00 (Poly/JC)',
    perRideDiscount: 'Up to 65% off adult distance fares (capped at 7.2 km)',
    eligibility: 'Full-time students in MOE primary, secondary, junior college, or ITE institutions.',
    applySteps: [
      'Issued directly through your school or apply via SimplyGo App for lost-card replacement.',
      'Link the 16-digit CAN ID in the SimplyGo App to monitor rides and activate Auto Top-Up.',
      'Purchase Monthly Concession Passes anytime in-app without visiting a kiosk.',
    ],
  },
  {
    id: 'tertiary',
    group: 'Polytechnic & University Students',
    cardName: 'Diploma / Undergraduate Concession Card',
    monthlyPassPrice: 'S$54.00 (Bus/Train Hybrid) · S$90.50 (Unlimited)',
    perRideDiscount: 'Capped student distance fares on basic bus and rail trips',
    eligibility: 'Full-time matriculated students at Singapore Polytechnics, NUS, NTU, SMU, SUTD, SIT, SUSS, or eligible PEIs.',
    applySteps: [
      'Log in to the SimplyGo App with Singpass and select "Apply for Concession Card".',
      'Upload a passport-sized digital photo and confirm your institution enrolment.',
      'Receive your card by mail within 5 working days or collect at a SimplyGo Ticket Office.',
    ],
  },
  {
    id: 'senior',
    group: 'Senior Citizens (60+)',
    cardName: 'PAssion Silver / Senior Citizen Concession Card',
    monthlyPassPrice: 'S$58.00 (Unlimited Bus & Train)',
    perRideDiscount: 'Lowered senior fares from S$0.69 plus off-peak savings',
    eligibility: 'Singapore Citizens and Permanent Residents aged 60 years and above.',
    applySteps: [
      'Eligible Citizens receive an invitation pack around their 60th birthday to apply via Singpass or Community Centres.',
      'Already holding a PAssion Silver card? Tap it at any SimplyGo Kiosk to upgrade to SimplyGo features.',
      'Manage pass renewals and view monthly savings right inside the SimplyGo App.',
    ],
  },
  {
    id: 'nsf',
    group: 'Full-Time National Servicemen',
    cardName: 'NSF Concession Card',
    monthlyPassPrice: 'S$90.50 (Hybrid) · S$55.50 (Bus) · S$45.00 (Train)',
    perRideDiscount: 'Flat adult travel pass savings for high-frequency daily commutes',
    eligibility: 'Full-time National Servicemen serving in SAF, SPF, or SCDF.',
    applySteps: [
      'Apply via the SimplyGo App using Singpass once your enlistment status is updated.',
      'Select your preferred pass tier and pay via PayNow or bank card.',
      'Activate your card at any SimplyGo Kiosk or Ticket Office upon delivery.',
    ],
  },
  {
    id: 'workfare',
    group: 'Workfare & Persons with Disabilities',
    cardName: 'Workfare Transport / PWD Concession Card',
    monthlyPassPrice: 'S$58.00 (PWD) · S$96.00 (Workfare)',
    perRideDiscount: '15% to 50% off adult fares on public buses and MRT/LRT',
    eligibility: 'Singapore Citizens under the Workfare Income Supplement scheme or certified Persons with Disabilities.',
    applySteps: [
      'Workfare recipients receive automated eligibility verification via Singpass in the SimplyGo App.',
      'PWD applicants can submit certification via SG Enable or the SimplyGo online portal.',
      'Enjoy instant card protection and remote family top-ups once linked in the app.',
    ],
  },
];

export const NEWSROOM_DATA: NewsArticle[] = [
  {
    id: 'enhanced-app-unification',
    category: 'Campaigns',
    date: '18 Nov 2026',
    readTime: '3 min read',
    title: 'All EZ-Link & TransitLink features now unified in the enhanced SimplyGo App',
    summary:
      'Commuters can manage travel cards, apply for concession passes, block lost cards, and redeem Ride to Rewards perks from a single mobile app.',
    body: [
      'SimplyGo has completed the unification of EZ-Link and TransitLink digital services into one seamless SimplyGo App experience for Singapore commuters.',
      'Whether you tap with a SimplyGo EZ-Link card, a Concession Card, a contactless bank card, or an EZ-Link Motoring card, every transaction, top-up, and claim is accessible inside a single dashboard.',
      'Legacy app users only need to sign in with their existing mobile number or Singpass to carry over linked cards, Auto Top-Up mandates, and accumulated reward points.',
    ],
    image: '/src/assets/images/hero_mrt_commuter_1795678195800.jpg',
    imageAlt: 'Commuters using SimplyGo at a Singapore MRT station',
  },
  {
    id: 'heritage-charms-drop',
    category: 'Cards & Charms',
    date: '10 Nov 2026',
    readTime: '2 min read',
    title: 'Collectible Transit Charms: Geometric Heritage Series now at MRT kiosks',
    summary:
      'Compact tap-and-go keychains designed for backpacks and lanyards, pre-enabled with SimplyGo remote top-up support.',
    body: [
      'The new Geometric Heritage Series transit charms combine durable matte resin construction with full SimplyGo EZ-Link contactless functionality.',
      'Each charm includes a unique 16-digit CAN printed on its backing card so commuters can immediately pair it in the SimplyGo App for balance alerts and instant lost-item blocking.',
      'Available at selected SimplyGo Ticket Offices and vending machines across Dhoby Ghaut, Orchard, Tampines, and Jurong East MRT stations while stocks last.',
    ],
    image: '/src/assets/images/card_ezlink_charms_1795678194764.jpg',
    imageAlt: 'Geometric contactless transit charms and smart cards',
  },
  {
    id: 'ride-to-rewards-q4',
    category: 'Campaigns',
    date: '02 Nov 2026',
    readTime: '3 min read',
    title: 'Ride to Rewards: Earn double points on off-peak MRT and bus journeys',
    summary:
      'Commuters using linked SimplyGo EZ-Link cards or bank cards earn 2x reward points on weekday trips before 7:45am.',
    body: [
      'Start your morning commute earlier and earn double SimplyGo Rewards points on every eligible bus and rail tap-in before 7:45am on weekdays.',
      'Points accumulate automatically in the SimplyGo App and can be redeemed for S$2, S$5, or S$10 transit credits as well as lifestyle partner e-vouchers.',
      'Ensure your primary transit card or contactless bank card is added to your SimplyGo account to start collecting automatically.',
    ],
    image: '/src/assets/images/campaign_rewards_city_1795678195454.jpg',
    imageAlt: 'Singapore Marina Bay skyline at dusk',
  },
  {
    id: 'card-upgrade-advisory',
    category: 'Service Advisories',
    date: '25 Oct 2026',
    readTime: '2 min read',
    title: 'Advisory: Upgrading older CEPAS EZ-Link cards at SimplyGo Kiosks',
    summary:
      'Tap older EZ-Link or Concession cards at any SimplyGo Kiosk for a 15-second upgrade to enable remote top-ups and in-app trip history.',
    body: [
      'Older CEPAS-based EZ-Link and Concession cards can be upgraded free of charge at any SimplyGo Kiosk located across all MRT stations and bus interchanges.',
      'Once upgraded, your card retains its existing stored value and concession entitlements while unlocking mobile top-ups, instant card blocking, and real-time fare notifications.',
      'Note that motorists using an EZ-Link card solely in an IU or OBU for ERP and parking should continue using a CEPAS EZ-Link Motoring card.',
    ],
    image: '/src/assets/images/card_bank_tap_1795678195256.jpg',
    imageAlt: 'Contactless reader tap inside public transit',
  },
];

export const TICKET_OFFICES: TicketOffice[] = [
  {
    id: 'dhoby',
    station: 'Dhoby Ghaut MRT (NS24 / NE6 / CC1)',
    region: 'Central',
    locationDetail: 'Concourse near Exit B, beside Passenger Service Centre',
    hours: 'Daily · 10:00am – 6:00pm (Closed 2:00pm – 2:45pm)',
    services: 'Concession applications, card replacements, refunds, SimplyGo upgrades',
  },
  {
    id: 'raffles',
    station: 'Raffles Place MRT (NS26 / EW14)',
    region: 'Central',
    locationDetail: 'B1 Concourse near Exit A & B fare gates',
    hours: 'Mon – Fri · 10:00am – 6:00pm',
    services: 'Adult Monthly Travel Cards, corporate enquiries, SimplyGo upgrades',
  },
  {
    id: 'jurong',
    station: 'Jurong East MRT (NS1 / EW24)',
    region: 'West',
    locationDetail: 'Ground Level Concourse adjacent to Bus Interchange linkway',
    hours: 'Daily · 10:00am – 6:00pm',
    services: 'Full concession counter, Workfare & PAssion Silver card services',
  },
  {
    id: 'boon-lay',
    station: 'Boon Lay Bus Interchange',
    region: 'West',
    locationDetail: 'Main concourse next to Berth B5',
    hours: 'Daily · 10:00am – 6:00pm',
    services: 'School Smart Card replacements, Senior passes, top-up assistance',
  },
  {
    id: 'tampines',
    station: 'Tampines MRT (EW2 / DT32)',
    region: 'East',
    locationDetail: 'EWL Concourse near Exit A',
    hours: 'Daily · 10:00am – 6:00pm',
    services: 'Concession applications, card upgrades, lost card refunds',
  },
  {
    id: 'bedok',
    station: 'Bedok Bus Interchange',
    region: 'East',
    locationDetail: 'Air-conditioned concourse near MRT escalator link',
    hours: 'Mon – Sat · 10:00am – 6:00pm',
    services: 'PAssion Silver applications, Monthly Concession Pass renewals',
  },
  {
    id: 'woodlands',
    station: 'Woodlands MRT (NS9 / TE2)',
    region: 'North',
    locationDetail: 'NSL Concourse near Causeway Point link',
    hours: 'Daily · 10:00am – 6:00pm',
    services: 'Full SimplyGo Ticket Office & 24-hour Self-Service Kiosks',
  },
  {
    id: 'ang-mo-kio',
    station: 'Ang Mo Kio Bus Interchange',
    region: 'North',
    locationDetail: 'Central concourse beside Berth 1',
    hours: 'Daily · 10:00am – 6:00pm',
    services: 'Student, Senior, and NSF concession support',
  },
  {
    id: 'serangoon',
    station: 'Serangoon MRT (NE12 / CC13)',
    region: 'North-East',
    locationDetail: 'NEX basement concourse near NEL fare gates',
    hours: 'Daily · 10:00am – 6:00pm',
    services: 'Concession applications, card replacements, SimplyGo upgrades',
  },
  {
    id: 'sengkang',
    station: 'Sengkang MRT (NE16 / STC)',
    region: 'North-East',
    locationDetail: 'Ground concourse next to Compass One entrance',
    hours: 'Mon – Sat · 10:00am – 6:00pm',
    services: 'School Smart Cards, Senior cards, Self-Service Kiosks',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'SimplyGo App & Account',
    question: 'Why did the desktop SimplyGo Portal move into the SimplyGo App?',
    answer:
      'All account-based ticketing, card top-ups, concession applications, and EZ-Link Wallet services have been consolidated into the enhanced SimplyGo mobile app (iOS and Android) to provide instant push fare alerts, NFC balance checks, and biometric Singpass login.',
  },
  {
    id: 'faq-2',
    category: 'Cards & Upgrades',
    question: 'Do I have to upgrade my existing EZ-Link or Concession card to SimplyGo?',
    answer:
      'Concession Card holders continue to enjoy subsidised fares regardless of card type. Upgrading to a SimplyGo card at any SimplyGo Kiosk is free and lets you top up remotely, check ride history on your phone, and block your card instantly if lost.',
  },
  {
    id: 'faq-3',
    category: 'Bank Cards',
    question: 'Why do I see a single consolidated charge on my bank statement instead of per-trip amounts?',
    answer:
      'Contactless bank card fares (Visa, Mastercard, Apple Pay, Google Pay) are accumulated over 1 to 5 days and posted as a combined transit charge to reduce statement clutter. You can inspect every individual bus and train tap inside the SimplyGo App.',
  },
  {
    id: 'faq-4',
    category: 'Lost Cards',
    question: 'What should I do if I lose my SimplyGo EZ-Link or Concession Card?',
    answer:
      'Open the SimplyGo App immediately, select your card, and tap "Block Card". Your remaining stored value is protected from the moment the block takes effect and can be refunded or transferred to a replacement card.',
  },
  {
    id: 'faq-5',
    category: 'Fare Claims',
    question: 'How do I submit a fare claim if I forgot to tap out or was overcharged?',
    answer:
      'In the SimplyGo App, navigate to your transaction history, select the affected journey, and tap "Submit Fare Claim" within 30 days of the trip. Approved adjustments are credited directly back to your card or bank account.',
  },
];
