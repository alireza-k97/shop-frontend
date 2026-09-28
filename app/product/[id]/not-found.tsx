export default function ProductNotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          محصول پیدا نشد
        </h1>

        <p className="mt-3 text-gray-500">
          محصولی با این شناسه وجود ندارد.
        </p>
      </div>
    </main>
  );
}