export interface CardSub {
  amount: number;
  spend: number;
  months: number;
  text: string;
}

export interface CardMultipliers {
  dining?: number;
  groceries?: number;
  travel?: number;
  streaming?: number;
  gas?: number;
  general?: number;
  drugstores?: number;
  transit?: number;
  entertainment?: number;
  rent?: number;
}

export interface CardBenefit {
  id: string;
  name: string;
  value: number;
  isDefault?: boolean;
}

export interface Card {
  id: string;
  name: string;
  annualFee: number;
  multipliers: CardMultipliers;
  credits: number;
  defaultEstimatedCredits?: number;
  creditBreakdown?: string;
  sub?: CardSub;
  pointValue: number;
  brand: string;
  color: string;
  tier: string;
  detailedBenefits?: CardBenefit[];
}

export const creditCards: Card[] = [
  // --- Premium Tier ---
  {
    id: 'amex_platinum',
    name: 'The Platinum Card® from American Express',
    annualFee: 895,
    multipliers: {
      travel: 5,
      dining: 1,
      groceries: 1,
      gas: 1,
      streaming: 1,
      general: 1
    },
    credits: 2884,
    defaultEstimatedCredits: 1000, 
    creditBreakdown: "Over $2,800 in value via Hotel, Resy, Uber, Lululemon, and more.",
    sub: {
        amount: 80000,
        spend: 8000,
        months: 6,
        text: "80,000 pts after $8k in 6 months"
    },
    pointValue: 0.02, 
    brand: 'Amex',
    color: '#e5e7eb',
    tier: 'Premium',
    detailedBenefits: [
      { id: 'airline_credit', name: 'Airline Fee Credit', value: 200, isDefault: true },
      { id: 'hotel_credit', name: 'Hotel Credit ($300 semi-annual)', value: 600, isDefault: true },
      { id: 'uber_cash', name: 'Uber Cash ($15/mo + $20 Dec)', value: 200, isDefault: true },
      { id: 'resy_credit', name: 'Resy Credit ($100/qtr)', value: 400, isDefault: false },
      { id: 'lululemon', name: 'Lululemon Credit ($75/qtr)', value: 300, isDefault: false },
      { id: 'digital_ent', name: 'Digital Entertainment ($25/mo)', value: 300, isDefault: false },
      { id: 'equinox', name: 'Equinox Credit', value: 300, isDefault: false },
      { id: 'oura_ring', name: 'Oura Ring Credit', value: 200, isDefault: false },
      { id: 'clear', name: 'CLEAR Plus Credit', value: 209, isDefault: false },
      { id: 'walmart_plus', name: 'Walmart+ Credit ($12.95/mo)', value: 155, isDefault: false },
      { id: 'uber_one', name: 'Uber One Credit', value: 120, isDefault: false },
      { id: 'saks', name: 'Saks Fifth Ave ($50/6mo)', value: 100, isDefault: false }
    ]
  },
  {
    id: 'chase_sapphire_reserve',
    name: 'Chase Sapphire Reserve®',
    annualFee: 795,
    multipliers: {
      dining: 3,
      travel: 4, // 4x on flights/hotels direct
      groceries: 1,
      streaming: 1,
      gas: 1,
      general: 1
    },
    credits: 1548, // Sum of potential credits
    defaultEstimatedCredits: 720, // Dining (300) + DoorDash (300) + Lyft (120)
    creditBreakdown: "$300 Dining Credit + $300 DoorDash + StubHub, Apple, Lyft, Peloton benefits.",
    sub: {
        amount: 125000,
        spend: 6000,
        months: 3,
        text: "125,000 pts after $6k in 3 months"
    },
    pointValue: 0.02, 
    brand: 'Chase',
    color: '#60a5fa', 
    tier: 'Premium',
    detailedBenefits: [
        { id: 'dining_credit', name: 'Annual Dining Credit (OpenTable)', value: 300, isDefault: true },
        { id: 'doordash_promo', name: 'DoorDash Promos ($25/mo)', value: 300, isDefault: true },
        { id: 'lyft_credit', name: 'Lyft Credit ($10/mo)', value: 120, isDefault: true },
        { id: 'stubhub_credit', name: 'StubHub Credit', value: 300, isDefault: false },
        { id: 'apple_credit', name: 'Apple TV/Music Credit', value: 288, isDefault: false },
        { id: 'peloton_credit', name: 'Peloton Credit ($10/mo)', value: 120, isDefault: false },
        { id: 'dashpass_val', name: 'DashPass Membership Value', value: 120, isDefault: false }
    ]
  },
  {
    id: 'cap_one_venture_x',
    name: 'Capital One Venture X',
    annualFee: 395,
    multipliers: {
      travel: 5,
      dining: 2,
      groceries: 2,
      gas: 2,
      streaming: 2,
      general: 2
    },
    credits: 520, 
    defaultEstimatedCredits: 400,
    creditBreakdown: "$300 Travel Credit + 10k Miles + Global Entry",
    sub: {
        amount: 75000,
        spend: 4000,
        months: 3,
        text: "75,000 miles after $4k in 3 months"
    },
    pointValue: 0.017,
    brand: 'Capital One',
    color: '#94a3b8', 
    tier: 'Premium',
    detailedBenefits: [
        { id: 'travel_credit', name: 'Annual Travel Credit', value: 300, isDefault: true },
        { id: 'anniversary_miles', name: '10k Anniversary Miles', value: 100, isDefault: true },
        { id: 'global_entry', name: 'Global Entry/TSA PreCheck ($120/4yrs)', value: 30, isDefault: false }
    ]
  },

  // --- Mid Tier ---
  {
    id: 'amex_gold',
    name: 'American Express® Gold Card',
    annualFee: 325,
    multipliers: {
      dining: 4,
      groceries: 4,
      travel: 3,
      streaming: 1,
      gas: 1,
      general: 1
    },
    credits: 424, 
    defaultEstimatedCredits: 240, 
    creditBreakdown: "$120 Uber Cash + $120 Dining Credit. (Resy & Dunkin credits excluded from conservative est.)",
    sub: {
        amount: 60000,
        spend: 6000,
        months: 6,
        text: "60,000 pts after $6k in 6 months"
    },
    pointValue: 0.02, 
    brand: 'Amex',
    color: '#eab308',
    tier: 'Mid',
    detailedBenefits: [
        { id: 'uber_cash', name: 'Uber Cash ($10/mo)', value: 120, isDefault: true },
        { id: 'dining_credit', name: 'Dining Credit ($10/mo)', value: 120, isDefault: true },
        { id: 'resy_credit', name: 'Resy Credit ($50/6mo)', value: 100, isDefault: false },
        { id: 'dunkin_credit', name: 'Dunkin Credit ($7/mo)', value: 84, isDefault: false }
    ]
  },
  {
    id: 'chase_sapphire_preferred',
    name: 'Chase Sapphire Preferred®',
    annualFee: 95,
    multipliers: {
      dining: 3,
      travel: 2,
      streaming: 3,
      groceries: 3, 
      gas: 1,
      general: 1
    },
    credits: 50,
    defaultEstimatedCredits: 50,
    creditBreakdown: "$50 Hotel Credit + 10% Anniv. Boost + 5x Lyft/Peloton",
    sub: {
        amount: 75000,
        spend: 5000,
        months: 3,
        text: "75,000 pts after $5k in 3 months"
    },
    pointValue: 0.0125, // CSP points often valued at 1.25c on portal? Or 1.25c for travel? Base is 1c, portal 1.25. 
    // Wait, existing file has pointValue: 0.02 for CSP. Why?
    // User or I set 2c/pt for Chase/Amex points usually (transfer partners).
    // I'll keep pointValue: 0.02 as is consistent with other Hyatt/Transfer valuations.
    brand: 'Chase',
    color: '#38bdf8',
    tier: 'Mid',
    detailedBenefits: [
        { id: 'hotel_credit', name: 'Annual Hotel Credit (via Portal)', value: 50, isDefault: true },
        { id: 'dashpass_promo', name: 'DashPass Promo ($10/mo)', value: 120, isDefault: true },
        { id: 'dashpass_membership', name: 'DashPass Membership Value', value: 120, isDefault: false }
    ]
  },
  {
    id: 'citi_strata_premier',
    name: 'Citi Strata Premier℠',
    annualFee: 95,
    multipliers: {
      dining: 3,
      groceries: 3,
      gas: 3,
      travel: 3,
      streaming: 1,
      general: 1
    },
    credits: 100, 
    defaultEstimatedCredits: 100,
    creditBreakdown: "$100 Annual Hotel Benefit (on $500+ stay)",
    sub: {
        amount: 60000,
        spend: 4000,
        months: 3,
        text: "60,000 pts after $4k in 3 months"
    },
    pointValue: 0.017, 
    brand: 'Citi',
    color: '#2dd4bf', 
    tier: 'Mid',
    detailedBenefits: [
        { id: 'hotel_credit', name: 'Annual Hotel Credit ($100 off $500+)', value: 100, isDefault: true }
    ]
  },
  
  // --- Low / No Fee ---
  {
    id: 'amex_blue_cash_preferred',
    name: 'Blue Cash Preferred® Card',
    annualFee: 95,
    multipliers: {
      groceries: 6,
      streaming: 6,
      gas: 3,
      transit: 3,
      dining: 1,
      travel: 1,
      general: 1,
    },
    credits: 0, 
    defaultEstimatedCredits: 0,
    creditBreakdown: "$10/mo Disney Bundle (Subject to enrollment) - Optional",
    sub: {
        amount: 25000, // 250 = 25000cents
        spend: 3000,
        months: 6,
        text: "$250 after $3k in 6 months"
    },
    pointValue: 0.01,
    brand: 'Amex',
    color: '#0284c7',
    tier: 'Mid',
    detailedBenefits: [
        { id: 'disney_bundle', name: 'Disney Bundle Credit ($10/mo)', value: 120, isDefault: false }
    ]
  },
  {
    id: 'cap_one_savor_one',
    name: 'Capital One SavorOne (2025)',
    annualFee: 39,
    multipliers: {
      dining: 3,
      groceries: 3,
      streaming: 3,
      entertainment: 3,
      travel: 1,
      gas: 1,
      general: 1
    },
    credits: 0,
    defaultEstimatedCredits: 0,
    creditBreakdown: "None",
    sub: {
        amount: 20000, // $200
        spend: 1000,
        months: 3,
        text: "$200 after $1000 in 3 months"
    },
    pointValue: 0.01, 
    brand: 'Capital One',
    color: '#ea580c',
    tier: 'Entry'
  },
  {
    id: 'wells_fargo_autograph',
    name: 'Wells Fargo Autograph℠',
    annualFee: 0,
    multipliers: {
      dining: 3,
      travel: 3,
      gas: 3,
      transit: 3,
      streaming: 3,
      groceries: 1,
      general: 1
    },
    credits: 0,
    defaultEstimatedCredits: 0,
    creditBreakdown: "None",
    sub: {
        amount: 20000, // $200
        spend: 1000,
        months: 3,
        text: "20,000 pts after $1k in 3 months"
    },
    pointValue: 0.01, 
    brand: 'Wells Fargo',
    color: '#dc2626',
    tier: 'Entry'
  },
  {
    id: 'bilt_mastercard',
    name: 'Bilt Mastercard®',
    annualFee: 0,
    multipliers: {
      dining: 3,
      travel: 2,
      rent: 1, 
      groceries: 1,
      general: 1
    },
    credits: 0,
    defaultEstimatedCredits: 0,
    creditBreakdown: "Rent Day benefits",
    pointValue: 0.02,
    brand: 'Bilt',
    color: '#f8fafc', 
    tier: 'Entry'
  },
  {
    id: 'chase_freedom_unlimited',
    name: 'Chase Freedom Unlimited®',
    annualFee: 0,
    multipliers: {
      dining: 3,
      drugstores: 3,
      general: 1.5,
      travel: 5, 
      groceries: 1,
      streaming: 1,
      gas: 1
    },
    credits: 0,
    defaultEstimatedCredits: 0,
    creditBreakdown: "None",
    sub: {
        amount: 20000, // $200
        spend: 500,
        months: 3,
        text: "$200 after $500 in 3 months"
    },
    pointValue: 0.01, 
    brand: 'Chase',
    color: '#94a3b8', 
    tier: 'Entry'
  },
  {
    id: 'citi_double_cash',
    name: 'Citi® Double Cash Card',
    annualFee: 0,
    multipliers: {
      general: 2,
      dining: 1,
      groceries: 1,
      travel: 1,
      streaming: 1,
      gas: 1
    },
    credits: 0,
    defaultEstimatedCredits: 0,
    creditBreakdown: "None",
    pointValue: 0.01,
    brand: 'Citi',
    color: '#14b8a6',
    tier: 'Entry'
  }
];
