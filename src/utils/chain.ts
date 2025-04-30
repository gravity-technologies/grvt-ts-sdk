import { EChain } from '../types/chain';
import { EGrvtEnvironment } from '../config/config';

export class ChainUtils {
  static isArbitrum(chainId?: number | EChain): boolean {
    return chainId === EChain.ARBITRUM_ONE || chainId === EChain.ARBITRUM_SEPOLIA;
  }

  static getL1TokenAddress(chainId: number | EChain): string | undefined {
    // Map of chain IDs to L1 token addresses
    const l1TokenAddresses: Record<number, string> = {
      // Mainnet
      [EChain.ETH_MAINNET]: '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT on Ethereum
      [EChain.ARBITRUM_ONE]: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9', // USDT on Arbitrum
      // Testnet
      [EChain.ETH_SEPOLIA]: '0xfb122130c4d28860dbc050a8e024a71a558eb0c1', // USDT on Sepolia
      [EChain.ARBITRUM_SEPOLIA]: '0x0a8ca9a01e03b8076c3b9bfe304781a0acab9a34', // USDT on Arbitrum Sepolia
    };
    return l1TokenAddresses[chainId];
  }

  static getL1BridgeAddress(env: EGrvtEnvironment): string {
    switch (env) {
      case EGrvtEnvironment.DEV:
        return '0xE256101E97e761Bd978f43F8bCd36Bb5ADEBEEDd';
      case EGrvtEnvironment.STAGING:
        return '0xbb1AE91Bd3Fd782D64624300abFb353517956BF6';
      case EGrvtEnvironment.TESTNET:
        return '0x6fdc38DB7a5850FEA2D62D879f99baa0546D1d09';
      case EGrvtEnvironment.PRODUCTION:
        return '0xE17aeD2fC55f4A876315376ffA49FE6358113a65';
    }
  }

  // TODO: verify and update this
  static getRpcUrl(chainId: number | EChain): string | undefined {
    // Map of chain IDs to RPC URLs
    const rpcUrls: Record<number, string> = {
      // Mainnet
      [EChain.ETH_MAINNET]: 'https://eth.llamarpc.com', // Ethereum
      [EChain.ARBITRUM_ONE]: 'https://arb1.arbitrum.io/rpc', // Arbitrum
      // Testnet
      [EChain.ETH_SEPOLIA]: 'https://rpc.sepolia.org', // Sepolia
      [EChain.ARBITRUM_SEPOLIA]: 'https://sepolia-rollup.arbitrum.io/rpc', // Arbitrum Sepolia
    };
    return rpcUrls[chainId];
  }
}
