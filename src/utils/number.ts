export class NumberUtils {
  /**
   * Convert a number string to bigint with proper decimal places for the given currency
   * @param value - Number string to convert
   * @returns BigInt value with proper decimal places
   */
  static numberToBigIntCurrencyUSDT(value: string): bigint {
    // USDT has 6 decimals
    const decimals = 6;
    const [whole, fraction = ''] = value.split('.');
    const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals);
    return BigInt(whole + paddedFraction);
  }
}
