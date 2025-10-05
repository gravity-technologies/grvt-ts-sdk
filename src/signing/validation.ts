import { ISignature } from '@grvt/client/interfaces';
import { ISigningOptions } from '../types/signature';

export const validateISigningOptions = (options: ISigningOptions) => {
  if (options.nonce) {
    validateNonce(options.nonce);
  }
  if (options.expiration) {
    validateExpiration(options.expiration);
  }
};

export const validateISignature = (signature: ISignature) => {
  if (signature.nonce) {
    validateNonce(signature.nonce);
  }
  if (signature.expiration) {
    validateExpiration(signature.expiration);
  }
};

const validateNonce = (nonce: number) => {
  if (nonce < 0) {
    throw new Error('Nonce must not be negative');
  }
};

const validateExpiration = (expiration: string) => {
  const expirationNs = BigInt(expiration);
  const nowNs = BigInt(Date.now()) * BigInt(1_000_000);
  const thirtyDaysNs = BigInt(30 * 24 * 60 * 60 * 1000) * BigInt(1_000_000);

  if (expirationNs < nowNs) {
    throw new Error('Expiration is expired');
  }
  if (expirationNs > nowNs + thirtyDaysNs) {
    throw new Error('Expiration is too far in the future, must be within 30 days');
  }
};
