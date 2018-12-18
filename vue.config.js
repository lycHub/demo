const path = require('path');

module.exports = {
   /* devServer: {
        proxy: {
            "/index.php*" : {
                target: "http://test.vip.meifanco.com/"
            }
        }
    },*/
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