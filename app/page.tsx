import Main from "@/pages-lib/main";
import fetchPosts from "@/utils/api/prisma/fetchAds";
import React from "react";

export default async function Home() {

  const posts = await fetchPosts({})
  console.log('posts',posts)

  return (
    <>
      <Main posts={posts}/>
    </>
  )
}
