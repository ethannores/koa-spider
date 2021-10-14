
const superagent = require('superagent')
const cheerio = require('cheerio')
require('superagent-charset')(superagent)

process.on('message', params => {
  let start = params[0]
  let cpuNums = params[1]
  let all = params[2]
  while (start < all.length) {
    let month = all[start]
    //这里就开始动态爬虫
    ;(async ()=>{
      try{
        let pageData = await superagent.get(`http://www.tianqihoubao.com/lishi/shenzhen/month/${month}.html`).charset('GBK')
        let $ = await cheerio.load(pageData.text, { decodeEntities: false })
        let trs = $('#content').find('tr')
        let data=[];
        trs.each((i, e) => {
          if(i>0){
            let time = $(e).find('td:eq(0)').text().trim().replace(/\n/g, '').replace(/\s+/, '')
            let status = $(e).find('td:eq(1)').text().trim().replace(/\n/g, '').replace(/\s+/, '').split('/')
            let temperature = $(e).find('td:eq(2)').text().trim().replace(/\n/g, '').replace(/\s+/, '').split('/')
            let wind = $(e).find('td:eq(3)').text().trim().replace(/\n/g, '').replace(/\s+/, '').split('/')
            data.push({
              city:'深圳',
              time:new Date(time.replace(/[^0-9]/g,'-').replace(/\-$/,'')),
              status_start:status[0].replace(/\s+/g,''),
              status_end:status[1].replace(/\s+/g,''),
              temp_low:+temperature[1].replace(/\s+/g,'').replace(/[^0-9]/g,''),
              temp_high:+temperature[0].replace(/\s+/g,'').replace(/[^0-9]/g,''),
              wind_start:wind[0].replace(/\s+/g,''),
              wind_end:wind[1].replace(/\s+/g,''),
            })
          }
        })
        process.send({
          type:'success',
          data
        })
      }catch(err){
        process.send({
          type:'err',
          data:month
        })
      }
    })()
    
    start += cpuNums
  }
})
