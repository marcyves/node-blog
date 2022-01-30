const express = require('express');
const router = express.Router();

const blogRouter = require('./article');
const aproposRouter = require('./apropos');

module.exports = (params) => {
    router.get('/', async (requete, reponse) => {
        const { articleController } = params;
        const articles = await articleController.getArticles();

        reponse.render('layout', { pageTitle: "Bienvenue", messages: null, page: "index", articles });    
    });

    router.use('/article', blogRouter(params));
    router.use('/apropos', aproposRouter());

    router.use('/', (requete, reponse) => {
        reponse.render('layout', { pageTitle: "Cette page n'existe pas", page: "erreur" });
    });
    
    return router;
};