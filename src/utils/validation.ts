/**
 * RFC 5322 compliant email validation regex.
 * Note: A simplified but highly accurate version for production use.
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * List of common disposable email domains for blocking.
 * In a real-world scenario, this should be maintained via an external API or updated regularly.
 */
const DISPOSABLE_DOMAINS = [
  'mailinator.com',
  '10minutemail.com',
  'temp-mail.org',
  'guerrillamail.com',
  'sharklasers.com',
  'getairmail.com',
  'dispostable.com',
  'throwawaymail.com'
];

/**
 * Validates the email against RFC 5322 regex and checks if it's from a disposable domain.
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || !EMAIL_REGEX.test(email)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }

  const domain = email.split('@')[1]?.toLowerCase();
  if (domain && DISPOSABLE_DOMAINS.includes(domain)) {
    return { valid: false, error: 'Disposable email addresses are not allowed.' };
  }

  return { valid: true };
}

/**
 * Anti-spam helper to check for honeypot and timing.
 */
export function checkSpam(
  honeypotValue: string,
  startTime: number,
  minDurationMs: number = 3000
): { isSpam: boolean; reason?: string } {
  // Honeypot check
  if (honeypotValue) {
    return { isSpam: true, reason: 'Honeypot field filled (bot detected).' };
  }

  // Timing check
  const duration = Date.now() - startTime;
  if (duration < minDurationMs) {
    return { isSpam: true, reason: 'Submission too fast (automated script suspected).' };
  }

  return { isSpam: false };
}
