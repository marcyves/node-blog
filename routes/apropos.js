const express = require('express');
const router = express.Router();

module.exports = () => {


    router.get('/', async (req, rep) => {
        
                rep.render('layout', { pageTitle: "À propos de ce blog",
                                       page: "apropos" });
            });
            
    return router;
}