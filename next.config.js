const path = require('path')

module.exports = {
  images: {
    domains: ["uzmp2.heroku.app", "api.wolt.uz"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
}
