'use strict'

const config = {
  nodeEnv: process.env.NODE_ENV,
  sessionSecret: process.env.SESSION_SECRET || 'keyboard cat',
  webConcurrency: process.env.WEB_CONCURRENCY || 1,
  port: process.env.PORT || 5000,
  timeout: 29000
}

module.exports = config
