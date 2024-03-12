import express from 'express';
import ProductController from './src/controller/product.controller.js';

const server = express();


server.use(express.static('src/views'));

const productController = new ProductController();


server.get("/", productController.getProducts);


server.listen(8000, () => {
    console.log('Server is running on  port 8000');
});