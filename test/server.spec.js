/* eslint-env mocha */
const expect = require('expect')

describe('App', (done) => {
  it('exists', (done) => {
    expect('something truthy').toExist()
    done()
  })
})
