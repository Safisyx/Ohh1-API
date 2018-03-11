const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

app.listen(4001, () => console.log('Express API listening on port 4001'))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
})


app.post('/games', (req, res) => {
  console.log(typeof(req.body.board));


  const game = {
    board: req.body.board
  }
	//console.log('[3,4,5]'.slice(1,-1));
  //str.slice(2,-2).split('],[').map(s=> s.split(',').map(v=>parseInt(v)))


  Game.create(game)
    .then(entity => {
      res.status(201)
      res.json(entity)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send({
        message: 'Something went wrong'
      })
    })

})
