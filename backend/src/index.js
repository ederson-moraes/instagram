const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

const app = express()

app.use(cors(
    {
        origin: '*', // Replace with your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(require('./routes'))



mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

app.use(require('./routes'))

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
}
)