"use server";

/**
 * Server Action to verify the passphrase and return the fingerprint.
 * This ensures the fingerprint and the passphrase itself are never exposed on the client.
 */
export async function verifyPassphrase(input: string) {
  const passphrase = process.env.AUTH_PASSPHRASE || "llueve";

  if (input.toLowerCase() === passphrase.toLowerCase()) {
    // Return the fingerprint and server IP only if the passphrase is correct
    return {
      success: true,
      // These should be set in Vercel as non-public variables
      fingerprint: process.env.FINGERPRINT || 'FINGERPRINT_NOT_SET',
      serverIp: process.env.SERVER_IP || 'sv30.minehost.pro:25471'
    }
  }

  return { success: false };
}
