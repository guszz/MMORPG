function JogoDAO(connection){
  this._connection = connection()
}

JogoDAO.prototype.gerarStatus = function(usuario){
  this._connection.open(function(err, mongoClient){
    mongoClient.collection('jogo', function(err, collection){
      collection.insert({
        usuario:usuario,
        moeda:25,
        suditos:17,
        temor:Math.floor(Math.random() * 1000),
        sabedoria:Math.floor(Math.random() * 1000),
        comercio:Math.floor(Math.random() * 1000),
        magia:Math.floor(Math.random() * 1000)
      })
      mongoClient.close();
    })
  })
}

JogoDAO.prototype.startGame = function(res, usuario, casa, comando_invalido){
  this._connection.open(function(err, mongoClient){
    mongoClient.collection('jogo', function(err, collection){
      collection.find({usuario: usuario}).toArray(function(err, result){

        res.render('jogo', {img_casa:casa, jogo: result[0], comando_invalido: comando_invalido});

        mongoClient.close();
      })

    })
  })
}

module.exports = function(){
  return JogoDAO
}