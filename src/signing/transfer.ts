import { GrvtEnvironment } from '../config/config';
import { getEIP712DomainData } from './domain';
import { GenerateDefaultSignature } from './signature';
import { Signer } from './signer';
import { Transfer } from './types';
import { Wallet } from 'ethers';
import { ECurrency, IApiTransferRequest } from 'grvt';

export const signTransfer = async (
  transfer: IApiTransferRequest,
  wallet: Wallet,
  env: GrvtEnvironment
): Promise<IApiTransferRequest> => {
  if (!transfer.signature) {
    transfer.signature = GenerateDefaultSignature();
  }
  const domain = getEIP712DomainData(env);

  const messageData = {
    fromAccount: transfer.from_account_id || '',
    fromSubAccount: transfer.from_sub_account_id || '',
    toAccount: transfer.to_account_id || '',
    toSubAccount: transfer.to_sub_account_id || '',
    tokenCurrency: transfer.currency ? Object.keys(ECurrency).indexOf(transfer.currency) + 1 : 0,
    numTokens: transfer.num_tokens ? Math.floor(parseFloat(transfer.num_tokens) * 1e6) : 0,
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
