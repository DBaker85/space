import { readFile, writeFile } from "fs-extra";
import { resolve } from "path";
import { render } from "node-sass";

const Generate = () => {
  const indexFile = resolve(__dirname, "..", "public", "index.html");
  const sassfile = resolve(__dirname, "..","src","scss","_first-load.scss");
  readFile(indexFile, "utf8").then(
    file => {
      var rx = new RegExp("<style id=\"first-load\"[\\d\\D]*?/style>", "g");
      render(
        {
          file: sassfile,
          outputStyle: "compressed"
        },
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            const newFile = file.replace(
              rx,
              `<style id="first-load">${result.css.toString()}</style>`
            );
            writeFile(indexFile, newFile).then(
              sucess => {
                console.log(`suucess ${sucess}`);
              },
              err => {
                console.log(`error: ${err}`);
              }
            );
          }
        }
      );
    },
    rejected => {
      console.log(rejected);
    }
  );
};

Generate();
