import { API_URL } from "@/lib/api";

import type {
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