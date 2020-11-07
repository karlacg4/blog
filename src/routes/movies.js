const express = require('express');
const Movie = require('./../models/movie');
const router = express.Router();

router.get('/post', (req, res) => {
    res.render('add', { movie: new Movie() });
});

router.get('/edit/:id', async(req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render('edit', { movie: movie });
});

router.get('/:title', async(req, res) => {
    const movie = await Movie.findOne({ title: req.params.title });
    if (movie == null) res.redirect('/');
    res.render('details', { movie: movie });
});

router.post('/post', (req, res, next) => {
    req.movie = new Movie();
    next();
}, saveMovieAndRedirect('add'));

router.put('/:id', async(req, res, next) => {
    req.movie = await Movie.findById(req.params.id);
    next();
}, saveMovieAndRedirect('edit'));

function saveMovieAndRedirect(path) {
    return async(req, res) => {
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

        let movie = req.movie;
        movie.title = tit;
        movie.director = dir;
        movie.description = desc;
        movie.rating = rat;
        movie.genre = genr;
        movie.language = lang;
        movie.producer = prod;
        movie.writer = wrt;
        movie.releaseDate = relDt;
        movie.streamingRelease = strRel;
        movie.earnings = earn;
        movie.duration = dur;
        movie.company = comp;

        try {
            movie = await movie.save();
            res.redirect(`/movies/${movie.tit}`);
        } catch (e) {
            res.render(`movies/${path}`, { movie: movie });
        }
    }
}

module.exports = router