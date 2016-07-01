/* eslint-env mocha */
const expect = require('expect')

require('../server')

describe('App', (done) => {
  it('exists', (done) => {
    expect('something truthy').toExist()
    done()
  })
})
