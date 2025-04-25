import { ethers } from 'ethers';
import { Transfer, Currency } from '../types';
import { GrvtEnvironment } from '../types/config';
import { getEIP712DomainData } from './common';

const EIP712_TRANSFER_MESSAGE_TYPE = {
  Transfer: [
    { name: 'fromAccount', type: 'address' },
    { name: 'fromSubAccount', type: 'uint64' },
    { name: 'toAccount', type: 'address' },
    { name: 'toSubAccount', type: 'uint64' },
    { name: 'tokenCurrency', type: 'uint8' },
    { name: 'numTokens', type: 'uint64' },
    { name: 'nonce', type: 'uint32' },
    { name: 'expiration', type: 'int64' },
  ],
};

interface EIP712TransferMessageData {
  fromAccount: string;
  fromSubAccount: string;
  toAccount: string;
  toSubAccount: string;
  tokenCurrency: number;
  numTokens: number;
  nonce: number;
  expiration: string;
}

const buildEIP712TransferMessageData = (transfer: Transfer): EIP712TransferMessageData => {
  return {
    fromAccount: transfer.from_account_id,
    fromSubAccount: transfer.from_sub_account_id,
    toAccount: transfer.to_account_id,
    toSubAccount: transfer.to_sub_account_id,
    tokenCurrency: Number(Currency[transfer.currency]),
    numTokens: Number(ethers.parseUnits(transfer.num_tokens, 6)), // USDT has 6 decimals
    nonce: transfer.signature.nonce,
    expiration: transfer.signature.expiration,
  };
};

export const signTransfer = async (
  transfer: Transfer,
  privateKey: string,
  env: GrvtEnvironment
): Promise<Transfer> => {
  if (!privateKey) {
    throw new Error('Private key is not set');
  }

  const domain = getEIP712DomainData(env);
  const messageData = buildEIP712TransferMessageData(transfer);

  const wallet = new ethers.Wallet(privateKey);
  const signature = await wallet.signTypedData(domain, EIP712_TRANSFER_MESSAGE_TYPE, messageData);

  const { r, s, v } = ethers.Signature.from(signature);

  transfer.signature.r = `0x${r.slice(2)}`;
  transfer.signature.s = `0x${s.slice(2)}`;
  transfer.signature.v = v;
  transfer.signature.signer = wallet.address;

  return transfer;
};
