import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import webpackMerge from 'webpack-merge'
import { cssLoader, lessLoader, resolvePath, TypingsLessModulesLoader } from './unit'
import commonConfig from './webpack.common'

const devMode = process.env.NODE_ENV !== 'production'

const webpackConfig = webpackMerge(commonConfig, {
  mode: 'production',
  entry: {
    app: resolvePath('src/index.tsx'),
  },
  output: {
    filename: '[name].[contenthash].js',
    path: resolvePath('dist'),
    publicPath: '/',
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: '../dist', //将 dist 目录下的文件 serve 到 localhost:8080 下
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          // 避免 cssnano 重新计算 z-index
          safe: true,
        },
      }),
    ],
    moduleIds: 'hashed',
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      chunks: 'all', // async|initial|all. async 只从异步加载得到的模块(动态加载import())里面进行拆分;initial只从入口模块进入拆分;all两者都包括
      minSize: 30000, // 引入的库大于30kb时才会做代码分割
      minChunks: 1, // 一个模块至少被用了1次才会被分割
      maxAsyncRequests: 5, // 同时异步加载的模块数最多是5个，如果超过5个则不做代码分割
      maxInitialRequests: 3, // 入口文件进行加载时，引入的库最多分割出3个js文件
      automaticNameDelimiter: '~', // 生成文件名的文件链接符
      name: true, // 开启自定义名称效果
      cacheGroups: {
        // 判断分割出的代码放到哪个文件
        antdUI: {
          priority: 20,
          name: 'antdUI',
          test: /[\\/]node_modules[\\/]antd[\\/]/,
        },
        antDesign: {
          priority: 20,
          name: 'antdUI',
          test: /[\\/]node_modules[\\/]@ant-design[\\/]/,
        },
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
        },
        vendors: {
          // 配合chunks： ‘all’使用，表示如果引入的库是在node-modules中，那就会把这个库分割出来并起名为vendors.js
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors',
        },
        default: {
          // 为非node-modules库中分割出的代码设置默认存放名称
          priority: -20,
          reuseExistingChunk: true, // 避免被重复打包分割
          name: 'common',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // only enable hot in development
              hmr: process.env.NODE_ENV === 'development',
              // if hmr does not work, this is a forceful method.
              reloadAll: true,
            },
          },
          cssLoader,
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/, // exclude antd default style
        use: [
          MiniCssExtractPlugin.loader,
          TypingsLessModulesLoader,
          cssLoader,
          'postcss-loader',
          lessLoader,
        ],
      },
      {
        test: /\.less$/,
        include: /node_modules/, // exclude antd default style
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', lessLoader],
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[name].[hash].css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
})

export default webpackConfig
