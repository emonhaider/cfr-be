console.log(`-- Webpack Custom build --`);

module.exports = function (options) {
  return {
    ...options,
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
    },
  };
};
