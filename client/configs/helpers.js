module.exports = {
  nameBuilder: (filename) => {
    const splitnames = filename.split("/").pop().split(".");
    const name = `${splitnames[0]}.${splitnames[splitnames.length - 1]}`;
    return name;
  },

  splitPath: (path) => path.replace(/\\/g, "/").split("/"),

  fontRegex: /([a-zA-Z0-9\s_\\.\-\(\):])+(.ttf|.woff|.woff2|.eot)$/i,
  imgRegex: /([a-zA-Z0-9\s_\\.\-\(\):])+(.svg|.png|.gif)$/i,
};
