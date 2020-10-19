import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import config from './webpack.dev'

const app = express()
const compiler = webpack(config)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output!.publicPath,
  })
)

app.listen(3000, 'localhost', () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000!\n')
})
