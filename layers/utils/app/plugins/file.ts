export default defineNuxtPlugin(() => {
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("attachment", file);

    const { data, error } = await useFetch("/api/cdn/upload-file", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (error.value) return false;

    return data.value?.data;
  };

  return {
    provide: {
      uploadFile,
    },
  };
});
