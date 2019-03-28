var speedNum = document.getElementById('speedNum');

let sp = 20


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
	if(sp==50){
		return
	}
	sp = sp + 1
  	socket.emit('speed', `CE${speedCalc(sp)}\/r\/n`);
	console.log(`CE${speedCalc(sp)}\/r\/n`)
	speedNum.innerHTML = sp
	// socket.emit('speed', `CE3.8\/r\/n`);
}

function close(){
	socket.emit('speed', `CE00\/r\/n`);
}


function reduceSpeed() {
	if(sp==20){
		return
	}
	sp = sp - 1
	socket.emit('speed', `CE${speedCalc(sp)}\/r\/n`);
	console.log(`CE${speedCalc(sp)}\/r\/n`)
	speedNum.innerHTML = sp
}

function saveData(){
	socket.emit('getData', '');
	socket.on('save', function(data){
		var stringifyData = JSON.stringify(data);
		var blob = new Blob([stringifyData]);
		var file = new File([blob], "filename.json", {type: "text/json;charset=utf-8"});
		console.log(blob);
		console.log(window.URL.createObjectURL(blob))
		var a1 = document.createElement('a')
		a1.href = window.URL.createObjectURL(blob)
		a1.innerHTML = 'saas'
		document.body.appendChild(a1)
	})


}

