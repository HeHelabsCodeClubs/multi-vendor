const withCSS = require('@zeit/next-css');
module.exports = withCSS()
const withSass = require('@zeit/next-sass');
module.exports = withSass({
    webpack: function (config) {
        config.module.rules.push({
            test: /\.(eot|otf|woff|woff2|ttf|svg|png|jpg|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    name: '[name].[ext]'
                }
            }
        })
        return config
    }
});