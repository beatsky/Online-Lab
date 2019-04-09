var speedNum = document.getElementById('speedNum');

let sp = 20


function speedCalc(sp){
	if(sp<10){
		return '0' + sp
	}else{
		return sp
	}
}

function speedInner(sp) {
	let inner = sp/10;
	if (inner%1==0) {
		inner = inner + '.0'
	}
	return inner
}


socket.on('switch', function(data){
	console.log(123)
	if (data=='on') {
		$('#mator').css({
			background: '#00a9f4'
		})
		$('#mator').text('开')
	} else {
		$('#mator').css({
			background: '#e52d27'
		})
		$('#mator').text('关')
	}
})


$('#mator').on('click', function(){
	if ($('#mator').text() == '关') {
		$('#mator').css({
			background: '#00a9f4'
		})
		$('#mator').text('开')
	}else{
		$('#mator').css({
			background: '#e52d27'
		})
		$('#mator').text('关')
	}
	socket.emit('speed', `CE00\/r\/n`);
})



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
	speedNum.innerHTML = speedInner(sp)
	// socket.emit('speed', `CE3.8\/r\/n`);
}


function reduceSpeed() {
	if(sp==20){
		return
	}
	sp = sp - 1
	socket.emit('speed', `CE${speedCalc(sp)}\/r\/n`);
	console.log(`CE${speedCalc(sp)}\/r\/n`)
	speedNum.innerHTML = speedInner(sp)
}

function saveData(){
	socket.emit('getData', '');

 	setTimeout(()=>{
 		window.open('/excel')
 	}, 300)
 }


