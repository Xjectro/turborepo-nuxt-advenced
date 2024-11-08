import multer from "multer";

export const upload = multer({
  dest: "uploads/",
  //storage: multer.memoryStorage(),
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE as string) || 15 * 1024 * 1024,
  }, // 15 MB limit
});
