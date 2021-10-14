/**
 * 引入第三方插件
 */
const koaBody = require('koa-bodyparser')
const cors = require('@koa/cors')
/**
 * 引入自定义文件
 */
const router = require('../router')
const formidable = require('./formidable')
const response = require('./response')
const error = require('./error')
const logger = require('./log')
/**
 * 记录日志
 */
const mdLogger = logger();
/**
 * 针对跨域处理
 */
const mdCors = cors({
  origin:'*',
  credentials:true,
  allowMethods:['GET','POST','DELETE','PUT','OPTIONS','PATCH','HEAD']
})
/**
 * 统一返回格式和错误处理
 */
const mdResponse = response();
const mdError = error();
/**
 * 针对文件的解析
 */
const mdFormidable = formidable();

/**
 * 参数解析，解析post相关内容
 */
const mdKoaBody = koaBody({
  enableTypes:['json','form','text','xml'],
  formLimit:'100kb',
  jsonLimit:'1mb',
  textLimit:'1mb',
  xmlLimit:'1mb'
})
/**
 * 路由解析
 */
const mdRoute = router.routes();
const mdRouterAllowed = router.allowedMethods();



module.exports=[
  mdLogger,
  mdCors,
  mdResponse,
  mdError,
  mdFormidable,
  mdKoaBody,
  mdRoute,
  mdRouterAllowed
]