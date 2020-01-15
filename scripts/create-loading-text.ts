import { readFile, writeFile } from 'fs-extra';
import { resolve } from 'path';
import { loadingText } from '../src/shared/loader/loading-texts';

import chalk from 'chalk';

const loader = `
  const loadingTexts = ${JSON.stringify(loadingText)};
  window.loadingTimeout = setInterval(
    ()=>{
      console.log(loadingTexts[Math.floor(Math.random()*${
        loadingText.length
      })]);
    }
  , 1000)
`;

const Generate = () => {
  console.log(`${chalk.gray('---')} Generating loader ${chalk.gray('---')}
  `);
  const indexFile = resolve(__dirname, '..', 'public', 'index.html');

  readFile(indexFile, 'utf8').then(file => {
    const rx = new RegExp('<script id="first-load"[\\d\\D]*?/script>', 'g');
    const newFile = file.replace(
      rx,
      `<script id="first-load">${loader}</script>`
    );
    writeFile(indexFile, newFile).then(
      () => {
        console.log(`✔️  Loader written to ${chalk.green('index.html')}`);
      },
      err => {
        console.log(`❌  ${chalk.red('Error')} writing loader: ${err}`);
      }
    );
  });
};

Generate();
