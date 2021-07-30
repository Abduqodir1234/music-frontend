const path = require('path')

module.exports = {
  images: {
    domains: ["uzmp3.herokuapp.com",],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
}
