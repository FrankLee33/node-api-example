import hprose from 'hprose'
import path from 'path'
import fs from 'fs'

const host = 'http://0.0.0.0:8086'
//创建hprose服务
const server = hprose.Server.create(host)
server.addFilter(new hprose.JSONRPCServiceFilter())
//导入服务类
const routesPath = path.join(__dirname, 'controllers')
fs.readdirSync(routesPath).forEach((file) => {
  if (file[0] === '.') {
    return
  }
  let cs = require(routesPath + '/' + file)
  let prefix = file.replace('Controller.js', '').toLowerCase()
  server.addInstanceMethods(cs, prefix, {simple: true, async: true})
})
//启动服务
server.start()
console.log('* Successfully started.')
console.log('* Serving files at: ' + host)
console.log('* Press Ctrl+C to shutdown.')
