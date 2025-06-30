import { sanitizeEvmAddress } from '../src/utils/address';

describe('sanitizeEvmAddress', () => {
  it('should sanitize a valid EVM address with 0x prefix', () => {
    const input = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6';
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

  it('should handle short addresses by padding with zeros', () => {
    const input = '0x123';
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