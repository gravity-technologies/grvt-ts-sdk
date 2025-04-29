import { ISignature } from 'grvt';

/**
 * Generate a random nonce
 * @returns A random nonce
 */
export function GenerateNonce(): number {
  return Math.floor(Math.random() * 1e9);
}

/**
 * Generate an expiration time
 * @param expirationInHours - The number of hours to set the expiration time to, default is 24 hours
 * @returns The expiration time in nanoseconds
 */
export function GenerateExpiration(expirationInHours: number = 24): string {
  const expirationTime = (Date.now() + expirationInHours * 60 * 60 * 1000) * 1e6;
  return expirationTime.toString();
}
