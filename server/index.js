const Koa = require('koa')
const KoaBody = require('koa-body')
const KoaRouter = require('koa-router')

const app = new Koa()
const server = require('http').Server(app.callback())
const io = require('socket.io')(server)
const moment = require('moment')
const port = 80
const router = new KoaRouter()

router.post('/upload', async ctx => {
  const fs = require('fs')
  const path = require('path')
  const file = ctx.request.files.file
  const reader = fs.createReadStream(file.path)
  const fileName = moment().format('YYYYMMDDhhmmss-') + file.name
  const filePath = path.join(__dirname, '../static/upload', fileName)
  const upStream = fs.createWriteStream(filePath)
  reader.pipe(upStream)
  ctx.body = {
    state: 'ok',
    data: fileName
  }
})
app.use(KoaBody({
  multipart: true,
  formidable: {
    maxFileSize: 100 * 1024 * 1024,
    multipart: true
  }
}))
app.use(router.routes())
app.use(router.allowedMethods())
server.listen(port, err => {
  console.log(err || 'run in port ' + port)
})

io.on('connection', socket => {
  let ip = socket.handshake.address
  socket.on('send', data => {
    console.log('send', data)
    let res = {
      ip,
      time: moment().format('YYYY-MM-DD hh:mm:ss'),
      ...data
    }
    socket.broadcast.emit('msg', res)
    socket.emit('msg', res)
  })
})