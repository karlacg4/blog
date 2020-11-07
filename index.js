const express = require('express');
const app = express();
const router = require('./src/routes/movies');
const Movie = require('./src/models/movie'); // importa el esquema
const methodOverride = require('method-override');
require('./src/services/connection'); // importa el archivo de conexión

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async(req, res) => {
    const movies = await Movie.find();
    res.render('index', { movies: movies });
});

app.use('/movies', router);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});