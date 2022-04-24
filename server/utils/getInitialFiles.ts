import { openSync, fstatSync } from "fs-extra";
import { ManifestFile } from "../models/models";
import { join, sep } from "path";

export const getInitialFiles = (files: ManifestFile[]) => {
  return files.map((file) => {
    const filePath = file.path.join(sep);

    const fd = openSync(join("dist", "public", `${filePath}.gz`), "r");
    const stat = fstatSync(fd);

    return {
      path: filePath,
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
