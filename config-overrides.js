const { override, adjustWorkbox } = require('customize-cra');

module.exports = override(
  // adjust the underlying workbox
  adjustWorkbox(wb =>
    Object.assign(wb, {
      offlineGoogleAnalytics: true
    })
  )
);
