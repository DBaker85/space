import React, { useEffect, ComponentType } from 'react';
import ReactGA, { FieldsObject } from 'react-ga';
import { RouteComponentProps } from 'react-router-dom';

import { idleCallback } from '../utils/idleCallback';

const config = [
  {
    trackingId: 'UA-141677330-1',
    debug: process.env.NODE_ENV === 'production' ? false : true
  }
];

idleCallback(() => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize(config);
  }
});

export const withRouteTracker = <P extends RouteComponentProps>(
  WrappedComponent: ComponentType<P>,
  options: FieldsObject = {}
) => {
  const trackPage = (page: string) => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.set({ page, ...options });
      ReactGA.pageview(page);
    }
  };

  return (props: P) => {
    useEffect(() => {
      idleCallback(() => trackPage(props.location.pathname));
    }, [props.location.pathname]);

    return <WrappedComponent {...props} />;
  };
};
