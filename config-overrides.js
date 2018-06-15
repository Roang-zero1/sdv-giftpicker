const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const rewireStyledComponents = require('react-app-rewire-styled-components');

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireReactHotLoader(config, env);
  config = rewireStyledComponents(config, env);
  return config;
};
