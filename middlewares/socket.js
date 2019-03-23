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


// 接受实验仪器数据，处理数据，发送给前端
server.on('connection',function (socket) {  
	// if (!global.limit) {
	// 	return
	// }
	// 控制电机
	io.on('connection', function (websocket) {
		websocket.on('speed', function (data) {
			socket.write(data);
		})
	});


	// socket.setEncoding('utf8');

	socket.on('data',function (data) {  
	  str = parseInt(data, 16)
	  console.log(data)



	  // str = parseInt(data, 16).split('4151')[0].split('4251')[0]
	  // str = data.split('s')

   //    for (let i = 1; i < str.length; i++) {
   //    	dataArr.push(str[i]);
   //    	x++;
   //    	timeArr.push(x);
      	
   //    }
	  
	  // if (dataArr.length > 39) {
	  // 	for (let i = 0; i < dataArr.length-40; i++) {
	  // 		dataArr.shift();
	  // 		timeArr.shift();
	  // 	}
	  	
        
   //      labData.data = dataArr;
	  // 	labData.time = timeArr;
	  // } 
	  // if (x%10==0) {
	  // 	io.emit('message', labData);
	  // }
	  
	}) 
	
	socket.on('end', function () {
		dataArr = [];
		timeArr = [];
		labData = {};
		x = 0;
	}) 
 });

