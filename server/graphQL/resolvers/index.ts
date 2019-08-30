const hello = {
  hello: () => 'Hello world!'
};
const goodbye = {
  goodbye: () => 'Goodbye cruel world'
};

// Provide resolver functions for your schema fields
export const resolvers = {
  Query: { ...hello, ...goodbye }
};
