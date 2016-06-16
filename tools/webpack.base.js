const path = require('path')

module.exports = {
  CLIENT_ENTRY: path.join(__dirname, '../modules/client'),
  CLIENT_OUTPUT: path.join(__dirname, '../public/assets'),
  PUBLIC_PATH: '/assets/'
}
