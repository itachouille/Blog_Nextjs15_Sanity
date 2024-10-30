import React from "react";
import { client } from "@/sanity/lib/client";
import { POSTS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import PostCard, { PostTypeCard } from "./PostCard";

const UserPosts = async ({ id }: { id: string }) => {
  const posts = await client.fetch(POSTS_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post: PostTypeCard, index: number) => (
          <PostCard key={index} post={post} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
};

export default UserPosts;
