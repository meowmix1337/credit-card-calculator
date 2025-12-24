import React, { useMemo, useState } from 'react';
import { creditCards } from '../data/cards';

const Recommendation = ({ lifestyle }) => {
  const [showAll, setShowAll] = useState(false);

  const recommendations = useMemo(() => {
    // 1. Calculate value for each card based on lifestyle
    const scoredCards = creditCards.map(card => {
      // Annualized spend
      const diningSpend = (parseFloat(lifestyle.monthlyDining) || 0) * 12;
      const grocerySpend = (parseFloat(lifestyle.monthlyGroceries) || 0) * 12;
      const travelSpend = (parseFloat(lifestyle.monthlyTravel) || 0) * 12;
      const streamingSpend = (parseFloat(lifestyle.monthlyStreaming) || 0) * 12;
      
      // Assume "general" spend is 0 for now unless we add an input for it, 
      // or we could assume a base baseline spend to make general multipliers matter.
      // Let's assume general spend is roughly 20% of categorized spend for this model.
      const totalCategorized = diningSpend + grocerySpend + travelSpend + streamingSpend;
      const generalSpend = totalCategorized * 0.2; 

      // Detailed Points Calculation for Transparency
      const breakdown = [
        { cat: 'Dining', spend: diningSpend, mult: (card.multipliers.dining || 1) },
        { cat: 'Groceries', spend: grocerySpend, mult: (card.multipliers.groceries || 1) },
        { cat: 'Travel', spend: travelSpend, mult: (card.multipliers.travel || 1) },
        { cat: 'Streaming', spend: streamingSpend, mult: (card.multipliers.streaming || 1) },
        { cat: 'General/Other', spend: generalSpend, mult: (card.multipliers.general || 1) },
      ].filter(item => item.spend > 0); // Only show categories with spend

      const points = breakdown.reduce((acc, curr) => acc + (curr.spend * curr.mult), 0);

      const pointsValue = points * card.pointValue;
      
      // Calculate Sign-up Bonus (SUB) Eligibility
      let subValue = 0;
      let isSubEligible = false;
      const totalMonthlySpend = diningSpend/12 + grocerySpend/12 + travelSpend/12 + streamingSpend/12 + generalSpend/12;

      if (card.sub) {
        // Eligibility check: Monthly Spend * months >= Requirement
        // Note: This assumes steady spending.
        if ((totalMonthlySpend * card.sub.months) >= card.sub.spend) {
            subValue = card.sub.amount * card.pointValue;
            isSubEligible = true;
        }
      }

      // Values
      // Recurring Value: Points + Credits - Annual Fee
      const recurringValue = pointsValue + (card.defaultEstimatedCredits || 0) - card.annualFee;
      
      // Year 1 Value: Recurring + SUB
      const netValue = recurringValue + subValue;

      return {
        ...card,
        netValue, // Year 1 Value for sorting
        recurringValue,
        pointsEarned: points,
        subValue,
        isSubEligible,
        pointBreakdown: breakdown
      };
    });

    // 2. Sort by Net Value descending
    return scoredCards.sort((a, b) => b.netValue - a.netValue);
  }, [lifestyle]);

  const displayedCards = showAll ? recommendations : recommendations.slice(0, 3);

  return (
    <div className="glass-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <h2>Top Recommendations</h2>
      <p style={{ marginBottom: '1.5rem', opacity: 0.7 }}>
        Based on your estimated annual spending, benefits, and <strong style={{ color: '#4ade80' }}>welcome offers</strong>.
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {displayedCards.map((card, index) => (
          <div key={card.id} className="recommendation-card" style={{ 
            borderLeft: `4px solid ${card.color}`,
            background: index === 0 ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))' : undefined
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ color: card.color, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {card.name} 
                    {index === 0 && <span style={{ background: card.color, color: '#000', fontSize: '0.7rem', padding: '0.1rem 0.5rem', borderRadius: '4px' }}>BEST</span>}
                </h3>
                {card.isSubEligible && (
                    <div style={{ fontSize: '0.8rem', color: '#4ade80', marginTop: '0.2rem', fontWeight: 'bold' }}>
                        🎉 Includes New Cardmember Offer: {card.sub.text}
                    </div>
                )}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Year 1 Value</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: card.netValue >= 0 ? '#4ade80' : '#f87171' }}>
                  {card.netValue >= 0 ? '+' : ''}${card.netValue.toFixed(0)}
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>
                   Recurring: ${card.recurringValue.toFixed(0)}/yr
                </div>
              </div>
            </div>

            {/* Value Breakdown Visualization */}
            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '0.5rem', padding: '0.75rem', fontSize: '0.9rem' }}>
                
                {/* Granular Point Math */}
                <div style={{ marginBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                   <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>How you earn (${(card.pointsEarned * card.pointValue).toFixed(0)})</div>
                   {card.pointBreakdown.map((row, i) => (
                       <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.15rem' }}>
                           <span style={{ opacity: 0.9 }}>{row.cat} (${(row.spend).toLocaleString()} @ {row.mult}x)</span>
                           <span style={{ opacity: 0.7 }}>{(row.spend * row.mult).toLocaleString()} pts</span>
                       </div>
                   ))}
                   {card.pointBreakdown.length === 0 && <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>Enter spending to see earnings.</span>}
                </div>
                
                {card.isSubEligible && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ opacity: 0.8, color: '#4ade80' }}>
                            Welcome Bonus <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>({card.sub.amount.toLocaleString()} pts @ ${card.pointValue})</span>:
                        </span>
                        <span style={{ color: '#4ade80', fontWeight: 'bold' }}>+${card.subValue.toFixed(0)}</span>
                    </div>
                )}

                {card.defaultEstimatedCredits > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ opacity: 0.8 }}>
                            Credits & Benefits <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>(Conservative Est.)</span>:
                        </span>
                        <span style={{ color: '#fbbf24' }}>+${card.defaultEstimatedCredits}</span>
                    </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.25rem', marginTop: '0.25rem' }}>
                    <span style={{ opacity: 0.8 }}>Annual Fee:</span>
                    <span style={{ color: '#f87171' }}>-${card.annualFee}</span>
                </div>
            </div>

            {card.creditBreakdown && card.creditBreakdown !== "None" && (
                <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', fontStyle: 'italic', opacity: 0.7 }}>
                    Includes: {card.creditBreakdown}
                </div>
            )}

          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button onClick={() => setShowAll(!showAll)} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              {showAll ? 'Show Less' : `View All ${recommendations.length} Cards`}
          </button>
      </div>

    </div>
  );
};

export default Recommendation;
