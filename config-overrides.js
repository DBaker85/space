const { override, adjustWorkbox, addWebpackPlugin } = require('customize-cra');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = override(
  // adjust the underlying workbox
  adjustWorkbox(wb =>
    Object.assign(wb, {
      offlineGoogleAnalytics: true
    })
  ),
  addWebpackPlugin(
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'test/admin.json'
    })
  )
);
