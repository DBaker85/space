import { createProgram, ModuleKind, CompilerOptions } from 'typescript';
import { resolve } from 'path';
import { readJSON, writeFileSync } from 'fs-extra';
import chalk from 'chalk';

const entryFile = resolve(__dirname, '..', 'server', 'server.ts');
const tsConfig = resolve(__dirname, '..', 'server', 'tsconfig.json');

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
