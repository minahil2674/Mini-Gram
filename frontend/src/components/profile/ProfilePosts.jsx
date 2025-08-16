import React from "react";
import PostCard from "../posts/PostCard";

export default function ProfilePosts({ posts }) {
  if (!posts || posts.length === 0) {
    return <p className="text-gray-500">No posts yet</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}