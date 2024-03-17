import express from 'express';
import ProductController from './src/controller/product.controller.js';
import ejsLayouts from "express-ejs-layouts";
import path from 'path';
import validationMiddleware from './src/middlewares/validation.middleware.js';


const server = express();

// parse the data so that we can use the data  in our requests from body

server.use(express.urlencoded({ extended: true })); //parse url
// setting the view engine/ templet engine to show dynamic data
server.set("view engine", "ejs");
// setting the server to use views folder for static files i.e all the static files will be in views folder
server.set('views', path.join(path.resolve(), "src", "views"));
server.use(express.static('src/views'));

server.use(ejsLayouts);

const productController = new ProductController();


server.get("/", productController.getProducts);
server.get('/new', productController.getAddForm);
server.post('/', validationMiddleware, productController.addNewProduct);


server.listen(8000, () => {
    console.log('Server is running on  port 8000');
});