import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/posts/PostCard';
import CommentSection from '../components/posts/CommentSection';
import { usePostStore } from '../store/postStore';

export default function PostDetailsPage() {
  const { id } = useParams();
  const { selectedPost, fetchPostById } = usePostStore();

  useEffect(() => {
    fetchPostById(id);
  }, [id]);

  if (!selectedPost) return <p className="text-center mt-10">Loading post...</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <PostCard post={selectedPost} />
      <CommentSection postId={id} />
    </div>
  );
}
