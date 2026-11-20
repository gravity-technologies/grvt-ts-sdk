import { sanitizeEvmAddress, sanitizeTransactionHash } from '../src/utils/address';

describe('sanitizeEvmAddress', () => {
  it('should sanitize a valid EVM address with 0x prefix', () => {
    const input = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6';
    const expected = '0x742d35cc6634c0532925a3b8d4c9db96c4b4d8b6';
    expect(sanitizeEvmAddress(input)).toBe(expected);
  });

  it('should sanitize a valid EVM address with uppercase 0X prefix', () => {
    const input = '0X742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6';
    const expected = '0x742d35cc6634c0532925a3b8d4c9db96c4b4d8b6';
    expect(sanitizeEvmAddress(input)).toBe(expected);
  });

  it('should sanitize a valid EVM address without 0x prefix', () => {
    const input = '742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6';
    const expected = '0x742d35cc6634c0532925a3b8d4c9db96c4b4d8b6';
    expect(sanitizeEvmAddress(input)).toBe(expected);
  });

  it('should add 0x prefix to addresses without it', () => {
    const input = '742d35cc6634c0532925a3b8d4c9db96c4b4d8b6';
    const expected = '0x742d35cc6634c0532925a3b8d4c9db96c4b4d8b6';
    expect(sanitizeEvmAddress(input)).toBe(expected);
  });

  it('should convert uppercase letters to lowercase', () => {
    const input = '0x742D35CC6634C0532925A3B8D4C9DB96C4B4D8B6';
    const expected = '0x742d35cc6634c0532925a3b8d4c9db96c4b4d8b6';
    expect(sanitizeEvmAddress(input)).toBe(expected);
  });

  it('should convert uppercase letters to lowercase with 0X prefix', () => {
    const input = '0X742D35CC6634C0532925A3B8D4C9DB96C4B4D8B6';
    const expected = '0x742d35cc6634c0532925a3b8d4c9db96c4b4d8b6';
    expect(sanitizeEvmAddress(input)).toBe(expected);
  });

  it('should handle addresses with mixed case', () => {
    const input = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6';
    const expected = '0x742d35cc6634c0532925a3b8d4c9db96c4b4d8b6';
    expect(sanitizeEvmAddress(input)).toBe(expected);
  });

  it('should handle addresses that are already properly formatted', () => {
    const input = '0x742d35cc6634c0532925a3b8d4c9db96c4b4d8b6';
    const expected = '0x742d35cc6634c0532925a3b8d4c9db96c4b4d8b6';
    expect(sanitizeEvmAddress(input)).toBe(expected);
  });

  it('should handle empty string input', () => {
    const input = '';
    const expected = '0x0000000000000000000000000000000000000000';
    expect(sanitizeEvmAddress(input)).toBe(expected);
  });

  it('should handle 0x and 0X prefixes alone', () => {
    const expected = '0x0000000000000000000000000000000000000000';
    expect(sanitizeEvmAddress('0x')).toBe(expected);
    expect(sanitizeEvmAddress('0X')).toBe(expected);
  });

  it('should handle short addresses by padding with zeros', () => {
    const input = '0x123';
    const expected = '0x0000000000000000000000000000000000000123';
    expect(sanitizeEvmAddress(input)).toBe(expected);
  });

  it('should handle short addresses with 0X prefix by padding with zeros', () => {
    const input = '0X123';
    const expected = '0x0000000000000000000000000000000000000123';
    expect(sanitizeEvmAddress(input)).toBe(expected);
  });

  it('should handle very short addresses', () => {
    const input = '0xa';
    const expected = '0x000000000000000000000000000000000000000a';
    expect(sanitizeEvmAddress(input)).toBe(expected);
  });

  it('should handle addresses without 0x prefix and short length', () => {
    const input = '1234567890abcdef';
    const expected = '0x0000000000000000000000001234567890abcdef';
    expect(sanitizeEvmAddress(input)).toBe(expected);
  });

  it('should handle addresses with extra whitespace', () => {
    const input = '  0x742d35cc6634c0532925a3b8d4c9db96c4b4d8b6  ';
    const expected = '0x742d35cc6634c0532925a3b8d4c9db96c4b4d8b6';
    expect(sanitizeEvmAddress(input)).toBe(expected);
  });

  it('should handle addresses with exactly 40 hex characters', () => {
    const input = '742d35cc6634c0532925a3b8d4c9db96c4b4d8b6';
    const expected = '0x742d35cc6634c0532925a3b8d4c9db96c4b4d8b6';
    expect(sanitizeEvmAddress(input)).toBe(expected);
  });

  it('should handle addresses with exactly 40 hex characters and 0x prefix', () => {
    const input = '0x742d35cc6634c0532925a3b8d4c9db96c4b4d8b6';
    const expected = '0x742d35cc6634c0532925a3b8d4c9db96c4b4d8b6';
    expect(sanitizeEvmAddress(input)).toBe(expected);
  });
});

describe('sanitizeTransactionHash', () => {
  const sampleHash = 'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0';

  it('should sanitize a valid transaction hash with 0x prefix', () => {
    const input = `0x${sampleHash}`;
    expect(sanitizeTransactionHash(input)).toBe(`0x${sampleHash}`);
  });

  it('should sanitize a valid transaction hash without 0x prefix', () => {
    expect(sanitizeTransactionHash(sampleHash)).toBe(`0x${sampleHash}`);
  });

  it('should sanitize a valid transaction hash with uppercase 0X prefix', () => {
    const input = `0X${sampleHash}`;
    expect(sanitizeTransactionHash(input)).toBe(`0x${sampleHash}`);
  });

  it('should lowercase uppercase hex characters in transaction hash', () => {
    const input = `0x${sampleHash.toUpperCase()}`;
    expect(sanitizeTransactionHash(input)).toBe(`0x${sampleHash}`);
  });

  it('should lowercase uppercase hex characters with uppercase 0X prefix', () => {
    const input = `0X${sampleHash.toUpperCase()}`;
    expect(sanitizeTransactionHash(input)).toBe(`0x${sampleHash}`);
  });

  it('should handle empty string input by zero padding', () => {
    const expected = `0x${'0'.repeat(64)}`;
    expect(sanitizeTransactionHash('')).toBe(expected);
  });

  it('should handle 0x and 0X prefixes alone by zero padding', () => {
    const expected = `0x${'0'.repeat(64)}`;
    expect(sanitizeTransactionHash('0x')).toBe(expected);
    expect(sanitizeTransactionHash('0X')).toBe(expected);
  });

  it('should pad short transaction hash with leading zeros', () => {
    const input = '0x1234abcd';
    const expected = `0x${'0'.repeat(56)}1234abcd`;
    expect(sanitizeTransactionHash(input)).toBe(expected);
  });

  it('should pad short transaction hash with 0X prefix with leading zeros', () => {
    const input = '0X1234ABCD';
    const expected = `0x${'0'.repeat(56)}1234abcd`;
    expect(sanitizeTransactionHash(input)).toBe(expected);
  });

  it('should handle extra whitespace around transaction hash', () => {
    const input = `   0x${sampleHash}   `;
    expect(sanitizeTransactionHash(input)).toBe(`0x${sampleHash}`);
  });
});
