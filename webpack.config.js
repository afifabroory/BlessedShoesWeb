const path = require('path');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        main: {
          import: './src/user/user.js',
          dependOn: 'database'
        },
        admin: {
            import:'./src/admin/admin.js',
            dependOn: 'database'
        },
        database: {
            import: './src/database/database.js',
            dependOn: 'sharedApp'
        },
        login: {
          import: './src/login/login.js',
          dependOn: 'sharedApp'
        },
        sharedApp: 'firebase/app',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    mode: 'production', 
    output: {
        filename: './script/[name].js',
        path: path.resolve(__dirname, 'public')
    }/*,
    plugins: [
      new BundleAnalyzerPlugin()
    ]*/
}