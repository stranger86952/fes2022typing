window.addEventListener('DOMContentLoaded', function(){
  var rankingdate;
  fetch("./list.txt").then(e => e.text()).then(e => rankingdate=e.split(/[/\s//\r\n|\n/]/));
  $('#Branking').on('click', function() {
    alert("クリックされました");
  });
  for(var i=0;i<rankingdate.length;i++){
    if(i%4==0) $('#ranking').append('<tr><td>' + str(rankingdate[i]) + '位</td>');
    if(i%4==1) $('#ranking').append('<td>' + str(rankingdate[i]) + '</td>');
    if(i%4==2) $('#ranking').append('<td>' + str(rankingdate[i]) + '</td></tr>');
  }
});
