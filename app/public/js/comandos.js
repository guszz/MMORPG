$(document).ready(function(){
  $('#logOut').click(function(){
    window.location.href = '/sair'
  })

  $('#cadastrar').click(function(){
    window.location.href = '/cadastro'
  })

  $('#home').click(function(){
    window.location.href = '/'
  })

  $('#btnAldeoes').click(function(){
    $('#msgErros').hide()
    $.ajax({
      url: '/suditos',
      method: 'get',
      success: function(data){
        $('#acoes').html(data)
      }
    })
  })

  $('#btnPergaminhos').click(function(){
    $('#msgErros').hide()
    $.ajax({
      url: '/pergaminhos',
      method: 'get',
      success: function(data){
        $('#acoes').html(data)
      }
    })
  })
})
