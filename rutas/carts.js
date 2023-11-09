const express = require('express');
const router = express.Router();

// Datos de ejemplo para los carritos (puedes usar una base de datos real en su lugar)
const carts = [
  { id: 1, products: [] },
  { id: 2, products: [] },
  // ... otros carritos
];

// Ruta GET /fapi/carts/:cid: Listar los productos de un carrito específico
router.get('/:cid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const cart = carts.find((c) => c.id === cartId);

  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
});

// Ruta POST /fapi/carts/:cid/product/:pid: Agregar un producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);
  const { quantity } = req.body;

  const cart = carts.find((c) => c.id === cartId);
  const product = products.find((p) => p.id === productId);

  if (!cart || !product) {
    return res.status(404).json({ message: 'Carrito o producto no encontrado' });
  }

  const existingProduct = cart.products.find((item) => item.product.id === productId);

  if (existingProduct) {
    existingProduct.quantity += quantity || 1;
  } else {
    cart.products.push({ product: { id: productId }, quantity: quantity || 1 });
  }

  res.json(cart.products);
});

module.exports = router;
