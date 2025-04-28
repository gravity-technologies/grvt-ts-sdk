import { GrvtEnvironment } from '../types/config';
import { getEIP712DomainData } from './domain';
import { ApiTransferRequest, Currency, GenerateDefaultSignature } from '../types';
import { Signer } from './signer';
import { Transfer } from './types';
import { Wallet } from 'ethers';

export const signTransfer = async (
  transfer: ApiTransferRequest,
  wallet: Wallet,
  env: GrvtEnvironment
): Promise<ApiTransferRequest> => {
  if (!transfer.signature) {
    transfer.signature = GenerateDefaultSignature();
  }
  const domain = getEIP712DomainData(env);
  const messageData = {
    fromAccount: transfer.from_account_id,
    fromSubAccount: transfer.from_sub_account_id,
    toAccount: transfer.to_account_id,
    toSubAccount: transfer.to_sub_account_id,
    tokenCurrency: Object.keys(Currency).indexOf(transfer.currency) + 1,
    numTokens: Math.floor(parseFloat(transfer.num_tokens) * 1e6),
    nonce: transfer.signature?.nonce ?? 0,
    expiration: transfer.signature?.expiration ?? '',
  };
  const signature = await Signer.sign(wallet.privateKey, {
    ...Transfer,
    domain,
    message: messageData,
  });
  const { r, s, v } = Signer.decode(signature);

  transfer.signature.r = r;
  transfer.signature.s = s;
  transfer.signature.v = v;
  transfer.signature.signer = wallet.address;

  return transfer;
};
