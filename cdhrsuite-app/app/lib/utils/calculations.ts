/**
 * Calculate monthly base remuneration in EUR
 * @param amount The remuneration amount
 * @param currency The currency code (e.g., CZK, EUR, CHF)
 * @param frequency The frequency (Hourly, Daily, Monthly, Annual)
 * @param workingTimeRef Working time reference values
 * @param currencyRates Currency exchange rates to EUR
 * @returns The calculated monthly amount in EUR
 */
export function calculateMonthlyBaseRemuneration(
  amount: number,
  currency: string,
  frequency: string,
  workingTimeRef: {
    workdayHours: number;
    monthlyHours: number;
    monthlyWorkdays: number;
    monthsPerYear: number;
  },
  currencyRates: Record<string, number>
): number {
  // Convert to EUR first
  const amountInEur = currency === 'EUR' ? amount : amount * (currencyRates[currency] || 1);
  
  // Convert to monthly based on frequency
  let monthlyAmount = 0;
  
  switch (frequency) {
    case 'Hourly':
      monthlyAmount = amountInEur * workingTimeRef.monthlyHours;
      break;
    case 'Daily':
      monthlyAmount = amountInEur * workingTimeRef.monthlyWorkdays;
      break;
    case 'Monthly':
      monthlyAmount = amountInEur;
      break;
    case 'Annual':
      monthlyAmount = amountInEur / workingTimeRef.monthsPerYear;
      break;
    default:
      monthlyAmount = amountInEur;
  }
  
  return parseFloat(monthlyAmount.toFixed(2));
}