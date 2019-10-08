import React, { useEffect } from 'react';
import ReactGA, { FieldsObject } from 'react-ga';
import { RouteComponentProps } from 'react-router-dom';

const config = [
  {
    trackingId: 'UA-141677330-1',
    debug: true,
    gaOptions: {
      cookieDomain: 'none'
    }
  }
];

// TODO set to idlecallback or use idle queue
ReactGA.initialize(config);

export const withRouteTracker = <P extends RouteComponentProps>(
  WrappedComponent: React.ComponentType<P>,
  options: FieldsObject = {}
) => {
  const trackPage = (page: string) => {
    ReactGA.set({ page, ...options });
    ReactGA.pageview(page);
  };

  return (props: P) => {
    useEffect(() => {
      trackPage(props.location.pathname);
    }, [props.location.pathname]);

    return <WrappedComponent {...props} />;
  };
};

// TODO: click and event trackers
