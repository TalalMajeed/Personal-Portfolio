import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="bg-white">
      <Navigation />
      <main className="flex-1 h-[93svh] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">404</h1>
          <p className="mt-4 text-xl text-gray-800">Page not found</p>
          <p className="mt-2 text-gray-600">
            The page you&apos;re looking for doesn&apos;t exist or may have been
            moved.
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
            >
              Go back home
            </Link>
          </div>
        </div>
        123
      </main>
      <Footer />
    </div>
  );
}
