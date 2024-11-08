import { type Request } from "express";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs/promises";
import { InternalServerError } from "@repo/utils/exceptions";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export default class Helpers {
  getChildrenDirs(req: Request): string[] {
    const children = ["attachments"];
    if (req.isAuthenticated()) {
      children.push(req.user.user_id);
    }
    return children;
  }

  async trimFile({
    startTime,
    duration,
    originalname,
    path: inputPath,
  }: {
    startTime: number;
    duration: number;
    originalname: string;
    path: string;
  }): Promise<Buffer> {
    const buffer = await new Promise<Buffer>((resolve, reject) => {
      let outputPath = path.join(
        __dirname,
        `../../api/commit/output-${Date.now()}.${originalname}`,
      );

      ffmpeg(inputPath)
        .setStartTime(startTime)
        .setDuration(duration - startTime)
        .output(outputPath)
        .on("end", async () => {
          const data = await fs.readFile(outputPath);
          await fs.unlink(outputPath);
          resolve(data);
        })
        .on("error", async () => {
          await fs.unlink(outputPath);
          reject(new InternalServerError("Video trimming failed."));
        })
        .run();
    });

    return buffer;
  }
}
