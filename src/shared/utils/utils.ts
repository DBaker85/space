/** Create uniqueID of required length */
export const uid = (length: number) =>
  [...Array(length)].map(i => (~~(Math.random() * 36)).toString(36)).join('');

export const randomNegative = (n: number) =>
  Math.random() > 0.5 ? Math.abs(n) : -Math.abs(n);
