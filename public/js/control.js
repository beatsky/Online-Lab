var speedNum = document.getElementById('speedNum');

let sp = 10


function speedCalc(sp){
	if(sp<10){
		return '0' + sp
	}else{
		return sp
	}
}



function addSpeed() {
	sp++
  socket.emit('speed', `CE${speedCalc(sp)}\/r\/n`);
	console.log(`CE${speedCalc(sp)}\/r\/n`)
}


function reduceSpeed() {
	if(sp==1){
		return
	}
	sp--
	socket.emit('speed', `CE${speedCalc(sp)}\/r\/n`);
	console.log(`CE${speedCalc(sp)}\/r\/n`)
}