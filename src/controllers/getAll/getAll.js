const productos = require('../../contenedor.js')

module.exports = async (req, res) => {
  const products = await productos.getAll();
  if(products.length > 0){
    console.log(products)
    return res.status(200).json(products)
  }else{
    console.log("error: No hay productos agregados")
    return res.status(404).json({ error: `No hay productos agregados` })
  }
}