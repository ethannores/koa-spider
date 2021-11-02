const Model = require('../model/test')
const mongoose = require('mongoose')
//获取todo列表
async function list(ctx){
  let {page=1,limit=20}=ctx.request.body;
  let result = await Model.find({}).skip((page-1)*limit).limit(limit)
  ctx.body=result
}
//保存数据
async function save(ctx){
  ctx.body='保存todo'
  let {user_id,user_name,title,_id,done}=ctx.request.body;
  let result = '';
  if(_id){
    //则更新内容
    result = await Model.findOne({
      _id:mongoose.Types.ObjectId(_id)
    })
    result=await result.update({
      title,
      done
    })
    if(result.modifiedCount==1){
      result='修改成功'
    }else{
      result='修改失败'
    }
  }else{
    //新增内容
    if(!user_id&&!user_name&&!title){
      ctx.utils.assert(false, ctx.utils.throwError(9998,'新增todo时，用户id用户名和待办事项内容必填'));
    }
    result = await Model.create({
      user_id,user_name,title
    })
  }
  ctx.body=result
}
//完成todo
async function done(ctx){
  ctx.body='完成todo'
  console.log(ctx.request.body);
}
//删除todo
async function del(ctx){
  let {_id}=ctx.request.body;
  let result = await Model.findById(mongoose.Types.ObjectId(_id));
  if(!result){
    ctx.utils.assert(false, ctx.utils.throwError(9998,'当前需要删除的todo，数据库中没有，请查正'));
  }
  result=await Model.findByIdAndRemove(mongoose.Types.ObjectId(_id))
  ctx.body='删除成功'
}
module.exports={
  list,save,done,del
}