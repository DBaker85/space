import { copy } from 'fs-extra';
import { resolve } from 'path';
import chalk from 'chalk';

const CopyKeys = () => {
  console.log(`${chalk.gray('---')} Copying certificates ${chalk.gray('---')}
  `);
  copy(
    resolve(__dirname, '..', 'server', 'keys'),
    resolve(__dirname, '..', 'dist', 'keys'),
    function(err) {
      if (err) {
        return console.log(
          `❌  ${chalk.red('Error')} copying certificates: ${err}`
        );
      }
      console.log(
        `✔️  Certificates copied to ${chalk.green(
          resolve(__dirname, '..', 'dist', 'keys')
        )}`
      );
    }
  );
};

CopyKeys();
