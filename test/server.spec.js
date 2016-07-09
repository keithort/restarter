/* eslint-env mocha */
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

const createServer = require('../server')
const config = require('./config-test')

chai.use(chaiHttp)

const app = createServer(config)

describe('App', (done) => {
  it('ping', (done) => {
    chai.request(app)
    .get('/')
    .then(res => {
      expect(res.status).to.equal(200)
      done()
    })
    .catch(e => done(e))
  })
})
