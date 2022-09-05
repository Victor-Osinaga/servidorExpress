const express = require('express')
const app = express()

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

module.exports = app