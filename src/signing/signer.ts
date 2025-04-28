import { SignTypedDataVersion, signTypedData } from '@metamask/eth-sig-util';
import type * as ContractTypes from './types';

type TContractTypes = Readonly<typeof ContractTypes>;
type TContractTypesUnion = TContractTypes[keyof TContractTypes];

export class Signer {
  static sign(
    privateKey: string,
    data: TContractTypesUnion & {
      message: any;
    }
  ) {
    return signTypedData({
      privateKey: Buffer.from(privateKey.replace(/^0x/, ''), 'hex'),
      data: data as any,
      version: SignTypedDataVersion.V4,
    });
  }

  static decode(signature: ReturnType<typeof Signer.sign>) {
    const bytes = [];
    for (let i = 0; i < signature.length; i += 2) {
      const parseByte = parseInt(signature.substr(i, 2), 16);
      if (!Number.isNaN(parseByte)) {
        bytes.push(parseByte);
      }
    }
    const r = Array.from(bytes.slice(0, 32), (byte: number) =>
      ('0' + (byte & 0xff).toString(16)).slice(-2)
    ).join('');
    const s = Array.from(bytes.slice(32, 64), (byte: number) =>
      ('0' + (byte & 0xff).toString(16)).slice(-2)
    ).join('');
    return {
      r: `0x${r}`,
      s: `0x${s}`,
      v: bytes.slice(-1)[0],
    };
  }
}
