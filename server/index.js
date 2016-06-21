import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import path from 'path'
import session from 'express-session'
import cookieParser from 'cookie-parser'

const __PROD__ = process.env.NODE_ENV === 'production'
let config, assets

const server = express()

server.disable('x-powered-by')
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  key: 'sessionId', // Use generic cookie name for security purposes
  cookie: {
    httpOnly: true, // Add HTTPOnly, Secure attributes on Session Cookie
    secure: __PROD__, // If secure is set, and you access your site over HTTP, the cookie will not be set
  },
}))

server.use(cookieParser('keyboard cat'))



if (__PROD__) {
  config = require('../tools/webpack.prod')
  assets = require('../assets.json')
  server.use(helmet())
  server.use(compression())
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
      progress: true
    }
  })
  server.use(morgan('dev'))
  server.use(middleware)
  server.use(webpackHotMiddleware(compiler))
}

server.use('/api/stories', (req, res) => {
  res.status(200).json([
    {
      id:"56927ffb-d8fe-48ba-a94d-0f9dbb861303",
      kind:"url",
      title:"China Tops U.S. in Supercomputers",
      url:"http://www.eetimes.com/document.asp?doc_id=1329941",
      content:"A new supercomputer in China-the first made with processors designed and made in the People's Republic -- has been ranked the world's most powerful system by far. The news comes as China tops the U.S.",
      author:"EETimes",
      image:"http://img.deusm.com/eetimes/2016/06/1329941/Sunway-computer-room-x-500.png"
    },{
      id:"56927ffb-d8fe-48ba-a94d-0f9dbb861303",
      kind:"url",
      title:"China Tops U.S. in Supercomputers",
      url:"http://www.eetimes.com/document.asp?doc_id=1329941",
      content:"A new supercomputer in China-the first made with processors designed and made in the People's Republic -- has been ranked the world's most powerful system by far. The news comes as China tops the U.S.",
      author:"EETimes",
      image:"http://img.deusm.com/eetimes/2016/06/1329941/Sunway-computer-room-x-500.png"
    },{
      id:"56927ffb-d8fe-48ba-a94d-0f9dbb861303",
      kind:"url",
      title:"China Tops U.S. in Supercomputers",
      url:"http://www.eetimes.com/document.asp?doc_id=1329941",
      content:"A new supercomputer in China-the first made with processors designed and made in the People's Republic -- has been ranked the world's most powerful system by far. The news comes as China tops the U.S.",
      author:"EETimes",
      image:"http://img.deusm.com/eetimes/2016/06/1329941/Sunway-computer-room-x-500.png"
    }
  ])
})
server.use(express.static(path.join(__dirname, '../public')))

server.get('*', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>Yolo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="favicon.ico">
      </head>
      <body>
        <div id="root"></div>
        <script src="${__PROD__ ? assets.main.js : 'assets/main.js'}"></script>
      </body>
    </html>
  `)
})

server.listen(5000, '0.0.0.0', () => {
  console.log('Listening on port 5000')
})
