export const idleCallback = (cb: Function) => {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => cb(), { timeout: 4000 });
  } else {
    setTimeout(() => cb(), 3000);
  }
};
