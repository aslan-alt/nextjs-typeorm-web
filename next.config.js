/** @type {import('next').NextConfig} */
const withImages = require('next-images');

module.exports = {
  ...withImages({
    webpack(config) {
      return config;
    },
  }),
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
};
