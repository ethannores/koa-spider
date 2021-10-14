const Joi = require('joi')

const list = {
  query:Joi.object({
    name:Joi.string().required(),
    age:Joi.number().required(),
  })
}

module.exports ={
  list
}