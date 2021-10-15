const mongoose = require('mongoose')
const {Schema} = mongoose

const SchemaModel = new Schema({
  city:String,
  city_en:String,
  pid:String,
  id:String
})


module.exports = mongoose.model('city',SchemaModel)