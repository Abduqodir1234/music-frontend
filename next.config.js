const path = require('path')

module.exports = {
  images: {
    domains: ["127.0.0.1", "api.wolt.uz"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
}
