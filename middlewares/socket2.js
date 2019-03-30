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


var labData = {};
var m,s,time;
var dataArr = [];
var timeArr = [];
var str;
var x = 0;

// 储存
global.labdata = []
var allData = []
var allTime = []

global.save = {
	data: [],
	time: []
}


// 接受实验仪器数据，处理数据，发送给前端
server.on('connection',function (socket) {  

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
      	dataArr.push(str[i]);
      	global.save.data.push(str[i]);
      	x++;
      	timeArr.push(x);
      	global.save.time.push(x);
      }
	  
	  if (dataArr.length > 39) {
	  	for (let i = 0; i < dataArr.length-40; i++) {
	  		dataArr.shift();
	  		timeArr.shift();
	  	}
	  	
        
        labData.data = dataArr;
	  	labData.time = timeArr;
	  	labData.alltime = allTime;
	  	labData.alldata = allData;
	  } 
	  if (x%10==0) {
	  	io.emit('message', labData);
	  	//console.log(x);
	  	//console.log(dataArr);
	  }
	  
	}) 
	
	socket.on('end', function () {
		dataArr = [];
		timeArr = [];
		global.labdata.push(labData)
		// console.log(global.labdata)
		buf=new Buffer(256);
		buf.write(JSON.stringify(global.labdata),"utf-8");
		fs.writeFile('./public/data.txt', buf)
		labData = {};
		x = 0;

		allData = []
		allTime = []
	}) 
 });

