import ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import StyleLintPlugin from 'stylelint-webpack-plugin'
import webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import proxy from './setupProxy'
import { cssLoader, lessLoader, resolvePath, TypingsLessModulesLoader } from './unit'
import commonConfig from './webpack.common'

const webpackConfig = webpackMerge(commonConfig, {
  mode: 'development',
  entry: {
    app: resolvePath('src/index.tsx'),
  },
  output: {
    filename: '[name].bundle.js',
    path: resolvePath('dist'),
    publicPath: '/',
  },
  devtool: 'source-map',
  devServer: {
    host: 'localhost', // 0.0.0.0
    open: true,
    hot: true,
    disableHostCheck: true,
    proxy,
    overlay: {
      warnings: true,
      errors: true,
    },
    noInfo: true,
    port: 3000,
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', cssLoader],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ['style-loader', TypingsLessModulesLoader, cssLoader, 'postcss-loader', lessLoader],
      },
      {
        test: /\.less$/,
        include: /node_modules/, // parse antd style , no css modules option
        use: ['style-loader', cssLoader, 'postcss-loader', lessLoader],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: resolvePath('tsconfig.json'),
      },
      eslint: {
        files: resolvePath('.eslintrc.json'),
      },
    }),
    new ForkTsCheckerNotifierWebpackPlugin({
      title: 'TypeScript',
      excludeWarnings: false,
      skipSuccessful: true,
    }),
    new StyleLintPlugin({
      configFile: resolvePath('.stylelintrc.json'),
      context: resolvePath('src'),
      // files: ['**/*.s?(a|c|le)ss'],
      files: ['**/*.(less)'],
    }),
  ],
})

export default webpackConfig
