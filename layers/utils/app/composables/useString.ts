export const useString = () => {
  const maskEmail = (email: string): string => {
    const [localPart, domain] = email.split("@");
    if (!localPart) return email;

    const maskedLocalPart = `${localPart.slice(0, 2)}${"*".repeat(localPart.length - 2)}`;
    return `${maskedLocalPart}@${domain}`;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  function formatDuration(seconds: number) {
    return new Date(1000 * seconds).toISOString().slice(14, 19);
  }

  function formatDownloadLink(link: string) {
    const url = new URL(link);

    const args = url.pathname.slice(1).split("/");

    const path = args.slice(0, -1).join("%2F");
    const fileName = args.pop();

    return `/api/cdn/download/file/${path}/${fileName}`;
  }

  function getPreviewURL(input: File | string | null) {
    if (typeof input === "string") {
      return input;
    }
    return input instanceof File ? URL.createObjectURL(input) : null;
  }

  return {
    maskEmail,
    formatTime,
    formatDuration,
    formatDownloadLink,
    getPreviewURL,
  };
};
