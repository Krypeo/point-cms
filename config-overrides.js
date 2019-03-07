const { injectBabelPlugin } = require("react-app-rewired");
const rewireMobX = require("react-app-rewire-mobx");
const rewireLess = require('react-app-rewire-less');
const colors = require('./src/styles/colors');

module.exports = function override(config, env) {
  config = injectBabelPlugin("babel-plugin-styled-components", config);
  config = rewireMobX(config, env);
  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true,
    modifyVars: colors
  })(config, env);

  return config;
};