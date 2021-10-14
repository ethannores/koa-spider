const formidable = require('formidable')

const {tempFilePath} = require('../config')

module.exports=()=>{
  return async function (ctx,next){
    const form = new formidable({
      multiples:true,
      uploadDir:`${tempFilePath}`
    })
    await new Promise((reslove,reject)=>{
      form.parse(ctx.req,(err,fields,files)=>{
        if(err){
          reject(err)
        }else{
          ctx.request.body = fields;
          ctx.request.files =files;
          reslove()
        }
      })
    })
    await next()
  }
}