window.addEventListener('DOMContentLoaded', function(){
  fetch("./list.txt").then(e => text()).then(e => $('.ranking').text(e));
  $('#Branking').on('click', function() {
    alert("クリックされました");
  });
});
