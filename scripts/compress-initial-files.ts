import { createReadStream, createWriteStream, readJSONSync } from 'fs-extra';

import { resolve } from 'path';

import { ManifestFile, PushManifest } from '../server/models/models';

import { createGzip } from 'zlib';

const fileList: PushManifest = readJSONSync(
  resolve(__dirname, '..', 'build', 'push_manifest.json')
);

// TODO: is this really the best way to do it?
const compressInitialFiles = (files: ManifestFile[]) => {
  return files.map(file => {
    const fileContents = createReadStream(file.filePath);
    const writeStream = createWriteStream(`${file.filePath}.gz`);
    const zip = createGzip();
    fileContents.pipe(zip).pipe(writeStream);
  });
};

compressInitialFiles(fileList.initial);
