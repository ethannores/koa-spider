const pwd = process.cwd();

module.exports={
  //临时文件存放路径
  tempFilePath : `${pwd}/app/public/temp`,
  //日志配置
  logConfig:{
    flag:true,
    ourDir:`${pwd}/app/public/log`,
    level:'info'
  }
}