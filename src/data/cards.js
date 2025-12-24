export const creditCards = [
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
    credits: 1400,
    defaultEstimatedCredits: 500, 
    creditBreakdown: "$200 Hotel + $200 Airline + $200 Uber + $240 Digital Entertainment + $155 Walmart+",
    sub: {
        amount: 80000,
        spend: 8000,
        months: 6,
        text: "80,000 pts after $8k in 6 months"
    },
    pointValue: 0.02, 
    brand: 'Amex',
    color: '#e5e7eb',
    tier: 'Premium'
  },
  {
    id: 'chase_sapphire_reserve',
    name: 'Chase Sapphire Reserve®',
    annualFee: 795,
    multipliers: {
      dining: 3,
      travel: 3,
      groceries: 1,
      streaming: 1,
      gas: 1,
      general: 1
    },
    credits: 300,
    defaultEstimatedCredits: 300,
    creditBreakdown: "$300 Annual Travel Credit (applies automatically)",
    sub: {
        amount: 60000,
        spend: 4000,
        months: 3,
        text: "60,000 pts after $4k in 3 months"
    },
    pointValue: 0.02, 
    brand: 'Chase',
    color: '#60a5fa', // Lighter Blue (was dark #1e3a8a)
    tier: 'Premium'
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
    credits: 300, 
    defaultEstimatedCredits: 400,
    creditBreakdown: "$300 Travel Credit + 10,000 Anniversary Miles (~$100)",
    sub: {
        amount: 75000,
        spend: 4000,
        months: 3,
        text: "75,000 miles after $4k in 3 months"
    },
    pointValue: 0.017,
    brand: 'Capital One',
    color: '#94a3b8', // Lighter Slate (was #334155)
    tier: 'Premium'
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
    defaultEstimatedCredits: 424,
    creditBreakdown: "$120 Uber + $120 Dining + $100 Resy + $84 Dunkin'",
    sub: {
        amount: 60000,
        spend: 6000,
        months: 6,
        text: "60,000 pts after $6k in 6 months"
    },
    pointValue: 0.02, 
    brand: 'Amex',
    color: '#eab308',
    tier: 'Mid'
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
    creditBreakdown: "$50 Annual Hotel Benefit",
    sub: {
        amount: 60000,
        spend: 4000,
        months: 3,
        text: "60,000 pts after $4k in 3 months"
    },
    pointValue: 0.02,
    brand: 'Chase',
    color: '#38bdf8', // Sky Blue (was #0369a1)
    tier: 'Mid'
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
        amount: 70000,
        spend: 4000,
        months: 3,
        text: "70,000 pts after $4k in 3 months"
    },
    pointValue: 0.017, 
    brand: 'Citi',
    color: '#2dd4bf', // Teal (was #0f766e)
    tier: 'Mid'
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
    creditBreakdown: "$7 Monthly Disney Bundle Credit (optional)",
    sub: {
        amount: 25000, // 250 = 25000cents
        spend: 3000,
        months: 6,
        text: "$250 after $3k in 6 months"
    },
    pointValue: 0.01,
    brand: 'Amex',
    color: '#0284c7',
    tier: 'Mid'
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
    color: '#f8fafc', // White/Slate-50 (was Black #000000)
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
    color: '#94a3b8', // Slate 400
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
