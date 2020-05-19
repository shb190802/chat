const Koa = require('koa')

const app = new Koa()
const server = require('http').Server(app.callback())
const io = require('socket.io')(server)
const moment = require('moment')

const port = 80

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