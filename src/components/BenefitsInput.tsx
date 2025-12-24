import React, { useState } from 'react';

export interface Benefit {
  id: number;
  name: string;
  value: number;
}

interface BenefitsInputProps {
  benefits: Benefit[];
  setBenefits: (benefits: Benefit[]) => void;
}

const BenefitsInput: React.FC<BenefitsInputProps> = ({ benefits, setBenefits }) => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const addBenefit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !value) return;
    setBenefits([...benefits, { id: Date.now(), name, value: parseFloat(value) }]);
    setName('');
    setValue('');
  };

  const removeBenefit = (id: number) => {
    setBenefits(benefits.filter(b => b.id !== id));
  };

  return (
    <div className="glass-card animate-fade-in">
      <h2>Card Benefits</h2>
      <p style={{ marginBottom: '1rem', color: '#94a3b8' }}>Add monetary value of perks (e.g., streaming credits, travel credits)</p>
      
      <form onSubmit={addBenefit} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <input 
          type="text" 
          placeholder="Benefit Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="number" 
          placeholder="Value ($)" 
          value={value} 
          onChange={(e) => setValue(e.target.value)}
          style={{ width: '120px' }}
        />
        <button type="submit">Add</button>
      </form>

      <div className="benefits-list">
        {benefits.map(benefit => (
          <div key={benefit.id} className="benefit-item">
            <span style={{ flex: 1 }}>{benefit.name}</span>
            <span style={{ fontWeight: 'bold', color: '#818cf8' }}>${benefit.value}</span>
            <button className="remove-btn" onClick={() => removeBenefit(benefit.id)}>×</button>
          </div>
        ))}
        {benefits.length === 0 && <p style={{ fontStyle: 'italic', opacity: 0.5 }}>No benefits added yet.</p>}
      </div>
    </div>
  );
};

export default BenefitsInput;
