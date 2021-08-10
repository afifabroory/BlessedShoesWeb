const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'production', // Test purposes
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public')
    }
}