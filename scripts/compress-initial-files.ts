import { createReadStream, createWriteStream, readJSONSync } from 'fs-extra';
import { resolve } from 'path';
import chalk from 'chalk';
import { createGzip } from 'zlib';
import { ManifestFile, PushManifest } from '../server/models/models';

const fileList: PushManifest = readJSONSync(
  resolve(__dirname, '..', 'build', 'push_manifest.json')
);

// TODO: Add more verbose logging with filenames and sizes

const compressInitialFiles = (files: ManifestFile[]) => {
  console.log('');
  console.log(`${chalk.gray('---')} Compressing main bundles ${chalk.gray(
    '---'
  )}
  `);
  files.forEach(file => {
    const fileContents = createReadStream(file.filePath);
    const writeStream = createWriteStream(`${file.filePath}.gz`);
    const zip = createGzip();
    fileContents.pipe(zip).pipe(writeStream);
  });
  console.log(`✔️  Initial files compressed
      `);
};

compressInitialFiles(fileList.initial);
