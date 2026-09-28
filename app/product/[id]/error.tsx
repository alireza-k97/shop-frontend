"use client";

interface ErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <main>
      <h1>خطایی رخ داده است</h1>

      <p>دریافت اطلاعات محصول با مشکل مواجه شد.</p>

      <button onClick={() => reset()}>
        تلاش مجدد
      </button>
    </main>
  );
}