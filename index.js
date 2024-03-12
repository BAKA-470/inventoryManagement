import express from 'express';
import ProductController from './src/controller/product.controller.js';
import path from 'path';


const server = express();


// setting the view engine/ templet engine to show dynamic data
server.set("view engine", "ejs");
// setting the server to use views folder for static files i.e all the static files will be in views folder
server.set('views', path.join(path.resolve(), "src", "views"));
server.use(express.static('src/views'));

const productController = new ProductController();


server.get("/", productController.getProducts);


server.listen(8000, () => {
    console.log('Server is running on  port 8000');
});