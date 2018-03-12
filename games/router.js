const Game = require('./model')
const  func = require('../lib/game')
const Router = require('express').Router
//const bcrypt = require('bcrypt')

//const sign = require('../jwt').sign
// const stringToArrayOfArrayOfInteger = (str) => ( //LOL :P
//   str.slice(2,-2).split('],[').map(s=> s.split(',').map(v=>parseInt(v)))
// )
const stringToArrayOfInteger = (str) => (
  str.slice(1,-1).split(',').map(s=>parseInt(s))
)

const requireUser = (req, res, next) => {
	if (req.user) next()
	else res.status(401).send({
		message: 'Please login'
	})
}

const router = new Router()

router.post('/games', (req, res) => {
  //console.log(func.areIdentical([1,2,1,1,1,0],[2,1,2,1,1,1]));
  const size=parseInt(req.body.boardSize)
  const [board,locked] = func.fillBoard(size)
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

///////////////////
/*We pass a parameter move=[INTEGER,INTEGER] to update the game
  and we send the current status of the game, the errors and a boolean to tell
  if the game is finished
*/
//////////
const updateOrPatch = (req, res) => {
  //const productId = Number(req.params.id
  let move = stringToArrayOfInteger(req.body.move)
  //console.log(move);
  // if (req.body.preferredbreed) {
	// 	//const a=updates.preferredbreed.concparseInt(req.body.preferredbreed)
	// 	console.log(updates.preferredbreed);
	//   //updates.preferredbreed.push(parseInt(req.body.preferredbreed))
	// }
  // find the product in the DB
  Game.findById(req.params.id)
    .then(entity => {
      //console.log(entity.board);
      if (func.gameFinished(entity.board)) { //Not tested yet
        return json({message: 'game is finished'})
      }

      let updates=entity.dataValues
      //console.log(updates.board[move[0]][move[1]]);
      //console.log(updates);
        updates.board[move[0]][move[1]]=(updates.board[move[0]][move[1]]+1)%3
      //console.log(updates);
			return entity.update(updates)
		})

    .then(final => {
      // respond with the changed product and status code 200 OK
      console.log(final.board);
      const errors ={
        dupeRows: func.duplicateRows(final.board),
        dupeCols: func.duplicateCols(final.board),
        errorRows: func.rows(final.board).map(r => (func.threeOrMoreInARow(r))),
        errorCols: func.cols(final.board).map(c => (func.threeOrMoreInARow(c))),
      }
      const finished= func.gameFinished(final.board)
      res.send({game:final.dataValues,errors,finished})
    })
    .catch(error => {
      res.status(500).send({
        message: `Something went wrong`,
        error
      })
    })
}

router.put('/games/:id', requireUser, updateOrPatch)
router.patch('/games/:id', requireUser, updateOrPatch)

router.delete('/games/:id', requireUser, (req, res) => {
  Game.findById(req.params.id)
    .then(entity => {
      return entity.destroy()
    })
    .then(_ => {
      res.send({
        message: `Game ${req.params.id} deleted succesfully`
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
