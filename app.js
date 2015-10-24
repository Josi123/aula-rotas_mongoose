var http = require('http');

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

var Beer = mongoose.model('Beer', BeerSchema);


http.createServer(function (req, res) {
     
  console.log('URL: ', req.url);
  var url = req.url;    
      
  var Controler = {
    create: function(req, res){
         //funtion create
         var dados = {
                name: 'Skol',
                description: 'mijo de rato',
                alcohol: 4.5,
                price: 3.8,
                category: 'pilsen'
            }

            var model = new Beer(dados);

            var msg = '';
            model.save(function (err, data) {
              if (err){
                console.log('Erro: ', err);
                   msg = 'Erro: ' + err;
              }
              else{
                console.log('Cerveja Inserida: ', data);
                msg = 'Cerveja Inserida: ' + data;
              }
              res.end(msg);
            });      
          
    }
    ,retrieve: function(req, res){
        
            var  query = {};
            var msg = '';
            Beer.find(query, function (err, data){
                if(err){
                    console.log('Erro', err);
                    msg = 'Erro: ' + err;
                }
                else{
                    console.log('Listagem', data);
                    msg = 'lista: ' + data;
                }
                res.end(msg);
                //para finalizar o processo de node.js
                process.exit(0);
            })
        
    
    }
    ,update: function(req, res){ 
        var query = {} ;
      
        var msg = '';
        var mod = {
            name:'Brahma',
            alcohol:  4,
            price: 6,
            category: 'pilsen'
        };

        var optional = {
            upsert: false,
            multi: true
        };
        Beer.update(query, mod, optional, function(err, data){
                    if(err){ 
                        console.log('Erro: ', err);
                         msg = 'Erro: ' + err;
                    }
                   else{ 
                    console.log( 'Cervejas atualizadas com sucesso', data);
                       msg = 'Cerveja atulizadas: ' + data;
                      
                   }
                  res.end(msg);
        });

    
    }
      
      
    ,delete: function(req, res){ 
        var msg = '';
        var query = {name: /skol/i};
    
        Beer.remove(query, function(err, data){
            if(err){ 
                console.log(err);
                msg = 'Erro: ' + err;
            }
            else{ 
                console.log( 'Cerveja deletada');
                msg = 'Cerveja atulizadas: ' + data;
 
            }
            res.end(msg);
        }) 
    
    }
  }
      
  switch (url){
    case '/api/beers/create':
          Controler.create(req, res);
        break;
    case '/api/beers/retrieve':
          Controler.retrieve(req, res);

        break;
    case '/api/beers/update':
          Controler.update(req, res);
        break;
    case '/api/beers/delete':
          Controler.delete(req, res);
        break;
      default:
          res.end('Rota não encontrada');
        break  

    }
  
}).listen(3000);
console.log('Server running at http://localhost:3000/');