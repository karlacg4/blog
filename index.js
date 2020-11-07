const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
require('./connection'); // importa el archivo de conexión
const Movie = require('./movie'); // importa el esquema


//app.use(express.static(path.join(__dirname)));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.post('/', (req, res) => {
    const title = req.body.inputTitle;
    const dir = req.body.inputDirector;
    const desc = req.body.inputDescription;

    const movie = new Movie({ title: title, director: dir, description: desc }); // crea la entidad
    movie.save(); // guarda en bd
    res.sendFile(__dirname + '/index.html')
});

app.listen(3000, () => {
    console.log('Listening on port 3000')
});