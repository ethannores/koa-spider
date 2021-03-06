const cluster = require('cluster')
const cpuNums = require('os').cpus().length

const Spider = require('./spider')

const WeatherModel = require('../model/weather')
const CityModel = require('../model/city')
// let years = ['2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021']
// let months = ['01','02','03','04','05','06','07','08','09','10','11','12']
// const all = years.map(e => months.map(k => e + k))
const allMonth = ['201101','201102','201103','201104','201105','201106','201107','201108','201109','201110','201111','201112','201201','201202','201203','201204','201205','201206','201207','201208','201209','201210','201211','201212','201301','201302','201303','201304','201305','201306','201307','201308','201309','201310','201311','201312','201401','201402','201403','201404','201405','201406','201407','201408','201409','201410','201411','201412','201501','201502','201503','201504','201505','201506','201507','201508','201509','201510','201511','201512','201601','201602','201603','201604','201605','201606','201607','201608','201609','201610','201611','201612','201701','201702','201703','201704','201705','201706','201707','201708','201709','201710','201711','201712','201801','201802','201803','201804','201805','201806','201807','201808','201809','201810','201811','201812','201901','201902','201903','201904','201905','201906','201907','201908','201909','201910','201911','201912','202001','202002','202003','202004','202005','202006','202007','202008','202009','202010','202011','202012','202101','202102','202103','202104','202105','202106','202107','202108','202109','202110']
let errMonth=[]
const list = async ctx => {
  // 获取非省市城市
  let city = await CityModel.find({
    pid:{$ne:null}
  })
  cluster.setupMaster({
    exec:'./app/controller/worker.js',
    args:['--use','http']
  })
  let allCityLength=city.length*allMonth.length
  for(let i=0;i<cpuNums;++i){
    let work = cluster.fork();
    work.send([i,cpuNums,city])
    work.on('message',async msg=>{
      allCityLength--;
      // if(msg.type=='success'){
      //   await WeatherModel.insertMany(msg.data)
      // }else{
      //   errMonth.push(msg.data)
      //   console.log(errMonth)
      // }

      if(allCityLength==0){
        console.timeEnd(`遍历：${allMonth.length*city.length} 条数据`)
        cluster.disconnect()
      }
    })
  }
  cluster.on('fork', (worker) => {
    console.log(`[master] : fork worker ${worker.id}`);
  });
  
  cluster.on('exit', (worker) => {
    console.log(`[master] : 子进程 ${worker.id} 被关闭`);
  });

}
//获取省
const city = async ctx =>{
  let data = await Spider.getProvince();
  let saveResult = await CityModel.insertMany(data)
  ctx.body = saveResult
}
//获取省下面的所有天气有关的城市
const getCityByProvince= async ctx=>{
  let findResult = await CityModel.find({
    pid:null
  })
  cluster.setupMaster({
    exec:'./app/controller/worker1.js',
    args:['--use','http']
  })
  let allMonthLength=findResult.length
  for(let i=0;i<cpuNums;++i){
    let work = cluster.fork();
    work.send([i,cpuNums,findResult])
    work.on('message',async msg=>{
      allMonthLength--;
      if(msg.type=='success'){
        await CityModel.insertMany(msg.data)
      }else{
        errMonth.push(msg.data)
        console.log(errMonth)
      }
      console.log(allMonthLength)
      if(allMonthLength==0){
        cluster.disconnect()
      }
    })
  }
  cluster.on('fork', (worker) => {
    console.log(`[master] : fork worker ${worker.id}`);
  });
  
  cluster.on('exit', (worker) => {
    console.log(`[master] : 子进程 ${worker.id} 被关闭`);
  });
}

module.exports = {
  list,city,getCityByProvince
}
