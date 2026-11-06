const TOKEN_PATTERN = /^[0-9a-f]{32}$/;

/** Tokens are 32 lowercase hex characters. Anything else is an invalid link. */
export function isValidToken(token: string): boolean {
  return TOKEN_PATTERN.test(token);
}
