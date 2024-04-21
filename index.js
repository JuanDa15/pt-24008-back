const express = require('express')
const cors = require('cors')
const { dbConnection } = require('./db/config')
require('dotenv').config()

const app = express()

dbConnection()

const allowedOrigins = [
  'https://pt-24008-front.vercel.app', //PROD,
  'http://localhost:4200',
  '127.0.0.1:4200'
]

app.use(cors({
  origin: allowedOrigins
}))

app.use(express.json())

app.use('/api/v1/auth', require('./routes/auth.js'))
app.use('/api/v1/product', require('./routes/product.js'))
app.use('/api/v1/cart', require('./routes/cart.js'))

app.get('/', (req, res) => {
  res.send(`
    <h1>PT-24008 API</h1>
  `);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server Running in PORT: ${process.env.PORT || 3000}`)
})


module.exports = app