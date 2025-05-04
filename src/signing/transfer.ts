import { EGrvtEnvironment } from '../config/config';
import { getEIP712DomainData } from './domain';
import { GenerateNonce, GenerateExpiration } from './utils';
import { Signer } from './signer';
import { Transfer } from './types';
import { Wallet } from 'ethers';
import { ECurrency, IApiTransferRequest, ISignature } from '@grvt/client';
import { ISigningOptions } from '../types/signature';
import { validateISigningOptions } from './validation';

export const signTransfer = async (
  transfer: IApiTransferRequest,
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
    fromAccount: transfer.from_account_id || '',
    fromSubAccount: transfer.from_sub_account_id || '',
    toAccount: transfer.to_account_id || '',
    toSubAccount: transfer.to_sub_account_id || '',
    tokenCurrency: transfer.currency ? Object.keys(ECurrency).indexOf(transfer.currency) + 1 : 0,
    numTokens: transfer.num_tokens ? Math.floor(parseFloat(transfer.num_tokens) * 1e6) : 0,
    nonce: nonce,
    expiration: expiration,
  };
  const signature = await Signer.sign(wallet.privateKey, {
    ...Transfer,
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
