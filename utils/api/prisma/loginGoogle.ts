'use server';
import prisma from '@/lib/prisma';
import { GoogleUser } from '@/pages-lib/profile/ProfileNoUser';
import generateToken from '@/utils/generateToken';

export default async function loginGoogle(googleUser: GoogleUser) {
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

    const token = await generateToken(googleUser);
    return { token, upsertUser };
  } catch (e) {
    console.log(e);
  }
}
