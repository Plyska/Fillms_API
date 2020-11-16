const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;


const app = express();
const port = 3000;
let db;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const url = 'mongodb://localhost:27017';
const dbName = 'apiFilms';
MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
 
  db = client.db(dbName);
 
//   client.close();
});


app.get('/films', (req, res) => {
    const { search } = req.query;
    console.log(search);
    db.collection('films').find({}).toArray((err, docs) => {

        console.log(docs);
        res.json(docs.filter(item=>item.Title.toLowerCase().includes(search.toLowerCase())));

    })


});

app.get('/films/:id', (req, res) => {
    const { id } = req.params;

    db.collection('films')
    .findOne({
        _id: new mongodb.ObjectID(id)
    }, (err, docs) => {
        res.json(docs);
    });
});

app.post('/films', (req, res) => {
    console.log(req.body)
    db.collection('films').insertOne(req.body);

    return res.json({
        'status': 'ok'
    });
});

app.delete('/films/:id', (req, res) => {
    const { id } = req.params;

    db.collection('films').deleteOne({
        _id: new mongodb.ObjectID(id)
    });

    res.json({
        'status': 'ok'
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});