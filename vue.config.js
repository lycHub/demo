const path = require('path');

module.exports = {
    devServer: {
        publicPath: '/',
        disableHostCheck: true,
        host: '192.168.212.54',
        port: 4200,
        proxy: {
            '/finance': {
                target: 'https://mgt.oilchem.net',
                changeOrigin: true
            },
            '/callcenter': {
                target: 'https://mgt.oilchem.net',
                changeOrigin: true
            }
        },
        quiet: true
    },
    lintOnSave: false,
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true     // iView修改主题的bug
            }
        }
    },

    configureWebpack: {
        resolve: {
            extensions: ['.less'],
            alias: {
                'share': resolve('src/share'),
                'services': resolve('src/services')
            }
        }
    }
};


function resolve (dir) {
    return path.join(__dirname, '.', dir)
}