import { readFile, writeFile } from 'fs-extra';
import { resolve } from 'path';
import { render } from 'node-sass';
import * as postcss from 'postcss';
import * as autoprefixer from 'autoprefixer';
import { gray, red, green } from 'chalk';

const Generate = () => {
  console.log(`${gray('---')} Generating above fold styles ${gray('---')}
  `);
  const indexFile = resolve(__dirname, '..', 'public', 'index.html');
  const sassfile = resolve(__dirname, '..', 'src', 'scss', '_first-load.scss');
  readFile(indexFile, 'utf8').then(
    (file) => {
      const rx = new RegExp('<style id="first-load"[\\d\\D]*?/style>', 'g');

      render(
        {
          file: sassfile,
          outputStyle: 'compressed',
        },
        (err, result) => {
          if (err) {
            console.log(`❌  ${red('Error')} compiling SASS')}
            ${err.file} :
            ${err.line} - ${err.column})}
            ${err.message}
            `);
          } else {
            console.log('✔️  Sass compiled');
            postcss([autoprefixer])
              .process(result.css.toString(), { from: undefined })
              .then(
                (prefixedResult) => {
                  console.log('✔️  Styles autoprefixed');
                  const newFile = file.replace(
                    rx,
                    `<style id="first-load">${prefixedResult}</style>`
                  );
                  writeFile(indexFile, newFile).then(
                    () => {
                      console.log(
                        `✔️  Styles written to ${green('index.html')}`
                      );
                    },
                    (err) => {
                      console.log(
                        `❌  ${red('Error')} writing inlining styles: ${err}`
                      );
                    }
                  );
                },
                (error) => {
                  console.log(`❌  ${red('Error')} autoprefixing styles:
                  ${error}
                  `);
                }
              );
          }
        }
      );
    },
    (rejected) => {
      console.log(`❌ Error reading ${green('index.html')}
      ${rejected}
      `);
    }
  );
};

Generate();
