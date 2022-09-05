const {Server: HttpServer} = require('http')
const {Server: Socket} = require('socket.io')

const app = require('./app.js')
const {products, messages} = require('./src/contenedor/contenedor.js')

const PORT = process.env.PORT || 8080

const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const server = httpServer.listen(PORT, ()=>{
  console.log(`Servidor ON en ${server.address().port}`);

  server.on('error', error => console.log(`Error servidor ${error}`))
})

io.on('connection', async socket => {
  socket.emit('products', products.getAll())

  socket.emit('messages', messages.getAll())

  socket.on('newProduct', (newProduct)=>{
    products.save(newProduct)
    io.sockets.emit('products', products.getAll())
  })

  socket.on('newMessage', async (newMessage)=> {
    messages.save(newMessage)
    io.sockets.emit('messages', messages.getAll())
  })
})