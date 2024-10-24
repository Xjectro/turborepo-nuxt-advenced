module.exports = {
  jsc: {
    parser: {
      syntax: "typescript",
      tsx: false,
    },
    target: "es2015",
    loose: true,
  },
  module: {
    type: "es6",
  },
  sourceMaps: true,
  minify: false,
};
