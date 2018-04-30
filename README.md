# Ohh1-API
Back-end for https://github.com/Safisyx/Ohh1 (Node, Express, Sequelize)  
BUT, they are not connected yet :smiley: (Will do it asap).  
For now the frontend is playable without any connection to the backend. The backend is also playable though :smiley:, make use of httpie for example.  
The aim of this project was to keep track of the state of the game and can the client to retrieve the latest saved game.  
## To run it
First you need [nodejs](https://nodejs.org/en/), and configure the database link in src/db.js (I am using [postgreSQL](https://www.postgresql.org/)).  
Run ```npm install``` to install the dependencies, you may want to use [yarn](https://yarnpkg.com/en/) as it is a ultra fast dependency manager :smile:  
Run ```node_modules/.bin/sequelize db:migrate``` or simply ```npm run migrate``` to create the tables.  
Run ```node .``` to start the api

### Safidy Ratsimbazafy
