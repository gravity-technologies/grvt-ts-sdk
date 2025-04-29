import { CHAIN_IDS, GrvtEnvironment } from '../config/config';
import { EIP712DomainData } from './types';

export const getEIP712DomainData = (env: GrvtEnvironment): EIP712DomainData => {
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
