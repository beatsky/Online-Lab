const http = require('http');
const net = require('net');

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
var peakValue = 0;
var command = '';

global.save = {
	data: [],
	time: []
}


global.record = []



// 处理实验数据
function manageData(low, high) {
	if ((256 * high + low) >= 32768) {
		return -1 * (65535 - (256 * high + low) + 1) / 32768 * 16
	}
	return (256 * high + low) / 32768 * 16

}



io.on('connection', function (websocket) {
	websocket.on('speed', function (data) {
		command = data
	})
})



// 接受实验仪器数据，处理数据，发送给前端
server.on('connection', function (socket) {

	var record = {
		start: '',
		end: ''
	}

	// 记录连接时间
	record.start = new Date().toLocaleString()
	io.emit('switch', 'on')

	// 控制电机
	// socket.setEncoding('utf8');
	// data svxxtv00svxxtv00
	socket.on('data', function (data) {

		if (command) {
			socket.write(command, '')
			command = ''
		}
		console.log(data)
		str = data.toJSON().data
		console.log(str)
		for (let i = 0; i < str.length; i++) {
			if (str[i] == 115 && str[i + 1] == 118) {
				peakValue = manageData(str[i + 2], str[i + 3])
				labData.data.push(peakValue)
				x++
				labData.time.push(x / 100);
			}
		}

		if (labData.data.length >= 200) {
			labData.data.splice(0, labData.data.length - 200);
			labData.time.splice(0, labData.time.length - 200);
		}
		// 每10毫秒向前端发送一次数据
		if (x % 10 == 0 && x >= 10) {
			io.emit('message', labData);
			global.save.time = labData.time;
			global.save.data = labData.data;
		}

	})

	// 断开链接，置空数据
	socket.on('end', function () {
		labData = {
			data: [],
			time: []
		};
		x = 0;
		record.end = new Date().toLocaleString()
		global.record.push(record)
		// global.save = {
		// 	data: [],
		// 	time: []
		// }
		io.emit('switch', 'off')
	})
});