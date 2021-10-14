const koaRouter = require('koa-router')
const router = new koaRouter();

const routes=require('./routes')
const paramsValidator = require('../middleware/paramValidator')
routes.forEach(e=>{
  const {method,path,controller,valid} = e
  router[method](path,paramsValidator(valid),controller)
})

module.exports=router