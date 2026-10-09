import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* نام فروشگاه */}
        <Link
          href="/"
          className="shrink-0 text-xl font-extrabold text-blue-700"
        >
          فروشگاه
        </Link>

        {/* لینک‌های اصلی */}
        <div className="flex items-center gap-3 text-sm sm:gap-6 sm:text-base">
          <Link
            href="/"
            className="text-gray-700 transition hover:text-blue-700"
          >
            خانه
          </Link>

          <Link
            href="/products"
            className="text-gray-700 transition hover:text-blue-700"
          >
            محصولات
          </Link>
        </div>

        {/* لینک‌های حساب کاربری */}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/sign-in"
            className="rounded-lg border border-blue-700 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-50"
          >
            ورود
          </Link>

          <Link
            href="/sign-up"
            className="hidden rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-800 sm:inline-block"
          >
            ثبت‌نام
          </Link>
        </div>
      </nav>
    </header>
  );
}