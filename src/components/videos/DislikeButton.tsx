"use client";

import { useState } from "react";

interface DislikeButtonProps {
  initialDislikes: number;
  videoId: string;
}

export default function DislikeButton({ initialDislikes, videoId }: DislikeButtonProps) {
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleDislike = () => {
    if (isDisliked) {
      setDislikes(dislikes - 1);
    } else {
      setDislikes(dislikes + 1);
    }
    setIsDisliked(!isDisliked);
  };

  return (
    <button
      onClick={handleDislike}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
        isDisliked
          ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      <span className="text-xl">{isDisliked ? "👎🏼" : "👎"}</span>
      <span className="font-semibold">{dislikes}</span>
    </button>
  );
}