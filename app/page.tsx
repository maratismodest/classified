import Main from "@/pages-lib/main";
import fetchPosts from "@/utils/api/prisma/fetchAds";
import React from "react";

export default async function Home() {

  const posts = await fetchPosts({})

  return (
    <>
      <Main posts={posts}/>
    </>
  )
}
