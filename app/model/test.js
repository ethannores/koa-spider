const mongoose = require('mongoose')
const {Schema} = mongoose

const SchemaModel = new Schema({
  x:Number,
  name:String,
  scores:Number
})


module.exports = mongoose.model('test',SchemaModel)