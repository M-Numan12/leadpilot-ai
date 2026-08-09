import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-2">Page Not Found</p>
      <Link href="/" className="mt-4 text-blue-600 underline">
        Return Home
      </Link>
    </div>
  );
}
