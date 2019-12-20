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
    $('.msg').hide()
    $.ajax({
      url: '/suditos',
      method: 'get',
      success: function(data){
        $('#acoes').html(data)
      }
    })
  })

  $('#btnPergaminhos').click(function(){
    $('.msg').hide()
    $.ajax({
      url: '/pergaminhos',
      method: 'get',
      success: function(data){
        $('#acoes').html(data)

        clearTimeout(timeId)
        cronometro()
      }
    })
  })

  var timeId = null

  function cronometro() {
    $('.timeLeft').each(function(){
      var segundos = $(this).html()
      var backTime = parseInt(segundos) - 1
      if(backTime < 0){
        window.location.href = '/jogo?msg=C'
      }else{
        $(this).html(backTime)
      }
    })

    timeId = setTimeout(function(){
      cronometro()
    }, 1000);
  }
})
