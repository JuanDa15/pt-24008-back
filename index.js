const express = require('express')
const cors = require('cors')
const { dbConnection } = require('./db/config')
require('dotenv').config()

const app = express()

dbConnection()

app.use(cors())

app.use(express.json())

app.use('/api/v1/auth', require('./routes/auth.js'))
app.use('/api/v1/product', require('./routes/product.js'))
app.use('/api/v1/cart', require('./routes/cart.js'))

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server Running in PORT: ${process.env.PORT || 3000}`)
})