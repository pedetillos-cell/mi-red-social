import LikeButton from "./LikeButton";
import DislikeButton from "./DislikeButton";

interface VideoActionsProps {
  videoId: string;
  initialLikes: number;
  initialDislikes: number;
}

export default function VideoActions({ videoId, initialLikes, initialDislikes }: VideoActionsProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <LikeButton videoId={videoId} initialLikes={initialLikes} />
      <DislikeButton videoId={videoId} initialDislikes={initialDislikes} />
      
      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">
        <span className="text-xl">💬</span>
        <span className="font-semibold">Comentar</span>
      </button>
      
      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">
        <span className="text-xl">↗️</span>
        <span className="font-semibold">Compartir</span>
      </button>
    </div>
  );
}