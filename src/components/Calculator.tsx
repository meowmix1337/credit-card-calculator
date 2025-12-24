import React from 'react';

export interface CalcData {
  annualFee: number;
  pointValue: number;
  earningRate: number;
}

interface CalculatorProps {
  data: CalcData;
  onChange: (data: CalcData) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof CalcData, value: string) => {
    // Prevent leading zeros by stripping them if not decimal
    // If value is empty, set to 0 or empty string
    if (value === '') {
      onChange({ ...data, [field]: '' });
      return;
    }
    const floatVal = parseFloat(value);
    onChange({ ...data, [field]: isNaN(floatVal) ? 0 : floatVal });
  };

  return (
    <div className="glass-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <h2>Card Details</h2>
      <div className="form-group">
        <label>Annual Fee ($)</label>
        <input 
          type="number" 
          value={data.annualFee} 
          onChange={(e) => handleChange('annualFee', e.target.value)}
          placeholder="e.g. 95"
        />
      </div>
      <div className="form-group">
        <label>Point Value (cents)</label>
        <input 
          type="number" 
          step="0.1"
          value={data.pointValue} 
          onChange={(e) => handleChange('pointValue', e.target.value)}
          placeholder="e.g. 1.5"
        />
        <small style={{ display: 'block', marginTop: '0.5rem', opacity: 0.7 }}>
          How much is 1 point worth? (e.g. 1c for cash back, 1.5c for travel)
        </small>
      </div>
      <div className="form-group">
        <label>Avg. Earning Rate (Points per $)</label>
        <input 
          type="number" 
          step="0.1"
          value={data.earningRate} 
          onChange={(e) => handleChange('earningRate', e.target.value)}
          placeholder="e.g. 1.0"
        />
      </div>
    </div>
  );
};

export default Calculator;
