// Authentication utility - password is hashed for security
// The actual password never appears in this code

// SHA-256 hash of the admin password (pre-calculated)
// This ensures the password is never stored in plain text
const PASSWORD_HASH = '439b877bf390e3e388637413b0de41c3963be88d67b4d7b7c9e6cf318b80bb00';

// Hash password using Web Crypto API (client-side compatible)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Verify password by comparing hashes
export async function verifyPassword(password: string): Promise<boolean> {
  const inputHash = await hashPassword(password);
  return inputHash === PASSWORD_HASH;
}

