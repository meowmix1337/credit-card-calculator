# Credit Card Recommender

A powerful, interactive application designed to help users maximize their credit card rewards and conduct detailed break-even analysis for premium cards. Built with **React**, **TypeScript**, and **Vite**.

![Favicon](./public/favicon.png)

## Key Features

### 1. Smart Card Recommender

**"Find the perfect card for your lifestyle."**

- **Sticky Lifestyle Profile**: Input your monthly spending (Dining, Groceries, Travel, Streaming, and General) in a persistent sidebar that stays with you as you browse.
- **Real-Time ROI**: Instantly calculating the "First Year Value" and "Recurring Annual Value" for every card based on your specific spend.
- **Total Annual Spend**: view a summary of your total analyzed spending.

### 2. Configurable Benefits & Break-Even Analysis

**"Is the annual fee worth it? See the real math."**

- **Granular Benefit Toggles**: Don't blindly accept "value". Toggle specific benefits on/off (e.g., "$120 Uber Cash", "$100 Saks Credit") to see if the card works for _you_.
- **Dynamic Math**: Unchecking a benefit immediately updates the "Net Effective Fee" and "Spend to Break Even".
- **Category Breakdown**: See exactly how much you'd need to spend in specific categories (e.g., "Dining Only") to offset the fee.

### 3. Up-to-Date Card Data

Includes the latest offers and data for major premium cards (as of late 2025/early 2026 profiles):

- **Chase Sapphire Reserve**: 125k Welcome Offer, $795 AF, new Dining/DoorDash/Apple/Lyft credits.
- **Chase Sapphire Preferred**: 75k Welcome Offer, DashPass & Lyft benefits.
- **Amex Platinum**: Detailed breakdown of 10+ credits (Hotel, Resy, SoulCycle, etc.).
- **Capital One Venture X**: Global Entry & Travel credits.
- **Citi Strata Premier**: Toggleable Hotel credit.
- **Blue Cash Preferred**: Updated Disney Bundle value.

## Technology Stack

- **Core**: React 18, TypeScript 5.7
- **Build**: Vite
- **Styling**: Vanilla CSS (Responsive, Glassmorphism design)
- **Linting**: ESLint + TypeScript-ESLint

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd credit-card-calculator
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Development

Start the local development server:

```bash
npm run dev
```

Open `http://localhost:5175` to view.

### Production Build

Type-check and build for production:

```bash
npm run build
```

Artifacts will be in the `dist/` directory.

## Project Structure

- `src/data/cards.ts`: Central database of credit card offers, multipliers, and configurable benefits.
- `src/components/Recommendation.tsx`: Core logic for scoring cards, calculating break-even, and rendering the benefit toggles.
- `src/components/LifestyleQuiz.tsx`: Sticky input form for user spending.
- `src/components/Calculator.tsx`: Standalone break-even tool (Tab 2).
