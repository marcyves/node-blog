const express = require('express');
const fs = require("fs");
const path = require('path');
const bodyParser = require('body-parser');


const router = require('./routes');

const app = express();
const port = 3000;

const dataFolder = './data/';
const blogFile = dataFolder + 'blog.json';
const paramsFile  = dataFolder + 'params.json';

const ArticleController = require('./controllers/ArticleController');
const articleController = new ArticleController(blogFile);

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './public')));

fs.readFile(path.join(__dirname, paramsFile), 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    app.locals.socials = JSON.parse(data).socials;
    app.locals.siteName = JSON.parse(data).name;
    app.locals.menu = JSON.parse(data).nav;
});

app.use('/', router({
  articleController,
}));

app.listen(port, () => {
    console.log(`Le serveur a démarré sur http://localhost:${port}`);
});