/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const {
  override,
  addWebpackAlias,
  addPostcssPlugins
} = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  }),
  addPostcssPlugins([require('tailwindcss'), require('autoprefixer')])
);
