//const fs = require('fs');
var words=[];
var preview=[];

window.addEventListener('DOMContentLoaded', function(){
  disp('title');
  var rankingdate=[];
  fetch("./list.txt").then(e => e.text()).then(e => rankingA(rankingdate,e));
  fetch("./words.txt").then(e => e.text()).then(e => words=e.split(/\s/));
  fetch("./preview.txt").then(e => e.text()).then(e => preview=e.split(/\s/));

  function disp(classname){
    if(classname=='title'){
      $('.title').show();
      $('.game').hide();
      $('.gaming').hide();
      $('.after').hide();
      $('.ranking').hide();
    }
    else if(classname=='game'){
      $('.title').hide();
      $('.game').show();
      $('.gaming').hide();
      $('.after').hide();
      $('.ranking').hide();
    }
    else if(classname=='gaming'){
      $('.title').hide();
      $('.game').hide();
      $('.gaming').show();
      $('.after').hide();
      $('.ranking').hide();
    }
    else if(classname=='after'){
      $('.title').hide();
      $('.game').hide();
      $('.gaming').hide();
      $('.after').show();
      $('.ranking').hide();
    }
    else if(classname=='ranking'){
      $('.title').hide();
      $('.game').hide();
      $('.gaming').hide();
      $('.after').hide();
      $('.ranking').show();
    }
  }

  $('#title').click(function() {
    disp('title');
  })

  $('#game').click(function() {
    disp('game');
  })

  $('#ranking').click(function() {
    disp('ranking');
  })

  function game(){
    disp('gaming');
    $('.typsco').text('スコア: 0');
    $('.typsta').text('ステータス: 0');
    timer = 60;
    score = 0;
    typCA = 0;
    typWA = 0;
    var countup = setInterval(timecount,1000,timer);

    function timecount(){
      timer--;
      if(timer<-2){
        clearInterval(countup);
        disp('after');
        $('.score').text('あなたのスコア: ' + String(score));
        $('.typm').text('1秒で平均' + String(Math.floor((typCA+typWA)/60)) + '回タイピング');
        $('.typCA').text('正しく打った回数: ' + String(typCA));
        $('.typWA').text('間違ったタイピング: ' + String(typWA));
      }
      else if(timer<0){
        $('.typtim').text('終了！');
      }
      else{
        $('.typtim').text('残り時間: ' + String(timer) + '秒');
      }
    }

    function typ(){
      ran = Math.floor(Math.random() * (words.length-2))+1;
      var i = 0;
      var b = '';
      $('.typans').text('ローマ字: ' + String(words[ran]));
      $('.typpre').text('読み: ' + String(preview[ran]));
      $('.typnex').text('次に入力する文字: ' + String(words[ran][i]));
      $('.typnow').text('現在の入力: ');
      $(window).keypress(function(event){
        console.log(event.keyCode)
        var a = event.key;
        console.log(a);
        console.log(words[ran][i]);
        if(a==words[ran][i]){
          typCA = typCA + 1;
          $('.typsco').text('スコア: ' + String(score));
          b = b + String(a);
          i++;
          $('.typnex').text('次に入力する文字: ' + String(words[ran][i]));
          $('.typnow').text('現在の入力: ' + String(b));
          if(b==words[ran]&&timer>0){
            score = score + 10;
            $('.typsta').text('ステータス: +10');
            $('.typsco').text('スコア: ' + String(score));
            typ();
          }
          else{
            score = score + 5;
            $('.typsta').text('ステータス: +5');
          }
        }
        else{
          score = score - 1;
          $('.typsta').text('ステータス: -1');
          typWA = typWA + 1;
          $('.typsco').text('スコア: ' + String(score));
        }
      });
    }

    typ();
  }

  $('#gaming').click(function() {
    game();
  })

  function rankingA(rankingdate,e){
    rankingdate=e.split(/\r\n|\n/);
    for(var i=0;i<(rankingdate.length-1);i++){
      ran=rankingdate[i].split(/\s/);
      $('#graph').append('<tr><td>' + String(i+1) + '位</td><td>' + String(ran[0]) + '</td><td>' + String(ran[1]) + '</td><td>' + String(ran[2]) + '</td></tr>');
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
  }

  $('#entry').click(function() {
    rankingB($('.entname').text(),$('.score').text(),$('.typm').text());
  })
  */
});
