const productos = require('../../contenedor.js')

module.exports = async (req, res) => {
  const update = await productos.updateProducto(req.params.id, req.body)
  if(update) {
    console.log("Producto actualizado: ", update)
    return res.status(200).json(update)
  }else{
    console.log(`error : Producto a actualizar no encontrado, revise el ID: ${req.params.id}`)
    return res.status(404).json({ error : `Producto a actualizar no encontrado, revise el ID: ${req.params.id}` })
  }
}