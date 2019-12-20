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

JogoDAO.prototype.startGame = function(res, usuario, casa, msg){
  this._connection.open(function(err, mongoClient){
    mongoClient.collection('jogo', function(err, collection){
      collection.find({usuario: usuario}).toArray(function(err, result){

        res.render('jogo', {img_casa:casa, jogo: result[0], msg: msg});

        mongoClient.close();
      })

    })
  })
}

JogoDAO.prototype.acao = function(acao){
  this._connection.open(function(err, mongoClient){
    mongoClient.collection('acao', function(err, collection){
      var date = new Date()
      var tempo = null

      switch(parseInt(acao.acao)){
        case 1:
          tempo = 1 * 3600000
          break
        case 2:
          tempo = 2 * 3600000
          break
        case 3:
          tempo = 5 * 3600000
          break
        case 4:
          tempo = 5 * 3600000
          break
      }

      acao.end_at = date.getTime() + tempo
      collection.insert(acao)

      mongoClient.close();
    })

    mongoClient.collection('jogo', function(err, collection){

      var moedas = null
      
      switch(parseInt(acao.acao)){
        case 1:
          moedas = - 2 * acao.quantidade
          break
        case 2:
          moedas = - 3 * acao.quantidade
          break
        case 3:
          moedas = - 1 * acao.quantidade
          break
        case 4:
          moedas = - 1 * acao.quantidade
          break
      }

      collection.update(
        {usuario: acao.usuario},
        {$inc: {moeda: moedas}}
      )

      mongoClient.close();
    })
  })
}

JogoDAO.prototype.getActions = function(usuario, res){
  this._connection.open(function(err, mongoClient){
    mongoClient.collection('acao', function(err, collection){
      var date = new Date()
      var agora = date.getTime()
      collection.find({usuario: usuario, end_at:{$gt: agora}}).toArray(function(err, result){

        res.render('pergaminhos', {actions: result})

        mongoClient.close();
      })

    })
  })
}

module.exports = function(){
  return JogoDAO
}