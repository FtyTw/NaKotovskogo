const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //installed via npm
const webpack = require('webpack') //to access built-in plugins
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif|heic)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          // name(file) {
          //  console.log(file)
          //  return file.match('about') ? 'about/[name].[ext]' : '[name].[ext]'
          // }
          esModule: false
          // outputPath: '/src/assets/images'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|)$/,
        use: ['file-loader']
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    https: true,
    // https: {
    //   key: fs.readFileSync('server.key'),
    //   cert: fs.readFileSync('server.crt')
    //   // ca: fs.readFileSync('/path/to/ca.pem'),
    // },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
    //  {
    //  disableDotRule: true,
    //  index: paths.publicUrlOrPath
    // }
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './index.html' }),
    new CopyPlugin({
      patterns: [{ from: 'site.webmanifest' }, { from: 'browserconfig.xml' }]
    })
  ]
}
