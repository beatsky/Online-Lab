function showIp() {
  if ($('#other li').length>=3) {
    return;
  }
  $('#other').append('<li>'+returnCitySN.cip+'</li>');
}

function sendIp() {
  socket.emit('ip', returnCitySN.cip);
}

function addSpeed() {
  socket.emit('speed', '+1');
}

function reduceSpeed() {
  socket.emit('speed', '-1');
}