module.exports.index = function(application, req, res){
  res.render('index', {validacao: {}, dadosCadastro:{}});
}

module.exports.autenticar = function(application, req, res){

  var authData = req.body

  req.assert('usuario', 'Usuário não pode ser vazio!').notEmpty()
  req.assert('senha', 'Senha não pode ser vazia!').notEmpty()

  var erros = req.validationErrors()

  if(erros){
    res.render('index', {validacao: erros})
    return
  }

  var connection = application.config.dbConnection

  var UsuariosDAO = new application.app.models.UsuariosDAO(connection)

  UsuariosDAO.autenticar(authData, req, res)

  // res.send('Tudo certo! Vamos iniciar a sessão!')
}
