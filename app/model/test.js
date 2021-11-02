const mongoose = require('mongoose')
const {Schema} = mongoose

const SchemaModel = new Schema({
  user_id:String,
  user_name:String,
  title:String,
  done:{
    type:Boolean,
    default:false
  },
})


module.exports = mongoose.model('test_todo',SchemaModel)