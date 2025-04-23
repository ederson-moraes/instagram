const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const path = require('path')

dotenv.config()

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

app.use((req, res, next) => {
    req.io = io
    next()
}
)

app.use(cors())
//app.use(express.json())
//app.use(express.urlencoded({ extended: true }))
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))
app.use(require('./routes'))


app.use(require('./routes'))

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
}
)