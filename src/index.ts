import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { router } from './route.js'
import { addUser, findUser } from './users.js'

const PORT = process.env.PORT || 3000
const ADMIN = 'Admin'
const app = express()
app.use(cors({ origin: '*' }))
app.use(router)
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', socket => {
  socket.on('join', ({ username, room }) => {
    socket.join(room)
    const user = addUser({ username, room })

    socket.emit('message', {
      data: {
        username: ADMIN,
        message: `HI ${user.currentUser.username}, your joined ${user.currentUser.room}`,
      },

    })
    socket.broadcast.to(user.currentUser.room).emit('message', {

      data: {
        username: ADMIN,
        message: `${user.currentUser.username} has joined`,
      },
    })
    socket.on('sendMessage', ({ message, params }: any) => {

      console.log('send')
      const user = findUser(params)

      if (user) {
        io.to(user.room).emit('message', { data: { username: user.username, message } })
      }
    })
  })

  io.on('disconnect', () => console.log('Client disconnected'))
})

server.listen(PORT, () => console.log('Server started on port 3000'))
