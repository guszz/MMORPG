// fazendo o import do mongodb

var mongo = require('mongodb')

var mongoConnection = function(){
  var db = new mongo.Db(
    'got',
    new mongo.Server(
      'localhost', // endereço do servidor do banco de dados
      27017, // posta de conexão do banco de dados
      {}
    ),
    {}
  )
  return db;
}

module.exports = function () {
  return mongoConnection
}
