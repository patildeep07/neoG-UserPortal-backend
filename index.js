const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')

const { initialiseDatabase } = require('./database/db.connection')

// Importing routes
const users = require('./routes/users.router')
const movies = require('./routes/movies.router')

// Cors
app.use(cors())
app.use(helmet())

app.use(express.json())

initialiseDatabase()



app.get('/', (req, res) => {
  res.send('Welcome to UserPortal API')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, (req, res) => {
  console.log(`Server is running on ${PORT}`)
})

// Routes
app.use('/users', users)
app.use('/movies', movies)
