"use client";
import { getMedias } from "@/services/mediaService";
import { useQuery } from "@tanstack/react-query";
import DeleteMediaButton from "./DeleteMediaButton";

export default function MediaList() {
  const {
    data: medias,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["medias"],
    queryFn: getMedias,
  });

  if (isLoading) {
    return <p className="rounded bg-gray-100 p-4">در حال دریافت رسانه‌ها...</p>;
  }

  if (isError) {
    return (
      <p className="rounded bg-red-100 p-4 text-red-700">
        {error instanceof Error ? error.message : "خطا در دریافت رسانه‌ها"}
      </p>
    );
  }

  return (
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
          {medias?.map((media) => (
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
                <DeleteMediaButton mediaId={media._id}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
