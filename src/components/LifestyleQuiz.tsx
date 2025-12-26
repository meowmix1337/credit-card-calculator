import React from 'react';

export interface Lifestyle {
  monthlyDining: number | '';
  monthlyGroceries: number | '';
  monthlyTravel: number | '';
  monthlyStreaming: number | '';
  monthlyGeneral: number | '';
  airline: string;
  redemptionStrategy: 'cash' | 'portal' | 'transfer';
}

interface LifestyleQuizProps {
  inputs: Lifestyle;
  onChange: (inputs: Lifestyle) => void;
}

const LifestyleQuiz: React.FC<LifestyleQuizProps> = ({ inputs, onChange }) => {
  const handleChange = (field: keyof Lifestyle, value: string) => {
    // Sanitize input: allow empty string, otherwise parse float
    if (value === '') {
      onChange({ ...inputs, [field]: '' });
      return;
    }
    const num = parseFloat(value);
    onChange({ ...inputs, [field]: isNaN(num) ? 0 : num });
  };

  return (
    <div className="glass-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <h2>Lifestyle Profile</h2>
      <p style={{ marginBottom: '1.5rem', color: '#94a3b8' }}>
        Enter your <strong>monthly</strong> spending estimates to find the perfect card.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label>Dining & Restaurants ($)</label>
          <input 
            type="number" 
            min="0"
            value={inputs.monthlyDining} 
            onChange={(e) => handleChange('monthlyDining', e.target.value)}
            placeholder="0"
          />
        </div>

        <div className="form-group">
          <label>Groceries ($)</label>
          <input 
            type="number" 
            min="0"
            value={inputs.monthlyGroceries} 
            onChange={(e) => handleChange('monthlyGroceries', e.target.value)}
            placeholder="0"
          />
        </div>

        <div className="form-group">
          <label>Travel & Flights ($)</label>
          <input 
            type="number" 
            min="0"
            value={inputs.monthlyTravel} 
            onChange={(e) => handleChange('monthlyTravel', e.target.value)}
            placeholder="0"
          />
        </div>

        <div className="form-group">
          <label>Streaming Services ($)</label>
          <input 
            type="number" 
            min="0"
            value={inputs.monthlyStreaming} 
            onChange={(e) => handleChange('monthlyStreaming', e.target.value)}
            placeholder="0"
          />
        </div>

        <div className="form-group" style={{ gridColumn: 'span 2' }}>
          <label>General / Other ($)</label>
          <input 
            type="number" 
            min="0"
            value={inputs.monthlyGeneral} 
            onChange={(e) => handleChange('monthlyGeneral', e.target.value)}
            placeholder="0"
          />
          <small style={{ display: 'block', marginTop: '0.25rem', opacity: 0.6 }}>
            Everything else (Gas, Retail, Bills, etc.)
          </small>
        </div>
      </div>

      <div className="form-group" style={{ marginTop: '1rem' }}>
        <label>Preferred Airline</label>
        <select 
            value={inputs.airline} 
            onChange={(e) => onChange({...inputs, airline: e.target.value})}
            style={{ width: '100%' }}
        >
          <option value="any">Any / No Preference</option>
          <option value="delta">Delta</option>
          <option value="united">United</option>
          <option value="american">American Airlines</option>
          <option value="southwest">Southwest</option>
        </select>
      </div>
    </div>
  );
};

export default LifestyleQuiz;
