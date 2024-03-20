import path from 'path';
import ProductModel from '../models/product.model.js';


export default class ProductController {

    getProducts(req, res) {
        let products = ProductModel.get();
        // console.log(products)
        //      res.render(name of .ejs file, {key to be passed as the name while rendering: value i.e name of the array or whatever is the data})
        res.render('products', { products: products })
            // path.resolve give the path to the current executing directory
            // return res.sendFile(path.join(path.resolve(), "src", "views", "products.html"));
    }

    getAddForm(req, res) {
        return res.render('new-product', { errorMessage: null });
    }

    addNewProduct(req, res) {
        // Here we are also doing validation  of data entered by user in form which violates the single responsibility principal i.e the controller should only be bothered by the req,res responsibilities not other things.
        // const { name, price, imageUrl } = req.body;
        // let errors = [];
        // if (!name || name.trim() == "") {
        //     errors.push('Name is required!!');
        // }
        // if (!price || parseFloat(price) < 1) {
        //     errors.push("Price must be a number greater than zero");
        // }
        // try {
        //     const validUrl = new URL(imageUrl);
        // } catch (error) {
        //     errors.push("URL is invalid!!");
        // }
        // if (errors.length > 0) {
        //     return res.render('new-product', {
        //         errorMessage: errors[0],
        //     })
        // }

        ProductModel.add(req.body);
        let products = ProductModel.get();
        return res.render('products', { products: products })
    }

    getUpdateProductView(req, res, next) {
        // 1 if product exist return view
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if (productFound) {
            res.render('update-product', { product: productFound, errorMessage: null });
        }
        // else return error
        else {
            res.status(401).send('Product not found');
        }
    }
    postUpdateProduct(req, res) {
        ProductModel.update(req.body);
        let products = ProductModel.get();
        return res.render('products', { products: products })
    }
    deleteProduct(req, res) {
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if (!productFound) {
            return res.status(401).send('Product Not Found!!')
        }
        ProductModel.delete(id);
        var products = ProductModel.get();
        return res.render('products', { products: products })
    }

}
// export default ProductController;