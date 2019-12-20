module.exports.jogo = function(application, req, res){
  if(req.session.autorizado !== true){
    res.redirect('/')
    return
  }

  var msg = ''
  if(req.query.msg !== ''){
    msg = req.query.msg
  }

  var usuario = req.session.usuario
  var casa = req.session.casa

  var connection = application.config.dbConnection
  var JogoDAO = new application.app.models.JogoDAO(connection)

  JogoDAO.startGame(res, usuario, casa, msg)
}

module.exports.sair = function(application, req, res){
  req.session.destroy(function(err){
    res.render('index', {validacao: {}})
  })
}

module.exports.suditos = function(application, req, res){
  if(req.session.autorizado !== true){
    res.redirect('/')
    return
  }
  res.render('aldeoes', {validacao: {}})
}

module.exports.pergaminhos = function(application, req, res){
  if(req.session.autorizado !== true){
    res.redirect('/')
    return
  }
  //recuperar ações inseridas no Banco de dados
  var connection = application.config.dbConnection
  var JogoDAO = new application.app.models.JogoDAO(connection)

  var usuario = req.session.usuario

  JogoDAO.getActions(usuario, res)
}

module.exports.ordernar_acao = function(application, req, res){
  if(req.session.autorizado !== true){
    res.redirect('/')
    return
  }
  var dadosActions = req.body

  req.assert('acao', 'Ação deve ser informada').notEmpty()
  req.assert('quantidade', 'Quantidade deve ser informada').notEmpty()

  var erros = req.validationErrors();

  if(erros){
    res.redirect('jogo?msg=A')
    return
  }

  var connection = application.config.dbConnection
  var JogoDAO = new application.app.models.JogoDAO(connection)


  dadosActions.usuario = req.session.usuario
  JogoDAO.acao(dadosActions)

  res.redirect('jogo?msg=B')
}

module.exports.revogar_acao = function(application, req, res){
  if(req.session.autorizado !== true){
    res.redirect('/')
    return
  }

  var urlQuery = req.query

  var connection = application.config.dbConnection
  var JogoDAO = new application.app.models.JogoDAO(connection)

  var _id = urlQuery.acao_id

  JogoDAO.revogarAcao(_id, res)
}