const response = ()=>{
  return async (ctx,next)=>{
    ctx.res.fail = ({code,data,msg})=>{
      ctx.body={
        code,msg,data
      }
    }
    ctx.res.success=msg=>{
      ctx.body={
        code:0,
        data:ctx.body,
        msg:msg||'success'
      }
    }
    await next()
  }
}

module.exports=response