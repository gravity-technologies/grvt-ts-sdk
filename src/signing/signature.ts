import { ISignature } from 'grvt';

export interface Signature {
  signer: string;
  r: string;
  s: string;
  v: number;
  expiration: string;
  nonce: number;
}

export function GenerateDefaultSignature(expirationInHours: number = 24): ISignature {
  // Convert to nanoseconds
  const expirationTime = (Date.now() + expirationInHours * 60 * 60 * 1000) * 1e6;

  return {
    signer: '',
    r: '',
    s: '',
    v: 0,
    expiration: expirationTime.toString(),
    nonce: Math.floor(Math.random() * 1e9), // Generate a random nonce
  };
}
