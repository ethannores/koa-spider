/**
 * 引入第三方插件
 */
const Koa = require('koa')
const compose = require('koa-compose')//中间件组合
const app = new Koa();

/**
 * 引入个人自定义文件
 */
console.time('db connect')
require('./common/db')()
console.timeEnd('db connect')
//组合中间件
const md = require('./middleware')
const config = require('./config')
const utils = require('./common/utils')


app.context.config = config
app.context.utils = utils

app.use(compose(md))



const port = 8082
const host = "0.0.0.0"



app.on('error',(err,ctx)=>{
  if(ctx){
    ctx.body = {
      code:9999,
      msg:`程序运行报错：${err}`
    }
  }
})


app.listen(port,host,()=>{
  console.log('server run at http://localhost:8082')
})