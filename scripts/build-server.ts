import {
  createProgram,
  CompilerOptions,
  getPreEmitDiagnostics,
  flattenDiagnosticMessageText
} from 'typescript';
import { resolve } from 'path';
import { readJSON, writeFileSync, copy } from 'fs-extra';
import chalk from 'chalk';

const entryFile = resolve(__dirname, '..', 'server', 'server.ts');
const tsConfig = resolve(__dirname, '..', 'server', 'tsconfig.json');

let tsErrors = 0;

const BuildServer = () => {
  console.log('');
  console.log(`${chalk.gray('---')} Compiling server ${chalk.gray('---')}
  `);

  readJSON(tsConfig)
    .catch(err => {
      console.log(`❌  ${chalk.red('Error')} reading config file: ${err}
      `);
      process.exit(1);
    })
    .then(({ compilerOptions }) => {
      const mappedOptions: CompilerOptions = {
        ...compilerOptions,
        ...{ moduleResolution: 2, outDir: resolve(__dirname, '..', 'dist') }
      };

      let program = createProgram([entryFile], mappedOptions);
      const emitResult = program.emit();

      //--------------------------

      let allDiagnostics = getPreEmitDiagnostics(program).concat(
        emitResult.diagnostics
      );

      allDiagnostics.forEach(diagnostic => {
        if (diagnostic.file) {
          let {
            line,
            character
          } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);

          let message = flattenDiagnosticMessageText(
            diagnostic.messageText,
            '\n'
          );
          console.log(
            `${chalk.cyan(diagnostic.file.fileName)}:${chalk.yellow(
              (line + 1).toString()
            )}:${chalk.yellow((character + 1).toString())} - ${chalk.red(
              'error'
            )} ${chalk.gray('TS' + diagnostic.code + ':')} ${message} \n`
          );

          tsErrors++;
        } else {
          console.log(
            `${flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`
          );
          process.exit(1);
        }
      });

      if (tsErrors > 0) {
        console.log(`❌  compiling typescript failed with ${tsErrors} errors
        `);
        process.exit(2);
      }

      if (emitResult.emitSkipped) {
        console.log(`❌  ${chalk.red('Error')} compiling typescript
        `);
        process.exit(1);
      }

      console.log(`✔️  Server Compiled
      `);

      process.exit(0);
    });
};

BuildServer();
