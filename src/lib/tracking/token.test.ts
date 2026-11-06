import { describe, expect, it } from 'vitest';

import { isValidToken } from './token';

describe('isValidToken', () => {
  it('accepts exactly 32 lowercase hex characters', () => {
    expect(isValidToken('0123456789abcdef0123456789abcdef')).toBe(true);
    expect(isValidToken('00000000000000000000000000000000')).toBe(true);
  });

  it.each([
    ['empty', ''],
    ['too short', '0123456789abcdef0123456789abcde'],
    ['too long', '0123456789abcdef0123456789abcdef0'],
    ['uppercase', '0123456789ABCDEF0123456789ABCDEF'],
    ['non-hex letters', '0123456789abcdeg0123456789abcdef'],
    ['trailing newline', '0123456789abcdef0123456789abcdef\n'],
    ['surrounding spaces', ' 0123456789abcdef0123456789abcdef '],
    ['path traversal', '../../0123456789abcdef01234567'],
    ['encoded characters', '%30123456789abcdef0123456789abcde'],
  ])('rejects %s', (_label, token) => {
    expect(isValidToken(token)).toBe(false);
  });
});
