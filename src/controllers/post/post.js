const productos = require('../../contenedor.js')

module.exports = async (req, res)=>{
  const productUpdate = await productos.save(req.body)
  console.log("Porducto agregado: ", productUpdate )
  res.json(productUpdate)
}