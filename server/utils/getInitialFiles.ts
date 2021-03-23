import { openSync, fstatSync } from "fs-extra";

import { getType } from "mime";
import { getExtension } from "./getExtension";
import { ManifestFile } from "../models/models";
import { resolve, join } from "path";

export const getInitialFiles = (files: ManifestFile[], seperator: string) => {
  return files.map((file) => {
    console.log(__dirname, resolve(__dirname, "public"), file);
    const fd = openSync(
      resolve(__dirname, "public", `${file.filePath}.gz`),
      "r"
    );
    const stat = fstatSync(fd);

    return {
      path: file.path,
      file: fd,
      fd: {
        "content-length": stat.size,
        "last-modified": stat.mtime.toUTCString(),
        "content-type": getType(getExtension(file.path, seperator)),
        "content-encoding": "gzip",
      },
    };
  });
};
