var Model = require('./model');
  
      
  var Controller = {
    create: function(req, res){
         //funtion create
         var dados = {
                name: 'Skol',
                description: 'mijo de rato',
                alcohol: 4.5,
                price: 3.8,
                category: 'pilsen'
            }

            var model = new Model(dados);

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
            Model.find(query, function (err, data){
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
        Model.update(query, mod, optional, function(err, data){
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
    
        Model.remove(query, function(err, data){
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
  };
  
  module.exports = Controller;