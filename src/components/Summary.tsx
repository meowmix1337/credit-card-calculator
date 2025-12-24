import React from 'react';

import { CalcData } from './Calculator';
import { Benefit } from './BenefitsInput';

interface SummaryProps {
  calcData: CalcData;
  benefits: Benefit[];
}

const Summary: React.FC<SummaryProps> = ({ calcData, benefits }) => {
  const totalBenefits = benefits.reduce((acc, curr) => acc + curr.value, 0);
  const netEffectiveFee = Math.max(0, calcData.annualFee - totalBenefits);
  
  // Logic: 
  // 1. Calculate how many points needed to cover the Net Fee.
  //    Points = NetFee / PointValue($)
  //    Note: PointValue input is usually cents, so / 100.
  
  const pointValueDollars = calcData.pointValue / 100;
  const earningRate = calcData.earningRate;

  let breakEvenSpend = 0;
  if (earningRate > 0 && pointValueDollars > 0) {
    // Points Needed = NetEffectiveFee / PointValueDollars
    // Spend Needed = Points Needed / EarningRate
    breakEvenSpend = (netEffectiveFee / pointValueDollars) / earningRate;
  }

  // Handle case where Net Fee is 0 (or negative, covered by benefits)
  const isFeeCovered = calcData.annualFee <= totalBenefits;

  return (
    <div className="glass-card animate-fade-in" style={{ animationDelay: '0.4s', background: 'rgba(56, 189, 248, 0.1)' }}>
      <h2>Analysis Results</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <div>
          <label style={{ fontSize: '0.875rem', opacity: 0.8 }}>Total Benefits Value</label>
          <div className="result-value" style={{ fontSize: '1.5rem', color: '#4ade80' }}>
            ${totalBenefits.toFixed(2)}
          </div>
        </div>
        <div>
          <label style={{ fontSize: '0.875rem', opacity: 0.8 }}>Net Effective Fee</label>
          <div className="result-value" style={{ fontSize: '1.5rem', color: '#f87171' }}>
            ${netEffectiveFee.toFixed(2)}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <label style={{ fontSize: '0.875rem', opacity: 0.8 }}>Spend to Break Even</label>
        {isFeeCovered ? (
          <div>
            <div className="result-value" style={{ color: '#4ade80' }}>$0.00</div>
            <p style={{ fontSize: '0.9rem', color: '#86efac' }}>
              Your benefits already cover the annual fee!
            </p>
          </div>
        ) : (
          <div>
            <div className="result-value">
              ${breakEvenSpend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.5rem' }}>
              You need to spend this amount annually at {earningRate}x points to offset the remaining fee.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
