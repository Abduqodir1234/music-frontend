const path = require('path')
module.exports = {
  images: {
    domains: ["uzmp3.herokuapp.com", "api.wolt.uz","127.0.0.1"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
};
