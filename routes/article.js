const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

module.exports = (params) => {

    const { contactController } = params;

    router.post('/', [
        check('name')
        .trim()
        .isLength({min: 3})
        .escape()
        .withMessage('Le nom est obligatoire'),
        check('titre')
        .trim()
        .isLength({min: 10})
        .escape()
        .withMessage('Un titre de plus de 10 caractères est obligatoire'),
        check('message')
        .trim()
        .isLength({min: 10})
        .escape()
        .withMessage('Un texte de plus de 50 caractères est obligatoire'),
    ],
    async (req, rep) => {

        const errors = validationResult(req);
        console.log(req.body);

        let messages = {};

        if(!errors.isEmpty()){
            messages = {
                errors: errors.array(),
            };
        } else {
            const { name, email, message } = req.body;
            await contactController.addEntry(name, email, message);
        };

        rep.render('layout', { pageTitle: "Contact",
                               messages: messages.errors,
                               template: "contact", 
                               contact: req.body });
    });
    
    return router;
}