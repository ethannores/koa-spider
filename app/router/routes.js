const {test} = require('../controller')
const {test:testValid} = require('../schema')

const routes = [
  {
    method:'get',
    path:'/a',
    valid:'',
    controller:test.list
  },
  {
    method:'get',
    path:'/city',
    valid:'',
    controller:test.city
  },
  {
    method:'get',
    path:'/c',
    valid:'',
    controller:test.getCityByProvince
  },
]

module.exports = routes