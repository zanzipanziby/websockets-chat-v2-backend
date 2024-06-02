import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { router } from './route.js'

const PORT = process.env.PORT || 5000
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

server.listen(PORT, () => console.log('Server started on port 5000'))
