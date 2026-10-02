import { getMedias } from "@/services/mediaService";
import MediaForm from "@/components/dashboard/MediaForm";
import DeleteMediaButton from "@/components/dashboard/DeleteMediaButton";

export default async function DashboardMediaPage() {
  const medias = await getMedias();

  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        مدیریت رسانه‌ها
      </h1>

      <MediaForm />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100 text-right">
              <th className="border p-3">
                تصویر
              </th>

              <th className="border p-3">
                آدرس
              </th>

              <th className="border p-3">
                عملیات
              </th>
            </tr>
          </thead>

          <tbody>
            {medias.map((media) => (
              <tr key={media._id}>
                <td className="border p-3">
                  <img
                    src={media.url}
                    alt="Media"
                    className="h-16 w-16 rounded object-cover"
                  />
                </td>

                <td className="border p-3">
                  <span className="break-all">
                    {media.url}
                  </span>
                </td>

                <td className="border p-3">
                  <DeleteMediaButton
                    mediaId={media._id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}