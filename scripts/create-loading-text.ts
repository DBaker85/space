import { readFile, writeFile } from 'fs-extra';
import { resolve } from 'path';
import { loadingText } from '../src/shared/loader/loading-texts';
import { minify, MinifyOptions } from 'uglify-js';
import chalk from 'chalk';

const loader = `
  var loadingTexts = ${JSON.stringify(loadingText)};

  function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
  }

  function textLoader() {
    var loadingElement = document.getElementById("loader");
    window.loadingTimeout = setInterval(
      function(){
       loadingElement.innerHTML = loadingTexts[Math.floor(Math.random()*${
         loadingText.length
       })+"..."];
      }
      , 2000)
  }

  docReady(textLoader)
`;

const options: MinifyOptions = {
  mangle: {
    toplevel: true
  }
};

const minifiedLoaderCode = minify(loader, options);

const Generate = () => {
  console.log(`${chalk.gray('---')} Generating loader ${chalk.gray('---')}
  `);
  const indexFile = resolve(__dirname, '..', 'public', 'index.html');
  // FIXME: Add error handling
  readFile(indexFile, 'utf8').then(
    file => {
      const rx = new RegExp('<script id="first-load"[\\d\\D]*?/script>', 'g');
      const newFile = file.replace(
        rx,
        `<script id="first-load">${minifiedLoaderCode.code}</script>`
      );
      writeFile(indexFile, newFile).then(
        () => {
          console.log(`✔️  Loader written to ${chalk.green('index.html')}`);
        },
        err => {
          console.log(`❌  ${chalk.red('Error')} writing loader: ${err}`);
        }
      );
    },
    rejected => {
      console.log(`❌ Error reading ${chalk.green('index.html')}
    ${rejected}
    `);
    }
  );
};

Generate();
