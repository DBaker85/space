type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
  timeout: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: () => number;
};

declare global {
  interface Window {
    requestIdleCallback: (
      callback: (deadline: RequestIdleCallbackDeadline) => void,
      opts?: RequestIdleCallbackOptions
    ) => RequestIdleCallbackHandle;
    cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void;
  }
}

export const idleCallback = (cb: Function) => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => cb(), { timeout: 4000 });
  } else {
    setTimeout(() => cb(), 3000);
  }
};
