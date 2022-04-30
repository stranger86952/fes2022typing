window.addEventListener('DOMContentLoaded', function(){
  var rankingdate=[];
  fetch("./list.txt").then(e => e.text()).then(e => rankingdate=e.split(/[/\s//\r\n|\n/]/));
  $('#Branking').on('click', function() {
    alert("クリックされました");
  });
  for(var i=0;i<(rankingdate.length-1)/4;i++){
    $('#ranking').append('<tr><td>' + String(i+1) + '位</td><td>' + String(rankingdate[4*i]+1) + '</td><td>' + String(rankingdate[4*i]) + '</td><td>' + String(rankingdate[4*i+2]) + '</td></tr>');
  }
});
