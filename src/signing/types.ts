function keyMirror(originObj: Record<string, any>): Record<string, string> {
  return Object.entries(originObj).reduce<Record<string, string>>((obj, [key, _]) => {
    obj[key] = key;
    return obj;
  }, {});
}

export const EIP712Domain = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
];

export interface EIP712DomainData {
  name: string;
  version: string;
  chainId: number;
}

// Note: this is the default domain, for each of the environment, we need to construct a proper domain accordingly
export const domain: EIP712DomainData = {
  name: 'GRVT Exchange',
  version: '0',
  chainId: 1,
};

export const PrimaryType = keyMirror({
  // Account
  CreateAccount: 0,
  CreateAccountWithSubAccount: 0,
  SetAccountSignerPermissions: 0,
  AddAccountSigner: 0,
  AddTransferAccount: 0,
  AddWithdrawalAddress: 0,
  CreateSubAccount: 0,
  RemoveAccountSigner: 0,
  RemoveTransferAccount: 0,
  RemoveWithdrawalAddress: 0,
  SetAccountMultiSigThreshold: 0,

  // SubAccount
  AddSubAccountSigner: 0,
  RemoveSubAccountSigner: 0,
  SetSubAccountMarginType: 0,
  SetSubAccountSignerPermissions: 0,

  // Wallet Recovery
  AddRecoveryAddress: 0,
  RemoveRecoveryAddress: 0,
  RecoverAddress: 0,

  // Session Key
  AddSessionKey: 0,

  // Transfer
  Deposit: 0,
  Transfer: 0,
  Withdrawal: 0,

  // Trade
  Order: 0,
});

// -------------- Account --------------
export const CreateAccount = {
  primaryType: PrimaryType.CreateAccount,
  domain,
  types: {
    EIP712Domain,
    [PrimaryType.CreateAccount]: [
      { name: 'accountID', type: 'address' },
      { name: 'nonce', type: 'uint32' },
      { name: 'expiration', type: 'int64' },
    ],
  },
};

export const CreateAccountWithSubAccount = {
  primaryType: PrimaryType.CreateAccountWithSubAccount,
  domain,
  types: {
    EIP712Domain,
    [PrimaryType.CreateAccountWithSubAccount]: [
      { name: 'accountID', type: 'address' },
      { name: 'subAccountID', type: 'uint64' },
      { name: 'quoteCurrency', type: 'uint8' },
      { name: 'marginType', type: 'uint8' },
      { name: 'nonce', type: 'uint32' },
      { name: 'expiration', type: 'int64' },
    ],
  },
};

export const SetAccountMultiSigThreshold = {
  primaryType: PrimaryType.SetAccountMultiSigThreshold,
  domain,
  types: {
    EIP712Domain,
    [PrimaryType.SetAccountMultiSigThreshold]: [
      { name: 'accountID', type: 'address' },
      { name: 'multiSigThreshold', type: 'uint8' },
      { name: 'nonce', type: 'uint32' },
      { name: 'expiration', type: 'int64' },
    ],
  },
};

export const AddAccountSigner = {
  primaryType: PrimaryType.AddAccountSigner,
  domain,
  types: {
    EIP712Domain,
    [PrimaryType.AddAccountSigner]: [
      { name: 'accountID', type: 'address' },
      { name: 'signer', type: 'address' },
      { name: 'permissions', type: 'uint64' },
      { name: 'nonce', type: 'uint32' },
      { name: 'expiration', type: 'int64' },
    ],
  },
};

export const SetAccountSignerPermissions = {
  primaryType: PrimaryType.SetAccountSignerPermissions,
  domain,
  types: {
    EIP712Domain,
    [PrimaryType.SetAccountSignerPermissions]: [
      { name: 'accountID', type: 'address' },
      { name: 'signer', type: 'address' },
      { name: 'permissions', type: 'uint64' },
      { name: 'nonce', type: 'uint32' },
      { name: 'expiration', type: 'int64' },
    ],
  },
};

export const RemoveAccountSigner = {
  primaryType: PrimaryType.RemoveAccountSigner,
  domain,
  types: {
    EIP712Domain,
    [PrimaryType.RemoveAccountSigner]: [
      { name: 'accountID', type: 'address' },
      { name: 'signer', type: 'address' },
      { name: 'nonce', type: 'uint32' },
      { name: 'expiration', type: 'int64' },
    ],
  },
};

