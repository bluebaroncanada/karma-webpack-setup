var path = require("path");
module.exports = {
    entry: './src/p2f/app.js',
    output: {
        filename: 'bundle.js',

        path: path.resolve(__dirname, 'dist'),

        // //exports a library in the global js namespace called p2f
        // //can be use by external libraries or by inline javascript
        // libraryTarget: 'var',
        // library: 'p2f'
    },
    // devServer: {
    //     publicPath: "/",
    //     contentBase: "./dist/test",
    //     hot: true
    // }
};