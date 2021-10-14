const {test} = require('../controller')
const {test:testValid} = require('../schema')

const routes = [
  {
    method:'get',
    path:'/a',
    valid:'',
    controller:test.list
  },
]

module.exports = routes