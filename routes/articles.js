const express = require('express');
const article = require('../models/article');
const router = express.Router();
const Article = required("./../models/article");

router.get('/new', (req, res) =>{
    res.render("articles/new", { article: new Article() })
})

router.get('/:id', async(req, res) => {
    const article = await Article.findByid(req.params.id);
    res.render('articles/show', {article: article})
})
//para pedir por banco de dados
router.post('/', async(req, res) =>{
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.makdown,
    })
        try{ 
            article = await article.save();
            res.redirect(`/article/${id}`)
        }catch(e){
            console.log(e)
            res.redirect("/")
        }
})

module.exports = router;