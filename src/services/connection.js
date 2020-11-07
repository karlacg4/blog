const mongoose = require('mongoose');
// colocamos la url de conexión local y el nombre de la base de datos
//mongoose.connect('mongodb://localhost:27017/AppCornPops', {
mongoose.connect('mongodb+srv://Rosita:120101@cluster0.ygrnh.mongodb.net/AppCornpops?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); // enlaza el track de error a la consola (proceso actual)
db.once('open', () => {
    console.log('connected'); // si esta todo ok, imprime esto
});