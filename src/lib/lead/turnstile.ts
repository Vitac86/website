const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

type TurnstileApiResponse = {
  success: boolean;
  'error-codes'?: string[];
};

type TurnstileVerificationResult = {
  success: boolean;
};

export async function verifyTurnstileToken(token: string, remoteIp?: string): Promise<TurnstileVerificationResult> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    throw new Error('Turnstile is not configured');
  }

  const body = new URLSearchParams();
  body.set('secret', secretKey);
  body.set('response', token);

  if (remoteIp && remoteIp !== 'anonymous') {
    body.set('remoteip', remoteIp);
  }

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });

  if (!response.ok) {
    return { success: false };
  }

  const data = (await response.json()) as TurnstileApiResponse;
  return { success: data.success };
}
