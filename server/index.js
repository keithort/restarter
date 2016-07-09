'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const throng = require('throng')
const http = require('http')
const config = require('./config')

const createServer = (config) => {
  let assets
  const __PROD__ = config.nodeEnv === 'production'
  const app = express()

  app.disable('x-powered-by')
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    key: 'sessionId', // Use generic cookie name for security purposes
    cookie: {
      httpOnly: true, // Add HTTPOnly, Secure attributes on Session Cookie
      secure: __PROD__ // If secure is set, and you access your site over HTTP, the cookie will not be set
    }
  }))
  app.use(cookieParser(config.sessionSecret))

  if (__PROD__) {
    // Production-only Middileware
    assets = require('../assets.json') // eslint-disable-line global-require
    app.use(helmet())
    app.use(compression())
  } else {
    // Development-only Middleware
    const webpackConfig = require('../tools/webpack.dev') // eslint-disable-line global-require
    const webpack = require('webpack') // eslint-disable-line global-require
    const webpackDevMiddleware = require('webpack-dev-middleware') // eslint-disable-line global-require
    const webpackHotMiddleware = require('webpack-hot-middleware') // eslint-disable-line global-require
    const compiler = webpack(webpackConfig)
    app.use(webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      noInfo: false,
      stats: {
        colors: true,
        version: true,
        hash: true,
        timings: true,
        chunks: false
      },
      setup (app) {
        // This runs before webpack-dev-middleware.
        app.disable('x-powered-by')
        app.use(morgan('dev'))
      }
    }))
    app.use(webpackHotMiddleware(compiler))
  }

  app.use(express.static('public'))

  app.get('*', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <title>Yolo</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/x-icon" href="favicon.ico">
          <link rel="stylesheet" href="${__PROD__ ? assets.main.css : 'assets/styles.css'}" />
        </head>
        <body>
          <div id="root"></div>
          <script>window.Promise || document.write('\\x3Cscript src=\"/es6-promise.min.js\">\\x3C/script>\\x3Cscript>ES6Promise.polyfill()\\x3C/script>')</script>
          <script>window.fetch || document.write('\\x3Cscript src=\"/fetch.min.js\">\\x3C/script>')</script>
          <script src="${__PROD__ ? assets.vendor.js : 'assets/vendor.js'}"></script>
          <script src="${__PROD__ ? assets.main.js : 'assets/main.js'}"></script>
        </body>
      </html>
    `)
  })

  const server = http.createServer(app)

  // Heroku dynos automatically timeout after 30s. Set our
  // own timeout here to force sockets to close before that.
  // https://devcenter.heroku.com/articles/request-timeout
  if (config.timeout) {
    server.setTimeout(config.timeout, (socket) => {
      const message = `Timeout of ${config.timeout}ms exceeded`

      socket.end([
        'HTTP/1.1 503 Service Unavailable',
        `Date: ${(new Date()).toGMTString()}`,
        'Content-Type: text/plain',
        `Content-Length: ${message.length}`,
        'Connection: close',
        '',
        message
      ].join(`\r\n`))
    })
  }

  return server
}

// Throng will only run if this file is called directly.
if (require.main === module) {
  throng({
    workers: config.webConcurrency || 1,
    lifetime: Infinity,
    start (id) {
      const server = createServer(config)

      server.listen(config.port, () => {
        console.log('Server #%s listening on port 5000, Ctrl+C to stop', id)
      })
    }
  })
}

module.exports = createServer
