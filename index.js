const express = require('express')
const app = express()
const http = require('http').createServer(app)
const cors = require('cors')
const io = require('socket.io')(http)

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.static(__dirname + '/assets'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    socket.on('chat message', (data) => {
        io.emit('chat message', {
            message: data.message,
            name: data.name,
        })
    })
})

http.listen(PORT, () => {
    console.log('Server started')
})
