const { log } = require('console')
const express = require('express')
const products = require('./contenedor.js')

const ap = express()

app.get('/productos', async (req, res) => {
  try {
    const getAll = await products.getAll()
    res.send(getAll)
  } catch (error) {
    console.log(error)
  }
})

const server = app.listen(8080, ()=>{
    console.log(`escuchando el purto ${server.address().port}`)
})

server.on('error', error => console.log(`error en servidor ${error}`))