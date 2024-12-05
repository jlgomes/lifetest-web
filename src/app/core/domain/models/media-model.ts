export interface MediaModel {
  id: string;
  filename: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string;
  updatedBy: string;
}

export interface MediaDataModel {
  media: MediaModel;
  base64Data: string;
}
