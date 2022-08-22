const express = require('express');
const app = express();

const routerProductos = require('./src/routes/routerProductos.js')

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));

app.use('/api/productos', routerProductos)

module.exports = app;