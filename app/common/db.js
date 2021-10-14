const mongoose  = require('mongoose')
module.exports=()=>{
  let db = mongoose.connect('mongodb://localhost:27017/test',{
    useNewUrlParser: true,
		useUnifiedTopology: true,
  })
  return db
}