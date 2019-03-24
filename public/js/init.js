var myChart = echarts.init(document.getElementById('chart'));
var option = {};
var socket = io.connect('http://127.0.0.1:3001');
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
			// title: {
			// 	text: '实验波形图'
			// },
			tooltip: {
				trigger: 'axis'
			},
			xAxis: {
				data: data.time,
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
			dataZoom: [
			{
				type: 'inside'
			}],
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
	// title: {
	// 	text: '实验波形图'
	// },
	tooltip: {
		trigger: 'axis'
	},
	xAxis: {
		data: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]
	},
	yAxis: {
		splitLine: {
			show: false
		}
	},
	series: {
		name: '实验波形图',
		type: 'line',
		data: [255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255]
	}
});
