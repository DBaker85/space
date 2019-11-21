export const getExtension = (filename: any) => {
  const splitnames = filename
    .split('/')
    .pop()
    .split('.');
  const ext = `${splitnames[splitnames.length - 1]}`;
  return ext;
};
