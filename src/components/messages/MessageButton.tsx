import Link from "next/link";

interface MessageButtonProps {
  username: string;
}

export default function MessageButton({ username }: MessageButtonProps) {
  return (
    <Link href={`/messages/${username}`}>
      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
        <span>💬</span>
        <span>Enviar mensaje</span>
      </button>
    </Link>
  );
}