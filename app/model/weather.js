const mongoose = require('mongoose')
const {Schema} = mongoose

const SchemaModel = new Schema({
  city:String,
  time:Date,
  temp_low:Number,
  temp_high:Number,
  status_start:String,
  status_end:String,
  wind_start:String,
  wind_end:String,
})


module.exports = mongoose.model('watcher',SchemaModel)