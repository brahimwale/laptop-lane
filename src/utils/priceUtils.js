const EXCHANGE_API = 'https://api.exchangerate-api.com/v4/latest/USD';

let cachedRate = null;
let lastFetched = 0;
const CACHE_DURATION = 6 * 60 * 60 * 1000;

export async function getExchangeRate() {
  const now = Date.now();
  
  if (cachedRate && (now - lastFetched) < CACHE_DURATION) {
    return cachedRate;
  }
  
  try {
    const response = await fetch(EXCHANGE_API);
    const data = await response.json();
    cachedRate = data.rates.NGN;
    lastFetched = now;
    return cachedRate;
  } catch (error) {
    console.error('Failed to fetch exchange rate:', error);
    return cachedRate || 1600;
  }
}

export function formatNaira(amount, exchangeRate = 1600) {
  const nairaAmount = amount * exchangeRate;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(nairaAmount);
}

export function formatNairaWithCents(amount, exchangeRate = 1600) {
  const nairaAmount = amount * exchangeRate;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(nairaAmount);
}

export function formatPrice(price, salePrice = null, exchangeRate = 1600) {
  const displayPrice = salePrice || price;
  return formatNaira(displayPrice, exchangeRate);
}

export async function initializePrices() {
  const rate = await getExchangeRate();
  return rate;
}