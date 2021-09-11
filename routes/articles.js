const express = require('express');
const article = require('../models/article');
const router = express.Router();
const Article = require("./../models/article");


router.get('/new', (req, res) =>{
    res.render("articles/new", { article: new Article() })
})

router.get('/:id', async(req, res) => {
    const article = await Article.findById(req.params.id);
    if (article == null) res.redirect('/')
    res.render('articles/show', {article: article})
})
//para pedir por banco de dados
router.post('/', async(req, res) =>{
    let article = new Article({        
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    })
        try { 
            article = await article.save();
            res.redirect(`/articles/${article.id}`)
        } catch(e){
            console.log(e)
            res.redirect("/")
        }
})

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

/*  Após escrever a função de exclusão instalar o method-override que faz get e delete ao mesmo tempo
Fazer importação dela no server js

*/

module.exports = router;