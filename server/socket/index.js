const record = require('../controllers/record')

module.exports.listen = (server) => {
    const io = require('socket.io')(server)
    const moment = require('moment')
    
    io.on('connection', socket => {
    let ip = socket.handshake.address
    socket.on('send', data => {
      console.log('send', data)
      let res = {
        ip,
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
        ...data
      }
      socket.broadcast.emit('msg', res)
      socket.emit('msg', res)
      record.append(res)
    })
  })
}