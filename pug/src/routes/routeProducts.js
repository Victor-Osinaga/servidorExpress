const { Router } = require('express');
const router = Router();

const products = require('../contenedor')

router.get('/', (req, res) => {
  res.render('form.pug');
});

router.get('/productos', async (req, res) => {
  res.render('products.pug', { products: await products.getAll() });
});

router.post('/productos', (req, res) => {
  products.save(req.body)
  res.redirect('/productos');
});

module.exports = router;