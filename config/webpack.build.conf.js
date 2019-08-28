const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')

module.exports = merge(baseWebpackConfig, {
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendor'
                }
            }
        },
        runtimeChunk: true
    },
    devtool: '#cheap-module-source-map'
})
