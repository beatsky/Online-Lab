var speedNum = document.getElementById('speedNum');


function showIp() {
  if ($('#other li').length>=3) {
    return;
  }
  $('#other').append('<li>'+returnCitySN.cip+'</li>');
}

function sendIp() {
  socket.emit('ip', returnCitySN.cip);
}
let sp = 0
function addSpeed() {
  sp++
  socket.emit('speed', 'CE0' + sp);
  speedNum.innerHTML = sp
  
}

function reduceSpeed() {
  sp--
  socket.emit('speed', 'CE0' + sp);
  speedNum.innerHTML = sp
}