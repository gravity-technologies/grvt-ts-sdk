import * as setCookieParser from 'set-cookie-parser';

interface GrvtCookie {
  gravity: string;
  expires: number;
  XGrvtAccountId?: string;
}

export async function getCookieWithExpiration(path: string, apiKey: string | null): Promise<GrvtCookie | null> {
  if (!apiKey) {
    return null;
  }

  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ api_key: apiKey }),
    });

    if (!response.ok) {
      console.warn(`Invalid response for cookie: ${response.status} ${response.statusText}`);
      return null;
    }

    const cookieHeader = response.headers.get('Set-Cookie');
    const accountId = response.headers.get('X-Grvt-Account-Id');
    
    if (!cookieHeader) {
      console.warn('No cookie header in response');
      return null;
    }

    // Parse the cookie header using set-cookie-parser
    const cookies = setCookieParser.parse(cookieHeader);
    const gravityCookie = cookies.find((cookie: setCookieParser.Cookie) => cookie.name === 'gravity');
    
    if (!gravityCookie) {
      console.warn('No gravity cookie in response');
      return null;
    }

    if (!gravityCookie.expires) {
      console.warn('No expiration date in cookie');
      return null;
    }

    return {
      gravity: gravityCookie.value,
      expires: gravityCookie.expires.getTime() / 1000, // Convert to Unix timestamp
      XGrvtAccountId: accountId || undefined
    };
  } catch (error) {
    console.error('Error getting cookie:', error);
    return null;
  }
} 