const express = require('express');
const db = require('./../database/index.js');

let app = express();

app.use(express.static(__dirname + '/./../dist'));

app.use(express.json());

app.get('/stats/:user', (req, res) => {
  db.getStats(req.params.user)
    .then((response) => {
      console.log(JSON.stringify(response));
      res.status(200).send(JSON.stringify(response));
    })
    .catch((error) => {
      res.sendStatus(400);
    });
});

app.post('/stats/:user/:name', (req, res) => {
  db.addPet(req.params)
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(404);
    });
});

app.get('/users/:user', (req, res) => {
  db.checkIfExists(req.params.user, (error, response) => {
    if (error) {
      console.error(error);
    } else {
      res.status(200).send(JSON.stringify(response));
    }
  });
});

let port = 3333;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
