
function sendIp() {
  socket.emit('ip', returnCitySN.cip);
}

function addSpeed() {
  socket.emit('speed', '+1');
}

function reduceSpeed() {
  socket.emit('speed', '-1');
}