const path = require('path')
//模拟数据
const express = require('express')
const app = express()
var appData = require('./data/goodlist.json')
var user = require('./data/user.json')
var table = require('./data/table.json')
var syslist = require('./data/systemlist.json')
var seller = appData
var apiRoutes = express.Router();
app.use('/api',apiRoutes)

const resolve = dir => {
  return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : '/'

module.exports = {

  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  },
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  baseUrl: BASE_URL,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  runtimeCompiler:true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
   // proxy: 'localhost:3000'
   //模拟数据开始
   before(app) {
        app.get('/api/seller', (req, res) => {
            res.json({
                // 这里是你的json内容
                errno: 0,
                data: seller
            })
        }),
        app.post('/api/seller', (req, res) => {
          res.json({
              // 这里是你的json内容
              errno: 0,
              data: seller
          })
        }),
        app.post('/api/session/login_mail', (req, res) => {
          res.json({
              data: user
          })
        }),
        app.get('/api/session/logout', (req, res) => {
          res.json({
              data: user
          })
        }),
        app.get('/get_table_data', (req, res) => {
          res.json({
              data: table
          })
        }),
        app.get('/api/admin/getsys', (req, res) => {
          res.json({
              data: syslist
          })
        }),
        app.get('/api/admin/product/open_sys', (req, res) => {
          res.json({
              data: user
          })
        })        
    },
  }
}
