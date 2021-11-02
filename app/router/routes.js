const {test,todo} = require('../controller')
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
  {
    method:'get',
    path:'/todo/list',
    valid:'',
    controller:todo.list
  },
  {
    method:'post',
    path:'/todo/save',
    valid:'',
    controller:todo.save
  },
  {
    method:'post',
    path:'/todo/done',
    valid:'',
    controller:todo.done
  },
  {
    method:'post',
    path:'/todo/del',
    valid:'',
    controller:todo.del
  },
]

module.exports = routes