export const mapRange = (
  value: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number
) =>
  Math.ceil(
    ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  );

export const findSmallest = (array: any[], key: string) =>
  array.reduce((prev, curr) => (prev[key] < curr[key] ? prev : curr))[key];

export const findLargest = (array: any[], key: string) =>
  array.reduce((prev, curr) => (prev[key] > curr[key] ? prev : curr))[key];

export const logger = {
  log: (message?: any, ...optionalParams: any[]) => {
    return process.env.PRODUCTION
      ? null
      : console.log(message, ...optionalParams);
  },
  warn: (message?: any, ...optionalParams: any[]) => {
    return process.env.PRODUCTION
      ? null
      : console.warn(message, ...optionalParams);
  },
  error: (message?: any, ...optionalParams: any[]) => {
    return process.env.PRODUCTION
      ? null
      : console.error(message, ...optionalParams);
  },
};
