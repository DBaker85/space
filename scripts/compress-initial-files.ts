import {
  createReadStream,
  createWriteStream,
  readJSONSync,
  openSync,
  fstatSync
} from 'fs-extra';
import { resolve } from 'path';
import chalk from 'chalk';
import { createGzip } from 'zlib';
import { ManifestFile, PushManifest } from '../server/models/models';

const fileList: PushManifest = readJSONSync(
  resolve(__dirname, '..', 'build', 'push_manifest.json')
);

const compressInitialFiles = (files: ManifestFile[]) =>
  new Promise((resolve, reject) => {
    console.log('');
    console.log(`${chalk.gray('---')} Compressing main bundles ${chalk.gray(
      '---'
    )}
  `);
    const fileCount = files.length;
    let finishedfiles = [];
    files.forEach((file, index) => {
      const fileContents = createReadStream(file.filePath);
      const writeStream = createWriteStream(`${file.filePath}.gz`);
      const zip = createGzip();
      fileContents.pipe(zip).pipe(writeStream);
      writeStream.on('finish', () => {
        finishedfiles.push(index);
        if (finishedfiles.length === fileCount) {
          resolve();
        }
      });
      writeStream.on('error', () => {
        reject();
      });
    });
    console.log(`✔️  Initial files compressed
      `);
  });

const logStats = (files: ManifestFile[]) => {
  console.log('');
  console.log(`${chalk.gray('---')} Gzipped file sizes ${chalk.gray('---')}
  `);
  files.forEach(file => {
    const fd = openSync(`${file.filePath}`, 'r');
    const stat = fstatSync(fd);
    const zipFd = openSync(`${file.filePath}.gz`, 'r');
    const zipStat = fstatSync(zipFd);
    const filePath = file.filePath.split('/');
    const filename = filePath.pop();
    console.log(
      `${(stat.size / 1024).toFixed(2)} Kb \t> \t${chalk.green(
        (zipStat.size / 1024).toFixed(2)
      )} Kb`,
      `\t ${filePath.join('/')}/${chalk.cyan(filename)}.gz`
    );
  });
};

compressInitialFiles(fileList.initial).then(() => logStats(fileList.initial));
