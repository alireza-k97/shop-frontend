export interface Media {
  _id: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaResponse {
  success: boolean;
  data: Media;
}

export interface MediasResponse {
  success: boolean;
  data: Media[];
}

export interface CreateMediaData {
  url: string;
}

export interface CreateMediaResponse {
  success: boolean;
  message: string;
  data: Media;
}

export interface DeleteMediaResponse {
  success: boolean;
  message: string;
  mediaId: string;
}