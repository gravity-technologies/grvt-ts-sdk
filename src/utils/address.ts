/**
 * Sanitize an EVM address to:
 * - trim the address
 * - lowercase the address
 * - add 0 padding to the left if it's less than 42 characters
 * - add prefix 0x if it doesn't have it
 * @param address - The address to sanitize
 * @returns The sanitized address
 */
export function sanitizeEvmAddress(address: string): string {
  // 1. Trim the address
  address = address.trim();
  // 2. Remove the 0x prefix if it exists
  address = address.replace(/^0x/, '');
  // 3. Add 0 padding to the left if it's less than 40 characters
  address = address.padStart(40, '0');
  // 3. Add 0x prefix if it doesn't have it
  address = `0x${address}`;
  // 4. Lowercase the address (this is done by default in the EVM)
  address = address.toLowerCase();
  return address;
}
