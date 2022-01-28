const express = require('express');
const router = express.Router();

const blogRouter = require('./article');

module.exports = (params) => {
    router.get('/', async (req, rep) => {
        const { articleController } = params;
        const articles = await articleController.getArticles();

        rep.render('layout', { pageTitle: "Bienvenue", template: "index", articles });    
    });

    router.use('/blog', blogRouter(params));

    router.use((err, req, rep) => {
        rep.render('layout', { pageTitle: "Cette page n'existe pas", template: "404", erreur: err });
    });
    
    return router;
};