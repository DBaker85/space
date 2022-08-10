export default {
  locales: ["en", "fr"],
  catalogs: [
    {
      path: "locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: "po",
  extractBabelOptions: {
    plugins: ["@babel/plugin-syntax-dynamic-import"],
    presets: [
      "@babel/preset-typescript",
      "@babel/preset-react",
      "@lingui/babel-preset-react",
    ],
  },
};
