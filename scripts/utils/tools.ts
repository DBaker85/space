
export const hyphenToCamel = string => {
    let filename = string.split("-");
  
    if (filename.length > 1) {
      let splitFilename = [filename[0]];
      for (let index = 1; index < filename.length; index++) {
        splitFilename.push(
          filename[index].charAt(0).toUpperCase() + filename[index].slice(1)
        );
      }
      return splitFilename.join("");
    } else {
      return filename[0];
    }
  };