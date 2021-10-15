const superagent = require('superagent')
const cheerio = require('cheerio')
require('superagent-charset')(superagent)


//获取一共有多少个省
async function getProvince(){
  let pageData = await superagent.get(`http://www.tianqihoubao.com/`).charset('GBK')
    let $ = await cheerio.load(pageData.text, { decodeEntities: false })
    let tds = $('#content table[width="410"]').find('td')
    let data=[];
    tds.each((i,e)=>{
      let id = $(e).find('a').attr('href').split('?id=')[1];
      let city = $(e).find('a').text().trim();
      data.push({
        id,city
      })
    })
    return data
}
//获取一共有多少个省
async function getCityByProvince(id){
  try{
    let pageData = await superagent.get(`http://www.tianqihoubao.com/weather/province.aspx?id=${id}`).charset('GBK')
    let $ = await cheerio.load(pageData.text, { decodeEntities: false })
    let tds = $('#content table').find('td')
    let data=[];
    tds.each((i,e)=>{
      let city_en = $(e).find('a').attr('href').match(/(?<=\/).*?(?=\.html)/)[0];
      let city = $(e).find('a').text().trim();
      data.push({
        city,city_en,pid:id
      })
    })
    return {
      type:'success',
      data
    }
  }catch(err){
    return {
      type:'err',
      data:month,
      err
    }
  }
}
//获取该城市的历史天气
async function getCityHistory(city,month){
  try{
    let pageData = await superagent.get(`http://www.tianqihoubao.com/lishi/${city.city_en}/month/${month}.html`).charset('GBK')
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
          city:city.city,
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
    return {
      type:'success',
      data
    }
  }catch(err){
    return {
      type:'err',
      data:month,
      err
    }
  }
}

module.exports={
  getCityHistory,getProvince,getCityByProvince
}