export const AddWithdrawalAddress = {
  primaryType: PrimaryType.AddWithdrawalAddress,
  domain,
  types: {
    EIP712Domain,
    [PrimaryType.AddWithdrawalAddress]: [
      { name: 'accountID', type: 'address' },
      { name: 'withdrawalAddress', type: 'address' },
      { name: 'nonce', type: 'uint32' },
      { name: 'expiration', type: 'int64' },
    ],
  },
};

export const RemoveWithdrawalAddress = {
  primaryType: PrimaryType.RemoveWithdrawalAddress,
  domain,
  types: {
    EIP712Domain,
    [PrimaryType.RemoveWithdrawalAddress]: [
      { name: 'accountID', type: 'address' },
      { name: 'withdrawalAddress', type: 'address' },
      { name: 'nonce', type: 'uint32' },
      { name: 'expiration', type: 'int64' },
    ],
  },
};

export const AddTransferAccount = {
  primaryType: PrimaryType.AddTransferAccount,
  domain,
  types: {
    EIP712Domain,
    [PrimaryType.AddTransferAccount]: [
      { name: 'accountID', type: 'address' },
      { name: 'transferAccountID', type: 'address' },
      { name: 'nonce', type: 'uint32' },
      { name: 'expiration', type: 'int64' },
    ],
  },
};

export const RemoveTransferAccount = {
  primaryType: PrimaryType.RemoveTransferAccount,
  domain,
  types: {
    EIP712Domain,
    [PrimaryType.RemoveTransferAccount]: [
      { name: 'accountID', type: 'address' },
      { name: 'transferAccountID', type: 'address' },
      { name: 'nonce', type: 'uint32' },
      { name: 'expiration', type: 'int64' },
    ],
  },
};

// -------------- SubAccount --------------
export const CreateSubAccount = {
  primaryType: PrimaryType.CreateSubAccount,
  domain,
  types: {
    EIP712Domain,
    [PrimaryType.CreateSubAccount]: [
      { name: 'accountID', type: 'address' },
      { name: 'subAccountID', type: 'uint64' },
      { name: 'quoteCurrency', type: 'uint8' },
      { name: 'marginType', type: 'uint8' },
      { name: 'nonce', type: 'uint32' },
      { name: 'expiration', type: 'int64' },
    ],
  },
};

export const SetSubAccountMarginType = {
  primaryType: PrimaryType.SetSubAccountMarginType,
  domain,
  types: {
    EIP712Domain,
    [PrimaryType.SetSubAccountMarginType]: [
      { name: 'subAccountID', type: 'uint64' },
      { name: 'marginType', type: 'uint8' },
      { name: 'nonce', type: 'uint32' },
      { name: 'expiration', type: 'int64' },
    ],
  },
};

export const AddSubAccountSigner = {
  primaryType: PrimaryType.AddSubAccountSigner,
  domain,
  types: {
    EIP712Domain,
    [PrimaryType.AddSubAccountSigner]: [
      { name: 'subAccountID', type: 'uint64' },
      { name: 'signer', type: 'address' },
      { name: 'permissions', type: 'uint64' },
      { name: 'nonce', type: 'uint32' },
      { name: 'expiration', type: 'int64' },
    ],
  },
};

export const SetSubAccountSignerPermissions = {
  primaryType: PrimaryType.SetSubAccountSignerPermissions,
  domain,
  types: {
    EIP712Domain,
    [PrimaryType.SetSubAccountSignerPermissions]: [
      { name: 'subAccountID', type: 'uint64' },
      { name: 'signer', type: 'address' },
      { name: 'permissions', type: 'uint64' },
      { name: 'nonce', type: 'uint32' },
      { name: 'expiration', type: 'int64' },
    ],
  },
};

export const RemoveSubAccountSigner = {
  primaryType: PrimaryType.RemoveSubAccountSigner,
  domain,
  types: {
    EIP712Domain,
    [PrimaryType.RemoveSubAccountSigner]: [
      { name: 'subAccountID', type: 'uint64' },
      { name: 'signer', type: 'address' },
      { name: 'nonce', type: 'uint32' },
      { name: 'expiration', type: 'int64' },
    ],
  },
};

