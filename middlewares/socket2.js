const http = require('http');
const net = require('net');
const fs = require('fs');
const router = require('koa-router')()
const nodeExcel = require('node-excel-export');
// 创建http server，创建io
const ioServer = http.createServer();
const io = require('socket.io')(ioServer);
ioServer.listen(3001);
// 创建net server
const server = net.createServer();
server.listen(3002);


var labData = {
	data: [],
	time: []
};
var str;
var x = 0;

// 储存

global.save = {
	data: [],
	time: []
}
// 连接记录
global.record = []

var record = {
	start: '',
	end: ''
}




io.on('connection', function (websocket) {
	// websocket.on('speed', function (data) {
	// 	// console.log(data)
	// 	command = data
	// })

	// websocket.on('getData', function (data) {
	// 	io.emit('save', save)
	// })
})





// 接受实验仪器数据，处理数据，发送给前端
server.on('connection',function (socket) {  
	record.start = new Date().toLocaleString()
	io.emit('switch', 'on')
	// 控制电机
	io.on('connection', function (websocket) {
		websocket.on('speed', function (data) {
			socket.write(data, 'utf8');
		})
	});

	socket.setEncoding('utf8');
	socket.on('data',function (data) {  
      str = data.split('s');
      for (let i = 1; i < str.length; i++) {
      	labData.data.push(str[i]);
      	// global.save.data.push(str[i]);
      	x++;
      	labData.time.push(x);
      	// global.save.time.push(x);
      }
	  
	  if (labData.data.length > 100) {
	  	labData.data.splice(0, labData.data.length-100);
	  	labData.time.splice(0, labData.time.length-100);
	  	console.log(labData.data.length, labData.time.length)
	  } 
	  if (x%10==0) {
	  	io.emit('message', labData);
	  	global.save.time = labData.time;
	  	global.save.data = labData.data;
	  }
	  
	}) 
	
	socket.on('end', function () {
		labData = {
			data: [],
			time: []
		};
		x = 0;
		record.end = new Date().toLocaleString()
		global.record.push(record)
	}) 
 });

