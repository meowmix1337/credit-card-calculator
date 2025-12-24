import React, { useMemo, useState } from "react";
import { creditCards, Card } from "../data/cards";
import { Lifestyle } from "./LifestyleQuiz";

interface RecommendationProps {
  lifestyle: Lifestyle;
}

interface BreakEvenCategory {
  label: string;
  mult: number;
  spendNeeded: number;
}

interface ScoredCard extends Card {
  netValue: number;
  recurringValue: number;
  pointsEarned: number;
  subValue: number;
  isSubEligible: boolean;
  breakEvenSpend: number;
  breakEvenBreakdown?: BreakEvenCategory[];
  effectiveMultiplier?: number;
  pointBreakdown: { cat: string; spend: number; mult: number }[];
  appliedCredits: number;
}

const Recommendation: React.FC<RecommendationProps> = ({ lifestyle }) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedBenefits, setSelectedBenefits] = useState<Record<string, boolean>>({});

  const toggleBenefit = (cardId: string, benefitId: string, value: boolean) => {
      setSelectedBenefits(prev => ({
          ...prev,
          [`${cardId}-${benefitId}`]: value
      }));
  };

  const recommendations = useMemo(() => {
    // 1. Calculate value for each card based on lifestyle
    const scoredCards: ScoredCard[] = creditCards.map((card) => {
      // Annualized spend
      // Annualized spend
      const diningSpend = (parseFloat(String(lifestyle.monthlyDining)) || 0) * 12;
      const grocerySpend = (parseFloat(String(lifestyle.monthlyGroceries)) || 0) * 12;
      const travelSpend = (parseFloat(String(lifestyle.monthlyTravel)) || 0) * 12;
      const streamingSpend = (parseFloat(String(lifestyle.monthlyStreaming)) || 0) * 12;
      const generalSpend = (parseFloat(String(lifestyle.monthlyGeneral)) || 0) * 12;

      const totalCategorized =
        diningSpend + grocerySpend + travelSpend + streamingSpend + generalSpend;

      // Detailed Points Calculation for Transparency
      const breakdown = [
        {
          cat: "Dining",
          spend: diningSpend,
          mult: card.multipliers.dining || 1,
        },
        {
          cat: "Groceries",
          spend: grocerySpend,
          mult: card.multipliers.groceries || 1,
        },
        {
          cat: "Travel",
          spend: travelSpend,
          mult: card.multipliers.travel || 1,
        },
        {
          cat: "Streaming",
          spend: streamingSpend,
          mult: card.multipliers.streaming || 1,
        },
        {
          cat: "General/Other",
          spend: generalSpend,
          mult: card.multipliers.general || 1,
        },
      ].filter((item) => item.spend > 0); // Only show categories with spend

      const points = breakdown.reduce(
        (acc, curr) => acc + curr.spend * curr.mult,
        0
      );

      const pointsValue = points * card.pointValue;

      // Calculate Sign-up Bonus (SUB) Eligibility
      let subValue = 0;
      let isSubEligible = false;
      const totalMonthlySpend =
        diningSpend / 12 +
        grocerySpend / 12 +
        travelSpend / 12 +
        streamingSpend / 12 +
        generalSpend / 12;

      // Calculate dynamic credits
      let appliedCredits = card.defaultEstimatedCredits || 0;
      if (card.detailedBenefits) {
          appliedCredits = card.detailedBenefits.reduce((acc, b) => {
              const key = `${card.id}-${b.id}`;
              const isActive = selectedBenefits[key] ?? b.isDefault ?? false;
              return acc + (isActive ? b.value : 0);
          }, 0);
      }
      
      if (card.sub) {
        // Eligibility check: Monthly Spend * months >= Requirement
        // Note: This assumes steady spending.
        if (totalMonthlySpend * card.sub.months >= card.sub.spend) {
          subValue = card.sub.amount * card.pointValue;
          isSubEligible = true;
        }
      }

      // Values
      // Recurring Value: Points + Credits - Annual Fee
      const recurringValue =
        pointsValue + appliedCredits - card.annualFee;

      // Calculate Break Even Spend
      // Net Fee = AnnualFee - credits
      const netEffectiveFee = Math.max(
        0,
        card.annualFee - appliedCredits
      );
      
      let breakEvenSpend = 0;
      let effectiveMultiplier = 1;
      const baseMultiplier = card.multipliers.general || 1;

      // Calculate Effective Multiplier based on user's spend mix
      if (points > 0 && totalCategorized > 0) {
          effectiveMultiplier = points / totalCategorized; // Avg points per dollar
      } else {
          // Fallback to general if no spend entered
          effectiveMultiplier = baseMultiplier;
      }

      if (netEffectiveFee > 0 && card.pointValue > 0) {
        // Break Even = NetFee / (PointValue * EffectiveMultiplier)
        breakEvenSpend = netEffectiveFee / (card.pointValue * effectiveMultiplier);
      }

      // Calculate Category-Specific Break Even
      const breakEvenBreakdown: BreakEvenCategory[] = [];
      if (netEffectiveFee > 0 && card.pointValue > 0) {
          const categories = [
              { label: 'Dining', mult: card.multipliers.dining || 1 },
              { label: 'Groceries', mult: card.multipliers.groceries || 1 },
              { label: 'Travel', mult: card.multipliers.travel || 1 },
              { label: 'Streaming', mult: card.multipliers.streaming || 1 },
              { label: 'General', mult: baseMultiplier },
          ];
          
          categories.forEach(cat => {
               const spendNeeded = netEffectiveFee / (card.pointValue * cat.mult);
               breakEvenBreakdown.push({
                   ...cat,
                   spendNeeded
               });
          });
      }

      // Year 1 Value: Recurring + SUB
      const netValue = recurringValue + subValue;

      return {
        ...card,
        netValue, // Year 1 Value for sorting
        recurringValue,
        pointsEarned: points,
        subValue,
        isSubEligible,
        breakEvenSpend,
        breakEvenBreakdown,
        effectiveMultiplier,
        pointBreakdown: breakdown,
        appliedCredits
      };
    });

    // 2. Sort by Net Value descending
    return scoredCards.sort((a, b) => b.netValue - a.netValue);
  }, [lifestyle, selectedBenefits]);

  const totalAnnualSpend = 
    ((parseFloat(String(lifestyle.monthlyDining)) || 0) +
    (parseFloat(String(lifestyle.monthlyGroceries)) || 0) +
    (parseFloat(String(lifestyle.monthlyTravel)) || 0) +
    (parseFloat(String(lifestyle.monthlyStreaming)) || 0) +
    (parseFloat(String(lifestyle.monthlyGeneral)) || 0)) * 12;

  const displayedCards = showAll
    ? recommendations
    : recommendations.slice(0, 3);

  return (
    <div
      className="glass-card animate-fade-in"
      style={{ animationDelay: "0.3s" }}
    >
      <h2>Top Recommendations</h2>
      <p style={{ marginBottom: "1.5rem", opacity: 0.7 }}>
        Based on your estimated annual spending, benefits, and{" "}
        <strong style={{ color: "#4ade80" }}>welcome offers</strong>.
      </p>

      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Based on estimated annual spend: </span>
        <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>${totalAnnualSpend.toLocaleString()}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {displayedCards.map((card, index) => (
          <div
            key={card.id}
            className="recommendation-card"
            style={{
              borderLeft: `4px solid ${card.color}`,
              background:
                index === 0
                  ? "linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))"
                  : undefined,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "1rem",
              }}
            >
              <div>
                <h3
                  style={{
                    color: card.color,
                    fontSize: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  {card.name}
                  {index === 0 && (
                    <span
                      style={{
                        background: card.color,
                        color: "#000",
                        fontSize: "0.7rem",
                        padding: "0.1rem 0.5rem",
                        borderRadius: "4px",
                      }}
                    >
                      BEST
                    </span>
                  )}
                </h3>
                {card.isSubEligible && (
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#4ade80",
                      marginTop: "0.2rem",
                      fontWeight: "bold",
                    }}
                  >
                    🎉 Includes New Cardmember Offer: {card.sub?.text}
                  </div>
                )}
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                  Year 1 Value
                </div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: card.netValue >= 0 ? "#4ade80" : "#f87171",
                  }}
                >
                  {card.netValue >= 0 ? "+" : ""}${card.netValue.toFixed(0)}
                </div>
                <div style={{ fontSize: "0.75rem", opacity: 0.5 }}>
                  Recurring: ${card.recurringValue.toFixed(0)}/yr
                </div>
              </div>
            </div>

            {/* Value Breakdown Visualization */}
            <div
              style={{
                background: "rgba(0,0,0,0.2)",
                borderRadius: "0.5rem",
                padding: "0.75rem",
                fontSize: "0.9rem",
              }}
            >
              {/* Granular Point Math */}
              <div
                style={{
                  marginBottom: "0.75rem",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  paddingBottom: "0.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.8rem",
                    opacity: 0.7,
                    marginBottom: "0.25rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  How you earn ($
                  {(card.pointsEarned * card.pointValue).toFixed(0)})
                </div>
                {card.pointBreakdown.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.85rem",
                      marginBottom: "0.15rem",
                    }}
                  >
                    <span style={{ opacity: 0.9 }}>
                      {row.cat} (${row.spend.toLocaleString()} @ {row.mult}x)
                    </span>
                    <span style={{ opacity: 0.7 }}>
                      {(row.spend * row.mult).toLocaleString()} pts
                    </span>
                  </div>
                ))}
                {card.pointBreakdown.length === 0 && (
                  <span style={{ fontSize: "0.8rem", opacity: 0.5 }}>
                    Enter spending to see earnings.
                  </span>
                )}
              </div>

              {card.isSubEligible && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.25rem",
                  }}
                >
                  <span style={{ opacity: 0.8, color: "#4ade80" }}>
                    Welcome Bonus{" "}
                    <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>
                      ({card.sub?.amount.toLocaleString()} pts @ $
                      {card.pointValue})
                    </span>
                    :
                  </span>
                  <span style={{ color: "#4ade80", fontWeight: "bold" }}>
                    +${card.subValue.toFixed(0)}
                  </span>
                </div>
              )}

              {(card.appliedCredits ?? 0) > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.25rem",
                  }}
                >
                  <span style={{ opacity: 0.8 }}>
                    Credits & Benefits{" "}
                    <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>
                      (Conservative Est.)
                    </span>
                    :
                  </span>
                  <span style={{ color: "#fbbf24" }}>
                    +${card.appliedCredits}
                  </span>
                </div>
              )}
              
                {/* Configurable Benefits Toggle */}
                {card.detailedBenefits && (
                    <div style={{ marginTop: '0.5rem', background: 'rgba(0,0,0,0.15)', padding: '0.5rem', borderRadius: '4px' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.25rem', opacity: 0.8, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.1rem' }}>Include Benefits:</div>
                        {card.detailedBenefits.map(b => {
                             const key = `${card.id}-${b.id}`;
                             const isActive = selectedBenefits[key] ?? b.isDefault ?? false;
                             return (
                                 <label key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', marginBottom: '0.2rem', cursor: 'pointer', opacity: isActive ? 1 : 0.6 }}>
                                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                         <input 
                                            type="checkbox" 
                                            checked={isActive} 
                                            onChange={() => toggleBenefit(card.id, b.id, !isActive)} 
                                            style={{ margin: 0, width: 'auto' }}
                                         />
                                         <span>{b.name}</span>
                                     </div>
                                     <span>${b.value}</span>
                                 </label>
                             )
                        })}
                    </div>
                )}
              
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  paddingTop: "0.25rem",
                  marginTop: "0.25rem",
                }}
              >
                <span style={{ opacity: 0.8 }}>Annual Fee:</span>
                <span style={{ color: "#f87171" }}>-${card.annualFee}</span>
              </div>

              {/* Break Even Analysis */}
              <div
                style={{
                  marginTop: "0.75rem",
                  paddingTop: "0.75rem",
                  borderTop: "1px dashed rgba(255,255,255,0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                     {card.breakEvenSpend > 0 && card.effectiveMultiplier !== (card.multipliers.general || 1) 
                        ? 'Est. Annual Break Even (Your Mix):' 
                        : 'Annual Spend to break even:'}
                  </span>
                  <span
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                      color: card.breakEvenSpend === 0 ? "#4ade80" : "inherit",
                    }}
                  >
                    {card.annualFee === 0 
                      ? "No Annual Fee"
                      : card.breakEvenSpend === 0
                        ? "Covered by Credits"
                        : `$${card.breakEvenSpend.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}`
                    }
                  </span>
                </div>
                
                {card.breakEvenSpend > 0 && (
                  <div style={{ marginTop: '0.5rem' }}>
                      <details style={{ fontSize: '0.75rem', opacity: 0.8, cursor: 'pointer' }}>
                          <summary style={{ listStyle: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <span>Show Category Breakdown</span>
                              <span style={{ opacity: 0.5, fontSize: '0.7rem' }}>▼</span>
                          </summary>
                          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '4px', marginTop: '0.25rem' }}>
                                <div style={{ marginBottom: '0.25rem', opacity: 0.7, fontStyle: 'italic' }}>If you spent ONLY on...</div>
                                {card.breakEvenBreakdown?.map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.1rem' }}>
                                        <span>{item.label} ({item.mult}x):</span>
                                        <span style={{ fontWeight: 'bold' }}>${item.spendNeeded.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                    </div>
                                ))}
                          </div>
                      </details>
                      { card.effectiveMultiplier !== (card.multipliers.general || 1) && (
                         <div style={{ fontSize: '0.7rem', opacity: 0.5, textAlign: 'right', marginTop: '0.25rem' }}>
                            (at {card.effectiveMultiplier?.toFixed(2)}x effective rate)
                         </div>
                      )}
                  </div>
                )}
              </div>
            </div>

            {(!card.detailedBenefits && card.creditBreakdown && card.creditBreakdown !== "None") && (
              <div
                style={{
                  marginTop: "0.75rem",
                  fontSize: "0.8rem",
                  fontStyle: "italic",
                  opacity: 0.7,
                }}
              >
                Includes: {card.creditBreakdown}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <button
          onClick={() => setShowAll(!showAll)}
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          {showAll ? "Show Less" : `View All ${recommendations.length} Cards`}
        </button>
      </div>
    </div>
  );
};

export default Recommendation;
