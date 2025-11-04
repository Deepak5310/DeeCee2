/**
 * Currency Utilities
 * Multi-currency support with live conversion rates
 */

export interface CurrencyInfo {
  symbol: string;
  rate: number;
  name: string;
}

export type SupportedCurrency = 'USD' | 'INR' | 'EUR' | 'GBP' | 'AED' | 'AUD' | 'CAD' | 'SGD';

/**
 * Currency data with exchange rates (base: 1 USD)
 * All prices stored in USD, converted to local currency on display
 */
export const CURRENCIES: Record<SupportedCurrency, CurrencyInfo> = {
  USD: { symbol: "$", rate: 1, name: "USA (USD)" },
  INR: { symbol: "₹", rate: 86.50, name: "India (INR)" },
  EUR: { symbol: "€", rate: 0.92, name: "Europe (EUR)" },
  GBP: { symbol: "£", rate: 0.79, name: "UK (GBP)" },
  AED: { symbol: "د.إ", rate: 3.67, name: "UAE (AED)" },
  AUD: { symbol: "A$", rate: 1.52, name: "Australia (AUD)" },
  CAD: { symbol: "C$", rate: 1.38, name: "Canada (CAD)" },
  SGD: { symbol: "S$", rate: 1.34, name: "Singapore (SGD)" },
};

/**
 * Convert price from USD to target currency
 * @param priceInUSD - Price in USD
 * @param currency - Target currency code
 * @returns Formatted price string with currency symbol
 */
export const convertPrice = (priceInUSD: number, currency: SupportedCurrency = 'USD'): string => {
  const { symbol, rate } = CURRENCIES[currency];
  const converted = priceInUSD * rate;
  return `${symbol}${Math.round(converted).toLocaleString()}`;
};

/**
 * Get currency symbol for a given currency code
 */
export const getCurrencySymbol = (currency: SupportedCurrency): string => {
  return CURRENCIES[currency]?.symbol || '$';
};

/**
 * Get currency name for a given currency code
 */
export const getCurrencyName = (currency: SupportedCurrency): string => {
  return CURRENCIES[currency]?.name || 'USA (USD)';
};
