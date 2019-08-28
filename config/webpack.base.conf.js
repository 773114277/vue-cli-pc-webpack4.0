const path = require('path')

// Vue-loader在15.*之后的版本 vue-loader的使用需要伴生 VueLoaderPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// 会将入口文件添加到默认访问文件中(根目录下的index.html)
const htmlWebpackPlugin = require('html-webpack-plugin')

// 复制目录
const CopyWebpackPlugin = require('copy-webpack-plugin')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/main.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash:8].js',
        // webpack-dev-server  默认以此目录为基准决定在哪个目录下启用服务 来访问webpack输出的文件
        publicPath: process.env.NODE_ENV === "development" ? '/' : './',
        // 将输出文件付给变量MyLibrary
        library: 'MyLibrary',
        libraryTarget: 'var'
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // 限制多少字节
                        limint: 1024,
                        name: '[name]-custom.[ext]'
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === "development"
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'less-loader'
                ]
            },
            {
                // babel-loader   排除无需上传的js文件
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html', // 模板路径
            // inject: true, // true || 'head' || 'body' || false   javascript resources location
            minify: {
                removeComments: true,
                collapseWhitespace: true, // 压缩html文件，减小文件体积
                removeAttributeQuotes: true
            },
            hash: true // 给index.js加上hash值，用于清除缓存
        }),
        // copy custom static assets
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: 'static',
            ignore: ['.*']
        }]),
        // vue-loader依赖
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash:8].css",
            chunkFilename: "css/[id].css"
        })
    ],
    resolve: {
        // 自动解析确定的扩展名
        extensions: ['.vue', '.js'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src')
        }
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    externals: { //外部环境
        'AMap': 'AMap'
    }
}