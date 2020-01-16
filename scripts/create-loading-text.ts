import { readFile, writeFile } from 'fs-extra';
import { resolve } from 'path';
import { getRandomText, loadingText } from '../src/shared/loader/loading-texts';
import { minify, MinifyOptions } from 'uglify-js';
import chalk from 'chalk';

const loader = `
  var loadingTexts = ${JSON.stringify(loadingText)};

  function textLoader() {
    var loadingElement = document.getElementById("first-load-text");
    window.loadingTimeout = setInterval(
      function(){
        if (loadingElement){
       loadingElement.innerHTML = loadingTexts[Math.floor(Math.random()*${
         loadingText.length
       })]+"...";
      }}
      , 2000)
  };

  textLoader();
`;

const options: MinifyOptions = {
  mangle: {
    toplevel: true
  }
};

const Generate = minifiedLoaderCode => {
  console.log(`${chalk.gray('---')} Generating loader ${chalk.gray('---')}
  `);
  const indexFile = resolve(__dirname, '..', 'public', 'index.html');
  readFile(indexFile, 'utf8').then(
    file => {
      const rx = new RegExp(
        '<script id="first-load-script"[\\d\\D]*?/script>',
        'g'
      );
      const rxLoading = new RegExp(
        '<div id="first-load-text"[\\d\\D]*?/div>',
        'g'
      );
      const newFile = file
        .replace(
          rx,
          `<script id="first-load-script">${minifiedLoaderCode}</script>`
        )
        .replace(
          rxLoading,
          `<div id="first-load-text">${getRandomText()}...</div>`
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

const minifiedLoaderCode = minify(loader, options);

if (minifiedLoaderCode.error) {
  console.log(minifiedLoaderCode.error);
  console.log(
    `❌  ${chalk.red('Error')} compressing loading script. See stacktrace above`
  );
} else {
  Generate(minifiedLoaderCode.code);
}
