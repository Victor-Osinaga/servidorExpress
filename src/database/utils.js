import { fs } from 'fs';
const rutaProductos = './src/database/productos.json';
// const rutaCarrito = './src/database/carrito.json';

const saveToDatabase = (DB) => {
  fs.writeFileSync(rutaProductos, JSON.stringify(DB, null, 2), {
    encoding: "utf-8",
  })
}

export {
  saveToDatabase,
}