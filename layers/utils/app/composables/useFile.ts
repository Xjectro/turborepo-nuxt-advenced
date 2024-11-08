interface IUploadFileOptions {
  startTime: string;
  duration: string;
  type?: string;
}

export const useFile = () => {
  const uploadFile = async (file: File, options?: IUploadFileOptions) => {
    const formData = new FormData();
    formData.append("attachment", file);

    const queryParams = new URLSearchParams();

    if (options?.startTime) queryParams.append("startTime", options.startTime);
    if (options?.duration) queryParams.append("duration", options.duration);
    if (options?.type) queryParams.append("type", options.type);

    try {
      const data = await $fetch(
        `/api/cdn/upload/file${queryParams.toString() ? `?${queryParams.toString()}` : ""}`,
        {
          method: "POST",
          body: formData,
        },
      );

      return data?.data;
    } catch {
      return false;
    }
  };

  function tryUploadFile(file: File | null, options?: IUploadFileOptions) {
    return file ? uploadFile(file, options) : Promise.resolve(null);
  }

  return { uploadFile, tryUploadFile };
};
