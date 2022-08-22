const productos = require('../../contenedor.js')

module.exports = async (req, res) => {
  const producto = await productos.getById(req.params.id)
  if(producto){
    res.status(200).json(producto)
    console.log(producto)
  }else{
    res.status(404).json({ error: `Producto no encontrado, revise el ID ${req.params.id}` })
    console.log(`error: 'Producto no encontrado, revise el ID: ${req.params.id}'`)
  }
}