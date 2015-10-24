var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pos-unoesc');

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

var Schema = mongoose.Schema;

var json_schema = {
     name: { type: String, default: ''}
    ,description: { type: String, default: ''}
    ,alcohol: { type: Number, min: 0}
    ,category: { type: String, default: ''}
    ,created_at: { type: Date, default: Date.now}
    
}

var BeerSchema = new Schema(json_schema);

var Beer = mongoose.model('Beer', BeerSchema) , query = {};

Beer.find(query, function (err, data){
    if(err){
        console.log('Erro', err);
    }
    else{
        console.log('Listagem', data);
    }
    //para finalizar o processo de node.js
    process.exit(0);
})
