/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const gqlPlugin = require('@nestjs/graphql/plugin');

module.exports = (config) => {
  const tsLoader = config.module.rules.find(
    (rule) => rule.loader === 'ts-loader'
  );

  tsLoader.loader = '@maxchehab/ts-loader';
  tsLoader.options.getCustomTransformers = (program) => ({
    before: [gqlPlugin.before({}, program)],
  });
  tsLoader.options.transpileOnly = false;
  tsLoader.options.emitOnly = [/\.ts$/];

  return config;
};
