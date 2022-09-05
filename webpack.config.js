

'use strict'
const path = require('path')
const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const bnJsReplaces = [
  'tiny-secp256k1',
  'asn1.js',
  'create-ecdh',
  'miller-rabin',
  'public-encrypt',
  'elliptic',
]

function getDefaultConfiguration() {
  return {
    cache: true,
    performance: { hints: false },
    stats: 'errors-only',
    entry: './dist/npm/index.js',
    output: {
      library: 'openmev-router',
      path: path.join(__dirname, 'build/'),
      filename: `openmev-router.default.js`,
    },
    devtool: 'source-map',
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/^ws$/, './WSWrapper'),
      new webpack.ProvidePlugin({ process: 'process/browser' }),
      new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/wordlists\/(?!english)/,
        contextRegExp: /bip39\/src$/,
      }),
      // this is a bit of a hack to prevent 'bn.js' from being installed 6 times
      // TODO: any package that is updated to use bn.js 5.x needs to be removed from `bnJsReplaces` above
      // https://github.com/webpack/webpack/issues/5593#issuecomment-390356276
      new webpack.NormalModuleReplacementPlugin(/^bn.js$/, (resource) => {
        if (
          bnJsReplaces.some((pkg) =>
            resource.context.includes(`node_modules/${pkg}`),
          )
        ) {
          resource.request = 'diffie-hellman/node_modules/bn.js'
        }
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['source-map-loader'],
        },
      ],
    },
    resolve: {
      alias: {
        ws: './dist/npm/client/WSWrapper.js',
        'https-proxy-agent': false,
      },
      extensions: ['.js', '.json'],
      // We don't want to webpack any of the local dependencies:
      symlinks: false,
      fallback: {
        buffer: require.resolve('buffer/'),
        assert: require.resolve('assert/'),
        url: require.resolve('url/'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        https: require.resolve('https-browserify'),
        http: require.resolve('stream-http'),
      },
    },
  }
}

module.exports = [
  (env, argv) => {
    const config = getDefaultConfiguration()
    config.mode = 'development'
    config.output.filename = `openmev-router-latest.js`
    return config
  },
  (env, argv) => {
    const config = getDefaultConfiguration()
    config.mode = 'production'
    config.output.filename = `openmev-router-latest-min.js`
    if (process.argv.includes('--analyze')) {
      config.plugins.push(new BundleAnalyzerPlugin())
    }
    return config
  },
]