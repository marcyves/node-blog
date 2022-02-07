const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { route } = require('express/lib/application');

module.exports = (params) => {

    const { articleController } = params;

    router.get('/', (req, rep) => {
        rep.redirect('/');
    });


    router.post('/', [
        check('title')
        .trim()
        .isLength({min: 5})
        .escape()
        .withMessage('Le titre est obligatoire'),
        check('author')
        .trim()
        .isLength({min: 2})
        .escape()
        .withMessage("Le nom de l'auteur est obligatoire et dois faire plus de 2 caractères "),
        check('message')
        .trim()
        .isLength({min: 10})
        .escape()
        .withMessage('Un texte de plus de 10 caractères est obligatoire'),
    ],
    async (req, rep) => {

        const errors = validationResult(req);
//        console.log(req.body);

        let messages = {};

        if(!errors.isEmpty()){
            messages = {
                errors: errors.array(),
            };
        } else {
            const { title, message, author } = req.body;
            await articleController.addEntry(title, message, author);
        };

        const articles = await articleController.getArticles();

        rep.render('layout', { pageTitle: "Il y a du nouveau",
                               messages: messages.errors,
                               page: "index", articles });
    });
    
    return router;
}