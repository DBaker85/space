import { emptyDir } from 'fs-extra';
import { resolve } from 'path';
import chalk from 'chalk';

const clean = () => {
  console.log(`${chalk.gray('---')} Cleaning previous build ${chalk.gray('---')}
  `);
  emptyDir(resolve(__dirname, '..', 'dist'), function(err) {
    if (err) {
      return console.log(
        `❌  ${chalk.red('Error')} cleaning previous build: ${err}`
      );
    }
    console.log(`✔️  Previous build cleaned`);
  });
};

clean();
