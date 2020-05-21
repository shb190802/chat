const Koa = require('koa')
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static')
const config = require('./config')
const router = require('./router')()
const socket = require('./socket')

const app = new Koa()
const server = require('http').Server(app.callback())

app.use(KoaBody({
  multipart: true,
  formidable: {
    maxFileSize: 100 * 1024 * 1024,
    multipart: true
  }
}))
app.use(router.routes())
app.use(router.allowedMethods())
app.use(KoaStatic('./static'))

socket.listen(server)
server.listen(config.port, err => {
  console.log(err || 'run in config.port ' + config.port)
})
