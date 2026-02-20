// app/not-found.tsx (Next.js 13+ with App Router)
import Image from "next/image";
import { periphirals } from "@/constant"; // replace with your SVG path

export default function _NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg text-center">
        {/* SVG Image */}
        <div className="mb-8 w-full">
          <Image
            src={periphirals.notfound} // your SVG here
            alt="Page Not Found"
            width={400}
            height={400}
            className="mx-auto w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            priority
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Oops! Page not found
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-6">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        {/* Back button */}
        <a
          href="/"
          className="inline-block px-6 py-3 bg-primary-soft text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark transition-colors"
        >
          Go Back Home
        </a>
      </div>
    </main>
  );
}
