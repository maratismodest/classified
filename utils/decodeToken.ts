import * as jose from 'jose';

export default async function decodeToken(token: string) {
  try {
    const decoded: jose.JWTPayload = await jose.decodeJwt(token);
    return decoded;
  } catch (error) {
    console.error('decodeToken', error);
  }
}
