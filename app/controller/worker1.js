
const Spider = require('./spider')

process.on('message', params => {
  let start = params[0]
  let cpuNums = params[1]
  let all = params[2]
  while (start < all.length) {
    let id = all[start]['id']
    //这里就开始动态爬虫
    ;(async ()=>{
      let data = await Spider.getCityByProvince(id)
      process.send(data)
    })()
    
    start += cpuNums
  }
})
