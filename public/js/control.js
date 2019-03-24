var speedNum = document.getElementById('speedNum');

let sp = 10


function speedCalc(sp){
	if(sp<10){
		return '0' + sp
	}else{
		return sp
	}
}


function lockBig() {
	socket.emit('speed', `CD0\/r\/n`);
}

function lockSmall() {
	socket.emit('speed', `CD1\/r\/n`);
}

function addSpeed() {
	sp++
  	socket.emit('speed', `CE${speedCalc(sp)}\/r\/n`);
	console.log(`CE${speedCalc(sp)}\/r\/n`)
	speedNum.innerHTML = sp
}


function reduceSpeed() {
	if(sp==0){
		return
	}
	sp--
	socket.emit('speed', `CE${speedCalc(sp)}\/r\/n`);
	console.log(`CE${speedCalc(sp)}\/r\/n`)
	speedNum.innerHTML = sp
}