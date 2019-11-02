const { override, adjustWorkbox, addWebpackPlugin } = require('customize-cra');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = override(
  // adjust the underlying workbox
  adjustWorkbox(wb =>
    Object.assign(wb, {
      offlineGoogleAnalytics: true
    })
  ),
  addWebpackPlugin(
    new ManifestPlugin({
      fileName: 'testerino.json',
      filter: file => file.isInitial && !file.name.endsWith('map')
    })
  )
);
