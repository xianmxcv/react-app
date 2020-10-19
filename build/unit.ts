import fs from 'fs'
import { resolve } from 'path'
import lessToJs from 'less-vars-to-js'
import tsImportPluginFactory from 'ts-import-plugin'

export const resolvePath = (dir: string) => resolve(__dirname, '..', dir)

export const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
  },
}

export const TypingsLessModulesLoader = {
  loader: '@teamsupercell/typings-for-css-modules-loader',
  options: {
    // importLoaders: 2,
    // modules: true,
    // namedExport: true,
    // camelCase: true,
    // localIdentName: '[name]__[local]___[hash:base64:5]',
    formatter: 'prettier',
  },
}

const themeVariables = lessToJs(
  fs.readFileSync(resolve(resolvePath('./src/assets'), 'style/ant-default-vars.less'), 'utf8')
)

export const cssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 2, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
    modules: {
      localIdentName: '[name]__[local]___[hash:base64:5]',
    },
  },
}

export const lessLoader = {
  loader: 'less-loader',
  options: {
    lessOptions: {
      modifyVars: themeVariables,
      javascriptEnabled: true,
    },
  },
}

export const tsLoader = {
  loader: 'ts-loader',
  options: {
    transpileOnly: true,
    getCustomTransformers: () => ({
      before: [
        tsImportPluginFactory({
          libraryName: 'antd',
          // libraryDirectory: 'lib',
          libraryDirectory: 'es', // for webpack 4 !!!!!
          style: true,
        }),
      ],
    }),
  },
}
