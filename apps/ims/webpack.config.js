/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const gqlPlugin = require('@nestjs/graphql/plugin');

module.exports = (config) => {
  const tsLoader = config.module.rules.find(
    (rule) => rule.loader === 'ts-loader'
  );

  tsLoader.loader = 'ts-loader';
  tsLoader.options.getCustomTransformers = (program) => ({
    before: [gqlPlugin.before({}, program)],
  });
  tsLoader.options.transpileOnly = true;

  return config;
};
