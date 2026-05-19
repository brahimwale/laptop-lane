import { createContext, useContext, useState, useEffect } from 'react';
import { getExchangeRate } from '../utils/priceUtils';

const PricingContext = createContext();

export function PricingProvider({ children }) {
  const [exchangeRate, setExchangeRate] = useState(1600);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRate() {
      try {
        const rate = await getExchangeRate();
        setExchangeRate(rate);
      } catch (error) {
        console.log('Using default exchange rate');
      } finally {
        setLoading(false);
      }
    }
    fetchRate();
  }, []);

  return (
    <PricingContext.Provider value={{ exchangeRate, loading }}>
      {children}
    </PricingContext.Provider>
  );
}

export function usePricing() {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
}