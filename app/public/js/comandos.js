$(document).ready(function(){
  $('#logOut').click(function(){
    window.location.href = '/sair'
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
