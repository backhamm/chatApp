const app = require('express')()
const fs = require('fs')
const http = require('http').createServer(app)
const io = require('socket.io').listen(http)

let msg = fs.readFileSync('./msg.json')
let msgUser = fs.readFileSync('./msgUser.json')

let list = msg ? JSON.parse(msg) : []
let userList = msgUser ? JSON.parse(msgUser) : []
let clientMap = {}

io.on('connection', client => {
  io.sockets.emit('messageArr', list)
  io.sockets.emit('onlineUserList', userList)

  client.on('login', data => {
    if (userList.every(el => el.name !== data.name)) {
      clientMap[client.id] = data.name
      userList.push(data)
    } else {
      userList.find(el => el.name === data.name).online = 1
    }
    let list = userList.map(el => el.name)
    fs.writeFileSync('./msgUser.json', JSON.stringify(list, null, 2))
    io.sockets.emit('onlineUserList', userList)
  })

  client.on('logout', data => {
    try {
      userList.find(el => el.name === data).online = 0
    } catch (e) {
      console.log(e)
    }
    io.sockets.emit('onlineUserList', userList)
  })

  client.on('userInput', data => {
    list.push(data)
    io.sockets.emit('message', data)
    fs.writeFileSync('./msg.json', JSON.stringify(list, null, 2))
    // 个人
    // io.to(client).emit('xx', {})
  })
  client.on('disconnect', () => {
    if (userList.length === 0) return
    let disUser = clientMap[client.id]
    userList.find(el => el.name === disUser).online = 0
    io.sockets.emit('onlineUserList', userList)
  })
})

app.get('/', (req, res) => {
  res.send('<h1>hello world</h1>')
})

http.listen(3000)
