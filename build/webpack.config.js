const path = require('path');

module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry: {
    app: path.resolve(__dirname, "../src/js/main.js")
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../public"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, "src"),
        loader: [
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              presets: [
                [
                  "es2015",
                  {
                    modules: false
                  }
                ]
              ]
            }
          },
          {
            loader: "eslint-loader"
          }
        ]
      }
    ]
  }
};
