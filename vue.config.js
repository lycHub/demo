const path = require("path");

// 是否为开发环境，process.env.NODE_ENV是vue预设的环境变量
const isDev = process.env.NODE_ENV === "development";


module.exports = {
<<<<<<< Updated upstream
  devServer: {
    disableHostCheck: true,       // 本地开发隆重需要改host, 此项是屏蔽Host检查
    host: "192.168.212.99",       // 设置host，默认localhost
    port: 3306,                   // 设置端口，默认8080
    proxy: {                      // 本地调接口会有跨域问题，所以本地开发是需要配置proxy做代理
      "/finance": {
        target: "https://mgt.oilchem.net",
        changeOrigin: true
      },
      "/callcenter": {
        target: "https://mgt.oilchem.net",
        changeOrigin: true
      }
    }
    // quiet: true            屏蔽控制台的启动信息
  },
  lintOnSave: false,          // 保存文件时不执行eslint代码检查
=======
    devServer: {
        publicPath: '/',
        disableHostCheck: true,
        // host: '192.168.212.54',
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
>>>>>>> Stashed changes

  // css相关配置
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true // iView修改主题的bug
      }
    }
  },

  configureWebpack: {
    devtool: isDev ? "cheap-module-eval-source-map" : "cheap-module-source-map",    // 配置调试信息，默认source-map
    resolve: {
      alias: {    // 配置文件夹别名
        share: resolve("src/share"),
        services: resolve("src/services")
      }
    }
  }
};

function resolve(dir) {
  return path.join(__dirname, ".", dir);
}
