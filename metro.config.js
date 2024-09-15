const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const path = require('path');

// Custom configuration
const customConfig = {
  resolver: {
    extraNodeModules: {
      path: require.resolve('path-browserify'),
    },
  },
};

// Merging default and custom configurations
const config = mergeConfig(getDefaultConfig(__dirname), customConfig);

module.exports = config;
