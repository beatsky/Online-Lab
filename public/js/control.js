var speedNum = document.getElementById('speedNum');

let sp = 2


function speedCalc(sp){
	if(sp%1==0){
		return sp + '.0'
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
	sp = sp + 0.2
  	socket.emit('speed', `CE${speedCalc(sp)}\/r\/n`);
	console.log(`CE${speedCalc(sp)}\/r\/n`)
	speedNum.innerHTML = sp
	// socket.emit('speed', `CE3.8\/r\/n`);
}


function reduceSpeed() {
	if(sp==2){
		return
	}
	sp = sp - 0.2
	socket.emit('speed', `CE${speedCalc(sp)}\/r\/n`);
	console.log(`CE${speedCalc(sp)}\/r\/n`)
	speedNum.innerHTML = sp
}