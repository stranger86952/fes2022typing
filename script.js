//const fs = require('fs');
var words=[];
var preview=[];

window.addEventListener('DOMContentLoaded', function(){
  disp('title');
  var rankingdate=[];
  fetch("./list.txt").then(e => e.text()).then(e => rankingA(rankingdate,e));
  fetch("./words.txt").then(e => e.text()).then(e => words=e.split(/\s/));
  fetch("./preview.txt").then(e => e.text()).then(e => preview=e.split(/\s/));
});

function game(){
  disp('gaming');
  timer = 60;
  while(timer>0){
    var countup = setInterval(function(){
      timer--;
      $('.typtim').text('残り時間: ' + String(timer) + '秒');
    } ,1000);
  }
  while($('.typeans').text()==$('.typnow')&&timer>0){
    ran = Math.floor(Math.random() * ((words.length)–1)+1);
    $('typans')=words[ran];
    $('typpre')=preview[ran];
    var i = 0;
    $('body').keydown(function(event) {
      var a = event.key;
      if(a==words[ran][i]) $('.typnow').append(a);
    });
  }
  if(timer==0){
    $('.typtim').text('終了！');
  }
}

function disp(classname){
  if(classname=='title'){
    $('.title').show();
    $('.game').hide();
    $('gaming').hide();
    $('.after').hide();
    $('.ranking').hide();
  }
  else if(classname=='game'){
    $('.title').hide();
    $('.game').show();
    $('gaming').hide();
    $('.after').hide();
    $('.ranking').hide();
  }
  else if(classname=='gaming'){
    $('.title').hide();
    $('.game').hide();
    $('gaming').show();
    $('.after').hide();
    $('.ranking').hide();
  }
  else if(classname=='after'){
    $('.title').hide();
    $('.game').hide();
    $('gaming').hide();
    $('.after').show();
    $('.ranking').hide();
  }
  else if(classname=='ranking'){
    $('.title').hide();
    $('.game').hide();
    $('gaming').hide();
    $('.after').hide();
    $('.ranking').show();
  }
}

function rankingA(rankingdate,e){
  rankingdate=e.split(/\r\n|\n/);
  for(var i=0;i<(rankingdate.length-1);i++){
    ran=rankingdate[i].split(/\s/);
    $('#ranking').append('<tr><td>' + String(i+1) + '位</td><td>' + String(ran[0]) + '</td><td>' + String(ran[1]) + '</td><td>' + String(ran[2]) + '</td></tr>');
  }
}

/*function rankingB(name,score,typm){
  var s="";
  for(var i=0;i<(rankingdate.length-1);i++){
    ran = rankingdate[i].split(/\s/);
    if(ran[0]<=Number(score)){
      s + String(score) + ' ' + String(name) + ' ' + String(typm) + /\r\n|\n/;
      for(var j=i;j<(rankingdate.length-1);j++){
        s = s + ranking[j] + /\r\n|\n/;
      }
      try {
        fs.appendFileSync('./list.txt', s, 'utf-8');
      } catch (err) {
        console.log(err);
      }
    }
    else{
      s = s + ranking[i] + /\r\n|\n/;
    }
  }
  rankingdate.push(score + ' ' + name + ' ' + typm);
}*/
