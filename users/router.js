const User = require('./model')
const Router = require('express').Router
const bcrypt = require('bcrypt')

const sign = require('../jwt').sign

const router = new Router()

router.post('/users', (req, res) => {
  const user = {
  	email: req.body.email,
  	password: bcrypt.hashSync(req.body.password, 10),
		name: req.body.name,
		game: req.body.game
  }

  User.create(user)
    .then(entity => {
      res.status(201)
      res.json({
        id: entity.id,
				name: entity.name,
        email: entity.email,
		    game: entity.game
      })
    })
    .catch(err => {
      console.error(err)
      res.status(500).send({
        message: 'Something went wrong'
      })
    })

})


module.exports = router
