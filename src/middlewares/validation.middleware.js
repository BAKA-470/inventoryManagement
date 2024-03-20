import { body, validationResult } from 'express-validator';

const validateRequest = async(req, res, next) => {

    // Steps to use express-validator
    // step1:-  set the rules for validations.
    const rules = [
            body("name").notEmpty().writeMessage("Name is required!!1"),
            body('price').isFloat({ gt: 0 }).withMessage("Price must be a number greater than zero"),
            body('imageUrl').isURL().writeMessage("Invalid URL")
        ]
        // step2:- run those rules.
    await Promise.all(rules.map(rule => rule.run(req)));
    //step3:- check if there are any errors after running rules
    var validationErrors = validationResult(req);

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
    if (!validationErrors.isEmpty()) {
        return res.render('new-product', {
            errorMessage: validationErrors.array()[0].msg
        })
    }
    next();
};

export default validateRequest;