const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/timer.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'timer.bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/manifest.json', to: 'manifest.json' },
        { from: 'src/popup.html', to: 'popup.html' },
        { from: 'src/chime.mp3', to: 'chime.mp3' },
        { from: 'src/icons', to: 'icons' }
      ]
    })
  ]
};