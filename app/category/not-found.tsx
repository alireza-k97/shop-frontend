export default function CategoryNotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold">404</h1>

      <h2 className="mt-4 text-2xl font-bold">
        دسته‌بندی پیدا نشد
      </h2>

      <p className="mt-2 text-gray-500">
        دسته‌بندی مورد نظر وجود ندارد یا حذف شده است.
      </p>
    </main>
  );
}