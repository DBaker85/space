import ReactGA, { EventArgs } from 'react-ga';
import { idleCallback } from '../utils/idleCallback';

export const analyticsEvent = (options: EventArgs) => {
  const event = () => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.event({ ...options });
    } else {
      console.log(`Analytics Event => ${JSON.stringify({ ...options })}`);
    }
  };
  idleCallback(() => event());
};

export const eventActions = {
  clicked: (text: string) => `Clicked ${text}`,
  dragged: (text: string) => `Dragged ${text}`
};
export const eventCategories = {
  user: 'User'
};
