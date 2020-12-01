const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');

const cors = require('./middlewares/cors')
const app = express();

const dbname = "stuffmanager";
const uriConnection = `mongodb+srv://admin:admin@cluster0.cfdwn.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(uriConnection, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log(`Connecté à ${dbname}`))
    .catch((error) => console.log(`Echec de connexion ${error}`));

app.use(bodyParser.json());

app.use('/api/products', cors, productsRoutes);
app.use('/api/auth', cors, usersRoutes);

app.use('/$', (req, res) =>
{
    res.setHeader('Content-type', 'text/plain; charset=utf-8');
    res.status(200).end("Connecté à Stuff Manager");
});

app.use('*', (req, res) =>
{
    res.status(404).json({ error: { code: res.statusCode } })
});

module.exports = app;