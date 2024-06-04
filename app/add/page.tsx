'use client';
import withAuth from '@/hoc/withAuth';
import CreatePostModule from '@/modules/PostModule/CreatePostModule/CreatePostModule';
import React from 'react';

function AddPage<NextPage>() {
  return <CreatePostModule />;
}
export default withAuth(AddPage);
