const { override, adjustWorkbox, addWebpackPlugin } = require('customize-cra');
const ManifestPlugin = require('webpack-manifest-plugin');

const fontRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.ttf|.woff|.woff2|.eot)$/i;
const imgRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.svg|.png|.gif)$/i;

const nameBuilder = filename => {
  const splitnames = filename
    .split('/')
    .pop()
    .split('.');
  const name = `${splitnames[0]}.${splitnames[splitnames.length - 1]}`;
  return name;
};

module.exports = override(
  // adjust the underlying workbox
  adjustWorkbox(wb =>
    Object.assign(wb, {
      offlineGoogleAnalytics: true
    })
  ),

  addWebpackPlugin(
    new ManifestPlugin({
      fileName: 'push_manifest.json',
      filter: file => !file.name.endsWith('map'),
      generate: (seed, files) => {
        const initial = files
          .filter(file => file.isInitial && !file.name.includes('runtime'))
          .map(file => ({ path: file.path, filePath: `./build${file.path}` }));

        const fonts = files
          .filter(file => fontRegex.test(file.path))
          .reduce(
            (manifest, { path }) => ({
              ...manifest,
              [nameBuilder(path)]: { path, filePath: `./build${path}` }
            }),
            seed
          );

        const images = files
          .filter(file => imgRegex.test(file.name))
          .reduce(
            (manifest, { name, path }) => ({
              ...manifest,
              [nameBuilder(name)]: { path, filePath: `./build${path}` }
            }),
            seed
          );

        return { initial, fonts, images };
      }
    })
  )
);
