const express = require('express');
const router = express.Router();

// Datos de ejemplo para los productos (puedes usar una base de datos real en su lugar)
const products = [
  { id: 1, name: 'Producto 1', price: 10.99 },
  { id: 2, name: 'Producto 2', price: 15.99 },
  { id: 3, name: 'Producto 3', price: 5.99 },
  // ... otros productos
];

// Ruta GET /fapi/products: Obtener la lista de productos
router.get('/', (req, res) => {
  // Aplicar la limitación con query param ?limit
  const limit = req.query.limit || products.length;
  const limitedProducts = products.slice(0, limit);
  res.json(limitedProducts);
});

// Ruta GET /fapi/products/:id: Obtener un producto específico por su ID
router.get('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});



module.exports = router;
// Ruta POST /fapi/products: Agregar un nuevo producto
router.post('/', (req, res) => {
    // Obtener los datos del nuevo producto del cuerpo de la solicitud
    const { title, description, category, price, stock, thumbnails } = req.body;
  
    // Validar que los campos obligatorios estén presentes
    if (!title || !description || !category || !price || !stock) {
      return res.status(400).json({ message: 'Todos los campos obligatorios deben estar presentes' });
    }
  
    // Generar un ID único para el nuevo producto
    const newProductId = generateUniqueId();
  
    // Crear el nuevo producto
    const newProduct = {
      id: newProductId,
      title,
      description,
      category,
      price,
      stock,
      thumbnails: thumbnails || [], // Campos opcionales
      status: true, // Status es true por defecto
    };
  
    // Agregar el nuevo producto a la lista de productos
    products.push(newProduct);
  
    res.status(201).json(newProduct);
  });
  // ... Rutas anteriores ...

// Ruta PUT /fapi/products/:id: Actualizar un producto existente
router.put('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { title, description, category, price, stock, thumbnails, status } = req.body;
  
    // Buscar el producto por ID
    const product = products.find((p) => p.id === productId);
  
    if (product) {
      // Asegurarse de que el campo 'id' no se actualice
      const updatedProduct = {
        ...product,
        title: title || product.title,
        description: description || product.description,
        category: category || product.category,
        price: price || product.price,
        stock: stock || product.stock,
        thumbnails: thumbnails || product.thumbnails,
        status: status !== undefined ? status : product.status,
      };
  
      
      const productIndex = products.findIndex((p) => p.id === productId);
      products[productIndex] = updatedProduct;
  
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  });
  
  
  router.delete('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
  
    const productIndex = products.findIndex((p) => p.id === productId);
  
    if (productIndex !== -1) {
      
      const deletedProduct = products.splice(productIndex, 1);
      res.json(deletedProduct[0]);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  });
  

  router.post('/', (req, res) => {

    const { title, description, category, price, stock, thumbnails } = req.body;
  
    
    if (!title || !description || !category || !price || !stock) {
      return res.status(400).json({ message: 'Todos los campos obligatorios deben estar completos' });
    }
  
    // Generi id
    const newProductId = generateUniqueId();
  
  
    const newProduct = {
      id: newProductId,
      title,
      description,
      category,
      price,
      stock,
      thumbnails: thumbnails || [],
      status: true,
    };
  
    products.push(newProduct);
  
    res.status(201).json(newProduct);
  });
  

  
  