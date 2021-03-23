export const getExtension = (filename: any, seperator: string) => {
  const splitnames = filename.split(seperator).pop().split(".");
  const ext = `${splitnames[splitnames.length - 1]}`;
  return ext;
};
