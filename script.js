const fs = require('fs');

window.addEventListener('DOMContentLoaded', function(){
  disp('title');
  var rankingdate=[];
  fetch("./list.txt").then(e => e.text()).then(e => rankingA(rankingdate,e));
});

function disp(classname){
  if(classname=='title'){
    $('.title').show();
    $('.game').hide();
    $('.after').hide();
    $('.ranking').hide();
  }
  else if(classname=='game'){
    $('.title').hide();
    $('.game').show();
    $('.after').hide();
    $('.ranking').hide();
  }
  else if(classname=='ranking'){
    $('.title').hide();
    $('.game').hide();
    $('.after').hide();
    $('.ranking').show();
  }
}

function rankingA(rankingdate,e){
  rankingdate=e.split(\r\n);
  for(var i=0;i<(rankingdate.length-1);i++){
    ran=rankingdate[i].split(\s);
    $('#ranking').append('<tr><td>' + String(i+1) + '位</td><td>' + String(ran[0]) + '</td><td>' + String(ran[1]) + '</td><td>' + String(ran[2]) + '</td></tr>');
  }
}

function rankingB(name,score,typm){
  var s="";
  for(var i=0;i<(rankingdate.length-1);i++){
    ran = rankingdate[i].split(\s);
    if(ran[0]<=Number(score)){
      s + String(score) + ' ' + String(name) + ' ' + String(typm) + \r\n;
      for(var j=i;j<(rankingdate.length-1);j++){
        s = s + ranking[j] + \r\n;
      }
      try {
        fs.appendFileSync('./list.txt', s, 'utf-8');
      } catch (err) {
        console.log(err);
      }
    }
    else{
      s = s + ranking[i] + \r\n;
    }
  }
  rankingdate.push(score + ' ' + name + ' ' + typm);
}
