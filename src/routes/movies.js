const express = require('express')
const Movie = require('./../models/movie')
const router = express.Router()

router.get('/post', (req, res) => {
    res.render('add', { movie: new Movie() });
});

router.get('/edit/:id', async(req, res) => {
    res.sendFile(__dirname + '/html/form.html');
});

router.get('/:title', async(req, res) => {
    const movie = await Movie.findOne({ title: req.params.title });
    if (movie == null) res.redirect('/');
    res.render('details', { movie: movie });
})

router.post('/post', (req, res, next) => {
    //req.movie = new Movie();
    next();
}, saveMovieAndRedirect('add'));

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
        });

        try {
            movie = await movie.save();
            //res.redirect(`/movies/${movie.tit}`);
            res.render(`${path}`, { movie: movie });
        } catch (e) {
            res.render(`${path}`, { movie: movie });
        }
    }
}

module.exports = router