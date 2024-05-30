import { GoogleUser } from '@/pages-lib/profile/ProfileNoUser';
import * as jose from 'jose';

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

export default async function generateToken(user: GoogleUser) {
  const { email, name, image } = user;
  const token = await new jose.SignJWT({
    email,
    name,
    image,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(60 * 60 * 24 * 365 * 1000)
    .sign(secret);

  return token;
}
