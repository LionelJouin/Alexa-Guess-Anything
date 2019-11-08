var path = require('path');

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: './dist',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", "tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            }
        ]
    }
}