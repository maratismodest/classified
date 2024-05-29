'use server';
import { User } from '@prisma/client';
import * as jose from 'jose';

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

export default async function getToken(user: Pick<User, 'id' | 'email'>) {
  try {
    const { id, email } = user;

    const token = await new jose.SignJWT({
      id,
      email,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(60 * 60 * 24 * 365 * 1000)
      .sign(secret);
    return token;
  } catch (e) {
    console.log(e);
  }
}
