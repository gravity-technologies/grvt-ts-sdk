import { EGrvtEnvironment } from '../config/config';
import { getEIP712DomainData } from './domain';
import { GenerateNonce, GenerateExpiration } from './utils';
import { Signer } from './signer';
import { Transfer } from './types';
import { parseUnits, Wallet } from 'ethers';
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

  if (!transfer.num_tokens) {
    throw new Error('num_tokens is required');
  }
  const numTokens = parseNumTokens(transfer.num_tokens);
  const messageData = {
    fromAccount: transfer.from_account_id || '',
    fromSubAccount: transfer.from_sub_account_id || '',
    toAccount: transfer.to_account_id || '',
    toSubAccount: transfer.to_sub_account_id || '',
    tokenCurrency: transfer.currency ? Object.keys(ECurrency).indexOf(transfer.currency) + 1 : 0,
    numTokens: numTokens,
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

function parseNumTokens(numTokens: string): number {
  // Check for more than one decimal point
  const parts = numTokens.split('.');
  if (parts.length > 2) {
    throw new Error('num_tokens cannot have more than one decimal point');
  }
  // Check for more than 6 decimal places
  if (parts.length === 2 && parts[1].length > 6) {
    throw new Error('num_tokens cannot have more than 6 decimal places');
  }
  const numTokensNumber = Number(parseUnits(numTokens, 6));
  console.log('numTokens:', numTokensNumber);
  return numTokensNumber;
}
