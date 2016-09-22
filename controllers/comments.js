'use strict'

const Article = require('../models/article')

module.exports.new = ({params: {id}},res) => {
  Article
    .findOne({_id: id})
    .then(article => {
      article.comments = article.comments.sort((a,b) => {
        if(a.vote < b.vote) return  1
        if(a.vote > b.vote) return -1
      })
      res.render('comments', {article})
    })
}

module.exports.create = ({user,body, params: {id}},res, cb) => {
  if(body.submitButton) {
    let newObj = {
      text: body.comments,
      vote: 0,
      id: new Date(),
      user: user.user
    }
    Article
      .update({_id: id}, {$push: { comments: newObj } })
      .then(() => res.redirect(`/comments/${id}`))
      .catch(cb)
    } else {
      let voteIncrementer
       ,         voteType

      if(Object.keys(body)[0] === 'upvote') {
        voteIncrementer = 1
        voteType = 'upvote' 
      } else {
        voteIncrementer = -1
        voteType = 'downvote'
      }
      Article
        .update({_id: id, "comments": { $elemMatch: { "id": body[voteType]} } }, { "$inc": { "comments.$.vote": voteIncrementer}} )
        .then(() => {
          res.redirect(`/comments/${id}`)
        })
        .catch(cb)
  }
}