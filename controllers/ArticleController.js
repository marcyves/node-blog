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
        return JSON.parse(data);
    }
    /**
     * Returns a list of articles 
     */
    async getArticles() {
    const data = await this.loadData();
    return data.map(article => {
        return { id:article.id, title: article.title, message: article.text, author: article.author };
        });
    }

    async getNextId() {
        const data = await this.loadData();
        let id_max = 0;
        data.forEach((article) =>{
            if (article.id > id_max){
                id_max = article.id;
            }
        });
        return id_max + 1;
    }

    async addEntry(title, message, author){
        const data = (await this.loadData()) || [];
        const id = await this.getNextId();
        console.log("max: ",id)
        data.unshift({ id, title, message, author});
        return writeFile(this.datafile, JSON.stringify(data));
    }

}

module.exports = ArticleController;