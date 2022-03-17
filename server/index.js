const express = require('express');
const db = require('./../database/index.js');

let app = express();

app.use(express.static(__dirname + '/./../dist'));

app.use(express.json());

app.get('/stats/:user', (req, res) => {
  db.getStats(req.params.user)
    .then((response) => {
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

app.get('/feeding/:user', (req, res) => {
  db.updateFeedings(req.params.user, (error, response) => {
    if (error) {
      console.error(error);
    } else {
      res.send(200);
    }
  });
});

app.get('/heartsRem/:user', (req, res) => {
  db.removeHearts(req.params.user, (error, response) => {
    if (error) {
      console.error(error);
    } else {
      res.send(200);
    }
  });
});

app.get('/growing/:user/:timesFed', (req, res) => {
  console.log('MADE IT INTO SERVER');
  db.updateGrowth(req.params.user, req.params.timesFed, (error, response) => {
    if (error) {
      console.error(error);
    } else {
      res.sendStatus(200);
    }
  });
});

let port = 3333;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
