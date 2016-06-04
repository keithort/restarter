const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')

const __PROD__ = process.env.NODE_ENV === 'production'
let config

const server = express()

server.disable('x-powered-by')
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

if (__PROD__) {
  config = require('../tools/webpack.prod')
  server.use(helmet())
  server.use(compression());
  server.use(config.output.publicPath, express.static(config.output.path));
} else {
  config = require('../tools/webpack.dev')
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const compiler = webpack(config)
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    silent: true,
    stats: {
      colors: true,
      progress: true,
    }
  })
  server.use(morgan('dev'))
  server.use(middleware)
  server.use(webpackHotMiddleware(compiler))
}

server.get('*', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>Yolo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="root"></div>
        <script src="main.js"></script>
      </body>
    </html>
  `)
})
console.log(__PROD__)
server.listen(5000, '0.0.0.0', () => {
  console.log('Listening on port 5000')
})
