import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-2xl text-gray-600 mb-2">Page Not Found</h2>
            <p className="text-gray-500 mb-6">
                Sorry, the page you are looking for doesn’t exist or has been
                moved.
            </p>
            <Link
                href="/"
                className="px-6 py-2 bg-black text-white rounded hover:bg-black-700 transition"
            >
                Go Home
            </Link>
        </main>
    );
}
