export interface IAWSMediaUploadParams {
  attachment: { buffer: Buffer; originalname: string };
  childrenDirs?: string[];
}
