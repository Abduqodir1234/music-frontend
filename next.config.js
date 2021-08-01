const path = require('path')

module.exports = {
  images: {
    domains: ["uzmp3.herokuapp.com", "api.wolt.uz"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
}
