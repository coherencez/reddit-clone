'use strict'
const Article = require('../models/article')

module.exports.new = (req,res,cb) => {
  Article
    .find()
    .sort({rating: -1})
    .then(data => {
      res.render('home', {home: true, data})
    })
    .catch(cb)
}

module.exports.edit = (req,res,cb) => {
  let id = req.body.upvote || req.body.downvote
    , voteIncrementer

  ;(Object.keys(req.body)[0] === 'upvote') ? voteIncrementer = 1 : voteIncrementer = -1

    Article
      .update({_id: id}, {$inc: {rating: voteIncrementer}})
      .then(() => res.redirect('/'))
      .catch(cb)
}