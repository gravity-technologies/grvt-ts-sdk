import { CHAIN_IDS, GrvtEnvironment } from '../types/config';

interface EIP712DomainData {
  name: string;
  version: string;
  chainId: number;
}

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
