var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/be-mean-book');

var db = mongoose.connection;

db.on('error', function(err){
    console.log('Erro de conexao.', err);
});
db.on('open', function () {
  console.log('Conexão aberta.');
});
db.on('connected', function(err){
    console.log('Conectado');
});
db.on('disconnected', function(err){
    console.log('Desconectado');
});

var Cat = mongoose.model('Cat', {name: String}));