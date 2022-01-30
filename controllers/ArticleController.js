const fs = require("fs");
const util = require("util");
/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
 const readFile = util.promisify(fs.readFile);
 const writeFile = util.promisify(fs.writeFile);
 /**
 * 
 */
class ArticleController {
/**
 * Constructor
 * @param {*} datafile Path to a JSOn file that contains the discs data
 */
constructor(datafile) {
    this.datafile = datafile;
    }

    async loadData() {
        const data = await readFile(this.datafile, "utf8");
        return JSON.parse(data).articles;
    }
    /**
     * Returns a list of articles 
     */
    async getArticles() {
    const data = await this.loadData();
    // We are using map() to transform the array we get into another one
    return data.map(article => {
        return { id: article.id, title: article.title, message: article.text, author: article.author };
        });
    }

    async addEntry(title, text, author){
        const data = (await this.getData()) || [];
        data.unshift({ title, message, author});

        return writeFile(this.datafile, JSON.stringify(data));
    }

}

module.exports = ArticleController;