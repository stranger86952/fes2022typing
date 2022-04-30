window.addEventListener('DOMContentLoaded', function(){
  disp('title');
  var rankingdate=[];
  fetch("./list.txt").then(e => e.text()).then(e => rankingA(rankingdate,e));
  $('#Branking').on('click', function() {
    alert("クリックされました");
  });
});

function disp(classname){
  if(classname=='title'){
    $('.title').show();
    $('.game').hide();
    $('.ranking').hide();
  }
  else if(classname=='game'){
    $('.title').hide();
    $('.game').show();
    $('.ranking').hide();
  }
  else if(classname=='ranking'){
    $('.title').hide();
    $('.game').hide();
    $('.ranking').show();
  }
}

function rankingA(rankingdate,e){
  rankingdate=e.split(/[/\s//\r\n|\n/]/)
  for(var i=0;i<(rankingdate.length-1)/4;i++){
    $('#ranking').append('<tr><td>' + String(i+1) + '位</td><td>' + String(rankingdate[4*i+1]) + '</td><td>' + String(rankingdate[4*i]) + '</td><td>' + String(rankingdate[4*i+2]) + '</td></tr>');
  }
}
