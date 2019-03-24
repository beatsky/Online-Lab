const http = require('http');
const net = require('net');
// 创建http server，创建io
const ioServer = http.createServer();
const io = require('socket.io')(ioServer);
ioServer.listen(3001);
// 创建net server
const server = net.createServer();
server.listen(3002);


var labData = {};
var m,s,time;
var dataArr = [];
var timeArr = [];
var str;
var x = 0;
var high = 0;
var low = 0;
var command = '';


function manageData(low, high) {
	return (256*high + low-32768)/65536*16
}

// io.on('connection', function (websocket) {
// 	websocket.on('speed', function (data) {
// //		socket.write(data, 'utf8');
// 		console.log(data)
// 		command = data
// 	})
// })



// 接受实验仪器数据，处理数据，发送给前端
server.on('connection',function (socket) {
	// 控制电机
	// socket.setEncoding('utf8');
	socket.on('data',function (data) {  
		
	  if(command){
	  	socket.write(command, '')
	  	command = ''
	  }
	
	  str = data.toJSON().data
	  
	  for(let i = 0;i < str.length;i++){
	  	if(str[i]==65 && str[i+1]==81){
	  		low = parseInt(str[i+2], 16)
	  		high = parseInt(str[i+3], 16)
	  		console.log(manageData(low, high))
	  		dataArr.push(manageData(low, high))
	  		x++
	  		timeArr.push(x);
	  	}
	  }
	  
	  if (dataArr.length >= 39) {
	  	for (let i = 0; i < dataArr.length-40; i++) {
	  		dataArr.shift();
	  		timeArr.shift();
	  	}
	
	    labData.data = dataArr;
	  	labData.time = timeArr;
	  } 
	  if (x%10==0 && x>=40) {
	  	io.emit('message', labData);
//	  	console.log(labData.data.length, labData.time.length);
//	  	console.log(labData);
	  }
	
	}) 

	socket.on('end', function () {
		dataArr = [];
		timeArr = [];
		labData = {};
		x = 0;
	})
 });