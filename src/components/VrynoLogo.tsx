import Link from "next/link";

export default function VrynoLogo() {
  return (
    <Link href="/">
      <div className="bg-sky-500 hover:bg-sky-600 px-3 py-1 rounded-md transition-colors">
        <h1 className="text-white font-bold text-lg">Vryno</h1>
      </div>
    </Link>
  );
}