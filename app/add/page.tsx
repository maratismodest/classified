'use client';
import Spinner from '@/components/ui/Spinner';
import useAuth from '@/hooks/useAuth';
import CreatePostModule from '@/modules/PostModule/CreatePostModule/CreatePostModule';
import ProfileNoUser from '@/pages-lib/profile/ProfileNoUser';
import React from 'react';

export default function AddPage<NextPage>() {
  const { user, loading: userLoading } = useAuth();

  if (userLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <ProfileNoUser />;
  }

  return <CreatePostModule />;
}
