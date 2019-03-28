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
  // sp++
//socket.emit('speed', 'CE05');
  // speedNum.innerHTML = sp
//alert(555)
  
}

function reduceSpeed1() {
  sp--
	socket.emit('speed', 'CE03\/r\/n');
  // speedNum.innerHTML = sp
//console.log('CE03\/r\/n')
	var data = {msg: 'CE03\/r\/n'}
	console.log(data)
//$.ajax({
//	  url: '/speed',
//	  method:'POST',
//	  data: data,
//		type: 'JSON'
//	})
}


//function showIp() {
//if ($('#other li').length>=3) {
//  return;
//}
//$('#other').append('<li>'+returnCitySN.cip+'</li>');
//}
//
//function sendIp() {
//socket.emit('ip', returnCitySN.cip);
//}
//
//function addSpeed() {
//socket.emit('speed', '+1');
//}
//
//function reduceSpeed() {
//socket.emit('speed', '-1');
//} 