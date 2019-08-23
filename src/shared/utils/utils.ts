/** Create uniqueID of required length */
export const uid = (length: number) =>
  [...Array(length)].map(i => (~~(Math.random() * 36)).toString(36)).join('');
