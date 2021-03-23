import { openSync, fstatSync } from "fs-extra";
import { ManifestFile } from "../models/models";
import { resolve, join } from "path";

export const getInitialFiles = (files: ManifestFile[], seperator: string) => {
  return files.map((file) => {
    // console.log()
    const fd = openSync(
      join(process.cwd(),"dist", "public", `${file.filePath}.gz`),
      "r"
    );
    const stat = fstatSync(fd);

    return {
      path: file.path,
      file: fd,
      fd: {
        "content-length": stat.size,
        "last-modified": stat.mtime.toUTCString(),
        "content-type": file.mimeType,
        "content-encoding": "gzip",
      },
    };
  });
};
