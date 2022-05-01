//const fs = require('fs');
var words=[];
var preview=[];
var gametyu=false;

window.addEventListener('DOMContentLoaded', function(){
  disp('title');
  var rankingdate=[];
  fetch("./list.txt").then(e => e.text()).then(e => rankingA(rankingdate,e));
  fetch("./words.txt").then(e => e.text()).then(e => words=e.split(/\s/));
  fetch("./preview.txt").then(e => e.text()).then(e => preview=e.split(/\s/));

  console.log(words.length);

  function disp(classname){
    if(classname=='title'){
      gametyu = false;
      $('.title').show();
      $('.game').hide();
      $('.gaming').hide();
      $('.after').hide();
      $('.ranking').hide();
    }
    else if(classname=='game'){
      gametyu = false;
      $('.title').hide();
      $('.game').show();
      $('.gaming').hide();
      $('.after').hide();
      $('.ranking').hide();
    }
    else if(classname=='gaming'){
      gametyu = true;
      $('.title').hide();
      $('.game').hide();
      $('.gaming').show();
      $('.after').hide();
      $('.ranking').hide();
    }
    else if(classname=='after'){
      gametyu = false;
      $('.title').hide();
      $('.game').hide();
      $('.gaming').hide();
      $('.after').show();
      $('.ranking').hide();
    }
    else if(classname=='ranking'){
      gametyu = false;
      $('.title').hide();
      $('.game').hide();
      $('.gaming').hide();
      $('.after').hide();
      $('.ranking').show();
    }
  }

  $('.idtitle').click(function() {
    disp('title');
  })

  $('.idgame').click(function() {
    disp('game');
  })

  $('.idranking').click(function() {
    disp('ranking');
  })

  function game(){
    disp('gaming');
    $('.typsco').text('スコア: 0');
    $('.typsta').text('ステータス: 0');
    $('.typbon').text('ボーナス: 0');
    timer = 60;
    score = 0;
    typCA = 0;
    bonus = 0;
    bonusmax = 0;
    var countup = setInterval(timecount,1000,timer);

    function timecount(){
      if(!gametyu){
        clearInterval(countup);
      }
      else{
        timer--;
        if(timer<-2){
          clearInterval(countup);
          disp('after');
          $('.score').text('あなたのスコア: ' + String(score));
          $('.typm').text('1秒で平均' + String(Math.floor((typCA/60)*100)/100) + '回タイピング');
          $('.typCA').text('正しく打った回数: ' + String(typCA));
          $('.typMax').text('マックスボーナス: ' + String(bonusmax));
        }
        else if(timer<0){
          $('.typtim').text('終了！');
        }
        else{
          $('.typtim').text('残り時間: ' + String(timer) + '秒');
        }
      }
    }

    function typ(){
      ran = Math.floor(Math.random() * (words.length-2))+1;
      var i = 0;
      var b = '';
      $('.typans').text('英語: ' + String(words[ran]));
      $('.typpre').text('日本語: ' + String(preview[ran]));
      $('.typnex').text('次に入力する文字: ' + String(words[ran][i]));
      $('.typnow').text('現在の入力: ');
      $(document).on('keydown',window,function(event){
        var a = event.key;
        if(a==words[ran][i]){
          typCA = typCA + 1;
          b = b + String(a);
          i = i + 1;
          $('.typnex').text('次に入力する文字: ' + String(words[ran][i]));
          $('.typnow').text('現在の入力: ' + String(b));
          if(b==words[ran]&&timer>0){
            bonus = bonus + 2;
            bonusmax = Math.max(bonus,bonusmax);
            score = score + 100 + bonus;
            $('.typsta').text('ステータス: ' + String(100 + bonus));
            $('.typbon').text('ボーナス: ' + String(bonus));
            $('.typsco').text('スコア: ' + String(score));
            typ();
          }
          else{
            bonus = bonus + 1;
            bonus = Math.floor((bonus)*1000)/1000;
            bonusmax = Math.max(bonus,bonusmax);
            score = score + 50 + bonus;
            $('.typsta').text('ステータス: ' + String(50+bonus));
            $('.typbon').text('ボーナス: ' + String(bonus));
            $('.typsco').text('スコア: ' + String(score));
          }
        }
        else{
          if(String(event.keyCode)!='16'){
            bonus = 0;
            $('.typsta').text('ステータス: ミス！');
            $('.typbon').text('ボーナス: ' + String(bonus));
          }
        }
        console.log(String(event.keyCode));
      });
      $(document).on('keydown',window,function(event){});
    }

    typ();
  }

  $('.idgaming').click(function() {
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

  $('.identry').click(function() {
    rankingB($('.entname').text(),$('.score').text(),$('.typm').text());
  })
  */
});
