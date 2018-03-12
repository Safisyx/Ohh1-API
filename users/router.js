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

router.post('/logins', (req,res) => {
  User
  	.findOne({
  		where: {
  			email: req.body.email
  		}
  	})
  	.then(entity => {
  		if (bcrypt.compareSync(req.body.password, entity.password)) {
  			res.send({
  				jwt: sign(entity.id)
  			})
  		}
  		else {
  			res.status(400).send({
  				message: 'Password was incorrect'
  			})
  		}
  	})
  	.catch(err => {
  		console.error(err)
  		res.status(500).send({
  			message: 'Something went wrong'
  		})
  	})
})

router.delete('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(entity => {
      return entity.destroy()
    })
    .then(_ => {
      res.send({
        message: `User ${req.params.id} deleted succesfully`
      })
    })
    .catch(error => {
      res.status(500).send({
        message: `Something went wrong`,
        error
      })
    })
})

module.exports = router
