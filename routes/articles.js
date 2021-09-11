const express = require('express');
const article = require('../models/article');
const router = express.Router();
const Article = require("./../models/article");

router.get('/new', (req, res) =>{
    res.render("articles/new", { article: new Article() })
})

router.get('/edit/:id', async (req, res)=> {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: new Article() })
}) // Criação da seção de edição

router.get('/:id', async(req, res) => {
    const article = await Article.findById(req.params.id);
    if (article == null) res.redirect('/')
    res.render('articles/show', {article: article})
})
//para pedir por banco de dados

router.post('/', async(req, res, next) => {
    req.article = new Article()
    next()
    /* let article = new Article({        
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
        } */
}, salvar_editar('/new'))

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, salvar_editar('edit'))

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

/*  Após escrever a função de exclusão instalar o method-override que faz get e delete ao mesmo tempo
Fazer importação dela no server js

*/

function salvar_editar(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        try { 
            article = await article.save();
            res.redirect(`/articles/${article.id}`)
        } catch(e){
            console.log(e)
            res.redirect("/")
        }
      }
    }

module.exports = router;
