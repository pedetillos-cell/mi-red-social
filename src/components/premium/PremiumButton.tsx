import Link from "next/link";

export default function PremiumButton() {
  return (
    <Link href="/premium">
      <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all shadow-md">
        <span className="text-lg">⭐</span>
        <span className="font-semibold">Hazte Premium</span>
      </button>
    </Link>
  );
}