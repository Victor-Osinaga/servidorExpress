const app = require('./app');

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, ()=>{
  console.log(`Servidor express escuchando en el purto ${server.address().port}`);
})

server.on('error', (error)=>{
  console.log(`Error en el servidor ${error}`);
})