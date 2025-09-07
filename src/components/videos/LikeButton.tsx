"use client";

import { useState } from "react";

interface LikeButtonProps {
  initialLikes: number;
  videoId: string;
}

export default function LikeButton({ initialLikes, videoId }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
        isLiked
          ? "bg-red-100 text-red-600 hover:bg-red-200"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      <span className="text-xl">{isLiked ? "❤️" : "🤍"}</span>
      <span className="font-semibold">{likes}</span>
    </button>
  );
}