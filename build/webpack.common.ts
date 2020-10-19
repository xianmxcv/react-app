import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import { babelLoader, resolvePath, tsLoader } from './unit'

const commonConfig = {
  context: resolvePath('/ecm-react-app'),
  resolve: {
    alias: { '@': resolvePath('src') },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [resolvePath('src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: '/.js$/',
        use: babelLoader,
        exclude: /(node_modules|dist)/,
      },
      {
        test: /\.tsx?$/,
        use: [babelLoader, tsLoader],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // Output file name
      favicon: 'public/favicon.ico',
      template: 'public/index.html',
      inject: true,
      chunks: ['vendor', 'app'],
    }),
    new CopyPlugin({
      patterns: [{ from: resolvePath('./src/assets'), to: 'assets' }],
    }),
    new webpack.ContextReplacementPlugin(/\.\.\/view\//, resolvePath('./src/view/')),
  ],
}

export default commonConfig
