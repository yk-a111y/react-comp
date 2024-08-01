const CracoLessPlugin = require("craco-less");
const { loaderByName } = require("@craco/craco");

const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        modifyLessModuleRule(lessModuleRule) {
          lessModuleRule.test = /.module.less$/;

          const cssLoader = lessModuleRule.use.find(loaderByName("css-loader"));

          cssLoader.options.modules = {
            localIdentName: "[local]_[hash:base64:5]",
          };

          return lessModuleRule
        }
      }
    }
  ]
}