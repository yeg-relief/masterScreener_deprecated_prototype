/*
  fairly brittle webpack configuration, but it get's the job done.
*/
module.exports = {
  context: __dirname + "/app",
  entry: "./app",
  output: {
    path: __dirname + "/static" +"/js",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loaders: ['babel?cacheDirectory'],
        include: __dirname + "/app"
      }
    ]
  }
}
