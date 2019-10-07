const baseWebpackConfig = require('./webpack.base.conf')

const merge = require('webpack-merge')

let config = merge(baseWebpackConfig, {
    devServer: {
        // 输出直接指向其目录
        // contentBase: path.join(__dirname, '../static'),
        // publicPath: '/', // 与output.publicPath差不多
        compress: true, // 所有服务都启用gzip压缩
        overlay: {
            warnings: true,
            errors: true
        },
        port: 9005,
        hot: true, // 启动热更新
    },
    devtool: 'cheap-module-eval-source-map'
})

module.exports = config