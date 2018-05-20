const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const rewireTypescript = require('react-app-rewire-typescript');

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireTypescript(config, env);
  config = rewireReactHotLoader(config, env);
  return config;
};
