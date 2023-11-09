const express = require('express');
const app = express();
const port = 8080;

// Middleware para el manejo de datos en formato JSON
app.use(express.json());

// Rutas de productos
const productsRouter = require('./rutas/products');
app.use('/fapi/products', productsRouter);

// Rutas de carritos (carts)
const cartsRouter = require('./rutas/carts');
app.use('/fapi/carts', cartsRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
