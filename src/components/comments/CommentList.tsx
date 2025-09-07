interface Comment {
  id: string;
  content: string;
  author: {
    username: string;
    avatar?: string;
  };
  createdAt: string;
}

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No hay comentarios todavía.</p>
        <p>¡Sé el primero en comentar!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center">
            <span className="text-sm text-gray-600">
              {comment.author.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm">@{comment.author.username}</span>
                <span className="text-xs text-gray-500">• {comment.createdAt}</span>
              </div>
              <p className="text-gray-800">{comment.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}