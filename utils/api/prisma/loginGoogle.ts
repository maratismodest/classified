'use server';
import prisma from '@/lib/prisma';
import { GoogleUser } from '@/pages-lib/profile/ProfileNoUser';
import * as jose from 'jose';

const secret = new TextEncoder().encode('Kazan2023!');

export default async function loginGoogle(googleUser: GoogleUser) {
  console.log('googleUser', googleUser);
  try {
    const { email, name, image } = googleUser;
    const upsertUser = await prisma.user.upsert({
      where: {
        email: email,
      },
      update: {
        name: name,
        image: image,
      },
      create: {
        email,
        name,
        image,
      },
    });

    // console.log('upsertUser', upsertUser);

    const token = await new jose.SignJWT({
      email: upsertUser.email,
      name: upsertUser.name,
      image: upsertUser.image,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(60 * 60 * 24 * 365 * 1000)
      .sign(secret);
    return { token, upsertUser };
  } catch (e) {
    console.log(e);
  }
}
