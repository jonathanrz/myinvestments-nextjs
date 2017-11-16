require('dotenv').config()

const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: /\.test.js$/,
      loader: 'ignore-loader'
    })
    config.plugins = [
      ...config.plugins,

      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ]
    return config
  }
}
