import { emptyDir } from 'fs-extra';
import { resolve } from 'path';

const clean = () => {
  emptyDir(resolve(__dirname, '..', 'dist'), function(err) {
    console.log('cleaning previous build');
    if (err) {
      console.log('An error occured while cleaning the folder.');
      return console.error(err);
    }
    console.log('Clean completed!');
  });
};

clean();
