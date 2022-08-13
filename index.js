const { log } = require('console')
const express = require('express')
const products = require('./contenedor.js')

const app = express()
let cont=0;

const server = app.listen(8080, ()=>{
  console.log(`escuchando el purto ${server.address().port}`)
})

server.on('error', error => console.log(`error en servidor ${error}`))

app.get('/', async(req, res)=>{
  res.send(`Inicio`)
})

app.get('/productos', async (req, res) => {
  try {
    const getAll = await products.getAll()
    res.send(getAll)
  } catch (error) {
    console.log(error)
  }
})

app.get('/productoRandom', async (req, res) => {
  try {
    const productoRandom = await products.getRandomProduct()
    res.send(productoRandom)
  } catch (error) {
    console.log(error);
  }
})

// app.get('/visitas', async (req, res)=>{
//   try {
    
//     cont += 1;
//     res.send(`visitas: ${cont}`)
//   } catch (error) {
//     console.log(error);
//   }
// })