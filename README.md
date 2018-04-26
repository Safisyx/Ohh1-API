# Ohh1-API
Back-end for https://github.com/Safisyx/Ohh1 (Node, Express, Sequelize)  
The aim of this project was to keep track of the state of the game and can allow the client to retrieve the latest saved game.  
## To run it
First you need [nodejs](https://nodejs.org/en/), and configure the database link in src/db.js (I am using [postgreSQL](https://www.postgresql.org/)).  
Run ```npm install``` to install the dependencies, you may want to use [yarn](https://yarnpkg.com/en/) as it is a ultra fast dependency manager :smile:  
Run ```node_modules/.bin/sequelize db:migrate``` to create the tables.  
Run ```node .``` to start the api

### Safidy Ratsimbazafy
