import {
  openSync,
  fstatSync,
  createReadStream,
  createWriteStream
} from 'fs-extra';
import { getType } from 'mime';
import { getExtension } from './getExtension';
import { ManifestFile } from '../models/models';
import { createGzip } from 'zlib';

// TODO: is this really the best way to do it?
export const getInitialFiles = (files: ManifestFile[]) => {
  return files.map(file => {
    const fileContents = createReadStream(file.filePath);
    const writeStream = createWriteStream(`${file.filePath}.gz`);
    const zip = createGzip();
    fileContents.pipe(zip).pipe(writeStream);

    const fd = openSync(`${file.filePath}.gz`, 'r');
    const stat = fstatSync(fd);

    return {
      path: file.path,
      file: fd,
      fd: {
        'content-length': stat.size,
        'last-modified': stat.mtime.toUTCString(),
        'content-type': getType(getExtension(file.path)),
        'content-encoding': 'gzip'
      }
    };
  });
};
