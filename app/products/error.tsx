"use client";

interface ErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-4 text-xl font-bold">
        دریافت محصولات با مشکل مواجه شد
      </h1>

      <button
        onClick={() => reset()}
        className="rounded cursor-pointer bg-black px-4 py-2 text-white"
      >
        تلاش مجدد
      </button>
    </main>
  );
}
