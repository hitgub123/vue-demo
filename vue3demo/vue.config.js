const {
  defineConfig
} = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // lintOnSave: false,
  devServer: {
    proxy: {
      //这里写api,api0,/api,/api0都可以，其他不行，原因不明
      '/api': {
        target: 'http://localhost:8081/api', //要跨域请求的地址
        ws: true, //是否允许跨域,在本地会创建一个虚拟服务端，然后发送请求的数据，
        // 并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        changeOrigin: true,
        pathRewrite: {
          //这里理解成用/api0代替target里面的地址，后面组件中我们掉接口时直接用api0代替
          // 比如我要调用'http://localhost:8081/api/goodsList'，
          //直接写‘http://localhost:8080/api0/goodsList’即可，这里http://localhost:8080/是项目地址
          '^/api0': ''
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
         fallback: {
           "crypto": require.resolve("crypto-browserify"),
           "stream": require.resolve("stream-browserify"),
           "util": require.resolve("util")
         },
         extensions: ['.ts', '.tsx', '.js']
       }
     }
})