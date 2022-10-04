require('dotenv').config()
const path = require('path')
const express = require('express');
const cors = require('cors')

const dbConnect = require('./database/dbConnect')
const userRoute = require('./routes/userRoutes')
const transactionRoute = require('./routes/transactionRoutes')

const app = express()

app.use(express.json())
app.use(cors())


app.use('/api/users', userRoute)
app.use('/api/transactions', transactionRoute)


if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
    })
}

const port = 5000
app.listen(process.env.PORT || port, () => {
    console.log('Server is listening.....')
    dbConnect()
})