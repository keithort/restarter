const path = require('path')

module.exports = {
  CLIENT_ENTRY: path.join(__dirname, '../client'),
  CLIENT_OUTPUT: path.join(__dirname, '../build'),
  PUBLIC_PATH: '/'
}
