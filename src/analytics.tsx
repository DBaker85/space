import ReactGA from 'react-ga';

const config = [
  {
    trackingId: 'UA-141677330-1',
    debug: true,
    gaOptions: {
      cookieDomain: 'none'
    }
  }
];

ReactGA.initialize(config);
// Send initial test view
ReactGA.pageview('test-init-pageview');
