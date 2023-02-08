const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new FileManagerPlugin({
      events: {
        onEnd: {
          archive: [
            {
              source: './dist',
              destination: 'build/udemy-dark-theme.zip',
            },
          ],
        },
      },
    }),
  ],
});
