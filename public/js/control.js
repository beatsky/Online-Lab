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

// 开关打开
socket.on('switch', function(data){
	switch(data) {
		case 'on': {
			$('#mator').css({
				background: '#00a9f4'
			})
			$('#mator').text('开')

			$('#magnet').css({
				background: '#00a9f4'
			})
			$('#magnet').text('开')

			// $('#add').css({
			// 	background: '#00a9f4'
			// })

			// $('#reduce').css({
			// 	background: '#00a9f4'
			// })

			break;
		}
		case 'off': {
			$('#mator').css({
				background: 'rgb(204, 204, 204)'
			})
			// $('#mator').text('关')

			$('#magnet').css({
				background: 'rgb(204, 204, 204)'
			})
			// $('#magnet').text('关')

			$('#add').css({
				background: 'rgb(204, 204, 204)'
			})

			$('#reduce').css({
				background: 'rgb(204, 204, 204)'
			})
			break;
		}
	}
})


$('#mator').on('click', function(){

	if ($('#mator').css('background-color') == 'rgb(204, 204, 204)') {
	//	return
	}

	if ($('#mator').text() == '关') {
		socket.emit('speed', `CE20\/r\/n`);

		$('#mator').css({
			background: '#00a9f4'
		})
		$('#mator').text('开')
		
		$('#reduce').css({
			background: 'rgb(204, 204, 204)'
		})
		$('#add').css({
			background: 'rgb(204, 204, 204)'
		})
		

	}else{
		socket.emit('speed', `CE00\/r\/n`);

		$('#mator').css({
			background: '#e52d27'
		})
		$('#mator').text('关')
		
		$('#reduce').css({
			background: '#00a9f4'
		})
		$('#add').css({
			background: '#00a9f4'
		})
	}

})



$('#magnet').on('click', function(){

	if ($('#magnet').css('background-color') == 'rgb(204, 204, 204)') {
	//	return
	}

	if ($('#magnet').text() == '关') {
		$('#magnet').css({
			background: '#00a9f4'
		})
		$('#magnet').text('开')
		socket.emit('speed', `CD1\/r\/n`);
	}else{
		$('#magnet').css({
			background: '#e52d27'
		})
		$('#magnet').text('关')
		socket.emit('speed', `CD0\/r\/n`)
	}
})


function addSpeed() {
	if(sp==50 || $('#add').css('background-color') == 'rgb(204, 204, 204)'){
	//	return
	}
	sp = sp + 1
  	socket.emit('speed', `CE${speedCalc(sp)}\/r\/n`);
	$('#add').css({
		background: '#00a9f4'
	})
	console.log(`CE${speedCalc(sp)}\/r\/n`)
	speedNum.innerHTML = speedInner(sp)
}


function reduceSpeed() {
	if(sp==20 || $('#reduce').css('background-color') == 'rgb(204, 204, 204)'){
	//	return
	}
	sp = sp - 1
	socket.emit('speed', `CE${speedCalc(sp)}\/r\/n`);
	$('#reduce').css({
		background: '#00a9f4'
	})
	console.log(`CE${speedCalc(sp)}\/r\/n`)
	speedNum.innerHTML = speedInner(sp)
}

function saveData(){
	socket.emit('getData', '');

 	setTimeout(()=>{
 		window.open('/excel')
 	}, 300)
 }


