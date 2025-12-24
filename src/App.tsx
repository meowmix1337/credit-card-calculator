import React, { useState } from 'react';
import './App.css';
import Layout from './components/Layout';
import Calculator, { CalcData } from './components/Calculator';
import BenefitsInput, { Benefit } from './components/BenefitsInput';
import Summary from './components/Summary';
import LifestyleQuiz, { Lifestyle } from './components/LifestyleQuiz';
import Recommendation from './components/Recommendation';

function App() {
  const [calcData, setCalcData] = useState<CalcData>({
    annualFee: 0,
    pointValue: 1.0, // in cents
    earningRate: 1.0,
  });

  const [benefits, setBenefits] = useState<Benefit[]>([]);

  const [lifestyle, setLifestyle] = useState<Lifestyle>({
    monthlyDining: '',
    monthlyGroceries: '',
    monthlyTravel: '',
    monthlyStreaming: '',
    airline: 'any',
  });

  const [activeTab, setActiveTab] = useState<'recommender' | 'calculator'>('recommender'); // Default to recommender as it's the popular feature

  return (
    <Layout>
      <div style={{ gridColumn: 'span 2', marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button 
          onClick={() => setActiveTab('recommender')}
          style={{ 
            background: activeTab === 'recommender' ? 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' : 'rgba(255,255,255,0.05)',
            border: activeTab === 'recommender' ? 'none' : '1px solid rgba(255,255,255,0.1)',
            opacity: activeTab === 'recommender' ? 1 : 0.7
          }}
        >
          Card Recommender
        </button>
        <button 
          onClick={() => setActiveTab('calculator')}
          style={{ 
            background: activeTab === 'calculator' ? 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' : 'rgba(255,255,255,0.05)',
            border: activeTab === 'calculator' ? 'none' : '1px solid rgba(255,255,255,0.1)',
            opacity: activeTab === 'calculator' ? 1 : 0.7
          }}
        >
          Break Even Calculator
        </button>
      </div>

      {activeTab === 'calculator' && (
        <div style={{ gridColumn: 'span 2' }}>
          <section className="animate-fade-in">
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Break Even Analysis</h1>
            <div className="grid-container" style={{ margin: 0, padding: 0 }}>
              <div>
                <Calculator data={calcData} onChange={setCalcData} />
                <BenefitsInput benefits={benefits} setBenefits={setBenefits} />
              </div>
              <div>
                <Summary calcData={calcData} benefits={benefits} />
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'recommender' && (
        <div style={{ gridColumn: 'span 2' }}>
          <section className="animate-fade-in">
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Find Your Perfect Card</h1>
            <div className="grid-container" style={{ margin: 0, padding: 0 }}>
              <div className="sticky-column">
                <LifestyleQuiz inputs={lifestyle} onChange={setLifestyle} />
              </div>
              <Recommendation lifestyle={lifestyle} />
            </div>
          </section>
        </div>
      )}
    </Layout>
  );
}

export default App;
