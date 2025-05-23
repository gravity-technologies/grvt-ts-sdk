import { EGrvtEnvironment } from '../config/config';
import { getEIP712DomainData } from './domain';
import { GenerateNonce, GenerateExpiration } from './utils';
import { Signer } from './signer';
import { Withdrawal } from './types';
import { Wallet } from 'ethers';
import { ECurrency, IApiWithdrawalRequest, ISignature } from '@grvt/client';
import { ISigningOptions } from '../types/signature';
import { validateISigningOptions } from './validation';

export const signWithdrawal = async (
  withdrawal: IApiWithdrawalRequest,
  wallet: Wallet,
  env: EGrvtEnvironment,
  options?: ISigningOptions
): Promise<ISignature> => {
  if (options) {
    validateISigningOptions(options);
  }
  const nonce = options?.nonce ?? GenerateNonce();
  const expiration = options?.expiration || GenerateExpiration();
  const domain = getEIP712DomainData(env);

  const messageData = {
    fromAccount: withdrawal.from_account_id || '',
    toEthAddress: withdrawal.to_eth_address || '',
    tokenCurrency: withdrawal.currency
      ? Object.keys(ECurrency).indexOf(withdrawal.currency) + 1
      : 0,
    numTokens: withdrawal.num_tokens ? Math.floor(parseFloat(withdrawal.num_tokens) * 1e6) : 0,
    nonce: nonce,
    expiration: expiration,
  };
  const signature = await Signer.sign(wallet.privateKey, {
    ...Withdrawal,
    domain,
    message: messageData,
  });
  const { r, s, v } = Signer.decode(signature);

  return {
    r: r,
    s: s,
    v: v,
    signer: wallet.address,
    nonce: nonce,
    expiration: expiration,
  };
};
