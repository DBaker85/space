import { openSync, fstatSync } from 'fs-extra';

import { getType } from 'mime';
import { getExtension } from './getExtension';
import { ManifestFile } from '../models/models';

// TODO: is this really the best way to do it?
export const getInitialFiles = (files: ManifestFile[]) => {
  return files.map(file => {
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
