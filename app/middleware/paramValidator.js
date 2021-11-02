module.exports = paramsSchema =>{
  return async function(ctx,next){
    let body = ctx.request.body;
    try{
      (typeof body=='string'&&body.length)&&(body=JSON.stringify(body))
    }catch{}
    const paramsMap={
      router:ctx.request.params,
      query:ctx.request.query,
      body
    }
    if(!paramsSchema)return next()

    const schemaKeys = Object.getOwnPropertyNames(paramsSchema);
    if(!schemaKeys.length)return next()

    schemaKeys.some(item=>{
      const validObj = paramsMap[item];
      const validResult = paramsSchema[item].validate(validObj,{
        allowUnknow:true
      })
      if(validResult.error){
        ctx.utils.assert(false, ctx.utils.throwError(9998, validResult.error.message));
      }
    })
    await next();
  }
}