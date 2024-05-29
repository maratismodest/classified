'use client';

import Spinner from '@/components/ui/Spinner';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Spinner />;
  }

  if (!session) {
    return (
      <div>
        <p>Not signed in</p>
        <button onClick={() => signIn('google')}>Sign in with Google</button>
      </div>
    );
  }

  return (
    <div>
      <p>Signed in as {session.user && session.user.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
