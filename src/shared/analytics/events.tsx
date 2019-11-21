import ReactGA, { EventArgs } from 'react-ga';
import { idleCallback } from '../utils/idleCallback';

export const analyticsEvent = (options: EventArgs) => {
  const event = () => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.event({ ...options });
    }
  };
  idleCallback(() => event());
};

export const eventActions = {
  clicked: (text: string) => `Clicked ${text}`
};
export const eventCategories = {
  user: 'User'
};
