import { CHAIN_IDS, EGrvtEnvironment } from '../config/config';
import { EIP712DomainData } from './types';

export const getEIP712DomainData = (env: EGrvtEnvironment): EIP712DomainData => {
  const chainId = CHAIN_IDS[env];
  if (!chainId) {
    throw new Error(`Invalid environment: ${env}`);
  }
  return {
    name: 'GRVT Exchange',
    version: '0',
    chainId,
  };
};
