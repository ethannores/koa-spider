
const Spider = require('./spider')
const allMonth = ['201101','201102','201103','201104','201105','201106','201107','201108','201109','201110','201111','201112','201201','201202','201203','201204','201205','201206','201207','201208','201209','201210','201211','201212','201301','201302','201303','201304','201305','201306','201307','201308','201309','201310','201311','201312','201401','201402','201403','201404','201405','201406','201407','201408','201409','201410','201411','201412','201501','201502','201503','201504','201505','201506','201507','201508','201509','201510','201511','201512','201601','201602','201603','201604','201605','201606','201607','201608','201609','201610','201611','201612','201701','201702','201703','201704','201705','201706','201707','201708','201709','201710','201711','201712','201801','201802','201803','201804','201805','201806','201807','201808','201809','201810','201811','201812','201901','201902','201903','201904','201905','201906','201907','201908','201909','201910','201911','201912','202001','202002','202003','202004','202005','202006','202007','202008','202009','202010','202011','202012','202101','202102','202103','202104','202105','202106','202107','202108','202109','202110']
const WeatherModel = require('../model/weather')

async function sleep(delay){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve()
    },delay)
  })
}


process.on('message',async params => {
  let start = params[0]
  let cpuNums = params[1]
  let city = params[2]
  while (start < city.length) {
    let currCity = city[start]
    for(let k =0;k<allMonth.length;k++){
      //这里就开始动态爬虫
      ;(async ()=>{
        // console.log(currCity,allMonth[k])
        await sleep(2000);
        let data = await Spider.getCityHistory(currCity,allMonth[k])
        if(data.type=='success'){
          await WeatherModel.insertMany(data.data)
        }else{
          console.log('抓取失败:'+data.err+'  '+allMonth[k])
        }
        process.send('message')
      })()
    }
    start += cpuNums
  }
})
