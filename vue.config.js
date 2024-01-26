const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {//译代理
      "/app": {
        target: " http://127.0.0.1:5000",  //写访问的地址
        ws: true,  //如果要代理 websockets，配置这个参数
        changeOrigin: true,  //允许跨域
        pathRewrite: {//译改写路径即重写 /app相当于变量 将地址赋予给变量
          "^/app": "http://127.0.0.1:5000"//和target后的地址必须一致
        }
      },
      "/api": {
        target: " http://127.0.0.1:8000",  //写访问的地址
        ws: true,  //如果要代理 websockets，配置这个参数
        changeOrigin: true,  //允许跨域
        pathRewrite: {//译改写路径即重写 /app相当于变量 将地址赋予给变量
          "^/api": "http://127.0.0.1:8000"//和target后的地址必须一致
        }
      }
    }
  }
})
