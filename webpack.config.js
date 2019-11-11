const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');


module.exports = {
    mode: 'development',
    entry: {
        app: './src/main.js',
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist/',
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            // If using the runtime only build
            // vue$: 'vue/dist/vue.runtime.esm.js' // 'vue/dist/vue.runtime.common.js' for webpack 1
            // Or if using full build of Vue (runtime + compiler)
            'vue$': 'vue/dist/vue.esm.js',     // 'vue/dist/vue.common.js' for webpack 1
            '@': path.resolve(__dirname, 'src'),

        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /(node_modules)/,
                use: 'vue-loader',
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: 'babel-loader',
            },
            {
                test: /\.s(c|a)ss/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: require('fibers'),
                                identedSyntax: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new VuetifyLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
    ],
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://it4421.pythonanywhere.com'
        })
    }
};