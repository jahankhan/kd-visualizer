const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./scripts/index.js",
  output: {
    path: path.resolve(__dirname, 'scripts'),
    filename: "bundle.js"
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
