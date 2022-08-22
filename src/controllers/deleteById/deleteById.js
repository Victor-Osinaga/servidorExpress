const productos = require('../../contenedor.js')

module.exports = async (req, res) => {
  const newDates = await productos.deleteById(req.params.id)
  if(newDates){
    res.json({ Ok: `Producto con ID: ${req.params.id} eliminado con éxito` })
    console.log(`Producto con ID: ${req.params.id} eliminado con éxito`);
  }else{
    console.log(`Error: producto No encontrado, revise el ID: ${req.params.id}`);
    res.json({ Error: `producto No encontrado, revise el ID: ${req.params.id}` })
  }
}