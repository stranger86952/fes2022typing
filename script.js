var words=[];
var preview=[];
var gametyu=false;
var gametyu2=false;

window.addEventListener('DOMContentLoaded', function(){
  disp('title');
  fetch("./words.txt").then(e => e.text()).then(e => words=e.split(/\s/));
  fetch("./preview.txt").then(e => e.text()).then(e => preview=e.split(/\s/));

  console.log(words.length);

  function disp(classname){
    if(classname=='title'){
      gametyu = false;
      gametyu2 = false;
      $('.title').show();
      $('.game').hide();
      $('.gaming').hide();
      $('.after').hide();
      $('.ranking').hide();
    }
    else if(classname=='game'){
      gametyu = false;
      gametyu2 = false;
      $('.title').hide();
      $('.game').show();
      $('.gaming').hide();
      $('.after').hide();
      $('.ranking').hide();
    }
    else if(classname=='gaming'){
      gametyu = true;
      gametyu2 = true;
      $('.title').hide();
      $('.game').hide();
      $('.gaming').show();
      $('.after').hide();
      $('.ranking').hide();
    }
    else if(classname=='after'){
      gametyu = false;
      gametyu2 = false;
      $('.title').hide();
      $('.game').hide();
      $('.gaming').hide();
      $('.after').show();
      $('.ranking').hide();
    }
    else if(classname=='ranking'){
      gametyu = false;
      gametyu2 = false;
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

  timerS = 60;
  scoreS = 0;
  typCAS = 0;
  bonusS = 0;
  bonusmaxS = 0;

  function typ(typCA,bonus,bonusmax,score){
    ran = Math.floor(Math.random() * (words.length-2))+1;
    var i = 0;
    var b = '';
    $('.typans').text('英語: ' + String(words[ran]));
    $('.typpre').text('日本語: ' + String(preview[ran]));
    $('.typnex').text('次に入力する文字: ' + String(words[ran][i]));
    $('.typnow').text('現在の入力: ');
    $(document).on('keydown',window,function(event){
      if(!gametyu&&!gametyu2){
        return false;
      }
      var a = event.key;
      if(a==words[ran][i]){
        typCA = typCA + 1;
        typCAS = typCA;
        b = b + String(a);
        i = i + 1;
        $('.typnex').text('次に入力する文字: ' + String(words[ran][i]));
        $('.typnow').text('現在の入力: ' + String(b));
        if(b==words[ran]&&timer>0){
          bonus = bonus + 2;
          bonusS = bonus;
          bonusmax = Math.max(bonus,bonusmax);
          bonusmaxS = bonusmax;
          score = score + 100 + bonus;
          socreS = score;
          $('.typsta').text('ステータス: ' + String(100 + bonus));
          $('.typbon').text('ボーナス: ' + String(bonus));
          $('.typsco').text('スコア: ' + String(score));
          typ(typCA,bonus,bonusmax,score);
        }
        else{
          bonus = bonus + 1;
          bonusS = bonus;
          bonusmax = Math.max(bonus,bonusmax);
          bonusmaxS = bonusmax;
          score = score + 50 + bonus;
          scoreS = score;
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
        else{
          console.log('hoge');
        }
      }
      console.log(String(event.keyCode));
    });
  }

  function game(){
    disp('gaming');
    $('.typsco').text('スコア: 0');
    $('.typsta').text('ステータス: 0');
    $('.typbon').text('ボーナス: 0');
    scoreS = 0;
    typCAS = 0;
    bonusS = 0;
    bonusmaxS = 0;
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
          gametyu=false;
          clearInterval(countup);
          disp('after');
          $('.score').text('あなたのスコア: ' + String(scoreS));
          $('.typm').text('1秒で平均' + String(Math.floor((typCAS/60)*100)/100) + '回タイピング');
          $('.typCA').text('正しく打った回数: ' + String(typCAS));
          $('.typMax').text('マックスボーナス: ' + String(bonusmaxS));
        }
        else if(timer<0){
          $('.typtim').text('終了！');
          gametyu2=false;
        }
        else{
          $('.typtim').text('残り時間: ' + String(timer) + '秒');
        }
      }
    }

    typ(typCA,bonus,bonusmax,score);

  }

  $('.idgaming').click(function() {
    game();
  })

  function rankingA(){
    if(localStorage.getItem('kazu') == null){
      return false;
    }
    var rankingdate = new Array(localStorage.getItem('kazu'));
    for(var i=0;i<Number(localStorage.getItem('kazu');i++){
      ran2 = localStorage.getItem('kazu' + String(i))
      ran = ran2.split(/\s/);
      rankingdate[i] = ran;
    }
    rankingdate.sort(
      function(a,b){
        if (Number(a[0]) > Number(b[0])){
          return 1;
        }else if (Number(a[0]) < Number(b[0])){
          return -1;
        }else{
          return 0;
        }
      }
    );
    for(var i=0;i<localStorage.getItem('kazu');i++){
      ran3 = rankingdate[i].split(/\s/);
      $('#graph').append('<tr><td>' + String(i+1) + '位</td><td>' + String(ran3[0]) + '</td><td>' + String(ran3[1]) + '</td><td>' + String(ran3[2]) + '</td></tr>');
    }
  }

  rankingA();

  function rankingB(name,score,typm){
    if(localStorage.getItem('kazu') == null){
      localStorage.setItem('kazu','0');
    }
    var ka = Number(localStorage.getItem(b));
    var s = String(score) + ' ' + String(name) + ' ' +String(typm);
    localStorage.setItem('kazu' + String(ka),s);
    localStorage.setItem('kazu',String(ka + 1));
    alert('登録しました');
  }
  $('.identry').click(function() {
    rankingB($('.entname').text(),scoreS,Math.floor((typCAS/60)*100)/100);
  })
});
