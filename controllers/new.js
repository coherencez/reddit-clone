'use strict'

const Article = require('../models/article')

module.exports.new = (req,res) => {
    res.render('newArticle')
}

module.exports.create = (req,res,cb) => {
    Article
      .create(req.body)
      .then(() => res.redirect('/'))
      .catch(cb)
}