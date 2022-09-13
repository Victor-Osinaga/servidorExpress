# Api desarrollada con Express.js

* Se utilizo Node.js y Express.js para la creación de los endpoints.
* Se desarrollo con arquitectura REST.
* Los endpoints fueron probados mediante REST CLIENT de Visual Studio Code, con resultado exitoso en cada tipo de petición.


## Endpoints: api/v1/productos

### GET {
  api/v1/productos (obtiene todos los productos)
  api/v1/productos/:productoId (obtiene el producto segun el ":productoId")
}
### POST (admin) {
  api/v1/productos (crea un producto enviando a traves del body: nombre, descripcion, codigo, foto, precio, stock)
}

### DELETE (admin) {
  api/v1/productos/:productoId (elimina un producto segun el ":productoId)
}

### PUT (admin) {
  api/v1/productos/:productoId (actualiza un producto enviando a traves del body: nombre o descripcion o codigo o foto o precio o stock)
}

## Endpoints: api/v1/carritos
### POST {
  api/v1/carritos (crea un carrito y devuelve su ID)
}
### POST {
  api/v1/carritos/:idCart/productos (agrega producto por id enviada en el body de la petición como "idProduct")
}
### GET {
  api/v1/carritos/:idCart/productos (muestra los productos del carrito correspondiente a ":idCart")
}
### DELETE {
  api/v1/carritos/:idCart/productos/:idProduct (elimina un producto segun su ":idProduct" en el carrito segun su ":idCart")
}
### DELETE {
  api/v1/carritos/:idCart (vacia un carrito segun su ":idCart")
}