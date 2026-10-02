import { API_URL } from "@/lib/api";

import type {
  CreateMediaData,
  CreateMediaResponse,
  DeleteMediaResponse,
  Media,
  MediasResponse,
} from "@/types/media";

export async function getMedias(): Promise<Media[]> {
  const response = await fetch(`${API_URL}/api/media`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch media: ${response.status}`);
  }

  const result: MediasResponse = await response.json();

  return result.data;
}

export async function createMedia(
  data: CreateMediaData,
): Promise<CreateMediaResponse> {
  const response = await fetch(`${API_URL}/api/media`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result: CreateMediaResponse = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function deleteMedia(id: string): Promise<DeleteMediaResponse> {
  const response = await fetch(`${API_URL}/api/media/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const result: DeleteMediaResponse = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}
