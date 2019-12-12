module.exports.cadastro = function(application, req, res){
  res.render('cadastro', {validacao: {}, dadosCadastro:{}});
}

module.exports.cadastrar = function(application, req, res){
  var dadosCadastro = req.body
  
  req.assert('nome', 'Campo NOME não pode ser vazio').notEmpty()
  req.assert('usuario', 'Campo USUARIO não pode ser vazio').notEmpty()
  req.assert('senha', 'Campo SENHA não pode ser vazio').notEmpty()
  req.assert('senha', 'Campo SENHA não pode ser vazio').len(6, 24)
  req.assert('casa', 'Campo CASA deve ser selecionado').notEmpty()

  var erros = req.validationErrors()

  if(erros){
    res.render('cadastro', {validacao: erros, dadosCadastro: dadosCadastro})
    return

  }


  res.send('Cadastro realizado com sucesso!');
}