// Wallet Recovery
export const AddRecoveryAddress = {
  primaryType: PrimaryType.AddRecoveryAddress,
  domain,
  types: {
    EIP712Domain,
    [PrimaryType.AddRecoveryAddress]: [
      { name: 'accountID', type: 'address' },
      { name: 'recoverySigner', type: 'address' },
      { name: 'nonce', type: 'uint32' },
      { name: 'expiration', type: 'int64' },
    ],
  },
};

export const RemoveRecoveryAddress = {
  primaryType: PrimaryType.RemoveRecoveryAddress,
  domain,
  types: {
    EIP712Domain,
    [PrimaryType.RemoveRecoveryAddress]: [
      { name: 'accountID', type: 'address' },
      { name: 'recoverySigner', type: 'address' },
      { name: 'nonce', type: 'uint32' },
      { name: 'expiration', type: 'int64' },
    ],
  },
};

export const RecoverAddress = {
  primaryType: PrimaryType.RecoverAddress,
  domain,
  types: {
    EIP712Domain,
    [PrimaryType.RecoverAddress]: [
      { name: 'accountID', type: 'address' },
      { name: 'oldSigner', type: 'address' },
      { name: 'newSigner', type: 'address' },
      { name: 'nonce', type: 'uint32' },
      { name: 'expiration', type: 'int64' },
    ],
  },
};

// -------------- Session Keys --------------
export const AddSessionKey = {
  primaryType: PrimaryType.AddSessionKey,
  domain,
  types: {
    EIP712Domain,
    [PrimaryType.AddSessionKey]: [
      { name: 'sessionKey', type: 'address' },
      { name: 'keyExpiry', type: 'int64' },
    ],
  },
};

// -------------- Transfer --------------
export const Deposit = {
  primaryType: PrimaryType.Deposit,
  domain,
  types: {
    EIP712Domain,
    [PrimaryType.Deposit]: [
      { name: 'fromEthAddress', type: 'address' },
      { name: 'toAccount', type: 'address' },
      { name: 'tokenCurrency', type: 'uint8' },
      { name: 'numTokens', type: 'uint64' },
      { name: 'nonce', type: 'uint32' },
      { name: 'expiration', type: 'int64' },
    ],
  },
};

export const Withdrawal = {
  primaryType: PrimaryType.Withdrawal,
  domain,
  types: {
    EIP712Domain,
    [PrimaryType.Withdrawal]: [
      { name: 'fromAccount', type: 'address' },
      { name: 'toEthAddress', type: 'address' },
      { name: 'tokenCurrency', type: 'uint8' },
      { name: 'numTokens', type: 'uint64' },
      { name: 'nonce', type: 'uint32' },
      { name: 'expiration', type: 'int64' },
    ],
  },
};

export const Transfer = {
  primaryType: PrimaryType.Transfer,
  domain,
  types: {
    EIP712Domain,
    [PrimaryType.Transfer]: [
      { name: 'fromAccount', type: 'address' },
      { name: 'fromSubAccount', type: 'uint64' },
      { name: 'toAccount', type: 'address' },
      { name: 'toSubAccount', type: 'uint64' },
      { name: 'tokenCurrency', type: 'uint8' },
      { name: 'numTokens', type: 'uint64' },
      { name: 'nonce', type: 'uint32' },
      { name: 'expiration', type: 'int64' },
    ],
  },
};

export const Order = {
  primaryType: PrimaryType.Order,
  domain,
  types: {
    EIP712Domain,
    [PrimaryType.Order]: [
      { name: 'subAccountID', type: 'uint64' },
      { name: 'isMarket', type: 'bool' },
      { name: 'timeInForce', type: 'uint8' },
      { name: 'postOnly', type: 'bool' },
      { name: 'reduceOnly', type: 'bool' },
      { name: 'legs', type: 'OrderLeg[]' },
      { name: 'nonce', type: 'uint32' },
      { name: 'expiration', type: 'int64' },
    ],
    OrderLeg: [
      { name: 'assetID', type: 'uint256' },
      { name: 'contractSize', type: 'uint64' },
      { name: 'limitPrice', type: 'uint64' },
      { name: 'isBuyingContract', type: 'bool' },
    ],
  },
};
