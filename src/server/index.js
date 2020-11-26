const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;
let db;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const url = 'mongodb://localhost:27017';
const dbName = 'apiFilms';
MongoClient.connect(url, function (err, client) {
  console.log('Connected successfully to server');

  db = client.db(dbName);

});

app.get('/films', (req, res) => {
  const {search} = req.query;
  const query = search ? {
    $or: [
      {Title: {$regex: `${search}`, $options: 'i'}},
      {Stars: {$regex: `${search}`, $options: 'i'}},
    ],
  } : {};
  db.collection('films')
    .find(query)
    .collation({locale: "en", caseFirst: "upper"})
    .sort({Title: 1})
    .toArray((err, docs) => {
      res.json(docs);
    });
});

app.get('/films/:id', (req, res) => {
  const {id} = req.params;

  db.collection('films').findOne(
    {
      _id: new mongodb.ObjectID(id),
    },
    (err, docs) => {
      res.json(docs);
    },
  );
});

app.post('/films', (req, res) => {
  const query = {};
  if (req.body.Title) {
    query.Title = req.body.Title;
  }
  if (req.body.ReleaseYear) {
    query.ReleaseYear = req.body.ReleaseYear;
  }
  db.collection('films')
    .find(query)
    .toArray((err, docs) => {
      if (!docs.length) {
        db.collection('films').insertOne(req.body);
        res.json({
          status: 'ok',
        });
      } else {
        res.json({
          status: 'failed',
        });
      }
    });
});

app.delete('/films/:id', (req, res) => {
  const {id} = req.params;

  db.collection('films').deleteOne({
    _id: new mongodb.ObjectID(id),
  });

  res.json({
    status: 'ok',
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
