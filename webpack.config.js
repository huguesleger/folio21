const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WatchTimePlugin = require('webpack-watch-time-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

module.exports = (env, argv) => {
  let config = {
    entry: {
      twig: './src/twig.js',
      main: './src/scss.js',
      app: './src/js/app.js',
      vendors: './src/js/vendors.js',
    },
    output: {
      filename: 'js/[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
      publicPath: '/wp-content/themes/folio21/dist/',
    },
    resolve: {
      extensions: ['*', '.js'],
    },
    mode: 'development',
    performance: {
      hints: false,
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.twig$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                context: 'src',
                name: '[path][name].[ext]',
              },
            },
            { loader: 'extract-loader' },
            {
              loader: 'html-loader',
              options: {
                minimize: false,
                interpolate: true,
                attrs: ['img:src', 'link:href'],
              },
            },
          ],
        },
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/env'],
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|tiff|webp|gif|ico|mp4|webm|wav|mp3|m4a|aac|oga)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                context: 'src',
                name: '[path][name].[md5:hash:8].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/,
          use: {
              loader: 'file-loader',
              options: {
                context: 'src',
                name: '[path][name].[md5:hash:8].[ext]',
              },
          },
      },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[chunkhash].css',
        chunkFilename: '[id].css',
      }),
      new WatchTimePlugin(),
      new WebpackAssetsManifest(),
      new BrowserSyncPlugin({
        files:[
            '**/*.php', '**/*.twig'
        ],
        host: 'localhost',
        port: 3000,
        proxy: 'http://folio21.local/',
        reloadDelay: 0
    })
    ],
  };

  if (argv.mode !== 'production') {
    config.module.rules.push({
      test: /\.s?css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [autoprefixer({})],
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            precision: 10,
          },
        },
      ],
    });
  }

  if (argv.mode === 'production') {
    config.module.rules.push({
      test: /\.s?css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              cssnano({
                preset: 'default',
              }),
              autoprefixer({}),
            ],
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            precision: 10,
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.svg$/,
      enforce: 'pre',
      use: [
        {
          loader: 'svgo-loader',
          options: {
            precision: 2,
            plugins: [
              {
                removeViewBox: false,
              },
            ],
          },
        },
      ],
    });
  }

  return config;
};