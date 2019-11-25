import { copy } from 'fs-extra';
import { resolve } from 'path';

const CopyKeys = () => {
  copy(
    resolve(__dirname, '..', 'server', 'keys'),
    resolve(__dirname, '..', 'dist', 'keys'),
    function(err) {
      console.log('copying');
      if (err) {
        console.log('An error occured while copying the folder.');
        return console.error(err);
      }
      console.log('Copy completed!');
    }
  );
};

CopyKeys();
