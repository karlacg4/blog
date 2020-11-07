const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./src/services/connection'); // importa el archivo de conexión
const Movie = require('./src/models/movie'); // importa el esquema

//const path = require('path');
//app.use(express.static(path.join(__dirname)));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/movie', (req, res) => {
    res.sendFile(__dirname + '/movie1.html');
});

app.get('/post', (req, res) => {
    res.sendFile(__dirname + '/html/form.html');
});

app.post('/post', (req, res) => {
    const tit = req.body.inputTitle;
    const dir = req.body.inputDirector;
    const desc = req.body.inputDescription;
    const rat = req.body.inputRatings;
    const genr = req.body.inputGenre;
    const lang = req.body.inputLanguage;
    const prod = req.body.inputProducer;
    const wrt = req.body.inputWriter;
    const relDt = req.body.inputReleaseDate;
    const strRel = req.body.inputStreamingRelease;
    const earn = req.body.inputEarnings;
    const dur = req.body.inputDuration;
    const comp = req.body.inputCompany;

    const movie = new Movie({
        title: tit,
        director: dir,
        description: desc,
        rating: rat,
        genre: genr,
        language: lang,
        producer: prod,
        writer: wrt,
        releaseDate: relDt,
        streamingRelease: strRel,
        earnings: earn,
        duration: dur,
        company: comp
    }); // crea la entidad
    movie.save(); // guarda en bd

    var http = require('http');
    http.createServer(function(req, res) {
        res.write('<html><head></head><body>');
        res.write('<p>Write your HTML content here</p>');
        res.end('</body></html>');
    }).listen(3000);

    res.sendFile(__dirname + '/html/form.html');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});