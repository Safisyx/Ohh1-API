const Game = require('./model')
const  func = require('../lib/game')
const Router = require('express').Router
//const bcrypt = require('bcrypt')

//const sign = require('../jwt').sign
// const stringToArrayOfArrayOfInteger = (str) => ( //LOL :P
//   str.slice(2,-2).split('],[').map(s=> s.split(',').map(v=>parseInt(v)))
// )
const router = new Router()

router.post('/games', (req, res) => {
  //console.log(func.areIdentical([1,2,1,1,1,0],[2,1,2,1,1,1]));
  const [board,locked] = func.fillBoard(6)
  const game = {
  	board,
    locked,
    user: req.body.user
  }
	//console.log('[3,4,5]'.slice(1,-1));

  Game.create(game)
    .then(entity => {
      res.status(201)
      res.json({
        id: entity.id,
        user: entity.user,
				board: entity.board,
        locked: entity.locked,
				//preferredbreed: entity.preferredbreed
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
