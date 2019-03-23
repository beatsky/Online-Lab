var myChart = echarts.init(document.getElementById('chart'));
var option = {};
var socket = io.connect('http://118.25.92.237:3000');
var chart = document.getElementById('chart');
window.addEventListener('resize', function(){
	myChart.resize();
})
socket.on('message', 
	function (data) {
		if(data.length <= 1){
			return
		}
		myChart.setOption(option = {
			title: {
				text: '实验波形图'
			},
			tooltip: {
				trigger: 'axis'
			},
			xAxis: {
				// data: arr2.map(function (item) {
				// 	return item[0];
				// })
				data: data.time,
				// data: socket.on('message',function(){return data.time})
			},
			yAxis: {
				splitLine: {
					show: false
				}
			},
			toolbox: {
				left: 'center',
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},
					restore: {},
					saveAsImage: {}
				}
			},
			dataZoom: [{
				startValue: data.data[0]
			}, {
				type: 'inside'
			}],
			// visualMap: {
			// 	top: 10,
			// 	right: 0,
			// 	pieces: [{
			// 		gt: 0,
			// 		lte: 50,
			// 		color: '#096'
			// 	}, {
			// 		gt: 50,
			// 		lte: 100,
			// 		color: '#ffde33'
			// 	}, {
			// 		gt: 100,
			// 		lte: 150,
			// 		color: '#ff9933'
			// 	}, {
			// 		gt: 150,
			// 		lte: 200,
			// 		color: '#cc0033'
			// 	}, {
			// 		gt: 200,
			// 		lte: 300,
			// 		color: '#660099'
			// 	}, {
			// 		gt: 300,
			// 		color: '#7e0023'
			// 	}],
			// 	outOfRange: {
			// 		color: '#999'
			// 	}
			// },
			series: {
				name: '实验波形图',
				type: 'line',
				data: data.data,
				markLine: {
					silent: true,
					data: [{
						yAxis: -300
					}, {
						yAxis: -150
					}, {
						yAxis: 0
					}, {
						yAxis: 150
					}, {
						yAxis: 300
					}]
				},
			}
		});
})



myChart.setOption(option = {
	title: {
		text: '实验波形图'
	},
	tooltip: {
		trigger: 'axis'
	},
	xAxis: {
		data: [1,2,3,4,5,6,7,8,9]
	},
	yAxis: {
		splitLine: {
			show: false
		}
	},
	series: {
		name: '实验波形图',
		type: 'line',
		data: [1,200,56,89,220,185,369,14,-90]
	}
});
